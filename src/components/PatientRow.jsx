import React from 'react';
import axios from 'axios';
import BACKEND_URL from '../config';
import RealTimeWaitTime from './RealTime';
import { Bell, MoreVertical, Check, MessageSquare, Trash2, Edit } from 'lucide-react';

const PatientRow = ({ patient, section }) => {
  
  const changeWaittoServe = async () => {
    const token = localStorage.getItem('token');
    
    try {
      await axios.put(
        `${BACKEND_URL}/api/v1/queue/patient/${patient._id}/serve`,
        {}, // No body, so send an empty object
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      console.log('Status changed to Serve');
    } catch (error) {
      console.error('Error changing status to Serve:', error);
    }
  };
  
  const changeServetoComplete = async () => {
    const token = localStorage.getItem('token');
    
    try {
      await axios.put(
        `${BACKEND_URL}/api/v1/queue/patient/${patient._id}/complete`,
        {}, // No body, so send an empty object
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      console.log('Status changed to Complete');
    } catch (error) {
      console.error('Error changing status to Complete:', error);
    }
  };

  return (
    <div className="my-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 cursor-pointer transform hover:-translate-y-0.5">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-900 capitalize">{patient.name}</div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm ">+91 {patient.phoneNumber}</div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm">
          {section === 'waitlist' ?<RealTimeWaitTime entryTime={patient.entryTime}/>:<RealTimeWaitTime entryTime={patient.postConsultation}/>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={section === 'waitlist' ? changeWaittoServe: changeServetoComplete }
            className="p-2 rounded-full hover:bg-green-100 transition-colors duration-200"
          >
            <svg 
              className="w-5 h-5 text-green-500 " 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M5 13l4 4L19 7"
              />
            </svg>
          </button>
          <button className="p-2 rounded-full text-yellow-500 hover:bg-yellow-100">
          <Bell size={19} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientRow;