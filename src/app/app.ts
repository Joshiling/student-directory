import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { StudentCard } from './student-card/student-card';
import { FormsModule } from '@angular/forms';
import { Student } from './student';

@Component({
  imports: [RouterOutlet, Header, StudentCard, FormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})


export class App {}
