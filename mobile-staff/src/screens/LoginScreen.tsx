import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Alert,
  Pressable,
} from 'react-native';

export interface User {
  id?: string;
  email: string;
  name?: string;
  role?: string;
}

interface LoginScreenProps {
  onLoginSuccess?: (user: User) => void;
  onForgotPassword?: () => void;
  onContactAdmin?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  onForgotPassword,
  onContactAdmin,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleLogin = async () => {
    // Basic validation
    if (!email.trim() || !password) {
      setErrorMessage('Vui lòng nhập đầy đủ email và mật khẩu.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      // Giả lập hoặc gọi API authenticate
      // Trong môi trường thực tế, kết nối tới API từ shared/api hoặc authService
      await new Promise((resolve) => setTimeout(resolve, 1200));

      if (email.toLowerCase().includes('error')) {
        throw new Error('Không thể đăng nhập. Vui lòng kiểm tra lại tài khoản.');
      }

      const userData: User = {
        email: email.trim(),
        name: 'Staff User',
        role: 'Staff',
      };

      if (onLoginSuccess) {
        onLoginSuccess(userData);
      } else {
        Alert.alert('Thành công', `Đăng nhập thành công với tài khoản: ${email}`);
      }
    } catch (error: any) {
      setErrorMessage(
        error?.message || 'Không thể đăng nhập. Vui lòng kiểm tra lại tài khoản.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#181917" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Visual Glow Background Highlights */}
          <View style={styles.glowOne} />
          <View style={styles.glowTwo} />

          {/* Card Container */}
          <View style={styles.cardContainer}>
            {/* Brand Header */}
            <View style={styles.brandContainer}>
              <View style={styles.brandMark}>
                <Text style={styles.brandMarkText}>A</Text>
              </View>
              <View style={styles.brandTextContainer}>
                <Text style={styles.brandTitle}>AURELIA</Text>
                <Text style={styles.brandSubtitle}>STAFF PORTAL</Text>
              </View>
            </View>

            {/* Heading Section */}
            <View style={styles.headingSection}>
              <Text style={styles.eyebrow}>WELCOME BACK</Text>
              <Text style={styles.headingTitle}>Sign in to continue</Text>
              <Text style={styles.headingDescription}>
                Access your hotel operations workspace.
              </Text>
            </View>

            {/* Form Section */}
            <View style={styles.form}>
              {/* Email Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Work email</Text>
                <TextInput
                  style={[
                    styles.input,
                    isEmailFocused && styles.inputFocused,
                  ]}
                  placeholder="you@aureliahotel.com"
                  placeholderTextColor="rgba(255, 255, 255, 0.45)"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (errorMessage) setErrorMessage('');
                  }}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                />
              </View>

              {/* Password Input Header with Forgot Password */}
              <View style={styles.inputGroup}>
                <View style={styles.labelRow}>
                  <Text style={styles.label}>Password</Text>
                  <TouchableOpacity
                    onPress={
                      onForgotPassword ||
                      (() => Alert.alert('Thông báo', 'Vui lòng liên hệ quản trị viên để khôi phục mật khẩu.'))
                    }
                    activeOpacity={0.7}
                  >
                    <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.passwordInputWrapper}>
                  <TextInput
                    style={[
                      styles.input,
                      styles.passwordInput,
                      isPasswordFocused && styles.inputFocused,
                    ]}
                    placeholder="Enter your password"
                    placeholderTextColor="rgba(255, 255, 255, 0.45)"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      if (errorMessage) setErrorMessage('');
                    }}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                  />
                  <TouchableOpacity
                    style={styles.showPasswordBtn}
                    onPress={() => setShowPassword(!showPassword)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.showPasswordText}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Keep me signed in Checkbox */}
              <Pressable
                style={styles.rememberRow}
                onPress={() => setRememberMe(!rememberMe)}
              >
                <View
                  style={[
                    styles.checkbox,
                    rememberMe && styles.checkboxChecked,
                  ]}
                >
                  {rememberMe && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.rememberText}>Keep me signed in</Text>
              </Pressable>

              {/* Error Message Display */}
              {Boolean(errorMessage) && (
                <View style={styles.errorBox}>
                  <Text style={styles.errorText}>{errorMessage}</Text>
                </View>
              )}

              {/* Submit Button */}
              <TouchableOpacity
                style={[
                  styles.loginButton,
                  isSubmitting && styles.loginButtonDisabled,
                ]}
                onPress={handleLogin}
                disabled={isSubmitting}
                activeOpacity={0.8}
              >
                {isSubmitting ? (
                  <View style={styles.buttonLoadingRow}>
                    <ActivityIndicator size="small" color="#FFFFFF" />
                    <Text style={styles.loginButtonText}> Signing in...</Text>
                  </View>
                ) : (
                  <View style={styles.buttonContentRow}>
                    <Text style={styles.loginButtonText}>Sign in</Text>
                    <Text style={styles.buttonArrow}> →</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {/* Footer / Contact Admin Note */}
            <View style={styles.noteContainer}>
              <Text style={styles.noteText}>
                Need access?{' '}
                <Text
                  style={styles.contactLink}
                  onPress={
                    onContactAdmin ||
                    (() => Alert.alert('Hỗ trợ', 'Vui lòng gửi email đến admin@aureliahotel.com'))
                  }
                >
                  Contact your administrator
                </Text>
              </Text>
            </View>

            {/* Copyright */}
            <Text style={styles.copyrightText}>
              © 2026 Aurelia Hotel Management
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181917',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
    position: 'relative',
  },
  glowOne: {
    position: 'absolute',
    top: '10%',
    left: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(171, 137, 101, 0.12)',
  },
  glowTwo: {
    position: 'absolute',
    bottom: '15%',
    right: -40,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(171, 137, 101, 0.1)',
  },
  cardContainer: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: 'rgba(24, 25, 23, 0.85)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: 28,
    paddingVertical: 36,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 8,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  brandMark: {
    width: 38,
    height: 38,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  brandMarkText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  brandTextContainer: {
    justifyContent: 'center',
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 2,
  },
  brandSubtitle: {
    color: 'rgba(255, 255, 255, 0.65)',
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 2,
    marginTop: 2,
  },
  headingSection: {
    marginBottom: 28,
  },
  eyebrow: {
    color: '#AB8965',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2.2,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  headingTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '400',
    letterSpacing: -0.5,
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  headingDescription: {
    color: 'rgba(255, 255, 255, 0.68)',
    fontSize: 14,
    lineHeight: 20,
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    color: 'rgba(255, 255, 255, 0.86)',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  forgotPasswordText: {
    color: '#D5B38C',
    fontSize: 12,
    fontWeight: '500',
  },
  input: {
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.22)',
    borderRadius: 8,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 14,
  },
  inputFocused: {
    borderColor: '#AB8965',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  passwordInputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  passwordInput: {
    paddingRight: 60,
  },
  showPasswordBtn: {
    position: 'absolute',
    right: 14,
    height: '100%',
    justifyContent: 'center',
  },
  showPasswordText: {
    color: '#D5B38C',
    fontSize: 12,
    fontWeight: '600',
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: '#AB8965',
    borderColor: '#AB8965',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  rememberText: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 13,
  },
  errorBox: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.4)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  errorText: {
    color: '#FCA5A5',
    fontSize: 13,
    textAlign: 'center',
  },
  loginButton: {
    height: 52,
    backgroundColor: '#AB8965',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    shadowColor: '#AB8965',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonDisabled: {
    backgroundColor: '#7A644D',
    opacity: 0.8,
  },
  buttonContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonLoadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  buttonArrow: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noteContainer: {
    marginTop: 28,
    alignItems: 'center',
  },
  noteText: {
    color: 'rgba(255, 255, 255, 0.68)',
    fontSize: 13,
  },
  contactLink: {
    color: '#D5B38C',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  copyrightText: {
    color: 'rgba(255, 255, 255, 0.45)',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 24,
  },
});

export default LoginScreen;
