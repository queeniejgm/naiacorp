export interface Patient {
    id: string;
    name: string;
    age: number;
    sex: string;
    checkInDate: Date;
  }
  
  export interface CreatePatientParameter {
    name: string;
    age: number;
    sex: string;
    checkInDate: Date;
  }