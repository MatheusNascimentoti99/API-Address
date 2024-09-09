import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface DialogData {
  description: string;
  name: string;
}

@Component({
  selector: 'app-new-community-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
  ],
  templateUrl: './new-community-dialog.component.html',
  styleUrl: './new-community-dialog.component.scss'
})
export class NewCommunityDialogComponent {
  private _bottomSheetRef =
    inject<MatBottomSheetRef<NewCommunityDialogComponent>>(MatBottomSheetRef);
  readonly data = inject(MAT_BOTTOM_SHEET_DATA);

  communityForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.communityForm = this.fb.group({
      name: [this.data.name || ''],
      description: [this.data.description || '']
    });
  }

  onSave(): void {
    if (this.communityForm.valid) {
      // Handle form save logic here
      this._bottomSheetRef.dismiss(this.communityForm.value);
    }
  }

  onNoClick(): void {
    this._bottomSheetRef.dismiss();
  }
}
