import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: User;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
  }

  ngOnInit() {
  }

  logout() {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter?')) {
      this.authenticationService.logout();
      this.router.navigate(['/']).then();
    }
  }

  currentPathConnexion() {
    return !(window.location.pathname === '/admin/login' || window.location.pathname === '/login');
  }

  currentPathPlayQuiz() {
    if (window.location.pathname.includes('/play-quiz')) {
      return true;
    }
  }
}
