import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceLogRoutingModule } from './service-log-routing.module';
import { ServiceLogComponent } from './service-log.component';



@NgModule({
  declarations: [ServiceLogComponent],
  imports: [
    CommonModule,
    ServiceLogRoutingModule
  ]
})
export class ServiceLogModule { }
