import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import {Quiz} from '../models/quiz.model';
import {Answer, Question} from '../models/question.model';
import {httpOptions, serverUrl} from '../configs/server.config';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /**
   * The list of quiz.
   * The list is retrieved from the mock.
   */
  private quizzes: Quiz[] = [];

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);

  public quizSelected$: Subject<Quiz> = new Subject();

  public questionSelected$: Subject<Question> = new Subject();

  public quizPlayed$: Subject<Quiz> = new Subject();

  private quizUrl = serverUrl + 'quizzes';
  private questionsPath = 'questions';

  constructor(private http: HttpClient) {
    this.setQuizzesFromUrl();
  }

  setQuizzesFromUrl() {
    this.http.get<Quiz[]>(this.quizUrl).subscribe((quizList) => {
      this.quizzes = quizList;
      this.quizzes$.next(this.quizzes);
    });
  }

  addQuiz(quiz: Quiz) {
    this.http.post<Quiz>(this.quizUrl, quiz, httpOptions).subscribe(() => this.setQuizzesFromUrl());
  }

  setSelectedQuiz(quizId: string) {
    const urlWithId = this.quizUrl + '/' + quizId;
    this.http.get<Quiz>(urlWithId).subscribe((quiz) => {
      this.quizSelected$.next(quiz);
    });
  }

  setSelectedQuestion(quizId: string, questionId: string) {
    const urlWithId = this.quizUrl + '/' + quizId + '/questions/' + questionId;
    this.http.get<Question>(urlWithId).subscribe((question) => {
      this.questionSelected$.next(question);
    });
  }

  deleteQuiz(quiz: Quiz) {
    const urlWithId = this.quizUrl + '/' + quiz.id;
    this.http.delete<Quiz>(urlWithId, httpOptions).subscribe(() => this.setQuizzesFromUrl());
  }

  addQuestion(quiz: Quiz, question: Question) {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath;
    this.http.post<Question>(questionUrl, question, httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  deleteQuestion(quiz: Quiz, question: Question) {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id;
    this.http.delete<Question>(questionUrl, httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  editQuestion(quizId: string, questionId: string, question: Question) {
    const questionUrl = this.quizUrl + '/' + quizId + '/' + this.questionsPath + '/' + questionId;
    this.http.put<Question>(questionUrl, question, httpOptions).subscribe(() => this.setSelectedQuestion(quizId, questionId));
    this.http.post<Question>(questionUrl, question, httpOptions).subscribe(() => this.setSelectedQuiz(quizId));
  }

  deleteAnswer(answer: Answer) {
    const answerUrl = this.quizUrl + '/' + answer.quizId + '/' + this.questionsPath + '/' + answer.questionId + '/answers/' + answer.id;
    this.http.delete<Answer>(answerUrl, httpOptions).subscribe();
  }
}
