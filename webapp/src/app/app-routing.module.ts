import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiDashboardComponent } from './components/api/api-dashboard/api-dashboard.component';
import { AuthModalComponent } from './components/auth/auth-modal/auth-modal.component';
import { DevDashboardComponent } from './components/dev/dev-dashboard/dev-dashboard.component';

const routes: Routes = [
  { path: '', component: AuthModalComponent },
  { path: 'dev', component: DevDashboardComponent },
  { path: 'api/:id', component: ApiDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
