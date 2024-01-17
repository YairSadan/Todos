using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Todos.API.Migrations
{
    /// <inheritdoc />
    public partial class Fix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Todos_IdentityUser_UserId1",
                table: "Todos");

            migrationBuilder.DropIndex(
                name: "IX_Todos_UserId1",
                table: "Todos");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Todos");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "Todos");

            migrationBuilder.AddColumn<string>(
                name: "IdentityUserId",
                table: "Todos",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Todos_IdentityUserId",
                table: "Todos",
                column: "IdentityUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Todos_IdentityUser_IdentityUserId",
                table: "Todos",
                column: "IdentityUserId",
                principalTable: "IdentityUser",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Todos_IdentityUser_IdentityUserId",
                table: "Todos");

            migrationBuilder.DropIndex(
                name: "IX_Todos_IdentityUserId",
                table: "Todos");

            migrationBuilder.DropColumn(
                name: "IdentityUserId",
                table: "Todos");

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "Todos",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "UserId1",
                table: "Todos",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Todos_UserId1",
                table: "Todos",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Todos_IdentityUser_UserId1",
                table: "Todos",
                column: "UserId1",
                principalTable: "IdentityUser",
                principalColumn: "Id");
        }
    }
}
