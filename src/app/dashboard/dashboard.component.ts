import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'service/data-service.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  taskList: any = [];
  tasks: any = [];
  allTasks: any = [];
  length: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  pageSizeOptions: any = [5, 10, 25];
  previousPage: number = 0;
  searchValue: string = '';

  constructor(
    public dataService: DataServiceService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllTasksData();
    this.getData({
      length: this.length,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      previousPageIndex: this.previousPage,
    });
  }

  applyFilter(filterValue: string) {
    let filterValueLower = filterValue.toLowerCase();
    if (filterValue === '') {
      this.taskList = this.tasks;
    } else {
      this.taskList = this.tasks.filter(
        (task: any) =>
          task.description.toLowerCase().includes(filterValueLower) ||
          task.priority.toLowerCase().includes(filterValueLower)
      );
    }
  }

  getData(event: any): void {
    this.dataService
      .getTasks(event.pageIndex + 1, event.pageSize)
      .subscribe((res) => {
        if (res) {
          this.taskList = res;
          this.tasks = res;
          if (this.searchValue) this.applyFilter(this.searchValue);
        }
      });
  }

  getAllTasksData(): void {
    this.dataService.getAllTasks().subscribe((res) => {
      if (res) {
        this.allTasks = res;
        this.length = this.allTasks.length;
      }
    });
  }

  addTask(): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '40%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.event == 'updated') {
        this.ngOnInit();
      }
    });
  }

  editTask(data: any): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '40%',
      data: { values: data, id: data.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.event == 'updated') {
        this.ngOnInit();
      }
    });
  }

  deleteTask(index: number): void {
    this.dataService.deleteTask(index).subscribe((res: any) => {
      if (res) {
        this.toastr.success('Task has been Deleted', 'Done');
        this.ngOnInit();
      }
    });
  }
}
