export const baseResponseFunctionError = (data: any) => {
  const obj = {
    code: 400,
    error: true,
    success: false,
    data: {},
    message: "Error",
  };
  return {
    ...obj,
    code: data.code || obj.code,
    error: data.error || obj.error,
    success: obj.success,
    data: data.data || obj.data,
    message: data.message || obj.message,
  };
};
export const baseResponseFunctionSuccess = (data: any) => {
  const obj = {
    code: 200,
    error: false,
    success: true,
    data: {},
    message: "Success",
  };
  return {
    ...obj,
    code: data.code || obj.code,
    error: data.error || obj.error,
    success: obj.success,
    data: data.data || obj.data,
    message: data.message || obj.message,
  };
};
export enum clientType{
  web='web',
  mobile='mobile'
}