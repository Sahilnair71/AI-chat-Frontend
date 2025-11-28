import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-rename-chat-dialog',
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  styles: [`
    :host {
      display: block;
    }

    ::ng-deep .sidebar-dialog-panel .mat-mdc-dialog-surface {
      background-color: #ffffff;
      color: #0f172a;
      padding: 24px;
    }

    :host-context(body.dark) ::ng-deep .sidebar-dialog-panel .mat-mdc-dialog-surface {
      background-color: #0f111a;
      color: #f8fafc;
    }

    mat-dialog-actions {
      margin-top: 12px;
    }
  `],
  template: `
    <h2 mat-dialog-title>Rename chat</h2>
    <mat-dialog-content>
      <mat-form-field appearance="outline" class="w-full">
        <input style="padding: 2px;" matInput [(ngModel)]="title" placeholder="Enter new chat name" />
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-flat-button color="primary" [mat-dialog-close]="title" [disabled]="!title.trim()">Save</button>
    </mat-dialog-actions>
  `,
})
export class RenameChatDialogComponent {
    title = '';
  constructor(@Inject(MAT_DIALOG_DATA) private readonly data: { title: string }) {
    this.title = data?.title ?? '';
  }
 
}