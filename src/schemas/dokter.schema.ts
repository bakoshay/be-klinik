import { t } from "elysia";

export const scheduleSchema = t.Object({
  day: t.String(),
  start: t.String(),
  end: t.String(),
});

export const createDokterSchema = t.Object({
  name: t.String(),
  specialty: t.String(),
  gender: t.String(),
  phone: t.String(),
  address: t.String(),
  is_active: t.Boolean(),

  schedules: t.Array(scheduleSchema),
});

export const updateDokterSchema = t.Object({
  name: t.Optional(t.String()),
  specialty: t.Optional(t.String()),
  gender: t.Optional(t.String()),
  phone: t.Optional(t.String()),
  address: t.Optional(t.String()),
  is_active: t.Optional(t.Boolean()),

  schedules: t.Optional(t.Array(scheduleSchema)),
});