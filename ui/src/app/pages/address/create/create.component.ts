import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddressForm } from '@app/interface/AddressForm';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';
import { AddressFormComponent } from '@app/components/address-form/address-form.component';
import { AddressService } from '@app/services/address.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '@app/components/confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    AddressFormComponent
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  address: AddressForm = {
    street: '',
    number: null,
    complement: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    communitiesIds: []
  }
  constructor(public dialog: MatDialog, private router: Router, private addressService: AddressService, private _snackBar: MatSnackBar) { }

  goHome() {
    this.router.navigateByUrl('/home');
  }

  onSubmit() {
    const confirm = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Salvar endereço',
        message: 'Deseja realmente salvar o endereço?',
        confirm: 'Confirmar',
        cancel: 'Cancelar',
      },
    });
    confirm.afterClosed().subscribe(result => {
      if (result) {
        this.create();
      }
    });
  }

  create() {
    this.addressService.create(this.address)
      .pipe(catchError((errorResponse: HttpErrorResponse) => {
        this._snackBar.open(errorResponse.error?.errors ? errorResponse.error?.errors[0]?.defaultMessage : 'Erro ao salvar o endereço', 'Fechar', {
          duration: 5000
        });
        return throwError(() => errorResponse);
      }))
      .subscribe(() => {
        this._snackBar.open('Endereço criado com sucesso', 'Fechar')
        this.goHome();
      });
  }
}
