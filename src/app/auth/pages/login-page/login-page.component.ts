import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {

  constructor(private serviceAuth: AuthService,
    private router: Router
  ) { }



  onLogin(): void {

    this.serviceAuth.login("", "").subscribe((user) => {

      console.log("user log", user);

      if (user.id) {

        this.router.navigateByUrl("/heroes");

      }



    })

  }


}
