import {Component, Input, OnInit} from '@angular/core';
import {QuizService} from 'src/services/quiz.service';
import {Router} from '@angular/router';
import {Theme} from '../../../models/theme.model';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.scss']
})
export class ThemeListComponent implements OnInit {

  public themeList: Theme[] = [];

  constructor(private quizService: QuizService, private router: Router) {
    this.quizService.themes$.subscribe((themes: Theme[]) => {
      this.themeList = themes;
    });
  }

  ngOnInit() {
    this.router.navigate(['theme-list']);
  }


  deleteTheme(theme: Theme) {
    this.quizService.deleteTheme(theme);
  }

  editTheme(theme: Theme) {
    this.router.navigate(['/edit-theme/' + theme.id]);

  }
}
