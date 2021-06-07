import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetIsNotificationTapped, SetLanguage } from '../actions/app.action';

export class AppStateModel {
    language: string;
    is_notification_tapped: boolean;
}

@State<AppStateModel>({
    name: 'app',
    defaults: {
        language: 'en',
        is_notification_tapped: false,
    }
})
@Injectable()
export class AppState {

    @Selector()
    static language(state: AppStateModel) {
        return state.language;
    }

    @Selector()
    static isNotificationTapped(state: AppStateModel) { return state.is_notification_tapped; }

    constructor() {

    }

    @Action(SetLanguage)
    setLanguage(ctx: StateContext<AppStateModel>, { language }: SetLanguage) {
        ctx.patchState({ language });
    }

    @Action(SetIsNotificationTapped)
    setIsNotificationTapped(ctx: StateContext<AppStateModel>, { isTapped }: SetIsNotificationTapped) {
        ctx.patchState({
            is_notification_tapped: isTapped
        });
    }

}
