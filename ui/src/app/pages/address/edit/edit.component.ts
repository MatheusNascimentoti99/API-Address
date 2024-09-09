import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, numberAttribute } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { AddressForm } from '@app/interface/AddressForm';
import { AddressFormComponent } from '@app/components/address-form/address-form.component';
import { AddressService } from '@app/services/address.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '@app/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    AddressFormComponent
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  address$: AddressForm = {
    street: '',
    number: null,
    complement: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    communitiesIds: []
  }
  @Input({ transform: numberAttribute }) id!: number;
  constructor(public dialog: MatDialog, private router: Router, private _snackBar: MatSnackBar, private addressService: AddressService) {
  }

  ngOnInit() {
    this.getAddress(this.id).then(address => {
      this.address$ = { ...address, communitiesIds: address.communities.map(community => community.id) };
    });
  }


  async getAddress(id: number) {
    const source$ = this.addressService.get(id).pipe(
      catchError((error: HttpErrorResponse) => {
        this._snackBar.open('Erro ao carregar o endereço', 'Fechar', {
          duration: 5000
        });
        return throwError(() => error);
      })
    )
    return await firstValueFrom(source$);
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }

  onSubmit() {
    const confirm = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Alterar endereço',
        message: 'Deseja realmente alterar o endereço?',
        confirm: 'Confirmar',
        cancel: 'Cancelar',
      },
    });
    confirm.afterClosed().subscribe(result => {
      if (result) {
        this.updateAddress();
      }
    });

  }

  updateAddress() {
    this.addressService.update(this.id, this.address$)
      .pipe(catchError((errorResponse: HttpErrorResponse) => {
        this._snackBar.open(errorResponse.error?.errors ? errorResponse.error?.errors[0]?.defaultMessage : 'Erro ao salvar o endereço', 'Fechar', {
          duration: 5000
        });
        return throwError(() => errorResponse);
      }))
      .subscribe(() => {
        this._snackBar.open('Endereço salvo com sucesso', 'Fechar')
        this.goHome();
      });
  }
}
