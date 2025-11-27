import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ChatSummary } from '../../../models/chat-summary.model';

@Component({
  selector: 'app-chat-item',
  standalone: true,
  imports: [
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './chat-item.component.html',
  styleUrl: './chat-item.component.scss'
})
export class ChatItemComponent {
  @Input({ required: true }) chat!: ChatSummary;
  @Output() rename = new EventEmitter<{ id: string; title: string }>();
  @Output() remove = new EventEmitter<string>();

  @ViewChild('renameMenuTrigger') renameMenuTrigger!: MatMenuTrigger;

  editTitle = '';

  openRenameDialog() {
    this.editTitle = this.chat.title;
    this.renameMenuTrigger.openMenu();
  }

  submitRename() {
    this.rename.emit({ id: this.chat.id, title: this.editTitle.trim() });
    this.renameMenuTrigger.closeMenu();
  }

  cancelRename() {
    this.renameMenuTrigger.closeMenu();
  }
}