import { Component } from '@angular/core';

interface Empresa {
  nome: string;
  endereco: string;
  telefone: string;
  email: string;
}

@Component({
  selector: 'app-person-pendencies',
  templateUrl: './person-pendencies.component.html',
  styleUrls: ['./person-pendencies.component.scss'],
})
export class PersonPendenciesComponent {
  mostrarDetalhes: boolean = false;
}
