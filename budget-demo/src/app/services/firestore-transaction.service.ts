import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionModel } from '../models/transaction.model';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirestoreTransactionService {

  constructor(
    private readonly firestore: AngularFirestore,
    private readonly auth: AngularFireAuth
  ) { }

  public get transactions$(): Observable<Array<TransactionModel>> {
    return this.auth.user.pipe(
      filter(user => !!user),
      switchMap(user => {
        return this.firestore.collection<TransactionDto>(
          'transactions',
          ref => ref.where('owner', '==', user?.uid)
        ).valueChanges();
      }),
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
    const user = await this.auth.user.pipe(filter(user => !!user), take(1)).toPromise();
    await this.firestore.collection<TransactionDto>('transactions').add({
      category: transaction.category,
      amount: transaction.amount,
      date: firebase.firestore.Timestamp.fromDate(transaction.date),
      owner: user?.uid!
    });
  }
}

interface TransactionDto {
  category: string;
  amount: number;
  date: firebase.firestore.Timestamp;
  owner: string;
}
