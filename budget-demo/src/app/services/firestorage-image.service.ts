import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestorageImageService {

  constructor(
    private readonly fireStorage: AngularFireStorage,
    private readonly auth: AngularFireAuth
  ) { }

  public upload(transactionId: string, file: File): Observable<unknown> {
    return this.getFullPath(transactionId).pipe(
      switchMap(fullPath => this.fireStorage.ref(fullPath).put(file))
    );
  }

  public getImageUrl(transactionId: string): Observable<string> {
    return this.getFullPath(transactionId).pipe(
      switchMap(fullPath => this.fireStorage.ref(fullPath).getDownloadURL())
    );
  }

  private getFullPath(transactionId: string): Observable<string> {
    return this.auth.user.pipe(
      filter(user => !!user),
      take(1),
      map(user => `users/${user?.uid}/transactions/${transactionId}/defaultImage`)
    );
  }
}
