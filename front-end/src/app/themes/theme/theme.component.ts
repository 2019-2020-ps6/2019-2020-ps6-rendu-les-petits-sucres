import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../../../models/question.model';
import {Theme} from '../../../models/theme.model';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  @Input()
  theme: Theme;

  @Output()
  deleteTheme: EventEmitter<Theme> = new EventEmitter<Theme>();

  @Output()
  editTheme: EventEmitter<Theme> = new EventEmitter<Theme>();

  constructor() { }

  ngOnInit() {
  }

  delete() {
    this.deleteTheme.emit(this.theme);
  }

  edit() {
    this.editTheme.emit(this.theme);
  }
}
