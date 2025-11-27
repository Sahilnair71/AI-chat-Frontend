import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-chat-search',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './chat-search.component.html',
  styleUrl: './chat-search.component.scss'
})
export class ChatSearchComponent {
  @Output() search = new EventEmitter<string>();
  query = new FormControl('');

  onInput(value: string) {
    this.search.emit(value);
  }
}
