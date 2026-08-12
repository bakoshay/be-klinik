import type { Schedule } from "../types/dokter";
import type { Hari } from "@prisma/client";

export const validDays = ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu", "minggu"];

export function isValidDay(day: string) {
  return validDays.includes(day.toLowerCase());
}

export function mapSchedules(schedules: Schedule[]) {
  return schedules.map(s => ({
    hari: s.day as Hari,
    jam_mulai: s.start,
    jam_selesai: s.end,
  }));
}