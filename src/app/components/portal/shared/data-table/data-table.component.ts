import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnChanges {
  @Input() titles: string[] = [];
  @Input() data: any[] = [];
  @Input() keys: string[] = [];

  page: number = 1;
  itemsPerPage: number = 5;
  paginatedData: any[] = [];

  // Sorting state
  sortedKey: string | null = null;
  sortDirection: 'asc' | 'desc' | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['itemsPerPage']) {
      this.applySorting();
      this.updatePaginatedData();
    }
  }

  updatePaginatedData() {
    const start = (this.page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedData = this.data.slice(start, end);
  }

  changePage(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.page = newPage;
      this.updatePaginatedData();
    }
  }

  onItemsPerPageChange(event: any) {
    this.itemsPerPage = +event.target.value;
    this.page = 1;
    this.updatePaginatedData();
  }

  get totalPages(): number {
    return Math.ceil(this.data.length / this.itemsPerPage);
  }

  sortByColumn(key: string) {
    if (this.sortedKey === key) {
      // Toggle direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // New column clicked
      this.sortedKey = key;
      this.sortDirection = 'asc';
    }

    this.applySorting();
    this.updatePaginatedData();
  }

  applySorting() {
    if (!this.sortedKey || !this.sortDirection) return;

    this.data.sort((a, b) => {
      const valA = a[this.sortedKey!];
      const valB = b[this.sortedKey!];

      const comparison = (valA > valB) ? 1 : (valA < valB) ? -1 : 0;
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  getSortIcon(key: string): string {
    if (key !== this.sortedKey) return '';
    return this.sortDirection === 'asc' ? 'fa-solid fa-arrow-up' : 'fa-solid fa-arrow-down';
  }

}
