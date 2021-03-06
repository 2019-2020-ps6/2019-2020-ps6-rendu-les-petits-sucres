import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login-patients',
  templateUrl: './login-patients.component.html',
  styleUrls: ['./login-patients.component.scss']
})
export class LoginPatientsComponent implements OnInit {

  loginForm: FormGroup;

  patients: User[] = [];

  loading = false;
  returnUrl: string;
  error = '';

  constructor(private formBuilder: FormBuilder, private userService: UserService,
              private route: ActivatedRoute, private router: Router,
              private authenticationService: AuthenticationService) {
    this.userService.patients$.subscribe((patients) => this.patients = patients);
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']).then();
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  get formFields() {
    return this.loginForm.controls;
  }

  onSubmit() {

    if (this.loginForm.invalid) {
      this.error = 'Veuillez sélectionner un patient parmi la liste';
      this.loading = false;
      return;
    }

    this.loading = true;
    this.authenticationService.loginPatient(this.formFields.username.value)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate([this.returnUrl]).then();
        });
  }
}
