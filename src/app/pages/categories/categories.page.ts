import { StoreService } from 'src/app/state/store.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Actions } from 'src/app/state/actions';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.page.html',
    styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage {
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

    constructor(private store: StoreService, private navController: NavController) {}

    public goBack(): void {
        this.navController.back();
    }

    public sendMessage(category: number): void {
        this.store.dispatch(Actions.SEND_MESSAGE, { category });
    }
}
