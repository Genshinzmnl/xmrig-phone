declare module 'react-native-slider' {
    import { ViewStyle } from 'react-native';

    interface ThumbTouchSize {
        width: number;
        height: number;
    }

    interface ISlider {
        minimumValue?: number;
        maximumValue?: number;
        disabled?: boolean;
        value?: number;
        step?: number;
        minimumTrackTintColor?: string;
        maximumTrackTintColor?: string;
        thumbTintColor?: string;
        thumbTouchSize?: ThumbTouchSize;
        onValueChange?: (value: number) => void;
        onSlidingStart?: (value: number) => void;
        onSlidingComplete?: (value?: number) => void;
        style?: ViewStyle;
        trackStyle?: ViewStyle;
        thumbStyle?: ViewStyle;
        thumbImage?: number;
        debugTouchArea?: boolean;
        animateTransitions?: boolean;
        animationType?: 'spring' | 'timing';
        animationConfig?: any;
    }

    export default function Slider(props: ISlider): JSX.Element;
}