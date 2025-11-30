import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Message } from '../../../models/message.model';

@Component({
  selector: 'app-answer-card',
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './answer-card.component.html',
  styleUrl: './answer-card.component.scss',
  standalone:true
})
export class AnswerCardComponent {
  @Input({ required: true }) message!: Message;
  @Input() isStreaming = false
}
