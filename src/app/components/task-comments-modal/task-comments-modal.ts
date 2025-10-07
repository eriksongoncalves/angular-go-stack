import { Component, ElementRef, inject, ViewChild } from '@angular/core'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog'

import { generateUniqueIdWithTimestamp } from '@/utils/generate-unique-id-with-timestamp'
import { IComment } from '@/interfaces/comment'
import { ITask } from '@/services/task'

@Component({
  selector: 'app-task-comments-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './task-comments-modal.html',
  styleUrl: './task-comments-modal.css'
})
export class TaskCommentsModal {
  taskCommentsChanged = false
  commentControl = new FormControl('', [Validators.required])

  @ViewChild('commentInput') commentInputRef!: ElementRef<HTMLInputElement>

  readonly _task: ITask = inject(DIALOG_DATA)
  readonly _dialogRef: DialogRef<boolean> = inject(DialogRef)

  onAddComment(): void {
    if (this.commentControl.valid) {
      const newComment: IComment = {
        id: generateUniqueIdWithTimestamp(),
        description: this.commentControl.value!
      }

      this._task.comments.unshift(newComment)

      this.commentControl.reset()

      this.taskCommentsChanged = true

      this.commentInputRef.nativeElement.focus()
    }
  }

  onRemoveModal(commentId: string): void {
    this._task.comments = this._task.comments.filter(comment => comment.id !== commentId)

    this.taskCommentsChanged = true
  }

  onCloseModal(): void {
    this._dialogRef.close(this.taskCommentsChanged)
  }
}
