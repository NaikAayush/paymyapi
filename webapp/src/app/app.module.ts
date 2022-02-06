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
import { ToastComponent } from './components/toast/toast.component';

import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { DevApiListComponent } from './components/dev/dev-api-list/dev-api-list.component';

function createApollo(): ApolloClientOptions<unknown> {
  return {
    uri: 'https://api.thegraph.com/subgraphs/name/naikaayush/paymyapi',
    cache: new InMemoryCache(),
  };
}

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
    ToastComponent,
    DevApiListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [{ provide: APOLLO_OPTIONS, useFactory: createApollo }],
  bootstrap: [AppComponent],
})
export class AppModule {}
