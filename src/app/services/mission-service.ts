import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  // Observable string sources
  private missionAnnouncedSource = new Subject<string>();

  // Observable string streams
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();

  requestFromTopNav4Toggle(msg:string){
    this.missionAnnouncedSource.next(msg);
  }


}
