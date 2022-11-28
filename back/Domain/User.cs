
namespace Domain;

public class User
{
    public string Username { get; init; }
    public byte[] PasswordHash { get; set; }
    public byte[] PasswordSalt { get; set; }
}