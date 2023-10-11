
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiveFeedComponent } from './live-feed/live-feed.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    {
        path: "",
        redirectTo: "live-feed",
        pathMatch: "full"
    },
    {
        path: "live-feed",
        component: LiveFeedComponent
    },
    {
        path: "dashboard",
        component: DashboardComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
