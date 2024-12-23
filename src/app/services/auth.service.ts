import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PortalHttpClientService } from './portal-http-client.service';
import { LoginModel, LoginResponseModel } from '../models/auth/login.model';
import { CookieService } from './cookie.service';
import { SingleResponseModel } from '../models/response/single-response.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private readonly _portalHttp: PortalHttpClientService,
        private readonly _cookieService: CookieService
    ) {}

    login(
        loginModel: LoginModel
    ): Observable<SingleResponseModel<LoginResponseModel>> {
        return this._portalHttp.post<SingleResponseModel<LoginResponseModel>>(
            {
                controllerName: 'authorization-management',
                action: 'login',
                options: {
                    withCredentials: true,
                },
            },
            loginModel
        );
    }

    logout() {
        return this._portalHttp
            .put({
                controllerName: 'authorization-management',
                action: 'revoke-token',
                options: {
                    withCredentials: true,
                },
            })
    }

    refreshToken(): Observable<any> {
        return this._portalHttp.get({
            controllerName: 'authorization-management',
            action: 'refresh-token',
            options: {
                withCredentials: true,
            },
        });
    }

    getRefreshTokenFromCookies(): string | null {
        return this._cookieService.getCookie('refreshToken');
    }

    setAccessTokenToStorage(token: string) {
        localStorage.setItem('accessToken', token);
    }

    clearSession() {
        localStorage.removeItem('accessToken');
        this._cookieService.deleteCookie('refreshToken');
    }

    getUsers() {
        return this._portalHttp.get({
            controllerName: 'user-management',
            action: 'users',
        });
    }
}
