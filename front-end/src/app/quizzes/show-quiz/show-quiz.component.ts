import {Component, Input, OnInit, Output} from '@angular/core';
import {Quiz} from "../../../models/quiz.model";
import {Question} from "../../../models/question.model";
import {QuizService} from "../../../services/quiz.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-show-quiz',
  templateUrl: './show-quiz.component.html',
  styleUrls: ['./show-quiz.component.scss']
})
export class ShowQuizComponent implements OnInit {

  public quiz: Quiz;

  constructor(private route: ActivatedRoute, private quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
  }

  showNextQuestion() {
    this.quiz.questions.pop();
  }

}
