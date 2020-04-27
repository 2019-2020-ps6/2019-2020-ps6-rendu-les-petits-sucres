import {Component, OnInit} from '@angular/core';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Theme} from '../../../models/theme.model';
import {User} from '../../../models/user.model';


@Component({
  selector: 'app-quiz-filters',
  templateUrl: './quiz-filters.component.html',
  styleUrls: ['./quiz-filters.component.scss']
})
export class QuizFiltersComponent implements OnInit {

  private quizList: Quiz[] = [];
  private newQuizList: Quiz[] = [];
  private themes: Theme[] = [];
  private searchForm: FormGroup;
  user: User = null;

  constructor(public formBuilder: FormBuilder, public quizService: QuizService) {
    this.initializeSearchForm();
    if (localStorage.getItem('currentUser')) {
      this.user = localStorage.getItem('currentUser') && JSON.parse(localStorage.getItem('currentUser'));
      localStorage.setItem('currentUserName', this.user.firstName + ' ' + this.user.lastName);
    }
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
      // this.quizList.reverse();
      this.quizService.themes$.subscribe((themes) => this.themes = themes);
    });
  }

  private initializeSearchForm() {
    this.searchForm = this.formBuilder.group({
      theme: [''],
      search: [''],
      user: [false],
    });
  }

  ngOnInit() {
  }

  okValueSearch() {
    if (localStorage.getItem('search') !== '') {
      return true;
    }
  }

  okValueTheme() {
    if (localStorage.getItem('theme') !== '') {
      return true;
    }
  }

  okValueUser() {
    if (localStorage.getItem('user') !== 'false') {
      return true;
    }
  }

  okCurrentUser() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
  }

  getValueSearch() {
    return localStorage.getItem('search');
  }

  getValueTheme() {
    return localStorage.getItem('theme');
  }

  getValueUser() {
    return localStorage.getItem('user');
  }

  getCurrentUser() {
    return localStorage.getItem('currentUserName');
  }

  applySearch() {
    for (const quiz of this.quizList) {
      if (this.user !== null && this.searchForm.get('user').value) {
        localStorage.setItem('user', this.user.firstName + ' ' + this.user.lastName);
        if (quiz.user === this.user.firstName + ' ' + this.user.lastName
          && quiz.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(this.searchForm.get('search').value)
          && (quiz.theme === this.searchForm.get('theme').value || this.searchForm.get('theme').value === '')) {
          this.newQuizList.push(quiz);
        }
      } else {
        localStorage.setItem('user', 'false');
        if (quiz.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(this.searchForm.get('search').value)
          && (quiz.theme === this.searchForm.get('theme').value || this.searchForm.get('theme').value === '')) {
          this.newQuizList.push(quiz);
        }
      }
    }
    const noFilters = this.searchForm.get('theme').value === '' && !this.searchForm.get('user').value
      && this.searchForm.get('search').value === '';
    console.log(noFilters);
    localStorage.setItem('newQuizList', JSON.stringify(this.newQuizList));
    localStorage.setItem('filters', noFilters ? 'false' : 'true');
    localStorage.setItem('search', this.searchForm.get('search').value);
    localStorage.setItem('theme', this.searchForm.get('theme').value);
    document.location.reload();
  }

  filters() {
    return localStorage.getItem('filters');
  }

  deleteSearch() {
    localStorage.removeItem('newQuizList');
    localStorage.removeItem('filters');
    localStorage.removeItem('user');
    localStorage.removeItem('search');
    localStorage.removeItem('theme');
    document.location.reload();
  }
}
