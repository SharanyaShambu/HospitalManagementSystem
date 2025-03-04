import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment-service.service';
import { PatientDoctorAppointmentDto } from '../interface/PatientDoctorAppointmentDto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-doctor-app',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './view-doctor-app.component.html',
  styleUrl: './view-doctor-app.component.css'
})
export class ViewDoctorAppComponent  implements OnInit {
  doctorId: number = 0;
  selectedStatus: string = '';
  appointments: PatientDoctorAppointmentDto[] = [];
  searched: boolean = false;

  constructor(
    private appointmentService: AppointmentService,
    private router: Router
  ) {}

  ngOnInit() {
    // Retrieve the doctor ID from localStorage
    const storedDoctorId = localStorage.getItem('user_id');
    if (storedDoctorId) {
      const parsedDoctorId = parseInt(storedDoctorId, 10);
      if (!isNaN(parsedDoctorId)) {
        this.doctorId = parsedDoctorId;
        console.log('Retrieved Doctor ID from localStorage:', this.doctorId);
        // Fetch all appointments on initialization
        this.getAppointments();
      } else {
        console.error('Invalid Doctor ID in localStorage.');
        // Handle invalid ID, e.g., redirect to login or show an error message
        this.router.navigate(['/login']);
      }
    } else {
      console.error('Doctor ID not found in localStorage.');
      // Handle missing ID, e.g., redirect to login or show an error message
      this.router.navigate(['/login']);
    }
  }

  getAppointments() {
    if (this.selectedStatus && this.selectedStatus.trim() !== '') {
      // Fetch appointments by doctor ID and status
      this.appointmentService.getAppointmentsByDoctorIdAndStatus(this.doctorId, this.selectedStatus).subscribe(
        (data) => {
          this.appointments = data;
          this.searched = true;
        },
        (error) => {
          console.error('Error fetching appointments by status:', error);
          this.appointments = [];
          this.searched = true;
        }
      );
    } else {
      // Fetch all appointments by doctor ID
      this.appointmentService.getAppointmentsByDoctorId(this.doctorId).subscribe(
        (data) => {
          this.appointments = data;
          this.searched = true;
        },
        (error) => {
          console.error('Error fetching appointments:', error);
          this.appointments = [];
          this.searched = true;
        }
      );
    }
  }

  // Call this method when the status filter changes
  onStatusChange() {
    this.getAppointments();
  }

  // Accept an appointment
  acceptAppointment(appointmentId: number) {
    this.appointmentService.acceptAppointment(appointmentId).subscribe(
      (response: string) => {
        alert(response); // Displays "Accepted Successfully"
        // Update the appointments list
        this.updateAppointmentStatus(appointmentId, 'Accepted');
      },
      (error) => {
        console.error('Error accepting appointment:', error);
        alert('Failed to accept the appointment.');
      }
    );
  }

  // Decline an appointment
  declineAppointment(appointmentId: number) {
    this.appointmentService.declineAppointment(appointmentId).subscribe(
      (response: string) => {
        alert(response); // Displays "Declined Successfully"
        // Update the appointments list
        this.updateAppointmentStatus(appointmentId, 'Declined');
      },
      (error) => {
        console.error('Error declining appointment:', error);
        alert('Failed to decline the appointment.');
      }
    );
  }

  // Update the status of an appointment locally
  updateAppointmentStatus(appointmentId: number, status: string) {
    const appointment = this.appointments.find(app => app.appId === appointmentId);
    if (appointment) {
      appointment.status = status;
      // Optionally, remove the appointment from the list if desired
      // For example, to remove pending appointments after action
      if (this.selectedStatus === 'Pending') {
        this.appointments = this.appointments.filter(app => app.appId !== appointmentId);
      }
    }
  }
}