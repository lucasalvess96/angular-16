import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableHarness } from '@angular/material/table/testing';

import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from 'src/app/shared/shared.module';
import { PersonComponent } from './person.component';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;
  let loader: HarnessLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonComponent],
      imports: [HttpClientModule, ToastrModule.forRoot(), SharedModule],
    });
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load harness for a table', async () => {
    await fixture.whenStable();

    const tables = await loader.getAllHarnesses(MatTableHarness);
    expect(tables.length).toBe(1);
  });
});
