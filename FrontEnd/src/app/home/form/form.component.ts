import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TableService } from 'src/app/shared/services/table.service';
import { Employee } from 'src/app/shared/models/employee.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public Editor = ClassicEditor;
  editorUpdatedValue: any;
  userForm: FormGroup;
  formValue: any;
  errors: any;
  clock: Date;
  constructor(
    private formBuilder: FormBuilder,
    public service: TableService
  ) {
    setInterval(() => {         //replaced function() by ()=>
      this.clock = new Date();
    }, 1000);
   }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      yearsWorked: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  onSubmit() {
    this.formValue = this.userForm.getRawValue();
    this.service.addEmployee(this.formValue as Employee).subscribe(
      res=>{this.userForm.reset()},
      err=>{this.errors=err.message;}
    );
  }
}
