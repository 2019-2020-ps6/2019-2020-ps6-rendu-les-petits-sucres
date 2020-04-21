import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {

  private userList: User[] = [];
  private newUserList: User[] = [];
  private searchForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public userService: UserService) {
    this.initializeSearchForm();
    this.userService.users$.subscribe((users) => {
      this.userList = users;
    });
  }

  private initializeSearchForm() {
    this.searchForm = this.formBuilder.group({
      search: []
    });
  }

  ngOnInit() {
  }

  get valueSearch(): FormArray {
    return this.searchForm.get('search').value as FormArray;
  }

  applySearch() {
    localStorage.removeItem('requestUserSearch');
    localStorage.removeItem('userListSearch');
    if (this.searchForm.valid) {
      for (const user of this.userList) {
        const userName = user.firstName + ' ' + user.lastName;
        if (userName.toLowerCase().includes(this.valueSearch.toString())) {
          console.log('Vrai');
          this.newUserList.push(user);
        }
      }
      console.log((this.newUserList));
      localStorage.setItem('userListSearch', JSON.stringify(this.newUserList));
      localStorage.setItem('requestUserSearch', this.valueSearch.toString());
    }
    document.location.reload();
  }

  localStorage() {
    return localStorage.getItem('userListSearch') !== null;
  }

  getResearch() {
    return localStorage.getItem('requestUserSearch');
  }

  deleteSearch() {
    localStorage.removeItem('requestUserSearch');
    localStorage.removeItem('userListSearch');
    document.location.reload();
  }
}
