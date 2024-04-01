import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private dropdownOpenedSource = new BehaviorSubject(false);
  dropdownOpened$ = this.dropdownOpenedSource.asObservable();
  currentDropdown: string | null = null;

  setDropdownOpened(open: boolean, dropdown: string | null = null) {
    this.dropdownOpenedSource.next(open);
    this.currentDropdown = dropdown;
  }

  isDropdownOpened(dropdown: string): boolean {
    return this.currentDropdown === dropdown && this.dropdownOpenedSource.value;
  }
}