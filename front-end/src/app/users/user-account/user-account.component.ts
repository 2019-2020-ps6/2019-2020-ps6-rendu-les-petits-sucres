import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user.model';
import {PlayedQuiz} from '../../../models/playedQuiz.model';
import {PlayedQuizService} from '../../../services/playedQuiz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  user: User;
  currentUser: User;
  idUser: string;
  playedQuizzes: PlayedQuiz[];

  averageScore: number;
  public page: number;
  public pageSize = 10;
  public nbPageTotal: number;

  constructor(private playedQuizService: PlayedQuizService, private router: Router,
              private activatedRoute: ActivatedRoute, public userService: UserService) {
      const userId = this.activatedRoute.snapshot.paramMap.get('userId');
      this.idUser = userId;
      this.playedQuizService.getPlayedQuizzesFromUser(userId);
      this.playedQuizService.playedQuizzesFromCurrentUser$.subscribe((playedQuizzes) => {
        this.playedQuizzes = playedQuizzes;
        this.averageScore = this.calculateAverageScore();
      }
    );
      this.page = 1;
      this.userService.userSelected$.subscribe((user) => this.user = user);
      this.userService.setSelectedUser(userId);
  }

  ngOnInit() {
  }

  nextPage() {
    if (this.page * this.pageSize < this.playedQuizzes.length) {
      this.page = this.page + 1;
      if (this.page * this.pageSize < this.playedQuizzes.length) {
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
    if (this.playedQuizzes.length !== 0) {
      this.playedQuizzes.forEach((playedQuiz) => (score += playedQuiz.score));
      score /= this.playedQuizzes.length;
    }
    return score;
  }

  seeUserStats() {
    this.router.navigate(['/user-quiz-list/' + this.idUser]).then();
  }

}
