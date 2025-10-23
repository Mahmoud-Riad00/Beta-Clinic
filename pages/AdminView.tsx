
import React, { useState } from 'react';
import { Clinic, Doctor } from '../types';
import LoginForm from './admin/LoginForm';
import AdminDashboard from './admin/AdminDashboard';

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsAuthenticated(true);
    }
  };
  
  const handleLogout = () => {
      setIsAuthenticated(false);
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <AdminDashboard {...props} onLogout={handleLogout}/>;
};

export default AdminView;
