import { Component, inject } from '@angular/core'

import { ModalControllerService } from '@/services/modal-controller'
import { ITaskFormControls } from '@/interfaces/task-form-controls'

@Component({
  selector: 'app-welcome-section',
  imports: [],
  templateUrl: './welcome-section.html',
  styleUrl: './welcome-section.css'
})
export class WelcomeSection {
  private readonly _modalControllerService = inject(ModalControllerService)

  openNewTaskModal(): void {
    const dialogRef = this._modalControllerService.openNewTaskModal()

    dialogRef.closed.subscribe((formValues?: ITaskFormControls) => {
      console.log('>>> Tarefa Criada: ', formValues)
    })
  }
}
