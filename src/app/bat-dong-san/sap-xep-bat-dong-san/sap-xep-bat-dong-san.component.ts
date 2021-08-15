import { Component, IterableDiffers, OnInit, DoCheck } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Title } from '@angular/platform-browser';
import { BatDongSanService } from 'src/app/batdongsan.service';
import { BatDongSan } from '../bat-dong-san.component';
import { DongSan } from 'src/app/dong-san/dong-san.component';
import { DongSanService } from 'src/app/dongsan.service';
import { ConfigService, SortItem, SortResult } from 'src/app/config.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-sap-xep-bat-dong-san',
  templateUrl: './sap-xep-bat-dong-san.component.html',
  styleUrls: ['./sap-xep-bat-dong-san.component.scss'],
})
export class SapXepBatDongSanComponent implements OnInit {
  type: 'bds' | 'ds' = 'bds';
  homepage: SortItem[] = [];
  full: SortItem[] = [];
  hide: SortItem[] = [];

  danhSachBatDongSanDayDu: BatDongSan[] = [];
  public map: Map<string, string>;
  danhSachDongSanDayDu: DongSan[] = [];
  sortBds: SortResult;
  iterableDiffer: any;

  constructor(
    private titleService: Title,
    private batDongSanService: BatDongSanService,
    private dongSanService: DongSanService,
    private configService: ConfigService,
    private iterableDiffers: IterableDiffers
  ) {
    this.titleService.setTitle('Sắp xếp tài sản');
    this.iterableDiffer = iterableDiffers.find([]).create(undefined);
  }

  ngOnInit(): void {
    this.chooseBDS();
  }

  // ngDoCheck() {
  //   let changes = this.iterableDiffer.diff(this.homepage);
  //   if (changes) {
  //     this.configService.updateSort(this.type, 'HOMEPAGE', this.homepage).subscribe();
  //   }
  // }

  chooseBDS() {
    this.resetData();
    const sortBDS = this.configService.getSortBatDongSan();
    const allBDS = this.batDongSanService.getAllBatDongSan();
    forkJoin([allBDS, sortBDS]).subscribe(([allBDS, sortBDS]) => {
      this.danhSachBatDongSanDayDu = allBDS;
      this.danhSachBatDongSanDayDu.forEach(item => {
        this.map.set(String(item.id), item.ten);
      })
      this.homepage = sortBDS.homepage;
      this.full = sortBDS.full;
      this.hide = sortBDS.hidden;
    })
  }

  chooseDS() {
    this.resetData();
    const sortDS = this.configService.getSortDongSan();
    const allDS = this.dongSanService.getAllDongSan();
    forkJoin([allDS, sortDS]).subscribe(([allDS, sortDS]) => {
      this.danhSachDongSanDayDu = allDS;
      this.danhSachDongSanDayDu.forEach(item => {
        this.map.set(String(item.id), item.ten);
      })
      this.homepage = sortDS.homepage;
      this.full = sortDS.full;
      this.hide = sortDS.hidden;
    })
  }

  limiterPredicate(item: CdkDrag, container: CdkDropList) {
    if (container.data.length < 4) {
      return true;
    } else {
      return false;
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  updateHomepage() {

  }

  private resetData() {
    this.homepage = [];
    this.full = [];
    this.hide = [];
    this.map = new Map<string, string>();
  }
}
