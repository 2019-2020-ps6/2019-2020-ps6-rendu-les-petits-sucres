import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import {ActivatedRoute} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';

@Component({
  selector: 'app-edit-quiz-info',
  templateUrl: './edit-quiz-info.component.html',
  styleUrls: ['./edit-quiz-info.component.scss']
})
export class EditQuizInfoComponent implements OnInit {

  public quiz: Quiz;
  quizId: number;

  constructor(private route: ActivatedRoute, private quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
      this.quizId = +quiz.id;
    });
  }

  ngOnInit() {
    const quizId = this.route.snapshot.paramMap.get('quizId');
    this.quizService.setSelectedQuiz(quizId);
  }
}
