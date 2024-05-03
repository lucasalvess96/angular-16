import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatInputHarness } from '@angular/material/input/testing';
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
});
