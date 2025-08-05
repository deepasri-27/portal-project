import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { EmployeeLeaveDataType } from '../../../shared/types/employee-leave-data.type';
import { EmployeeLeaveService } from '../../../../../services/backend/employee-leave.service';
import { EmployeeContextService } from '../../../../../services/context/employeeContext.context';
import { FilterType } from '../../../shared/types/filter.types';

@Component({
  selector: 'app-employee-leave-request',
  imports: [CommonModule, FormsModule, DataTableComponent],
  templateUrl: './employee-leave-request.component.html',
  styleUrl: './employee-leave-request.component.css'
})
export class EmployeeLeaveRequestComponent implements OnInit {
  titles: string[] = ['Employee ID', 'Start Date', 'End Date', 'Absence Type', 'Absence Days', 'Reason', 'Quota Number', 'Quota Start', 'Quota End'];
  keys: string[] = ['employeeId','startDate','endDate', 'absenceType','absenceDays','reason','quotaNumber','quotaStart','quotaEnd'];
  data: EmployeeLeaveDataType[] = [];
  tableTitle = "Employee Leave Request Data";
  isLoading: boolean = true;
  filters: FilterType[] = [
    {
      filterType: 'type',
      field: 'absenceType',
      label: 'Filter By Leave Type',
      options: ['0300','720']
    }
  ];

  constructor(
    private leaveService: EmployeeLeaveService,
    private employeeContext: EmployeeContextService
  ) {}

  ngOnInit(): void {
    this.loadLeaveData();
  }

  loadLeaveData(): void {
    const employeeId = this.employeeContext.getEmployeeId();
    if (employeeId) {
      this.isLoading = true;
      this.leaveService.getEmployeeLeaves(employeeId).subscribe({
        next: (response) => {
          this.data = response.leaves || [];
          this.updateFilterOptions();
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching employee leaves:', err);
          if (err.status === 404) {
            this.data = [];
            console.log('No leave data found for this employee');
          }
          this.isLoading = false;
        }
      });
    } else {
      this.isLoading = false;
    }
  }

  updateFilterOptions(): void {
    // Update filter options based on data
    const absenceTypes = [...new Set(this.data.map(item => item.absenceType))].filter(Boolean);
    this.filters[0].options = absenceTypes;
  }
}
