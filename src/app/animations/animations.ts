import { trigger, state, style, animate, transition } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
    transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(150, style({ opacity: 1 }))
    ]),
    transition(':leave', [   // :leave is alias to '* => void'
        animate(150, style({ opacity: 0 }))
    ])
]);
