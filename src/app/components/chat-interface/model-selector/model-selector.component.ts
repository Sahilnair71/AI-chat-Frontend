import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MobileSelectorsDialogData, MobileSelectorsDialogResult,MobileSelectorsDialogboxComponent } from '../mobile-selectors-dialogbox/mobile-selectors-dialogbox.component';

@Component({
  selector: 'app-model-selector',
  imports: [    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    FormsModule],
  templateUrl: './model-selector.component.html',
  styleUrl: './model-selector.component.scss'
})
export class ModelSelectorComponent {
  @Input() selectedModel = 'GPT-4 Turbo';
  @Input() selectedProvider = 'Azure';
  @Input() creativity = '1.0';
  @Input() selectedProduct = 'All Products';
  
  @Output() modelChange = new EventEmitter<string>();
  @Output() providerChange = new EventEmitter<string>();
  @Output() creativityChange = new EventEmitter<string>();
  @Output() productChange = new EventEmitter<string>();

  readonly models = ['GPT-4 Turbo', 'GPT-4.1', 'Gemini 1.5 Pro', 'Claude 3', 'Llama 2'];
  readonly providers = ['Azure', 'OpenAI', 'Vertex AI', 'Anthropic', 'Meta'];
  readonly creativityLevels = [
    { value: '0.0', label: '0.0 (Deterministic)' },
    { value: '0.5', label: '0.5 (Low)' },
    { value: '1.0', label: '1.0 (High)' },
    { value: '1.5', label: '1.5 (Very High)' }
  ];
  readonly products = [
    'All Products',
    'Product A',
    'Product B',
    'Product C',
    'Product D'
  ];

  private dialog = inject(MatDialog);

  onModelChange(model: string) {
    this.modelChange.emit(model);
  }

  onProviderChange(provider: string) {
    this.providerChange.emit(provider);
  }

  onCreativityChange(creativity: string) {
    this.creativityChange.emit(creativity);
  }

  onProductChange(product: string) {
    this.productChange.emit(product);
  }
  openMobileSelectorsDialog(): void {
    const dialogData: MobileSelectorsDialogData = {
      selectedModel: this.selectedModel,
      selectedProvider: this.selectedProvider,
      creativity: this.creativity,
      selectedProduct: this.selectedProduct,
      models: this.models,
      providers: this.providers,
      creativityLevels: this.creativityLevels,
      products: this.products
    };

    const dialogRef = this.dialog.open(MobileSelectorsDialogboxComponent, {
      width: '90%',
      maxWidth: '400px',
      data: dialogData,
      panelClass: 'mobile-selectors-dialog'
    });

    dialogRef.afterClosed().subscribe((result: MobileSelectorsDialogResult | undefined) => {
      if (result) {
        if (result.model !== this.selectedModel) {
          this.onModelChange(result.model);
        }
        if (result.provider !== this.selectedProvider) {
          this.onProviderChange(result.provider);
        }
        if (result.creativity !== this.creativity) {
          this.onCreativityChange(result.creativity);
        }
        if (result.product !== this.selectedProduct) {
          this.onProductChange(result.product);
        }
      }
    });
  }
}
