import { Component } from '@angular/core';
import { EmployeeProfileService } from '../../../../../services/backend/employee-profile.service';
import { EmployeeContextService } from '../../../../../services/context/employeeContext.context';
import { TilesComponent } from '../../../shared/tiles/tiles.component';

@Component({
  selector: 'app-employee-default',
  imports: [TilesComponent],
  templateUrl: './employee-default.component.html',
  styleUrl: './employee-default.component.css'
})
export class EmployeeDefaultComponent {
    constructor(
      private employeeService: EmployeeProfileService,
      private employeeContextService: EmployeeContextService,
    ){
        this.employeeService.getEmployeeProfile(employeeContextService.getEmployeeId() || '').subscribe({
        next: (response:any) => {
          // to be configured
          this.customerName = response.data.name1;
          console.log(this.customerName);
        },
        error: (err) => {
          console.error('Error fetching vendor profile:', err);
        }
      });
    }
  
    customerName = 'User';
    portalName = "Employee Dashboard";
    employeeDashboardTiles = [
      {
        title: 'Payslip',
        description: 'View and download monthly payslips.',
        icon: 'fas fa-file-invoice-dollar',
        route: 'portal/employee/dashboard/payslip'
      },
      {
        title: 'Leave Request',
        description: 'Submit and track your leave requests.',
        icon: 'fas fa-calendar-check',
        route: 'portal/employee/dashboard/leave-request'
      }
    ];
}
