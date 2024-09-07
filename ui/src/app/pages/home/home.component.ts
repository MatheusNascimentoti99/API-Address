import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Pagination } from '@app/interface/Pagination';
import { Address, } from '@app/interface/Address';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { JsonPipe, NgFor } from '@angular/common';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AddressService } from '@app/services/address.service';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    JsonPipe,
    MatCardModule,
    NgFor
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  displayedColumns: string[] = ['street', 'number', 'complement', 'city', 'state', 'zipCode', 'country', 'actions'];
  pagination: Pagination<Address> = {
    content: [],
    lastPage: 0,
    page: 0,
    pageSize: 0,
    totalElements: 0,
    totalPages: 0
  };
  constructor(private addressService: AddressService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.paginate();
  }

  handlePageEvent(e: PageEvent) {
    this.pagination.page = e.pageIndex;
    this.paginate();
  }

  paginate() {
    this.addressService.paginate(this.pagination.page).subscribe(response => {
      this.pagination.content = response.content;
      this.pagination.totalElements = response.totalElements;
      this.pagination.totalPages = response.totalPages;
      this.pagination.pageSize = response.pageSize;
      this.pagination.page = response.page;

    });
  }


  deleteAddress(id: number) {
    this.addressService.delete(id).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 404) {
        this._snackBar.open('Endereço não existe. Atualize a página', 'Fechar');
      } else {
        this._snackBar.open('Erro ao deletar endereço', 'Fechar');
      }
      return throwError(() => error);

    })).subscribe(() => {
      this.paginate();
    });
  }

  edit(id: number) {
    this.router.navigateByUrl('/address/edit/' + id);
  }
}

