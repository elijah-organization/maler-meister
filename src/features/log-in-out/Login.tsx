import VisibilityOff from '@mui/icons-material/VisibilityOffOutlined';
import Visibility from '@mui/icons-material/VisibilityOutlined';
import { Box, Button, Card, CardContent, CardHeader, IconButton, Link } from '@mui/material';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppTextField } from '../../components/aa-shared/AppTextField';
import { appRequest, setFetchClientToken } from '../../fetch/fetch-client';
import { useCheckLogin } from '../../hooks/useCheckLogin';
import { setLoginData } from './login-utils';

export default function Login() {
  const [identifier, setIdetifier] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const checkLogin = useCheckLogin();

  useEffect(() => {
    checkLogin(true);
  }, [checkLogin]);

  const loginUser = () => {
    if (identifier && password) {
      appRequest('post')('/auth/local', {
        identifier,
        password,
      })
        .then((res) => {
          const { jwt, user } = res as LoginResponse;
          setFetchClientToken(jwt);
          setLoginData({ jwt, user });
          navigate('/');
        })
        .catch((e) => {
          console.log(e);
          alert('Login nicht erfolgreich!');
        });
    }
  };

  return (
    <>
      <Box mt={10} display="flex" justifyContent="center">
        <Card>
          <CardHeader title="Anmeldung" />
          <CardContent>
            <form>
              <Box display="flex" flexDirection="column" gap={3} minWidth="300px">
                <AppTextField
                  value={identifier}
                  label="Nutzer"
                  autoCapitalize="none"
                  onChange={(ev) => {
                    setIdetifier(ev.target.value);
                  }}
                  inputProps={{
                    autoCapitalize: 'none',
                  }}
                />
                <AppTextField
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          setShowPassword((sp) => !sp);
                        }}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                  onKeyDown={({ key }) => {
                    if (key === 'Enter') {
                      loginUser();
                    }
                  }}
                  type={showPassword ? 'text' : 'password'}
                  label="Passwort"
                  value={password}
                  onChange={(ev) => {
                    setPassword(ev.target.value);
                  }}
                />
                <Button disableElevation onClick={loginUser} variant="contained">
                  Login
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
      <Box width={'100%'} position={'absolute'} bottom={30} display="flex" justifyContent={'center'}>
        <Link
          target="_blank"
          href="https://de.freepik.com/vektoren-kostenlos/illustration-der-malereirollenikone-auf-blauem-hintergrund_2632302.htm#query=painter%20roller&position=19&from_view=search&track=ais"
          sx={{ textDecoration: 'none' }}
        >
          Logo von rawpixel.com auf Freepik
        </Link>
      </Box>
    </>
  );
}
