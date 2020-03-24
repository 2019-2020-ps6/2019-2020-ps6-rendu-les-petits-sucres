import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizListComponent} from './quizzes/quiz-list/quiz-list.component';
import {EditQuizComponent} from './quizzes/edit-quiz/edit-quiz.component';
import {CreateUserComponent} from './users/create-user/create-user.component';
import {EditQuestionComponent} from './questions/edit-question/edit-question.component';
import {CreateQuizComponent} from './quizzes/create-quiz/create-quiz.component';
import {PlayQuizComponent} from './quizzes/play-quiz/play-quiz.component';

const routes: Routes = [
    { path: 'quiz-list', component: QuizListComponent },
    { path: '', redirectTo: '/quiz-list', pathMatch: 'full' },
    { path: 'create-user', component: CreateUserComponent },
    { path: 'play-quiz/:quizId', component: PlayQuizComponent },
    { path: 'edit-quiz/:quizId', component: EditQuizComponent },
    { path: 'edit-question/:quizId/:questionId', component: EditQuestionComponent },
    { path: 'create-quiz', component: CreateQuizComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
