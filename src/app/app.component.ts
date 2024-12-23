import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig,private readonly _authService:AuthService) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
        // this._authService.getUsers().subscribe(res=>(console.log(res)))
    }
}
