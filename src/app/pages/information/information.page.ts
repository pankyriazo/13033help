import { Component } from '@angular/core';
import { StoreService } from 'src/app/state/store.service';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-information',
    templateUrl: './information.page.html',
    styleUrls: ['./information.page.scss'],
})
export class InformationPage {
    public categories = [
        {
            number: 1,
            icon: 'bandage',
            bgColor: '#43949F',
            color: '#fff',
        },
        {
            number: 2,
            icon: 'cart',
            bgColor: '#EC6A45',
            color: '#fff',
        },
        {
            number: 3,
            icon: 'business',
            bgColor: '#53534F',
            color: '#fff',
        },
        {
            number: 4,
            icon: 'git-pull-request',
            bgColor: '#67509D',
            color: '#fff',
        },
        {
            number: 5,
            icon: 'person-circle',
            bgColor: '#EA65A4',
            color: '#fff',
        },
        {
            number: 6,
            icon: 'walk',
            bgColor: '#388246',
            color: '#fff',
        },
    ];

    constructor(private navController: NavController) {}

    public goBack(): void {
        this.navController.back();
    }
}
