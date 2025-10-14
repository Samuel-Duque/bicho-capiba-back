import vine from '@vinejs/vine'

export const updateAdoptionValidator = vine.compile(
    vine.object({
    status : vine.enum(['pendente', 'aprovado', 'rejeitado'])
})
)