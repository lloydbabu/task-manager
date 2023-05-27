import { Component, OnInit } from '@angular/core';
import { TasksService } from './tasks.service';

export interface Task {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  protected tasks: Task[] = [];
  protected completedTasks: Task[] = [];
  protected activeTasks: Task[] = [];
  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.getTasksList();
  }

  getTasksList() {
    this.tasksService.getTasks().subscribe((response: Task[]) => {
      this.tasks = [...response];
      this.activeTasks = response.filter(
        (task: Task) => task.completed !== true
      );
      this.completedTasks = response.filter(
        (task: Task) => task.completed === true
      );
      console.log('tasks:', this.tasks);
    });
  }
}
