import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

interface MenuItem {
  key: string;
  route?: string;
  icon?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidebar-component',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './sidebar-component.html',
  styleUrls: ['./sidebar-component.scss'],
})
export class SidebarComponent {
  @Input() collapsed = false;

  menus: MenuItem[] = [
    {
      key: 'management1',
      children: [
        { key: 'tenants', route: '/tenants' },
        { key: 'roles', route: '/roles' },
        { key: 'users', route: '/users' },
      ],
    },
    {
      key: 'configuration',
      children: [
        { key: 'countries', route: '/countries' },
        { key: 'cities', route: '/cities' },
        { key: 'areas', route: '/areas' },
      ],
    },
  ];

  activeMenu: string | null = null;

  toggleMenu(key: string) {
    if (this.activeMenu === key) {
      this.activeMenu = null;
    } else {
      this.activeMenu = key;
    }
  }
  isOpen = (key: string) => this.activeMenu === key;

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }
}
