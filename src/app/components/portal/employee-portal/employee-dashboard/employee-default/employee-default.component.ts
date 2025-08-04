import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EmployeeProfileService } from '../../../../../services/backend/employee-profile.service';
import { EmployeeLeaveService } from '../../../../../services/backend/employee-leave.service';
import { EmployeePayslipService } from '../../../../../services/backend/employee-payslip.service';
import { EmployeeContextService } from '../../../../../services/context/employeeContext.context';
import { TilesComponent } from '../../../shared/tiles/tiles.component';
import { CumulativeDataTile } from '../../../shared/types/cumulative-data.types';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-employee-default',
  imports: [CommonModule, TilesComponent],
  templateUrl: './employee-default.component.html',
  styleUrl: './employee-default.component.css'
})
export class EmployeeDefaultComponent implements OnInit {
  constructor(
    private employeeService: EmployeeProfileService,
    private employeeLeaveService: EmployeeLeaveService,
    private employeePayslipService: EmployeePayslipService,
    private employeeContextService: EmployeeContextService,
    private router: Router
  ){}

  // Tiles component inputs
  userName = 'User';
  userId = '';
  cumulativeData: CumulativeDataTile[] = [];

  ngOnInit() {
    const employeeId = this.employeeContextService.getEmployeeId() || '';
    this.userId = employeeId;
    
    // Load employee profile and cumulative data
    this.loadEmployeeData(employeeId);
  }

  private loadEmployeeData(employeeId: string) {
    // Load profile data
    this.employeeService.getEmployeeProfile(employeeId).subscribe({
      next: (response: any) => {
        this.userName = response.fullName
      },
      error: (err) => {
        console.error('Error fetching employee profile:', err);
      }
    });

    // Load cumulative data from multiple services
    forkJoin({
      leaves: this.employeeLeaveService.getEmployeeLeaves(employeeId),
      payslips: this.employeePayslipService.getEmployeePayslips(employeeId)
    }).subscribe({
      next: (data) => {
        this.calculateCumulativeData(data);
      },
      error: (err) => {
        console.error('Error fetching cumulative data:', err);
        // Set default cumulative data if services fail
        this.setDefaultCumulativeData();
      }
    });
  }

  private calculateCumulativeData(data: any) {
    const cumulativeData: CumulativeDataTile[] = [];

    // Calculate Leave Balance
    const leaves = data.leaves?.leaves || [];
    const totalLeaveDays = leaves.reduce((sum: number, leave: any) => {
      return sum + (parseInt(leave.absenceDays) || 0);
    }, 0);
    const leaveBalance = Math.max(0, 30 - totalLeaveDays); // Assuming 30 days annual leave

    cumulativeData.push({
      icon: 'fas fa-calendar-check',
      data: leaveBalance,
      label1: 'Leave Balance',
      label2: 'Days remaining'
    });

    // Calculate Working Hours from payslips
    const payslips = data.payslips?.payslip || [];
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const currentMonthPayslips = payslips.filter((payslip: any) => {
      const payslipDate = new Date(payslip.workingHours || '');
      return payslipDate.getMonth() === currentMonth && payslipDate.getFullYear() === currentYear;
    });

    const workingHours = currentMonthPayslips.reduce((sum: number, payslip: any) => {
      return sum + (parseFloat(payslip.workingHours) || 0);
    }, 0);

    if (workingHours > 0) {
      cumulativeData.push({
        icon: 'fas fa-clock',
        data: Math.round(workingHours),
        label1: 'Working Hours',
        label2: 'This month'
      });
    }

    // Calculate Pending Requests (leaves with pending status)
    const pendingLeaves = leaves.filter((leave: any) => 
      leave.reason && leave.reason.toLowerCase().includes('pending')
    );

    cumulativeData.push({
      icon: 'fas fa-tasks',
      data: pendingLeaves.length,
      label1: 'Pending Requests',
      label2: 'Awaiting approval'
    });

    // Calculate Attendance Rate (mock calculation based on available data)
    const attendanceRate = Math.min(100, Math.max(85, 100 - (totalLeaveDays * 2)));

    cumulativeData.push({
      icon: 'fas fa-trophy',
      data: `${attendanceRate}%`,
      label1: 'Attendance Rate',
      label2: 'This quarter'
    });

    this.cumulativeData = cumulativeData;
  }

  private setDefaultCumulativeData() {
    this.cumulativeData = [
      {
        icon: 'fas fa-calendar-check',
        data: 15,
        label1: 'Leave Balance',
        label2: 'Days remaining'
      },
      {
        icon: 'fas fa-clock',
        data: 168,
        label1: 'Working Hours',
        label2: 'This month'
      },
      {
        icon: 'fas fa-tasks',
        data: 2,
        label1: 'Pending Requests',
        label2: 'Awaiting approval'
      },
      {
        icon: 'fas fa-trophy',
        data: '96%',
        label1: 'Attendance Rate',
        label2: 'This quarter'
      }
    ];
  }

  // Employee Information
  employeeInfo = {
    id: 'EMP001',
    department: 'Information Technology',
    position: 'Software Developer',
    manager: 'John Smith',
    joinDate: 'January 15, 2022',
    location: 'Head Office'
  };

  // Recent Activities
  recentActivities = [
    {
      title: 'Payslip for December 2024 generated',
      time: '2 hours ago',
      icon: 'fas fa-file-invoice-dollar',
      type: 'payslip'
    },
    {
      title: 'Leave request approved',
      time: '1 day ago',
      icon: 'fas fa-check-circle',
      type: 'approved'
    },
    {
      title: 'Profile information updated',
      time: '3 days ago',
      icon: 'fas fa-user-edit',
      type: 'update'
    },
    {
      title: 'Annual performance review scheduled',
      time: '1 week ago',
      icon: 'fas fa-calendar-alt',
      type: 'schedule'
    }
  ];

  // Upcoming Events
  upcomingEvents = [
    {
      day: '15',
      month: 'FEB',
      title: 'Team Meeting',
      description: 'Monthly team sync and project updates',
      time: '10:00 AM'
    },
    {
      day: '20',
      month: 'FEB',
      title: 'Training Session',
      description: 'Angular Advanced Concepts Workshop',
      time: '2:00 PM'
    },
    {
      day: '25',
      month: 'FEB',
      title: 'Performance Review',
      description: 'Quarterly performance evaluation',
      time: '3:30 PM'
    }
  ];

  // Notifications
  notifications = [
    {
      title: 'New payslip available for download',
      time: '1 hour ago',
      icon: 'fas fa-file-invoice-dollar',
      type: 'info'
    },
    {
      title: 'Leave request requires manager approval',
      time: '2 days ago',
      icon: 'fas fa-exclamation-triangle',
      type: 'warning'
    }
  ];

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

  // Utility Methods
  getCurrentDate(): string {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return today.toLocaleDateString('en-US', options);
  }

  navigateToPayslip(): void {
    this.router.navigate(['portal/employee/dashboard/payslip']);
  }

  navigateToLeaveRequest(): void {
    this.router.navigate(['portal/employee/dashboard/leave-request']);
  }
}
