import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organisation-search',
  templateUrl: './organisation-search.component.html',
  styleUrls: ['./organisation-search.component.css']
})
export class OrganisationSearchComponent implements OnInit {

  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'}
  ];

  constructor() { }

  ngOnInit() {
  }

}


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
