import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { EmployeePayslipDataType } from '../../shared/types/employee-payslip-data.type';
import { EmployeePayslipService } from '../../../../services/backend/employee-payslip.service';
import { EmployeeContextService } from '../../../../services/context/employeeContext.context';
import { EmployeePayslipPdfService } from '../../../../services/backend/employee-payslippdf.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-employee-payslip',
   standalone: true,
  imports: [CommonModule, DataTableComponent],
  templateUrl: './employee-payslip.component.html',
  styleUrl: './employee-payslip.component.css'
})
export class EmployeePayslipComponent implements OnInit {
   titles: string[] =  [ 'employeeId','companyCode','costCenter','position','name','gender','dateOfBirth','nationality','payScaleGroup','payScaleLevel','amount',
  'wageType','currency','workingHours'];
  
    keys: string[] = [ 'employeeId','companyCode','costCenter','position','name','gender','dateOfBirth','nationality','payScaleGroup','payScaleLevel','amount',
  'wageType','currency','workingHours'];
    data: EmployeePayslipDataType[] = [];
    tableTitle = "Payslip Data";
  constructor(
    private payslipService: EmployeePayslipService,
    private employeeContext: EmployeeContextService,
    private payslipPdfService: EmployeePayslipPdfService
  ) {}

  ngOnInit(): void {
    const employeeId = this.employeeContext.getEmployeeId();
    if (employeeId) {
      this.payslipService.getEmployeePayslips(employeeId).subscribe({
        next: (response) => {
          this.data = response.payslip || [];
        },
        error: (err) => {
          console.error('Error fetching employee payslips:', err);
          // Handle 404 case where no payslip data is found
          if (err.status === 404) {
            this.data = [];
            console.log('No payslip data found for this employee');
          }
        }
      });
    }
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
}
