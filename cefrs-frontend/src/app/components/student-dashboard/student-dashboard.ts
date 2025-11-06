import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar';
import { DashboardView } from './dashboard-view/dashboard-view';
import { FacilitiesView } from './facilities-view/facilities-view';
import { EquipmentView } from './equipment-view/equipment-view';
import { RequestsView } from './requests-view/requests-view';
import { TransactionsView } from './transactions-view/transactions-view';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SidebarComponent,
    DashboardView,
    FacilitiesView,
    EquipmentView,
    RequestsView,
    TransactionsView,
  ],
  templateUrl: './student-dashboard.html',
  styleUrls: ['./student-dashboardscss'],
})
export class StudentDashboard implements OnInit {
  private router = inject(Router);

  currentView: 'dashboard' | 'facilities' | 'equipment' | 'requests' | 'transactions' | 'settings' =
    'dashboard';

  ngOnInit(): void {
    // Initialize component
  }

  setView(
    view: 'dashboard' | 'facilities' | 'equipment' | 'requests' | 'transactions' | 'settings'
  ): void {
    this.currentView = view;

    if (view === 'settings') {
      this.router.navigate(['/student-dashboard/settings/profile']);
    }
  }

  onSidebarViewChange(view: string): void {
    this.setView(
      view as 'dashboard' | 'facilities' | 'equipment' | 'requests' | 'transactions' | 'settings'
    );
  }
}
