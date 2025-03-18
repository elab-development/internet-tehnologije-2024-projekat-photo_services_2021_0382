import { useState, useEffect } from "react";
import axios from "axios";

const useServices = () => {
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        // Fetch all services by setting per_page to a large number
        const response = await axios.get("http://127.0.0.1:8000/api/services", {
          params: {
            per_page: 1000,
            page: 1,
          },
        });
        // e.g. { "services": [...], "pagination": {...} }
        setAllServices(response.data.services || []);
      } catch (error) {
        console.error("Error fetching services:", error);
        setAllServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { allServices, loading };
};

export default useServices;
