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
import {ThemeListComponent} from './themes/theme-list/theme-list.component';
import {EditThemeComponent} from './themes/edit-theme/edit-theme.component';
import {UserManagementComponent} from './users/user-management/user-management.component';


const routes: Routes = [
  {path: 'quiz-list', component: QuizListComponent},
  {path: 'theme-list', component: ThemeListComponent},
  {path: '', redirectTo: '/quiz-list', pathMatch: 'full'},
  {path: 'create-user', component: CreateUserComponent},
  {path: 'edit-user/:userId', component: EditUserComponent},
  {path: 'play-quiz/:quizId', component: PlayQuizComponent},
  {path: 'edit-quiz/:quizId', component: EditQuizComponent},
  {path: 'edit-question/:quizId/:questionId', component: EditQuestionComponent},
  {path: 'create-quiz', component: CreateQuizComponent},
  {path: 'create-theme', component: CreateThemeComponent},
  {path: 'edit-quiz', component: EditQuizListComponent},
  {path: 'edit-theme/:themeId', component: EditThemeComponent},
  {path: 'admin/login', component: LoginComponent},
  {path: 'login', component: LoginPatientsComponent},
  {path: 'my-account', component: UserAccountComponent},
  {path: 'edit-user', component: UserManagementComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
