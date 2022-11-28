import { Component, Input, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";
import { Patient } from "src/app/core/interfaces/patient";
import { PatientService } from "src/app/core/services/patient.service";

@Component({
  selector: "app-add-patient",
  templateUrl: "./add-patient.component.html",
  styleUrls: ["./add-patient.component.scss"],
})
export class AddPatientComponent implements OnInit {

  @Input() patientData: Patient | undefined;
  createPatientForm!: FormGroup;

  constructor(
    private modalService: NzModalService,
    private modal: NzModalRef,
    private fb: FormBuilder,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.createPatientForm = this.fb.group({
      name: [this.patientData?.name, [Validators.required]],
      age: [this.patientData?.age, [Validators.required]],
      sex: [this.patientData?.sex],
      checkInDate: [this.patientData?.checkInDate, [Validators.required]],
    });
  }

  submitForm() {
    const formVal = this.createPatientForm.getRawValue();

    if(this.patientData) {
      this.patientService.updatePatient(formVal, this.patientData.id).subscribe({
        next: (res) => {
          this.modal.close(res);
          this.modalService.success({
            nzTitle: `Patient ${formVal.name} has been updated`
          });
        },
        error: (err) => {
          this.modalService.error({
            nzTitle: 'This is an error message',
            nzContent: err.message
          });
        },
        complete: () => console.log("HTTP request completed."),
      });
    } else {
      this.patientService.createPatient(formVal).subscribe({
        next: (res) => {
          this.modal.close(res);
          this.modalService.success({
            nzTitle: `Patient ${formVal.name} has been addeed`
          });
        },
        error: (err) => {
          this.modalService.error({
            nzTitle: 'This is an error message',
            nzContent: err.message
          });
        },
        complete: () => console.log("HTTP request completed."),
      });
    }
  }

  destroyModal(): void {
    this.modal.destroy();
  }
}
