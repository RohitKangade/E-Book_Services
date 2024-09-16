import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export interface EntryBook {
  fullname: string;
  entrytype: string;
  appointandsalary: string;
  natureofvacancy: string;
  addpayontransferappoint: string;
  dateofappoint: string;
  affordreasonforappoint: string;
  date: string;
  positionofappoint: string;
  salaryinperappoint: string;
  otherallowances: string;
  dateofexpireappoint: string;
  natureofleaveduration: string;
  punishmentetc: string;
}

interface Admin {
  fullname: string;
  empuniqueid: string;
  appoint: string;
  office: string;
}

interface EntryType {
  entrytype: string;
}

@Component({
  selector: 'app-entrybook',
  templateUrl: './entrybook.component.html',
  styleUrls: ['./entrybook.component.css']
})
export class EntrybookComponent implements OnInit {
  entryBook: EntryBook = {
    fullname: '',
    entrytype: '',
    appointandsalary: '',
    natureofvacancy: '',
    addpayontransferappoint: '',
    dateofappoint: '',
    affordreasonforappoint: '',
    date: '',
    positionofappoint: '',
    salaryinperappoint: '',
    otherallowances: '',
    dateofexpireappoint: '',
    natureofleaveduration: '',
    punishmentetc: ''
  };

  fullNames: string[] = [];
  entryTypes: string[] = [];
  private adminApiUrl = 'http://localhost:8080/api/admins';
  private entryBookApiUrl = 'http://localhost:8080/api/entrybooks';
  private entryTypesApiUrl = 'http://localhost:8080/api/entrytypes';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchFullNames();
    this.fetchEntryTypes(); // Fetch the entry types on initialization
  }

  // Fetch all full names from the admin API
  fetchFullNames(): void {
    this.http.get<Admin[]>(this.adminApiUrl).subscribe({
      next: (admins) => {
        this.fullNames = admins.map(admin => admin.fullname);
      },
      error: (error) => {
        console.error('Failed to fetch admin names:', error);
      }
    });
  }

  // Fetch all entry types from the API
  fetchEntryTypes(): void {
    this.http.get<EntryType[]>(this.entryTypesApiUrl).subscribe({
      next: (types) => {
        this.entryTypes = types.map(type => type.entrytype); // Extract entrytype from each object
      },
      error: (error) => {
        console.error('Failed to fetch entry types:', error);
      }
    });
  }

  // Handle name selection and fetch related details
  onNameSelected(event: Event): void {
    const selectedFullName = (event.target as HTMLSelectElement).value;

    // Fetch details for the selected admin name
    this.http.get<Admin[]>(this.adminApiUrl).subscribe({
      next: (admins) => {
        const selectedAdmin = admins.find(admin => admin.fullname === selectedFullName);
        if (selectedAdmin) {
          this.entryBook.fullname = selectedAdmin.fullname;
          this.entryBook.appointandsalary = selectedAdmin.appoint;
          this.entryBook.positionofappoint = selectedAdmin.office;
        }
      },
      error: (error) => {
        console.error('Failed to fetch admin details:', error);
      }
    });
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

  // Submit the form data to the entryBook API
  onSubmit(): void {
    this.http.post<EntryBook>(this.entryBookApiUrl, this.entryBook).subscribe({
      next: () => {
        alert('Entry Book successfully added!');
        // Reset the form
        this.entryBook = {
          fullname: '',
          entrytype: '',
          appointandsalary: '',
          natureofvacancy: '',
          addpayontransferappoint: '',
          dateofappoint: '',
          affordreasonforappoint: '',
          date: '',
          positionofappoint: '',
          salaryinperappoint: '',
          otherallowances: '',
          dateofexpireappoint: '',
          natureofleaveduration: '',
          punishmentetc: ''
        };
      },
      error: () => {
        alert('Failed to add Entry Book. Please try again.');
      }
    });
  }
}
