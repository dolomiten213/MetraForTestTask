using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Application.Services;
using Domain;
using Domain.Dto;
using Infrastructure.Contexts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Api.Controllers;

[ApiController]
[Route("/api/auth")]
public class AuthController : ControllerBase
{
    private readonly Context _context;

    public AuthController(Context context)
    {
        _context = context;
    }

    
    [HttpPost("sign-up")]
    public async Task<ActionResult<TokenDto>> Register(AuthDto request)
    {
        if (await _context.Users.AnyAsync(x => x.Username == request.Username))
        {
            return BadRequest("already have user with this username");
        }
       
        CreatePasswordHash(request.Password, out var hash, out var salt);

        var user = new User
        {
            Username = request.Username,
            PasswordHash = hash,
            PasswordSalt = salt
        };

        _context.Add(user);
        await _context.SaveChangesAsync();
                  
        return await Login(request);
    }
    
    [HttpPost("login")]
    public async Task<ActionResult<TokenDto>> Login(AuthDto credentials)
    {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Username == credentials.Username);
        if (user is null)
        {
            return NotFound();
        }

        if (VerifyPasswordHash(credentials.Password, user.PasswordHash, user.PasswordSalt))
        {
            return Ok(new TokenDto(CreateToken(user)));
        }
        
        return Unauthorized();
    }
    
    
    
    private static void CreatePasswordHash(string password, out byte[] hash, out byte[] salt)
    {
        using var hmac = new HMACSHA512();
        salt = hmac.Key;
        hash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
    }
    private static string CreateToken(User user)
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.Name, user.Username),
            new(ClaimTypes.Role, "user")
        };

        var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("1234567890ABCDEF"));

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Today.AddDays(1).AddHours(4).ToUniversalTime(),
            signingCredentials: creds);

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);

        return jwt;
    }
    private static bool VerifyPasswordHash(string password, byte[] hash, byte[] salt)
    {
        using var hmac = new HMACSHA512(salt);
        return hash.SequenceEqual(hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password)));
    }
}