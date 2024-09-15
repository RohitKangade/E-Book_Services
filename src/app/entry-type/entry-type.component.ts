import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

interface EntryType {
  id?: number;
  entrytype: string; // Use lowercase consistently for the field name
}

@Component({
  selector: 'app-entry-type',
  templateUrl: './entry-type.component.html',
  styleUrls: ['./entry-type.component.css']
})
export class EntryTypeComponent implements OnInit {

  entryType: EntryType = { entrytype: '' }; // Form entry type
  entryTypes: EntryType[] = []; // Array of entry types for listing
  isEdit = false;

  private apiUrl = 'http://localhost:8080/api/entrytypes';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchEntryTypes();
  }

  // Fetch all entry types from the API
  fetchEntryTypes() {
    this.http.get<EntryType[]>(this.apiUrl).subscribe(
      data => this.entryTypes = data,
      error => console.error('Error fetching entry types', error)
    );
  }

  // Add or update entry type
  addOrUpdateEntryType() {
    if (this.isEdit && this.entryType.id) {
      // Update entry type if in edit mode and has an id
      this.http.put(`${this.apiUrl}/${this.entryType.id}`, this.entryType).subscribe(
        () => {
          this.fetchEntryTypes();
          this.resetForm();
          Swal.fire({
            title: 'Success!',
            text: 'Entry type updated successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        },
        error => {
          console.error('Error updating entry type', error);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to update entry type.',
            icon: 'error',
            confirmButtonText: 'Try Again'
          });
        }
      );
    } else {
      // Add new entry type
      this.http.post(this.apiUrl, this.entryType).subscribe(
        () => {
          this.fetchEntryTypes();
          this.resetForm();
          Swal.fire({
            title: 'Success!',
            text: 'Entry type added successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        },
        error => {
          console.error('Error adding entry type', error);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to add entry type.',
            icon: 'error',
            confirmButtonText: 'Try Again'
          });
        }
      );
    }
  }

  // Delete entry type by ID
  deleteEntryType(id: number) {
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
            this.fetchEntryTypes();
            Swal.fire('Deleted!', 'Entry type has been deleted.', 'success');
          },
          error => {
            console.error('Error deleting entry type', error);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete entry type.',
              icon: 'error',
              confirmButtonText: 'Try Again'
            });
          }
        );
      }
    });
  }

  // Edit entry type (populate form with data)
  editEntryType(type: EntryType) {
    this.entryType = { ...type }; // Shallow copy the selected entry type
    this.isEdit = true;
  }

  // Reset form after add/update
  resetForm() {
    this.entryType = { entrytype: '' }; // Clear the form by resetting the entryType object
    this.isEdit = false;
  }
}
