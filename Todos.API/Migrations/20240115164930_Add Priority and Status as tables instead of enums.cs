using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Todos.API.Migrations
{
    /// <inheritdoc />
    public partial class AddPriorityandStatusastablesinsteadofenums : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Priority",
                table: "Todos");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Todos");

            migrationBuilder.AddColumn<Guid>(
                name: "PriorityId",
                table: "Todos",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "StatusId",
                table: "Todos",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "Priorities",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Priorities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Statuses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Statuses", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Priorities",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { new Guid("24a11bab-3f79-46d6-b523-105775634dc7"), "Low" },
                    { new Guid("71fcc481-e946-4c76-acca-06a02b540453"), "High" },
                    { new Guid("7308fad5-ccf2-49ed-bcd5-cf35ac147abf"), "Critical" },
                    { new Guid("8e5ab86b-0ff0-45bb-9478-c9f154fec4c1"), "Medium" }
                });

            migrationBuilder.InsertData(
                table: "Statuses",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { new Guid("4bdcc014-791f-481a-91b5-892bec8d36b3"), "In Progress" },
                    { new Guid("c4a55655-87b6-4579-9eec-4dc4d011f6b1"), "Done" },
                    { new Guid("e1527379-a581-4768-8705-ae332d045cb4"), "Pending" },
                    { new Guid("ef97ff6b-2330-4492-b349-1c74e2ef3d12"), "Canceled" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Todos_PriorityId",
                table: "Todos",
                column: "PriorityId");

            migrationBuilder.CreateIndex(
                name: "IX_Todos_StatusId",
                table: "Todos",
                column: "StatusId");

            migrationBuilder.AddForeignKey(
                name: "FK_Todos_Priorities_PriorityId",
                table: "Todos",
                column: "PriorityId",
                principalTable: "Priorities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Todos_Statuses_StatusId",
                table: "Todos",
                column: "StatusId",
                principalTable: "Statuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Todos_Priorities_PriorityId",
                table: "Todos");

            migrationBuilder.DropForeignKey(
                name: "FK_Todos_Statuses_StatusId",
                table: "Todos");

            migrationBuilder.DropTable(
                name: "Priorities");

            migrationBuilder.DropTable(
                name: "Statuses");

            migrationBuilder.DropIndex(
                name: "IX_Todos_PriorityId",
                table: "Todos");

            migrationBuilder.DropIndex(
                name: "IX_Todos_StatusId",
                table: "Todos");

            migrationBuilder.DropColumn(
                name: "PriorityId",
                table: "Todos");

            migrationBuilder.DropColumn(
                name: "StatusId",
                table: "Todos");

            migrationBuilder.AddColumn<int>(
                name: "Priority",
                table: "Todos",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Todos",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
