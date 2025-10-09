import vine from '@vinejs/vine'

export const registerOngValidator = vine.compile(
    vine.object({
        name: vine.string().minLength(3).maxLength(255),
        email: vine.string().email(),
        password: vine.string().minLength(6).maxLength(255),
        cnpj: vine.string().minLength(14).maxLength(18),
        telefone: vine.string().minLength(10).maxLength(11),
        cep: vine.string().minLength(8).maxLength(9),
        image: vine.file().optional()
    })
)