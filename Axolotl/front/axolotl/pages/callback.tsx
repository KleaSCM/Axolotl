

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Callback: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get('access_token');

      if (accessToken) {
        // Store the access token or redirect
        localStorage.setItem('spotify_token', accessToken); 
        router.push('/'); // Redirect 
      } else {
        console.error('No access token found');
        router.push('/'); // Redirect if no access token is found
      }
    }
  }, [router]);

  return (
    <div>
      <p>Loading...</p>
      <p>Redirecting ...</p>
    </div>
  );
};

export default Callback;



