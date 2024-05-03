import { TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from 'src/app/shared/shared.module';
import { PersonService } from './person.service';

describe('PersonService', () => {
  let service: PersonService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule, ToastrModule.forRoot(), SharedModule] });
    service = TestBed.inject(PersonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
