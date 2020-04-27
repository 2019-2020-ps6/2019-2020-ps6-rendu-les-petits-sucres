import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {QuizListComponent} from './quizzes/quiz-list/quiz-list.component';
import {QuizComponent} from './quizzes/quiz/quiz.component';
import {HeaderComponent} from './header/header.component';
import {QuizFormComponent} from './quizzes/quiz-form/quiz-form.component';
import {EditQuizComponent} from './quizzes/edit-quiz/edit-quiz.component';
import {EditQuizListComponent} from './quizzes/edit-quiz-list/edit-quiz-list.component';
import {AppRoutingModule} from './app.routing.module';
import {QuestionListComponent} from './questions/question-list/question-list.component';
import {QuestionFormComponent} from './questions/question-form/question-form.component';
import {QuestionComponent} from './questions/question/question.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UserComponent} from './users/user/user.component';
import {CreateUserComponent} from './users/create-user/create-user.component';
import {UserFormComponent} from './users/user-form/user-form.component';
import {EditQuestionComponent} from './questions/edit-question/edit-question.component';
import {CreateQuizComponent} from './quizzes/create-quiz/create-quiz.component';
import {PlayQuizComponent} from './quizzes/play-quiz/play-quiz.component';
import {LoginComponent} from './users/login/login.component';
import {BasicAuthInterceptor} from '../helpers/basic-auth.interceptor';
import {ErrorInterceptor} from '../helpers/error.interceptor';
import {SearchComponent} from './tools/search/search.component';
import {EditUserComponent} from './users/edit-user/edit-user.component';
import {LoginPatientsComponent} from './users/login-patients/login-patients.component';
import {UserAccountComponent} from './users/user-account/user-account.component';
import {ThemeFormComponent} from './themes/theme-form/theme-form.component';
import {CreateThemeComponent} from './themes/create-theme/create-theme.component';
import {ThemeComponent} from './themes/theme/theme.component';
import {EditThemeComponent} from './themes/edit-theme/edit-theme.component';
import {UserManagementComponent} from './users/user-management/user-management.component';
import {CreateQuestionComponent} from './questions/create-question/create-question.component';
import {SearchUserComponent} from './tools/search-user/search-user.component';
import {EditThemeListComponent} from './themes/edit-theme-list/edit-theme-list.component';
import {SearchThemeComponent} from './tools/search-theme/search-theme.component';
import {ThemeSortComponent} from './tools/theme-sort/theme-sort.component';
import {QuizFiltersComponent} from './tools/quiz-filters/quiz-filters.component';
import {UserQuizListComponent} from './users/user-quiz-list/user-quiz-list.component';
import {UserQuizStatComponent} from './users/user-quiz-stat/user-quiz-stat.component';


@NgModule({
  declarations: [
    AppComponent,
    QuizListComponent,
    QuizComponent,
    ThemeComponent,
    HeaderComponent,
    QuizFormComponent,
    ThemeFormComponent,
    EditQuizComponent,
    EditQuizListComponent,
    EditThemeComponent,
    QuestionListComponent,
    QuestionFormComponent,
    QuestionComponent,
    UserComponent,
    UserFormComponent,
    CreateUserComponent,
    EditQuestionComponent,
    CreateQuizComponent,
    CreateThemeComponent,
    PlayQuizComponent,
    LoginComponent,
    LoginPatientsComponent,
    SearchComponent,
    EditUserComponent,
    UserAccountComponent,
    UserManagementComponent,
    CreateQuestionComponent,
    SearchUserComponent,
    EditThemeListComponent,
    SearchThemeComponent,
    ThemeSortComponent,
    QuizFiltersComponent,
    UserQuizListComponent,
    UserQuizStatComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
