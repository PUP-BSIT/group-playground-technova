import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-student-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-change-password.html',
  styleUrls: ['./student-change-password.scss']
})
export class StudentChangePasswordComponent implements OnInit {
  private fb = inject(FormBuilder);
  private profileService = inject(ProfileService);

  passwordForm!: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      currentPassword: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      newPassword: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(6)]
      }),
      confirmPassword: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required]
      })
    });
  }

  changePassword(): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    const { currentPassword, newPassword, confirmPassword } = this.passwordForm.value;
    if (newPassword !== confirmPassword) {
      this.errorMessage = 'New password and confirmation do not match.';
      return;
    }

    const userData = localStorage.getItem('user');
    const user = userData ? JSON.parse(userData) : null;
    if (!user?.id) {
      this.errorMessage = 'User not found. Please log in again.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.profileService.changePassword(user.id, currentPassword, newPassword).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.successMessage = res.message || 'Password changed successfully.';
        this.passwordForm.reset();
      },
      error: (err: HttpErrorResponse) => {
        this.isSubmitting = false;
        this.errorMessage = err.error?.message || 'Failed to change password.';
      }
    });
  }

  // getter for template readability
  get f() {
    return this.passwordForm.controls;
  }
}
