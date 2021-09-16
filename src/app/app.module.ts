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
import { HomeComponent } from './pages/home/home.component';
import { MenuItemComponent } from './pages/menu/menu-item/menu-item.component';
import { MenuComponent } from './pages/menu/menu.component';
import { SharedModule } from './pages/shared/shared.module';
import { TrenerModule } from './pages/trener/trener.module';
import { appRoutes } from './routes';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MenuItemComponent,
    HomeComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    ToastrModule.forRoot(),
    AgGridModule.withComponents([]),
    HttpClientModule,
    TrenerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
