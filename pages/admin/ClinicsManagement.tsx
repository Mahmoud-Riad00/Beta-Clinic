import React, { useState, useEffect } from 'react';
import { Clinic } from '../../types';
import { PencilIcon, TrashIcon, XMarkIcon, PlusIcon } from '../../components/icons/Icons';

interface ClinicsManagementProps {
  clinics: Clinic[];
  addClinic: (clinic: Omit<Clinic, 'id'>) => void;
  updateClinic: (clinic: Clinic) => void;
  deleteClinic: (clinicId: string) => void;
}

const emptyClinic: Omit<Clinic, 'id'> = { name: '', address: '', specialty: '', imageURL: '' };

const ClinicsManagement: React.FC<ClinicsManagementProps> = ({ clinics, addClinic, updateClinic, deleteClinic }) => {
  const [formData, setFormData] = useState(emptyClinic);
  const [editingClinic, setEditingClinic] = useState<Clinic | null>(null);

  useEffect(() => {
    if (editingClinic) {
      setFormData(editingClinic);
    } else {
      setFormData(emptyClinic);
    }
  }, [editingClinic]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingClinic) {
      updateClinic({ ...editingClinic, ...formData });
    } else {
      addClinic(formData);
    }
    setEditingClinic(null);
    setFormData(emptyClinic);
  };

  const handleEdit = (clinic: Clinic) => {
    setEditingClinic(clinic);
  };

  const cancelEdit = () => {
    setEditingClinic(null);
    setFormData(emptyClinic);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <div className="p-6 bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-primary-dark dark:text-primary-light">{editingClinic ? 'Edit Clinic' : 'Add New Clinic'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" required className="w-full p-2 border rounded bg-background-light text-text-light dark:bg-background-dark dark:border-gray-600 dark:text-text-dark"/>
            <input name="address" value={formData.address} onChange={handleInputChange} placeholder="Address" required className="w-full p-2 border rounded bg-background-light text-text-light dark:bg-background-dark dark:border-gray-600 dark:text-text-dark"/>
            <input name="specialty" value={formData.specialty} onChange={handleInputChange} placeholder="Specialty" required className="w-full p-2 border rounded bg-background-light text-text-light dark:bg-background-dark dark:border-gray-600 dark:text-text-dark"/>
            <input name="imageURL" value={formData.imageURL} onChange={handleInputChange} placeholder="Image URL" required className="w-full p-2 border rounded bg-background-light text-text-light dark:bg-background-dark dark:border-gray-600 dark:text-text-dark"/>
            <div className="flex space-x-2">
                <button type="submit" className="flex-1 flex items-center justify-center py-2 px-4 text-white bg-primary-DEFAULT hover:bg-primary-dark rounded-md transition-colors">
                    {editingClinic ? 'Update' : <><PlusIcon className="h-5 w-5 mr-1" /> Add</>}
                </button>
                {editingClinic && (
                    <button type="button" onClick={cancelEdit} className="flex-1 py-2 px-4 text-white bg-secondary hover:bg-gray-600 rounded-md transition-colors flex items-center justify-center">
                        <XMarkIcon className="h-5 w-5 mr-1" /> Cancel
                    </button>
                )}
            </div>
          </form>
        </div>
      </div>
      <div className="lg:col-span-2">
        <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Specialty</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clinics.map(clinic => (
                <tr key={clinic.id} className="bg-white border-b dark:bg-surface-dark dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{clinic.name}</td>
                  <td className="px-6 py-4">{clinic.specialty}</td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button onClick={() => handleEdit(clinic)} className="p-2 text-blue-600 hover:text-blue-800"><PencilIcon className="h-5 w-5"/></button>
                    <button onClick={() => deleteClinic(clinic.id)} className="p-2 text-red-600 hover:text-red-800"><TrashIcon className="h-5 w-5"/></button>
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

export default ClinicsManagement;