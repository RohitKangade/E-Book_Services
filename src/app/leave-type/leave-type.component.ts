import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'; // Import SweetAlert2

interface LeaveType {
  id?: number;   // Marked 'id' as optional
  leavetype: string;
}

@Component({
  selector: 'app-leave-type',
  templateUrl: './leave-type.component.html',
  styleUrls: ['./leave-type.component.css']
})
export class LeaveTypeComponent implements OnInit {

  leaveType: LeaveType = { leavetype: '' }; // No need to initialize 'id' as it's optional
  leaveTypes: LeaveType[] = [];
  isEdit = false;

  private apiUrl = 'http://localhost:8080/api/leavetypes';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchLeaveTypes();
  }

  // Fetch all leave types from API
  fetchLeaveTypes() {
    this.http.get<LeaveType[]>(this.apiUrl).subscribe(
      data => this.leaveTypes = data,
      error => console.error('Error fetching leave types', error)
    );
  }

  // Add or Update leave type
  addOrUpdateLeaveType() {
    if (this.isEdit && this.leaveType.id) {
      // Update leave type if it's in edit mode and has an id
      this.http.put(`${this.apiUrl}/${this.leaveType.id}`, this.leaveType).subscribe(
        () => {
          this.fetchLeaveTypes();
          this.resetForm();
          Swal.fire({
            title: 'Success!',
            text: 'Leave type updated successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        },
        error => {
          console.error('Error updating leave type', error);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to update leave type.',
            icon: 'error',
            confirmButtonText: 'Try Again'
          });
        }
      );
    } else {
      // Add new leave type
      this.http.post(this.apiUrl, this.leaveType).subscribe(
        () => {
          this.fetchLeaveTypes();
          this.resetForm();
          Swal.fire({
            title: 'Success!',
            text: 'Leave type added successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        },
        error => {
          console.error('Error adding leave type', error);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to add leave type.',
            icon: 'error',
            confirmButtonText: 'Try Again'
          });
        }
      );
    }
  }

  // Delete leave type by ID
  deleteLeaveType(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`${this.apiUrl}/${id}`).subscribe(
          () => {
            this.fetchLeaveTypes();
            Swal.fire(
              'Deleted!',
              'Leave type has been deleted.',
              'success'
            );
          },
          error => {
            console.error('Error deleting leave type', error);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete leave type.',
              icon: 'error',
              confirmButtonText: 'Try Again'
            });
          }
        );
      }
    });
  }

  // Edit leave type (populate form with data)
  editLeaveType(type: LeaveType) {
    this.leaveType = { ...type }; // Shallow copy the selected leave type
    this.isEdit = true;
  }

  // Reset form after add/update
  resetForm() {
    this.leaveType = { leavetype: '' }; // Clear the form by resetting the leaveType object
    this.isEdit = false;
  }
}
