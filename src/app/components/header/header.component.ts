import {
  Component, Output, EventEmitter, OnInit,
} from '@angular/core';
import AuthService from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export default class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();

  isLogin: boolean = false;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.loginData$.subscribe((data) => {
      this.isLogin = !!data;
    });
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };

  logout() {
    this.authService.logout();
  }

  startAuth(): void {
    this.authService.toggleFormAuth(true);
  }
}
