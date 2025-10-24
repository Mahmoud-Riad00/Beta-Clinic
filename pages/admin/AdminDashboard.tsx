
import React, { useState } from 'react';
import { Clinic, Doctor } from '../../types';
import ClinicsManagement from './ClinicsManagement';
import DoctorsManagement from './DoctorsManagement';
import { BuildingLibraryIcon, UserIcon } from '../../components/icons/Icons';
import { db } from '../../firebase/firebase';
import { collection, doc, writeBatch } from 'firebase/firestore';
import { initialClinics, initialDoctors } from '../../data/initialData';


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
  const [isSeeding, setIsSeeding] = useState(false);

  const getTabClass = (tab: AdminTab) => 
    `flex items-center px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
        activeTab === tab 
        ? 'border-primary-DEFAULT text-primary-dark dark:text-primary-light' 
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
    }`;

  const handleSeedDatabase = async () => {
    if (!db) {
        alert("Firebase is not configured.");
        return;
    }
    if (props.clinics.length > 0 || props.doctors.length > 0) {
        alert("Database already contains data. Seeding is not required.");
        return;
    }

    setIsSeeding(true);
    try {
        const batch = writeBatch(db);
        const idMap = new Map<string, string>();

        // Seed clinics and create a map from old IDs to new Firestore IDs
        initialClinics.forEach(clinic => {
            const clinicRef = doc(collection(db, 'clinics'));
            idMap.set(clinic.id, clinicRef.id);
            const { id, ...clinicData } = clinic;
            batch.set(clinicRef, clinicData);
        });

        // Seed doctors using the new clinic IDs
        initialDoctors.forEach(doctor => {
            const newClinicId = idMap.get(doctor.clinicId);
            if (newClinicId) {
                const doctorRef = doc(collection(db, 'doctors'));
                const { id, clinicId, ...doctorData } = doctor;
                batch.set(doctorRef, { ...doctorData, clinicId: newClinicId });
            }
        });

        await batch.commit();
        alert("Database seeded successfully! The page will now reflect the new data.");
    } catch (error) {
        console.error("Error seeding database: ", error);
        alert("An error occurred while seeding the database. Check the console for details.");
    } finally {
        setIsSeeding(false);
    }
};


  return (
    <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
             <h1 className="text-3xl font-bold text-primary-dark dark:text-primary-light">Admin Dashboard</h1>
            <button onClick={props.onLogout} className="px-4 py-2 text-sm font-medium text-red-100 bg-red-700 hover:bg-red-800 rounded-md shadow-sm">
                Logout
            </button>
        </div>

        {props.clinics.length === 0 && db && (
            <div className="mb-6 p-4 bg-primary-light dark:bg-sky-900 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in-up">
                <p className="text-primary-dark dark:text-primary-light font-medium text-center sm:text-left">
                    Your database is empty. You can seed it with initial sample data to get started.
                </p>
                <button 
                    onClick={handleSeedDatabase}
                    disabled={isSeeding}
                    className="px-4 py-2 text-sm font-semibold text-primary-dark bg-white hover:bg-sky-50 rounded-md shadow-sm transition-colors disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed"
                >
                    {isSeeding ? 'Seeding...' : 'Seed Database'}
                </button>
            </div>
        )}

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