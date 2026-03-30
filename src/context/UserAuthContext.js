import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { auth, db } from '../firebase';

const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log('currentUser =', currentUser);

      setUser(currentUser);

      if (currentUser) {
        try {
          const snapshot = await get(ref(db, `users/${currentUser.uid}`));

          console.log('uid =', currentUser.uid);
          console.log('snapshot.exists =', snapshot.exists());
          console.log('snapshot.val =', snapshot.val());

          if (snapshot.exists()) {
            setUserData(snapshot.val());
          } else {
            setUserData(null);
          }
        } catch (error) {
          console.log('อ่านข้อมูล user ไม่สำเร็จ:', error);
          setUserData(null);
        }
      } else {
        setUserData(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const isAdmin = userData?.role === 'admin';

  return (
    <UserAuthContext.Provider value={{ user, userData, loading, isAdmin }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => useContext(UserAuthContext);