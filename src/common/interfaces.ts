export interface LoginFormInputs {
  email: string;
  password: string;
}

export interface PatientFormInputs {
  email: string;
  fName: string;
  gender: string[];
  lName: string;
  mobile: string;
  nic: string;
  password: string;
}

export interface UserFormInputs {
  email: string;
  fName: string;
  role: string[];
  lName: string;
  password: string;
}

export interface UserUpdateFormInputs {
  id: string;
  email: string;
  fName: string;
  role: string[];
  lName: string;
  password: string;
}

export interface ISelectValues {
  label: string;
  value: string;
}

export interface IPatient {
  id: number;
  fname: string;
  lname: string;
  email: string;
  mobile: string;
  nic: string;
  createdDate: string;
  gender: string;
}

export interface ICommon {
  id: number;
  name: string;
  code: string;
}

interface DiseaseType {
  id: string;
}

interface ImageType {
  id: string;
}

interface Patient {
  id: number;
}

export interface PatientImageFormInputs {
  diseaseTypes: DiseaseType;
  imageTypes: ImageType;
  imagebase64: string;
  patient: Patient;
}

export interface DiagnoseFormInputs {
  note: string;
  cost: number;
  diagnosis: string;
}

export interface DiagnoseResponse {
  id: number;
  note: string;
  cost: number;
  diagnosis: string;
  createdDate: string;
}

export interface IUser {
  id: number;
  fname: string;
  lname: string;
  email: string;
  createdDate: string;
  userRole: {
    name: string;
  };
}
