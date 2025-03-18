import { useState, useEffect } from "react";
import axios from "axios";

const useLatestServices = () => {
  const [latestServices, setLatestServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/services", {
          params: { per_page: 10 }, 
        });

        const services = response.data.services || [];

        const shuffled = services.sort(() => 0.5 - Math.random());
        setLatestServices(shuffled.slice(0, 5));
      } catch (error) {
        console.error("Error fetching latest services:", error);
      }
    };

    fetchServices();
  }, []);

  return { latestServices };
};

export default useLatestServices;
