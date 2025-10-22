import { Routes } from '@angular/router';
import { RoleSelectionComponent } from './components/role-selection/role-selection';
import { LoginComponent } from './components/login/login';
import { OrgLoginComponent } from './components/org-login/org-login';
import { RegisterComponent } from './components/register/register';
import { DashboardComponent } from './components/dashboard/dashboard';
import { ProfileComponent } from './components/profile/profile';
import { ChangePasswordComponent } from './components/student-change-password/student-change-password';

export const routes: Routes = [
    { path: '', component: RoleSelectionComponent },
    { path: 'login', component: LoginComponent },
    { path: 'org-login', component: OrgLoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent },
    {path: 'profile', component: ProfileComponent},
    {path: 'student-change-password', component: ChangePasswordComponent}
];