import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class LoginComponent {
    valCheck: string[] = ['remember'];
    email!: string;
    password!: string;

    constructor(
        public layoutService: LayoutService,
        private readonly _authService: AuthService,
        private readonly _messageService: MessageService,
        private readonly _localStorageService: LocalStorageService,
        private readonly _router: Router
    ) {}

    login() {
        this._authService
            .login({ email: this.email, password: this.password })
            .subscribe({
                next: (response) => {
                    this._messageService.add({
                        severity: 'success',
                        summary: 'Başarılı',
                        detail: response.message,
                    });
                    this._localStorageService.setItem(
                        'accessToken',
                        response.data.accessToken
                    );
                    this._router.navigate(['/']);
                },
                error: (error: HttpErrorResponse) => {
                    this._messageService.add({
                        severity: 'error',
                        summary: error.error.CodeDescription,
                        detail: error.error.Detail,
                    });
                },
            });
    }
}
