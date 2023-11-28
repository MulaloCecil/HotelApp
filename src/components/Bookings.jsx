import React, { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import 'firebase/firestore';
import { onSnapshot, collection } from 'firebase/firestore';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const colRef = collection(db, 'bookings');
      let rms = [];
      onSnapshot(colRef, (snapshot) => {
        rms = [];
        snapshot.forEach((doc) => {
          const bookingData = doc.data();
          rms.push({
            id: doc.id,
            displayName: bookingData.displayName,
            ...bookingData,
          });
        });
        console.log(rms);
        setBookings(rms);
      });
    };

    fetchBookings();
  }, []);

  return (
    <div className="edit-room-page">
      <h2 className="text-2xl font-bold mb-4">Bookings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {bookings.map((booking) => (
          <div className="room-item border border-gray-300 rounded-md p-4" key={booking.id}>
            <h3 className="text-lg mb-2"><span style={{ fontWeight: 'bold' }}>Booked By:</span> {booking.displayName}</h3>
            <p className="text-gray-600"><span style={{ fontWeight: 'bold' }}>Arrival Date:</span> {booking.bookingStartDate}</p><br />
            <p className="text-gray-600"><span style={{ fontWeight: 'bold' }}>Departure:</span> {booking.bookingEndDate}</p><br />
            <p className="text-gray-600"><span style={{ fontWeight: 'bold' }}>Hotel Address:</span> {booking.hotelAddress}</p><br />
            <p className="text-gray-600"><span style={{ fontWeight: 'bold' }}>Hotel Name:</span> {booking.hotelName}</p><br />
            <p className="text-gray-600"><span style={{ fontWeight: 'bold' }}>Number of Guests:</span> {booking.numberOfGuests}</p><br />
            <p className="text-gray-600"><span style={{ fontWeight: 'bold' }}>Price:</span> {booking.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;