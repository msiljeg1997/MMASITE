import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NavbarService } from '../navbar.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Validators } from '@angular/forms';



@Component({
  selector: 'app-naslovna',
  templateUrl: './naslovna.component.html',
  styleUrls: ['./naslovna.component.scss'],
  animations: [
    // trigger('zoomOut', [
    //   transition('void => *', [
    //     style({ transform: 'scale(1.05)' }),
    //     animate('1000ms', style({ transform: 'scale(1.05)' })), // delay of 1 second
    //     animate('8000ms ease-in-out', style({ transform: 'scale(1)' })) // zoom out over 8 seconds
    //   ])
    // ])
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
  screenWidth: number;
  form: FormGroup = new FormGroup({
    type: new FormControl('', Validators.required),
    sport: new FormControl({ value: '', disabled: true })
  });
  sportsOptions: string[] = [];
  message: string = '';
  loading = true;




  constructor(public navbarService: NavbarService, private router: Router, private http: HttpClient) {
    this.dropdownOpened$.subscribe(open => {
    });
    this.navbarService.navbarTogglerState$.subscribe(state => {
      this.navbarTogglerState = state;
    });
    this.screenWidth = window.innerWidth;
    window.onresize = () => { this.screenWidth = window.innerWidth; };
  }

  ngOnInit() {
    // setting images
    this.images = ['/assets/naslovna3.jpg', '/assets/naslovna1.jpg', '/assets/naslovna2.jpg',];
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
    }, 5500);

    // form initialization
    this.form = new FormGroup({
      type: new FormControl(''),
      sport: new FormControl({ value: '', disabled: true })
    });

    // subscribe to value changes
    this.form.get('type')?.valueChanges.subscribe(selectedType => {
      if (selectedType === 'Treninzi za djecu') {
        this.form.get('sport')?.enable();
        this.form.get('sport')?.setValue('SAMBO');
        this.sportsOptions = ['SAMBO'];
      } else {
        this.form.get('sport')?.enable(); // Enable the 'sport' control
        this.sportsOptions = ['MMA', 'SAMBO', 'COMBAT SAMBO', 'FITNESS'];
      }
    });
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

  scrollToSection() {
    if (window.innerWidth > 700) {
      const element = document.getElementById('uniquecontainerSection2Scroll');
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      const element = document.getElementById('uniquecontainerSection2');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  }
  submitForm() {
    if (!this.form.valid) {
      if (this.form.controls['email'].invalid) {
        alert('Email is not valid.');
      } else {
        alert('Please fill in all fields.');
      }
      return;
    }

    const formData = this.form.value;

    this.http.post('http://crowsklub.hr/send_mail/index.php', formData).subscribe(
      (response: any) => {
        console.log(response);
        if (response.message === 'YES') {
          alert('Form successfully submitted!');
        } else {
          alert('There was an error submitting the form. Please try again.');
        }
      },
      (error) => {
        console.error(error);
        alert('There was an SERVER error submitting the form. Please try again.');
      }
    );
  }
}