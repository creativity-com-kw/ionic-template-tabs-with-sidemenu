import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { StateResetAll } from 'ngxs-reset-plugin';
import { tap } from 'rxjs/operators';
import { ApiService } from 'src/app/providers/api.service';
import { ChangePassword, Login, Logout, Reset } from '../actions/auth.action';
import { DataState } from './data.state';

export class AuthStateModel {
    token?: string | null;
    user?: any | null;
}

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        token: null,
        user: null
    }
})
@Injectable()
export class AuthState {

    private jwtHelperService: any;

    @Selector()
    static token(state: AuthStateModel) { return state.token; }

    @Selector()
    static user(state: AuthStateModel) { return state.user; }

    @Selector()
    static isAuthenticated(state: AuthStateModel) { return !!state.token; }

    constructor(private store: Store, private apiService: ApiService) {
        this.jwtHelperService = new JwtHelperService();
    }

    @Action(Login, { cancelUncompleted: true })
    login(ctx: StateContext<AuthStateModel>, { jwt }: Login) {
        const decodedToken = this.jwtHelperService.decodeToken(jwt);

        ctx.patchState({
            token: jwt,
            user: decodedToken.user
        });
    }

    @Action(Logout)
    logout(ctx: StateContext<AuthStateModel>) {
        return this.apiService.logout().pipe(tap((response) => {
            // To reset all states to their defaults but keep one
            ctx.dispatch(new StateResetAll(DataState));

            ctx.patchState({
                token: null,
                user: null
            });
        }));
    }

    @Action(ChangePassword)
    changePassword(ctx: StateContext<AuthStateModel>, { jwt }: ChangePassword) {
        const decodedToken = this.jwtHelperService.decodeToken(jwt);

        ctx.patchState({
            token: jwt,
            user: decodedToken.user
        });
    }

    @Action(Reset)
    reset(ctx: StateContext<AuthStateModel>) {
        // To reset all states to their defaults but keep one
        ctx.dispatch(new StateResetAll(DataState));

        ctx.patchState({
            token: null,
            user: null
        });
    }
}
