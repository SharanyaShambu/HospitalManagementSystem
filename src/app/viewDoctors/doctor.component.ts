import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor-service.service';
import { Doctor } from '../interface/doctor';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor',
  imports: [CommonModule],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorsComponent implements OnInit {
  doctors: Doctor[] = [];
  showDoctors: boolean = false;

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    // Optionally, you might choose to fetch data on init.
    this.onViewDoctors()
  }

  onViewDoctors() {
    // Fetch doctors only if they haven't been loaded yet
    if (!this.showDoctors) {
      this.doctorService.getDoctors().subscribe(
        (data: Doctor[]) => {
          this.doctors = data;
          this.showDoctors = true;
        },
        error => {
          console.error("Error fetching doctors:", error);
        }
      );
    } else {
      // Optional: Toggle the view (hide/show) on subsequent clicks
      this.showDoctors = !this.showDoctors;
    }
  }
}
