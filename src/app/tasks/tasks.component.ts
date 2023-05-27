import { Component, OnInit } from '@angular/core';
import { TasksService } from './tasks.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
  protected newFormGroup = new FormGroup(
    {
      newTaskInput: new FormControl(''),
    }
  );

  constructor(private tasksService: TasksService, private fb: FormBuilder) {}

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

  markAsCompleted(taskId: number) {
    this.tasks.forEach((task: Task) => {
      if (task.id === taskId) {
        task.completed = true;
      }
    });

    this.activeTasks = this.tasks.filter(
      (task: Task) => task.completed !== true
    );
    this.completedTasks = this.tasks.filter(
      (task: Task) => task.completed === true
    );
  }

  addNewTask(){
    console.log("input value:", this.newFormGroup.get("newTaskInput")?.value!);
    let task: Task = {
      title: this.newFormGroup.get("newTaskInput")?.value!,
      id: Math.floor(Math.random() * 10000000),
      userId: 1,
      completed: false
    }
    this.tasks.push(task);

    this.activeTasks = this.tasks.filter(
      (task: Task) => task.completed !== true
    );
    this.completedTasks = this.tasks.filter(
      (task: Task) => task.completed === true
    );

    this.newFormGroup?.get("newTaskInput")?.patchValue("");
  }
}
