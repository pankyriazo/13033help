import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { StoreService, Theme } from './state/store.service';
import { Actions } from './state/actions';
import { ReducersService } from './state/reducers.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    constructor(private platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar, private storage: Storage, private reducers: ReducersService, private store: StoreService, private router: Router) {
        this.initializeApp();
    }

    private async initializeState(): Promise<void> {
        this.store.dispatch(Actions.SET_THEME, {
            theme: (await this.storage.get('darkModeEnabled')) === null ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.DARK : Theme.LIGHT) : (await this.storage.get('darkModeEnabled')) ? Theme.DARK : Theme.LIGHT,
        });

        this.store.dispatch(Actions.SET_NAME, {
            name: (await this.storage.get('name')) || '',
        });

        this.store.dispatch(Actions.SET_ADDRESS, {
            address: (await this.storage.get('address')) || '',
        });

        if ((await this.storage.get('name')) !== '' && (await this.storage.get('address')) !== '') this.router.navigate(['/categories']);
        else this.router.navigate(['/main']);
    }

    async initializeApp() {
        this.initializeState();

        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
}
