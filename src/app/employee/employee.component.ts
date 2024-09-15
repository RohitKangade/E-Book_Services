import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2'; // Import SweetAlert2

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  fullname: string = '';
  leaveForm = {
    fullname: '', // This will be auto-filled
    leavetype: '',
    fromDate: '',
    toDate: '',
    leavereason: ''
  };
  leaveTypes: any[] = []; // Array to store leave types
  leaveData: any[] = [];  // Array to store leave data

  private loginApiUrl = 'http://localhost:8080/api/admins/login';
  private leaveApiUrl = 'http://localhost:8080/api/employee-leave/add';
  private getLeaveDataUrl = 'http://localhost:8080/api/employee-leave/all'; // API endpoint for leave data
  private leaveTypesApiUrl = 'http://localhost:8080/api/leavetypes'; // API endpoint for fetching leave types

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.getFullName();
    this.fetchLeaveTypes(); // Fetch leave types when the component initializes
    this.fetchLeaveData(); // Fetch leave data when the component initializes
  }

  logout(): void {
    localStorage.removeItem('employeeName'); // Clear the employee name on logout
    this.router.navigate(['/login']);
  }

  getFullName(): void {
    this.fullname = localStorage.getItem('employeeName') || ''; // Retrieve fullname from local storage
    this.leaveForm.fullname = this.fullname; // Initialize the fullname field in leaveForm
  }

  fetchLeaveTypes(): void {
    this.http.get<any[]>(this.leaveTypesApiUrl).subscribe({
      next: (data) => {
        this.leaveTypes = data;
      },
      error: (error) => {
        console.error('Error fetching leave types:', error);
      }
    });
  }

  fetchLeaveData(): void {
    this.http.get<any[]>(this.getLeaveDataUrl).subscribe({
      next: (data) => {
        // Filter leave data to show only the logged-in employee's data
        this.leaveData = data.filter(leave => leave.fullname === this.fullname);
      },
      error: (error) => {
        console.error('Error fetching leave data:', error);
      }
    });
  }

  onSubmit(): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post(this.leaveApiUrl, this.leaveForm, { headers }).subscribe({
      next: (response) => {
        // SweetAlert for successful submission
        Swal.fire({
          title: 'Success!',
          text: 'Leave application submitted successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        console.log('Response:', response);
        this.fetchLeaveData(); // Refresh the leave data after submitting
      },
      error: (error) => {
        // SweetAlert for error during submission
        Swal.fire({
          title: 'Error',
          text: 'Error submitting leave application. Please try again.',
          icon: 'error',
          confirmButtonText: 'Try Again'
        });
        console.error('Error details:', error);
      }
    });
  }
}
