import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonCreateComponent } from './pages/person-create/person-create.component';
import { PersonComponent } from './pages/person/person.component';

const routes: Routes = [
  {
    path: 'person-information',
    component: PersonComponent,
  },
  {
    path: 'person-information/person-create',
    component: PersonCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonRoutingModule {}
