using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EvaluacionApi.Migrations
{
    /// <inheritdoc />
    public partial class dia20_09 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Diponible",
                table: "Autos",
                newName: "Disponible");

            migrationBuilder.RenameColumn(
                name: "Anio",
                table: "Autos",
                newName: "Año");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Disponible",
                table: "Autos",
                newName: "Diponible");

            migrationBuilder.RenameColumn(
                name: "Año",
                table: "Autos",
                newName: "Anio");
        }
    }
}
