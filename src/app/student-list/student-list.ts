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

  /**
   * Used to initialise the component, fetches student data from the student service and sets up the component state
   */
  constructor(){
    this.loading = true;
    this.student.getStudents().subscribe({
      next: (data: any[]) => { this.students = data; this.loading = false; this.cdr.markForCheck();},
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

    this.loading = true;
    this.student.toggleFavourite(id).subscribe({
      next: () => {
        this.student.getStudents().subscribe({
          next: (data) => { this.students = data;this.loading = false; this.cdr.markForCheck();},
          error: (err: any) => { this.errorMessage = `Could not load students: ${err}`; this.loading = false; this.cdr.markForCheck();},
        });
      }
    });
    console.log(this.students);
  }
  addStudent(name:string, score:number){
    this.loading = true;
    this.student.addStudent(name, score).subscribe({
      next: () => {
        this.student.getStudents().subscribe({
          next: (data) => { this.students = data;this.loading = false; this.cdr.markForCheck();},
          error: (err: any) => { this.errorMessage = `Could not load students: ${err}`; this.loading = false; this.cdr.markForCheck();},
        });
      }
    });
  }
  
  toggleDetails() {
      this.detailsOn = !this.detailsOn;
    }
}
