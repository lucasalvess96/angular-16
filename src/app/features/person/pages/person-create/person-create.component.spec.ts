import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { By } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from 'src/app/shared/shared.module';
import { PersonCreateComponent } from './person-create.component';

describe('PersonCreateComponent', () => {
  let component: PersonCreateComponent;
  let fixture: ComponentFixture<PersonCreateComponent>;
  let loader: HarnessLoader;
  let formField: MatFormFieldHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [PersonCreateComponent],
      imports: [HttpClientModule, ToastrModule.forRoot(), SharedModule],
    });
    fixture = TestBed.createComponent(PersonCreateComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    loader = TestbedHarnessEnvironment.loader(fixture);

    formField = await loader.getHarness(MatFormFieldHarness);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to load harnesses', async () => {
    const formField = await loader.getAllHarnesses(MatFormFieldHarness);
    expect(formField.length).toBe(3);
  });

  it('should be able to get control of form-field', async () => {
    expect((await formField.getControl()) instanceof MatInputHarness).toBe(true);
  });

  it('should have required validator for NAME field', () => {
    const nameControl = component.formRegister?.controls['name'];
    expect(nameControl?.hasError('required')).toBe(true);
  });

  it('should be able to set value of input for NAME field', async () => {
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    const input = inputs[0];
    expect(await input.getValue()).toBe('');
    await input.setValue('Lucas');
    expect(await input.getValue()).toBe('Lucas');
  });

  it('should be able to set and clear value of input for NAME field', async () => {
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    const input = inputs[0];
    expect(await input.getValue()).toBe('');
    await input.setValue('Lucas');
    expect(await input.getValue()).toBe('Lucas');
    await input.setValue('');
    expect(await input.getValue()).toBe('');
  });

  it('should display required error message for NAME field', async () => {
    component.formRegister?.controls['name'].setValue('');
    component.formRegister?.controls['name'].markAsTouched();
    fixture.detectChanges();
    const errorSpan = fixture.debugElement.query(By.css('mat-error')).nativeElement;
    expect(errorSpan.textContent).toContain('Campo obrigatório');
  });

  it('should display pattern error message for NAME field', async () => {
    component.formRegister?.controls['name'].setValue('123');
    component.formRegister?.controls['name'].markAsTouched();
    fixture.detectChanges();
    const errorSpan = fixture.debugElement.query(By.css('mat-error')).nativeElement;
    expect(errorSpan.textContent).toContain('O campo só permite letras');
  });

  it('should have required validator for AGE field', () => {
    const ageControl = component.formRegister?.controls['age'];
    expect(ageControl?.hasError('required')).toBe(true);
  });

  it('should be able to set value of input for AGE field', async () => {
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    const input = inputs[1];
    expect(await input.getValue()).toBe('');
    await input.setValue('23');
    expect(await input.getValue()).toBe('23');
  });

  it('should be able to set and clear value of input for AGE field', async () => {
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    const input = inputs[1];
    expect(await input.getValue()).toBe('');
    await input.setValue('23');
    expect(await input.getValue()).toBe('23');
    await input.setValue('');
    expect(await input.getValue()).toBe('');
  });

  it('should display required error message for AGE field', async () => {
    component.formRegister?.controls['age'].setValue('');
    component.formRegister?.controls['age'].markAsTouched();
    fixture.detectChanges();
    const errorSpan = fixture.debugElement.query(By.css('mat-error')).nativeElement;
    expect(errorSpan.textContent).toContain('Campo obrigatório');
  });

  it('should display pattern error message for AGE field', async () => {
    component.formRegister?.controls['age'].setValue('1');
    component.formRegister?.controls['age'].markAsTouched();
    fixture.detectChanges();
    const errorSpan = fixture.debugElement.query(By.css('mat-error')).nativeElement;
    expect(errorSpan.textContent).toContain('Informe no mínimo 2 dígitos, ');
  });

  it('should display pattern error message for AGE field', async () => {
    component.formRegister?.controls['age'].setValue('John Doe');
    component.formRegister?.controls['age'].markAsTouched();
    fixture.detectChanges();
    const errorSpan = fixture.debugElement.query(By.css('mat-error')).nativeElement;
    expect(errorSpan.textContent).toContain('O campo só permite números');
  });

  it('should have required validator for CPF field', () => {
    const cpfControl = component.formRegister?.controls['cpf'];
    expect(cpfControl?.hasError('required')).toBe(true);
  });

  it('should be able to set value of input for CPF field', async () => {
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    const input = inputs[2];
    expect(await input.getValue()).toBe('');
    await input.setValue('12121313131');
    expect(await input.getValue()).toBe('12121313131');
  });

  it('should be able to set and clear value of input for CPF field', async () => {
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    const input = inputs[2];
    expect(await input.getValue()).toBe('');
    await input.setValue('12121313131');
    expect(await input.getValue()).toBe('12121313131');
    await input.setValue('');
    expect(await input.getValue()).toBe('');
  });

  it('should display required error message for CPF field', async () => {
    component.formRegister?.controls['cpf'].setValue('');
    component.formRegister?.controls['cpf'].markAsTouched();
    fixture.detectChanges();
    const errorSpan = fixture.debugElement.query(By.css('mat-error')).nativeElement;
    expect(errorSpan.textContent).toContain('Campo obrigatório');
  });

  it('should display pattern error message for CPF field', async () => {
    component.formRegister?.controls['cpf'].setValue('121213131');
    component.formRegister?.controls['cpf'].markAsTouched();
    fixture.detectChanges();
    const errorSpan = fixture.debugElement.query(By.css('mat-error')).nativeElement;
    expect(errorSpan.textContent).toContain('Informe a quantidade de dígitos de um CPF');
  });
});
