import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontFamilies from '../../constants/styles/FontFamilies';
import {themeColors} from '../../constants/styles/ThemeColors';

export default Rating = ({rating, ratings}) => {
  return (
    <View style={styles.mainDiv}>
      <View style={styles.ratingStarDiv}>
        <Icon
          name="star"
          color={themeColors.ratingStarColor}
          size={16}
          style={{paddingRight: '1%'}}
        />
        <Text style={styles.rating}>{rating.toFixed(1)}</Text>
      </View>
      <Text style={styles.ratingsNumber}>{ratings} Ratings</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    // backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '4%',
    // flex: 1,
  },
  ratingStarDiv: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    justifyContent: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: themeColors.primaryGray,
    paddingVertical: '1%',
    paddingHorizontal: '6%',
    marginRight: '5%',
  },
  rating: {
    fontFamily: FontFamilies.primaryFontsSemiBold,
    fontSize: 12,
    color: themeColors.primaryBlack,
  },
  ratingsNumber: {
    fontFamily: FontFamilies.primaryFontsMedium,
    fontSize: 14,
    color: themeColors.primaryColorDark,
  },
});
