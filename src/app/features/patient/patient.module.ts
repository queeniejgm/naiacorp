import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientRoutingModule } from './patient-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PatientRoutingModule
  ],
  exports: [PatientRoutingModule]
})
export class PatientModule { }
