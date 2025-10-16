import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  template: `
    <div style="padding: 20px;">
      <h1>Login Page Works!</h1>
      <p>If you see this, routing is working.</p>
      <button (click)="goToRegister()">Go to Register</button>
      <button (click)="goToDashboard()">Go to Dashboard</button>
    </div>
  `,
  styles: [`
    div {
      font-family: Arial, sans-serif;
    }
    button {
      padding: 10px 20px;
      margin: 5px;
      background: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log('Login component loaded!');
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}