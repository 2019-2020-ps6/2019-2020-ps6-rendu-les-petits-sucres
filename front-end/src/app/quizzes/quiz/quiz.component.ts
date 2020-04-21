import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  public pageEditQuiz: boolean;

  @Input()
  quiz: Quiz;

  @Output()
  quizEdited: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  @Output()
  quizDeleted: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  @Output()
  quizPlayed: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  constructor(private router: Router) {
    this.pageEditQuiz = this.router.url.endsWith('edit-quiz');
  }

  ngOnInit() {
  }

  editQuiz() {
    this.quizEdited.emit(this.quiz);
  }

  deleteQuiz() {
    this.quizDeleted.emit(this.quiz);
  }

  playQuiz() {
    this.quizPlayed.emit(this.quiz);
  }

  getUrl(): string {
    return this.quiz.image;
  }
}
