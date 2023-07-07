import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DataServiceService } from 'service/data-service.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formbuilder: FormBuilder,
    public dataService: DataServiceService,
    private toastr: ToastrService
  ) {
    if (data) {
      this.setFormsData(data);
    }
  }

  public taskForm = this.formbuilder.group({
    dueDate: ['', Validators.required],
    description: ['', Validators.required],
    priority: ['', Validators.required],
  });

  priorityList: any = [
    { value: 'High' },
    { value: 'Medium' },
    { value: 'Low' },
  ];

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  setFormsData(data: any) {
    this.taskForm.get('dueDate')?.setValue(data.values.dueDate);
    this.taskForm.get('description')?.setValue(data.values.description);
    this.taskForm.get('priority')?.setValue(data.values.priority);
  }

  createTask(): void {
    if (this.taskForm.valid) {
      this.dataService.createTask(this.taskForm.value).subscribe((res) => {
        if (res) {
          this.toastr.success('Task has been created', 'Done');
          this.dialogRef.close({ event: 'updated' });
        }
      });
    } else {
      this.toastr.error('Your data is Incorrect', 'Incorrect Data');
    }
  }

  UpdateTask(): void {
    if (this.taskForm.valid) {
      this.dataService
        .updateTasks(this.taskForm.value, this.data.id)
        .subscribe((res) => {
          if (res) {
            this.toastr.success('Task has been updated', 'Done');
            this.dialogRef.close({ event: 'updated' });
          }
        });
    } else {
      this.toastr.error('Your data is Incorrect', 'Incorrect Data');
    }
  }
}
