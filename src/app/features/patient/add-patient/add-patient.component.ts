import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";
import { PatientService } from "src/app/core/services/patient.service";

@Component({
  selector: "app-add-patient",
  templateUrl: "./add-patient.component.html",
  styleUrls: ["./add-patient.component.scss"],
})
export class AddPatientComponent implements OnInit {
  createPatientForm!: FormGroup;

  constructor(
    private modalService: NzModalService,
    private modal: NzModalRef,
    private fb: FormBuilder,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.createPatientForm = this.fb.group({
      name: [null, [Validators.required]],
      age: [null, [Validators.required]],
      sex: [null],
      checkInDate: [null, [Validators.required]],
    });
  }

  submitForm() {
    const formVal = this.createPatientForm.getRawValue();

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

  destroyModal(): void {
    this.modal.destroy();
  }
}
