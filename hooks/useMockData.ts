
import { useState, useCallback } from 'react';
import { Clinic, Doctor } from '../types';

const initialClinics: Clinic[] = [
  { id: 'c1', name: 'General Health Clinic', address: '123 Health St, Medville', specialty: 'General Medicine', imageURL: 'https://picsum.photos/seed/clinic1/600/400' },
  { id: 'c2', name: 'Cardiology Center', address: '456 Heart Ave, Cardioton', specialty: 'Cardiology', imageURL: 'https://picsum.photos/seed/clinic2/600/400' },
  { id: 'c3', name: 'Pediatric Care', address: '789 Child Way, Kidstown', specialty: 'Pediatrics', imageURL: 'https://picsum.photos/seed/clinic3/600/400' },
  { id: 'c4', name: 'Dermatology Associates', address: '101 Skin Blvd, Glowburg', specialty: 'Dermatology', imageURL: 'https://picsum.photos/seed/clinic4/600/400' },
];

const initialDoctors: Doctor[] = [
  { id: 'd1', name: 'Dr. Alice Johnson', specialty: 'General Practitioner', available: true, clinicId: 'c1' },
  { id: 'd2', name: 'Dr. Bob Williams', specialty: 'General Practitioner', available: false, clinicId: 'c1' },
  { id: 'd3', name: 'Dr. Charlie Brown', specialty: 'Cardiologist', available: true, clinicId: 'c2' },
  { id: 'd4', name: 'Dr. Diana Prince', specialty: 'Pediatrician', available: true, clinicId: 'c3' },
  { id: 'd5', name: 'Dr. Eve Adams', specialty: 'Dermatologist', available: false, clinicId: 'c4' },
  { id: 'd6', name: 'Dr. Frank Miller', specialty: 'Cardiologist', available: true, clinicId: 'c2' },
  { id: 'd7', name: 'Dr. Grace Lee', specialty: 'Pediatrician', available: false, clinicId: 'c3' },
  { id: 'd8', name: 'Dr. Henry Wilson', specialty: 'General Practitioner', available: true, clinicId: 'c1' },
];

export const useMockData = () => {
  const [clinics, setClinics] = useState<Clinic[]>(initialClinics);
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);

  // Clinic Operations
  const addClinic = useCallback((clinic: Omit<Clinic, 'id'>) => {
    setClinics(prev => [...prev, { ...clinic, id: `c${Date.now()}` }]);
  }, []);

  const updateClinic = useCallback((updatedClinic: Clinic) => {
    setClinics(prev => prev.map(c => c.id === updatedClinic.id ? updatedClinic : c));
  }, []);

  const deleteClinic = useCallback((clinicId: string) => {
    setClinics(prev => prev.filter(c => c.id !== clinicId));
    setDoctors(prev => prev.filter(d => d.clinicId !== clinicId)); // Also remove associated doctors
  }, []);

  // Doctor Operations
  const addDoctor = useCallback((doctor: Omit<Doctor, 'id'>) => {
    setDoctors(prev => [...prev, { ...doctor, id: `d${Date.now()}` }]);
  }, []);

  const updateDoctor = useCallback((updatedDoctor: Doctor) => {
    setDoctors(prev => prev.map(d => d.id === updatedDoctor.id ? updatedDoctor : d));
  }, []);

  const deleteDoctor = useCallback((doctorId: string) => {
    setDoctors(prev => prev.filter(d => d.id !== doctorId));
  }, []);

  return {
    clinics,
    doctors,
    addClinic,
    updateClinic,
    deleteClinic,
    addDoctor,
    updateDoctor,
    deleteDoctor
  };
};
