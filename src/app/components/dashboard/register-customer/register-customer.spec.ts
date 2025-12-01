import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { RegisterCustomer } from './register-customer';
import { CustomerService } from '../service/customer.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('RegisterCustomer', () => {
  let component: RegisterCustomer;
  let fixture: ComponentFixture<RegisterCustomer>;
  let serviceSpy: jasmine.SpyObj<CustomerService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const serviceMock = jasmine.createSpyObj('CustomerService', ['registerCustomer']);
    const snackMock = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,RegisterCustomer],
      providers: [
        { provide: CustomerService, useValue: serviceMock },
        { provide: MatSnackBar, useValue: snackMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterCustomer);
    component = fixture.componentInstance;

    serviceSpy = TestBed.inject(CustomerService) as jasmine.SpyObj<CustomerService>;
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;

    component.form?.setValue({
      name: 'Henrique',
      phone: '999999999',
      pet_name: "gargalo",
      peso: "4kg",
      raca: "vira lata",
      idade: "8 anos",
      sexo: "Macho"
      ,
    });

    serviceSpy.registerCustomer.and.returnValue(of({ success: true }));
    snackBarSpy.open.and.returnValue({
      onAction: () => of(null),
      dismiss: () => { }
    } as any);

    spyOn(component, 'goBack'); // evitar navegação real
  });

  it('deve registrar o cliente e mostrar snackbar ao salvar', () => {
    component.save();

    expect(serviceSpy.registerCustomer).toHaveBeenCalledWith(component.form.value);
    expect(snackBarSpy.open).toHaveBeenCalled();
    expect(component.form.value.name).toBeNull(); // foi resetado
    expect(component.goBack).toHaveBeenCalled();
  });
});
