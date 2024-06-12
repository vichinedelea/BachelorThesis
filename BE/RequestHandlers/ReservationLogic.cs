using BEapplication.DBContexts;
using BEapplication.Interfaces;
using BEapplication.Models;
using Microsoft.EntityFrameworkCore;

namespace BEapplication.RequestHandlers
{
    public class ReservationLogic : IReservationLogic
    {
        private ApplicationContext _context;

        public ReservationLogic(ApplicationContext context)
        {
            _context = context;
        }

        public async Task AddReservation(RequestNewReservation newReservation)
        {
            var reservation = new Reservation
            {
                Id = Guid.NewGuid(),
                Email = newReservation.Email,
                Hour = newReservation.Hour,
                Day = newReservation.Day,
                Month = newReservation.Month,
                Year = newReservation.Year,
                Activity = newReservation.Activity,
            };

            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Reservation>> GetReservations(string email)
        {
            var reservations = await _context.Reservations.Where(r => r.Email == email).ToListAsync();

            return reservations;
        }

        public async Task DeleteReservation(Guid id)
        {
            var reservation = await _context.Reservations.FirstOrDefaultAsync(r => r.Id == id);

            _context.Reservations.Remove(reservation);
            _context.SaveChanges();
        }
    }
}
