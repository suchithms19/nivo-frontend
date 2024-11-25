import React, { useState } from 'react';
import PatientRow from './PatientRow';
import {getWaitlist,getServelist} from '../hooks';
import { useNavigate } from 'react-router-dom';

const PatientList = () => {
  const { data, loading, error } =getWaitlist();
  const { datas, loadings, errors } =getServelist();
  const navigate = useNavigate();

  function onClick(){
    navigate('/addcustomer')
  }

  return (
    <div className="bg-gray-100 min-h-screen h-max">
      <div className="max-w-7xl mx-auto overflow-x-auto">
        <div className="flex gap-4">
          {/* Waitlist Section */}
          <div className="bg-white rounded-lg shadow-sm mb-8 flex-1">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">Waitlist</h2>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <span className="flex items-center mr-4">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                      </svg>
                      {`${data.length} persons`}
                    </span>
                  </div>
                </div>
                <button onClick={onClick} style={{ backgroundColor: "#605BFF"}} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:scale-105 transition duration-150 ease-in-out">
                  + Add Customer
                </button>
              </div>
            </div>
            <div className="px-6">
              {/* Waitlist Headers */}
              <div className="my-3 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-gray-500">NAME</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-gray-500">&nbsp; PHONE</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-gray-500">&nbsp; &nbsp;TIME WAITED</div>
                  </div>
                  <div className="w-24"></div>
                </div>
              </div>
              { (
                data.map((item) => (
                  <PatientRow key={item._id} patient={item.patient} section="waitlist" />
                ))
              )}
            </div>
          </div>

          {/* Serving Section */}
          <div className="bg-white rounded-lg shadow-sm mb-8 flex-1">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Serving</h2>
              <div className="text-sm text-gray-500 mt-1">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                  </svg>
                  { `${datas.length} persons`}
                </span>
              </div>
            </div>
            <div className="px-6">
              {/* Serving Headers */}
              <div className="my-3 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-gray-500">NAME</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-gray-500">&nbsp;PHONE</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-gray-500">&nbsp; &nbsp;SERVING TIME</div>
                  </div>
                  <div className="w-24"></div>
                </div>
              </div>
              { (
                datas.map((item) => (
                  <PatientRow key={item._id} patient={item.patient} section="serving" />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientList;
