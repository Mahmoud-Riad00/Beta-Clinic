import React, { useState, useMemo } from 'react';
import { Clinic, Doctor } from '../types';
import { MapPinIcon, StethoscopeIcon, UserIcon, ChevronLeftIcon } from '../components/icons/Icons';

interface PublicViewProps {
  clinics: Clinic[];
  doctors: Doctor[];
}

const DoctorCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => (
  <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-lg shadow-sm flex items-center space-x-4 transition-transform hover:scale-105">
    <UserIcon className="h-10 w-10 text-primary-DEFAULT rounded-full bg-primary-light dark:bg-primary-dark p-2"/>
    <div className="flex-grow">
      <p className="font-semibold text-text-light dark:text-text-dark">{doctor.name}</p>
      <p className="text-sm text-secondary dark:text-gray-400">{doctor.specialty}</p>
    </div>
    <div className={`flex items-center space-x-2 text-sm ${doctor.available ? 'text-green-500' : 'text-red-500'}`}>
      <span className={`h-3 w-3 rounded-full ${doctor.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
      <span>{doctor.available ? 'Available' : 'Unavailable'}</span>
    </div>
  </div>
);

const ClinicCard: React.FC<{ clinic: Clinic; onSelect: () => void; doctorCount: number }> = ({ clinic, onSelect, doctorCount }) => (
  <div onClick={onSelect} className="cursor-pointer bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 group">
    <img className="h-48 w-full object-cover" src={clinic.imageURL} alt={clinic.name} />
    <div className="p-6">
      <h3 className="text-xl font-bold text-primary-dark dark:text-primary-light mb-2 group-hover:text-primary-DEFAULT">{clinic.name}</h3>
      <div className="flex items-center text-secondary dark:text-gray-400 mb-2">
        <MapPinIcon className="h-5 w-5 mr-2"/>
        <span>{clinic.address}</span>
      </div>
      <div className="flex items-center text-secondary dark:text-gray-400 mb-4">
        <StethoscopeIcon className="h-5 w-5 mr-2"/>
        <span>{clinic.specialty}</span>
      </div>
      <div className="text-right font-medium text-primary-DEFAULT">
        {doctorCount} {doctorCount === 1 ? 'Doctor' : 'Doctors'}
      </div>
    </div>
  </div>
);

const PublicView: React.FC<PublicViewProps> = ({ clinics, doctors }) => {
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDoctors = useMemo(() => {
    if (!selectedClinic) return [];
    return doctors
      .filter(d => d.clinicId === selectedClinic.id)
      .filter(
        d =>
          d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [selectedClinic, doctors, searchQuery]);

  const doctorCounts = useMemo(() => {
    const counts = new Map<string, number>();
    doctors.forEach(doctor => {
        counts.set(doctor.clinicId, (counts.get(doctor.clinicId) || 0) + 1);
    });
    clinics.forEach(clinic => {
        if (!counts.has(clinic.id)) {
            counts.set(clinic.id, 0);
        }
    });
    return counts;
  }, [doctors, clinics]);

  if (selectedClinic) {
    return (
      <div className="container mx-auto">
        <button onClick={() => setSelectedClinic(null)} className="flex items-center mb-6 text-primary-DEFAULT hover:text-primary-dark dark:hover:text-primary-light font-semibold transition-colors">
          <ChevronLeftIcon className="h-5 w-5 mr-1" />
          Back to Clinics
        </button>
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-primary-dark dark:text-primary-light">{selectedClinic.name}</h2>
          <p className="text-secondary dark:text-gray-400 mt-1">{selectedClinic.address}</p>
        </div>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search doctors by name or specialty..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-DEFAULT focus:border-primary-DEFAULT bg-surface-light text-text-light dark:bg-surface-dark dark:border-gray-600 dark:text-text-dark"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map(doctor => <DoctorCard key={doctor.id} doctor={doctor} />)
          ) : (
            <p className="text-secondary dark:text-gray-400 col-span-full text-center">No doctors found matching your search.</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-primary-dark dark:text-primary-light">Our Clinics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {clinics.map(clinic => (
          <ClinicCard key={clinic.id} clinic={clinic} onSelect={() => setSelectedClinic(clinic)} doctorCount={doctorCounts.get(clinic.id) || 0} />
        ))}
      </div>
    </div>
  );
};

export default PublicView;