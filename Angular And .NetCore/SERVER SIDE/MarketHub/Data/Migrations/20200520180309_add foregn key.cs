using Microsoft.EntityFrameworkCore.Migrations;

namespace MarketHub.Data.Migrations
{
    public partial class addforegnkey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FoodCatId",
                table: "Markets");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Markets",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Markets_UserId",
                table: "Markets",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Markets_AspNetUsers_UserId",
                table: "Markets",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Markets_AspNetUsers_UserId",
                table: "Markets");

            migrationBuilder.DropIndex(
                name: "IX_Markets_UserId",
                table: "Markets");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Markets");

            migrationBuilder.AddColumn<int>(
                name: "FoodCatId",
                table: "Markets",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
