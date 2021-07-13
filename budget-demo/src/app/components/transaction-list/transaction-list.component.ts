import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { TransactionModel } from '../../models/transaction.model';
import { FirestoreTransactionService } from '../../services/firestore-transaction.service';
import { TransactionImageComponent } from '../transaction-image/transaction-image.component';
import { TransactionNewComponent } from '../transaction-new/transaction-new.component';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  public transactions$!: Observable<Array<TransactionModel>>;
  public transactionsTotal$!: Observable<number>;

  constructor(
    private readonly transactionService: FirestoreTransactionService,
    private readonly dialog: MatDialog,
    private readonly apiService: ApiService
  ) { }

  public ngOnInit(): void {
    this.transactions$ = this.transactionService.transactions$;
    this.refreshTransactionsTotal();
  }

  public async createTransaction(): Promise<void> {
    const dialog = this.dialog.open(TransactionNewComponent);

    await dialog.afterClosed().toPromise();
    this.refreshTransactionsTotal();
  }

  private refreshTransactionsTotal(): void {
    this.transactionsTotal$ = this.apiService.getTransactionsTotalForUser().pipe(
      map(response => response.transactionsTotal)
    );
  }

  public showTransaction(transaction: TransactionModel): void {
    this.dialog.open(TransactionImageComponent, {
      data: { transactionId: transaction.id }
    });
  }

}
