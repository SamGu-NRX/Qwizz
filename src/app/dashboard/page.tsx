"use client";

import { useSession } from 'next-auth/react';
import PrivateRoute from '@/components/PrivateRoute';
import Dashboard from '@/components/Dashboard/Dashboard';

const DashboardNav = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  );
};

export default DashboardNav;