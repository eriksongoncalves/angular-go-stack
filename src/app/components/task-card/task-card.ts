import { Component, inject, Input } from '@angular/core'
import { SlicePipe } from '@angular/common'

import { ITaskFormControls } from '@/interfaces/task-form-controls'
import { ITask, TaskService } from '@/services/task'
import { ModalControllerService } from '@services/modal-controller'

@Component({
  selector: 'app-task-card',
  imports: [SlicePipe],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css'
})
export class TaskCard {
  @Input({ required: true }) task!: ITask

  private readonly _modalControllerService = inject(ModalControllerService)
  private readonly _taskService = inject(TaskService)

  openEditTaskModal(): void {
    const dialogRef = this._modalControllerService.openEditTaskModal({
      name: this.task.name,
      description: this.task.description
    })

    dialogRef.closed.subscribe((formValues?: ITaskFormControls) => {
      if (formValues) {
        this._taskService.updateTaskNameAndDescription({
          ...this.task,
          ...formValues
        })
      }
    })
  }

  openTaskCommentsModal(): void {
    const dialogRef = this._modalControllerService.openTaskCommentsModal(this.task)

    dialogRef.closed.subscribe(taskCommentsChanged => {
      if (taskCommentsChanged) {
        this._taskService.updateTaskComments(this.task.id, this.task.status, this.task.comments)
      }
    })
  }

  deleteTask(): void {
    this._taskService.deleteTask(this.task.id, this.task.status)
  }
}
