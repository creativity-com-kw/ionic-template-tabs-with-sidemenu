import { Animation, AnimationController } from '@ionic/angular';

export const mdEnterAnimation = (baseEl: HTMLElement): Animation => {
    const baseAnimation = new AnimationController().create();
    const backdropAnimation = new AnimationController().create();
    const wrapperAnimation = new AnimationController().create();

    backdropAnimation
        .addElement(baseEl.querySelector('ion-backdrop'))
        .fromTo('opacity', 0.01, 'var(--backdrop-opacity)')
        .beforeStyles({
            'pointer-events': 'none'
        })
        .afterClearStyles(['pointer-events']);

    wrapperAnimation
        .addElement(baseEl.querySelector('.modal-wrapper'))
        .keyframes([
            { offset: 0, opacity: '0.01', transform: 'translateY(100%)' },
            { offset: 1, opacity: '1', transform: 'translateY(0%)' }
        ]);

    return baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(.36,.66,.04,1)')
        .duration(400)
        .addAnimation([backdropAnimation, wrapperAnimation]);
};
