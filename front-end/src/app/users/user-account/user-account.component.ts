import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user.model';
import {PlayedQuiz} from '../../../models/playedQuiz.model';
import {PlayedQuizService} from '../../../services/playedQuiz.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  user: User;
  playedQuizzes: PlayedQuiz[];

  constructor(private playedQuizService: PlayedQuizService) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.playedQuizService.getPlayedQuizzesFromUser(this.user.id + '');
    this.playedQuizService.playedQuizzesFromCurrentUser$.subscribe((playedQuizzes) => this.playedQuizzes = playedQuizzes);
  }

  ngOnInit() {
  }

}
