using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                //we get the activity from the database
                var activity = await _context.Activities.FindAsync(request.Activity.Id);

                //map props to props that belong to different Objects Using AUTOMAPPER  
                _mapper.Map(request.Activity, activity);

                await _context.SaveChangesAsync();
            }
        }
    }
}