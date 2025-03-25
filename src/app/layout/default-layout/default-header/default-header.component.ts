import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../services/local-storage.service';

import {
  AvatarComponent,
  BadgeComponent,
  BreadcrumbRouterComponent,
  ColorModeService,
  ContainerComponent,
  DropdownComponent,
  DropdownDividerDirective,
  DropdownHeaderDirective,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  HeaderComponent,
  HeaderNavComponent,
  HeaderTogglerDirective,
  NavLinkDirective,
  SidebarToggleDirective,
  TextColorDirective,
  ThemeDirective,
} from '@coreui/angular';

import { IconDirective } from '@coreui/icons-angular';
import { GarageService } from 'src/app/services/garage.service';
import { NgIf, NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  standalone: true,
  imports: [
    ContainerComponent,
    HeaderTogglerDirective,
    SidebarToggleDirective,
    IconDirective,
    HeaderNavComponent,
    NavLinkDirective,
    NgTemplateOutlet,
    BreadcrumbRouterComponent,
    ThemeDirective,
    DropdownComponent,
    DropdownToggleDirective,
    TextColorDirective,
    AvatarComponent,
    DropdownMenuDirective,
    DropdownHeaderDirective,
    DropdownItemDirective,
    BadgeComponent,
    DropdownDividerDirective,
    NgIf, NgFor, NgClass
  ],
})
export class DefaultHeaderComponent extends HeaderComponent {
  readonly #colorModeService = inject(ColorModeService);
  readonly colorMode = this.#colorModeService.colorMode;
  public nom: string = '';
  public prenom: string = '';
  public override role: string = '';
  public idUser: string = '';

  readonly colorModes = [
    { name: 'light', text: 'Light', icon: 'cilSun' },
    { name: 'dark', text: 'Dark', icon: 'cilMoon' },
    { name: 'auto', text: 'Auto', icon: 'cilContrast' },
  ];

  notifications: any[] = [];

  readonly icons = computed(() => {
    const currentMode = this.colorMode();
    return (
      this.colorModes.find((mode) => mode.name === currentMode)?.icon ??
      'cilSun'
    );
  });

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private garageService: GarageService
  ) {
    super();
  }

  sidebarId = input('sidebar1');

  ngOnInit() {
    this.nom = this.localStorageService.getLoginInfo()?.nom ?? '';
    this.prenom = this.localStorageService.getLoginInfo()?.prenom ?? '';
    this.role = this.localStorageService.getLoginInfo()?.role ?? '';
    this.idUser = this.localStorageService.getLoginInfo()?.iduser ?? '';
    this.loadNotifications();
  }

  handleLogoutClick(event: Event) {
    event.preventDefault();
    console.log('logout clicked');
    this.localStorageService.logout();
    this.router.navigate(['/login']);
  }

  loadNotifications(): void {
    this.garageService.getNotification(this.idUser).subscribe(
      (data) => {
        this.notifications = data;
      },
      (error) => {
        console.error('Erreur de chargement des notifications', error);
      }
    );
  }

}
