import {Component, OnInit} from '@angular/core';
import {Theme} from '../../../models/theme.model';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {QuizService} from '../../../services/quiz.service';

@Component({
  selector: 'app-search-theme',
  templateUrl: './search-theme.component.html',
  styleUrls: ['./search-theme.component.scss']
})
export class SearchThemeComponent implements OnInit {

  private themeList: Theme[] = [];
  private newThemeList: Theme[] = [];
  private searchForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public quizService: QuizService) {
    this.initializeSearchForm();
    this.quizService.themes$.subscribe((themes) => {
      this.themeList = themes;
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
    localStorage.removeItem('requestThemeSearch');
    localStorage.removeItem('themeListSearch');
    if (this.searchForm.valid) {
      for (const theme of this.themeList) {
        if (theme.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(this.valueSearch.toString())) {
          this.newThemeList.push(theme);
        }
      }
      localStorage.setItem('themeListSearch', JSON.stringify(this.newThemeList));
      localStorage.setItem('requestThemeSearch', this.valueSearch.toString());
    }
    document.location.reload();
  }

  localStorage() {
    return localStorage.getItem('themeListSearch') !== null;
  }

  getResearch() {
    return localStorage.getItem('requestThemeSearch');
  }

  deleteSearch() {
    localStorage.removeItem('requestThemeSearch');
    localStorage.removeItem('themeListSearch');
    document.location.reload();
  }

}
