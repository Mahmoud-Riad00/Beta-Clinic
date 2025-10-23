
import React, { useState } from 'react';
import { Clinic, Doctor } from '../../types';
import ClinicsManagement from './ClinicsManagement';
import DoctorsManagement from './DoctorsManagement';
import { BuildingLibraryIcon, UserIcon } from '../../components/icons/Icons';

interface AdminDashboardProps {
  clinics: Clinic[];
  doctors: Doctor[];
  addClinic: (clinic: Omit<Clinic, 'id'>) => void;
  updateClinic: (clinic: Clinic) => void;
  deleteClinic: (clinicId: string) => void;
  addDoctor: (doctor: Omit<Doctor, 'id'>) => void;
  updateDoctor: (doctor: Doctor) => void;
  deleteDoctor: (doctorId: string) => void;
  onLogout: () => void;
}

type AdminTab = 'clinics' | 'doctors';

const AdminDashboard: React.FC<AdminDashboardProps> = (props) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('clinics');

  const getTabClass = (tab: AdminTab) => 
    `flex items-center px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
        activeTab === tab 
        ? 'border-primary-DEFAULT text-primary-dark dark:text-primary-light' 
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
    }`;


  return (
    <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
             <h1 className="text-3xl font-bold text-primary-dark dark:text-primary-light">Admin Dashboard</h1>
            <button onClick={props.onLogout} className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md shadow-sm">
                Logout
            </button>
        </div>
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-4" aria-label="Tabs">
          <button className={getTabClass('clinics')} onClick={() => setActiveTab('clinics')}>
            <BuildingLibraryIcon className="h-5 w-5 mr-2" />
            Clinics Management
          </button>
          <button className={getTabClass('doctors')} onClick={() => setActiveTab('doctors')}>
            <UserIcon className="h-5 w-5 mr-2" />
            Doctors Management
          </button>
        </nav>
      </div>

      <div className="mt-8">
        {activeTab === 'clinics' && (
          <ClinicsManagement
            clinics={props.clinics}
            addClinic={props.addClinic}
            updateClinic={props.updateClinic}
            deleteClinic={props.deleteClinic}
          />
        )}
        {activeTab === 'doctors' && (
          <DoctorsManagement
            doctors={props.doctors}
            clinics={props.clinics}
            addDoctor={props.addDoctor}
            updateDoctor={props.updateDoctor}
            deleteDoctor={props.deleteDoctor}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
