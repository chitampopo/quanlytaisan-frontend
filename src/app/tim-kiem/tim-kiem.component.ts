import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SearchNangCao, TimNangCaoComponent } from '../tim-nang-cao/tim-nang-cao.component';

@Component({
  selector: 'app-tim-kiem',
  templateUrl: './tim-kiem.component.html',
  styleUrls: ['./tim-kiem.component.scss']
})
export class TimKiemComponent implements OnInit {
  keyword: string = '';
  value = "Sản phẩm muốn tìm";

  @Output() thayDoiTimKiem = new EventEmitter<string>();
  @Output() thayDoiSapXep = new EventEmitter<string>();
  @Output() thayDoiTimKiemNangCao = new EventEmitter<SearchNangCao>();
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  modelChanged(event: any) {
    this.thayDoiTimKiem.emit(event);
  }

  sortChange(event: any) {
    this.thayDoiSapXep.emit(event);
  }

  openDialog() {
    const dialogRef = this.dialog.open(TimNangCaoComponent, {
      width: '50%',
      data: new SearchNangCao()
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(JSON.stringify(result));
      this.thayDoiTimKiemNangCao.emit(result);
    });
  }
}
