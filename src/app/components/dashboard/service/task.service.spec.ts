import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskModel } from '../models/task.model'

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/task';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskService],
      imports: [HttpClientTestingModule],

    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve buscar uma task por id', () => {
    const MockTask: TaskModel[] = [{
      _id: "123",
      task_name: "Henrique",
      value: 15,
      date: new Date('2025-11-11'),
      id_user: "123"
    }];
    service.getScheduleById('123').subscribe(res => {
      expect(res).toEqual(MockTask);
    });
    const req = httpMock.expectOne(`${apiUrl}/123`);
    expect(req.request.method).toBe('GET');
    req.flush(MockTask);
  })

  it('deve buscar uma task por id do cliente', () => {
    const MockTask: TaskModel[] = [{
      _id: "123",
      task_name: "Henrique",
      value: 15,
      date: new Date('2025-11-11'),
      id_user: "123"
    }];
    service.getScheduleById('123').subscribe(res => {
      expect(res).toEqual(MockTask);
    });
    const req = httpMock.expectOne(`${apiUrl}byCustomer//123`);
    expect(req.request.method).toBe('GET');
    req.flush(MockTask);
  })

  it('deve registrar uma task com sucesso', () => {
    const MockTask: TaskModel = {
      _id: "123",
      task_name: "Henrique",
      value: 15,
      date: new Date('2025-11-11'),
      id_user: "123"
    }
    service.registerTask(MockTask).subscribe((res: any) => {
      expect(res).toEqual({ success: true })

      req.flush({ success: true })
    })
    const req = httpMock.expectOne(`${apiUrl}/register`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(MockTask);
    expect(req.request.headers.get('Authorization')).toContain('Bearer');
  })

  it('deve trazer todas as tasks', () => {
    const page = 1;
    const limit = 10;
    const search = "";

    const MockTask: TaskModel[] = [{
      _id: "123",
      task_name: "Henrique",
      value: 15,
      date: new Date('2025-11-11'),
      id_user: "123"
    }];

    service.getListSchedule(page, limit, search).subscribe(res => {
      expect(res).toEqual(MockTask);
    });

    const req = httpMock.expectOne(`${apiUrl}?page=${page}&limit=${limit}&search=${search}`);

    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toContain('Bearer');

    req.flush(MockTask);
  });


});
