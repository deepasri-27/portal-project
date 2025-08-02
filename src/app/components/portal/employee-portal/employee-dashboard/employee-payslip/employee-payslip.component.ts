import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { EmployeePayslipDataType } from '../../../shared/types/employee-payslip-data.type';
import { EmployeePayslipService } from '../../../../../services/backend/employee-payslip.service';
import { EmployeeContextService } from '../../../../../services/context/employeeContext.context';
import { EmployeePayslipPdfService } from '../../../../../services/backend/employee-payslippdf.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-employee-payslip',
  standalone: true,
  imports: [CommonModule, FormsModule, DataTableComponent],
  templateUrl: './employee-payslip.component.html',
  styleUrl: './employee-payslip.component.css'
})
export class EmployeePayslipComponent implements OnInit {
  titles: string[] = ['employeeId','companyCode','costCenter','position','name','gender','dateOfBirth','nationality','payScaleGroup','payScaleLevel','amount','wageType','currency','workingHours'];
  keys: string[] = ['employeeId','companyCode','costCenter','position','name','gender','dateOfBirth','nationality','payScaleGroup','payScaleLevel','amount','wageType','currency','workingHours'];
  data: EmployeePayslipDataType[] = [];
  filteredData: EmployeePayslipDataType[] = [];
  tableTitle = "Payslip Data";

  // Filters
  yearFilter = '';
  monthFilter = '';

  // Current payslip (most recent)
  currentPayslip: EmployeePayslipDataType | null = null;

  // Payslip summary data
  payslipSummary = {
    currentMonth: new Date().getMonth() + 1,
    grossSalary: 0,
    netSalary: 0,
    ytdEarnings: 0
  };

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
          this.filteredData = [...this.data];
          this.setCurrentPayslip();
          this.calculateSummary();
        },
        error: (err) => {
          console.error('Error fetching employee payslips:', err);
          if (err.status === 404) {
            this.data = [];
            this.filteredData = [];
            console.log('No payslip data found for this employee');
          }
        }
      });
    }
  }

  setCurrentPayslip(): void {
    if (this.data.length > 0) {
      // Assuming the first payslip is the most recent
      this.currentPayslip = this.data[0];
    }
  }

  calculateSummary(): void {
    if (this.data.length > 0) {
      const currentPayslip = this.data[0];
      const grossAmount = parseFloat(currentPayslip.amount) || 0;
      this.payslipSummary = {
        currentMonth: new Date().getMonth() + 1,
        grossSalary: grossAmount,
        netSalary: grossAmount * 0.76, // After 24% deductions
        ytdEarnings: this.data.reduce((total, payslip) => total + (parseFloat(payslip.amount) || 0), 0)
      };
    }
  }

  getCurrentMonthName(): string {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[new Date().getMonth()];
  }

  getPayslipMonth(payslip: EmployeePayslipDataType): string {
    // Since the API doesn't provide month/year, we'll simulate it
    const currentDate = new Date();
    const monthIndex = this.data.indexOf(payslip);
    const payslipDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - monthIndex, 1);
    
    return payslipDate.toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
  }

  refreshData(): void {
    this.loadPayslipData();
  }

  applyFilters(): void {
    this.filteredData = this.data.filter(payslip => {
      const payslipMonth = this.getPayslipMonth(payslip);
      
      let yearMatch = true;
      let monthMatch = true;
      
      if (this.yearFilter) {
        yearMatch = payslipMonth.includes(this.yearFilter);
      }
      
      if (this.monthFilter) {
        const filterDate = new Date(this.monthFilter);
        const filterMonthYear = filterDate.toLocaleDateString('en-US', { 
          month: 'short', 
          year: 'numeric' 
        });
        monthMatch = payslipMonth === filterMonthYear;
      }
      
      return yearMatch && monthMatch;
    });
  }

  onDownload(employeeId: string): void {
    this.payslipPdfService.downloadPayslipPdf(employeeId).subscribe({
      next: (res) => {
        const base64 = res?.pdfBase64;

        if (!base64 || typeof base64 !== 'string') {
          console.error('Invalid or missing base64 data');
          return;
        }

        try {
          const cleanedBase64 = base64.replace(/\s/g, '');
          const byteCharacters = atob(cleanedBase64);
          const byteNumbers = Array.from(byteCharacters, c => c.charCodeAt(0));
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'application/pdf' });

          saveAs(blob, `payslip-${employeeId}.pdf`);
        } catch (error) {
          console.error('Base64 decoding failed:', error);
        }
      },
      error: (err) => {
        console.error('Payslip PDF download failed:', err);
      }
    });
  }

  downloadAllPayslips(): void {
    // Implement bulk download functionality
    console.log('Downloading all payslips...');
    alert('Bulk download functionality would be implemented here');
  }

  viewPayslip(payslip: EmployeePayslipDataType): void {
    // Implement view payslip details
    console.log('Viewing payslip:', payslip);
    const details = `
      Employee: ${payslip.name}
      Position: ${payslip.position}
      Gross Amount: ₹${payslip.amount.toLocaleString()}
      Working Hours: ${payslip.workingHours} hrs
      Pay Scale: ${payslip.payScaleGroup} - ${payslip.payScaleLevel}
    `;
    alert(details);
  }

  printPayslip(payslip: EmployeePayslipDataType): void {
    // Implement print functionality
    console.log('Printing payslip:', payslip);
    alert('Print functionality would be implemented here');
  }
}
