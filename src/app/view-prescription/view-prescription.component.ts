import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrescriptionService } from '../prescription.service';
import { Prescription } from '../interface/prescription';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-prescription',
  templateUrl: './view-prescription.component.html',
  styleUrls: ['./view-prescription.component.css'],
  providers:[DatePipe],
  imports:[CommonModule,FormsModule]
})
export class ViewPrescriptionComponent implements OnInit {
  appointmentId: number;
  prescription: Prescription | null = null;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private prescriptionService: PrescriptionService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.appointmentId = +params.get('appointmentId')!;
      this.loadPrescription();
    });
  }

  loadPrescription(): void {
    this.prescriptionService
      .getPrescriptionByAppointmentId(this.appointmentId)
      .subscribe(
        (data) => {
          this.prescription = data;
        },
        (error) => {
          console.error('Error fetching prescription', error);
          this.errorMessage = 'Error fetching prescription.';
        }
      );
  }
}
