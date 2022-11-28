using Domain;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Contexts;

public class Context : DbContext
{
    
//=====================================================================//

    private static bool _isMigrated;
    
//=====================================================================//

    public DbSet<User> Users { get; set; } = null!;

//=====================================================================//

    public Context() {}

    public Context(DbContextOptions<Context> options) : base(options)
    {
        if (_isMigrated) return;
        Database.Migrate();
        _isMigrated = true;
    }
    
//=====================================================================//

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().HasKey(x => x.Username);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql("Host=localhost:5432;Database=test;Username=postgres;Password=1;");
    }
}