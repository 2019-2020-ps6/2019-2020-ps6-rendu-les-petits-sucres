import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {QuizService} from '../../../services/quiz.service';
import {Theme} from '../../../models/theme.model';
import {Location} from '@angular/common';


@Component({
  selector: 'app-theme-form',
  templateUrl: './theme-form.component.html',
  styleUrls: ['./theme-form.component.scss']
})
export class ThemeFormComponent implements OnInit {

  @Input()
  theme: Theme;


  public themeForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private quizService: QuizService, private location: Location) {
    this.initializeThemeForm(null);
  }
  private initializeThemeForm(theme: Theme) {
    this.themeForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.theme) {
      this.applyFormValues(this.theme);
    }
  }

  addTheme() {
    const theme = this.themeForm.value as Theme;
    if (this.themeForm.valid ) {
      this.quizService.addTheme(theme);
      this.initializeThemeForm(null);
    }
  }

  private applyFormValues(theme: Theme) {
    this.themeForm.patchValue({
      name: theme.name,
    });
  }

}
