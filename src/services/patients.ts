import axios from 'axios';
import {
  DiagnoseFormInputs,
  PatientFormInputs,
  PatientImageFormInputs,
} from '../common/interfaces';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or unauthorized, redirect to login
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export const createPatient = async (patientData: PatientFormInputs) => {
  try {
    const payload = {
      ...patientData,
      gender: patientData.gender[0],
    };
    const response = await apiClient.post('/api/v1/app/patients', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePatient = async (
  patientData: PatientFormInputs,
  id: number,
) => {
  try {
    const payload = {
      ...patientData,
      gender: patientData.gender[0],
      id,
    };
    const response = await apiClient.put('/api/v1/app/patients', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPatients = async (
  page: number,
  pageSize: number,
  searchQuery: string,
) => {
  try {
    const response = await apiClient.get(
      `/api/v1/app/patients?page=${page}&searchKey=${searchQuery}&size=${pageSize}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePatient = async (id: number) => {
  try {
    const response = await apiClient.delete(`/api/v1/app/patients/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await apiClient.delete(`/api/v1/app/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPatient = async (id: string) => {
  try {
    const response = await apiClient.get(`/api/v1/app/patients/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getImagesByPatient = async (id: string) => {
  try {
    const response = await apiClient.get(`/api/v1/app/images/patient/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDiseases = async () => {
  try {
    const response = await apiClient.get(`/api/v1/app/disease-types`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getImages = async () => {
  try {
    const response = await apiClient.get(`/api/v1/app/image-types`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRoles = async () => {
  try {
    const response = await apiClient.get(`/api/v1/app/user-roles`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSavedImage = async (id: number) => {
  try {
    const response = await apiClient.get(`/api/v1/app/images/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const saveImage = async (
  patientData: PatientImageFormInputs,
  id: number,
) => {
  try {
    const response = await apiClient.post(
      `/api/v1/app/images/patient/${id}`,
      patientData,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateImage = async (
  patientData: PatientImageFormInputs,
  id: number,
) => {
  try {
    const response = await apiClient.put(
      `/api/v1/app/images/${id}`,
      patientData,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteImage = async (id: string) => {
  try {
    const response = await apiClient.delete(`/api/v1/app/images/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDiagnosesById = async (id: string) => {
  try {
    const response = await apiClient.get(`/api/v1/app/diagnoses/patient/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createDiagnosis = async (
  diagnosisData: DiagnoseFormInputs,
  id: string,
) => {
  try {
    const payload = {
      ...diagnosisData,
      patient: {
        id,
      },
    };
    const response = await apiClient.post(
      `/api/v1/app/diagnoses/patient/${id}`,
      payload,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateDiagnosis = async (
  diagnosisData: DiagnoseFormInputs,
  id: string,
  diagnoseId: string,
) => {
  try {
    const payload = {
      ...diagnosisData,
      patient: {
        id,
      },
    };
    const response = await apiClient.put(
      `/api/v1/app/diagnoses/${diagnoseId}`,
      payload,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteDiagnose = async (id: string) => {
  try {
    const response = await apiClient.delete(`/api/v1/app/diagnoses/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDiagnosisById = async (id: string) => {
  try {
    const response = await apiClient.get(`/api/v1/app/diagnoses/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUsers = async (
  page: number,
  pageSize: number,
  searchQuery: string,
) => {
  try {
    const response = await apiClient.get(
      `/api/v1/app/users?page=${page}&searchKey=${searchQuery}&size=${pageSize}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (userData: any) => {
  try {
    const response = await apiClient.post('/api/v1/app/users', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userData: any) => {
  try {
    const response = await apiClient.put('/api/v1/app/users', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUser = async (id: string) => {
  try {
    const response = await apiClient.get(`/api/v1/app/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
