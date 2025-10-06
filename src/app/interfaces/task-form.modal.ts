import { ITaskFormControls } from './task-form-controls'

export interface ITaskFormModalData {
  mode: 'create' | 'edit'
  formValues: ITaskFormControls
}
