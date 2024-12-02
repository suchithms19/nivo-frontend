import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BACKEND_URL from '../config';
import { InputField } from './AddCustomerForm';
import { useNavigate, useParams } from 'react-router-dom';

const SelfAddWait = () => {
  const navigate = useNavigate();
  const { businessName } = useParams();
  const [user, setUser] = useState(null);
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
    
    if (!formData.name || !formData.phoneNumber) {
      setError('Name and phone number are required.');
      return;
    }
    
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/queue/customeradd/${user._id}`, formData);
      const patientId = response.data.patientId;
      navigate('/thankyou', { state: { userId: user._id, patientId } });
    } catch (err) {
      console.error('Error adding patient:', err);
      setError('Failed to add patient. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 relative">
        <div className="flex flex-col justify-center items-center mb-4">
          <h2 className="text-2xl font-bold text-center">
            Welcome to <span className='capitalize'>{user?.businessName || 'Loading...'}</span>
          </h2>
          {error && <div className="text-red-500 text-center mt-2">{error}</div>}
        </div>
        
        {!error.includes('Invalid business URL') && (
          <form onSubmit={handleSubmit}>
            <InputField label="Name" name="name" value={formData.name} onChange={handleChange} required />
            <InputField label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} type="tel" required />
            <InputField label="Age" name="age" value={formData.age} onChange={handleChange} type="number" />   
            <button
              type="submit"
              className="w-full bg-cuspurple text-white py-2 px-4 rounded-md hover:scale-105"
            >
              Join Waitlist
            </button>
          </form>
        )}
      </div>
      <footer className="mt-4 text-center text-gray-600">
        Powered by <a href="https://getnivo.tech" target="_blank" rel="noopener noreferrer" className="text-cuspurple">Nivo</a>
      </footer>
    </div>
  );
};

export default SelfAddWait;