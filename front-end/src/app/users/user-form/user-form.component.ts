import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Input()
  user: User;

  userForm: FormGroup;
  hide = true;

  constructor(public formBuilder: FormBuilder, public userService: UserService, private location: Location) {
    this.initializeUserForm(null);
  }

  private initializeUserForm(user: User) {
    this.userForm = this.formBuilder.group( {
      firstName: user ? user.firstName : ['', Validators.required],
      lastName: user ? user.lastName : ['', Validators.required],
      username: user ? user.username : [''],
      password: user ? user.password : ['', Validators.required],
      isAdmin: user ? user.isAdmin : false,
    });
  }

  ngOnInit() {
    if (this.user) {
      this.applyFormValues(this.user);
    }
  }

  addUser() {
    if (this.userForm.valid) {
      const userToCreate: User = this.userForm.getRawValue() as User;
      userToCreate.username = (this.userForm.get('firstName').value + '.' + this.userForm.get('lastName').value).toLowerCase();
      this.userService.addUser(userToCreate);
      this.initializeUserForm(null);
    }
  }

  editUser(id: number) {
    if (this.userForm.valid) {
      const userToEdit: User = this.userForm.getRawValue() as User;
      userToEdit.username = (this.userForm.get('firstName').value + '.' + this.userForm.get('lastName').value).toLowerCase();
      this.userService.editUser(String(id), userToEdit);
      this.location.back();
    }
  }

  private applyFormValues(user: User) {
    this.userForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      password: user.password,
      isAdmin: user.isAdmin
    });
  }
}
