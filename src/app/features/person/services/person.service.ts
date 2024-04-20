import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, retry } from 'rxjs';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private baseUrl: string = 'http://localhost:3000/person';

  private httpClient = inject(HttpClient);

  private toastService = inject(ToastrService);

  createPerson(data: Person): Observable<Person> {
    return this.httpClient.post<Person>(`${this.baseUrl}`, data).pipe(
      retry(2),
      catchError((error) => this.handleError(error)),
    );
  }

  listPerson(): Observable<Person[]> {
    return this.httpClient.get<Person[]>(`${this.baseUrl}`).pipe(
      retry(2),
      catchError((error) => this.handleError(error)),
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 0) {
      this.toastService.warning('falha ao se conectar com o servidor');
    } else {
      this.toastService.error('erro interno no servidor');
    }
    throw new Error('Não foi possivél se conectar ao backend');
  }
}
