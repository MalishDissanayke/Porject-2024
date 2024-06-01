import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ThemeManager} from '../theme-manager';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  isActive: boolean = true;
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.onEnable();
    this.dialogRef.addPanelClass('custom-dialog');
    if (ThemeManager.isDark()) {
      this.dialogRef.addPanelClass('dark');
    } else {
      this.dialogRef.addPanelClass('light');
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onEnable(): void{
if(this.data.title === 'Information'){
this.isActive = false;
} else {
  this.isActive = true;
}
  }

}
