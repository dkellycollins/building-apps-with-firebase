import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionModel } from '../models/transaction.model';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreTransactionService {

  constructor(
    private readonly firestore: AngularFirestore
  ) { }

  public get transactions$(): Observable<Array<TransactionModel>> {
    return this.firestore.collection<TransactionDto>('transactions')
      .valueChanges()
      .pipe(
        map((collection) => {
          return collection.map(dto => {
            return {
              category: dto.category,
              amount: dto.amount,
              date: dto.date.toDate()
            };
          });
        }) 
      );
  }

  public async add(transaction: TransactionModel): Promise<void> {
    await this.firestore.collection<TransactionDto>('transactions').add({
      category: transaction.category,
      amount: transaction.amount,
      date: firebase.firestore.Timestamp.fromDate(transaction.date)
    });
  }
}

interface TransactionDto {
  category: string;
  amount: number;
  date: firebase.firestore.Timestamp
}
