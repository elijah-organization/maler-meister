import React, { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCheckLogin } from '../../hooks/useCheckLogin';
import { getLoginData } from './login-utils';

export default function LoginProvider({ children }: Readonly<PropsWithChildren>) {
  const checkLogin = useCheckLogin();
  const navigate = useNavigate();
  const loginData = getLoginData();

  useEffect(() => {
    if (!loginData) {
      navigate('/login');
      return;
    }
    checkLogin(false);
  }, [checkLogin, navigate, loginData]);

  return <>{children}</>;
}
