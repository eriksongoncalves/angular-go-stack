import { Component, inject } from '@angular/core'
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

import { ITaskFormModalData } from '@interfaces/task-form.modal'
import { ITaskFormControls } from '@/interfaces/task-form-controls'

@Component({
  selector: 'app-task-form-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form-modal.html',
  styleUrl: './task-form-modal.css'
})
export class TaskFormModal {
  readonly _data: ITaskFormModalData = inject(DIALOG_DATA)
  readonly _dialogRef = inject(DialogRef)

  taskForm: FormGroup = new FormGroup({
    name: new FormControl(this._data.formValues.name, [
      Validators.required,
      Validators.minLength(10)
    ]),
    description: new FormControl(this._data.formValues.description, [Validators.required])
  })

  onFormSubmit(event: Event): void {
    event.preventDefault()

    this.closeModal(this.taskForm.value)
  }

  closeModal(formValues?: ITaskFormControls): void {
    this._dialogRef.close(formValues)
  }
}
