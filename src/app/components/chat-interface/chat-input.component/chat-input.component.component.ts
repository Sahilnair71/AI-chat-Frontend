import { Component, EventEmitter, Output, input ,Input,ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-input',
  imports: [    FormsModule,
    CommonModule,
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
  attachedFileName: string | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  @Output() sendMessage = new EventEmitter<string>();
  @Output() fileAttach = new EventEmitter<File | null>();

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
    // Trigger file input click
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.attachedFileName = file.name;
      this.fileAttach.emit(file);
      
      // Update input placeholder or add file name to question
      // You can customize this behavior
      if (!this.question.trim()) {
        this.question = `📎 ${file.name}`;
      } else {
        this.question += ` 📎 ${file.name}`;
      }
    }
  }

  removeFile() {
    this.attachedFileName = null;
    this.fileInput.nativeElement.value = '';
    this.fileAttach.emit(null);
    
    // Remove file name from question if it exists
    this.question = this.question.replace(/\s*📎\s*[^\s]+/g, '').trim();
  }

  onInputFocus() {
    // When user focuses on input, emit event to move it to bottom
    if (this.isCentered()) {
      this.sendMessage.emit(''); // Empty emit to trigger position change
    }}

}
