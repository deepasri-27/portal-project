import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { VrfqDataType } from '../types/vendor-rfq-data.types';
// import { VagingDataType } from '../types/vendor-aging-data-types';
// import { VgoodsDataType } from '../types/vendor-qr-data.types';
// import { VinvoiceDataType } from '../types/vendor-invoice-data.types';
// import { VmemoDataType } from '../types/vendor-memo-data.types';
// import { VpoDataType } from '../types/vendor-po-data.types';

// type AllTypes = VrfqDataType | VagingDataType | VinvoiceDataType | VmemoDataType | VpoDataType | VgoodsDataType;

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
  @Input() keys:string[]=[];
  page: number = 1;
  itemsPerPage: number = 5;
  paginatedData: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['itemsPerPage']) {
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
}
