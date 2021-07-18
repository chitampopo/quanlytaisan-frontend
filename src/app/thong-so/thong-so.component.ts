import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-thong-so',
  templateUrl: './thong-so.component.html',
  styleUrls: ['./thong-so.component.scss']
})
export class ThongSoComponent implements OnInit {
  @Input() title = ''
  @Input() valueString = '';
  @Input() valueNumber: number;

  constructor() { }

  ngOnInit() {
  }

}
