using Microsoft.EntityFrameworkCore;
using EvaluacionApi.Models;

namespace EvaluacionApi.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Auto> Autos { get; set; }
}

