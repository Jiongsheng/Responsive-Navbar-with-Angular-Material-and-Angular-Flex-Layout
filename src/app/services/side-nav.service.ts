import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
import { MatSidenav } from '@angular/material';

@Injectable({
  providedIn: 'root'
})

export class SideNavService {

  // Observable string sources
  private missionAnnouncedSource = new Subject<string>();

  // Observable string streams
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();

  requestToggle(){
    this.missionAnnouncedSource.next();
	}
	

}
