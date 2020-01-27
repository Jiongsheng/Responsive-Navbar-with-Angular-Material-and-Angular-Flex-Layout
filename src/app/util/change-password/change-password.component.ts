import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  newPassword: string;
  confirmPassword: string;


  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    console.log('change-password');
    const dialogRef = this.dialog.open(ChangePasswordComponentDialog, {
      width: '250px',
      data: {newPassword: this.newPassword, confirmPassword: this.confirmPassword}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
   //   console.log(result);
      // if(result!=null && result.newPassword!=result.confirmPassword){
      //   result.result = "Two passwords don't match!";
      // }
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'change-password.dialog.html',
})
export class ChangePasswordComponentDialog {

  result: string;

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onCancel(): void {
    this.dialogRef.close();
  }
  onOk():void{
    console.log(this.data);
    if(this.data!=null && this.data.newPassword!=this.data.confirmPassword){
      this.result="Two passwords don't match!";
    }
    if(this.data!=null && this.data.newPassword==this.data.confirmPassword){
      this.result='Updating...';
      //To update the password via the UserServer
      //If done. to update this.resulta and call this.dialogRef.close()
    }
  }
}

export interface DialogData {
  newPassword: string;
  confirmPassword: string;
}
