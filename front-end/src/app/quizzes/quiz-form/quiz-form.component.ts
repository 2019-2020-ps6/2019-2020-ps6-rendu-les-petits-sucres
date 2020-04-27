import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';
import {Theme} from '../../../models/theme.model';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user.model';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})

export class QuizFormComponent implements OnInit {

  public quizForm: FormGroup;
  public themes: Theme[];
  public patients: User[];

  constructor(public formBuilder: FormBuilder, public quizService: QuizService, private router: Router,
              public userService: UserService, private authenticationService: AuthenticationService) {
    if (this.authenticationService.currentUserValue != null) {
      if (!this.authenticationService.currentUserValue.isAdmin) {
        this.router.navigate(['/']).then();
      }
    } else {
      this.router.navigate(['/admin/login/']).then();
    }
    this.userService.patients$.subscribe((patients) => this.patients = patients);
    this.quizService.themes$.subscribe((themes) => this.themes = themes);
    this.initializeQuizForm();
  }

  private initializeQuizForm() {
    this.quizForm = this.formBuilder.group({
      name: ['', Validators.required],
      theme: ['', Validators.required],
      image: '',
      user: '',
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
      alert('Le quiz a bien été créé !');
      this.router.navigate(['/edit-quiz-list/']).then();
    }
  }
}
