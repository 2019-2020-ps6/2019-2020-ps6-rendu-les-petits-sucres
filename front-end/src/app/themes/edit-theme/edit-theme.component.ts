import {Component, OnInit} from '@angular/core';
import {Theme} from '../../../models/theme.model';
import {QuizService} from '../../../services/quiz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-theme',
  templateUrl: './edit-theme.component.html',
  styleUrls: ['./edit-theme.component.scss']
})
export class EditThemeComponent implements OnInit {

  public theme: Theme;

  public themeForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private quizService: QuizService, private route: ActivatedRoute , private router: Router) {
    this.quizService.themeSelected$.subscribe((theme) => this.theme = theme);
    this.initializeThemeForm(null);
  }

  ngOnInit() {
    const themeId = this.route.snapshot.paramMap.get('themeId');
    this.quizService.setSelectedTheme(themeId);
    if (this.theme) {
      this.applyFormValues(this.theme);
    }
  }

  private initializeThemeForm(theme: Theme) {
    this.themeForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  editTheme(themeId: string) {
    if (this.themeForm.valid) {
      const theme = this.themeForm.value as Theme;
      this.quizService.editTheme(String(themeId), theme);
      this.router.navigate(['/theme-list/']);
    }
  }

  private applyFormValues(theme: Theme) {
    this.themeForm.patchValue({
      name: theme.name,
    });
  }
}
