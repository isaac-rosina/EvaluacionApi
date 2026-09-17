using EvaluacionApi.Data;
using EvaluacionApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EvaluacionApi.Controllers
{
    [Route("api/Auto")]
    [ApiController]
    public class AutoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AutoController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> ListarAuto()
        {
            var auto = await _context.Autos.ToListAsync();

            return Ok(auto);
        }

        [HttpPost] 
        public async Task<IActionResult> CrearAuto([FromBody] Auto auto)
        {
            var existeAuto = await _context.Autos.AnyAsync(a => a.Marca == auto.Marca && a.Modelo == auto.Modelo);

            if(!existeAuto) {
                var nuevoAuto = new Auto
                {
                    Marca = auto.Marca,
                    Modelo = auto.Modelo,
                    Anio = auto.Anio,
                    Patente = auto.Patente,
                    Km = auto.Km,
                    FechaIngreso = auto.FechaIngreso,
                    Diponible = auto.Diponible,
                };
                _context.Add(nuevoAuto);
                await _context.SaveChangesAsync();
                return Ok("Auto guardado.");
            }

            return Ok();
        }

        [HttpPut("{autoId}")]
        public async Task<IActionResult> EditarAuto(int autoId, [FromBody] Auto auto)
        {
            var editarAuto = await _context.Autos.Where(a => a.AutoId == autoId).SingleOrDefaultAsync();

            if(editarAuto == null) {
                return Ok("El vehiculo que quiere editar no existe");
            };

            var existeAuto = await _context.Autos.AnyAsync(a => a.Marca == auto.Marca && a.Modelo == auto.Modelo && a.AutoId != autoId);

            if(!existeAuto) {
                editarAuto.Marca = auto.Marca;
                editarAuto.Modelo = auto.Modelo;
                editarAuto.Anio = auto.Anio;
                editarAuto.Patente = auto.Patente;
                editarAuto.Km = auto.Km;
                editarAuto.FechaIngreso = auto.FechaIngreso;
                editarAuto.Diponible = auto.Diponible;

                await _context.SaveChangesAsync();

                return Ok("Vehiculo editado exitosamente.");
            }
            else {
                return Ok("Ya existe otro vehiculo.");
            }
        }

        [HttpDelete("{autoId}")]
        public async Task<IActionResult> EliminarAuto(int autoId)
        {
            var auto = await _context.Autos.FindAsync(autoId);

            if(auto == null) {
                return NotFound("Vehiculo no encontrado.");
            };

            _context.Autos.Remove(auto);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}