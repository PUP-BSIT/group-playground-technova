import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent {
  constructor(private router: Router) {}

  goToSettings() {
    this.router.navigate(['/profile']);
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    sessionStorage.clear();

    this.router.navigate(['/login']);
  }
}
