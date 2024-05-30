using Microsoft.AspNetCore.Mvc;
using teamtrack_api.Model;

namespace teamtrack_api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventsController : ControllerBase
{
    private readonly DataContext _context;
    public EventsController(DataContext context)
    {
        _context = context;
    }
    [HttpGet]
    public IActionResult GetEvents()
    {
        return Ok(_context.EventList);
    }
    [HttpPost]
    public IActionResult Create([FromBody] Event e)
    {
        var dbEvent = _context.EventList?.Find(e.Id);
        if (dbEvent == null)
        {
            _context.EventList?.Add(e);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetEvents), new { e.Id }, e);
        }
        return Conflict();
    }
    [HttpPut("{id}")]
    public IActionResult Update(int? id, [FromBody] Event e)
    {
        if (id != e.Id || !_context.EventList!.Any(e => e.Id == id)) return NotFound();
        _context.Update(e);
        _context.SaveChanges();
        return NoContent();
    }
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var eventToDelete = _context.EventList?.Find(id);
        if (eventToDelete == null) return NotFound();
        _context.EventList?.Remove(eventToDelete);
        _context.SaveChanges();
        return NoContent();
    }
}