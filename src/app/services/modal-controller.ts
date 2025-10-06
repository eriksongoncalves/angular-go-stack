import { inject, Injectable } from '@angular/core'
import { Dialog, DialogRef } from '@angular/cdk/dialog'

import { TaskFormModal } from '@/components/task-form-modal/task-form-modal'
import { TaskCommentsModal } from '@/components/task-comments-modal/task-comments-modal'

@Injectable({
  providedIn: 'root'
})
export class ModalControllerService {
  private readonly modalSizeOptions = {
    maxWidth: '620px',
    width: '95%'
  }

  private readonly _dialog = inject(Dialog)

  openNewTaskModal(): DialogRef<unknown, TaskFormModal> {
    return this._dialog.open(TaskFormModal, {
      ...this.modalSizeOptions
    })
  }

  openEditTaskModal(): DialogRef<unknown, TaskFormModal> {
    return this._dialog.open(TaskFormModal, {
      ...this.modalSizeOptions
    })
  }

  openTaskCommentsModal(): DialogRef<unknown, TaskCommentsModal> {
    return this._dialog.open(TaskCommentsModal, {
      ...this.modalSizeOptions
    })
  }
}
