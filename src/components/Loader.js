import {ActivityIndicator} from 'react-native';
import {themeColors} from '../constants/styles/ThemeColors';

export const Loader = ({containerStyle, color, size}) => (
  <ActivityIndicator size={size} color={color} style={containerStyle} />
);
