
using System.Text.Json.Serialization;
using Api.Callers;
using Api.Extensions;
using Api.Hubs;
using Application.Services;
using Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    options.JsonSerializerOptions.WriteIndented = true;
});

builder.Services.AddSwagger();
builder.Services.AddSignalR();

builder.Services.AddTokenAuthentication();

builder.Services.AddRepository(builder.Configuration.GetConnectionString("Context"));

builder.Services.AddScoped<IIdentifyService, IdentifyService>();
builder.Services.AddTransient<IdentityCaller>();

var app = builder.Build();

app.UseCors(x => x
    .WithOrigins("http://localhost:3000")
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials());

app.UseSwagger();

app.UseSwaggerUI();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.MapHub<IdentityHub>("/identity");

app.Run();