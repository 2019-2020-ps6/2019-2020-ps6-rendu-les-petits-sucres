import {Component, OnInit} from '@angular/core';
import {PlayedQuiz} from '../../../models/playedQuiz.model';
import {PlayedQuizService} from '../../../services/playedQuiz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user.service';
import {Quiz} from '../../../models/quiz.model';

@Component({
  selector: 'app-user-quiz-stat',
  templateUrl: './user-quiz-stat.component.html',
  styleUrls: ['./user-quiz-stat.component.scss']
})
export class UserQuizStatComponent implements OnInit {

  quizSelected: Quiz;
  user: User;
  idUser: string;
  idQuiz: string;
  playedQuizzes: PlayedQuiz[];
  listQuiz: PlayedQuiz[] = [];
  listQuizId: string[] = [];

  averageScore: number;
  public page: number;
  public pageSize = 10;
  public nbPageTotal: number;

  constructor(private quizService: QuizService, private playedQuizService: PlayedQuizService, private router: Router,
              private activatedRoute: ActivatedRoute, public userService: UserService) {
      this.quizService.quizSelected$.subscribe((quiz) => this.quizSelected = quiz);
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
          }
        }
        this.averageScore = this.calculateAverageScore();
      }
      );
      this.page = 1;
      this.userService.userSelected$.subscribe((user) => this.user = user);
      this.userService.setSelectedUser(userId);
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('quizId');
    this.quizService.setSelectedQuiz(id);
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
    return score;
  }

  seeUserStats() {
    this.router.navigate(['/user-quiz-list/' + this.idUser]).then();
  }

}
