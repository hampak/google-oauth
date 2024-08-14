import { PropsWithChildren, useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from './AuthProvider';

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {

  const authContext = useContext(AuthContext)

  console.log(authContext)

  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { user, isLoading } = authContext;

  console.log(user)

  if (isLoading) {
    return (
      <div className="w-full h-screen bg-white" />
    )
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  return children;
}