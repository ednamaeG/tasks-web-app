import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider'

export default function RequireAuth({children}:any) {
    const auth = useAuth();

    if(!auth.user){
        return <Navigate to="/sign-in" /> 
    }
  return children;
}
