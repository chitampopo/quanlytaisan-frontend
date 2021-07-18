import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TimNangCaoComponent } from '../tim-nang-cao/tim-nang-cao.component';

@Component({
  selector: 'app-tim-kiem',
  templateUrl: './tim-kiem.component.html',
  styleUrls: ['./tim-kiem.component.scss']
})
export class TimKiemComponent implements OnInit {
  keyword: string = '';
  value = "Sản phẩm muốn tìm";

  @Output() thayDoiTimKiem = new EventEmitter<string>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  modelChanged(event: any) {
    this.thayDoiTimKiem.emit(event);
  }

  openDialog() {
    const dialogRef = this.dialog.open(TimNangCaoComponent, {
      width: '50%',
      data: {ten: '', diaChi: ''} });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
