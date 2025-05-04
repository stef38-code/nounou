import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { EnfantService } from '@core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

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
  ],
  templateUrl: './enfants.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnfantsComponent {
  enfantService = inject(EnfantService);
  enfants = this.enfantService.getEnfantsSignal();

  supprimerEnfant(idEnfant: string): void {
    this.enfantService.supprimer(idEnfant);
  }

  modifierEnfant(idEnfant: string): void {
    console.log('modifierEnfant', idEnfant);
  }

  ajouterParents(idEnfant: string): void {
    console.log('ajouterParents', idEnfant);
  }

  modifierParents(idParent: string) {
    console.log('modifierParents', idParent);
  }

  ajouterEnfant() {
    console.log('ajouterEnfant');
  }
}
