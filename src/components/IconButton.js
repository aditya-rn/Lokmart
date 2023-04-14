import {useState} from 'react';
import {StyleSheet, Pressable, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default IconButton = ({
  onPress,
  color,
  backgroundColor,
  name,
  size,
  containerStyles,
  iconStyles,
  pressColor,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => {
        return [
          styles.iconDiv,
          containerStyles,
          {backgroundColor},
          pressed && {opacity: 0.5},
        ];
      }}>
      <Icon name={name} style={iconStyles} size={size} color={color} />
    </Pressable>
  );
};
const styles = StyleSheet.create({
  iconDiv: {
    overflow: 'hidden',
  },
  dummyDiv: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
});
