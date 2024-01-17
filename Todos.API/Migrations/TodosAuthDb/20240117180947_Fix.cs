using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Todos.API.Migrations.TodosAuthDb
{
    /// <inheritdoc />
    public partial class Fix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "31bca60d-fea2-44da-a9fb-7c006c620469");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a90f64ec-f26f-4a7c-a4aa-d720cd6edd2f");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "31bca60d-fea2-44da-a9fb-7c006c620469", 0, "6ca84395-d3a3-406f-86c4-d16141454941", "hthrxsi123@gmail.com", false, false, null, null, null, null, null, false, "7d8c748a-3bca-4240-8166-489fbbb7ab15", false, null },
                    { "a90f64ec-f26f-4a7c-a4aa-d720cd6edd2f", 0, "e27a72f8-0e56-4472-9abe-1f1af9cb7863", "yairsadan1@gmail.com", false, false, null, null, null, null, null, false, "5226bce5-573c-47da-8012-32d76f0d5759", false, null }
                });
        }
    }
}
