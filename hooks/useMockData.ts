import { useState, useCallback } from 'react';
import { Clinic, Doctor } from '../types';

const initialClinics: Clinic[] = [
  {
    id: 'c1',
    name: 'Wellness Center',
    address: '123 Health St, Medville',
    specialty: 'General Medicine',
    imageURL: 'https://placehold.co/600x400/e0f2fe/0369a1?text=Wellness+Center',
  },
  {
    id: 'c2',
    name: 'City Heart Clinic',
    address: '456 Pulse Ave, Cardio City',
    specialty: 'Cardiology',
    imageURL: 'https://placehold.co/600x400/e0f2fe/0369a1?text=Heart+Clinic',
  },
  {
    id: 'c3',
    name: 'Dental Care Associates',
    address: '789 Smile Rd, Toothville',
    specialty: 'Dentistry',
    imageURL: 'https://placehold.co/600x400/e0f2fe/0369a1?text=Dental+Care',
  },
];

const initialDoctors: Doctor[] = [
  { id: 'd1', name: 'Dr. Alice Johnson', specialty: 'General Practitioner', available: true, clinicId: 'c1' },
  { id: 'd2', name: 'Dr. Bob Williams', specialty: 'Cardiologist', available: true, clinicId: 'c2' },
  { id: 'd3', name: 'Dr. Carol White', specialty: 'Dentist', available: false, clinicId: 'c3' },
  { id: 'd4', name: 'Dr. David Green', specialty: 'General Practitioner', available: true, clinicId: 'c1' },
  { id: 'd5', name: 'Dr. Eve Black', specialty: 'Cardiologist', available: false, clinicId: 'c2' },
];

export const useMockData = () => {
    const [clinics, setClinics] = useState<Clinic[]>(initialClinics);
    const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);

    const addClinic = useCallback((clinic: Omit<Clinic, 'id'>) => {
        const newClinic = { ...clinic, id: `c${Date.now()}` };
        setClinics(prev => [...prev, newClinic]);
    }, []);

    const updateClinic = useCallback((updatedClinic: Clinic) => {
        setClinics(prev => prev.map(c => c.id === updatedClinic.id ? updatedClinic : c));
    }, []);

    const deleteClinic = useCallback((clinicId: string) => {
        setClinics(prev => prev.filter(c => c.id !== clinicId));
        // Also delete doctors of that clinic
        setDoctors(prev => prev.filter(d => d.clinicId !== clinicId));
    }, []);

    const addDoctor = useCallback((doctor: Omit<Doctor, 'id'>) => {
        const newDoctor = { ...doctor, id: `d${Date.now()}` };
        setDoctors(prev => [...prev, newDoctor]);
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
        deleteDoctor,
        loading: false // Mock data is loaded instantly
    };
};