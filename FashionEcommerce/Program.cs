using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using FashionEcommerce.Data;
using FashionEcommerce.Helpers;
using FashionEcommerce.Repositories;
using FashionEcommerce.Repositories.Interfaces;
using FashionEcommerce.Services;
using FashionEcommerce.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// ==================== ADD SERVICES TO THE CONTAINER ====================

// 1. Cấu hình DbContext với SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// 2. Cấu hình JWT Authentication
{
    var jwtSecretKey = builder.Configuration["Jwt:SecretKey"] ?? throw new ArgumentNullException("Jwt:SecretKey is not configured");
    var jwtIssuer = builder.Configuration["Jwt:Issuer"] ?? "FashionEcommerceAPI";
    var jwtAudience = builder.Configuration["Jwt:Audience"] ?? "FashionEcommerceClient";

    builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtIssuer,
            ValidAudience = jwtAudience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecretKey)),
            ClockSkew = TimeSpan.Zero // Không cho phép lệch thời gian
        };
    });
}

// 3. Cấu hình Authorization
builder.Services.AddAuthorization();

// 4. Đăng ký Dependency Injection

// - Helpers
builder.Services.AddSingleton<JwtHelper>();

// - Repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();

// - Services
builder.Services.AddScoped<IUserService, UserService>();

// 5. Cấu hình Controllers
builder.Services.AddControllers();

// 6. Cấu hình Swagger với JWT Authorization
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo 
    { 
        Title = "Fashion Ecommerce API", 
        Version = "v1",
        Description = "API for Fashion Ecommerce Users Management"
    });

    // Cấu hình JWT Authorization trong Swagger
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Enter 'Bearer' [space] and then your token.",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

// 7. Cấu hình CORS (Cross-Origin Resource Sharing)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// ==================== BUILD AND CONFIGURE THE APP ====================

var app = builder.Build();

// Configure the HTTP request pipeline
// Bật Swagger ở mọi môi trường để test API
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Fashion Ecommerce API v1");
});

// 1. Sử dụng CORS
app.UseCors("AllowAll");

// 2. Sử dụng Authentication trước Authorization
app.UseAuthentication();

// 3. Sử dụng Authorization
app.UseAuthorization();

// 4. Map Controllers
app.MapControllers();

// 5. Tự động tạo database khi app khởi động (sử dụng EnsureCreated để tránh lỗi nếu bảng đã tồn tại)
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    // EnsureCreated() sẽ không gây lỗi nếu database/tables đã tồn tại
    // Lưu ý: Nếu cần sử dụng migrations, hãy dùng dòng dưới đây:
    // dbContext.Database.Migrate();
    
    // Kiểm tra và tạo database nếu chưa có
    if (dbContext.Database.CanConnect())
    {
        try
        {
            dbContext.Database.EnsureCreated();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error creating database: {ex.Message}");
        }
    }
}

// ==================== RUN THE APP ====================

app.Run();

