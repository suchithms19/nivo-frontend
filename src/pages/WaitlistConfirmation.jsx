import React, { useEffect, useState } from 'react';
import { Check, Clock, Phone } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import BACKEND_URL from '../config';

const WaitlistConfirmation = () => {
  const location = useLocation();
  const [queueStatus, setQueueStatus] = useState(null);
  const [doctorName, setDoctorName] = useState('');
  const userId = location.state?.userId;

  useEffect(() => {
    const fetchQueueStatus = async () => {
      if (userId) {
        try {
          const [statusResponse, userResponse] = await Promise.all([
            axios.get(`${BACKEND_URL}/api/v1/user/queue-status/${userId}`),
            axios.get(`${BACKEND_URL}/api/v1/user/businessName/${userId}`)
          ]);
          
          setQueueStatus(statusResponse.data);
          setDoctorName(userResponse.data.businessName)
        } catch (err) {
          console.error('Error fetching queue status:', err);
        }
      }
    };
    fetchQueueStatus();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mb-6 flex items-center">
        <h1 className="ml-2 text-xl font-semibold text-gray-900">Waitlist Status</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className='flex items-center justify-center'> 
        <span className="font-semibold  text-xl text-gray-900 text-center capitalize">{doctorName}</span>
        </div>
        <div className="flex items-center justify-center my-4">
          
          <div className="bg-green-100 rounded-full p-2">
            <Check className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <h2 className="text-center text-xl font-semibold text-gray-600 mb-2">
          You're on the waitlist!
        </h2>
       
        
        {queueStatus && (
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
          
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Customers waiting</span>
              <span className="font-semibold text-gray-900">{queueStatus.waitingCount}</span>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-start">
            <Phone className="w-5 h-5 text-indigo-600 mt-1 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">We'll call you</h3>
              <p className="text-gray-600 text-sm">
                When it's almost your turn, we'll call
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <Clock className="w-5 h-5 text-indigo-600 mt-1 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Arrive on time</h3>
              <p className="text-gray-600 text-sm">
                Please arrive within 10 minutes of our call to keep your spot
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitlistConfirmation;