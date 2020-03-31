import {Component, OnInit} from '@angular/core';
import {Question} from '../../../models/question.model';
import {QuizService} from '../../../services/quiz.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent implements OnInit {

  public question: Question;

  constructor(private quizService: QuizService, private activatedRoute: ActivatedRoute) {
    this.quizService.questionSelected$.subscribe((question) => this.question = question);
  }

  ngOnInit() {
    const quizId = this.activatedRoute.snapshot.paramMap.get('quizId');
    const questionId = this.activatedRoute.snapshot.paramMap.get('questionId');
    this.quizService.setSelectedQuestion(quizId, questionId);
  }
}
