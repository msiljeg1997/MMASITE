import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaslovnaComponent } from './naslovna/naslovna.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './homepage/homepage.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { MmaComponent } from './mma/mma.component';
import { SamboComponent } from './sambo/sambo.component';
import { CombatSamboComponent } from './combat-sambo/combat-sambo.component';
import { FitnessComponent } from './fitness/fitness.component';
import { ZaOdrasleComponent } from './za-odrasle/za-odrasle.component';
import { ZaDjecuComponent } from './za-djecu/za-djecu.component';
import { OnlineComponent } from './online/online.component';
import { IndividualniComponent } from './individualni/individualni.component';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    NaslovnaComponent,
    NavBarComponent,
    HomepageComponent,
    FooterComponent,
    ContactComponent,
    MmaComponent,
    SamboComponent,
    CombatSamboComponent,
    FitnessComponent,
    ZaOdrasleComponent,
    ZaDjecuComponent,
    OnlineComponent,
    IndividualniComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbDropdownModule,
    BrowserAnimationsModule,



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
