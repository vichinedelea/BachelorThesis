import React, { useState, useEffect } from 'react';
import BackToHomePageButton from './BackToHomePageButton';
import { useEmail } from './EmailContext';

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { email } = useEmail();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(`https://localhost:5001/api/reservations/${email}`);
        if (!response.ok) {
          throw new Error('Failed to fetch reservations');
        }
        const data = await response.json();
        setReservations(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchReservations();
  }, [email]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://localhost:5001/api/reservations/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete reservation');
      }
      setReservations(reservations.filter(reservation => reservation.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-image vh-100">
      <div className="bg-white p-3 rounded w-50">
        <h2>My Reservations</h2>
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}
        <ul className="list-group">
          {reservations.map(reservation => (
            <li key={reservation.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <p>Hour: {reservation.hour}</p>
                <p>Day: {reservation.day}</p>
                <p>Month: {reservation.month}</p>
                <p>Year: {reservation.year}</p>
                <p>Activity: {reservation.activity}</p>
              </div>
              <button onClick={() => handleDelete(reservation.id)} className="btn btn-danger">Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <BackToHomePageButton />
    </div>
  );
};

export default MyReservations;
