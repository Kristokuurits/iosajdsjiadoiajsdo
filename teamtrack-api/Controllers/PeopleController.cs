using Microsoft.AspNetCore.Mvc;
using teamtrack_api.Model;

namespace teamtrack_api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PeopleController : ControllerBase
{
    private readonly DataContext _context;
    public PeopleController(DataContext context)
    {
        _context = context;
    }
    
    [HttpGet]
    public IActionResult GetPeople()
    {
        return Ok(_context.PeopleList);
    }
    
    [HttpPost]
    public IActionResult Create([FromBody] People ep)
    {
        var dbPeople = _context.PeopleList?.Find(ep.Id);
        if (dbPeople == null)
        {
            _context.PeopleList?.Add(ep);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetPeople), new { ep.Id }, ep);
        }
        return Conflict();
    }
    
    [HttpPut("{id}")]
    public IActionResult Update(int? id, [FromBody] People ep)
    {
        if (id != ep.Id || !_context.PeopleList!.Any(ep => ep.Id == id)) return NotFound();
        _context.Update(ep);
        _context.SaveChanges();
        return NoContent();
    }
    
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var PeopleToDelete = _context.PeopleList?.Find(id);
        if (PeopleToDelete == null) return NotFound();
        _context.PeopleList?.Remove(PeopleToDelete);
        _context.SaveChanges();
        return NoContent();
    }
}
