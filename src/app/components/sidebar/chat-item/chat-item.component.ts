import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ChatSummary } from '../../../models/chat-summary.model';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { RenameChatDialogComponent } from '../../../utilitis/sidebar/rename-chat-dialog.component';
import { DeleteChatDialogComponent } from '../../../utilitis/sidebar/delete-chat-dialog.component';

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
    RenameChatDialogComponent
  ],
  templateUrl: './chat-item.component.html',
  styleUrl: './chat-item.component.scss'
})
export class ChatItemComponent {
  @Input({ required: true }) chat!: ChatSummary;
  @Output() rename = new EventEmitter<{ id: string; title: string }>();
  @Output() remove = new EventEmitter<string>();

  constructor(private readonly dialog: MatDialog) {}
  editTitle = '';


  openRenameDialog() {
    const ref = this.dialog.open(RenameChatDialogComponent, {
      width: '360px',
      data: { title: this.chat.title },
    });

    ref.afterClosed().subscribe((title?: string) => {
      if (title?.trim()) {
        this.rename.emit({ id: this.chat.id, title: title.trim() });
      }
    });
  }


  openDeleteDialog() {
    this.dialog.open(DeleteChatDialogComponent, {
      width: '360px',
      panelClass: 'sidebar-dialog-panel',
      data: this.chat.title,
    })
    .afterClosed()
    .subscribe((confirm?: boolean) => {
      if (confirm) {
        this.remove.emit(this.chat.id);
      }
    });
  }


}