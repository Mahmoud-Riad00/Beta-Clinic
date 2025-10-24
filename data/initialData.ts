import { Clinic, Doctor } from '../types';

export const initialClinics: Clinic[] = [
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
  {
    id: 'c5',
    name: 'Sunrise Pediatrics',
    specialty: 'Pediatrics',
    imageURL: 'https://picsum.photos/seed/pediatrics/600/400',
  },
  {
    id: 'c6',
    name: 'Clear Skin Dermatology',
    specialty: 'Dermatology',
    imageURL: 'https://picsum.photos/seed/dermatology/600/400',
  },
  {
    id: 'c7',
    name: 'VisionFirst Eye Care',
    specialty: 'Ophthalmology',
    imageURL: 'https://picsum.photos/seed/vision/600/400',
  },
  {
    id: 'c8',
    name: 'MindWell Psychiatry',
    specialty: 'Psychiatry',
    imageURL: 'https://picsum.photos/seed/mind/600/400',
  },
];

export const initialDoctors: Doctor[] = [
  { id: 'd1', name: 'Dr. Alice Johnson', specialty: 'General Practitioner', available: true, clinicId: 'c1', photoURL: 'https://picsum.photos/seed/alice/100/100' },
  { id: 'd2', name: 'Dr. Bob Williams', specialty: 'Cardiologist', available: true, clinicId: 'c2', photoURL: 'https://picsum.photos/seed/bob/100/100' },
  { id: 'd3', name: 'Dr. Carol White', specialty: 'Dentist', available: false, clinicId: 'c3', photoURL: 'https://picsum.photos/seed/carol/100/100' },
  { id: 'd4', name: 'Dr. David Green', specialty: 'General Practitioner', available: true, clinicId: 'c1', photoURL: 'https://picsum.photos/seed/david/100/100' },
  { id: 'd5', name: 'Dr. Eve Black', specialty: 'Cardiologist', available: false, clinicId: 'c2', photoURL: 'https://picsum.photos/seed/eve/100/100' },
  { id: 'd6', name: 'Dr. Frank Castle', specialty: 'Orthopedist', available: true, clinicId: 'c4', photoURL: 'https://picsum.photos/seed/frank/100/100' },
  { id: 'd7', name: 'Dr. Grace Hall', specialty: 'Pediatrician', available: true, clinicId: 'c5', photoURL: 'https://picsum.photos/seed/grace/100/100' },
  { id: 'd8', name: 'Dr. Henry Ives', specialty: 'Pediatrician', available: false, clinicId: 'c5', photoURL: 'https://picsum.photos/seed/henry/100/100' },
  { id: 'd9', name: 'Dr. Ivy Jones', specialty: 'Dermatologist', available: true, clinicId: 'c6', photoURL: 'https://picsum.photos/seed/ivy/100/100' },
  { id: 'd10', name: 'Dr. Jack King', specialty: 'Dermatologist', available: true, clinicId: 'c6', photoURL: 'https://picsum.photos/seed/jack/100/100' },
  { id: 'd11', name: 'Dr. Karen Lee', specialty: 'Ophthalmologist', available: false, clinicId: 'c7', photoURL: 'https://picsum.photos/seed/karen/100/100' },
  { id: 'd12', name: 'Dr. Leo Miller', specialty: 'Ophthalmologist', available: true, clinicId: 'c7', photoURL: 'https://picsum.photos/seed/leo/100/100' },
  { id: 'd13', name: 'Dr. Mona Nelson', specialty: 'Psychiatrist', available: true, clinicId: 'c8', photoURL: 'https://picsum.photos/seed/mona/100/100' },
  { id: 'd14', name: 'Dr. Oscar Price', specialty: 'Psychiatrist', available: true, clinicId: 'c8', photoURL: 'https://picsum.photos/seed/oscar/100/100' },
  { id: 'd15', name: 'Dr. Nancy Drew', specialty: 'Dentist', available: true, clinicId: 'c3', photoURL: 'https://picsum.photos/seed/nancy/100/100' },
  { id: 'd16', name: 'Dr. Peter Pan', specialty: 'Orthopedist', available: false, clinicId: 'c4', photoURL: 'https://picsum.photos/seed/peter/100/100' },
];
