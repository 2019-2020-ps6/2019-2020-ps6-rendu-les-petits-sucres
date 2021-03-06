import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizListComponent} from './quizzes/quiz-list/quiz-list.component';
import {EditQuizComponent} from './quizzes/edit-quiz/edit-quiz.component';
import {CreateUserComponent} from './users/create-user/create-user.component';
import {EditQuestionComponent} from './questions/edit-question/edit-question.component';
import {CreateQuizComponent} from './quizzes/create-quiz/create-quiz.component';
import {PlayQuizComponent} from './quizzes/play-quiz/play-quiz.component';
import {EditQuizListComponent} from './quizzes/edit-quiz-list/edit-quiz-list.component';
import {LoginComponent} from './users/login/login.component';
import {EditUserComponent} from './users/edit-user/edit-user.component';
import {LoginPatientsComponent} from './users/login-patients/login-patients.component';
import {UserAccountComponent} from './users/user-account/user-account.component';
import {CreateThemeComponent} from './themes/create-theme/create-theme.component';
import {EditThemeComponent} from './themes/edit-theme/edit-theme.component';
import {EditThemeListComponent} from './themes/edit-theme-list/edit-theme-list.component';
import {UserManagementComponent} from './users/user-management/user-management.component';
import {CreateQuestionComponent} from './questions/create-question/create-question.component';
import {UserQuizListComponent} from './users/user-quiz-list/user-quiz-list.component';
import {UserQuizStatComponent} from './users/user-quiz-stat/user-quiz-stat.component';
import {QuizStartComponent} from './quizzes/quiz-start/quiz-start.component';
import {EditQuizInfoComponent} from './quizzes/edit-quiz-info/edit-quiz-info.component';

const routes: Routes = [
  {path: '', redirectTo: '/quiz-list', pathMatch: 'full'},
  {path: 'quiz-list', component: QuizListComponent},
  {path: 'play-quiz/quiz-start/:quizId', component: QuizStartComponent},
  {path: 'play-quiz/:quizId', component: PlayQuizComponent},
  {path: 'edit-quiz-list', component: EditQuizListComponent},
  {path: 'create-quiz', component: CreateQuizComponent},
  {path: 'edit-quiz-info/:quizId', component: EditQuizInfoComponent},
  {path: 'question-list/:quizId', component: EditQuizComponent},
  {path: 'create-question/:quizId', component: CreateQuestionComponent},
  {path: 'edit-question/:quizId/:questionId', component: EditQuestionComponent},
  {path: 'edit-user', component: UserManagementComponent},
  {path: 'create-user', component: CreateUserComponent},
  {path: 'user-account/:userId', component: UserAccountComponent},
  {path: 'user-quiz-list/:userId', component: UserQuizListComponent},
  {path: 'user-quiz-stat/:userId/:quizId', component: UserQuizStatComponent},
  {path: 'edit-user/:userId', component: EditUserComponent},
  {path: 'edit-theme', component: EditThemeListComponent},
  {path: 'create-theme', component: CreateThemeComponent},
  {path: 'edit-theme/:themeId', component: EditThemeComponent},
  {path: 'admin/login', component: LoginComponent},
  {path: 'login', component: LoginPatientsComponent},
  {path: '**', redirectTo: '/quiz-list'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
