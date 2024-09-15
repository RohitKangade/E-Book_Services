import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeComponent } from './employee/employee.component';
import { ClerkComponent } from './clerk/clerk.component';
import { HODComponent } from './hod/hod.component';
import { CEOComponent } from './ceo/ceo.component';
import { EntrybookComponent } from './entrybook/entrybook.component';
import { FooterComponent } from './footer/footer.component';
import { NoteabtractComponent } from './noteabtract/noteabtract.component';
import { EmpsevapushtikaComponent } from './empsevapushtika/empsevapushtika.component';
import Swal from 'sweetalert2';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmpentrybookComponent } from './empentrybook/empentrybook.component';
import { ClerkshowsevapushtikaComponent } from './clerkshowsevapushtika/clerkshowsevapushtika.component';
import { CreateSevapushtikaComponent } from './create-sevapushtika/create-sevapushtika.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { UploadSevapushtikaComponent } from './upload-sevapushtika/upload-sevapushtika.component';
import { SevapushtikaEmpnameComponent } from './sevapushtika-empname/sevapushtika-empname.component';
import { HodNoteabstractComponent } from './hod-noteabstract/hod-noteabstract.component';
import { HodSevapushtikaYadiComponent } from './hod-sevapushtika-yadi/hod-sevapushtika-yadi.component';
import { HodSevapushtikaComponent } from './hod-sevapushtika/hod-sevapushtika.component';
import { HodSevapushtikaNextpageComponent } from './hod-sevapushtika-nextpage/hod-sevapushtika-nextpage.component';
import { LeaveTypeComponent } from './leave-type/leave-type.component';
import { EntryTypeComponent } from './entry-type/entry-type.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    EmployeeComponent,
    ClerkComponent,
    HODComponent,
    CEOComponent,
    EntrybookComponent,
    FooterComponent,
    NoteabtractComponent,
    EmpsevapushtikaComponent,
    EmpentrybookComponent,
    ClerkshowsevapushtikaComponent,
    CreateSevapushtikaComponent,
    CreateEmployeeComponent,
    UploadSevapushtikaComponent,
    SevapushtikaEmpnameComponent,
    HodNoteabstractComponent,
    HodSevapushtikaYadiComponent,
    HodSevapushtikaComponent,
    HodSevapushtikaNextpageComponent,
    LeaveTypeComponent,
    EntryTypeComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
