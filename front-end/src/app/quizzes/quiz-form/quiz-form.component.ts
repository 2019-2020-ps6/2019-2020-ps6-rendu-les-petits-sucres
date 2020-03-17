import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import { themes } from '../../../configs/quiz.themes';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})
export class QuizFormComponent implements OnInit {

  // Note: We are using here ReactiveForms to create our form. Be careful when you look for some documentation to
  // avoid TemplateDrivenForm (another type of form)

  /**
   * QuizForm: Object which manages the form in our component.
   * More information about Reactive Forms: https://angular.io/guide/reactive-forms#step-1-creating-a-formgroup-instance
   */
  public quizForm: FormGroup;
  themes: string[] = Object.values(themes);

  constructor(public formBuilder: FormBuilder, public quizService: QuizService) {
    this.initializeQuizForm();
  }

  private initializeQuizForm() {
    this.quizForm = this.formBuilder.group({
      name: ['', Validators.required],
      theme: ['', Validators.required],
      questions: this.formBuilder.array([])
    });
  }

  ngOnInit() {
  }

  addQuiz() {
    if (this.quizForm.valid) {
      const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
      this.quizService.addQuiz(quizToCreate);
      this.initializeQuizForm();
    }
  }
}