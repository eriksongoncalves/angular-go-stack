import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

import { IComment } from '@/interfaces/comment'
import { TaskStatus } from '@/interfaces/task-status'

export interface ITask {
  id: string
  name: string
  description: string
  commments: IComment[]
  status: TaskStatus
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // TODO
  private todoTasks$ = new BehaviorSubject<ITask[]>([])
  readonly todoTasks = this.todoTasks$.asObservable()

  // DOING
  private doingTasks$ = new BehaviorSubject<ITask[]>([])
  readonly doingTasks = this.doingTasks$.asObservable()

  // DONE
  private doneTasks$ = new BehaviorSubject<ITask[]>([])
  readonly doneTasks = this.doneTasks$.asObservable()
}
