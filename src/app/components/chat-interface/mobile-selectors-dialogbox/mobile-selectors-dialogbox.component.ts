import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';


export interface MobileSelectorsDialogData {
  selectedModel: string;
  selectedProvider: string;
  creativity: string;
  selectedProduct: string;
  models: string[];
  providers: string[];
  creativityLevels: Array<{ value: string; label: string }>;
  products: string[];
}


export interface MobileSelectorsDialogResult {
  model: string;
  provider: string;
  creativity: string;
  product: string;
}

@Component({
  selector: 'app-mobile-selectors-dialogbox',
  imports: [    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    FormsModule],
  templateUrl: './mobile-selectors-dialogbox.component.html',
  styleUrl: './mobile-selectors-dialogbox.component.scss'
})
export class MobileSelectorsDialogboxComponent {
  constructor(
    public dialogRef: MatDialogRef<MobileSelectorsDialogboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MobileSelectorsDialogData
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close({
      model: this.data.selectedModel,
      provider: this.data.selectedProvider,
      creativity: this.data.creativity,
      product: this.data.selectedProduct
    } as MobileSelectorsDialogResult);
  }
}
