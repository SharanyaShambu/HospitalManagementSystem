import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from '../prescription.service';
import { Prescription } from '../interface/prescription';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
  providers: [DatePipe]
})
export class PrescriptionComponent implements OnInit {
  patientId: number = 0;
  prescription: Prescription | null = null;
  errorMessage: string | null = null;
  noPrescriptionFound: boolean = false;

  constructor(
    private prescriptionService: PrescriptionService,
    private router: Router
  ) { }

  ngOnInit() {
    // Retrieve patientId from localStorage
    const storedPatientId = localStorage.getItem('user_id');
    if (storedPatientId) {
      const parsedUserId = parseInt(storedPatientId, 10);
      if (!isNaN(parsedUserId)) {
        this.patientId = parsedUserId;
        console.log('Retrieved Patient ID from localStorage:', this.patientId);

        // Automatically fetch the prescription without calling a separate method
        this.errorMessage = null;
        this.prescription = null;
        this.noPrescriptionFound = false;

        if (this.patientId > 0) {
          this.prescriptionService.getPrescriptionByPatientId(this.patientId).subscribe(
            (data) => {
              if (data) {
                this.prescription = data;
                this.noPrescriptionFound = false;
              } else {
                // No prescription found
                this.noPrescriptionFound = true;
              }
            },
            (error) => {
              console.error('Error fetching prescription:', error);
              this.prescription = null;
              this.noPrescriptionFound = true;
              this.errorMessage = error.error || 'An error occurred while fetching the prescription.';
            }
          );
        } else {
          this.errorMessage = 'Invalid Patient ID.';
        }
      } else {
        console.error('Invalid Patient ID in localStorage.');
        this.router.navigate(['/login']);
      }
    } else {
      console.error('Patient ID not found in localStorage.');
      this.router.navigate(['/login']);
    }
  }
}
