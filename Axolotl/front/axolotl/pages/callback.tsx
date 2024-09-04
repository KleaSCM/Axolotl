
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Callback: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    const token = hash
      .substring(1)
      .split('&')
      .find((elem) => elem.startsWith('access_token'))
      ?.split('=')[1];

    if (token) {
      window.localStorage.setItem('token', token);
      router.push('/spoty'); // Redirect to the `spoty` page
    }
  }, [router]);

  return <div>Loading...</div>;
};

export default Callback;




// import React, { useEffect } from 'react';
// import { useRouter } from 'next/router';

// const Callback: React.FC = () => {
//   const router = useRouter();

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const hash = window.location.hash;
//       const params = new URLSearchParams(hash.substring(1));
//       const accessToken = params.get('access_token');

//       if (accessToken) {
//         localStorage.setItem('spotify_token', accessToken); 
//         router.push('/'); // Redirect
//       } else {
//         console.error('No access token found');
//         router.push('/'); // Redirect if no access token is found
//       }
//     }
//   }, [router]);

//   return (
//     <div>
//       <p>Loading...</p>
//       <p>Redirecting ...</p>
//     </div>
//   );
// };

// export default Callback;




