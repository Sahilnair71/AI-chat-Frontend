import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Message } from '../../../models/message.model';

@Component({
  selector: 'app-question-card',
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.scss',
  standalone:true
})
export class QuestionCardComponent {
  @Input({ required: true }) message!: Message;
}
