
using Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;

public static class ContextExtension
{
    public static IServiceCollection AddRepository(this IServiceCollection services, string cs)
    {
        services.AddDbContext<Context>(x => x.UseNpgsql(cs));
        return services;
    }
}