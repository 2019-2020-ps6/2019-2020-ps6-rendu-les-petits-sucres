import {Component, OnInit} from '@angular/core';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  private quizList: Quiz[] = [];
  private newQuizList: Quiz[] = [];
  private searchForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public quizService: QuizService) {
    this.initializeSearchForm();
    this.quizService.quizzes$.subscribe((quizzes) => {
      this.quizList = quizzes;
    });
  }

  private initializeSearchForm() {
    this.searchForm = this.formBuilder.group({
      search: []
    });
  }

  ngOnInit() {
  }

  get valueSearch(): FormArray {
    return this.searchForm.get('search').value as FormArray;
  }

  applySearch() {
    localStorage.removeItem('requestQuizSearch');
    localStorage.removeItem('quizListSearch');
    if (this.searchForm.valid) {
      for (const quiz of this.quizList) {
        if (quiz.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(this.valueSearch.toString())) {
          this.newQuizList.push(quiz);
        }
      }
      localStorage.setItem('quizListSearch', JSON.stringify(this.newQuizList));
      localStorage.setItem('requestQuizSearch', this.valueSearch.toString());
    }
    document.location.reload();
  }

  localStorage() {
    return localStorage.getItem('quizListSearch') !== null;
  }

  getResearch() {
    return localStorage.getItem('requestQuizSearch');
  }

  deleteSearch() {
    localStorage.removeItem('requestQuizSearch');
    localStorage.removeItem('quizListSearch');
    document.location.reload();
  }
}
