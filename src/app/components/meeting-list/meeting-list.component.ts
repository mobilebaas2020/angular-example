import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MeetingService } from 'src/app/service/meeting.service';
import { DeleteComponent } from '../delete/delete.component';
import { MeetingFormComponent } from '../meeting-form/meeting-form.component';
import * as moment from 'moment';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css']
})
export class MeetingListComponent implements OnInit {

  displayedColumns: string[] = ['meetingName', 'meetingSubject', 'meetingResponsible', 'meetingDate', 'meetingTime','action'];
  meetings = [];
  length: number;
  totalRecordsPerPage: number = 5;
  meetingNameFind: string;
  meetingDateFind: string;
  
  constructor(
    private service: MeetingService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.findAll(0,'meetingDate',null);
  }

  public getServerData(event?:PageEvent){
    this.findAll(event.pageIndex,'meetingDate',null);
  }

  findAll(pageNumber:number,sortField:string,filters:string){
    this.service.getAll(pageNumber,this.totalRecordsPerPage,sortField,filters).subscribe(meetingsReturn => {
          this.meetings =  meetingsReturn['meeting'];
          this.length = meetingsReturn['page'].size;
      }, error => {
        this.meetings = [];
        console.log('Error ',error);
        console.log('Error status ',error.status);
        console.log('Error error ',error.error);
        console.log('Error headers ',error.headers);
      });
  }

  findByParameter(){
    let filters = '';
    
    if(this.meetingNameFind != null  && this.meetingNameFind != ''){
      filters+= 'meetingName='+this.meetingNameFind;
    }

    if(this.meetingDateFind != null) {
      if(filters != ''){
        filters+= ';';
      }

      let newDate: moment.Moment = moment.utc(this.meetingDateFind).local();
      filters+= 'meetingDate='+newDate.format("YYYY-MM-DDTHH:mm:ss")+'.000Z';
    }
    this.findAll(0,'meetingDate',filters);
  }

  confirmDelete(id:number) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '500px',
      data : id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  edit(idEdit:string) {
    const dialogRef = this.dialog.open(MeetingFormComponent, {
      width: '500px',
      data : idEdit
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
