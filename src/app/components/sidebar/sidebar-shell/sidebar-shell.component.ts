import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewButtonComponent } from '../new-button/new-button.component';
import { ChatSearchComponent } from '../chat-search/chat-search.component';
import { ChatListComponent } from '../chat-list/chat-list.component';

@Component({
  selector: 'app-sidebar-shell',
  standalone: true,
  imports: [CommonModule, NewButtonComponent, ChatSearchComponent, ChatListComponent],
  templateUrl: './sidebar-shell.component.html',
  styleUrls: ['./sidebar-shell.component.scss'],
})
export class SidebarShellComponent {
  private readonly query = signal('');

  updateSearch(term: string) {
    this.query.set(term);
  }

  newChat() {
    // placeholder – later hook into a dialog or route
    console.log('Start a new chat');
  }

  get searchTerm() {
    return this.query();
  }
}