import { Component, OnInit, Directive, Input, ViewChild } from '@angular/core';
import { MissionService } from '../services/mission-service';
import { SideNavService } from '../services/side-nav.service';
import { MatSidenav } from '@angular/material';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }


  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  

  constructor(private sideNavService:SideNavService) {   
    this.dataSource.data = TREE_DATA;
  }

  ngOnInit() {  }

  public toggle():void{
    this.sideNavService.requestToggle();
    console.log('dd');
  }

}


interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Administration',
    children: [
      {name: 'Organisations'},
      {name: 'Users'},
      {name: 'Routes'},
    ]
  }, {
    name: 'Bookings',
    children: [
      {name: 'New Booking'},
      {name: 'Amend Booking'},
      {name: 'Cancel Booking'},
    ]
  }, {
    name: 'Clients'
  }
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
