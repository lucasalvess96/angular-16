import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Person } from '../../models/person';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.scss'],
})
export class PersonCreateComponent implements OnInit {
  formRegister?: FormGroup;

  private formBuilder: FormBuilder = inject(FormBuilder);

  private router = inject(Router);

  private toastService = inject(ToastrService);

  private personService = inject(PersonService);

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.formRegister = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^([A-Za-zÀ-ú]+[A-Za-zÀ-ú ])*$')]],
      age: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2), Validators.pattern('\\d+')]],
      cpf: [
        '',
        [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^[0-9]+$')],
      ],
    });
  }

  onSubmit(): void {
    if (this.formRegister) {
      this.personService.createPerson(this.formRegister.value).subscribe({
        next: (response: Person) => {
          console.log(response);
          this.toastService.success('Pessoa cadastrada com sucesso');
          this.formRegister?.reset();
          this.formRegister?.markAsUntouched();
          this.formRegister?.markAsPristine();
          this.router.navigate(['/person-information']);
        },
        error: (erro) => console.log(erro),
      });
    }
  }
}
