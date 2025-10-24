import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  templateUrl: './student-change-password.html',
  styleUrls: ['./student-change-password.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class ChangePasswordComponent implements OnInit {
  private fb = inject(FormBuilder);
  private profileService = inject(ProfileService);
  private router = inject(Router);

  passwordForm!: FormGroup;
  alertMessage = '';
  alertType: 'success' | 'error' = 'error';
  isLoading = false;
  isSettingsOpen = false;
  studentId = 0;
  userEmail = '';
  userName = '';

  // Password visibility toggles
  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  ngOnInit(): void {
    this.initializeForm();
    this.loadUserInfo();
  }

  private initializeForm(): void {
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  private loadUserInfo(): void {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      this.alertMessage = 'No user found. Please log in again.';
      this.alertType = 'error';
      return;
    }

    const userData = JSON.parse(storedUser);
    this.studentId = userData.id;
    this.userEmail = userData.email || '';
    this.userName = `${userData.firstName || ''} ${userData.lastName || ''}`.trim();
  }

  // Custom validator for password strength
  private passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;

    return !passwordValid ? { weakPassword: true } : null;
  }

  // Custom validator for password match
  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');

    if (!newPassword || !confirmPassword) return null;

    return newPassword.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  // Toggle password visibility
  togglePasswordVisibility(field: 'current' | 'new' | 'confirm'): void {
    switch (field) {
      case 'current':
        this.showCurrentPassword = !this.showCurrentPassword;
        break;
      case 'new':
        this.showNewPassword = !this.showNewPassword;
        break;
      case 'confirm':
        this.showConfirmPassword = !this.showConfirmPassword;
        break;
    }
  }

  // Check if field has specific error
  hasError(fieldName: string, errorType: string): boolean {
    const field = this.passwordForm.get(fieldName);
    return !!(field && field.hasError(errorType) && (field.dirty || field.touched));
  }

  // Submit password change
  changePassword(): void {
    if (this.passwordForm.invalid) {
      this.alertMessage = 'Please fix all form errors before submitting.';
      this.alertType = 'error';
      this.passwordForm.markAllAsTouched();
      return;
    }

    const { currentPassword, newPassword } = this.passwordForm.value;

    // In a real app, you'd verify the current password with the backend
    // For now, we'll just update with the new password
    const updateData = {
      password: newPassword,
      // You might need these fields depending on your backend
      email: this.userEmail,
      role: 'STUDENT'
    };

    this.isLoading = true;
    this.alertMessage = '';

    this.profileService.updateProfile(updateData).subscribe({
      next: () => {
        this.isLoading = false;
        this.alertMessage = 'Password changed successfully!';
        this.alertType = 'success';
        this.passwordForm.reset();

        // Redirect to profile after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/profile']);
        }, 2000);
      },
      error: (err) => {
        console.error('Password change failed:', err);
        this.isLoading = false;
        this.alertType = 'error';

        // Handle specific error messages
        if (err.status === 401) {
          this.alertMessage = 'Current password is incorrect.';
        } else if (err.status === 400) {
          this.alertMessage = 'Invalid password format. Please check requirements.';
        } else {
          this.alertMessage = 'Failed to change password. Please try again.';
        }
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/profile']);
  }

  toggleSettingsDropdown(): void {
    this.isSettingsOpen = !this.isSettingsOpen;
  }

  goToEditProfile(): void {
    this.isSettingsOpen = false;
    this.router.navigate(['/profile']);
  }

  goToChangePassword(): void {
    this.isSettingsOpen = false;
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}