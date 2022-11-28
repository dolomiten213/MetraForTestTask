using Api.Hubs;
using Application.Services;
using Domain.Dto;
using Microsoft.AspNetCore.SignalR;

namespace Api.Callers;

public class IdentityCaller
{
    private readonly IIdentifyService _identifyService;
    private readonly IHubContext<IdentityHub> _hub;

    public IdentityCaller(IIdentifyService identifyService, IHubContext<IdentityHub> hub)
    {
        _identifyService = identifyService;
        _hub = hub;
    }
    
    
    internal bool Start(DataDto data)
    {
        var task = Task.Run(() => _identifyService.IdentifyAsync(data));
        task.ContinueWith(async x =>
        {
            var res = await x;
            Console.WriteLine(res);
            Console.WriteLine(x.Result);
            await _hub.Clients.All.SendAsync("ReceiveMessage", res, "QWQWQWQWW");
        });
        return true;
    }
}