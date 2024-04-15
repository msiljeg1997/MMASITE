import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ContactComponent } from './contact/contact.component';
import { MmaComponent } from './mma/mma.component';
import { SamboComponent } from './sambo/sambo.component';
import { CombatSamboComponent } from './combat-sambo/combat-sambo.component';
import { FitnessComponent } from './fitness/fitness.component';
import { ZaOdrasleComponent } from './za-odrasle/za-odrasle.component';
import { ZaDjecuComponent } from './za-djecu/za-djecu.component';
import { OnlineComponent } from './online/online.component';
import { IndividualniComponent } from './individualni/individualni.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'mma', component: MmaComponent },
  { path: 'sambo', component: SamboComponent },
  { path: 'combat_sambo', component: CombatSamboComponent },
  { path: 'fitness', component: FitnessComponent },
  { path: 'za_odrasle', component: ZaOdrasleComponent },
  { path: 'za-djecu', component: ZaDjecuComponent },
  { path: 'online-treninzi', component: OnlineComponent },
  { path: 'individualni-treninzi', component: IndividualniComponent },
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'top',
};
@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
