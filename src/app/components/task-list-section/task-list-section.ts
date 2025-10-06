import { Component, inject } from '@angular/core'
import { AsyncPipe } from '@angular/common'
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList
} from '@angular/cdk/drag-drop'

import { TaskCard } from '@components/task-card/task-card'
import { ITask, TaskService } from '@/services/task'
import { TaskStatus } from '@/interfaces/task-status'
import { TaskStatusEnum } from '@/enums/task-status'

@Component({
  selector: 'app-task-list-section',
  imports: [TaskCard, CdkDropList, CdkDrag, AsyncPipe],
  templateUrl: './task-list-section.html',
  styleUrl: './task-list-section.css'
})
export class TaskListSection {
  readonly _taskService = inject(TaskService)

  onCardDrop(event: CdkDragDrop<ITask[]>): void {
    this.moveCardToColumn(event)

    const taskId = event.item.data.id
    const taskCurrentStatus = event.item.data.status
    const droppedColumnId = event.container.id as TaskStatus

    this.updateTaskStatus(taskId, taskCurrentStatus, droppedColumnId)
  }

  private updateTaskStatus(
    taskId: string,
    currentStatus: TaskStatus,
    droppedColumnId: string
  ): void {
    let taskNextStatus: TaskStatus

    switch (droppedColumnId) {
      case 'todo-column':
        taskNextStatus = TaskStatusEnum.TODO
        break
      case 'doing-column':
        taskNextStatus = TaskStatusEnum.DOING
        break
      case 'done-column':
        taskNextStatus = TaskStatusEnum.DONE
        break
      default:
        throw new Error('Invalid column ID')
    }

    this._taskService.updateTaskStatus(taskId, currentStatus, taskNextStatus)
  }

  private moveCardToColumn(event: CdkDragDrop<ITask[]>): void {
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
