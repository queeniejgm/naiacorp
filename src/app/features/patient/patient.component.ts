import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/core/interfaces/patient';
import { PatientService } from 'src/app/core/services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  patients: Patient[] = [];
  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.patientService.getPatients().subscribe({
      next: (resp) => {
        this.patients = resp;
      },
      error: (err) => console.log('HTTP Error', err),
      complete: () => console.log('HTTP request completed.'),
    });
  }

}
