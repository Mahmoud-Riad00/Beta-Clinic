import React, { useState, useEffect, useMemo } from 'react';
import { Doctor, Clinic } from '../../types';
import { PencilIcon, TrashIcon, XMarkIcon, PlusIcon } from '../../components/icons/Icons';

interface DoctorsManagementProps {
  doctors: Doctor[];
  clinics: Clinic[];
  addDoctor: (doctor: Omit<Doctor, 'id'>) => void;
  updateDoctor: (doctor: Doctor) => void;
  deleteDoctor: (doctorId: string) => void;
}

const emptyDoctor: Omit<Doctor, 'id'> = { name: '', specialty: '', available: true, clinicId: '', photoURL: '' };

const DoctorsManagement: React.FC<DoctorsManagementProps> = ({ doctors, clinics, addDoctor, updateDoctor, deleteDoctor }) => {
  const [formData, setFormData] = useState(emptyDoctor);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const noClinics = clinics.length === 0;

  const clinicMap = useMemo(() => {
    return new Map(clinics.map(clinic => [clinic.id, clinic.name]));
  }, [clinics]);

  useEffect(() => {
    if (editingDoctor) {
      setFormData(editingDoctor);
    } else {
        // Ensure clinicId is set to the first clinic if available, otherwise empty
        setFormData({ ...emptyDoctor, clinicId: noClinics ? '' : clinics[0].id });
    }
  }, [editingDoctor, clinics, noClinics]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({...prev, [name]: checked}));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(noClinics){
        alert("You must create a clinic before adding a doctor.");
        return;
    }
    if (editingDoctor) {
      updateDoctor({ ...editingDoctor, ...formData });
    } else {
      addDoctor(formData);
    }
    setEditingDoctor(null);
    setFormData({ ...emptyDoctor, clinicId: noClinics ? '' : clinics[0].id });
  };

  const handleEdit = (doctor: Doctor) => {
    setEditingDoctor(doctor);
  };
  
  const cancelEdit = () => {
    setEditingDoctor(null);
    setFormData({ ...emptyDoctor, clinicId: noClinics ? '' : clinics[0].id });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <div className="p-6 bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-primary-dark dark:text-primary-light">{editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}</h3>
            {noClinics ? (
                 <div className="text-center text-secondary dark:text-gray-400 p-4 border-2 border-dashed rounded-lg">
                    <p>You must create a clinic before you can add a doctor.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" required className="w-full p-2 border rounded bg-background-light text-text-light dark:bg-background-dark dark:border-gray-600 dark:text-text-dark"/>
                    <input name="specialty" value={formData.specialty} onChange={handleInputChange} placeholder="Specialty" required className="w-full p-2 border rounded bg-background-light text-text-light dark:bg-background-dark dark:border-gray-600 dark:text-text-dark"/>
                    <input name="photoURL" value={formData.photoURL} onChange={handleInputChange} placeholder="Photo URL" required className="w-full p-2 border rounded bg-background-light text-text-light dark:bg-background-dark dark:border-gray-600 dark:text-text-dark"/>
                    <select name="clinicId" value={formData.clinicId} onChange={handleInputChange} required className="w-full p-2 border rounded bg-background-light text-text-light dark:bg-background-dark dark:border-gray-600 dark:text-text-dark">
                    <option value="" disabled>Select Clinic</option>
                    {clinics.map(clinic => <option key={clinic.id} value={clinic.id}>{clinic.name}</option>)}
                    </select>
                    <div className="flex items-center">
                    <input type="checkbox" id="available" name="available" checked={formData.available} onChange={handleCheckboxChange} className="h-4 w-4 text-primary-DEFAULT border-gray-300 rounded focus:ring-primary-DEFAULT"/>
                    <label htmlFor="available" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">Available</label>
                    </div>
                    <div className="flex space-x-2">
                        <button type="submit" className="flex-1 flex items-center justify-center py-2 px-4 text-primary-light bg-primary-dark hover:bg-sky-900 rounded-md transition-colors">
                            {editingDoctor ? 'Update' : <><PlusIcon className="h-5 w-5 mr-1" /> Add</>}
                        </button>
                        {editingDoctor && (
                            <button type="button" onClick={cancelEdit} className="flex-1 py-2 px-4 text-slate-100 bg-slate-500 hover:bg-slate-600 rounded-md transition-colors flex items-center justify-center">
                                <XMarkIcon className="h-5 w-5 mr-1" /> Cancel
                            </button>
                        )}
                    </div>
                </form>
            )}
        </div>
      </div>
      <div className="lg:col-span-2">
        <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
             <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Photo</th>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Specialty</th>
                <th scope="col" className="px-6 py-3">Clinic</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map(doctor => (
                <tr key={doctor.id} className="bg-white border-b dark:bg-surface-dark dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4">
                    <img src={doctor.photoURL} alt={doctor.name} className="h-10 w-10 rounded-full object-cover"/>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{doctor.name}</td>
                  <td className="px-6 py-4">{doctor.specialty}</td>
                  <td className="px-6 py-4">{clinicMap.get(doctor.clinicId) || 'N/A'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${doctor.available ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                      {doctor.available ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button onClick={() => handleEdit(doctor)} className="p-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"><PencilIcon className="h-5 w-5"/></button>
                    <button onClick={() => deleteDoctor(doctor.id)} className="p-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"><TrashIcon className="h-5 w-5"/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorsManagement;