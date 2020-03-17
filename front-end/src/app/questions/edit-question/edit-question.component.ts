import {Component, OnInit} from '@angular/core';
import {Question} from '../../../models/question.model';
import {QuizService} from '../../../services/quiz.service';
import {ActivatedRoute} from '@angular/router';
import {Quiz} from '../../../models/quiz.model';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent implements OnInit {

  public quiz: Quiz;
  public question: Question;

  constructor(private quizService: QuizService, private activatedRoute: ActivatedRoute) {
    const quizId = this.activatedRoute.parent.snapshot.paramMap.get('quizId');
    const questionId = this.activatedRoute.snapshot.paramMap.get('questionId');
    console.log(quizId);
    console.log(questionId);
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
    // this.quizService.quizSelected$.subscribe((quiz) => this.question = quiz.questions
    // .find((question) => +question.id == +this.question.id));
  }

  ngOnInit() {
    const quizId = this.activatedRoute.parent.snapshot.paramMap.get('quizId');
    const questionId = this.activatedRoute.snapshot.paramMap.get('questionId');
    console.log(quizId);
    console.log(questionId);
    this.quizService.setSelectedQuiz(quizId);
  }

}
