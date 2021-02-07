export class Login {
    static readonly type = '[Auth] Login';

    constructor(public jwt: string) { }
}

export class Logout {
    static readonly type = '[Auth] Logout';
}

export class ChangePassword {
    static readonly type = '[Auth] ChangePassword';

    constructor(public jwt: string) { }
}

export class Reset {
    static readonly type = '[Auth] Reset';
}
