import { TestBed } from '@angular/core/testing';
import { CustomerService } from './customer.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomerModel } from '../models/customer.model';

xdescribe('CustomerService', () => {
  let service: CustomerService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/customers';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomerService]
    });

    service = TestBed.inject(CustomerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve buscar um cliente por ID', () => {
    const mockCustomer: CustomerModel = {
      _id: '123',
      name: 'Cliente Teste',
      phone: '999999999',
       pet: {
        name:"Alfredo",
        peso:"3kg",
        raca:"vira lata",
        idade:"7 anos",
        sexo:"macho"
      }
    };

    service.getCustomerId('123').subscribe(res => {
      expect(res).toEqual(mockCustomer);
    });

    const req = httpMock.expectOne(`${apiUrl}/123`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCustomer);
  });
  it('deve alterar a busca, resetar página para 1 e recarregar os clientes ao chamar setSearch', () => {
    const spyLoad = spyOn(service, 'loadCustomers'); // impede requisição real

    service.setSearch('João');

    expect(service.search()).toBe('João');
    expect(service.page()).toBe(1);
    expect(spyLoad).toHaveBeenCalledTimes(1);
  });

  it('deve alterar página, limite e recarregar os clientes ao chamar setPage', () => {
    const spyLoad = spyOn(service, 'loadCustomers');

    const event = { pageIndex: 2, pageSize: 25 }; // index começa em 0
    service.setPage(event);

    expect(service.page()).toBe(3); // 2 + 1
    expect(service.limit()).toBe(25);
    expect(spyLoad).toHaveBeenCalledTimes(1);

  });
  it('deve registrar um cliente com sucesso', () => {
    const mockCustomer: CustomerModel = {
      _id: '123',
      name: 'Cliente Teste',
      phone: '999999999',
      pet: {
        name:"Alfredo",
        peso:"3kg",
        raca:"vira lata",
        idade:"7 anos",
        sexo:"macho"
      }
    };

    service.registerCustomer(mockCustomer).subscribe((res: any) => {
      expect(res).toEqual({ success: true });
    });

    const req = httpMock.expectOne(`${apiUrl}/register`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCustomer);
    expect(req.request.headers.get('Authorization')).toContain('Bearer');

    req.flush({ success: true })

  })
});
