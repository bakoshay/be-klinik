export const validDays = ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu", "minggu"];

export function isValidDay(day: string) {
  return validDays.includes(day.toLowerCase());
}

export function mapSchedules(schedules: any[]) {
  return schedules.map(s => ({
    hari: s.day,
    jam_mulai: s.start,
    jam_selesai: s.end,
  }));
}