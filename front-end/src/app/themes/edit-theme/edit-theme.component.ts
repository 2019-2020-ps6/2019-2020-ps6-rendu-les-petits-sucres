import {Component, Input, OnInit} from '@angular/core';
import {Theme} from '../../../models/theme.model';
import {QuizService} from '../../../services/quiz.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit-theme',
  templateUrl: './edit-theme.component.html',
  styleUrls: ['./edit-theme.component.scss']
})
export class EditThemeComponent implements OnInit {

  @Input()
  theme: Theme;

  public themeForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private quizService: QuizService, private activatedRoute: ActivatedRoute , private location: Location) {
    this.quizService.themeSelected$.subscribe((theme) => this.theme = theme);
    this.initializeThemeForm(null);
  }

  private initializeThemeForm(theme: Theme) {
    this.themeForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
    const themeId = this.activatedRoute.snapshot.paramMap.get('themeId');
    this.quizService.setSelectedTheme(themeId);
    if (this.theme) {
      this.applyFormValues(this.theme);
    }
  }

  editTheme(themeId: string) {
    if (this.themeForm.valid) {
      const theme = this.themeForm.value as Theme;
      this.quizService.editTheme(String(themeId), theme);
      this.location.back();
    }
  }

  private applyFormValues(theme: Theme) {
    this.themeForm.patchValue({
      name: theme.name,
    });
  }
}
