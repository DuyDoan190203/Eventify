using MediatR;
using Microsoft.AspNetCore.Mvc;

//DRY Principle in Programming

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseAPIController : ControllerBase
    {
       private IMediator _mediator;

       protected IMediator Mediator => _mediator ??= 
            HttpContext.RequestServices.GetService<IMediator>();
        
    }
}