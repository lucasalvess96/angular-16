import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatCellHarness,
  MatHeaderCellHarness,
  MatHeaderRowHarness,
  MatRowHarness,
  MatTableHarness,
} from '@angular/material/table/testing';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { PersonComponent } from './person.component';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;
  let loader: HarnessLoader;
  let table: MatTableHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [PersonComponent],
      imports: [HttpClientModule, SharedModule],
    });

    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    loader = TestbedHarnessEnvironment.loader(fixture);

    await fixture.whenStable();

    table = await loader.getHarness(MatTableHarness);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load harness for a table', async () => {
    const tables = await loader.getAllHarnesses(MatTableHarness);
    expect(tables.length).toBe(1);
  });

  it('should get the different kinds of rows in the table', async () => {
    const headerRows = await table.getHeaderRows();
    const footerRows = await table.getFooterRows();
    const rows = await table.getRows();
    expect(headerRows.length).toBe(1);
    expect(footerRows.length).toBe(0);
    expect(rows.length).toBe(5);
  });

  it('should get cells inside a row', async () => {
    const headerRows = await table.getHeaderRows();
    const rows = await table.getRows();

    const headerCells = (await parallel(() => headerRows.map((row: MatHeaderRowHarness) => row.getCells()))).map(
      (row: MatHeaderCellHarness[]) => row.length,
    );

    const cells = (await parallel(() => rows.map((row: MatRowHarness) => row.getCells()))).map(
      (row: MatCellHarness[]) => row.length,
    );

    expect(headerCells).toEqual([3]);
    expect(cells).toEqual([3, 3, 3, 3, 3]);
  });

  it('should be able to get the text of a cell', async () => {
    const secondRow = (await table.getRows())[1];
    const cells = await secondRow.getCells();
    const cellTexts = await parallel(() => cells.map((cell: MatCellHarness) => cell.getText()));
    expect(cellTexts).toEqual(['lucas', '23', '12121313131']);
  });

  it('should be able to get the column name of a cell', async () => {
    const fifthRow = (await table.getRows())[1];
    const cells = await fifthRow.getCells();
    const cellColumnNames = await parallel(() => cells.map((cell: MatCellHarness) => cell.getColumnName()));
    expect(cellColumnNames).toEqual(['name', 'age', 'cpf']);
  });

  it('should be able to filter cells by text', async () => {
    const firstRow = (await table.getRows())[0];
    const cells = await firstRow.getCells({ text: 'typicode' });
    const cellTexts = await parallel(() => cells.map((cell: MatCellHarness) => cell.getText()));
    expect(cellTexts).toEqual(['typicode']);
  });

  it('should be able to filter cells by column name', async () => {
    const firstRow = (await table.getRows())[1];
    const cells = await firstRow.getCells({ columnName: 'name' });
    const cellTexts = await parallel(() => cells.map((cell) => cell.getText()));
    expect(cellTexts).toEqual(['lucas']);
  });
});
