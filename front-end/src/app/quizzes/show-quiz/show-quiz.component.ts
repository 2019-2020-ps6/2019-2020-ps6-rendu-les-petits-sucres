import {Component, OnInit} from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import {QuizService} from '../../../services/quiz.service';
import {ActivatedRoute} from '@angular/router';
import {Answer} from '../../../models/question.model';

@Component({
  selector: 'app-show-quiz',
  templateUrl: './show-quiz.component.html',
  styleUrls: ['./show-quiz.component.scss']
})
export class ShowQuizComponent implements OnInit {

  public quiz: Quiz;
  public showSummaryQuestion: boolean;
  public currentQuestion: number;

  constructor(private route: ActivatedRoute, private quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
    this.currentQuestion = 0;
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('quizId');
    this.quizService.setSelectedQuiz(id);
  }

  toggleQuestionSummary() {
    this.showSummaryQuestion = true;
    setTimeout (() => {
      this.showSummaryQuestion = false;
      this.currentQuestion ++;
    }, 5000);
  }

  toggleWrongAnswer(answer: Answer) {
    this.quiz.questions[this.currentQuestion].answers = this.quiz.questions[this.currentQuestion].answers
      .filter((obj => obj !== answer));
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
  }
}
