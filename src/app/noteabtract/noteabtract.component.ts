import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Entry {
  id: number;
  fyYear: number;
  entrytype: string;
  date: string;
  status: string;
}

interface EntryDetails {
  appointandsalary: string;
  positionofappoint: string;
  salaryinperappoint: string;
  addpayontransferappoint: string;
  otherallowances: string;
  dateofappoint: string;
}

@Component({
  selector: 'app-noteabtract',
  templateUrl: './noteabtract.component.html',
  styleUrls: ['./noteabtract.component.css']
})
export class NoteabtractComponent implements OnInit {
  fullname: string | null = null;
  entries: Entry[] = [];
  isPopupOpen = false;
  popupData: EntryDetails | null = null;

  appointandsalary: string = '';
  positionofappoint: string = '';
  salaryinperappoint: string = '';
  addpayontransferappoint: string = '';
  otherallowances: string = '';
  dateofappoint: string = '';
  fyYear: number | null = null;
  entryType: string = '';
  entryDate: string = '';

  private apiUrl = 'http://localhost:8080/api/entrybooks/fullname/'; // Base URL for fetching entries
  private detailsApiUrl = 'http://localhost:8080/api/entrybooks/details/'; // URL for fetching entry details

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getLoggedInFullName();
    if (this.fullname) {
      this.fetchEntries(this.fullname);
    }
  }

  // Method to get the logged-in employee's fullname from local storage
  getLoggedInFullName(): void {
    this.fullname = localStorage.getItem('employeeName') || null;
  }

  // Fetch entries based on the logged-in employee's fullname
  fetchEntries(fullname: string): void {
    this.http.get<Entry[]>(`${this.apiUrl}${fullname}`).subscribe(
      (response) => {
        this.entries = response; // Fetch all data based on fullname
      },
      (error) => {
        console.error('Error fetching entries:', error);
      }
    );
  }

  handleEntryDetails(entryId: number): void {
    this.fetchEntryDetails(entryId);
    this.openPopup();
  }

  fetchEntryDetails(entryId: number): void {
    this.http.get<EntryDetails>(`${this.detailsApiUrl}${entryId}`).subscribe(
      (response) => {
        this.popupData = response;
        // Assign fetched data to form fields
        this.appointandsalary = response.appointandsalary;
        this.positionofappoint = response.positionofappoint;
        this.salaryinperappoint = response.salaryinperappoint;
        this.addpayontransferappoint = response.addpayontransferappoint;
        this.otherallowances = response.otherallowances;
        this.dateofappoint = response.dateofappoint;
      },
      (error) => {
        console.error('Error fetching entry details:', error);
      }
    );
  }

  openPopup(): void {
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
    this.popupData = null;
  }

  updatePopupData(): void {
    if (this.popupData) {
      // Update popupData with current form values before any further actions
      this.popupData.appointandsalary = this.appointandsalary;
      this.popupData.positionofappoint = this.positionofappoint;
      this.popupData.salaryinperappoint = this.salaryinperappoint;
      this.popupData.addpayontransferappoint = this.addpayontransferappoint;
      this.popupData.otherallowances = this.otherallowances;
      this.popupData.dateofappoint = this.dateofappoint;

      // Optional: Implement any additional logic for updating the data back to the server
      // Example: Sending updated data to an update API endpoint
    }
  }

  searchEntries(): void {
    if (this.fullname) {
      this.fetchEntries(this.fullname); // Re-fetch to show updated or filtered results based on the inputs
    }
  }
}
