import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DoctorService } from '../doctor-service.service';
import { Doctor, FilteredDoctor } from '../interface/doctor';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-appointment',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent {
    specialization: string = '';
    doctors: Doctor[] = [];
    searched: boolean = false;
  
    constructor(private doctorService: DoctorService,private router:Router) { }
  
    searchDoctors(): void {
      if (this.specialization.trim() === '') {
        // Optionally notify the user to enter a specialization
        return;
      }
  
      this.doctorService.getDoctorsBySpecialization(this.specialization).subscribe(
        (data: Doctor[]) => {
          this.doctors = data;
          this.searched = true;
        },
        error => {
          console.error('Error fetching doctors by specialization:', error);
          // Handle error (e.g., show a notification)
        }
      );
    }
    navigateToBookAppointment(doctorId: number) {
      this.router.navigate(['/book-appointment', doctorId]);
    }
  }

