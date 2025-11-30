import { Component, EventEmitter, Output, input ,Input} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-chat-input',
  imports: [    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './chat-input.component.component.html',
  styleUrl: './chat-input.component.component.scss'
})
export class ChatInputComponent {
  question = '';
  isLoading = input<boolean>(false);
  isCentered = input<boolean>(false);

  @Output() sendMessage = new EventEmitter<string>();
  @Output() fileAttach = new EventEmitter<void>();

  // Add this input
@Input() selectedProduct: string | null = null;

  onSubmit() {
    const trimmed = this.question.trim();
    if (trimmed && !this.isLoading()) {
      this.sendMessage.emit(trimmed);
      this.question = '';
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSubmit();
    }   
  }

  onFileClick() {
    // Just emit event for visual feedback, no actual file processing
    this.fileAttach.emit();
    console.log('File attachment clicked (demo only)');
  }

  onInputFocus() {
    // When user focuses on input, emit event to move it to bottom
    if (this.isCentered()) {
      this.sendMessage.emit(''); // Empty emit to trigger position change
    }}

}
