import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { Student } from '../student';
import { StudentCard } from '../student-card/student-card';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { AddStudent } from '../add-student/add-student';

@Component({
  imports: [StudentCard,FormsModule,RouterModule, AddStudent],
  selector: 'app-student-list',
  styleUrl: './student-list.css',
  templateUrl: './student-list.html',
})
export class StudentList {
    /*
  constructor(private studentService: Student) {
    this.students = this.studentService.getStudents();
  }
  */
  private cdr = inject(ChangeDetectorRef);
  private student = inject(Student);
  private students:any[] = [];
  errorMessage = "";
  
  protected readonly title = signal('student-directory');
  detailsOn = false;
  searchTerm = "";
  loading: boolean;
  favourite = false;

  constructor(){
    this.loading = true;
    this.student.getStudents().subscribe({
      next: (data: any[]) => { this.students = data.map((item)=>({...item,favourite:false})); this.loading = false; this.cdr.markForCheck();},
      error: (err: any) => { this.errorMessage = `Could not load students: ${err}`; this.loading = false; this.cdr.markForCheck();},
    });
  }
  
toggleFavourites() {
  this.favourite= !this.favourite;
}
  
  get filteredStudents(){
    
    let temp = this.students.filter(student => student.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
    if (this.favourite){
      return temp.filter(student => student.favourite);
    }
    return temp;
  }
  get getStudents(){
    return this.students;
  }

  get favouriteStudents(){
    return this.students.filter(student => student.favourite);
  }

  favouriteStudent(id:number){
    let student = this.students.find(student => student.id===id);
    if (student){
      console.log(student.favourite);
      student.favourite=!student.favourite;
    }
  }
  addStudent(name:string, score:number){
    console.log("adding guy");
    let id = -1;
    if (this.students.length == 0){
      id = 1
    } else {
      id = Math.max(...this.students.map(student => student.id)) + 1;
    }
    this.students.push(
        {
          id:id,
          name:name,
          score:score,
          favourite:false
        }
      )
  }
    toggleDetails() {
      this.detailsOn = !this.detailsOn;
    }
}
