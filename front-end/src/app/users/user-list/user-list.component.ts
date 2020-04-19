import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {
  public userList: User[] = [];

  constructor(private router: Router, private userService: UserService) {
    this.userService.setUsersFromUrl();
    this.userService.users$.subscribe((users) => this.userList = users);
  }

  ngOnInit() {
  }

  editQuiz(user: User) {
    this.router.navigate(['/edit-user/' + user.id]);
  }

  deleteUser(selected: User) {
    this.userService.deleteUser(selected);
  }

}
