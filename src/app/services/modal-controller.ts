import { inject, Injectable } from '@angular/core'
import { Dialog, DialogRef } from '@angular/cdk/dialog'

import { TaskFormModal } from '@/components/task-form-modal/task-form-modal'
import { TaskCommentsModal } from '@/components/task-comments-modal/task-comments-modal'
import { ITaskFormControls } from '@/interfaces/task-form-controls'
import { ITask } from './task'

@Injectable({
  providedIn: 'root'
})
export class ModalControllerService {
  private readonly modalSizeOptions = {
    maxWidth: '620px',
    width: '95%'
  }

  private readonly _dialog = inject(Dialog)

  openNewTaskModal(): DialogRef<ITaskFormControls, unknown> {
    return this._dialog.open<ITaskFormControls>(TaskFormModal, {
      ...this.modalSizeOptions,
      disableClose: true,
      data: {
        mode: 'create',
        formValues: {
          name: '',
          description: ''
        }
      }
    })
  }

  openEditTaskModal(formValues: ITaskFormControls): DialogRef<ITaskFormControls, unknown> {
    return this._dialog.open<ITaskFormControls>(TaskFormModal, {
      ...this.modalSizeOptions,
      disableClose: true,
      data: {
        mode: 'edit',
        formValues
      }
    })
  }

  openTaskCommentsModal(task: ITask): DialogRef<unknown, TaskCommentsModal> {
    return this._dialog.open(TaskCommentsModal, {
      ...this.modalSizeOptions,
      disableClose: true,
      data: task
    })
  }
}
