using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Todos.API.Migrations
{
    /// <inheritdoc />
    public partial class initalizedb2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "e1527379-a581-4768-8705-ae332d045cb4", 0, "7f5d5861-d9e3-4978-a1ee-bbfa71f985a7", null, false, false, null, null, null, null, null, false, "b00fe0dc-242f-4bd7-beb3-30965c246c62", false, "user1" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "e1527379-a581-4768-8705-ae332d045cb4");
        }
    }
}
