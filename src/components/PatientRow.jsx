import React, { useState } from 'react';
import axios from 'axios';
import BACKEND_URL from '../config';
import RealTimeWaitTime from './RealTime';
import { Bell, Check, Trash2 } from 'lucide-react';

const PatientRow = ({ patient, section }) => {
  const [showConfirm, setShowConfirm] = useState(false);
 

  const changeWaittoServe = async () => {
    const token = localStorage.getItem('token');
    
    try {
      await axios.put(
        `${BACKEND_URL}/api/v1/queue/patient/${patient._id}/serve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      window.location.reload() //to reload page
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
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      window.location.reload()
      console.log('Status changed to Complete');
    } catch (error) {
      console.error('Error changing status to Complete:', error);
    }
  };

  const cancelPatient = async () => {
    const token = localStorage.getItem('token');
    
    try {
      await axios.put(
        `${BACKEND_URL}/api/v1/queue/patient/${patient._id}/cancelled`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      window.location.reload() //to reload page
      console.log('Patient marked as canceled');
    } catch (error) {
      console.error('Error canceling patient:', error);
    }
  };

  return (
    <div className="my-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 cursor-pointer transform ">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-900 capitalize">
            {patient.name} {patient.selfRegistered && <span className="text-xs text-cuspurple">(Self-Reg)</span>}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm ">+91 {patient.phoneNumber}</div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm">
            {section === 'waitlist' ? <RealTimeWaitTime entryTime={patient.entryTime} /> : <RealTimeWaitTime entryTime={patient.postConsultation} />}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={section === 'waitlist' ? changeWaittoServe : changeServetoComplete}
            className="p-2 rounded-full hover:bg-green-100 transition-colors duration-200"
          >
            <Check className="w-5 h-5 text-green-500" />
          </button>
          <button className="p-2 rounded-full text-yellow-500 hover:bg-yellow-100">
            <Bell size={19} />
          </button>
          {section === 'waitlist' && (
            <button 
              onClick={() => setShowConfirm(true)}
              className="p-2 rounded-full text-red-500 hover:bg-red-100"
            >
              <Trash2 size={19} />
            </button>
          )}
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="mb-4">Are you sure you want to cancel this patient?</p>
            <button
              onClick={() => {
                cancelPatient();
                setShowConfirm(false);
              }}
              className="bg-red-500 text-white py-2 px-4 rounded-lg mr-2 hover:scale-105"
            >
              Yes
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="bg-gray-300 text-gray-900 py-2 px-4 rounded-lg hover:scale-105"
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientRow;