import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/core/interfaces/patient';
import { PatientService } from 'src/app/core/services/patient.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  patients: Patient[] = [];
  isVisible:boolean = false;
  isConfirmLoading:boolean = false;

  constructor(private patientService: PatientService, private modalService: NzModalService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.patientService.getPatients().subscribe({
      next: (resp) => {
        this.patients = resp;
      },
      error: (err) => console.log('HTTP Error', err),
      complete: () => console.log('HTTP request completed.'),
    });
  }

  openAddPatientModal() {
    const dialogRef = this.modalService.create({
      nzTitle: 'Add Patient',
      nzContent: AddPatientComponent
    });

    dialogRef.afterClose.subscribe(resp => {
      this.patients.push(resp);
      this.cdr.detectChanges();
    })
  }
}
