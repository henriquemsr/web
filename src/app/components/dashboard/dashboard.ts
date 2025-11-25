import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Customers } from './customers/customers';
import { RouterLink } from "@angular/router";
import { LoginService } from '../login/service/login.service';
@Component({
  selector: 'app-dashboard',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, Customers, RouterLink],
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
