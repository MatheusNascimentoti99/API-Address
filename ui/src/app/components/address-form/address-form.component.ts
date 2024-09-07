import { Component, EventEmitter, Input, model, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AddressForm } from '@app/interface/AddressForm';
import { AddressViaCEP } from '@app/interface/AddressViaCEP';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { BrasilAPIService } from '@app/services/brasil-api.service';
import { City, State } from '@app/interface/BrasilAPI';
import { CommunityService } from '@app/services/community.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatCardModule } from '@angular/material/card';
import { Community, CommunityForm } from '@app/interface/Community';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { NewCommunityDialogComponent } from '../new-community-dialog/new-community-dialog.component';
import { AuthService } from '@app/services/auth.service';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    MatCardModule,
    NgIf
  ],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss',
  providers: [
    provideNgxMask()
  ]
})
export class AddressFormComponent {

  constructor(
    private router: Router,
    private brasilApi: BrasilAPIService,
    private communityService: CommunityService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    public authService: AuthService
  ) { }
  states: State[] = [];
  cities: City[] = [];
  selectedState!: State;
  communities: Community[] = [];
  @Input() address!: AddressForm;
  @Output() submit = new EventEmitter<boolean>();

  findViaCEP() {
    this.brasilApi.findCEP(this.address.zipCode)
      .subscribe((response: AddressViaCEP) => {
        this.address.street = response.logradouro;
        this.address.complement = response.complemento;
        this.address.state = response.uf;
        this.selectedState = this.states.find(state => state.sigla == response.uf)!;
        if (this.selectedState) {
          this.changeState();
        }
        this.address.city = response.localidade?.toUpperCase();
      });
  }

  changeState() {
    this.address.state = this.selectedState.nome;
    this.brasilApi.getCities(this.selectedState.sigla).subscribe(cities => {
      this.cities = cities.sort((a, b) => a.nome.localeCompare(b.nome));
    });
  }

  findCommunities() {
    this.communityService.findAll().subscribe(communities => {
      this.communities = communities;
    });
  }

  readonly name = model('');
  readonly description = model('');
  onClickNewCommunity() {
    const confirm = this.dialog.open(NewCommunityDialogComponent, {
      data: {
        name: this.name(),
        description: this.description()
      },
    });
    confirm.afterClosed().subscribe(result => {
      if (result) {
        this.createCommunity(result);
      }
    });
  }

  createCommunity(result: CommunityForm) {
    this.communityService.create({
      name: result.name,
      description: result.description
    }).subscribe(() => {
      this._snackBar.open('Comunidade criada com sucesso', 'Fechar')
      this.findCommunities()
    })
  }

  ngOnInit() {
    this.findCommunities();
    this.brasilApi.getStates().subscribe(states => {
      this.states = states.sort((a, b) => a.nome.localeCompare(b.nome));
      this.selectedState = states.find(state => state.nome == this.address.state)!;
      if (this.selectedState) {
        this.changeState();
      }
    });
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }

  emitSubmit() {
    this.submit.emit();
  }
}
