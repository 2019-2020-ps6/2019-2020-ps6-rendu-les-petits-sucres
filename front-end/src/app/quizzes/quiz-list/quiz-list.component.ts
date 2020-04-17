import {Component, NgModule, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})


export class QuizListComponent implements OnInit {

  public quizList: Quiz[] = [];
  public page = 1;
  public pageSize = 6;

  constructor(private router: Router, public quizService: QuizService) {
    // window.localStorage.clear();
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });
  }

  ngOnInit() {
  }

  editQuiz(quiz: Quiz) {
    this.router.navigate(['/edit-quiz/' + quiz.id]);
  }

  deleteQuiz(quiz: Quiz) {
    this.quizService.deleteQuiz(quiz);
  }

  playQuiz(quiz: Quiz) {
    this.router.navigate(['/play-quiz/' + quiz.id]);
  }

  nextPage() {
    if  (this.quizList.length / this.pageSize >= this.page) {
      this.page = this.page + 1;
    }
  }

  backPage() {
    if (this.page !== 1) {
      this.page = this.page - 1;
    }
  }
}
