import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { EmployeeLeaveDataType } from '../../shared/types/employee-leave-data.type';
import { EmployeeLeaveService } from '../../../../services/backend/employee-leave.service';
import { EmployeeContextService } from '../../../../services/context/employeeContext.context';

@Component({
  selector: 'app-employee-leave-request',
  imports: [CommonModule, DataTableComponent],
  templateUrl: './employee-leave-request.component.html',
  styleUrl: './employee-leave-request.component.css'
})
export class EmployeeLeaveRequestComponent implements OnInit {
  titles: string[] =  ['employeeId','startDate','endDate', 'absenceType','absenceDays','reason','quotaNumber','quotaStart','quotaEnd'];
  
    keys: string[] = ['employeeId','startDate','endDate', 'absenceType','absenceDays','reason','quotaNumber','quotaStart','quotaEnd'];
    data: EmployeeLeaveDataType[] = [];
    tableTitle = "Leave request Data";

  constructor(
    private leaveService: EmployeeLeaveService,
    private employeeContext: EmployeeContextService
  ) {}

  ngOnInit(): void {
    const employeeId = this.employeeContext.getEmployeeId();
    if (employeeId) {
      this.leaveService.getEmployeeLeaves(employeeId).subscribe({
        next: (response) => {
          this.data = response.leaves || [];
        },
        error: (err) => {
          console.error('Error fetching employee leaves:', err);
          // Handle 404 case where no leave data is found
          if (err.status === 404) {
            this.data = [];
            console.log('No leave data found for this employee');
          }
        }
      });
    }
  }
}
