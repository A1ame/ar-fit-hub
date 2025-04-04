import React, { useState } from 'react';
import { addUser, authenticateUser, logoutUser } from '../utils/userUtils';
import { t } from '../utils/languageUtils';

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        const newUser = await addUser({
          email,
          password,
          name,
          gender: 'male',
          age: 0,
          weight: 0,
          height: 0,
        });
        console.log('Registered user:', newUser);
      } else {
        const user = await authenticateUser(email, password);
        console.log('Logged in user:', user);
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    console.log('Logged out');
  };

  return (
    <div>
      <h2>{isRegistering ? t('register') : t('login')}</h2>
      <form onSubmit={handleSubmit}>
        {isRegistering && (
          <div>
            <label>{t('yourName')}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        <div>
          <label>{t('email')}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>{t('password')}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isRegistering ? t('register') : t('login')}</button>
      </form>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? t('alreadyHaveAccount') : t('dontHaveAccount')}
      </button>
      <button onClick={handleLogout}>{t('logout')}</button>
    </div>
  );
};

export default Auth;