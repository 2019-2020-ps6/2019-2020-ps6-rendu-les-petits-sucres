import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public userService: UserService) {
    this.initializeUserForm();
  }

  private initializeUserForm() {
    this.userForm = this.formBuilder.group( {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  addUser() {
    if (this.userForm.valid) {
      const userToCreate: User = this.userForm.getRawValue() as User;
      this.userService.addUser(userToCreate);
      this.initializeUserForm();
    }
  }

}
