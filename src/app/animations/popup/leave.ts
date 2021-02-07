import { Animation, AnimationController } from '@ionic/angular';
import { mdEnterAnimation } from './enter';

export const mdLeaveAnimation = (baseEl: HTMLElement): Animation => {
    return mdEnterAnimation(baseEl).direction('reverse');
};
