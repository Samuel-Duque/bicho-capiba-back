import vine from '@vinejs/vine';

export const registerUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().minLength(3).maxLength(255),
    email: vine.string().email(),
    password: vine.string().minLength(6).maxLength(255),
    cep: vine.string().minLength(8).maxLength(9).optional(),
  })
);
