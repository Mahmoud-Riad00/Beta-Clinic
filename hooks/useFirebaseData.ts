import { useState, useEffect, useCallback } from 'react';
import { db } from '../firebase/firebase';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, where, getDocs, writeBatch } from 'firebase/firestore';
import { Clinic, Doctor } from '../types';

export const useFirebaseData = () => {
    const [clinics, setClinics] = useState<Clinic[]>([]);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!db) {
            setLoading(false);
            return;
        }

        setLoading(true);
        const unsubscribeClinics = onSnapshot(collection(db, 'clinics'), (snapshot) => {
            const clinicsData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Clinic));
            setClinics(clinicsData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching clinics: ", error);
            setLoading(false);
        });

        const unsubscribeDoctors = onSnapshot(collection(db, 'doctors'), (snapshot) => {
            const doctorsData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Doctor));
            setDoctors(doctorsData);
        }, (error) => {
            console.error("Error fetching doctors: ", error);
        });

        return () => {
            unsubscribeClinics();
            unsubscribeDoctors();
        };
    }, []);

    const addClinic = useCallback(async (clinic: Omit<Clinic, 'id'>) => {
        if (!db) return;
        await addDoc(collection(db, 'clinics'), clinic);
    }, []);

    const updateClinic = useCallback(async (updatedClinic: Clinic) => {
        if (!db) return;
        const { id, ...data } = updatedClinic;
        const clinicRef = doc(db, 'clinics', id);
        await updateDoc(clinicRef, data);
    }, []);

    const deleteClinic = useCallback(async (clinicId: string) => {
        if (!db) return;
        // First, find and delete all doctors associated with this clinic
        const q = query(collection(db, "doctors"), where("clinicId", "==", clinicId));
        const querySnapshot = await getDocs(q);
        const batch = writeBatch(db);
        querySnapshot.forEach((doc) => {
            batch.delete(doc.ref);
        });
        await batch.commit();

        // Then, delete the clinic itself
        await deleteDoc(doc(db, 'clinics', clinicId));
    }, []);

    const addDoctor = useCallback(async (doctor: Omit<Doctor, 'id'>) => {
        if (!db) return;
        await addDoc(collection(db, 'doctors'), doctor);
    }, []);

    const updateDoctor = useCallback(async (updatedDoctor: Doctor) => {
        if (!db) return;
        const { id, ...data } = updatedDoctor;
        const doctorRef = doc(db, 'doctors', id);
        await updateDoc(doctorRef, data);
    }, []);

    const deleteDoctor = useCallback(async (doctorId: string) => {
        if (!db) return;
        await deleteDoc(doc(db, 'doctors', doctorId));
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