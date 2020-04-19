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
  public quizEnd: boolean;
  public currentQuestion: number;
  public score: number;
  public deactivatesAnswers: Array<Answer> = [];
  public skipSummaryOn = false;
  public timerEndSummary: any;
  public timer2: any;
  public timer3: any;
  public timerEndQuiz: any;
  public displayTimer = 10 ;
  public displayTimerEnd = 20 ;

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
    if ( localStorage.getItem('quizEnd') === 'true') {
      this.toggleEndQuiz();
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
    this.setTimer();
    if (this.skipSummaryOn) {
      clearTimeout(this.timerEndSummary);
      clearTimeout(this.timer2);
      this.nextQuestion();
    } else {
      this.timerEndSummary = setTimeout(() => {
        this.nextQuestion();
      }, 10000);
    }
  }

  private toggleEndQuiz() {
      this.setTimeEnd();
      this.timerEndQuiz = setTimeout(() => {
        this.currentQuestion = 0;
        this.showSummaryQuestion = false;
        localStorage.setItem('currentQuestion', this.currentQuestion + '');
        localStorage.setItem('summaryQuestion', this.showSummaryQuestion + '');
        this.quizEnd = false;
        localStorage.removeItem('quizEnd');
      }, 20000);
  }

  private nextQuestion() {
    this.showSummaryQuestion = false;
    this.currentQuestion ++;
    if ( this.currentQuestion === this.quiz.questions.length) {
      this.toggleEndQuiz();
      this.quizEnd = true;
      localStorage.setItem('quizEnd', this.quizEnd + '');
    }
    localStorage.setItem('currentQuestion', this.currentQuestion + '');
    localStorage.setItem('summaryQuestion', this.showSummaryQuestion + '');
  }

  private skipSummary() {
    this.skipSummaryOn = true;
    this.toggleNextQuestion();
  }

  private setTimer() {
    this.displayTimer = 10;
    this.setTimerWithTime(this.displayTimer);
  }

  private setTimeEnd() {
    this.displayTimerEnd = 20;
    this.setTimerWithTimeEnd(this.displayTimerEnd);
  }

  private setTimerWithTime(time) {
    if (time !== 1) {
      this.timer2 = setTimeout(() => {
        this.displayTimer --;
        if (this.skipSummaryOn) {
          this.skipSummaryOn = false;
          return;
        }
        this.setTimerWithTime(time - 1);
      }, 1000);
    }
  }

  private setTimerWithTimeEnd(time) {
    if (time !== 1) {
      this.timer3 = setTimeout(() => {
        this.displayTimerEnd --;
        this.setTimerWithTimeEnd(time - 1);
      }, 1000);
    }
  }

  private showEnd() {
    if ( this.currentQuestion === this.quiz.questions.length) {
      return true;
    }
    return false;
  }
  goBack() {
    window.localStorage.clear();
    this.router.navigate(['/quiz-list/']);
  }
}
