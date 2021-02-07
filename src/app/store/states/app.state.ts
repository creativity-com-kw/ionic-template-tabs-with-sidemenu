import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetIsNotificationTapped } from '../actions/app.action';

export class AppStateModel {
    is_notification_tapped: boolean;
}

@State<AppStateModel>({
    name: 'app',
    defaults: {
        is_notification_tapped: false,
    }
})
@Injectable()
export class AppState {

    @Selector()
    static isNotificationTapped(state: AppStateModel) { return state.is_notification_tapped; }

    constructor() {

    }

    @Action(SetIsNotificationTapped)
    setIsNotificationTapped(ctx: StateContext<AppStateModel>, { isTapped }: SetIsNotificationTapped) {
        ctx.patchState({
            is_notification_tapped: isTapped
        });
    }

}
