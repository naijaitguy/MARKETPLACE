using Microsoft.EntityFrameworkCore.Migrations;

namespace MarketHub.Data.Migrations
{
    public partial class removecatid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Markets_FoodCategories_FoodCatId",
                table: "Markets");

            migrationBuilder.DropIndex(
                name: "IX_Markets_FoodCatId",
                table: "Markets");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Markets_FoodCatId",
                table: "Markets",
                column: "FoodCatId");

            migrationBuilder.AddForeignKey(
                name: "FK_Markets_FoodCategories_FoodCatId",
                table: "Markets",
                column: "FoodCatId",
                principalTable: "FoodCategories",
                principalColumn: "FoodCatId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
