import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {Theme} from '../../../models/theme.model';

@Component({
  selector: 'app-edit-theme-list',
  templateUrl: './edit-theme-list.component.html',
  styleUrls: ['./edit-theme-list.component.scss']
})
export class EditThemeListComponent implements OnInit {

  public themeList: Theme[] = [];
  public page: number;
  public pageSize = 10;
  public nbPageTotal: number;
  public themeLength: number;

  constructor(private router: Router, public quizService: QuizService) {
    if (localStorage.getItem('themeListSearch') !== null) {
      this.themeList = localStorage.getItem('themeListSearch') && JSON.parse(localStorage.getItem('themeListSearch'));
      // this.themeList.reverse();
      this.themeLength = this.themeList.length;
      this.nbPageTotal = (this.themeLength / this.pageSize) - (( this.themeLength % this.pageSize ) / this.pageSize ) + 1;
    } else {
      this.quizService.themes$.subscribe((themes: Theme[]) => {
        this.themeList = themes;
        // this.themeList.reverse();
        this.themeLength = themes.length;
        this.nbPageTotal = (this.themeLength / this.pageSize) - (( this.themeLength % this.pageSize ) / this.pageSize ) + 1 ;
      });
    }
    this.page = 1;
  }

  ngOnInit() {
  }

  editTheme(theme: Theme) {
    this.router.navigate(['/edit-theme/' + theme.id]).then();
  }

  deleteTheme(theme: Theme) {
    if (localStorage.getItem('themeListSearch') !== null) {
      localStorage.setItem('themeListSearch', JSON.stringify(JSON.parse(localStorage.getItem('themeListSearch'))
        .filter((storedTheme) => storedTheme.id !== theme.id)));
      this.themeList = localStorage.getItem('themeListSearch') && JSON.parse(localStorage.getItem('themeListSearch'));
    }
    this.quizService.deleteTheme(theme);
  }

  nextPage() {
    if (this.page * this.pageSize < this.themeList.length) {
      this.page = this.page + 1;
      if (this.page * this.pageSize < this.themeList.length) {
        return true;
      }
      return true;
    }
  }

  backPage() {
    if (this.page !== 1) {
      this.page = this.page - 1;
      return true;
    }
  }

  showPage(i: number) {
    this.page = i + 1 ;
  }

  counter(i: number) {
    return new Array(i);
  }
}
