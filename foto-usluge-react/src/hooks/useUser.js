// src/hooks/useUser.js
import { useState, useEffect } from "react";
import axios from "axios";

const useUser = (id) => {
  const [user, setUser]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => {
    if (!id) return setLoading(false);
    setLoading(true);
    axios
      .get(`http://127.0.0.1:8000/api/users/${id}`)
      .then(res => setUser(res.data.user))
      .catch(err => {
        console.error(err);
        setError("Failed to load seller");
      })
      .finally(() => setLoading(false));
  }, [id]);

  return { user, loading, error };
};

export default useUser;
