// Save to localStorage
import { useState, useEffect } from "react";

const useGuestSession = () => {
  const [guestId, setGuestId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("guest_session_id");
    const expire = localStorage.getItem("expire_at");
    if (saved && expire) {
      const currentTime = new Date().getTime();
      const expireTime = new Date(expire).getTime();

      if (expireTime > currentTime) {
        setGuestId(saved);
        return;
      }
    }

    fetch("api/guest-session")
      .then((res) => res.json())
      .then((data) => {
        if (data.guest_session_id) {
          localStorage.setItem("expire_at", data.expires_at);

          localStorage.setItem("guest_session_id", data.guest_session_id);
          setGuestId(data.guest_session_id);
        }
      })
      .catch((error) => console.error("Failed to create guest session", error));
  }, []);

  return guestId;
};

export default useGuestSession;
