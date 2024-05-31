import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { PersonCreateComponent } from './pages/person-create/person-create.component';
import { PersonComponent } from './pages/person/person.component';
import { PersonRoutingModule } from './person-routing.module';
import { PersonPendenciesComponent } from './pages/person-pendencies/person-pendencies.component';

@NgModule({
  declarations: [PersonComponent, PersonCreateComponent, PersonPendenciesComponent],
  imports: [CommonModule, SharedModule, PersonRoutingModule, HttpClientModule, FlexLayoutModule],
})
export class PersonModule {}
