import { CurrencyPipe, DatePipe, Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { TaskModel } from '../models/task.model';
import { TaskService } from '../service/task.service';
import { MatIconModule } from '@angular/material/icon'
import { Router } from '@angular/router';



@Component({
  selector: 'app-schedule',
  imports: [MatButtonModule, MatTableModule, CurrencyPipe, DatePipe, MatIconModule],
  templateUrl: './schedule.html',
  styleUrl: './schedule.scss',
})
export class Schedule implements OnInit {
  back = inject(Location)
  displayedColumns: string[] = ['task_name', 'value', 'date', 'name_tutor', 'action'];
  list: TaskModel[] = [];
  route = inject(Router)
  public readonly service = inject(TaskService)
  ngOnInit() {
    this.getLsitSchedule();
  }
  goBack() {
    this.back.back();
  }
  getLsitSchedule() {
    this.service.getListSchedule().subscribe((res: any) => {
      console.log(res);
      this.list = res.result

    },
      e => {
        console.log(e);
      })
  }
  edit(id: string) {
    console.log(id);
    this.route.navigate([`/dash/schedule-edit/${id}`])
  }
}
