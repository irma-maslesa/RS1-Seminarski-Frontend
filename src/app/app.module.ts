import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { GradModule } from './pages/grad/grad.module';
import { KlubModule } from './pages/klub/klub.module';
import { KorisnikModule } from './pages/korisnik/korisnik.module';
import { LigaModule } from './pages/liga/liga.module';
import { MenuItemComponent } from './pages/menu/menu-item/menu-item.component';
import { MenuComponent } from './pages/menu/menu.component';
import { SezonaModule } from './pages/sezona/sezona.module';
import { SharedModule } from './pages/shared/shared.module';
import { StadionModule } from './pages/stadion/stadion.module';
import { TrenerModule } from './pages/trener/trener.module';
import { UtakmicaModule } from './pages/utakmica/utakmica.module';
import { appRoutes } from './routes';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MenuItemComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    ToastrModule.forRoot(),
    AgGridModule.withComponents([]),
    HttpClientModule,
    TrenerModule,
    GradModule,
    StadionModule,
    LigaModule,
    KlubModule,
    SezonaModule,
    UtakmicaModule,
    KorisnikModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
