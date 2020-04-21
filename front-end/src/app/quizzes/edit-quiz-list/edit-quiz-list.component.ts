import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './edit-quiz-list.component.html',
  styleUrls: ['./edit-quiz-list.component.scss']
})

export class EditQuizListComponent implements OnInit {

  public quizList: Quiz[] = [];
  public page: number;
  public pageSize = 10;
  public nbPageTotal: number;
  public quizLength: number;

  constructor(private router: Router, public quizService: QuizService) {
    if (localStorage.getItem('quizListSearch') !== null) {
      this.quizList = localStorage.getItem('quizListSearch') && JSON.parse(localStorage.getItem('quizListSearch'));
      this.quizLength = this.quizList.length;
      this.nbPageTotal = (this.quizLength / this.pageSize) - (( this.quizLength % this.pageSize ) / this.pageSize ) + 1;
    } else {
      this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
        this.quizList = quizzes;
        this.quizLength = quizzes.length;
        this.nbPageTotal = (this.quizLength / this.pageSize) - (( this.quizLength % this.pageSize ) / this.pageSize ) + 1 ;
      });
    }
    this.page = 1;
  }

  ngOnInit() {
  }

  editQuiz(quiz: Quiz) {
    this.router.navigate(['/edit-quiz/' + quiz.id]);
  }

  deleteQuiz(quiz: Quiz) {
    this.quizService.deleteQuiz(quiz);
  }

  getUrl(quiz: Quiz): string {
    return quiz.image;
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

  backPage() {
    if (this.page !== 1) {
      this.page = this.page - 1;
      return true;
    }
  }

  afficherPage(i: number) {
    this.page = i + 1 ;
  }

  counter(i: number) {
    return new Array(i);
  }
}
