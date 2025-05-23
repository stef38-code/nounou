import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import fr from '@angular/common/locales/fr';

import { provideNzIcons } from 'ng-zorro-antd/icon';
import { fr_FR, NZ_I18N, provideNzI18n } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { loggerHttpInterceptor } from '@core';

registerLocaleData(fr);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map((key) => antDesignIcons[key]);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    //provideHttpClient(withJsonpSupport()),
    provideHttpClient(withInterceptors([loggerHttpInterceptor])),
    provideAnimationsAsync(),
    provideNzIcons(icons),
    provideNzI18n(fr_FR),
    { provide: NZ_I18N, useValue: fr_FR },
  ],
};
