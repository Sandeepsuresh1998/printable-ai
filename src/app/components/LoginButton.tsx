import React from 'react';
import styles from './AuthButton.module.css';

const LoginButton = () => {
  return (
    <a href='/api/auth/login' className={styles.authButton}>Login</a>
  );
};

export default LoginButton;
