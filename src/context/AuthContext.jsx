import { createContext, useContext, useState, useEffect } from 'react';
import { getMe } from '../api/authApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null means not logged in
  const [loading, setLoading] = useState(true); // true while we check existing session on load

  // on app load, check if a session already exists, avoids flashing login page then redirecting
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await getMe();
        setUser(res.data);
      } catch {
        setUser(null); // no valid session, thats fine, just means logged out
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const value = { user, setUser, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// custom hook, cleaner than importing useContext and AuthContext everywhere
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};