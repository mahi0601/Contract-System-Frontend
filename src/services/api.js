import axios from 'axios';

const API_URL = 'http://localhost:5002'; 
console.log('API Call:', `${API_URL}/contracts`);

export const fetchContracts = (params) => axios.get(`${API_URL}/contracts`, { params });
export const createContract = async (contractData) => {
    const response = await axios.post(`${API_URL}/contracts`, contractData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  };
// export const updateContract = (id, data) => axios.put(`${API_URL}/contracts/${id}`, data);
export const deleteContract = (id) => axios.delete(`${API_URL}/contracts/${id}`);
export const updateContract = async (id, updatedData) => {
  const response = await axios.put(`${API_URL}/contracts/${id}`, updatedData);

  return response.data;
};
export const getContract = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};