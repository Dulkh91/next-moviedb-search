import { useState, useEffect } from "react";


const useGuestSession = () => {
  const [guestId, setGuestId] = useState<string | null>(null);

  useEffect(() => {
    const fetchGuestSession = async () => {
      const saved = localStorage.getItem("guest_session_id");
      const expireStr = localStorage.getItem("expire_at");

      if (saved && expireStr) {
        const expireTime = Number(expireStr);
        const currentTime = new Date().getTime(); // ពេលវេលាបច្ចុប្បន្ន

        // ប្រសិនបើពេលវេលាផុតកំណត់ធំជាងពេលវេលាបច្ចុប្បន្ន
        if (expireTime > currentTime) {
          setGuestId(saved);
          return;
        }
      }

      // ប្រសិនបើមិនមាន session ឬ session អស់សុពលភាព
      try {
        const res = await fetch("/api/guest-session");
        const data = await res.json();

        if (data.guest_session_id) {
          const expiresAt = new Date(data.expires_at).getTime();

          localStorage.setItem("expire_at", String(expiresAt));

          localStorage.setItem("guest_session_id", data.guest_session_id);
          setGuestId(data.guest_session_id);

          // if (!saved) {
          //   localStorage.setItem("guest_session_id", data.guest_session_id);
          //   setGuestId(data.guest_session_id);
          // }
        }
      } catch (error) {
        console.error("Failed to create guest session", error);
      }
    };

    fetchGuestSession();
  }, []);

  return guestId;
};

export default useGuestSession;
