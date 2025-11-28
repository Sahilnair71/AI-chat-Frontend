import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-delete-chat-dialog',
  imports: [MatDialogModule, MatButtonModule],
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

    .warning {
      color: #dc2626;
      margin-top: 12px;
    }
  `],
  template: `
    <h2 mat-dialog-title class="text-base font-semibold">Delete chat?</h2>
    <mat-dialog-content>
      <p>Do you really want to delete “{{ title }}”? This cannot be undone.</p>
      <p class="warning">This action permanently removes the conversation.</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>No</button>
      <button mat-flat-button color="warn" [mat-dialog-close]="true">Delete</button>
    </mat-dialog-actions>
  `,
})
export class DeleteChatDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public readonly title: string) {}
}