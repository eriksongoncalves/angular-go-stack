import { Component, inject, OnInit } from '@angular/core'

import { TaskCard } from '@components/task-card/task-card'
import { TaskService } from '@/services/task'

@Component({
  selector: 'app-task-list-section',
  imports: [TaskCard],
  templateUrl: './task-list-section.html',
  styleUrl: './task-list-section.css'
})
export class TaskListSection implements OnInit {
  private readonly _taskService = inject(TaskService)

  ngOnInit(): void {
    this._taskService.todoTasks.subscribe(todos => {
      console.log('>>> Lista de todos', todos)
    })
  }
}
