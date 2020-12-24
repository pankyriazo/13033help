import { Actions } from './actions';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export enum Theme {
    DARK = 'dark',
    LIGHT = 'light',
}

export interface User {
    name: string;
    address: string;
}

export interface Action {
    type: Actions;
    payload?: any;
}

export interface State {
    theme: Theme;
    user: User;
}
const initialState = {
    theme: Theme.LIGHT,
    user: {
        name: '',
        address: '',
    },
};

@Injectable({
    providedIn: 'root',
})
export class StoreService {
    private state$: BehaviorSubject<State>;
    private events$: Subject<Action>;

    constructor() {
        this.state$ = new BehaviorSubject<State>(initialState);
        this.events$ = new Subject<Action>();
    }

    public getEvents(): Observable<Action> {
        return this.events$.asObservable();
    }

    public get state(): State {
        return this.state$.getValue();
    }

    public getState(): Observable<State> {
        return this.state$.asObservable();
    }

    public setState(newState: Partial<State>) {
        this.state$.next({
            ...this.state,
            ...newState,
        });
    }

    public async dispatch(type: Actions, payload?: any): Promise<void> {
        this.events$.next({ type, payload });
    }
}
