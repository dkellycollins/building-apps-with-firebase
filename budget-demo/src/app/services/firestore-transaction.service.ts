import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { TransactionModel } from '../models/transaction.model';

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
        ).valueChanges({ idField: 'id' });
      }),
      map((collection) => {
        return collection.map(dto => {
          return {
            id: dto.id!,
            category: dto.category,
            amount: dto.amount,
            date: dto.date.toDate()
          };
        });
      })
    );
  }

  public async add(transaction: TransactionModel): Promise<string> {
    const user = await this.auth.user.pipe(filter(user => !!user), take(1)).toPromise();
    const doc = await this.firestore.collection<TransactionDto>('transactions').add({
      category: transaction.category,
      amount: transaction.amount,
      date: firebase.firestore.Timestamp.fromDate(transaction.date),
      owner: user?.uid!
    });

    return doc.id;
  }
}

interface TransactionDto {
  id?: string;
  category: string;
  amount: number;
  date: firebase.firestore.Timestamp;
  owner: string;
}
