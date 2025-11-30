import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatStore } from '../../../store/chat.store';
import { NewButtonComponent } from '../new-button/new-button.component';
import { ChatSearchComponent } from '../chat-search/chat-search.component';
import { ChatListComponent } from '../chat-list/chat-list.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-sidebar-shell',
  standalone: true,
  imports: [CommonModule, NewButtonComponent, ChatSearchComponent, ChatListComponent,MatSlideToggleModule],
  templateUrl: './sidebar-shell.component.html',
  styleUrls: ['./sidebar-shell.component.scss'],
})
export class SidebarShellComponent {
  private readonly query = signal('');
  private readonly chatStore = inject(ChatStore);
  autoSaveEnabled = true;

  ngOnInit() {
    // Load from localStorage
    this.autoSaveEnabled = this.chatStore.autoSaveEnabled();
  }

  toggleAutoSave(event: any) {
    const isChecked = event.checked;
    this.autoSaveEnabled = isChecked;
    this.chatStore.setAutoSave(isChecked);
  }

  updateSearch(term: string) {
    this.query.set(term);
  }

  newChat() {
    this.chatStore.setActiveChat(null);
  }

  get searchTerm() {
    return this.query();
  }
}