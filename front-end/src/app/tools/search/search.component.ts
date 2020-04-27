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
  private quizListSearch: Quiz[] = [];
  private quizListThemeSort: Quiz[] = [];
  private quizListUserSort: Quiz[] = [];
  private newQuizList: Quiz[] = [];
  private searchForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public quizService: QuizService) {
    this.initializeSearchForm();
    if (localStorage.getItem('quizListThemeSort') !== null) {
      this.quizListThemeSort = localStorage.getItem('quizListThemeSort') && JSON.parse(localStorage.getItem('quizListThemeSort'));
    }
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
      this.quizList.reverse();
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
    localStorage.removeItem('newQuizListEdit');
    localStorage.removeItem('quizListSearch');
    if (this.searchForm.valid) {
      for (const quiz of this.quizList) {
        if (quiz.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(this.valueSearch.toString())) {
          this.quizListSearch.push(quiz);
        }
      }
      localStorage.setItem('quizListSearch', JSON.stringify(this.quizListSearch));
      localStorage.setItem('requestQuizSearch', this.valueSearch.toString());
      if (localStorage.getItem('quizListThemeSort')) {
        if (this.searchForm.valid) {
          for (const quiz of this.quizListThemeSort) {
            if (quiz.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
              .includes(localStorage.getItem('requestQuizSearch'))) {
              this.newQuizList.push(quiz);
            }
          }
        }
      } else {
          this.newQuizList = this.quizListSearch;
        }
      localStorage.setItem('newQuizListEdit', JSON.stringify(this.newQuizList));
      }
    document.location.reload();
  }

  localStorage() {
    return localStorage.getItem('requestQuizSearch') !== null;
  }

  getResearch() {
    return localStorage.getItem('requestQuizSearch');
  }

  deleteSearch() {
    localStorage.removeItem('requestQuizSearch');
    localStorage.removeItem('quizListSearch');
    if (localStorage.getItem('requestThemeSort')) {
      localStorage.setItem('newQuizListEdit', JSON.stringify(this.quizListThemeSort.reverse()));
    } else {
      localStorage.removeItem('newQuizListEdit');
    }
    document.location.reload();
  }
}
