import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PatientParameters, Patient } from '../interfaces/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  baseUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getPatients(): Observable<Patient[]> {
    return this.http.get<any>(
      `${this.baseUrl}/patients`
    );
  }

  createPatient(params: PatientParameters): Observable<Patient> {
    return this.http.post<any>(`${this.baseUrl}/patients`, params);
  }

  updatePatient(params: PatientParameters, id: string): Observable<Patient> {
    return this.http.patch<any>(`${this.baseUrl}/patients/${id}`, params);
  }

  deletePatient(id: string): Observable<Patient> {
    return this.http.delete<any>(`${this.baseUrl}/patients/${id}`);
  }
}
