import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';
import {Theme} from '../../../models/theme.model';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user.model';
import {AuthenticationService} from '../../../services/authentication.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})

export class QuizFormComponent implements OnInit {

  @Input()
  quiz: Quiz;

  public quizForm: FormGroup;
  public themes: Theme[];
  public patients: User[];

  constructor(public formBuilder: FormBuilder, public quizService: QuizService, private router: Router,
              public userService: UserService, private authenticationService: AuthenticationService,
              private location: Location) {
    if (this.authenticationService.currentUserValue != null) {
      if (!this.authenticationService.currentUserValue.isAdmin) {
        this.router.navigate(['/']).then();
      }
    } else {
      this.router.navigate(['/admin/login/']).then();
    }
    this.userService.patients$.subscribe((patients) => this.patients = patients);
    this.quizService.themes$.subscribe((themes) => this.themes = themes);
    this.initializeQuizForm(null);
  }

  private initializeQuizForm(quiz: Quiz) {
    this.quizForm = this.formBuilder.group({
      name: quiz ? quiz.name : ['', Validators.required],
      theme: quiz ? quiz.theme : ['', Validators.required],
      image: quiz ? quiz.image : '',
      user: quiz ? quiz.user : '',
      questions: this.formBuilder.array([])
    });
  }

  ngOnInit() {
    if (this.quiz) {
      this.initializeQuizForm(this.quiz);
    }
  }

  addQuiz() {
    if (this.quizForm.valid) {
      const quizToCreate = this.quizForm.value as Quiz;
      this.quizService.addQuiz(quizToCreate);
      this.initializeQuizForm(null);
      alert('Le quiz a bien été créé !');
      this.location.back();
    } else {
      alert('Le quiz n\'a pas été créé !\nUn quiz doit contenir au moins :\n- Une titre\n- Un thème');
    }
  }

  editQuiz(id: string) {
    if (this.quizForm.valid) {
      const quizToEdit = this.quizForm.getRawValue() as Quiz;
      this.quizService.editQuiz(id, quizToEdit);
      alert('Le quiz a bien été modifié !');
      this.location.back();
    } else {
      alert('Le quiz n\'a pas été modifié !\nUn quiz doit contenir au moins :\n- Une titre\n- Un thème');
    }
  }
}
