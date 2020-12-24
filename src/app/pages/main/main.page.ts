import { State, Theme } from './../../state/store.service';
import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, of, fromEvent } from 'rxjs';
import { IonTextarea } from '@ionic/angular';
import { debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/state/store.service';
import { Actions } from 'src/app/state/actions';

interface SelectCategoryError {
    message: string;
    priority: number;
}

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
})
export class MainPage {
    public selectCategoryErrors: SelectCategoryError[];
    @ViewChild('nameInput', { static: false }) nameInput: IonTextarea;
    @ViewChild('addressInput', { static: false }) addressInput: IonTextarea;
    private nameSubscription: Subscription;
    private addressSubscription: Subscription;
    public darkModeEnabled: boolean;
    private stateSubscription: Subscription;

    constructor(private translate: TranslateService, private router: Router, private store: StoreService) {}

    ionViewWillEnter() {
        this.selectCategoryErrors = [];

        this.stateSubscription = this.store
            .getState()
            .pipe(
                tap((state: State) => {
                    this.darkModeEnabled = state.theme === Theme.DARK;

                    this.nameInput.value = state.user.name;
                    this.addressInput.value = state.user.address;
                    this.checkInputErrors(state);
                })
            )
            .subscribe();
    }

    async ionViewDidEnter() {
        this.nameSubscription = fromEvent(await this.nameInput.getInputElement(), 'input')
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                switchMap(() => of(this.nameInput.value)),
                tap((name: string) => {
                    this.store.dispatch(Actions.SET_NAME, { name });
                })
            )
            .subscribe();

        this.addressSubscription = fromEvent(await this.addressInput.getInputElement(), 'input')
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                switchMap(() => of(this.addressInput.value)),
                tap((address: string) => {
                    this.store.dispatch(Actions.SET_ADDRESS, { address });
                })
            )
            .subscribe();
    }

    ionViewWillLeave() {
        this.nameSubscription.unsubscribe();
        this.addressSubscription.unsubscribe();
        this.stateSubscription.unsubscribe();
    }

    private checkInputErrors(state: State) {
        this.selectCategoryErrors = [];

        if (state.user.name === '')
            this.selectCategoryErrors.push({
                message: this.translate.instant('SELECT_CATEGORY.ERRORS.NO_NAME'),
                priority: 1,
            });

        if (state.user.address === '')
            this.selectCategoryErrors.push({
                message: this.translate.instant('SELECT_CATEGORY.ERRORS.NO_ADDRESS'),
                priority: 2,
            });

        this.selectCategoryErrors.sort((a, b) => (a.priority > b.priority ? 1 : -1));
    }

    public selectCategory(): void {
        if (this.selectCategoryErrors.length > 0) return;
        this.router.navigate(['/categories'], { replaceUrl: true });
    }

    public async toggleDarkMode(): Promise<void> {
        this.store.dispatch(Actions.SET_THEME, { theme: this.darkModeEnabled ? Theme.LIGHT : Theme.DARK });
    }
}
