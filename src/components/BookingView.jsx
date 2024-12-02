import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BACKEND_URL from '../config';
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

export function BookingView() {
  const [appointments, setAppointments] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateIndex, setDateIndex] = useState(0);

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/appointment/user-appointments`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        // Group appointments by date and time
        const grouped = response.data.reduce((acc, appointment) => {
          const date = new Date(appointment.startTime).toDateString();
          const time = new Date(appointment.startTime).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          });
          
          if (!acc[date]) {
            acc[date] = {};
          }
          acc[date][time] = appointment;
          return acc;
        }, {});

        setAppointments(grouped);
      } catch (err) {
        setError('Failed to fetch appointments');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Get all dates from Dec 1 to current date + 7 days
  const getAllDates = () => {
    const dates = [];
    const startDate = new Date(new Date().getFullYear(), 11, 1); // December 1st
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 15); // Current date + 15 days
    
    let currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  // Generate all possible time slots
  const getTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 17; hour++) {
      for (let minute of [0, 30]) {
        slots.push(
          `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        );
      }
    }
    return slots;
  };

  const allDates = getAllDates();
  const timeSlots = getTimeSlots();
  const visibleDates = allDates.slice(dateIndex, dateIndex + 3);
  const hasMoreDates = dateIndex + 3 < allDates.length;
  const hasPreviousDates = dateIndex > 0;

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const formatDisplayTime = (time) => {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-gray-600">Loading appointments...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Header with Navigation */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Bookings Overview
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setDateIndex(prev => Math.max(0, prev - 3))}
                disabled={!hasPreviousDates}
                className={`p-2 rounded-full ${
                  hasPreviousDates 
                    ? 'bg-cuspurple text-white hover:scale-105' 
                    : 'bg-cuspurple text-white cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setDateIndex(prev => prev + 3)}
                disabled={!hasMoreDates}
                className={`p-2 rounded-full ${
                  hasMoreDates 
                    ? 'bg-cuspurple text-white hover:scale-105' 
                    : 'bg-cuspurple text-white cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Timeline View */}
          <div className="grid grid-cols-[auto,1fr,1fr,1fr] gap-4">
            {/* Time slots column */}
            <div className="pt-14"> {/* Offset for date headers */}
              {timeSlots.map(time => (
                <div key={time} className="h-16 flex items-center justify-end pr-4 text-sm text-gray-500">
                  {formatDisplayTime(time)}
                </div>
              ))}
            </div>

            {/* Date columns */}
            {visibleDates.map(date => (
              <div key={date.toDateString()} className="flex flex-col">
                {/* Date header */}
                <div className="h-14 flex items-center justify-center bg-gray-50 rounded-lg mb-4">
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-800">
                      {formatDate(date)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {Object.keys(appointments[date.toDateString()] || {}).length} bookings
                    </div>
                  </div>
                </div>

                {/* Time slots */}
                {timeSlots.map(time => {
                  const appointment = appointments[date.toDateString()]?.[time];
                  return (
                    <div 
                      key={`${date.toDateString()}-${time}`} 
                      className="h-16 border-l-2 border-gray-100 pl-2"
                    >
                      {appointment ? (
                        <div className="h-14 border-2 border-gray-100  rounded-lg p-2 text-xs">
                          <div className="font-medium text-gray-900">
                            {appointment.patientId.name}
                          </div>
                          <div className="text-gray-500">
                            +91 {appointment.patientId.phoneNumber}
                          </div>
                        </div>
                      ) : (
                        <div className="h-14 border border-dashed border-gray-200 rounded-lg"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}