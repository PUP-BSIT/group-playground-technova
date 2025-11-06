import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EquipmentService } from '../../../services/equipment.service';

interface Equipment {
  id: number;
  name: string;
  description: string;
  category: string;
  quantityAvailable: number;
  quantityTotal: number;
  imageUrl: string;
  status: string;
}

@Component({
  selector: 'app-equipment-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './equipment-view.html',
  styleUrls: ['./equipment-view.scss']
})
export class EquipmentView implements OnInit {
  private equipmentService = inject(EquipmentService);

  equipment: Equipment[] = [];
  isLoadingEquipment = false;
  searchQuery = '';
  selectedCategory = 'All Categories';

  ngOnInit(): void {
    this.fetchEquipment();
  }

  fetchEquipment(): void {
    this.isLoadingEquipment = true;
    this.equipmentService.getAvailableEquipment().subscribe({
      next: (response) => {
        this.equipment = response.data;
        this.isLoadingEquipment = false;
        console.log('Equipment loaded:', this.equipment);
      },
      error: (err) => {
        console.error('Error fetching equipment:', err);
        this.isLoadingEquipment = false;
      }
    });
  }

  get filteredEquipment(): Equipment[] {
    let filtered = this.equipment;

    // Filter by category
    if (this.selectedCategory !== 'All Categories') {
      filtered = filtered.filter(item =>
        item.category?.toUpperCase() === this.selectedCategory.toUpperCase()
      );
    }

    // Filter by search query
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.name?.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.category?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      Approved: 'status-approved',
      Pending: 'status-pending',
      Rejected: 'status-rejected',
      Returned: 'status-returned',
      Available: 'status-available',
      AVAILABLE: 'status-available',
      Reserved: 'status-reserved'
    };
    return map[status] || '';
  }
}