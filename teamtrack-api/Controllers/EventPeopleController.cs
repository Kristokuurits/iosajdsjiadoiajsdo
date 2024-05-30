using Microsoft.AspNetCore.Mvc;
using teamtrack_api.Model;

namespace teamtrack_api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventPeopleController : ControllerBase
{
    private readonly DataContext _context;
    public EventPeopleController(DataContext context)
    {
        _context = context;
    }
    
    [HttpGet]
    public IActionResult GetEventPeople()
    {
        return Ok(_context.EventPeopleList);
    }
    
    [HttpPost]
    public IActionResult Create([FromBody] EventPeople ep)
    {
        var dbEventPeople = _context.EventPeopleList?.Find(ep.Id);
        if (dbEventPeople == null)
        {
            _context.EventPeopleList?.Add(ep);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetEventPeople), new { ep.Id }, ep);
        }
        return Conflict();
    }
    
    [HttpPut("{id}")]
    public IActionResult Update(int? id, [FromBody] EventPeople ep)
    {
        if (id != ep.Id || !_context.EventPeopleList!.Any(ep => ep.Id == id)) return NotFound();
        _context.Update(ep);
        _context.SaveChanges();
        return NoContent();
    }
    
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var eventPeopleToDelete = _context.EventPeopleList?.Find(id);
        if (eventPeopleToDelete == null) return NotFound();
        _context.EventPeopleList?.Remove(eventPeopleToDelete);
        _context.SaveChanges();
        return NoContent();
    }
}
