import { Component, Inject, inject, model } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommunityForm } from '@app/interface/Community';

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
  readonly dialogRef = inject(MatDialogRef<NewCommunityDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

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
      this.dialogRef.close(this.communityForm.value);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
