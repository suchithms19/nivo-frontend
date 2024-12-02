import React from 'react';
import { Check, Bell } from 'lucide-react';

const BookingRow = ({ booking }) => {
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="my-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 cursor-pointer transform">
      <div className="flex flex-col">
        {/* Top Section - Name and Actions */}
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="text-base font-medium text-gray-900 capitalize">
                {booking.patientId.name}
              </h3>
            </div>
            <p className="text-sm text-gray-500">
              +91 {booking.patientId.phoneNumber}
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button 
              className="p-1.5 rounded-full hover:bg-green-100 transition-colors duration-200"
              title="Add to Waitlist"
            >
              <Check className="w-4 h-4 text-green-500" />
            </button>
            <button 
              className="p-1.5 rounded-full text-yellow-500 hover:bg-yellow-100"
              title="Notify Customer"
            >
              <Bell className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Section - Time */}
        <div className="mt-2 text-xs font-medium text-gray-500">
          Time: {formatTime(booking.startTime)}
        </div>
      </div>
    </div>
  );
};

export default BookingRow;
