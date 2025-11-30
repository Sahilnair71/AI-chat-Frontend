import { Component, inject, EventEmitter, Input,Output } from '@angular/core';
import { ThemeStore } from '../../store/themestore';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  imports: [MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  public readonly themeStore = inject(ThemeStore);

  @Input() sidebarOpen = false;
  @Output() toggleSidebar = new EventEmitter<void>();


  onToggleSidebar() {
    this.toggleSidebar.emit();
  }
}
