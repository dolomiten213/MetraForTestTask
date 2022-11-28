using Api.Callers;
using Domain.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;


[ApiController]
[Authorize]
[Route("/api/identify")]
public class IdentifyController : ControllerBase
{
    private readonly IdentityCaller _identityCaller;

    public IdentifyController(IdentityCaller identityCaller)
    {
        _identityCaller = identityCaller;
    }
    
    [HttpPost("")]
    public ActionResult Start(DataDto data)
    {
        var res = _identityCaller.Start(data);
        return res ? Ok() : BadRequest();
    }
}