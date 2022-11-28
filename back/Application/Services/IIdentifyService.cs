using Domain.Dto;

namespace Application.Services;

public interface IIdentifyService
{
    Task<bool> IdentifyAsync(DataDto data);
}