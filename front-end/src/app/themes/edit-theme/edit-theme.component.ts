import {Component, OnInit} from '@angular/core';
import {Theme} from '../../../models/theme.model';
import {QuizService} from '../../../services/quiz.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-theme',
  templateUrl: './edit-theme.component.html',
  styleUrls: ['./edit-theme.component.scss']
})
export class EditThemeComponent implements OnInit {

  public theme: Theme;

  constructor(private quizService: QuizService, private route: ActivatedRoute) {
    this.quizService.themeSelected$.subscribe((theme) => this.theme = theme);
  }

  ngOnInit() {
    const themeId = this.route.snapshot.paramMap.get('themeId');
    this.quizService.setSelectedTheme(themeId);
  }
}
