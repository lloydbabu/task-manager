import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './tasks.component';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<Task[]>('https://jsonplaceholder.typicode.com/todos');
  }
}
