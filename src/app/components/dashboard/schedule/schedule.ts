import { CurrencyPipe, DatePipe, Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { TaskModel } from '../models/task.model';
import { TaskService } from '../service/task.service';
import { MatIconModule } from '@angular/material/icon'
import { Router } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-schedule',
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule, MatTableModule, CurrencyPipe, DatePipe, MatIconModule, MatPaginatorModule],
  templateUrl: './schedule.html',
  styleUrl: './schedule.scss',
})
export class Schedule implements OnInit {
  back = inject(Location)
  displayedColumns: string[] = ['task_name', 'value', 'date', 'name_tutor', 'action'];
  list: TaskModel[] = [];
  route = inject(Router)
  public readonly service = inject(TaskService)
  page = 1;
  limit = 10;
  totalResults = 0;
  search = "";
  ngOnInit() {
    this.getListSchedule();
  }
  goBack() {
    this.back.back();
  }
  getListSchedule() {
    this.service.getListSchedule(this.page, this.limit, this.search).subscribe((res: any) => {
      console.log(res);
      this.totalResults = res.totalResults;
      this.page = res.page;
      this.list = res.result

    },
      e => {
        console.log(e);
      })
  }
  onPageChange(event: any) {
    this.page = event.pageIndex + 1; // Angular pageIndex começa em 0
    this.limit = event.pageSize;
    this.getListSchedule();
  }
  searching(event: any) {
    this.search = event.target.value;
    this.getListSchedule(); // chama o método que busca a lista no backend
  }
  edit(id: string) {
    console.log(id);
    this.route.navigate([`/dash/schedule-edit/${id}`])
  }
}
