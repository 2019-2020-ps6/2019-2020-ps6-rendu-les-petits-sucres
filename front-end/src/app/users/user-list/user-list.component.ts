import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public userList: User[] = [];

  constructor(public userService: UserService) {
    this.userService.setUsersFromUrl();
    this.userService.users$.subscribe((user) => this.userList = user);

  }

  ngOnInit() {
  }

  deleteUser(selected: User) {
    this.userService.deleteUser(selected);
  }

}
