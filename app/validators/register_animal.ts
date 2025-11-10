import vine from '@vinejs/vine';

export const RegisterAnimalValidator = vine.compile(
  vine.object({
    nome: vine.string().minLength(1).maxLength(100),
    sexo: vine.enum(['M', 'F']),
    porte: vine.enum(['Pequeno', 'Medio', 'Grande']).optional(), // Opcional
    cor: vine.string().maxLength(50),
    especie: vine.string().maxLength(50),
    raca: vine.string().maxLength(50),
    data_nascimento: vine.string().maxLength(10).optional(), // Opcional
    vacinas: vine.array(vine.string()).optional(), // Opcional
    castrado: vine.boolean().optional(),
    necessidades_especiais: vine.string().maxLength(200).optional(), // Opcional
    historia: vine.string().maxLength(500).optional(), // Opcional
    sociavel_animal: vine.boolean().optional(), // Opcional
    sociavel_pessoa: vine.boolean().optional(), // Opcional
    images: vine.array(vine.file().optional()), // Opcional
  })
);
