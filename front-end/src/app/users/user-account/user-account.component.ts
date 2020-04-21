import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user.model';
import {PlayedQuiz} from '../../../models/playedQuiz.model';
import {PlayedQuizService} from '../../../services/playedQuiz.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  currentUser: User;
  playedQuizzes: PlayedQuiz[];

  averageScore: number;
  public page: number;
  public pageSize = 10;
  public nbPageTotal: number;

  constructor(private playedQuizService: PlayedQuizService, private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.router.url.includes('user-account')) {
      const idFromUrl = this.router.parseUrl(this.router.url).root.children.primary.segments[1].path;
      this.playedQuizService.getPlayedQuizzesFromUser(idFromUrl);
    } else {
      this.playedQuizService.getPlayedQuizzesFromUser(this.currentUser.id + '');
    }
    this.playedQuizService.playedQuizzesFromCurrentUser$.subscribe((playedQuizzes) => {
        this.playedQuizzes = playedQuizzes;
        this.averageScore = this.calculateAverageScore();
      }
    );
    this.page = 1;
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
    let score = 0;
    if (this.playedQuizzes.length !== 0) {
      this.playedQuizzes.forEach((playedQuiz) => (score += playedQuiz.score));
      score /= this.playedQuizzes.length;
    }
    return score;
  }
}
