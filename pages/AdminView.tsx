import React, { useState, useEffect } from 'react';
import { Clinic, Doctor } from '../types';
import LoginForm from './admin/LoginForm';
import AdminDashboard from './admin/AdminDashboard';
import { auth } from '../firebase/firebase';
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
  
  const handleLogout = () => {
    if (auth) {
        signOut(auth);
    }
  };

  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
            <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full animate-pulse bg-primary-DEFAULT"></div>
                <span>Checking login status...</span>
            </div>
        </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return <AdminDashboard {...props} onLogout={handleLogout} />;
};

export default AdminView;