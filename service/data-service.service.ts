import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  rootUrl = 'http://localhost:3001/';

  constructor(private http: HttpClient) {}

  createUser(payload: any) {
    return this.http.post(this.rootUrl + 'Users/', payload);
  }

  getUser() {
    return this.http.get(this.rootUrl + 'Users/');
  }

  createTask(payload: any) {
    return this.http.post(this.rootUrl + 'Tasks/', payload);
  }

  getTasks(page: number, limit: number) {
    return this.http.get(this.rootUrl + `Tasks?_page=${page}&_limit=${limit}`);
  }

  getAllTasks() {
    return this.http.get(this.rootUrl + `Tasks/`);
  }

  updateTasks(payload: any, id: any) {
    return this.http.put(this.rootUrl + 'Tasks/' + id, payload);
  }

  deleteTask(index: any) {
    return this.http.delete(this.rootUrl + `Tasks/${index}`);
  }
}
