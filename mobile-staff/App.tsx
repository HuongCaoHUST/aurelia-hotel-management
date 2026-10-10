import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import LoginScreen, { User } from './src/screens/LoginScreen';

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#181917" />
      <View style={styles.content}>
        <View style={styles.brandMark}>
          <Text style={styles.brandMarkText}>A</Text>
        </View>
        <Text style={styles.welcomeText}>Chào mừng trở lại!</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <Text style={styles.userRole}>Vai trò: {user.role || 'Nhân viên'}</Text>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutButtonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181917',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  brandMark: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#AB8965',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  brandMarkText: {
    color: '#AB8965',
    fontSize: 32,
    fontWeight: '400',
  },
  welcomeText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  userEmail: {
    color: '#D5B38C',
    fontSize: 16,
    marginBottom: 4,
  },
  userRole: {
    color: 'rgba(255, 255, 255, 0.65)',
    fontSize: 14,
    marginBottom: 36,
  },
  logoutButton: {
    width: 200,
    height: 48,
    backgroundColor: '#AB8965',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});
