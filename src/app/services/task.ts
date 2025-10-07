import { Injectable } from '@angular/core'
import { BehaviorSubject, map, tap } from 'rxjs'

import { IComment } from '@/interfaces/comment'
import { TaskStatus } from '@/interfaces/task-status'
import { ITaskFormControls } from '@/interfaces/task-form-controls'
import { TaskStatusEnum } from '@/enums/task-status'
import { generateUniqueIdWithTimestamp } from '@/utils/generate-unique-id-with-timestamp'

export interface ITask {
  id: string
  name: string
  description: string
  comments: IComment[]
  status: TaskStatus
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // TODO
  private todoTasks$ = new BehaviorSubject<ITask[]>(
    this.loadTasksFromLocalstorage(TaskStatusEnum.TODO)
  )
  readonly todoTasks = this.todoTasks$.asObservable().pipe(
    map(tasks => structuredClone(tasks)),
    tap(tasks => this.saveTasksOnLocalstorage(TaskStatusEnum.TODO, tasks))
  )

  // DOING
  private doingTasks$ = new BehaviorSubject<ITask[]>(
    this.loadTasksFromLocalstorage(TaskStatusEnum.DOING)
  )
  readonly doingTasks = this.doingTasks$.asObservable().pipe(
    map(tasks => structuredClone(tasks)),
    tap(tasks => this.saveTasksOnLocalstorage(TaskStatusEnum.DOING, tasks))
  )

  // DONE
  private doneTasks$ = new BehaviorSubject<ITask[]>(
    this.loadTasksFromLocalstorage(TaskStatusEnum.DONE)
  )
  readonly doneTasks = this.doneTasks$.asObservable().pipe(
    map(tasks => structuredClone(tasks)),
    tap(tasks => this.saveTasksOnLocalstorage(TaskStatusEnum.DONE, tasks))
  )

  addTask(taskInfos: ITaskFormControls): void {
    const newTask: ITask = {
      ...taskInfos,
      status: TaskStatusEnum.TODO,
      id: generateUniqueIdWithTimestamp(),
      comments: []
    }

    const currentList = this.todoTasks$.value

    this.todoTasks$.next([...currentList, newTask])
  }

  updateTaskNameAndDescription(task: ITask): void {
    const taskList = this.getTaskListByStatus(task.status)

    const taskIndex = taskList.value.findIndex(t => t.id === task.id)

    if (taskIndex === -1) return

    const updateTaskList = [...taskList.value]
    updateTaskList[taskIndex] = { ...task }

    taskList.next(updateTaskList)
  }

  updateTaskStatus(
    taskId: string,
    taskCurrentStatus: TaskStatus,
    taskNextStatus: TaskStatus
  ): void {
    if (taskCurrentStatus === taskNextStatus) return

    const currentTaskList = this.getTaskListByStatus(taskCurrentStatus)
    const nextTaskList = this.getTaskListByStatus(taskNextStatus)

    const taskFounded = currentTaskList.value.find(task => task.id === taskId)

    if (!taskFounded) return

    // Atualizando status
    taskFounded.status = taskNextStatus

    // Removendo da lista atual
    const currentTaskListWithoutTask = currentTaskList.value.filter(task => task.id !== taskId)

    currentTaskList.next([...currentTaskListWithoutTask])

    // Adicionando na nova lista
    nextTaskList.next([...nextTaskList.value, { ...taskFounded }])
  }

  updateTaskComments(
    taskId: string,
    taskCurrentStatus: TaskStatus,
    newTaskComments: IComment[]
  ): void {
    const taskList = this.getTaskListByStatus(taskCurrentStatus)

    const taskIndex = taskList.value.findIndex(task => task.id === taskId)

    if (taskIndex === -1) return

    const updateTaskList = [...taskList.value]
    updateTaskList[taskIndex] = { ...updateTaskList[taskIndex], comments: [...newTaskComments] }

    taskList.next(updateTaskList)
  }

  deleteTask(taskId: string, taskCurrentStatus: TaskStatus): void {
    const taskList = this.getTaskListByStatus(taskCurrentStatus)

    const newTaskList = taskList.value.filter(task => task.id !== taskId)

    taskList.next(newTaskList)
  }

  private getTaskListByStatus(taskStatus: TaskStatus): BehaviorSubject<ITask[]> {
    const taskListObj = {
      [TaskStatusEnum.TODO]: this.todoTasks$,
      [TaskStatusEnum.DOING]: this.doingTasks$,
      [TaskStatusEnum.DONE]: this.doneTasks$
    }

    return taskListObj[taskStatus]
  }

  private saveTasksOnLocalstorage(key: string, tasks: ITask[]): void {
    try {
      localStorage.setItem(key, JSON.stringify(tasks))
    } catch {
      console.log('Erro ao salvar tarefas no localstorage')
    }
  }

  private loadTasksFromLocalstorage(key: string): ITask[] {
    try {
      const storageTasks = localStorage.getItem(key)

      return (storageTasks ? JSON.parse(storageTasks) : []) as ITask[]
    } catch {
      console.log('Erro ao salvar tarefas no localstorage')
      return []
    }
  }
}
