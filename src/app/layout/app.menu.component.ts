import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Ana Sayfa',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/'],
                    },
                ],
            },
            {
                label: 'Teknik',
                items: [
                    {
                        label: 'Loglama',
                        icon: 'pi pi-fw pi-chart-bar',
                        items: [
                            {
                                label: 'Servis Logları',
                                icon: 'pi pi-fw pi-pencil',
                                routerLink: ['logging/service'],                               
                            },
                            {
                                label: 'Hata Logları',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['logging/error'],
                            },
                        ],
                    },
                ],
            },
            {
                label: 'Parametreler',
                items:[
                    {
                        label: 'Vergiler',
                        icon: 'pi pi-fw pi-book',
                    }
                ]
            }
        ];
    }
}
