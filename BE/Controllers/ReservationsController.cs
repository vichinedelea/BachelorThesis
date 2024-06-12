using BEapplication.DBContexts;
using BEapplication.Interfaces;
using BEapplication.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace BEapplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly IReservationLogic _reservationLogic;

        public ReservationsController(ApplicationContext context, IReservationLogic reservationLogic)
        {
            _context = context;
            _reservationLogic = reservationLogic;
        }

        [HttpPost]
        [AllowAnonymous]
        [EnableCors("AllowLocalhost3000")]
        public async Task<IActionResult> AddReservation(RequestNewReservation newReservation)
        {
            await _reservationLogic.AddReservation(newReservation);

            return Ok(newReservation);
        }

        [HttpGet("{email}")]
        [AllowAnonymous]
        [EnableCors("AllowLocalhost3000")]
        public async Task<ActionResult<List<Reservation>>> GetReservations(string email)
        {
            var reservations = await _reservationLogic.GetReservations(email);
            return Ok(reservations);
        }

        [HttpDelete("{id}")]
        [AllowAnonymous]
        [EnableCors("AllowLocalhost3000")]
        public async Task<IActionResult> DeleteReservation(Guid id)
        {
            await _reservationLogic.DeleteReservation(id);

            return Ok();
        }
    }
}
