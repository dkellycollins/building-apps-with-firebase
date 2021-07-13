import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TransactionModel } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageTransactionService {

  private readonly _transactions$ = new BehaviorSubject<Array<TransactionModel>>(this.load());

  public get transactions$(): Observable<Array<TransactionModel>> {
    return this._transactions$.asObservable();
  }

  public add(model: TransactionModel): Promise<void> {
    var transactions = [...this._transactions$.getValue(), model];

    this._transactions$.next([...this._transactions$.getValue(), model]);
    this.save(transactions);

    return Promise.resolve();
  }

  private load(): Array<TransactionModel> {
    try {
      var value = localStorage.getItem('transactions');
      if (!value) {
        return [];
      }

      var transactions = JSON.parse(value);
      return transactions || [];
    }
    catch (e) {
      console.error(e);
      return [];
    }
  }

  private save(transactions: Array<TransactionModel>): void {
    try {
      var value = JSON.stringify(transactions);
      localStorage.setItem('transactions', value);
    }
    catch (e) {
      console.error(e);
    }
  }
}
