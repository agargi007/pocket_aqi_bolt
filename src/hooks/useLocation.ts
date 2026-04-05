import { useState, useEffect } from 'react';
import { Location } from '../types';

export const useLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          setLocation({
            name: data.address.city || data.address.town || data.address.village || 'Unknown',
            latitude,
            longitude
          });
        } catch (err) {
          setLocation({
            name: 'Current Location',
            latitude,
            longitude
          });
        }

        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return { location, loading, error, refreshLocation: getLocation };
};
