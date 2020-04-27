import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';

@Component({
  selector: 'app-quiz-start',
  templateUrl: './quiz-start.component.html',
  styleUrls: ['./quiz-start.component.scss']
})
export class QuizStartComponent implements OnInit {

  @Input()
  quiz: Quiz;

  @Output()
  quizEdited: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  @Output()
  quizPlayed: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  public displayTimer = 10;
  public timer: any;

  constructor(private quizService: QuizService, private activatedRoute: ActivatedRoute, private router: Router) {
      if (localStorage.getItem('currentQuiz') === this.activatedRoute.snapshot.paramMap.get('quizId')) {
        this.router.navigate(['/play-quiz/' + this.activatedRoute.snapshot.paramMap.get('quizId')]);
    } else {
        localStorage.setItem('currentQuiz', this.activatedRoute.snapshot.paramMap.get('quizId'))
        this.quizService.setSelectedQuiz(this.activatedRoute.snapshot.paramMap.get('quizId'));
        this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
        this.setTimerWithTime(10000);
        this.timer = setTimeout(() => {
        this.playQuiz();
      }, 10000);
    }
  }

  ngOnInit() {
  }

  playQuiz() {
    localStorage.setItem('score', '20');
    clearTimeout(this.timer);
    this.router.navigate(['/play-quiz/' + this.quiz.id]);
  }

  getUrl(): string {
    return this.quiz.image;
  }

  private setTimerWithTime(time) {
    if (time !== 1) {
      setTimeout(() => {
        this.displayTimer --;
        this.setTimerWithTime(time - 1);
      }, 1000);
    }
  }

  backListQuiz() {
    localStorage.removeItem('currentQuiz');
    clearTimeout(this.timer);
    this.router.navigate(['/list-quiz/']);
  }
}
