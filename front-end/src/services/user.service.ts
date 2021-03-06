import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {BehaviorSubject, Subject} from 'rxjs';
import {httpOptions, serverUrl} from '../configs/server.config';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [];
  private patients: User[] = [];

  public users$: BehaviorSubject<User[]> = new BehaviorSubject(this.users);
  public patients$: BehaviorSubject<User[]> = new BehaviorSubject(this.patients);

  public userSelected$: Subject<User> = new Subject();

  private userUrl = serverUrl + 'users/';

  constructor(private http: HttpClient) {
    this.setUsersFromUrl();
  }

  deleteUser(user: User) {
    this.http.delete(this.userUrl + user.id, httpOptions).subscribe(() => this.setUsersFromUrl());
    this.setUsersFromUrl();
  }

  addUser(user: User) {
    this.http.post<User>(this.userUrl, user, httpOptions).subscribe(() => this.setUsersFromUrl());
    this.setUsersFromUrl();
  }

  setUsersFromUrl() {
    this.http.get<User[]>(this.userUrl).subscribe((users) => {
      this.users = users;
      this.patients = users.filter(user => !user.isAdmin);
      this.users$.next(this.users);
      this.patients$.next(this.patients);
    });
  }

  editUser(id: string, user: User) {
    const userUrl = this.userUrl + '/' + id;
    this.http.put(userUrl, user, httpOptions).subscribe(() => this.setSelectedUser(id));
    this.setUsersFromUrl();
  }

  setSelectedUser(userId: string) {
    const urlWithId = this.userUrl + '/' + userId;
    this.http.get<User>(urlWithId).subscribe((user) => {
      this.userSelected$.next(user);
    });
  }
}
