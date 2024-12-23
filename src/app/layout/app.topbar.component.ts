import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private readonly _authService: AuthService,
        private readonly _router: Router
    ) {}

    logout() {
        this._authService.logout().subscribe({
            next: () => {
                this._authService.clearSession();
                this._router.navigate(['/auth/login']);
            },
        });
    }

    refreshToken() {
        this._authService.refreshToken().subscribe((res) => {
            console.log(res);
        });
    }
}
