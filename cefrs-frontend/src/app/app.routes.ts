import { Routes } from '@angular/router';
import { RoleSelectionComponent } from './components/role-selection/role-selection';
import { LoginComponent } from './components/login/login';
import { OrgLoginComponent } from './components/org-login/org-login';
import { RegisterComponent } from './components/register/register';
import { OrgRegisterComponent } from './components/org-register/org-register';
import { DashboardComponent } from './components/dashboard/dashboard';
import { StudentDashboard } from './components/dashboard/student-dashboard/student-dashboard';
import { OrgDashboardComponent } from './components/org-dashboard/org-dashboard';
import { AuthGuard } from './guards/auth-guard';

import { StudentProfileComponent } from './components/profile/profile';
import { OrgProfileComponent } from './components/org-profile/org-profile';
import { StudentChangePasswordComponent } from './components/student-change-password/student-change-password';

export const routes: Routes = [
  { path: '', component: RoleSelectionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'org-login', component: OrgLoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'org-register', component: OrgRegisterComponent },

  // Admin / Org Dashboard (Protected)
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  
  // Organization Dashboard (Protected)
  {
    path: 'org-dashboard',
    component: OrgDashboardComponent,
    canActivate: [AuthGuard]
  },
  
  // Organization Profile (Protected)
  {
    path: 'org-profile',
    component: OrgProfileComponent,
    canActivate: [AuthGuard]
  },

  // Student Dashboard (Protected)
  {
    path: 'student-dashboard',
    component: StudentDashboard,
    canActivate: [AuthGuard],
    children: [
      { path: 'settings/profile', component: StudentProfileComponent },
      { path: 'settings/change-password', component: StudentChangePasswordComponent }
    ]
  },

  // Optional: Keep old standalone profile routes
  { path: 'profile', component: StudentProfileComponent, canActivate: [AuthGuard] },
  { path: 'change-password', component: StudentChangePasswordComponent, canActivate: [AuthGuard] },
  { path: 'student-change-password', component: StudentChangePasswordComponent },
];
