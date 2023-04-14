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
  Dimensions,
  StatusBar,
} from 'react-native';
import Inputbar from '../../../components/inputbar/Inputbar';
import Reanimated, {FadeInUp, FadeOutUp} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {themeColors} from '../../../constants/styles/ThemeColors';
import CheckBox from '../../../components/CheckBox';
import TextButton from '../../../components/TextButton';
import TermsAndConditions from '../../../components/TermsAndConditions';
import ImageStrings from '../../../constants/strings/ImageStrings';
import FontFamilies from '../../../constants/styles/FontFamilies';
import {ValidationSchemaForSignup} from '../../../constants/ValidationSchemas';
import InputBarError from '../../../components/inputbar/InputBarError';
import GradientButton from '../../../components/GradientButton';
import Heading from '../../../components/Heading';
const dimension = Dimensions.get('screen');

export default SignupScreen = () => {
  const usernameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const [inputFieldError, setInputFieldError] = useState({});
  const [agreeToPolicy, setAgreeToPolicy] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    usernameInput.current?.focus();
  }, []);

  const submitData = (values, errors, setTouched) => {
    setTouched({});
    Keyboard.dismiss();
    setInputFieldError({...errors});
    if (!!errors.username) {
      usernameInput.current.focus();
      return;
    }
    if (!!errors.email) {
      emailInput.current.focus();
      return;
    }
    if (!!errors.password) {
      passwordInput.current.focus();
      return;
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

  const toggleAgreeToPolicy = () => {
    setAgreeToPolicy(!agreeToPolicy);
  };

  const goToLoginScreen = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <>
      <Image
        source={ImageStrings.SignupScreenBackground}
        style={[
          styles.backgroundImage,
          Platform.OS == 'android' && {height: dimension.height * 0.34},
        ]}
        resizeMode="contain"
      />
      <View style={styles.mainDiv}>
        <Heading
          text={'Create your account'}
          isCenter={false}
          style={styles.greetings}
        />

        <Formik
          initialValues={{username: '', password: '', email: ''}}
          onSubmit={submitData}
          validationSchema={ValidationSchemaForSignup}
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
                onSubmitEditing={() => emailInput.current.focus()}
                ref={usernameInput}
                isInvalid={!!inputFieldError.username}
              />
              {!!touched.username && <InputBarError error={errors.username} />}
              <Inputbar
                placeholder="Email"
                rightIcon="mail"
                value={values.email}
                onChangeText={changeField.bind(
                  this,
                  'email',
                  setTouched,
                  setFieldValue,
                  errors,
                )}
                touched={touched}
                onFocus={() => {
                  setTouched({email: true});
                }}
                onSubmitEditing={() => passwordInput.current.focus()}
                ref={emailInput}
                isInvalid={!!inputFieldError.email}
              />
              {!!touched.email && <InputBarError error={errors.email} />}
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
              {!!touched.password && <InputBarError error={errors.password} />}
              {!errors.username && !errors.password && !errors.email && (
                <Reanimated.View
                  style={styles.signinButtonDiv}
                  entering={FadeInUp}
                  exiting={FadeOutUp}>
                  <View style={styles.nextBtn}>
                    <GradientButton title={'Register'} />
                  </View>
                </Reanimated.View>
              )}
              <View style={styles.forgotPasswordBar}>
                <Pressable
                  onPress={toggleAgreeToPolicy}
                  style={styles.keepSigninDiv}>
                  <CheckBox isChecked={agreeToPolicy} />
                  <TermsAndConditions />
                </Pressable>
              </View>
              <View style={styles.signupDiv}>
                <Text style={styles.signupText}>Already have account? </Text>
                <TextButton
                  text={'Login'}
                  color={themeColors.primaryColor}
                  fontFamily={FontFamilies.primaryFonts}
                  fontSize={18}
                  fontWeight={'600'}
                  onPress={goToLoginScreen}
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
    paddingTop: '72%',
  },
  backgroundImage: {
    top: 0,
    right: 0,
    left: 0,
    height: dimension.height * 0.332,
    width: '100%',
    position: 'absolute',
  },
  greetings: {
    fontFamily: FontFamilies.primaryFontsBold,
    fontSize: 26,
    color: themeColors.primaryBlack,
    marginHorizontal: '8%',
    marginBottom: '7%',
  },
  subText: {
    fontFamily: FontFamilies.primaryFontsRegular,
    marginVertical: '4%',
    fontSize: 16,
    color: themeColors.primaryGray,
    marginHorizontal: '8%',
  },
  usernameError: {
    fontSize: 14,
    fontFamily: FontFamilies.primaryFonts,
    marginHorizontal: '10%',
    color: themeColors.invalidField,
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
    width: '100%',
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
    marginTop: '7%',
  },
});
