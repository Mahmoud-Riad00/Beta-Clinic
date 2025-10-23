
export interface Clinic {
  id: string;
  name: string;
  specialty: string;
  imageURL: string;
}

export interface Doctor {
  id:string;
  name: string;
  specialty: string;
  available: boolean;
  clinicId: string;
  photoURL: string;
}