import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { ApiService } from 'src/app/providers/api.service';
import { GetData } from '../actions/data.action';

export class DataStateModel {
    cms: any[];
    settings: any;
}

@State<DataStateModel>({
    name: 'data',
    defaults: {
        cms: null,
        settings: null
    }
})
@Injectable()
export class DataState {

    @Selector()
    static aboutUs(state: DataStateModel) { return state.cms[0]; }

    @Selector()
    static termsConditions(state: DataStateModel) { return state.cms[1]; }

    @Selector()
    static privacyPolicy(state: DataStateModel) { return state.cms[2]; }

    @Selector()
    static settings(state: DataStateModel) { return state.settings; }

    constructor(private apiService: ApiService) {

    }

    @Action(GetData)
    getData(ctx: StateContext<DataStateModel>) {
        const data = ctx.getState();

        if (data.cms !== null) {
            return;
        }

        return this.apiService.init().pipe(tap((response) => {
            ctx.patchState({
                cms: response.cms,
                settings: response.settings
            });
        }));
    }

}
