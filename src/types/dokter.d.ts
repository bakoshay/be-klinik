export interface Schedule {
  day: string;
  start: string;
  end: string;
}

export interface Dokter {
  name: string;
  specialty: string;
  gender: string;
  phone: string;
  address: string;
  is_active: boolean;
  schedules: Schedule[];
}