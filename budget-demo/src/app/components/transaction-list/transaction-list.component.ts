import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TransactionModel } from '../../models/transaction.model';
import { FirestoreTransactionService } from '../../services/firestore-transaction.service';
import { TransactionNewComponent } from '../transaction-new/transaction-new.component';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  public transactions$!: Observable<Array<TransactionModel>>;

  constructor(
    private readonly transactionService: FirestoreTransactionService,
    private readonly dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.transactions$ = this.transactionService.transactions$;
  }

  public createTransaction(): void {
    this.dialog.open(TransactionNewComponent);
  }

}
