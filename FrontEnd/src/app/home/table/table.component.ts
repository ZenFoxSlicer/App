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

  displayedColumns: string[] = ['position', 'name', 'yearsWorked', 'age', 'actions'];
  dataSource: MatTableDataSource<Employee>;
  selection = new SelectionModel<Employee>(true, []);
  selectedRows: Array<Employee> = [];
  errors: any;

  constructor(
    private tableService: TableService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.tableService.getData().subscribe(
      res => {
        this.dataSource = new MatTableDataSource<Employee>(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error => console.log(error)
    );
  }

  delete(name: string) {
    this.tableService.deleteEmployee(name).subscribe(
      res => { this.getData() },
      err => { this.errors = err.message }
    );
  }
}
