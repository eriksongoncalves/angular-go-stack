import { ITaskFormControls } from '@/interfaces/task-form-controls'
import { Component, inject } from '@angular/core'

import { ModalControllerService } from '@services/modal-controller'

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css'
})
export class TaskCard {
  private readonly _modalControllerService = inject(ModalControllerService)

  openEditTaskModal(): void {
    const dialogRef = this._modalControllerService.openEditTaskModal({
      name: 'Nome tarefa',
      description: 'Descrição tarefa'
    })

    dialogRef.closed.subscribe((formValues?: ITaskFormControls) => {
      console.log('>>> Tarefa alterada: ', formValues)
    })
  }
}
