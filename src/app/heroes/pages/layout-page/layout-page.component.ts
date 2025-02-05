import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interface/User.interface';
import { AuthService } from 'src/app/auth/services/auth-service.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent implements OnInit {

  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: './list' },
    { label: 'Añadir', icon: 'add', url: './new-hero' },
    { label: 'Buscar', icon: 'search', url: './search' },
  ]
  user1: User | undefined;


  constructor(private authService: AuthService,
    private route: Router
  ) { }


  ngOnInit(): void {
    this.user1 = this.authService.currentUser

    this.authService.checkAutentication().subscribe((data) => {
      console.log({ data });

    })

  }



  onLogout(): void {

    if (this.authService.logout()) this.route.navigateByUrl('/auth');

  }

  get user(): User | undefined {
    return this.authService.currentUser
  }

}
