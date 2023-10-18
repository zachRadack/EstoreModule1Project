import { formatDate } from '@angular/common';
import { Component,OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {ThemePalette} from '@angular/material/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, forkJoin, map, mergeMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent implements OnInit {
  meetingForm: FormGroup = this.fb.group({
    meetingDate: [null, Validators.required],
    meetingTime: [null, Validators.required],
    otherClientId: [null, Validators.required]
 });
 meetings: any[] = [];


 constructor(private fb: FormBuilder, private http: HttpClient,public router: Router) {}


 ngOnInit(): void {
  this.initForm();
  const currentClientId = String(sessionStorage.getItem('userID'));
  this.getMeetingsForClient(currentClientId);
  }

  initForm() {
    this.meetingForm = this.fb.group({
      meetingDate: [null, Validators.required],
      meetingTime: [null, Validators.required],
      meetingTopic: [null, Validators.required],
      participants: this.fb.array([])
    });
    // Optionally add a default participant field
    this.addParticipant();
  }

  get participants() {
    return this.meetingForm.get('participants') as FormArray;
  }

  addParticipant(): void {
    this.participants.push(this.fb.control(null, Validators.required));
  }

  removeParticipant(index: number): void {
    this.participants.removeAt(index);
  }


  scheduleMeeting() {
    if (this.meetingForm.valid) {
      const formData = this.meetingForm.value;
      const currentClientId = String(sessionStorage.getItem('userID')); // Assuming 'currentClientId' is stored in session

      // Make sure the current client ID is added to the participants array
      const participantsWithCurrentClient = [...formData.participants, currentClientId].filter(Boolean); // Remove any null/empty participants

      const meetingDetails = {
        meetingDate: formData.meetingDate,
        meetingTime: formData.meetingTime,
        participants: participantsWithCurrentClient,
        meetingTopic: formData.meetingTopic
      };

      // You can now send 'meetingDetails' to your server or process as required
      console.log(meetingDetails);
      this.addMeetingToDb(meetingDetails);
    } else {
      console.error('Form is not valid.');
    }
  }


  private BASE_URL = 'http://localhost:3000'; // replace with your JSON server URL

addMeetingToDb(meeting: any) {
  return this.http.post(`${this.BASE_URL}/meetings`, meeting).subscribe(response => {
    console.log('Meeting added:', response);
  }, error => {
    console.error('Error adding meeting:', error);
  });
}

getMeetingsForClient(clientId: string) {
  // Request to fetch all meetings
  const allMeetings$ = this.http.get<any[]>(`${this.BASE_URL}/meetings`);
  console.log(allMeetings$);
  console.log("allmeets")
  allMeetings$.pipe(
    // First, filter out meetings where the client is a participant
    map(meetings => meetings.filter(meeting => meeting.participants.includes(clientId))),
    mergeMap(filteredMeetings => {
      const nameFetches = filteredMeetings.map(meeting =>
        this.getInviterNameById(meeting.currentClientId).pipe(
          map(name => ({ ...meeting, inviterName: name }))
        )
      );
      return forkJoin(nameFetches);
    })
  ).subscribe(results => {
    this.meetings = results;
    console.log('Meetings for client:', this.meetings);
  }, error => {
    console.error('Error fetching meetings:', error);
  });
}



formatTime(time: string): string {
  const [hour, minute] = time.split(':');
  const AMorPM = parseInt(hour, 10) < 12 ? 'AM' : 'PM';
  const formattedHour = parseInt(hour, 10) <= 12 ? hour : (parseInt(hour, 10) - 12).toString();
  const formattedMinute = minute.padStart(2, '0'); // Ensures minutes is 2 digits
  return `${formattedHour}:${formattedMinute} ${AMorPM}`;
}

getInviterNameById(id: string): Observable<string> {
  return this.http.get<any>(`${this.BASE_URL}/accounts?id=${id}`).pipe(
    map((accounts: string | any[]) => accounts.length ? `${accounts[0].firstname} ${accounts[0].lastname}` : 'Unknown')
  );
}
goBack() {
  this.router.navigate(['Dashboard']); // Replace 'path-to-your-previous-route' with your actual route
}

}
