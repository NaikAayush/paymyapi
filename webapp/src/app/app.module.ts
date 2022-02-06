import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModalComponent } from './components/auth/auth-modal/auth-modal.component';
import { DevDashboardComponent } from './components/dev/dev-dashboard/dev-dashboard.component';
import { ApiDashboardComponent } from './components/api/api-dashboard/api-dashboard.component';

@NgModule({
  declarations: [AppComponent, AuthModalComponent, DevDashboardComponent, ApiDashboardComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
