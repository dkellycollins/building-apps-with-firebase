import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly auth: AngularFireAuth
  ) {

  }

  public getTransactionsTotalForUser(): Observable<TransactionsTotalResponse> {
    return this.auth.user.pipe(
      filter(user => !!user),
      take(1),
      switchMap(user => {
        const url = `${environment.functions.api}/getTransactionsTotalForUser?userUid=${user?.uid}`;
        return this.httpClient.get<TransactionsTotalResponse>(url);
      })
    );
  }
}

export interface TransactionsTotalResponse {
  transactionsTotal: number;
}
