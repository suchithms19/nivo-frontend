import { useState, useEffect } from 'react';
import axios from 'axios';
import BACKEND_URL from "../config";

const getWaitlist = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_URL}/api/v1/queue/waitlist`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  return { data, loading, error };
};


const getServelist = () => {
    const token = localStorage.getItem('token');
    const [datas, setData] = useState([]);
    const [loadings, setLoading] = useState(true);
    const [errors, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${BACKEND_URL}/api/v1/queue/serving`,
            {
              headers: {
                Authorization: `Bearer ${token}` // Add the token to Authorization header
              }
            });
          setData(response.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []); 
  
    return { datas, loadings, errors };
  };

const getAllPatient = () => {
    const token = localStorage.getItem('token');
    const [dataall, setData] = useState([]);
    const [loadingsall, setLoading] = useState(true);
    const [errorsall, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${BACKEND_URL}/api/v1/queue/allpatient`,
            {
              headers: {
                Authorization: `Bearer ${token}` // Add the token to Authorization header
              }
            });
          setData(response.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []); 
  
    return { dataall, loadingsall, errorsall };
  };

  
export {getServelist,getWaitlist,getAllPatient};