import {Component, OnInit} from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {Answer} from '../../../models/question.model';

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.scss']
})
export class PlayQuizComponent implements OnInit {

  public quiz: Quiz;
  public showSummaryQuestion: boolean;
  public currentQuestion: number;
  public score: number;
  public deactivatesAnswers: Array<Answer> = [];

  constructor(private route: ActivatedRoute, private quizService: QuizService, private router: Router) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
    if (localStorage) {
      this.currentQuestion = +localStorage.getItem('currentQuestion');
      this.showSummaryQuestion = JSON.parse(localStorage.getItem('summaryQuestion'));
      if (this.showSummaryQuestion === true) {
        this.toggleNextQuestion();
      }
      this.score = +localStorage.getItem('score');
    } else {
      this.currentQuestion = 0;
      this.score = 20;
    }
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('quizId');
    this.quizService.setSelectedQuiz(id);
  }

  toggleQuestionSummary() {
    this.deactivatesAnswers = [];
    this.showSummaryQuestion = true;
    localStorage.setItem('currentQuestion', this.currentQuestion + '');
    localStorage.setItem('summaryQuestion', this.showSummaryQuestion + '');
    this.toggleNextQuestion();
  }

  toggleWrongAnswer(answer: Answer) {
    const answers = this.quiz.questions[this.currentQuestion].answers;
    this.deactivatesAnswers.push(answer);
    this.score -= 1 / answers.length; // Score calculation
    localStorage.setItem('score', this.score + '');
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
  }

  isDeactivate(answerSelection: Answer) {
    for (const answer of this.deactivatesAnswers) {
      if (answer === answerSelection) {
        return true;
      }
    }
    return false;
  }

  private toggleNextQuestion() {
    setTimeout (() => {
      this.showSummaryQuestion = false;
      this.currentQuestion ++;
      localStorage.setItem('currentQuestion', this.currentQuestion + '');
      localStorage.setItem('summaryQuestion', this.showSummaryQuestion + '');
    }, 5000);
  }

  goBack() {
    window.localStorage.clear();
    this.router.navigate(['/quiz-list/']);
  }
}
