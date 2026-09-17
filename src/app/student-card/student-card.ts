import { Component, Input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-student-card',
  standalone: true,
  styleUrl: './student-card.css',
  templateUrl: './student-card.html',
})
export class StudentCard {
  @Input() name!: string;
  @Input() score!: number;
  @Input() showDetails!: boolean;
  @Input() favourite!: boolean;
}
