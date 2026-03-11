using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FashionEcommerce.Data;
using FashionEcommerce.Models;
using FashionEcommerce.Models.Entities;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
    private readonly AppDbContext _context;

    public CartController(AppDbContext context) => _context = context;

    [HttpGet]
    public async Task<IActionResult> GetCart()
    {
        var userId = int.Parse(User.FindFirst("id")?.Value ?? "0");
        var cartItems = await _context.CartItems
            .Include(ci => ci.Product)
            .ThenInclude(p => p.Images.OrderBy(i => i.SortOrder).Take(1))
            .Where(ci => ci.UserId == userId)
            .Select(ci => new
            {
                ci.Id,
                ci.Product.Name,
                ci.Product.Price,
                ci.Quantity,
                LineTotal = ci.Quantity * ci.UnitPriceSnapshot,
                ci.Product.Stock
            })
            .ToListAsync();

        var total = cartItems.Sum(i => i.LineTotal);
        return Ok(new { Items = cartItems, Total = total });
    }

    [HttpPost("items")]
    public async Task<IActionResult> AddItem([FromBody] AddCartItemDto dto)
    {
        var userId = int.Parse(User.FindFirst("id")?.Value ?? "0");
        var product = await _context.Products.FindAsync(dto.ProductId);
        if (product == null || product.Stock < dto.Quantity) return BadRequest("Product not available or insufficient stock");

        var existing = await _context.CartItems.FirstOrDefaultAsync(ci => ci.UserId == userId && ci.ProductId == dto.ProductId);
        if (existing != null)
        {
            existing.Quantity += dto.Quantity;
        }
        else
        {
            _context.CartItems.Add(new CartItem
            {
                UserId = userId,
                ProductId = dto.ProductId,
                Quantity = dto.Quantity,
                UnitPriceSnapshot = product.Price
            });
        }
        await _context.SaveChangesAsync();

        return Ok("Item added/updated");
    }

    [HttpPut("items/{id}")]
    public async Task<IActionResult> UpdateQuantity(int id, [FromBody] int quantity)
    {
        var userId = int.Parse(User.FindFirst("id")?.Value ?? "0");
        var item = await _context.CartItems.FirstOrDefaultAsync(ci => ci.Id == id && ci.UserId == userId);
        if (item == null) return NotFound();

        var product = await _context.Products.FindAsync(item.ProductId);
        // if (product.Stock < quantity) return BadRequest("Insufficient stock");
        if (product == null || product.Stock < quantity) return BadRequest("Insufficient stock");
        
        item.Quantity = quantity;
        await _context.SaveChangesAsync();

        return Ok("Quantity updated");
    }

    [HttpDelete("items/{id}")]
    public async Task<IActionResult> RemoveItem(int id)
    {
        var userId = int.Parse(User.FindFirst("id")?.Value ?? "0");
        var item = await _context.CartItems.FirstOrDefaultAsync(ci => ci.Id == id && ci.UserId == userId);
        if (item == null) return NotFound();

        _context.CartItems.Remove(item);
        await _context.SaveChangesAsync();

        return Ok("Item removed");
    }
}

public class AddCartItemDto
{
    public int ProductId { get; set; }
    public int Quantity { get; set; }
}
