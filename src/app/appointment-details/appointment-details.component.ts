import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment-service.service';
import { PatientDoctorAppointmentDto } from '../interface/PatientDoctorAppointmentDto';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointment-details',
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.css'
})
export class AppointmentDetailsComponent implements OnInit {
  patientId: number = 0;
  selectedStatus: string = '';
  appointments: PatientDoctorAppointmentDto[] = [];
  searched: boolean = false;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    // Retrieve patientId from localStorage
    const storedPatientId = localStorage.getItem('user_id');
    if (storedPatientId) {
      this.patientId = +storedPatientId;
      console.log('Retrieved Patient ID from localStorage:', this.patientId);
      const parsedUserId = parseInt(storedPatientId, 10);
    } else {
      console.error('Patient ID not found in localStorage.');
      // Optionally redirect to login or show an error message
      // this.router.navigate(['/login']);
    }
  }

  searchAppointments() {
    this.searched = false;
    this.appointments = [];

    if (this.patientId > 0) {
      if (this.selectedStatus) {
        // Fetch appointments by patient ID and status
        this.appointmentService.getAppointmentsByPatientIdAndStatus(this.patientId, this.selectedStatus).subscribe(
          (data) => {
            this.appointments = data;
            this.searched = true;
          },
          (error) => {
            console.error('Error fetching appointments by status:', error);
            this.searched = true;
          }
        );
      } else {
        // Fetch all appointments by patient ID
        this.appointmentService.getAppointmentsByPatientId(this.patientId).subscribe(
          (data) => {
            this.appointments = data;
            this.searched = true;
          },
          (error) => {
            console.error('Error fetching appointments:', error);
            this.searched = true;
          }
        );
      }
    } else {
      alert('Patient ID not found. Please log in again.');
      // Optionally redirect the user to login or another appropriate page
      // this.router.navigate(['/login']);
    }
  }

  deleteAppointment(appointmentId: number) {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.appointmentService.deleteAppointment(appointmentId).subscribe(
        (response: string) => {
          // Remove the deleted appointment from the list
          this.appointments = this.appointments.filter(app => app.appId !== appointmentId);
          alert(response); // This should display "Deleted Successfully"
        },
        (error) => {
          console.error('Error deleting appointment:', error);
          alert('Failed to delete the appointment.');
        }
      );
    }
  }
}