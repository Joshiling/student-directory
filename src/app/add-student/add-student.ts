import { Component, output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentList } from '../student-list/student-list';

export interface INewStudent {
  name:string,
  score:number
}

@Component({
  imports: [FormsModule, ReactiveFormsModule],
  selector: 'app-add-student',
  styleUrl: './add-student.css',
  templateUrl: './add-student.html',
})
export class AddStudent {



  studentName:string = "";
  studentScore:number | null =null;
  studentAdded = output<INewStudent>();


  addStudentForm = new FormGroup({
    name:new FormControl("", [Validators.required, Validators.minLength(2)]),
    score: new FormControl("", [Validators.required])
  });

  onSubmit(){
    console.log(`Name: ${this.addStudentForm.value.name} | Score: ${this.addStudentForm.value.score}`)
    console.log(this.addStudentForm);
    let name =this.addStudentForm.value.name;
    let score = Number(this.addStudentForm.value.score);
    if (name == null || score == null){
      return;
    }

    this.studentAdded.emit({name,score})
    console.log(`Name: ${this.studentName} | Score: ${this.studentScore}`)

    this.studentName = "";
    this.studentScore = null;
  }
}
