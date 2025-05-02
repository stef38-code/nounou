import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { EnfantService } from '@core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-enfants',
  imports: [CommonModule, NzCardModule, NzButtonModule,NzTableModule],
  templateUrl: './enfants.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnfantsComponent {
  enfantService = inject(EnfantService);
  enfants = this.enfantService.getEnfantsSignal();
}
