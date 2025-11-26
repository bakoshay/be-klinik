export const validate =
  (schema: any) =>
  ({ body, set }: any) => {
    try {
      schema.parse(body);
    } catch (err: any) {
      set.status = 400;
      return {
        status: false,
        message: "Validation error",
        errors: err.errors,
      };
    }
  };
