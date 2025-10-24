import React, { useState, useEffect } from 'react';
import { Clinic, Doctor } from '../types';
import AdminDashboard from './admin/AdminDashboard';
import LoginForm from './admin/LoginForm';
import FirebaseNotConfigured from './admin/FirebaseNotConfigured';
import { auth, isConfigured } from '../firebase/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

interface AdminViewProps {
  clinics: Clinic[];
  doctors: Doctor[];
  addClinic: (clinic: Omit<Clinic, 'id'>) => void;
  updateClinic: (clinic: Clinic) => void;
  deleteClinic: (clinicId: string) => void;
  addDoctor: (doctor: Omit<Doctor, 'id'>) => void;
  updateDoctor: (doctor: Doctor) => void;
  deleteDoctor: (doctorId: string) => void;
}

const AdminView: React.FC<AdminViewProps> = (props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // If Firebase is not configured, show a helpful message and stop.
  // This makes the issue clear to the developer.
  if (!isConfigured) {
    return <FirebaseNotConfigured />;
  }

  useEffect(() => {
    // auth is guaranteed to be defined here because we've passed the isConfigured check
    const unsubscribe = onAuthStateChanged(auth!, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    if (auth) {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out: ", error);
            alert("An error occurred during logout. Please try again.");
        }
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-12rem)]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-DEFAULT"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return <AdminDashboard {...props} onLogout={handleLogout} />;
};

export default AdminView;