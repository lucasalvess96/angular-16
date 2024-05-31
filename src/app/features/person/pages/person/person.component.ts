import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, tap } from 'rxjs';
import { Person } from '../../models/person';
import { PersonService } from './../../services/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit {
  displayedColumns: string[] = ['name', 'age', 'cpf', 'acoes'];

  dataSource!: MatTableDataSource<Person>;

  dataSource$!: Observable<Person[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  color: ThemePalette = 'primary';

  mode: ProgressSpinnerMode = 'indeterminate';

  value: number = 50;

  loading: boolean = false;

  private personService = inject(PersonService);

  ngOnInit(): void {
    this.list();
  }

  list(): void {
    this.loading = true;
    this.dataSource$ = this.personService.listPerson().pipe(
      tap((response: Person[]) => {
        this.loading = false;
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }),
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
