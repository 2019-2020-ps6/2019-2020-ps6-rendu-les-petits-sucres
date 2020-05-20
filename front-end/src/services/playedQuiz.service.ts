import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {PlayedQuiz} from '../models/playedQuiz.model';
import {httpOptions, serverUrl} from '../configs/server.config';

@Injectable({
  providedIn: 'root'
})
export class PlayedQuizService {

  private playedQuizzes: PlayedQuiz[] = [];
  public playedQuizzes$: BehaviorSubject<PlayedQuiz[]> = new BehaviorSubject(this.playedQuizzes);

  private playedQuizzesFromCurrentUser: PlayedQuiz[] = [];
  public playedQuizzesFromCurrentUser$: BehaviorSubject<PlayedQuiz[]> = new BehaviorSubject(this.playedQuizzesFromCurrentUser);

  private playedQuizUrl = serverUrl + 'playedQuizzes';

  constructor(private http: HttpClient) {
    this.setPlayedQuizzesFromUrl();
  }

  setPlayedQuizzesFromUrl() {
    this.http.get<PlayedQuiz[]>(this.playedQuizUrl).subscribe((playedQuizList) => {
      this.playedQuizzes = playedQuizList;
      this.playedQuizzes$.next(this.playedQuizzes);
    });
  }

  addPlayedQuiz(playedQuiz: PlayedQuiz) {
    this.http.post<PlayedQuiz>(this.playedQuizUrl, playedQuiz, httpOptions).subscribe(() => this.setPlayedQuizzesFromUrl());
  }

  editPlayedQuizzes(quizId: string, quizName: string) {
    const newPlayedQuizName = JSON.parse('{"name":"' + quizName + '"}');
    const playedQuizzesSpecific: PlayedQuiz[] = [];
    this.http.get<PlayedQuiz[]>(this.playedQuizUrl).subscribe((playedQuizList) => {
      playedQuizList.forEach((playedQuiz) => playedQuiz.quizId === +quizId ? playedQuizzesSpecific.push(playedQuiz) : '');
      playedQuizzesSpecific.forEach((playedQuiz) =>
        this.http.put(this.playedQuizUrl + '/' + String(playedQuiz.id), newPlayedQuizName, httpOptions).subscribe(() =>
          this.setPlayedQuizzesFromUrl()));
    });
    this.setPlayedQuizzesFromUrl();
  }

  getPlayedQuizzesFromUser(userId: string) {
    const url = this.playedQuizUrl + '/user/' + userId;
    this.http.get<PlayedQuiz[]>(url).subscribe((playedQuizList) => {
      this.playedQuizzesFromCurrentUser = playedQuizList;
      this.playedQuizzesFromCurrentUser$.next(this.playedQuizzesFromCurrentUser);
    });
  }

}
