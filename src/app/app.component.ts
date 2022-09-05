import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export default class AppComponent {
  title = 'rs-lang';

  constructor(private _router: Router) { }

  hasRoute(routes: string[]) {
    let isInclude = false;
    routes.forEach((route) => {
      if (this._router.url.includes(route)) {
        isInclude = true;
      }
    });
    return isInclude;
  }
}
