using Microsoft.EntityFrameworkCore.Migrations;

namespace MarketHub.Data.Migrations
{
    public partial class updatedatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "Markets");

            migrationBuilder.AddColumn<string>(
                name: "Catergory",
                table: "Markets",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Image1",
                table: "Markets",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Image2",
                table: "Markets",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Image3",
                table: "Markets",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Catergory",
                table: "Markets");

            migrationBuilder.DropColumn(
                name: "Image1",
                table: "Markets");

            migrationBuilder.DropColumn(
                name: "Image2",
                table: "Markets");

            migrationBuilder.DropColumn(
                name: "Image3",
                table: "Markets");

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Markets",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
