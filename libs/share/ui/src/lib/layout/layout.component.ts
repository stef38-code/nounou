import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import {  NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-layout',
  imports: [
    NzNoAnimationModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzMenuModule,
    NzLayoutModule,
    RouterOutlet,
    RouterLink,
    NzButtonModule,
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  isCollapsed = false;
}
