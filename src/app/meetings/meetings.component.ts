import { formatDate } from '@angular/common';
import { Component,OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {ThemePalette} from '@angular/material/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, forkJoin, map, mergeMap } from 'rxjs';

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


 constructor(private fb: FormBuilder, private http: HttpClient) {}


  ngOnInit(): void {
    this.initForm();
    const currentClientId = String(sessionStorage.getItem('userID'));
    this.getMeetingsForClient(currentClientId);

  }

  initForm() {
    this.meetingForm = this.fb.group({
      meetingDate: [null, Validators.required],
      meetingTime: [null, Validators.required],
      otherClientId: [null, Validators.required]
    });
  }

  scheduleMeeting() {



    if (this.meetingForm.valid) {
      const formData = this.meetingForm.value;
      console.log(typeof(sessionStorage.getItem('userID')));
      const currentClientId = String(sessionStorage.getItem('userID')); // Assuming 'currentClientId' is stored in session

      const meetingDetails = {
        meetingDate: formData.meetingDate,
        meetingTime: formData.meetingTime,
        currentClientId: currentClientId,
        otherClientId: formData.otherClientId
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
  return this.http.post(this.BASE_URL, meeting).subscribe(response => {
    console.log('Meeting added:', response);
  }, error => {
    console.error('Error adding meeting:', error);
  });
}

getMeetingsForClient(clientId: string) {
  // Separate requests for meetings set by the client and meetings they're invited to
  const setByClient$ = this.http.get<any[]>(`${this.BASE_URL}/meetings/?currentClientId=${clientId}`);
  const invitedTo$ = this.http.get<any[]>(`${this.BASE_URL}/meetings/?otherClientId=${clientId}`);

  // Use forkJoin to combine the results of both requests
  forkJoin([setByClient$, invitedTo$]).pipe(
    mergeMap(meetingsArray => {
      const combinedMeetings = [...meetingsArray[0], ...meetingsArray[1]];
      const nameFetches = combinedMeetings.map(meeting =>
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

}
