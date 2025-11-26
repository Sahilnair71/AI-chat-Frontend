import { Component, effect, inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ThemeStore } from './store/themestore';
import { NavbarComponent } from './components/navbar/navbar.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ai-chat-bot';
  private readonly themeStore = inject(ThemeStore);
  private readonly platformId = inject(PLATFORM_ID);
  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      effect(() => {
        const isDarkMode = this.themeStore.isDarkMode();
        document.body.classList.toggle('dark', isDarkMode);
      });
    }
  }
}
