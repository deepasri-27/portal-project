import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { EmployeeLeaveDataType } from '../../../shared/types/employee-leave-data.type';
import { EmployeeLeaveService } from '../../../../../services/backend/employee-leave.service';
import { EmployeeContextService } from '../../../../../services/context/employeeContext.context';

@Component({
  selector: 'app-employee-leave-request',
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-leave-request.component.html',
  styleUrl: './employee-leave-request.component.css'
})
export class EmployeeLeaveRequestComponent implements OnInit {
  titles: string[] = ['employeeId','startDate','endDate', 'absenceType','absenceDays','reason','quotaNumber','quotaStart','quotaEnd'];
  keys: string[] = ['employeeId','startDate','endDate', 'absenceType','absenceDays','reason','quotaNumber','quotaStart','quotaEnd'];
  data: EmployeeLeaveDataType[] = [];
  filteredData: EmployeeLeaveDataType[] = [];
  tableTitle = "Leave request Data";

  // Form and UI state
  showNewRequestForm = false;
  isSubmitting = false;
  statusFilter = '';
  typeFilter = '';

  // Leave balance data
  leaveBalance = {
    annual: 20,
    sick: 10,
    personal: 5,
    pending: 2
  };

  // New request form data
  newRequest = {
    leaveType: '',
    priority: 'normal',
    startDate: '',
    endDate: '',
    reason: '',
    contactNumber: '',
    handoverTo: ''
  };

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
      this.leaveService.getEmployeeLeaves(employeeId).subscribe({
        next: (response) => {
          this.data = response.leaves || [];
          this.filteredData = [...this.data];
        },
        error: (err) => {
          console.error('Error fetching employee leaves:', err);
          if (err.status === 404) {
            this.data = [];
            this.filteredData = [];
            console.log('No leave data found for this employee');
          }
        }
      });
    }
  }

  toggleNewRequestForm(): void {
    this.showNewRequestForm = !this.showNewRequestForm;
    if (this.showNewRequestForm) {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.newRequest = {
      leaveType: '',
      priority: 'normal',
      startDate: '',
      endDate: '',
      reason: '',
      contactNumber: '',
      handoverTo: ''
    };
  }

  submitLeaveRequest(): void {
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    
    // Simulate API call
    setTimeout(() => {
      console.log('Submitting leave request:', this.newRequest);
      
      // Add the new request to the data (simulation)
      const newLeaveRequest: EmployeeLeaveDataType = {
        employeeId: this.employeeContext.getEmployeeId() || 'EMP001',
        startDate: this.newRequest.startDate,
        endDate: this.newRequest.endDate,
        absenceType: this.newRequest.leaveType,
        absenceDays: this.calculateDays(this.newRequest.startDate, this.newRequest.endDate),
        reason: this.newRequest.reason,
        quotaNumber: 'Q' + Date.now(),
        quotaStart: this.newRequest.startDate,
        quotaEnd: this.newRequest.endDate
      };
      
      this.data.unshift(newLeaveRequest);
      this.applyFilters();
      
      this.isSubmitting = false;
      this.showNewRequestForm = false;
      this.resetForm();
      
      // Show success message (you can implement a toast service)
      alert('Leave request submitted successfully!');
    }, 2000);
  }

  calculateDays(startDate: string, endDate: string): string {
    if (!startDate || !endDate) return '0';
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    return diffDays.toString();
  }

  refreshData(): void {
    this.loadLeaveData();
  }

  applyFilters(): void {
    this.filteredData = this.data.filter(request => {
      const statusMatch = !this.statusFilter || this.getStatusText(request).toLowerCase() === this.statusFilter;
      const typeMatch = !this.typeFilter || request.absenceType.toLowerCase() === this.typeFilter;
      return statusMatch && typeMatch;
    });
  }

  getStatusClass(request: EmployeeLeaveDataType): string {
    // Since the API doesn't provide status, we'll simulate based on dates
    const today = new Date();
    const startDate = new Date(request.startDate);
    const endDate = new Date(request.endDate);
    
    if (endDate < today) {
      return 'approved'; // Past dates are considered approved
    } else if (startDate > today) {
      return 'pending'; // Future dates are pending
    } else {
      return 'active'; // Current dates are active
    }
  }

  getStatusText(request: EmployeeLeaveDataType): string {
    const statusClass = this.getStatusClass(request);
    switch (statusClass) {
      case 'approved': return 'Approved';
      case 'pending': return 'Pending';
      case 'active': return 'Active';
      default: return 'Unknown';
    }
  }

  viewRequest(request: EmployeeLeaveDataType): void {
    // Implement view details functionality
    console.log('Viewing request:', request);
    alert(`Request Details:\nType: ${request.absenceType}\nDates: ${request.startDate} to ${request.endDate}\nDays: ${request.absenceDays}\nReason: ${request.reason}`);
  }

  editRequest(request: EmployeeLeaveDataType): void {
    // Implement edit functionality
    console.log('Editing request:', request);
    alert('Edit functionality would be implemented here');
  }

  cancelRequest(request: EmployeeLeaveDataType): void {
    // Implement cancel functionality
    if (confirm('Are you sure you want to cancel this leave request?')) {
      console.log('Cancelling request:', request);
      // Remove from data array (simulation)
      const index = this.data.findIndex(r => r.employeeId === request.employeeId && r.startDate === request.startDate);
      if (index > -1) {
        this.data.splice(index, 1);
        this.applyFilters();
        alert('Leave request cancelled successfully!');
      }
    }
  }

  canEdit(request: EmployeeLeaveDataType): boolean {
    // Can edit if status is pending and start date is in the future
    const today = new Date();
    const startDate = new Date(request.startDate);
    return this.getStatusClass(request) === 'pending' && startDate > today;
  }

  canCancel(request: EmployeeLeaveDataType): boolean {
    // Can cancel if status is pending or active
    const statusClass = this.getStatusClass(request);
    return statusClass === 'pending' || statusClass === 'active';
  }
}
