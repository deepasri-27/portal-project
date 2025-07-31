import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterType } from '../types/filter.types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnChanges {
  @Input() titles: string[] = [];
  @Input() data: any[] = [];
  @Input() keys: string[] = [];
  @Input() tableTitle: string = 'Data Table'; // Default fallback
  @Input() isInvoicePage: boolean = false;
  @Input() isPayslipPage:boolean = false;
  @Input() actionColumn:string ='';
  @Output() invoiceDownload = new EventEmitter<string>(); // emits invoice ID
  @Input() filters: FilterType[] = [];



  page: number = 1;
  itemsPerPage: number = 5;
  paginatedData: any[] = [];

  // Sorting state
  sortedKey: string | null = null;
  sortDirection: 'asc' | 'desc' | null = null;

  filterValues: { [key: string]: any } = {};
  filteredData: any[] = [];

  getDateFilterValue(field: string, bound: 'from' | 'to'): string {
    return this.filterValues[field]?.[bound] || '';
  }

  setDateFilterValue(field: string, bound: 'from' | 'to', value: string): void {
    if (!this.filterValues[field]) {
      this.filterValues[field] = {};
    }
    this.filterValues[field][bound] = value;
  }

  onApplyFilter() {
    this.page = 1;
    this.applyFiltering();
    this.applySorting();
    this.updatePaginatedData();
  }

  onClearFilter() {
    this.filterValues = {};
    this.page = 1;
    this.applyFiltering();
    this.applySorting();
    this.updatePaginatedData();
  }




  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['itemsPerPage'] || changes['filters']) {
      this.applyFiltering();
      this.applySorting();
      this.updatePaginatedData();
    }
  }

  applyFiltering() {
    this.filteredData = this.data.filter(row => {
      return this.filters.every(filter => {
        const val = row[filter.field];
        const input = this.filterValues[filter.field];

        if (!input) return true; // skip if no input

        switch (filter.filterType) {
          case 'search':
            return val?.toString().toLowerCase().includes(input.toLowerCase());
          case 'type':
            return val === input;
          case 'dateRange':
            if (!input?.from || !input?.to) return true;
            const dateVal = new Date(val);
            return dateVal >= new Date(input.from) && dateVal <= new Date(input.to);
        }
      });
    });
  }

  updatePaginatedData() {
    const totalFiltered = this.filteredData.length;
    const totalPages = Math.ceil(totalFiltered / this.itemsPerPage);
    if (this.page > totalPages) {
      this.page = 1; // Reset to first page if out of range
    }
    const start = (this.page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedData = this.filteredData.slice(start, end);
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
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
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

  goBack() {
    history.back(); // Pops the current page from history stack 
  }

  downloadInvoice(invoiceId: string) {
    console.log("invoice");
    console.log(invoiceId);
    this.invoiceDownload.emit(invoiceId);
  }

}
