import { IComment } from './comment'
import { TaskStatus } from './task-status'

export interface ITask {
  id: string
  name: string
  description: string
  commments: IComment[]
  status: TaskStatus
}
