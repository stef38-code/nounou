import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterOutlet } from '@angular/router';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { SiderMenuItemComponent } from '../components/sider-menu-item/sider-menu-item.component';
import { SiderMenuItem } from '../components/sider-menu-item/sider-menu-item.model';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [
    NzNoAnimationModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzMenuModule,
    NzLayoutModule,
    RouterOutlet,
    NzButtonModule,
    NzToolTipModule,
    SiderMenuItemComponent,
    NgOptimizedImage,
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  isCollapsed = false;
  sections: SiderMenuItem[] = [
    { label: 'Accueil', link: '/accueil', icon: '/home.png' },
    { label: 'Enfants', link: '/enfants', icon: '/enfants.png' },
    { label: 'Parents', link: '/parents', icon: '/parents.png' },
  ];
}
