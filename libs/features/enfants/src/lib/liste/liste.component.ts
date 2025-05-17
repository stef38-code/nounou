import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { Enfant, EnfantService } from '@core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSpinComponent } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-enfants',
  imports: [
    CommonModule,
    NzCardModule,
    NzButtonModule,
    NzTableModule,
    NgOptimizedImage,
    NzFlexModule,
    NzToolTipModule,
    NzSpinComponent,
  ],
  templateUrl: './liste.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListeComponent {
  enfantService = inject(EnfantService);
  enfants: Signal<Enfant[]> = this.enfantService.getEnfantsSignal();
  isLoading: Signal<boolean> = this.enfantService.isLoading;

  supprimerEnfant(idEnfant: string): void {
    this.enfantService.supprimerEnfant(idEnfant);
  }

  modifierEnfant(enfant: Enfant): void {
    this.enfantService.modifierEnfant(enfant);
  }

  ajouterParents(enfant: Enfant): void {
    this.enfantService.ajouterEnfant(enfant);
  }

  modifierParents(idParent: string) {
    console.log('modifierParents', idParent);
  }

  ajouterEnfant(enfant: Enfant) {
    this.enfantService.ajouterEnfant(enfant);
  }
}
