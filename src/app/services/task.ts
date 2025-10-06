import { Injectable } from '@angular/core'
import { BehaviorSubject, map } from 'rxjs'

import { IComment } from '@/interfaces/comment'
import { TaskStatus } from '@/interfaces/task-status'
import { ITaskFormControls } from '@/interfaces/task-form-controls'
import { TaskStatusEnum } from '@/enums/task-status'
import { generateUniqueIdWithTimestamp } from '@/utils/generate-unique-id-with-timestamp'

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
  readonly todoTasks = this.todoTasks$.asObservable().pipe(map(tasks => structuredClone(tasks)))

  // DOING
  private doingTasks$ = new BehaviorSubject<ITask[]>([])
  readonly doingTasks = this.doingTasks$.asObservable().pipe(map(tasks => structuredClone(tasks)))

  // DONE
  private doneTasks$ = new BehaviorSubject<ITask[]>([])
  readonly doneTasks = this.doneTasks$.asObservable().pipe(map(tasks => structuredClone(tasks)))

  addTask(taskInfos: ITaskFormControls): void {
    const newTask: ITask = {
      ...taskInfos,
      status: TaskStatusEnum.TODO,
      id: generateUniqueIdWithTimestamp(),
      commments: []
    }

    const currentList = this.todoTasks$.value

    this.todoTasks$.next([...currentList, newTask])
  }
}
