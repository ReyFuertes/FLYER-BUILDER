import { Observable } from 'rxjs/Observable';
import { FlyerService } from './../../../service/flyer/flyer.service';
import { Component, OnInit, ViewEncapsulation, AfterViewInit, Input } from '@angular/core';

declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'ai-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class SidenavComponent implements OnInit, AfterViewInit {
  @Input() element_array: any = [];
  sub: any;

  constructor() {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }



}

