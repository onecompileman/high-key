import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Leaderboard } from 'src/app/shared/models/leaderboard.model';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  collectionName = 'leaderboards';

  leaderboards$: BehaviorSubject<Leaderboard[]> = new BehaviorSubject([]);

  constructor(private angularFirestore: AngularFirestore) {
    this.getAll().subscribe((leaderboards) => {
      this.leaderboards$.next(leaderboards);
      console.log(leaderboards);
    });
  }

  create(leaderboard: Leaderboard): Promise<any> {
    return this.angularFirestore
      .collection(this.collectionName)
      .add(leaderboard);
  }

  getAll(): Observable<Leaderboard[]> {
    return this.angularFirestore
      .collection<Leaderboard>(this.collectionName, (ref) =>
        ref.orderBy('time', 'asc').limit(5)
      )
      .valueChanges({ idField: 'id' });
  }
}
