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
            var auto = await _context.Autos.OrderBy(a => a.AutoId).ToListAsync();

            return Ok(auto);
        }

        [HttpGet("{autoId}")]
        public async Task<IActionResult> obtenerAuto( int autoId)
        {
            var auto = await _context.Autos.FirstOrDefaultAsync(a => a.AutoId == autoId);

            if(auto == null) {
                return NotFound("Vehículo no encontrado.");
            }
            else {
                return Ok(auto);
            }
        }

        [HttpPost] 
        public async Task<IActionResult> CrearAuto([FromBody] Auto auto)
        {
            var existeAuto = await _context.Autos.AnyAsync(a => a.Patente == auto.Patente);

            if(!existeAuto) {
                var nuevoAuto = new Auto
                {
                    Marca = auto.Marca,
                    Modelo = auto.Modelo,
                    Año = auto.Año,
                    Patente = auto.Patente,
                    Km = auto.Km,
                    FechaIngreso = auto.FechaIngreso,
                    Disponible = auto.Disponible,
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

            var existeAuto = await _context.Autos.AnyAsync(a => a.Patente == auto.Patente && a.AutoId != autoId);

            if(!existeAuto) {
                editarAuto.Marca = auto.Marca;
                editarAuto.Modelo = auto.Modelo;
                editarAuto.Año = auto.Año;
                editarAuto.Patente = auto.Patente;
                editarAuto.Km = auto.Km;
                editarAuto.FechaIngreso = auto.FechaIngreso;
                editarAuto.Disponible = auto.Disponible;

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
            if (auto.Disponible)
            {
                return BadRequest("No se puede eliminar un vehículo disponible.");
            };

            _context.Autos.Remove(auto);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}