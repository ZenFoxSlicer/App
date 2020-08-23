import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Employee } from '../../shared/models/employee.model';
import { TableService } from '../../shared/services/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['select', 'position', 'name', 'yearsWorked', 'age'];
  dataSource: MatTableDataSource<Employee>;
  selection = new SelectionModel<Employee>(true, []);
  selectedRows: Array<Employee> = [];

  constructor(
    private tableService: TableService
  ) { }

  ngOnInit() {
    this.tableService.getData().subscribe(
      res => {
        this.dataSource = new MatTableDataSource<Employee>(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
      ,
      error => console.log(error)
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));

  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Employee): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  masterChanged(event: any) {
    event ? this.masterToggle() : null;
    this.updateSelected();
  }

  selectionChanged(event: any, row: Employee) {
    event ? this.selection.toggle(row) : null;
    this.updateSelected();
  }

  updateSelected() {
    this.selectedRows = this.selection.selected;
  }

  showSelections(event: any) {
    console.log(event);
  }
}
