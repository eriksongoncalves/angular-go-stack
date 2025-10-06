import { Component, inject } from '@angular/core'

import { ITaskFormControls } from '@/interfaces/task-form-controls'
import { ModalControllerService } from '@/services/modal-controller'
import { TaskService } from '@/services/task'

@Component({
  selector: 'app-welcome-section',
  imports: [],
  templateUrl: './welcome-section.html',
  styleUrl: './welcome-section.css'
})
export class WelcomeSection {
  private readonly _modalControllerService = inject(ModalControllerService)
  private readonly _taskService = inject(TaskService)

  openNewTaskModal(): void {
    const dialogRef = this._modalControllerService.openNewTaskModal()

    dialogRef.closed.subscribe((formValues?: ITaskFormControls) => {
      if (formValues) {
        this._taskService.addTask(formValues)
      }
    })
  }
}
