using Application.Services;
using Domain.Dto;

namespace Infrastructure.Services;

public class IdentifyService : IIdentifyService
{
    public async Task<bool> IdentifyAsync(DataDto data)
    {
        await Task.Delay(3000);
        var gen = new Random();
        var prob = gen.Next(100);
        return prob < 50;
    }
}