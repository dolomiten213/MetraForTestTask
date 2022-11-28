using Microsoft.AspNetCore.SignalR;

namespace Api.Hubs;

public class IdentityHub : Hub
{
    public async Task SendIdentityResult(bool res)
    {
        await Clients.All.SendAsync("ReceiveMessage", res);
    }
}