import React, { useState, useEffect } from 'react';
import { Clinic, Doctor } from '../../types';
import AdminDashboard from './admin/AdminDashboard';
import LoginForm from './admin/LoginForm';
import { auth, isConfigured } from '../../firebase/firebase';
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

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
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
  
  // This is a fallback for when Firebase isn't configured,
  // to keep the admin panel accessible with mock data for review purposes.
  if (!isConfigured) {
      const handleMockLogout = () => {
        alert('Logout functionality is disabled because Firebase is not configured. Please check your firebase/config.ts file.');
      };
      return <AdminDashboard {...props} onLogout={handleMockLogout} />;
  }

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
