import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from 'src/models/quiz.model';
import {Answer, Question} from 'src/models/question.model';

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
  public trueOrFalse: boolean[] = [true, false];

  constructor(public formBuilder: FormBuilder, private quizService: QuizService) {
    this.initializeQuestionForm(null);
  }

  private initializeQuestionForm(question: Question) {
    this.questionForm = this.formBuilder.group({
      label: question ? question.label : ['', Validators.required],
      answers: question ? question.answers : this.formBuilder.array([])
    });
  }

  ngOnInit() {
    if (this.question) {

      this.applyFormValues(this.questionForm, this.question);
    }
  }

  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }

  private createAnswer() {
    return this.formBuilder.group({
      value: '',
      isCorrect: false,
    });
  }

  addAnswer() {
    this.answers.push(this.createAnswer());
  }

  deletePostedAnswer(answer: Answer) {
    //
  }

  deleteAnswer(index) {
    this.answers.removeAt(index);
  }

  addQuestion() {
    if (this.questionForm.valid) {
      const question = this.questionForm.getRawValue() as Question;
      this.quizService.addQuestion(this.quiz, question);
      this.initializeQuestionForm(null);
    }
  }

  editQuestion(quizId: number, questionId: number) {
    if (this.questionForm.valid) {
      const question = this.questionForm.getRawValue() as Question;
      this.quizService.editQuestion(String(quizId), String(questionId), question);
      this.initializeQuestionForm(question);
    }
  }

  private applyFormValues(questionForm: FormGroup, formValues: Question) {
    Object.keys(formValues).forEach(key => {
      if (key !== 'quizId' && key !== 'questionId' && key !== 'id') {
        const formControl = questionForm.controls[key] as FormControl;
        if (formControl instanceof FormGroup) {
          console.log(formValues[key]);
          this.applyFormValues(formControl, formValues[key]);
        } else {
          console.log(formValues[key]);
          // formControl.patchValue(formValues[key]);
        }
      }
    });
  }
}
