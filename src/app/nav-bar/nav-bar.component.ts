import { Component, HostListener, Renderer2 } from '@angular/core';
import { NavbarService } from '../navbar.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  isCollapsed = true;
  dropdownOpened = false;
  navbarTogglerState = false;
  public isScrolled = false;

  constructor(private navbarService: NavbarService, private renderer: Renderer2, private router: Router) {
    this.navbarService.dropdownOpened$.subscribe(open => {
    });
    this.navbarService.navbarTogglerState$.subscribe(state => {
      this.navbarTogglerState = state;
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isScrolled = event.url === '/contact';
        this.isCollapsed = true;
        this.navbarService.setNavbarCollapsed(this.isCollapsed);
      }
    });
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.navbarService.closeNavbarToggler();
    this.navbarService.closeAllDropdowns();
    this.isScrolled = window.scrollY > 0;
  }

  toggleDropdown(dropdown: string) {
    if (this.navbarService.isDropdownOpened(dropdown)) {
      this.navbarService.setDropdownOpened(false);
      this.navbarService.closeAllDropdowns();
    } else {
      this.navbarService.setDropdownOpened(true, dropdown);
    }
  }

  onNavbarTogglerClick() {
    this.isCollapsed = !this.isCollapsed;
    this.navbarService.setNavbarCollapsed(this.isCollapsed);
    this.navbarService.toggleNavbarToggler();
    if (!this.isCollapsed) {
      this.navbarService.closeAllDropdowns();
    }
  }
}
