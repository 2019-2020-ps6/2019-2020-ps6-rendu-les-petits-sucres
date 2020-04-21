import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';
import {Theme} from '../../../models/theme.model';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})

export class QuizFormComponent implements OnInit {

  public quizForm: FormGroup;
  public themes: Theme[];

  constructor(public formBuilder: FormBuilder, public quizService: QuizService) {
    this.quizService.themes$.subscribe((themes) => this.themes = themes);
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
    if (this.quizForm.valid) {
      const quizToCreate = this.quizForm.value as Quiz;
      this.quizService.addQuiz(quizToCreate);
      this.initializeQuizForm();
      alert('Le quiz a bien été créé !\nVeuillez retourner en arrière pour y ajouter des questions !');
    }
  }
}
