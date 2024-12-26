'use client';

import { StytchLogin } from '@stytch/nextjs';
import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [uiType, setUiType] = useState<string | null>('custom');

  const handleLogin = async () => {
    const response = await fetch('/api/auth/magic-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    console.log(response)
    if (response.ok) {
      alert('Check your email for the magic link!');
    } else {
      alert('Login failed!');
    }
  };

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    uiType: string | null,
  ) => {
    setUiType(uiType);
  };

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center bg-gray-200'>
      <ToggleButtonGroup
        value={uiType}
        exclusive
        onChange={handleChange}
        aria-label="login-ui-type"
      >
        <ToggleButton value="stytch" aria-label="stytch">
          Stytch UI
        </ToggleButton>
        <ToggleButton value="custom" aria-label="custom">
          Custom UI
        </ToggleButton>
      </ToggleButtonGroup>
      <div className='mt-5'>
        {uiType === 'stytch' ?
          <StytchLogin config={{
            products: ['oauth', 'emailMagicLinks'],
            oauthOptions: {
              providers: [{
                type: 'google',
                one_tap: false
              }],
            },
            emailMagicLinksOptions: {
              loginRedirectURL: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
              loginExpirationMinutes: 30,
              signupRedirectURL: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
              signupExpirationMinutes: 30,
              createUserAsPending: true,
            },
          }}
            styles={{
              colors: { primary: '#0577CA' },
              fontFamily: '"DM-Sans", sans-serif',
            }}
          />
          :
          <div className='login-box'>
            <h2>Login</h2>
            <form>
              <div className="user-box">
                <TextField onChange={(e) => setEmail(e.target.value)} fullWidth id="email" label="Email" variant="filled" />
              </div>
              <div className='mt-5 display-block user-box'>
                <Button onClick={handleLogin} fullWidth variant='contained'>Login</Button>
              </div>
            </form>
            <StytchLogin config={{
              products: ['oauth'],
              oauthOptions: {
                providers: [{
                  type: 'google',
                  one_tap: true,
                }],
              },
            }} />
          </div>

        }
      </div>
    </div>
  );
}
