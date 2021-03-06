import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';
import {AuthenticationService} from '../../../services/authentication.service';

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

  constructor(private router: Router, public quizService: QuizService, private authenticationService: AuthenticationService) {
    if (this.authenticationService.currentUserValue != null) {
      if (!this.authenticationService.currentUserValue.isAdmin) {
        this.router.navigate(['/']).then();
      }
    } else {
      this.router.navigate(['/admin/login/']).then();
    }
    if (localStorage.getItem('newQuizListEdit') !== null) {
      this.quizList = localStorage.getItem('newQuizListEdit') && JSON.parse(localStorage.getItem('newQuizListEdit'));
      this.quizLength = this.quizList.length;
      this.nbPageTotal = (this.quizLength / this.pageSize) - (( this.quizLength % this.pageSize ) / this.pageSize ) + 1;
    } else {
      this.quizService.quizzes$.subscribe((quizzes) => {
        this.quizList = quizzes;
        // this.quizList.reverse();
        this.quizLength = quizzes.length;
        this.nbPageTotal = (this.quizLength / this.pageSize) - (( this.quizLength % this.pageSize ) / this.pageSize ) + 1 ;
      });
    }
    this.page = 1;
  }

  ngOnInit() {
  }

  editQuiz(quiz: Quiz) {
    this.router.navigate(['/question-list/' + quiz.id]).then();
  }

  deleteQuiz(quiz: Quiz) {
    if (confirm('Êtes-vous sûr de vouloir supprimer le quiz \"' + quiz.name + '\" ?')) {
      if (localStorage.getItem('newQuizListEdit') !== null) {
        localStorage.setItem('newQuizListEdit', JSON.stringify(JSON.parse(localStorage.getItem('newQuizListEdit'))
          .filter((storedQuiz) => storedQuiz.id !== quiz.id)));
        this.quizList = localStorage.getItem('newQuizListEdit') && JSON.parse(localStorage.getItem('newQuizListEdit'));
      }
      this.quizService.deleteQuiz(quiz);
    }
  }

  getUrl(quiz: Quiz): string {
    return quiz.image;
  }

  nextPage() {
    if (this.page * this.pageSize < this.quizList.length) {
      this.page = this.page + 1;
      if (this.page * this.pageSize < this.quizList.length) {
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

  showPage(i: number) {
    this.page = i + 1 ;
  }

  counter(i: number) {
    return new Array(i);
  }
}
