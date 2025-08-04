import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { EmployeePayslipDataType } from '../../../shared/types/employee-payslip-data.type';
import { EmployeePayslipService } from '../../../../../services/backend/employee-payslip.service';
import { EmployeeContextService } from '../../../../../services/context/employeeContext.context';
import { EmployeePayslipPdfService } from '../../../../../services/backend/employee-payslippdf.service';
import { FilterType } from '../../../shared/types/filter.types';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-employee-payslip',
  standalone: true,
  imports: [CommonModule, FormsModule, DataTableComponent],
  templateUrl: './employee-payslip.component.html',
  styleUrl: './employee-payslip.component.css'
})
export class EmployeePayslipComponent implements OnInit {
  titles: string[] = ['Employee ID', 'Company Code', 'Cost Center', 'Position', 'Name', 'Gender', 'Date of Birth', 'Nationality', 'Pay Scale Group', 'Pay Scale Level', 'Amount', 'Wage Type', 'Currency', 'Working Hours'];
  keys: string[] = ['employeeId','companyCode','costCenter','position','name','gender','dateOfBirth','nationality','payScaleGroup','payScaleLevel','amount','wageType','currency','workingHours'];
  data: EmployeePayslipDataType[] = [];
  tableTitle = "Employee Payslip Data";
  filters: FilterType[] = [
    {
      filterType: 'type',
      field: 'position',
      label: 'Position',
      options: []
    },
    {
      filterType: 'type',
      field: 'currency',
      label: 'Currency',
      options: []
    },
    {
      filterType: 'type',
      field: 'payScaleGroup',
      label: 'Pay Scale Group',
      options: []
    }
  ];

  constructor(
    private payslipService: EmployeePayslipService,
    private employeeContext: EmployeeContextService,
    private payslipPdfService: EmployeePayslipPdfService
  ) {}

  ngOnInit(): void {
    this.loadPayslipData();
  }

  loadPayslipData(): void {
    const employeeId = this.employeeContext.getEmployeeId();
    if (employeeId) {
      this.payslipService.getEmployeePayslips(employeeId).subscribe({
        next: (response) => {
          this.data = response.payslip || [];
          this.updateFilterOptions();
        },
        error: (err) => {
          console.error('Error fetching employee payslips:', err);
          if (err.status === 404) {
            this.data = [];
            console.log('No payslip data found for this employee');
          }
        }
      });
    }
  }

  updateFilterOptions(): void {
    // Update filter options based on data
    const positions = [...new Set(this.data.map(item => item.position))].filter(Boolean);
    const currencies = [...new Set(this.data.map(item => item.currency))].filter(Boolean);
    const payScaleGroups = [...new Set(this.data.map(item => item.payScaleGroup))].filter(Boolean);

    this.filters[0].options = positions;
    this.filters[1].options = currencies;
    this.filters[2].options = payScaleGroups;
  }

}
