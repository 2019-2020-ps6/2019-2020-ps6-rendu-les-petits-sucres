import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import {Quiz} from '../models/quiz.model';
import {Question} from '../models/question.model';
import {httpOptions, serverUrl} from '../configs/server.config';
import {Theme} from '../models/theme.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private quizzes: Quiz[] = [];
  private themes: Theme[] = [];

  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);
  public themes$: BehaviorSubject<Theme[]> = new BehaviorSubject(this.themes);

  public quizSelected$: Subject<Quiz> = new Subject();

  public themeSelected$: Subject<Theme> = new Subject();

  public questionSelected$: Subject<Question> = new Subject();

  private quizUrl = serverUrl + 'quizzes';
  private themeUrl = serverUrl + 'themes';
  private questionsPath = 'questions';

  constructor(private http: HttpClient) {
    this.setQuizzesFromUrl();
    this.setThemesFromUrl();
  }

  setQuizzesFromUrl() {
    this.http.get<Quiz[]>(this.quizUrl).subscribe((quizList) => {
      this.quizzes = quizList;
      this.quizzes$.next(this.quizzes);
    });
  }

  addQuiz(quiz: Quiz) {
    this.http.post<Quiz>(this.quizUrl, quiz, httpOptions).subscribe(() => this.setQuizzesFromUrl());
    this.setQuizzesFromUrl();
  }

  setSelectedQuiz(quizId: string) {
    const urlWithId = this.quizUrl + '/' + quizId;
    this.http.get<Quiz>(urlWithId).subscribe((quiz) => {
      this.quizSelected$.next(quiz);
    });
  }


  setSelectedQuestion(quizId: string, questionId: string) {
    const urlWithId = this.quizUrl + '/' + quizId + '/' + this.questionsPath + '/' + questionId;
    this.http.get<Question>(urlWithId).subscribe((question) => {
      this.questionSelected$.next(question);
    });
  }

  deleteQuiz(quiz: Quiz) {
    const urlWithId = this.quizUrl + '/' + quiz.id;
    this.http.delete<Quiz>(urlWithId, httpOptions).subscribe(() => this.setQuizzesFromUrl());
    this.setQuizzesFromUrl();
  }

  addQuestion(quiz: Quiz, question: Question) {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath;
    this.http.post<Question>(questionUrl, question, httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
    this.setQuizzesFromUrl();
  }

  deleteQuestion(quiz: Quiz, question: Question) {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id;
    this.http.delete<Question>(questionUrl, httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
    this.setQuizzesFromUrl();
  }

  editQuestion(quizId: string, questionToAdd: Question, questionToDelete: Question) {
    const questionUrl = this.quizUrl + '/' + quizId + '/' + this.questionsPath + '/';
    this.deleteQuestionAfterEdit(quizId, questionToDelete);
    this.http.post<Question>(questionUrl, questionToAdd, httpOptions).subscribe(() => this.setSelectedQuiz(quizId));
    this.setQuizzesFromUrl();
  }

  deleteQuestionAfterEdit(quizId: string, question: Question) {
    const questionUrl = this.quizUrl + '/' + quizId + '/' + this.questionsPath + '/' + question.id;
    this.http.delete<Question>(questionUrl, httpOptions).subscribe(() => this.setSelectedQuiz(quizId));
  }

  addTheme(theme: Theme) {
    this.http.post<Theme>(this.themeUrl, theme, httpOptions).subscribe(() => this.setThemesFromUrl());
    this.setThemesFromUrl();
  }

  setThemesFromUrl() {
    this.http.get<Theme[]>(this.themeUrl).subscribe((themeList) => {
      this.themes = themeList;
      this.themes$.next(this.themes);
    });
  }

  setSelectedTheme(themeId: string) {
    const urlWithId = this.themeUrl + '/' + themeId;
    this.http.get<Theme>(urlWithId).subscribe((theme) => {
      this.themeSelected$.next(theme);
    });
  }

  deleteTheme(theme: Theme) {
    const urlWithId = this.themeUrl + '/' + theme.id;
    this.http.delete(urlWithId, httpOptions).subscribe(() => this.setThemesFromUrl());
    this.setThemesFromUrl();
  }

  editTheme(themeId: string, theme: Theme) {
    const themeUrl = this.themeUrl + '/' + themeId;
    this.http.put(themeUrl, theme, httpOptions).subscribe(() => this.setSelectedTheme(themeId));
    this.setThemesFromUrl();
  }
}
