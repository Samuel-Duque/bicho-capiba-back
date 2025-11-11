import vine from '@vinejs/vine';

export const CreateAdoptionValidator = vine.compile(
  vine.object({
    animal_id: vine.string().uuid(),

    tipo_residencia: vine.string().trim(),
    area_externa: vine.boolean(),
    tela_protetora: vine.boolean(),

    composicao_familiar: vine.string().trim(),
    quantidade_moradores: vine.string().trim(),

    possui_criancas: vine.boolean(),
    quantidade_criancas: vine.string().trim().optional(),
    faixa_etaria_criancas: vine.string().trim().optional(),
    crianca_necessidade_especial: vine.boolean(),
    tipo_necessidade_criancas: vine.string().trim().optional(),

    familiar_necessidade_especial: vine.boolean(),
    tipo_necessidade_especial_familiar: vine.string().trim().optional(),

    possui_animais: vine.boolean(),
    quantidade_animais: vine.string().trim().optional(),
    idade_animais: vine.string().trim().optional(),
    sexo_animais: vine.string().trim().optional(),

    experiencia_com_animais: vine.boolean(),
    comportamento_animais: vine.string().trim(),
    conhecimento_despesas_animais: vine.boolean(),

    tempo_disponivel: vine.string().trim(),
  })
);
