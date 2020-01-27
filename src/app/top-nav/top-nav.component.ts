import { Component, OnInit } from '@angular/core';

import { MissionService } from '../services/mission-service';
import { SideNavService } from '../services/side-nav.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  constructor(private sideNavService: SideNavService) { }

  ngOnInit() {
  }

  toggle(){
    console.log(this.sideNavService);
    this.sideNavService.requestToggle();
  }

}
