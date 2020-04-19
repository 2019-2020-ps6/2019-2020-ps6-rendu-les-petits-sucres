import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user.model';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  public user: User;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.userService.userSelected$.subscribe((user) => this.user = user);
  }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('userId');
    this.userService.setSelectedUser(userId);
  }

}
