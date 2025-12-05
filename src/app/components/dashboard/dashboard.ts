import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from "@angular/router";
import { UserModel } from '../login/models/user.model';
import { LoginService } from '../login/service/login.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, RouterLink, MatCardModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  
})
export class Dashboard implements OnInit {
  opened = true;
  showCustomer = false;
  user!: UserModel;
  public readonly service = inject(LoginService);
  

  ngOnInit() {
    this.getUser();
    
  }
  toggleSidebar() {
    this.opened = !this.opened;
  }
  showMenu(param: string) {
    if (param === 'customers') {
      this.showCustomer = true;
    }
  }
  logout() {
    this.service.logout();
  }
  getUser() {
    const id = localStorage.getItem("id");
    if (!id) {
      console.error("Nenhum ID encontrado no localStorage!");
      return;
    }
    this.service.getUser(id).subscribe((res: any) => {
      console.log(res);
      this.user = res.user
    },
      e => {
        console.log(e);
      }
    )
  }

 
}
