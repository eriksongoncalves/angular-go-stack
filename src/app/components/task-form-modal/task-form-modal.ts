import { Component, inject } from '@angular/core'
import { DIALOG_DATA } from '@angular/cdk/dialog'

import { ITaskFormModalData } from '@interfaces/task-form.modal'

@Component({
  selector: 'app-task-form-modal',
  imports: [],
  templateUrl: './task-form-modal.html',
  styleUrl: './task-form-modal.css'
})
export class TaskFormModal {
  readonly _data: ITaskFormModalData = inject(DIALOG_DATA)

  modalTitle = this._data.mode === 'create' ? 'Criar' : 'Editar'
}
