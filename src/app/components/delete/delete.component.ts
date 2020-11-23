import { Inject } from '@angular/core';
import { Component, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MeetingService } from 'src/app/service/meeting.service';
import { MeetingFormComponent } from '../meeting-form/meeting-form.component';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  public idDelete:string;

  constructor(
    public dialogRef: MatDialogRef<MeetingFormComponent>,
    private service: MeetingService,
    private router: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.idDelete = data;
   }

  ngOnInit(): void {
  }

  delete(){
    this.service.delete(this.idDelete).subscribe(result => {
      console.log('Resp Delete', result);
    },
    err => {
      console.log('Error ', err);
    });
    this.dialogRef.close(true);
    window.location.reload();
  }


  cancel(): void {
    this.dialogRef.close();
  }

}
