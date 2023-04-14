import {Formik} from 'formik';
import {useEffect, useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Platform,
  Keyboard,
  Pressable,
  Alert,
  Dimensions,
  StatusBar,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Reanimated, {FadeInUp, FadeOutUp} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {themeColors} from '../../../constants/styles/ThemeColors';
import ImageStrings from '../../../constants/strings/ImageStrings';
import FontFamilies from '../../../constants/styles/FontFamilies';
import Inputbar from '../../../components/inputbar/Inputbar';
import InputBarError from '../../../components/inputbar/InputBarError';
import {ValidationSchemaForLogin} from '../../../constants/ValidationSchemas';
import GradientButton from '../../../components/GradientButton';
import {loginToStore} from '../../../../redux/authentication/AuthenticationReducer';
import {LoginToApi} from '../../../api/authentication/AuthenticationApiRequests';
import TextButton from '../../../components/TextButton';
import Heading from '../../../components/Heading';
const dimension = Dimensions.get('screen');

export default LoginScreen = () => {
  const usernameInput = useRef();
  const passwordInput = useRef();
  const [inputFieldError, setInputFieldError] = useState({});
  const [keepSignIn, setKeepSignIn] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    usernameInput.current?.focus();
  }, []);

  const submitData = async (values, errors, setTouched) => {
    setTouched({});
    Keyboard.dismiss();
    setInputFieldError({...errors});

    if (!!errors.username) {
      usernameInput.current.focus();
      return;
    }
    if (!!errors.password) {
      passwordInput.current.focus();
      return;
    }
    if (!errors.username && !errors.password) {
      const loginResponse = await LoginToApi({...values});
      if (loginResponse.isError) {
        Alert.alert('Oops', loginResponse.error);
        return;
      }
      dispatch(loginToStore({userData: {...loginResponse.userData}}));
      if (keepSignIn) {
        const userDataStringified = JSON.stringify({...loginResponse.userData});
        await AsyncStorage.setItem('savedUser', userDataStringified);
      }
    }
  };

  const changeField = (field, setTouched, setFieldValue, errors, text) => {
    setTouched({[field]: true});
    setFieldValue(field, text);
    let temp = {};
    for (const key in errors) {
      if (!inputFieldError[key]) {
        continue;
      }
      temp[key] = errors[key];
    }
    setInputFieldError({...temp});
  };

  const toggleKeepSignIn = () => {
    setKeepSignIn(!keepSignIn);
  };
  const goToSignupScreen = () => {
    navigation.navigate('SignupScreen');
  };

  return (
    <>
      <Image
        source={ImageStrings.LoginScreenBackground}
        style={[
          styles.backgroundImage,
          Platform.OS == 'android' && {height: dimension.height * 0.409},
        ]}
        resizeMode="contain"
      />
      <View style={styles.mainDiv}>
        <Heading
          text={'Welcome Back'}
          isCenter={false}
          style={styles.greetings}
        />
        <Text style={styles.subText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor
        </Text>
        <Formik
          initialValues={{username: 'atuny0', password: '9uQFF1Lh'}}
          onSubmit={submitData}
          validationSchema={ValidationSchemaForLogin}
          validateOnChange={true}
          initialErrors={{username: '', password: ''}}>
          {({touched, values, setTouched, setFieldValue, errors}) => (
            <>
              <Inputbar
                placeholder="Username"
                rightIcon="person"
                value={values.username}
                onChangeText={changeField.bind(
                  this,
                  'username',
                  setTouched,
                  setFieldValue,
                  errors,
                )}
                touched={touched}
                onFocus={() => {
                  setTouched({username: true});
                }}
                onSubmitEditing={() => passwordInput.current.focus()}
                ref={usernameInput}
                isInvalid={!!inputFieldError.username}
              />
              {!!touched.username && !!errors.username && (
                <InputBarError error={errors.username} />
              )}
              <Inputbar
                onSubmitEditing={submitData.bind(
                  this,
                  values,
                  errors,
                  setTouched,
                )}
                placeholder="Password"
                rightIcon="locked"
                isPassword
                value={values.password}
                onChangeText={changeField.bind(
                  this,
                  'password',
                  setTouched,
                  setFieldValue,
                  errors,
                )}
                touched={touched}
                onFocus={() => {
                  setTouched({password: true});
                }}
                ref={passwordInput}
                isInvalid={!!inputFieldError.password}
              />
              {!!touched.password && !!errors.password && (
                <InputBarError error={errors.password} />
              )}
              {!errors.username && !errors.password && (
                <Reanimated.View
                  style={styles.signinButtonDiv}
                  entering={FadeInUp}
                  exiting={FadeOutUp}>
                  <View style={Platform.OS == 'android' && {marginTop: '2%'}}>
                    <GradientButton
                      title={'Log In'}
                      onPress={submitData.bind(
                        this,
                        values,
                        errors,
                        setTouched,
                      )}
                    />
                  </View>
                </Reanimated.View>
              )}
              <View style={styles.forgotPasswordBar}>
                <Pressable
                  onPress={toggleKeepSignIn}
                  style={styles.keepSigninDiv}>
                  <CheckBox isChecked={keepSignIn} />
                  <Text style={styles.keepSigninText}>Keep Sign In</Text>
                </Pressable>
                <TextButton
                  text={'Forgot Password'}
                  inUnderlined={true}
                  fontSize={18}
                  fontFamily={FontFamilies.primaryFonts}
                  fontWeight={'600'}
                  color={themeColors.primaryColor}
                />
              </View>
              <View style={styles.signupDiv}>
                <Text style={styles.signupText}>Don't have an account? </Text>
                <TextButton
                  text={'Sign Up'}
                  color={themeColors.primaryColor}
                  fontFamily={FontFamilies.primaryFonts}
                  fontSize={18}
                  fontWeight={'600'}
                  onPress={goToSignupScreen}
                />
              </View>
            </>
          )}
        </Formik>
        <StatusBar
          translucent={true}
          barStyle={'dark-content'}
          backgroundColor={'transparent'}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  mainDiv: {
    flex: 1,
    // paddingTop: '85%',
    justifyContent: 'flex-end',
  },
  backgroundImage: {
    top: 0,
    right: 0,
    left: 0,
    height: dimension.height * 0.399,
    width: '100%',
    position: 'absolute',
  },
  greetings: {
    fontSize: 26,
    marginHorizontal: '8%',
  },
  subText: {
    fontFamily: FontFamilies.primaryFontsRegular,
    marginVertical: '4%',
    fontSize: 16,
    color: themeColors.primaryGray,
    marginHorizontal: '8%',
  },
  signinButtonDiv: {
    marginTop: '4%',
  },
  signinBtnDiv: {
    fontFamily: FontFamilies.primaryFontsExtraBold,
    position: 'absolute',
    textAlign: 'center',
    fontSize: 18,
    textTransform: 'uppercase',
    color: 'white',
    lineHeight: 70,
    textAlignVertical: 'center',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  keepSigninDiv: {
    flexDirection: 'row',
  },
  forgotPasswordBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '9%',
    marginTop: '7%',
  },
  keepSigninText: {
    fontFamily: FontFamilies.primaryFontsSemiBold,
    fontSize: 18,
    color: themeColors.primaryBlack,
    marginLeft: '5%',
  },
  signupText: {
    fontFamily: FontFamilies.primaryFontsRegular,
    color: themeColors.primaryGray,
    fontSize: 18,
  },
  signupDiv: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: Platform.OS == 'ios' ? '9%' : '8%',
  },
});
