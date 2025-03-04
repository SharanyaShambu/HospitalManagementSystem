import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedService } from '../shared.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  role: string | null = 'user'; // Initialize with a default role
 
  
  
  constructor(
    private router: Router,
    private sharedService: SharedService,
    private cdRef: ChangeDetectorRef,
    private authService:AuthService
  ) {}

  ngOnInit() {
    // Check initial login status
  this.updateLoginStatus();
  this.role = this.authService.getUserRole();

  // Subscribe to login status changes
  this.sharedService.loginStatus$.subscribe(() => {
    this.updateLoginStatus();

    // Manually trigger change detection
    this.cdRef.detectChanges();
    });
  }

  updateLoginStatus() {
    const token = localStorage.getItem('access_token');
    this.isLoggedIn = !!token;
    const userRole=this.authService.getUserRole()
  }

  logout() {
    // Remove user data from localStorage
    
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');

    // Update login status
    this.isLoggedIn = false;
    this.role = null;

    // Navigate to home or login page
    this.router.navigate(['/login']);

    // Optionally notify other components
    this.sharedService.triggerChangeLogin();
  }
}