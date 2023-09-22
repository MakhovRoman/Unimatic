export const REQUIRED_MESSAGE = "Обязательное для заполнения";

export enum InputNames {
  PASSWORD = "PASSWORD",
  CONFIRM_PASSWORD = "CONFIRM_PASSWORD",
  EMAIL = "EMAIL",
  NAME = "NAME",
}

export const ERROR_MESSAGE: Record<string, string> = {
  PASSWORD: "От 8 до 40 символов (EN), обязательно хотя бы одна заглавная буква и цифра",
  CONFIRM_PASSWORD: "Пароли не совпадают",
  EMAIL: "(EN), непробельные знаки, @..., .домен",
  NAME: "(RU/EN), первая буква прописная, -",
};

const VALIDATE_REGEXP: Record<string, RegExp> = {
  PASSWORD: /(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*/,
  EMAIL: /^[a-zA-Z0-9-_\\/=+(){}\\[\]$!]+@[a-zA-Z]+\.[a-zA-Z0-9]+$/,
  NAME: /^[A-ZА-ЯЁ]{1}([A-Za-zА-Яа-яЁё\\-]){0,}$/,
};

export const validateCheck = (
  value: string,
  name: string,
  messageType: string = name
): string | boolean => {
  if (!value.match(VALIDATE_REGEXP[name as keyof typeof VALIDATE_REGEXP])) {
    return ERROR_MESSAGE[messageType as keyof typeof ERROR_MESSAGE];
  }

  return true;
};

export const validationTemplate = (name: string, messageType: string = name) => {
  return {
    required: REQUIRED_MESSAGE,
    validate: (value: string) => validateCheck(value, name, messageType),
  };
};
