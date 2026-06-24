export interface Dentist {
  id: string;
  name: string;
  role: string;
  image: string;
  specialty: string;
  rating: number;
  reviewsCount: number;
  bio: string;
  education: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  iconName: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  service: string;
  avatar: string;
}

export interface Appointment {
  id: string;
  serviceId: string;
  serviceName: string;
  dentistId: string;
  dentistName: string;
  date: string;
  time: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  status: 'confirmed' | 'cancelled';
  createdAt: string;
}
