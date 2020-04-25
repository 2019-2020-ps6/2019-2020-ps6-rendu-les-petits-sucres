import {Component, OnInit} from '@angular/core';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Theme} from '../../../models/theme.model';
import {Router} from '@angular/router';



@Component({
  selector: 'app-theme-sort',
  templateUrl: './theme-sort.component.html',
  styleUrls: ['./theme-sort.component.scss']
})
export class ThemeSortComponent implements OnInit {

  private quizList: Quiz[] = [];
  private quizListSearch: Quiz[] = [];
  private quizListThemeSort: Quiz[] = [];
  private quizListUserSort: Quiz[] = [];
  private newQuizList: Quiz[] = [];
  private themeSortForm: FormGroup;
  public themes: Theme[];

  constructor(public formBuilder: FormBuilder, public quizService: QuizService, private router: Router) {
    this.quizService.themes$.subscribe((themes) => this.themes = themes);
    this.initializeThemeSortForm();
    if (localStorage.getItem('quizListSearch') !== null) {
      this.quizListSearch = localStorage.getItem('quizListSearch') && JSON.parse(localStorage.getItem('quizListSearch'));
    }
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
      this.quizList.reverse();
      });
  }

  private initializeThemeSortForm() {
    this.themeSortForm = this.formBuilder.group({
      theme: ['']
    });
  }

  ngOnInit() {
  }

  get valueSearch(): FormArray {
    return this.themeSortForm.get('theme').value as FormArray;
  }

  applySearch() {
    localStorage.removeItem('requestThemeSort');
    localStorage.removeItem('newQuizListEdit');
    localStorage.removeItem('quizListThemeSort');
    if (this.themeSortForm.valid) {
      for (const quiz of this.quizList) {
        if (quiz.theme === this.valueSearch.toString()) {
          this.quizListThemeSort.push(quiz);
        }
      }
      localStorage.setItem('quizListThemeSort', JSON.stringify(this.quizListThemeSort));
      localStorage.setItem('requestThemeSort', this.valueSearch.toString());
      if (localStorage.getItem('quizListSearch')) {
        if (this.themeSortForm.valid) {
          for (const quiz of this.quizListSearch) {
            if (quiz.theme === localStorage.getItem('requestThemeSort')) {
              this.newQuizList.push(quiz);
            }
          }
      }
    } else {
      this.newQuizList = this.quizListThemeSort;
      }
      console.log(this.newQuizList)
      localStorage.setItem('newQuizListEdit', JSON.stringify(this.newQuizList));
    }
    document.location.reload();
  }

  localStorage() {
    return localStorage.getItem('requestThemeSort') !== null;
  }

  getResearch() {
    return localStorage.getItem('requestThemeSort');
  }

  deleteSearch() {
    localStorage.removeItem('requestThemeSort');
    localStorage.removeItem('quizListThemeSort');
    if (localStorage.getItem('requestQuizSearch')) {
      localStorage.setItem('newQuizListEdit', JSON.stringify(this.quizListSearch.reverse()));
    } else {
      localStorage.removeItem('newQuizListEdit');
    }
    document.location.reload();
  }
}
