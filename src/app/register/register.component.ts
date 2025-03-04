import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfo } from '../interface/user-info';
import { RegisterService } from '../register.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent  {
  user: UserInfo = {
    id: null,
    name: '',
    email: '',
    password: '',
    roles: '',
  };

  errorMessage: string = '';

  constructor(private registerService: RegisterService, private router: Router) {}

  onSubmit() {
    this.registerService.registerUser(this.user).subscribe(
      (response: any) => {
        console.log('Type of response:', typeof response);
        console.log('Backend Response:', response);
  
        // if (response && response.id) {
        //   this.user.id = response.id;
  
        //   // Proceed with navigation
        //   localStorage.setItem('userId', this.user.id.toString());
  
          if (this.user.roles === 'Patient') {
            this.router.navigate(['/login']);
          } else if (this.user.roles === 'Doctor') {
            this.router.navigate(['/login']);
          } else {
            console.warn('Unknown role:', this.user.roles);
          }
        // } else {
        //   console.error('User ID is missing in the backend response.');
        //   this.errorMessage = 'Registration failed. Please try again.';
        // }
      },
      (error: HttpErrorResponse) => {
        console.error('Registration Error:', error);
  
        if (error.status === 409) {
          this.errorMessage = error.error.error || 'Username already exists.';
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
        }
      }
    );
  }
}