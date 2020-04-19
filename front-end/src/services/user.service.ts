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

  public users$: BehaviorSubject<User[]> = new BehaviorSubject(this.users);

  public userSelected$: Subject<User> = new Subject();

  private userUrl = serverUrl + 'users/';

  constructor(private httpClient: HttpClient) {
  }

  deleteUser(user: User) {
    return this.httpClient.delete(this.userUrl + user.id, httpOptions).subscribe(() => this.setUsersFromUrl());
  }

  addUser(user: User) {
    this.httpClient.post<User>(this.userUrl, user, httpOptions).subscribe(() => this.setUsersFromUrl());
  }

  setUsersFromUrl() {
    this.httpClient.get<User[]>(this.userUrl).subscribe((users) => {
      this.users = users;
      this.users$.next(this.users);
    });
  }

  getAll() {
    return this.httpClient.get<User[]>(this.userUrl);
  }

  editUser(id: string, user: User) {
    const userUrl = this.userUrl + '/' + id;
    return this.httpClient.put(userUrl, user, httpOptions).subscribe();
  }

  setSelectedUser(userId: string) {
    const urlWithId = this.userUrl + '/' + userId;
    this.httpClient.get<User>(urlWithId).subscribe((user) => {
      this.userSelected$.next(user);
    });
  }
}
