import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuditLogService, AuditLog } from '../../../services/audit-log.service';

@Component({
  selector: 'app-transactions-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transactions-view.html',
  styleUrls: ['./transactions-view.scss']
})
export class TransactionsView implements OnInit {
  private auditLogService = inject(AuditLogService);

  auditLogs: AuditLog[] = [];
  isLoadingLogs = false;
  searchQuery = '';

  ngOnInit(): void {
    this.fetchAuditLogs();
  }

  fetchAuditLogs(): void {
    this.isLoadingLogs = true;
    this.auditLogService.getMyAuditLogs().subscribe({
      next: (logs) => {
        this.auditLogs = logs;
        this.isLoadingLogs = false;
      },
      error: (err) => {
        console.error('Error fetching audit logs:', err);
        this.isLoadingLogs = false;
      }
    });
  }

  get filteredAuditLogs(): AuditLog[] {
    if (!this.searchQuery.trim()) {
      return this.auditLogs;
    }

    const query = this.searchQuery.toLowerCase();
    return this.auditLogs.filter(log =>
      log.actionType?.toLowerCase().includes(query) ||
      log.tableName?.toLowerCase().includes(query) ||
      log.oldValues?.toLowerCase().includes(query) ||
      log.newValues?.toLowerCase().includes(query)
    );
  }
}