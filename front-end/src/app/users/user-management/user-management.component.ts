import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user.model';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  public userList: User[] = [];
  public page: number;
  public pageSize = 10;
  public nbPageTotal: number;
  public userLength: number;

  constructor(private router: Router, public userService: UserService) {
    if (localStorage.getItem('userListSearch') !== null) {
      this.userList = localStorage.getItem('userListSearch') && JSON.parse(localStorage.getItem('userListSearch'));
      this.userLength = this.userList.length;
      this.nbPageTotal = (this.userLength / this.pageSize) - ((this.userLength % this.pageSize) / this.pageSize) + 1;
    } else {
      this.userService.users$.subscribe((users: User[]) => {
        this.userList = users;
        this.userLength = users.length;
        this.nbPageTotal = (this.userLength / this.pageSize) - ((this.userLength % this.pageSize) / this.pageSize) + 1;
      });
    }
    this.page = 1;
  }

  ngOnInit() {
  }

  editUser(user: User) {
    this.router.navigate(['/edit-user/' + user.id]);
  }

  deleteUser(user: User) {
    if (localStorage.getItem('userListSearch') !== null) {
      localStorage.setItem('userListSearch', JSON.stringify(JSON.parse(localStorage.getItem('userListSearch'))
        .filter((storedUser) => storedUser.id !== user.id)));
      this.userList = localStorage.getItem('userListSearch') && JSON.parse(localStorage.getItem('userListSearch'));
    }
    this.userService.deleteUser(user);
  }

  nextPage() {
    if (this.page * this.pageSize < this.userList.length) {
      this.page = this.page + 1;
      if (this.page * this.pageSize < this.userList.length) {
        return true;
      }
      return true;
    }
  }

  backPage() {
    if (this.page !== 1) {
      this.page = this.page - 1;
      return true;
    }
  }

  showPage(i: number) {
    this.page = i + 1;
  }

  counter(i: number) {
    return new Array(i);
  }

  seeUserStats(user: User) {
    this.router.navigate(['/user-account/' + user.id]);
  }
}
