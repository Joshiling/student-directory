import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../student';

@Component({
  selector: 'app-student-detail',
  standalone: true,
  templateUrl: './student-detail.html',
  styleUrl: './student-detail.css',
})
export class StudentDetail {
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  private studentService = inject(Student);

  student: { id: number; name: string; score: number } | undefined;
  loading = true;
  errorMessage = '';

  /**
   * Used to initialise the component
   */
  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.studentService.getStudentById(id).subscribe({
      next: (data) => {
        this.student = data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.errorMessage = 'Could not load that student.';
        this.loading = false;
        console.error(err);
        this.cdr.markForCheck();
      },
    });
  }
}