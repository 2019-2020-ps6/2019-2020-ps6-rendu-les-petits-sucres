import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user.model';
import {PlayedQuiz} from '../../../models/playedQuiz.model';
import {PlayedQuizService} from '../../../services/playedQuiz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Quiz} from '../../../models/quiz.model';
import {QuizService} from '../../../services/quiz.service';

@Component({
  selector: 'app-user-quiz-stat',
  templateUrl: './user-quiz-stat.component.html',
  styleUrls: ['./user-quiz-stat.component.scss']
})
export class UserQuizStatComponent implements OnInit {

  idUser: string;
  idQuiz: string;
  titleQuiz: string;
  playedQuizzes: PlayedQuiz[];
  listQuiz: PlayedQuiz[] = [];
  listQuizId: string[] = [];

  averageScore: string;
  public page: number;
  public pageSize = 10;
  public nbPageTotal: number;

  constructor(private quizService: QuizService, private playedQuizService: PlayedQuizService, private router: Router,
              private activatedRoute: ActivatedRoute) {
      const userId = this.activatedRoute.snapshot.paramMap.get('userId');
      this.idUser = userId;
      const quizId = this.activatedRoute.snapshot.paramMap.get('quizId');
      this.idQuiz = quizId;
      this.playedQuizService.getPlayedQuizzesFromUser(userId);
      this.playedQuizService.playedQuizzesFromCurrentUser$.subscribe((playedQuizzes) => {
        this.playedQuizzes = playedQuizzes;
        for (const quiz of playedQuizzes) {
          if (quiz.quizId.toString() === quizId && !this.listQuizId.includes(quiz.id.toString())) {
            this.listQuizId.push(quiz.id.toString());
            this.listQuiz.push(quiz);
            console.log(quiz)
          }
        }
        this.titleQuiz = this.listQuiz[0].name;
        this.averageScore = this.calculateAverageScore();
      }
    );
      this.page = 1;
  }

  ngOnInit() {
  }

  nextPage() {
    if (this.page * this.pageSize < this.listQuiz.length) {
      this.page = this.page + 1;
      if (this.page * this.pageSize < this.listQuiz.length) {
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

  private calculateAverageScore() {
    let score  = 0;
    if (this.listQuiz.length !== 0) {
      this.listQuiz.forEach((listQuiz) => (score += listQuiz.score));
      score /= this.listQuiz.length;
    }
    return score.toFixed(2);
  }

  seeUserStats() {
    this.router.navigate(['/user-quiz-list/' + this.idUser]);
  }
}
