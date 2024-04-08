import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-sambo',
  templateUrl: './sambo.component.html',
  styleUrls: ['./sambo.component.scss']
})
export class SamboComponent {
  backgroundSize: string = '980px';
  isMobile = window.innerWidth < 450;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const target = event.target as Window | null;
    if (target) {
      const viewportWidth = target.innerWidth;
      this.backgroundSize =
        viewportWidth > 980 ? `${viewportWidth}px auto` : '980px auto';
    }
  }

  ngOnInit() {
    this.backgroundSize =
      window.innerWidth > 980 ? `${window.innerWidth}px auto` : '980px auto';
  }
}