import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import {QuizService} from '../../../services/quiz.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit {

  public quiz: Quiz;

  constructor(private route: ActivatedRoute, private quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
  }

  ngOnInit() {
    const quizId = this.route.snapshot.paramMap.get('quizId');
    this.quizService.setSelectedQuiz(quizId);
  }
}
