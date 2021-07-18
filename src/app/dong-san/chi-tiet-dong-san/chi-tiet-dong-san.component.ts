import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DongSanService } from 'src/app/dongsan.service';
import { DongSan } from '../dong-san.component';

@Component({
  selector: 'app-chi-tiet-dong-san',
  templateUrl: './chi-tiet-dong-san.component.html',
  styleUrls: ['./chi-tiet-dong-san.component.scss']
})
export class ChiTietDongSanComponent implements OnInit {
  id!: string;
  dongSan: DongSan;

  constructor(private title: Title, private dongSanService: DongSanService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.route.params.subscribe(params => {
      this.dongSanService.getDongSan(params.id).subscribe(ds => {
        this.dongSan = ds;
        this.title.setTitle(ds.ten);
      });
    });
  }

}
