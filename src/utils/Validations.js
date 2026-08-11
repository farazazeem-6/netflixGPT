import { MESSAGES } from "./message";

export const validateSignIn = (email, password) => {
  const isValidEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
    email.trim(),
  );
  const isValidPassword = /^.{4,60}$/.test(password.trim());

  if (!isValidEmail) {
    return { field: "email", message: MESSAGES.VALID_EMAIL_MESSAGE };
  }
  if (!isValidPassword) {
    return {
      field: "password",
      message: MESSAGES.PASSWORD_LENGTH_4_60,
    };
  }
  return null;
};

export const validateSignUp = (email, password, name) => {
  const isValidEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
    email.trim(),
  );
  const isValidPassword = /^.{6,60}$/.test(password.trim());
  const isValidName = /^[A-Za-z]{3,}(?: [A-Za-z]+)*$/.test(name.trim());

  if (!isValidName) {
    return { field: "name", message: MESSAGES.VALID_NAME_MESSAGE };
  }
  if (!isValidEmail) {
    return { field: "email", message: MESSAGES.VALID_EMAIL_MESSAGE };
  }
  if (!isValidPassword) {
    return {
      field: "password",
      message: MESSAGES.PASSWORD_LENGTH_6_60,
    };
  }
  return null;
};

export const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
