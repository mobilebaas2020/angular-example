import { Inject } from '@angular/core';
import { Component, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MeetingService } from 'src/app/service/meeting.service';

@Component({
  selector: 'app-meeting-form',
  templateUrl: './meeting-form.component.html',
  styleUrls: ['./meeting-form.component.css']
})
export class MeetingFormComponent implements OnInit {

  public meetingForm: FormGroup;
  public idEdit:string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MeetingFormComponent>,
    private service: MeetingService,
    private router: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: string
  ) { 
    this.idEdit = data;
  }

  ngOnInit(): void {
    this.meetingForm =  this.fb.group({
      id : [null],
      meetingName : ['',Validators.required],
      meetingSubject : ['',Validators.required],
      meetingResponsible : ['',Validators.required],
      meetingDate : ['',Validators.required],
      meetingTime : ['',Validators.required]
    });

    if(this.idEdit != null){
        this.getById();
    }
  }

  getById() {
    this.service.getById(this.idEdit).subscribe(meetingReturn => {
       this.meetingForm =  this.fb.group({
          id : [meetingReturn['id'],Validators.required],
          meetingName : [meetingReturn['meetingName'],Validators.required],
          meetingSubject : [meetingReturn['meetingSubject'],Validators.required],
          meetingResponsible : [meetingReturn['meetingResponsible'],Validators.required],
          meetingDate : [meetingReturn['meetingDate'],Validators.required],
          meetingTime : [meetingReturn['meetingTime'],Validators.required]
        });

    }, error => {
      console.log('Error ',error);
      console.log('Error status ',error.status);
      console.log('Error error ',error.error);
      console.log('Error headers ',error.headers);
    });
  }

  save(){
    if(this.meetingForm.value.id == null){
      this.create();
    } else {
      this.update();
    }
  }

  create(){
    this.service.insert(this.meetingForm.value).subscribe(result => {
      console.log('Resp Post', result);
    },
    err => {
      console.log('Error ', err);
    });
    this.dialogRef.close(true);
    this.meetingForm.reset();
    window.location.reload();
  }

  update(){
    this.service.update(this.meetingForm.value).subscribe(result => {
      console.log('Resp Post', result);
    },
    err => {
      console.log('Error ', err);
    });
    this.dialogRef.close(true);
    this.meetingForm.reset();
    window.location.reload();
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
