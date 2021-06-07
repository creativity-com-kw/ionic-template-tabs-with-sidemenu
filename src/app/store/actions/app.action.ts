export class SetLanguage {
    static readonly type = '[App] Set Language';

    constructor(public language: string) { }
}

export class SetIsNotificationTapped {
    static readonly type = '[App] SetIsNotificationTapped';

    constructor(public isTapped: boolean) { }
}
