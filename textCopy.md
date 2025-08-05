## base AIP url

**dicover**

```bash
https://api.themoviedb.org/3/discover/movie
```

**search**

```bash
https://api.themoviedb.org/3/search/movie
```

---

**delete rate**

```bash
https://api.themoviedb.org/3/movie/{movie_id}/rating
```

**add rate**

```bash
https://api.themoviedb.org/3/movie/{movie_id}/rating
```

**rated movie**
- apk_key
- Token
- guest_session_id
```bash
https://api.themoviedb.org/3/guest_session/{guest_session_id}/rated/movies
```


fbcba5e73dbfa2f8ea6df1b27ff2f003

b6da02eb24288c327467434f477cfa31

fcf04acb3e90baafc8a44e20e7dfe09e

becee74b0f1d458dcbfd51e4186c0559







### I just create guest session with time
```ts
// Save to localStorage
import { useState, useEffect } from "react";

const useGuestSession = () => {
  const [guestId, setGuestId] = useState<string | null>(null);
  // const [sessionDate, setSessionDate] = useState<string | null>(null)

  useEffect(() => {
    const saved = typeof window !== undefined? localStorage.getItem("guest_session_id"):null;
    const expire = typeof window !== undefined? localStorage.getItem("expire_at"):null;
   
    if (saved && expire) {
      
      const currentTime = new Date().getTime();
      const expireTime = new Date(expire).getTime();
      if (expireTime >currentTime) {
        setGuestId(saved);
        return;
      }
      
    }

    fetch("api/guest-session")
      .then((res) => res.json())
      .then((data) => {
        
        if (data.guest_session_id) {
          localStorage.setItem("expire_at",data.expires_at)
          // localStorage.setItem("guest_session_id", data.guest_session_id);

          setGuestId(data.guest_session_id);
        }
      })
      .catch((error) => console.error("Failed to create guest session", error));
  }, []);

  return guestId;
};

export default useGuestSession;
```


### convert
``` ts
// pages/api/delete-movie-rating.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { movieId, guestSession } = req.query;

  const TOKEN_KEY = process.env.NEXT_PUBLIC_CLIENT_TOKEN_KEY;
  const API_KEY = process.env.NEXT_PUBLIC_CLIENT_API_KEY;

  if (!movieId || !guestSession) {
    return res.status(400).json({ message: 'Missing movieId or guestSession' });
  }

  if (!TOKEN_KEY || !API_KEY) {
    return res.status(500).json({ message: 'Missing API key or token key in environment' });
  }

  const endpointUrl = `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${API_KEY}&guest_session_id=${guestSession}`;

  try {
    const response = await fetch(endpointUrl, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${TOKEN_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return res.status(response.status).json({
        message: errorData.status_message || 'Failed to delete rating',
      });
    }

    return res.status(204).end();
  } catch (error: any) {
    return res.status(500).json({ message: error.message || 'Unexpected error' });
  }
}
```