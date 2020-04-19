import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
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

  constructor(public formBuilder: FormBuilder, public quizService: QuizService, private router: Router) {
    this.initializeSearchForm();
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });
  }

  private initializeSearchForm() {
    this.searchForm = this.formBuilder.group({
      search: []
    });
  }

  ngOnInit(): void {
  }

  get valueSearch(): FormArray {
    return this.searchForm.get('search').value as FormArray;
  }

  applySearch() {
    localStorage.removeItem('requestSearch');
    localStorage.removeItem('quizListSearch');
    if (this.searchForm.valid) {
      for (const quiz of this.quizList) {
        if ( quiz.name.includes(this.valueSearch.toString())) {
          this.newQuizList.push(quiz);
        }
      }
      localStorage.setItem('quizListSearch', JSON.stringify(this.newQuizList));
      localStorage.setItem('requestSearch', this.valueSearch.toString());
    }
    document.location.reload();
  }

  localStorage() {
    return localStorage.getItem('quizListSearch') !== null;
  }

  getResearch() {
    return localStorage.getItem('requestSearch');
  }

  deleteSearch() {
    localStorage.removeItem('requestSearch');
    localStorage.removeItem('quizListSearch');
    document.location.reload();
  }

}
