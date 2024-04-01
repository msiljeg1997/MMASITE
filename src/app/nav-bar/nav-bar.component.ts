import { Component } from '@angular/core';
import { NavbarService } from '../navbar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  constructor(private navbarService: NavbarService) {
    this.navbarService.dropdownOpened$.subscribe(open => {
      console.log('Dropdown opened1:', open);
    });

  }

  isCollapsed = true;

  dropdownOpened = false;

  toggleDropdown(dropdown: string) {
    if (this.navbarService.isDropdownOpened(dropdown)) {
      this.navbarService.setDropdownOpened(false);
    } else {
      this.navbarService.setDropdownOpened(true, dropdown);
    }
  }
}
