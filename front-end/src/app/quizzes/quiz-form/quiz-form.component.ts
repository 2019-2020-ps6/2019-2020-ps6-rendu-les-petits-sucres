import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';
import {themes} from '../../../configs/quiz.themes';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})
export class QuizFormComponent implements OnInit {

  /**
   * QuizForm: Object which manages the form in our component.
   * More information about Reactive Forms: https://angular.io/guide/reactive-forms#step-1-creating-a-formgroup-instance
   */
  public quizForm: FormGroup;
  public themes: string[] = Object.values(themes);

  constructor(public formBuilder: FormBuilder, public quizService: QuizService) {
    this.initializeQuizForm();
  }

  private initializeQuizForm() {
    this.quizForm = this.formBuilder.group({
      name: ['', Validators.required],
      theme: ['', Validators.required],
      image: '',
      questions: this.formBuilder.array([])
    });
  }

  ngOnInit() {
  }

  addQuiz() {
    console.log(this.quizForm.value);
    if (this.quizForm.valid) {
      const quizToCreate: Quiz = this.quizForm.value as Quiz;
      this.quizService.addQuiz(quizToCreate);
      this.initializeQuizForm();
      alert('Le quiz a bien été créé !\nVeuillez retourner en arrière pour y ajouter des questions !');
    }
  }
}
