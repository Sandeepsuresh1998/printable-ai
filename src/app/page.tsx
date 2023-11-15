'use client';
import LoginButton from './components/LoginButton';
import titleStyles from './styles/TitleAnimation.module.css';
import LogoutButton from './components/LogoutButton';

import { useUser } from '@auth0/nextjs-auth0/client';

export default function Home() {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <main>
      {user ? (
        <>
          <div>
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
          </div>
          <LogoutButton/>
        </>
      ) : (
        <LoginButton/>
      )}
    </main>
  )
}
