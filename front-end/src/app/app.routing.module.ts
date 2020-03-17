import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { EditQuizComponent } from './quizzes/edit-quiz/edit-quiz.component';
import {CreateUserComponent} from './users/create-user/create-user.component';
import {ShowQuizComponent} from "./quizzes/show-quiz/show-quiz.component";

const routes: Routes = [
    { path: 'quiz-list', component: QuizListComponent },
    { path: 'edit-quiz/:id', component: EditQuizComponent },
    { path: '', redirectTo: '/quiz-list', pathMatch: 'full' },
    { path: 'create-user', component: CreateUserComponent },
    { path: 'show-quiz/:id', component: ShowQuizComponent }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
