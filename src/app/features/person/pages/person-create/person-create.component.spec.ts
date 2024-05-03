import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from 'src/app/shared/shared.module';
import { PersonCreateComponent } from './person-create.component';

describe('PersonCreateComponent', () => {
  let component: PersonCreateComponent;
  let fixture: ComponentFixture<PersonCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonCreateComponent],
      imports: [HttpClientModule, ToastrModule.forRoot(), SharedModule],
    });
    fixture = TestBed.createComponent(PersonCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
