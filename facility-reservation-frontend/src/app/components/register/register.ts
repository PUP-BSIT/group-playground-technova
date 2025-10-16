// register.component.ts
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class RegisterComponent {
  currentStep = 1;
  showPassword = false;
  showConfirmPassword = false;
  showFirstNameError = false;
  passwordMismatch = false;
  hasPasswordError = false;

  formData = {
    firstName: '',
    middleName: '',
    lastName: '',
    studentId: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
  };

  nextStep() {
    if (this.currentStep === 1) {
      // Validate first name
      if (!this.formData.firstName.trim()) {
        this.showFirstNameError = true;
        return;
      }
      this.showFirstNameError = false;
    }

    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  submitForm() {
    // Check if passwords match
    if (this.formData.password !== this.formData.confirmPassword) {
      this.passwordMismatch = true;
      this.hasPasswordError = true;
      return;
    }

    this.passwordMismatch = false;
    this.hasPasswordError = false;

    // Move to success step
    this.currentStep = 4;

    // Here you would typically send the data to your backend
    console.log('Form submitted:', this.formData);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  constructor(private router: Router) {}

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
