import { Component, inject, OnInit } from '@angular/core'
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList
} from '@angular/cdk/drag-drop'

import { TaskCard } from '@components/task-card/task-card'
import { ITask, TaskService } from '@/services/task'

@Component({
  selector: 'app-task-list-section',
  imports: [TaskCard, CdkDropList, CdkDrag],
  templateUrl: './task-list-section.html',
  styleUrl: './task-list-section.css'
})
export class TaskListSection implements OnInit {
  todoTasks: ITask[] = []
  doingTasks: ITask[] = []
  doneTasks: ITask[] = []

  private readonly _taskService = inject(TaskService)

  ngOnInit(): void {
    this._taskService.todoTasks.subscribe(todos => {
      this.todoTasks = todos
    })

    this._taskService.doingTasks.subscribe(todos => {
      this.doingTasks = todos
    })

    this._taskService.doneTasks.subscribe(todos => {
      this.doneTasks = todos
    })
  }

  drop(event: CdkDragDrop<ITask[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    }
  }
}
