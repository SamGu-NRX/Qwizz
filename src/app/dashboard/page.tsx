"use client";

// app/dashboard/page.tsx
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Session } from 'next-auth';
import PrivateRoute from '@/components/PrivateRoute';
import Dashboard from '../dashboard-force/test-page';

// Define the type for the session state
interface SessionType extends Session {
  user: {
    name: string;
    email: string;
  };
}

const DashboardNav = () => {
  const [session, setSession] = useState<SessionType | null>(null);

  useEffect(() => {
    getSession().then((sessionData) => {
      if (sessionData) {
        // Type assertion to ensure sessionData conforms to SessionType
        setSession(sessionData as SessionType);
      } else {
        setSession(null);
      }
    });
  }, []);

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  );
};

export default DashboardNav;
