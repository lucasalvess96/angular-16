import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonPendenciesComponent } from './person-pendencies.component';

describe('PersonPendenciesComponent', () => {
  let component: PersonPendenciesComponent;
  let fixture: ComponentFixture<PersonPendenciesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonPendenciesComponent]
    });
    fixture = TestBed.createComponent(PersonPendenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
