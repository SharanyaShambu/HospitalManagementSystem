import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DoctorRegisterComponent } from './doctor-register/doctor-register.component';
import { PatientRegisterComponent } from './patient-register/patient-register.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { DoctorsComponent } from './viewDoctors/doctor.component';
import { HomeComponent } from './home/home.component';
import { BookingAppointmentComponent } from './booking-appointment/booking-appointment.component';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { TodayAppDetailsComponent } from './today-app-details/today-app-details.component';
import { ViewDoctorAppComponent } from './view-doctor-app/view-doctor-app.component';
import { AddPrescriptionComponent } from './add-prescription/add-prescription.component';
import { ViewPrescriptionComponent } from './view-prescription/view-prescription.component';
import { DoctorHomeComponent } from './doctor-home/doctor-home.component';
import { authGuardGuard } from './auth-guard.guard';


export const routes: Routes = [
    {
        path:"",
        component:HomeComponent
    },
    {
        path:"register",
        component:RegisterComponent
    },
    {
        path:"doctor_register",
        component:DoctorRegisterComponent,
        canActivate: [authGuardGuard]
    },
    {
        path:"patient_register",
        component:PatientRegisterComponent,
        canActivate: [authGuardGuard]
    },
    {
        path:"appointment",
        component:AppointmentComponent,
        canActivate: [authGuardGuard]
    },

    {
        path:"prescription",
        component:PrescriptionComponent,
        canActivate: [authGuardGuard]
    },
    {
        path:"login",
        component:LoginComponent
    },
    {
        path:"doctor",
        component:DoctorsComponent
    },
    {
        path:"home",
        component:HomeComponent
    },
    {
        path:"book-appointment/:doctorId",
        component:BookingAppointmentComponent,
        canActivate: [authGuardGuard]
    },
    {
        path:"appointmentDetails",
        component:AppointmentDetailsComponent,
        canActivate: [authGuardGuard]
    },
    {
        path:"prescription",
        component:PrescriptionComponent,
        canActivate: [authGuardGuard]
    },
    {
        path:"viewTodaysApp",
        component:TodayAppDetailsComponent,
        canActivate: [authGuardGuard]
    },
    {
        path:"viewAllApp",
        component:ViewDoctorAppComponent,
        canActivate: [authGuardGuard]
    },
    {
        path:"addPres/:appointmentId",
        component:AddPrescriptionComponent,
        canActivate: [authGuardGuard]
    },
    {
        path:"view-prescription/:appointmentId",
        component:ViewPrescriptionComponent ,
        canActivate: [authGuardGuard]
    },
    {
        path:"doctor_home",
        component:DoctorHomeComponent,
        canActivate: [authGuardGuard]
    }
];
