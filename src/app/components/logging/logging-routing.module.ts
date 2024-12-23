import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'service', loadChildren: () => import('./service-log/service-log.module').then(m => m.ServiceLogModule) },
        { path: 'error', loadChildren: () => import('./error-log/error-log.module').then(m => m.ErrorLogModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class LoggingRoutingModule { }
