import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from 'src/models/quiz.model';
import {Question} from 'src/models/question.model';
import {Location} from '@angular/common';
import {AuthenticationService} from '../../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  @Input()
  quiz: Quiz;

  @Input()
  question: Question;

  public questionForm: FormGroup;
  public trueOrFalse: boolean[] = [true, false]; // Vrai ou faux

  constructor(public formBuilder: FormBuilder, private quizService: QuizService, private location: Location,
              private authenticationService: AuthenticationService, private router: Router) {
    if (this.authenticationService.currentUserValue != null) {
      if (!this.authenticationService.currentUserValue.isAdmin) {
        this.router.navigate(['/']);
      }
    } else {
      this.router.navigate(['/admin/login/']);
    }
    this.initializeQuestionForm(this.question ? this.question : null);
  }

  private initializeQuestionForm(question: Question) {
    this.questionForm = this.formBuilder.group({
      label: question ? question.label : ['', Validators.required],
      answers: question ? question.answers : this.formBuilder.array([])
    });
  }

  ngOnInit() {
    if (this.question) {
      this.applyFormValues(this.question);
    }
  }

  get answers(): FormArray {
    return this.questionForm.get('answers') as FormArray;
  }

  private createAnswer() {
    return this.formBuilder.group({
      value: '',
      isCorrect: null,
      image: '',
    });
  }

  addAnswer() {
    if (this.answers.length < 6) {
      this.answers.push(this.createAnswer());
    } else {
      alert('Vous ne pouvez créer que 6 réponses par question !');
    }
  }

  deleteAnswer(index) {
    this.answers.removeAt(index);
  }

  addQuestion() {
    this.correctValuesForImageAnswer();
    for (const answer of this.questionForm.value.answers) {
      if (answer.image !== '' && answer.value === '') {
        answer.value = ' ';
      }
    }
    const question = this.questionForm.value as Question;
    const isCorrectAnswers = [];
    question.answers.forEach(answer => {
      isCorrectAnswers.push(answer.isCorrect);
    });
    if (this.questionForm.valid ) {
      if (isCorrectAnswers.some((element) => element === 'true') && isCorrectAnswers.length > 1) {
        this.quizService.addQuestion(this.quiz, question);
        this.initializeQuestionForm(null);
        alert('La question a bien été créé !');
      }
    }
  }

  editQuestion(quizId: number) {
    this.correctValuesForImageAnswer();
    const question = this.questionForm.value as Question;
    const isCorrectAnswers = [];
    question.answers.forEach(answer => {
      isCorrectAnswers.push(answer.isCorrect);
    });
    if (this.questionForm.valid) {
      if (isCorrectAnswers.some((element) => element === 'true') && isCorrectAnswers.length > 1) {
        this.quizService.editQuestion(String(quizId), question, this.question);
        this.location.back();
      }
    }
  }

  private applyFormValues(question: Question) {
    question.answers.forEach(answer => {
      const answerToPush = this.createAnswer();
      answerToPush.patchValue({
        value: answer.value,
        isCorrect: answer.isCorrect,
        image: answer.image,
        id: answer.id,
      });
      this.answers.push(answerToPush);
    });
    this.questionForm.patchValue({
      label: question.label,
      answers: question.answers,
    });
  }

  private correctValuesForImageAnswer() {
    for (const answer of this.questionForm.value.answers) {
      if (answer.image !== '' && answer.value === '') {
        answer.value = ' ';
      }
    }
  }
}
