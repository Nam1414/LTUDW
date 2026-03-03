using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FashionEcommerce.Api.Migrations
{
    /// <inheritdoc />
    public partial class FixDecimalPrecision : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2026, 3, 3, 13, 41, 51, 232, DateTimeKind.Utc).AddTicks(2191));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2026, 3, 3, 13, 41, 51, 232, DateTimeKind.Utc).AddTicks(2193));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2026, 3, 3, 13, 41, 51, 231, DateTimeKind.Utc).AddTicks(7274), "$2a$11$16Ux8qli0daj2iqpVnFfH.78RsrbzbJ2zqGtYeCPWNsOGzZT821da" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2026, 3, 3, 13, 32, 26, 395, DateTimeKind.Utc).AddTicks(6186));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2026, 3, 3, 13, 32, 26, 395, DateTimeKind.Utc).AddTicks(6189));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2026, 3, 3, 13, 32, 26, 395, DateTimeKind.Utc).AddTicks(1591), "$2a$11$RTbH56CoHHhEL4JynaovcO7rMjrNYQVMJ8MOET5REn.1y/aZIeriS" });
        }
    }
}
