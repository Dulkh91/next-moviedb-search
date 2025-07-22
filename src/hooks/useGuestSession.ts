// Save to localStorage
import { useState, useEffect } from "react";

const useGuestSession = () => {
  const [guestId, setGuestId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("quest_session_id");
    if (saved) {
      setGuestId(saved);
      return;
    }

    fetch("api/guest-session")
      .then((res) => res.json())
      .then((data) => {
        if (data.guest_session_id) {
          localStorage.setItem("quest_session_id", data.guest_session_id);
          setGuestId(data.guest_session_id);
        }
      })
      .catch((error) => console.error("Failed to create guest session", error));
  }, []);

  return guestId;
};

export default useGuestSession;
