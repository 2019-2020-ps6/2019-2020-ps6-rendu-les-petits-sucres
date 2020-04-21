import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';


import {QuizService} from '../../../services/quiz.service';
import {Theme} from '../../../models/theme.model';

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
    if (this.themeForm.valid) {
      this.quizService.addTheme(theme);
      this.initializeThemeForm(null);
      this.location.back();
    }
  }

  editTheme(id: number) {
    if (this.themeForm.valid) {
      const themeToEdit = this.themeForm.getRawValue() as Theme;
      this.quizService.editTheme(String(id), themeToEdit);
      this.location.back();
    }
  }

  private applyFormValues(theme: Theme) {
    this.themeForm.patchValue({
      name: theme.name,
    });
  }
}
