import { Component, inject } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Enfant, Parent } from '@core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { fr_FR, NzI18nService } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-details',
  imports: [NzFormModule, ReactiveFormsModule, NzInputModule, NzDatePickerModule, NzSelectModule, NzButtonModule],
  templateUrl: './details.component.html',
})
export class DetailsComponent {
  nzI18nService = inject(NzI18nService);
  enfantForm!: FormGroup;
  sexeOptions = [
    { label: 'Masculin', value: 'M' },
    { label: 'Féminin', value: 'F' },
  ];
  parents: Parent[] = [];

  constructor(readonly fb: FormBuilder) {
    this.enfantForm = this.fb.group({
      id: [{ value: '', disabled: true }, Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaissance: [null, Validators.required],
      sexe: [null, Validators.required],
      parents: [[]],
    });
    this.nzI18nService.setLocale(fr_FR);
  }

  onSubmit(): void {
    if (this.enfantForm.valid) {
      const enfant: Enfant = this.enfantForm.getRawValue();
      console.log('Données envoyées : ', enfant);
      // Appelez un service ou une API pour traiter les données
    }
  }

  onReset(): void {
    this.enfantForm.reset();
  }
}
