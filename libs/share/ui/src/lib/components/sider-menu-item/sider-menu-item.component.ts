import { Component, input } from '@angular/core';
import { SiderMenuItem } from './sider-menu-item.model';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

/**
 * @description Composant représentant un élément de menu latéral.
 * Utilise les composants Ng-Zorro pour l'affichage des boutons et des icônes.
 *
 * @angular
 * @selector app-sider-menu-item
 */
@Component({
  selector: 'app-sider-menu-item',
  imports: [
    NzButtonComponent,
    NzIconDirective,
    NzTooltipDirective,
    RouterLink,
    NgOptimizedImage,
  ],
  templateUrl: './sider-menu-item.component.html',
  styles: ``,
})
export class SiderMenuItemComponent {
  /**
   * @property Configuration requise pour l'élément de menu
   * @type {SiderMenuItem} Objet contenant les propriétés de l'élément de menu
   */
  siderMenuItem = input.required<SiderMenuItem>();
}
