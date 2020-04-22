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
      password: user ? user.password : [''],
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
      const userToCreate = this.constructUserFromForm();
      this.userService.addUser(userToCreate);
      this.initializeUserForm(null);
      alert('L\'utilisateur a bien été créé !');
    }
  }

  editUser(id: number) {
    if (this.userForm.valid) {
      const userToEdit = this.constructUserFromForm();
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

  get formFields() {
    return this.userForm.controls;
  }

  private constructUserFromForm(): User {
    const user: User = this.userForm.getRawValue() as User;
    user.username = (this.userForm.get('firstName').value.split(' ').join('_') + '.'
      + this.userForm.get('lastName').value.split('\'').join('-').split(' ').join('_'))
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    user.password = user.isAdmin ? user.password : '';
    return user;
  }
}
