import {Component, OnInit} from '@angular/core';
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
  public page: number;
  public pageSize = 6;

  constructor(private router: Router, public quizService: QuizService) {
    if (localStorage.getItem('quizListSearch') !== null) {
      this.quizList = localStorage.getItem('quizListSearch') && JSON.parse(localStorage.getItem('quizListSearch'));
    } else {
      this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
        this.quizList = quizzes;
      });
    }
    this.page = 1;
  }

  ngOnInit() {
  }

  playQuiz(quiz: Quiz) {
    this.router.navigate(['/play-quiz/' + quiz.id]);
  }

  nextPage() {
    if  (this.page * this.pageSize < this.quizList.length) {
      this.page = this.page + 1;
      if  (this.page * this.pageSize < this.quizList.length) {
        return true;
      }
      return true;
    }
  }

  nextPageOk() {
    if  (this.page * this.pageSize < this.quizList.length) {
      return true;
    }
  }

  backPage() {
    if (this.page !== 1) {
      this.page = this.page - 1;
      return true;
    }
  }

  backPageOk() {
    if (this.page !== 1) {
      return true;
    }
  }
}
