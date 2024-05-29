import { Component, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  backgroundSize: string = '980px';
  isMobile = window.innerWidth < 450;
  form: FormGroup = new FormGroup({
    fullname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(''),
    message: new FormControl('', Validators.required)
  });

  constructor(private http: HttpClient) { }


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
  };
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

    this.http.post('http://your-php-backend-url', formData).subscribe(
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
        alert('There was an error submitting the form. Please try again.');
      }
    );
  }
}