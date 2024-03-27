import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';


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

  images!: string[];
  activeIndex = 0;
  autoChange = true;
  pageLoaded = false;
  intervalId: any;
  previousIndex = -1;
  firstCall = true;
  canChangeImage = false;
  zoomState: string = 'large';

  ngOnInit(): void {
    // postavljanje slika
    this.images = ['/assets/slide_01.jpg', '/assets/slide_02.jpg', '/assets/slide_03.jpg'];
    // postavljanje početne slike i pokretanje automatske promjene slika nakon 5 sekundi (disejblan carousel prvih 5 sec)
    setTimeout(() => {
      this.pageLoaded = true;
      this.activeIndex = (this.activeIndex + 1) % this.images.length;
      this.startAutoChange();
      this.canChangeImage = true;
    }, 5000);
    // pokretanje animacije zumiranja nakon 5.5 sekundi
    setTimeout(() => {
      this.zoomState = 'small';
    }, 5000);
  }

  // onZoomOutEnd se poziva kada završi animacija zumiranja
  onZoomOutEnd() {
    // resetiranje stanja zumiranja
    if (this.zoomState === 'small') {
      this.zoomState = 'large';
    }
  }

  // startAutoChange automatski mijenja slike svakih 8 sekundi
  startAutoChange() {
    this.intervalId = setInterval(() => {
      if (this.autoChange) {
        this.previousIndex = this.activeIndex;
        this.activeIndex = (this.activeIndex + 1) % this.images.length;
      }
    }, 8000);
  }

  // goToImage mijenja sliku na onu koja je kliknuta
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

  // stopAutoChange zaustavlja automatsku promjenu slika
  stopAutoChange() {
    clearInterval(this.intervalId);
  }

  // onMouseEnter se poziva kada miš ulazi u područje slike, zaustavlja automatsku promjenu slika
  onMouseEnter() {
    this.autoChange = false;
  }

  // onMouseLeave se poziva kada miš izlazi iz područja slike, pokreće automatsku promjenu slika
  onMouseLeave() {
    this.autoChange = true;
  }

  // next mijenja sliku na sljedeću
  next() {
    clearInterval(this.intervalId);
    this.previousIndex = this.activeIndex;
    this.activeIndex = (this.activeIndex + 1) % this.images.length;
    this.startAutoChange();
  }

  // previous mijenja sliku na prethodnu
  previous() {
    this.activeIndex = (this.activeIndex - 1 + this.images.length) % this.images.length;
  }

}
