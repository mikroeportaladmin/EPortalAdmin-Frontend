import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServiceLogComponent } from './service-log.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ServiceLogComponent }
    ])],
    exports: [RouterModule]
})
export class ServiceLogRoutingModule { }
