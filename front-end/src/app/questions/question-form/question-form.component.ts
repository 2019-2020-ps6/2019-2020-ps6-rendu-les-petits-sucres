import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from 'src/models/quiz.model';
import {Question} from 'src/models/question.model';

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
      this.applyFormValues(this.question);
    }
  }

  get answers(): FormArray {
    return this.questionForm.get('answers') as FormArray;
  }

  private createAnswer() {
    return this.formBuilder.group({
      value: '',
      isCorrect: false,
      image: '',
    });
  }

  addAnswer() {
    if (this.answers.length < 6) {
      this.answers.push(this.createAnswer());
    }
  }

  deleteAnswer(index) {
    this.answers.removeAt(index);
  }

  addQuestion() {
    const question = this.questionForm.getRawValue() as Question;
    const isCorrectAnswers = [];
    for (const answer of question.answers) {
      isCorrectAnswers.push(Boolean(answer.isCorrect));
    }
    if (this.questionForm.valid) {
      if (isCorrectAnswers.some((element) => element === true) && isCorrectAnswers.length > 1) {
        this.quizService.addQuestion(this.quiz, question);
        this.initializeQuestionForm(null);
      }
    }
  }

  editQuestion(quizId: number) {
    if (this.questionForm.valid) {
      const question = this.questionForm.getRawValue() as Question;
      this.quizService.editQuestion(String(quizId), question, this.question);
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
}
