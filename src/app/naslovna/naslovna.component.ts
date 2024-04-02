import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NavbarService } from '../navbar.service';

@Component({
  selector: 'app-naslovna',
  templateUrl: './naslovna.component.html',
  styleUrls: ['./naslovna.component.scss'],
  animations: [
    trigger('zoomOut', [
      transition('void => *', [
        style({ transform: 'scale(1.05)' }),
        animate('1000ms', style({ transform: 'scale(1.05)' })), // delay of 1 second
        animate('8000ms ease-in-out', style({ transform: 'scale(1)' })) // zoom out over 8 seconds
      ])
    ])
  ]
})
export class NaslovnaComponent implements OnInit {

  //DEPENDENCIES BROWSERANIMATIONMODULE, NAVBARSERVICE

  images!: string[];
  activeIndex = 0;
  autoChange = true;
  pageLoaded = false;
  intervalId: any;
  previousIndex = -1;
  firstCall = true;
  canChangeImage = false;
  zoomState: string = 'large';
  dropdownOpened$ = this.navbarService.dropdownOpened$;
  navbarTogglerState = false;


  constructor(public navbarService: NavbarService) {
    this.dropdownOpened$.subscribe(open => {
      console.log('Dropdown opened2:', open);
    });
    this.navbarService.navbarTogglerState$.subscribe(state => {
      this.navbarTogglerState = state;
    });
  }

  ngOnInit(): void {
    // setting images
    this.images = ['/assets/slide_01.jpg', '/assets/slide_02.jpg', '/assets/slide_03.jpg'];
    // setting the initial image and starting automatic image change after 5 seconds (carousel disabled for the first 5 sec)
    setTimeout(() => {
      this.pageLoaded = true;
      this.activeIndex = (this.activeIndex + 1) % this.images.length;
      this.startAutoChange();
      this.canChangeImage = true;
    }, 5000);
    // starting zoom animation after 5.5 seconds
    setTimeout(() => {
      this.zoomState = 'small';
    }, 5000);
  }
  // onZoomOutEnd is called when the zoom animation ends
  onZoomOutEnd() {
    // resetting zoom state
    if (this.zoomState === 'small') {
      this.zoomState = 'large';
    }
  }
  // startAutoChange automatically changes images every 8 seconds
  startAutoChange() {
    this.intervalId = setInterval(() => {
      if (this.autoChange) {
        this.previousIndex = this.activeIndex;
        this.activeIndex = (this.activeIndex + 1) % this.images.length;
      }
    }, 8000);
  }
  // goToImage changes the image to the one that was clicked
  goToImage(index: number) {
    if (!this.canChangeImage || index === this.activeIndex) {
      return;
    }
    clearInterval(this.intervalId);
    this.previousIndex = this.activeIndex;
    this.activeIndex = index;
    this.zoomState = 'large';
    setTimeout(() => {
      this.startAutoChange();
    }, 1000);
  }
  // stopAutoChange stops automatic image change
  stopAutoChange() {
    clearInterval(this.intervalId);
  }
  // onMouseEnter is called when the mouse enters the image area, stops automatic image change
  onMouseEnter() {
    this.autoChange = false;
  }
  // onMouseLeave is called when the mouse leaves the image area, starts automatic image change
  onMouseLeave() {
    this.autoChange = true;
  }
  // next changes the image to the next one
  next() {
    clearInterval(this.intervalId);
    this.previousIndex = this.activeIndex;
    this.activeIndex = (this.activeIndex + 1) % this.images.length;
    this.startAutoChange();
  }
  // previous changes the image to the previous one
  previous() {
    this.activeIndex = (this.activeIndex - 1 + this.images.length) % this.images.length;
  }
}