export const success = (message: string, data?: unknown) => ({
  status: true,
  message,
  data
})

export const error = (message: string, code = 400) => ({
  status: false,
  message,
  code
})
