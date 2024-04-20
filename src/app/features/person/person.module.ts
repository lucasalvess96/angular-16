import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { PersonCreateComponent } from './pages/person-create/person-create.component';
import { PersonComponent } from './pages/person/person.component';
import { PersonRoutingModule } from './person-routing.module';

@NgModule({
  declarations: [PersonComponent, PersonCreateComponent],
  imports: [CommonModule, SharedModule, PersonRoutingModule, HttpClientModule],
})
export class PersonModule {}
