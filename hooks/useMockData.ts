import { useState, useCallback, useEffect } from 'react';
import { Clinic, Doctor } from '../types';

const initialClinics: Clinic[] = [
  {
    id: 'c1',
    name: 'Wellness Center',
    specialty: 'General Medicine',
    imageURL: 'https://picsum.photos/seed/wellness/600/400',
  },
  {
    id: 'c2',
    name: 'City Heart Clinic',
    specialty: 'Cardiology',
    imageURL: 'https://picsum.photos/seed/heart/600/400',
  },
  {
    id: 'c3',
    name: 'Dental Care Associates',
    specialty: 'Dentistry',
    imageURL: 'https://picsum.photos/seed/dental/600/400',
  },
  {
    id: 'c4',
    name: 'OrthoPro Clinic',
    specialty: 'Orthopedics',
    imageURL: 'https://picsum.photos/seed/ortho/600/400',
  },
];

const initialDoctors: Doctor[] = [
  { id: 'd1', name: 'Dr. Alice Johnson', specialty: 'General Practitioner', available: true, clinicId: 'c1', photoURL: 'https://picsum.photos/seed/alice/100/100' },
  { id: 'd2', name: 'Dr. Bob Williams', specialty: 'Cardiologist', available: true, clinicId: 'c2', photoURL: 'https://picsum.photos/seed/bob/100/100' },
  { id: 'd3', name: 'Dr. Carol White', specialty: 'Dentist', available: false, clinicId: 'c3', photoURL: 'https://picsum.photos/seed/carol/100/100' },
  { id: 'd4', name: 'Dr. David Green', specialty: 'General Practitioner', available: true, clinicId: 'c1', photoURL: 'https://picsum.photos/seed/david/100/100' },
  { id: 'd5', name: 'Dr. Eve Black', specialty: 'Cardiologist', available: false, clinicId: 'c2', photoURL: 'https://picsum.photos/seed/eve/100/100' },
  { id: 'd6', name: 'Dr. Frank Castle', specialty: 'Orthopedist', available: true, clinicId: 'c4', photoURL: 'https://picsum.photos/seed/frank/100/100' },
];

export const useMockData = () => {
    const [clinics, setClinics] = useState<Clinic[]>([]);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setClinics(initialClinics);
            setDoctors(initialDoctors);
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);


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
        loading
    };
};