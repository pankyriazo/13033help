import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { StoreService, Action, Theme } from './store.service';
import { Actions } from './actions';
import { Storage } from '@ionic/storage';
import { SMS } from '@ionic-native/sms/ngx';
import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root',
})
export class ReducersService {
    constructor(private store: StoreService, private storage: Storage, private sms: SMS, private alertController: AlertController, private translate: TranslateService) {
        this.store.getEvents().subscribe(async (action: Action) => {
            switch (action.type) {
                case Actions.SET_THEME: {
                    if (!action.payload || action.payload.theme === undefined) return;

                    this.store.setState({
                        theme: action.payload.theme,
                    });

                    if (action.payload.theme === Theme.DARK && !document.body.classList.contains('dark')) document.body.classList.add('dark');
                    if (action.payload.theme !== Theme.DARK) document.body.classList.remove('dark');

                    this.storage.set('darkModeEnabled', action.payload.theme === Theme.DARK);

                    break;
                }

                case Actions.SET_NAME: {
                    if (!action.payload || action.payload.name === undefined) return;

                    this.store.setState({
                        user: {
                            ...store.state.user,
                            ...{
                                name: action.payload.name,
                            },
                        },
                    });

                    this.storage.set('name', action.payload.name);

                    break;
                }

                case Actions.SET_ADDRESS: {
                    if (!action.payload || action.payload.address === undefined) return;

                    this.store.setState({
                        user: {
                            ...store.state.user,
                            ...{
                                address: action.payload.address,
                            },
                        },
                    });

                    this.storage.set('address', action.payload.address);

                    break;
                }

                case Actions.SEND_MESSAGE: {
                    if (!action.payload || action.payload.category === undefined || ![1, 2, 3, 4, 5, 6].includes(action.payload.category)) return;

                    const message: string = `${action.payload.category} ${store.state.user.name} ${store.state.user.address}`;

                    this.sms
                        .send('13033', message, {
                            replaceLineBreaks: false,
                            android: {
                                intent: 'INTENT',
                            },
                        })
                        .catch(() => {
                            this.alertController
                                .create({
                                    header: this.translate.instant('MESSAGE_ERROR.MESSAGE'),
                                    buttons: [
                                        {
                                            text: this.translate.instant('MESSAGE_ERROR.CLOSE'),
                                            role: 'cancel',
                                        },
                                    ],
                                })
                                .then((alert) => {
                                    alert.present();
                                });
                        });

                    break;
                }

                default:
                    break;
            }
        });
    }
}
