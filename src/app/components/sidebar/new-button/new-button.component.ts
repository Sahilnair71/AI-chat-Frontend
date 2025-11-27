import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-new-button',
  imports: [MatButtonModule],
  templateUrl: './new-button.component.html',
  styleUrl: './new-button.component.scss'
})
export class NewButtonComponent {
  @Output() create = new EventEmitter<void>();
}
