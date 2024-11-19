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
  
    return { datas, loadings, errors };
  };

  const getAllPatient = () => {
    const token = localStorage.getItem('token');
    const [dataall, setDataAll] = useState([]);
    const [loadingall, setLoadingAll] = useState(true);
    const [errorall, setErrorAll] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/api/v1/queue/allpatient`,{
            headers: {
              Authorization: `Bearer ${token}` 
            }
          });
          setDataAll(response.data);
        } catch (error) {
          setErrorAll(error);
        } finally {
          setLoadingAll(false);
        }
      };

      fetchData();
    }, []);

    return { dataall, loadingall, errorall };
  };



const useWaitlist = (userId) => {
  const [waitlist, setWaitlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWaitlist = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/queue/public-waitlist/${userId}`);
        setWaitlist(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWaitlist();
  }, [userId]);

  return { waitlist, loading, error };
};

const useQueueStatus = (userId) => {
  const [queueStatus, setQueueStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQueueStatus = async () => {
      if (userId) {
        try {
          const response = await axios.get(`${BACKEND_URL}/api/v1/user/queue-status/${userId}`);
          setQueueStatus(response.data);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchQueueStatus();
  }, [userId]);

  return { queueStatus, loading, error };
};

export {getServelist,getWaitlist,getAllPatient,useWaitlist,useQueueStatus};