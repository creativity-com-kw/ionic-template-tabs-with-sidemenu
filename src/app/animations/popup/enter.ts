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
            { offset: 0, opacity: '0.01', transform: 'scale(0.9)' },
            { offset: 1, opacity: '1', transform: 'scale(1)' }
        ]);

    return baseAnimation
        .addElement(baseEl)
        .easing('ease-in-out')
        .duration(150)
        .addAnimation([backdropAnimation, wrapperAnimation]);
};
