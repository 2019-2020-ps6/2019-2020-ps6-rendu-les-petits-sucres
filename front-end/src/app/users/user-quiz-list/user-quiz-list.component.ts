import {Component, OnInit} from '@angular/core';
import {PlayedQuiz} from '../../../models/playedQuiz.model';
import {PlayedQuizService} from '../../../services/playedQuiz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Quiz} from '../../../models/quiz.model';
import {QuizService} from '../../../services/quiz.service';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-user-quiz-list',
  templateUrl: './user-quiz-list.component.html',
  styleUrls: ['./user-quiz-list.component.scss']
})
export class UserQuizListComponent implements OnInit {

  user: User;
  idUser: string;
  playedQuizzes: PlayedQuiz[];
  listQuiz: Quiz[] = [];
  listQuizId: string[] = [];
  public page: number;
  public pageSize = 10;
  public nbPageTotal: number;
  private quizCurrent: Quiz;

  constructor(private quizService: QuizService, private playedQuizService: PlayedQuizService, private router: Router,
              private activatedRoute: ActivatedRoute, public userService: UserService) {
      const userId = this.activatedRoute.snapshot.paramMap.get('userId');
      this.idUser = userId;
      this.playedQuizService.getPlayedQuizzesFromUser(userId);
      this.playedQuizService.playedQuizzesFromCurrentUser$.subscribe((playedQuizzes) => {
        this.playedQuizzes = playedQuizzes;
        for (const quiz of playedQuizzes) {
          this.quizService.setSelectedQuiz(quiz.quizId.toString());
          this.quizService.quizSelected$.subscribe(response => {
            this.quizCurrent = response;
            if (!this.listQuizId.includes(response.id)) {
              this.listQuizId.push(response.id);
              this.listQuiz.push(this.quizCurrent);
            }
          });
        }
      }
    );
      this.page = 1;
      this.userService.userSelected$.subscribe((user) => this.user = user);
      this.userService.setSelectedUser(userId);
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

  seeUserStats() {
    this.router.navigate(['/user-account/' + this.idUser]).then();
  }
}
