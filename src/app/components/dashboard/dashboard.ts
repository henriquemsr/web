import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from "@angular/router";
import { LoginService } from '../login/service/login.service';
@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet,MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  opened = true;
  showCustomer = false;
  public readonly service = inject(LoginService);
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
}
