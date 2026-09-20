using System.ComponentModel.DataAnnotations;
using System;

namespace EvaluacionApi.Models;

public class Auto
{
    public int AutoId { get; set; }
    public string? Marca { get; set; }
    public string? Modelo { get; set; }
    public int Año { get; set; }
    public string? Patente { get; set; }
    public int Km { get; set; }
    public DateTime FechaIngreso { get; set; }
    public bool Disponible { get; set; }

}

