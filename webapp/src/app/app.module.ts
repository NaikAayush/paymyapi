import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModalComponent } from './components/auth/auth-modal/auth-modal.component';
import { DevDashboardComponent } from './components/dev/dev-dashboard/dev-dashboard.component';
import { ApiDashboardComponent } from './components/api/api-dashboard/api-dashboard.component';
import { DevNavbarComponent } from './components/dev/dev-navbar/dev-navbar.component';
import { DevEmptyStateComponent } from './components/dev/dev-empty-state/dev-empty-state.component';
import { DevAddApiModalComponent } from './components/dev/dev-add-api-modal/dev-add-api-modal.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthModalComponent,
    DevDashboardComponent,
    ApiDashboardComponent,
    DevNavbarComponent,
    DevEmptyStateComponent,
    DevAddApiModalComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
