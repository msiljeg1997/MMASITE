import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// NAVBAR I UPRAVLJANJE SCSSOM U NASLOVNA COMPONENTI
export class NavbarService {

  private dropdownOpenedSource = new BehaviorSubject(false);
  dropdownOpened$ = this.dropdownOpenedSource.asObservable();
  currentDropdown: string | null = null;

  private navbarTogglerStateSource = new BehaviorSubject(false);
  navbarTogglerState$ = this.navbarTogglerStateSource.asObservable();

  private navbarCollapsedSource = new BehaviorSubject(true);
  navbarCollapsed$ = this.navbarCollapsedSource.asObservable();

  setDropdownOpened(open: boolean, dropdown: string | null = null) {
    this.dropdownOpenedSource.next(open);
    this.currentDropdown = dropdown;
  }

  isDropdownOpened(dropdown: string): boolean {
    return this.currentDropdown === dropdown && this.dropdownOpenedSource.value;
  }

  toggleNavbarToggler() {
    this.navbarTogglerStateSource.next(!this.navbarTogglerStateSource.value);
  }

  closeNavbarToggler() {
    this.navbarTogglerStateSource.next(false);
  }
  closeAllDropdowns() {
    this.setDropdownOpened(false);
    this.currentDropdown = null;
  }

  setNavbarCollapsed(collapsed: boolean) {
    this.navbarCollapsedSource.next(collapsed);
  }

  isNavbarCollapsed(): boolean {
    return this.navbarCollapsedSource.value;
  }


}