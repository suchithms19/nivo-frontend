import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BACKEND_URL from '../config';
import { InputField } from './AddCustomerForm';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const SelfAddBook = () => {
  const navigate = useNavigate();
  const { businessName } = useParams();
  const [user, setUser] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    age: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/user/get-user-by-business/${businessName}`);
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError('Invalid business URL or business not found.');
      }
    };
    
    if (businessName) {
      fetchUser();
    }
  }, [businessName]);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (!user?._id || !selectedDate) return;

      try {
        const dateToFetch = new Date(selectedDate);
        dateToFetch.setHours(0, 0, 0, 0);

        const response = await axios.get(
          `${BACKEND_URL}/api/v1/appointment/available-slots/${user._id}/${dateToFetch.toISOString()}`
        );
        
        const sortedSlots = response.data.sort((a, b) => 
          new Date(a.startTime) - new Date(b.startTime)
        );
        
        setAvailableSlots(sortedSlots);
        setSelectedSlot(null);
      } catch (err) {
        console.error('Error fetching slots:', err);
        setError('Failed to fetch available slots.');
      }
    };

    fetchAvailableSlots();
  }, [user, selectedDate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!user?._id) {
      setError('Business not found.');
      return;
    }
    
    if (!formData.name || !formData.phoneNumber || !selectedSlot) {
      setError('Name, phone number, and time slot are required.');
      return;
    }
    
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/appointment/book/${user._id}`, {
        ...formData,
        startTime: selectedSlot.startTime
      });
      
      if (response.status === 201) {
        navigate('/thankyou-book', { 
          state: { 
            userId: user._id, 
            patientId: response.data.patient._id,
            appointmentTime: selectedSlot.startTime,
          }
        });
      }
    } catch (err) {
      console.error('Error booking appointment:', err);
      if (err.response?.status === 400) {
        setError(err.response.data.message);
        const dateToFetch = new Date(selectedDate);
        dateToFetch.setHours(0, 0, 0, 0);
        const slotsResponse = await axios.get(
          `${BACKEND_URL}/api/v1/appointment/available-slots/${user._id}/${dateToFetch.toISOString()}`
        );
        setAvailableSlots(slotsResponse.data);
        setSelectedSlot(null);
      } else {
        setError('Failed to book appointment. Please try again.');
      }
    }
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Function to get today and next 4 days (excluding Sundays)
  const getAvailableDates = () => {
    const dates = [];
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Normalize current date
    
    while (dates.length < 5) {
      // Skip Sundays
      if (currentDate.getDay() !== 0) {
        dates.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return dates;
  };

  // Function to format date for display
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  // Custom date selection for DatePicker
  const isDateSelectable = (date) => {
    const availableDates = getAvailableDates();
    const lastAvailableDate = availableDates[availableDates.length - 1];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return date.getDay() !== 0 && // Not Sunday
           date <= lastAvailableDate && // Not beyond 4 days
           date >= today; // Not before today
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-4 sm:p-8 rounded-lg shadow-md w-full max-w-[32rem] relative">
        <div className="flex flex-col justify-center items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-center">
            Book Appointment with <span className='capitalize'>{user?.businessName || 'Loading...'}</span>
          </h2>
          {error && <div className="text-red-500 text-center mt-2 text-sm">{error}</div>}
        </div>
        
        {!error.includes('Invalid business URL') && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField label="Name" name="name" value={formData.name} onChange={handleChange} required />
            <InputField label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} type="tel" required />
            <InputField label="Age" name="age" value={formData.age} onChange={handleChange} type="number" />
            
            {/* Date Selection */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Select Date
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {getAvailableDates().map((date, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`p-2 text-sm rounded-md text-center ${
                      selectedDate.toDateString() === date.toDateString()
                        ? 'bg-cuspurple text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    } transition-colors duration-200`}
                    onClick={() => setSelectedDate(date)}
                  >
                    <div className="text-xs sm:text-sm">{formatDate(date)}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Available Slots
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {availableSlots.map((slot, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`p-2 text-xs sm:text-sm rounded-md ${
                      selectedSlot === slot
                        ? 'bg-cuspurple text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    } transition-colors duration-200`}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    {formatTime(slot.startTime)}
                  </button>
                ))}
                {availableSlots.length === 0 && (
                  <p className="col-span-2 sm:col-span-3 text-center text-gray-500 py-2 text-sm">
                    No available slots for this date
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-md transition-all duration-200 ${
                !selectedSlot 
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-cuspurple hover:scale-105'
              } text-white`}
              disabled={!selectedSlot}
            >
              Book Appointment
            </button>
          </form>
        )}
      </div>
      <footer className="mt-4 text-center text-gray-600 text-sm">
        Powered by <a href="https://getnivo.tech" target="_blank" rel="noopener noreferrer" className="text-cuspurple">Nivo</a>
      </footer>
    </div>
  );
};

export default SelfAddBook;