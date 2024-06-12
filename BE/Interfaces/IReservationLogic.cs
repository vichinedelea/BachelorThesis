using BEapplication.Models;

namespace BEapplication.Interfaces
{
    public interface IReservationLogic
    {
        public Task AddReservation(RequestNewReservation newReservation);

        public Task<List<Reservation>> GetReservations(string email);

        public Task DeleteReservation(Guid id);
    }
}
