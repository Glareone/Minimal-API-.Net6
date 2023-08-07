﻿using System.Net.Mime;

namespace Chapter02_Architecturing_minimal_api;

public class PeopleHelper : IEndpointRouteHandler
{
    public void MapEndpoints(IEndpointRouteBuilder
        app)
    {
        app.MapGet("/api/people", GetList)
            .Produces<ResponseData>(StatusCodes.Status200OK)
            .WithTags("Endpoint Sample")
            .WithName("GetUserListOperation"); // Operation Ids to OpenAPI

        app.MapGet("/api/people/{id:guid}", Get);
        
        app.MapPost("/api/people", Insert)
            .Accepts<ResponseData>(MediaTypeNames.Application.Json);

        app.MapPut("/api/people/{id:guid}", Update);
        
        app.MapDelete("/api/people/{id:guid}", Delete)
            .ExcludeFromDescription(); // Excluded from Swagger Description
    }

    private static IResult GetList(PeopleService peopleService)
    {
        return Results.Ok(); }

    private static IResult Get(Guid id, PeopleService
        peopleService)
    {
        return Results.Ok(); }

    private static IResult Insert(Person person,
        PeopleService people)
    {
        return Results.Ok(); }

    private static IResult Update(Guid id, Person
        person, PeopleService people)
    {
        return Results.Ok(); }

    private static IResult Delete(Guid id)
    {
        return Results.Ok(true);
    }
}
