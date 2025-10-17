import vine, { SimpleMessagesProvider } from '@vinejs/vine';

vine.messagesProvider = new SimpleMessagesProvider(
  {
    required: 'O campo {{ field }} é obrigatório',
    string: 'O campo {{ field }} deve ser um texto',
    email: 'O campo {{ field }} deve ser um e-mail válido',
    number: 'O campo {{ field }} deve ser um número',
    boolean: 'O campo {{ field }} deve ser verdadeiro ou falso',

    minLength: 'O campo {{ field }} deve ter pelo menos {{ min }} caracteres',
    maxLength: 'O campo {{ field }} não pode ter mais que {{ max }} caracteres',
    fixedLength: 'O campo {{ field }} deve ter exatamente {{ size }} caracteres',

    min: 'O campo {{ field }} deve ser no mínimo {{ min }}',
    max: 'O campo {{ field }} deve ser no máximo {{ max }}',
    range: 'O campo {{ field }} deve estar entre {{ min }} e {{ max }}',
    positive: 'O campo {{ field }} deve ser um número positivo',
    negative: 'O campo {{ field }} deve ser um número negativo',

    array: 'O campo {{ field }} deve ser uma lista',
    'array.minLength': 'O campo {{ field }} deve ter pelo menos {{ min }} itens',
    'array.maxLength': 'O campo {{ field }} não pode ter mais que {{ max }} itens',
    notEmpty: 'O campo {{ field }} não pode estar vazio',

    url: 'O campo {{ field }} deve ser uma URL válida',
    alpha: 'O campo {{ field }} deve conter apenas letras',
    alphaNumeric: 'O campo {{ field }} deve conter apenas letras e números',
    regex: 'O formato do campo {{ field }} é inválido',
    uuid: 'O campo {{ field }} deve ser um UUID válido',
    mobile: 'O campo {{ field }} deve ser um número de telefone válido',
    ipAddress: 'O campo {{ field }} deve ser um endereço IP válido',
    creditCard: 'O campo {{ field }} deve ser um número de cartão de crédito válido',

    date: 'O campo {{ field }} deve ser uma data válida',
    'date.after': 'O campo {{ field }} deve ser uma data após {{ expectedValue }}',
    'date.before': 'O campo {{ field }} deve ser uma data antes de {{ expectedValue }}',

    confirmed: 'Os campos {{ field }} e {{ otherField }} devem ser iguais',
    sameAs: 'Os campos {{ field }} e {{ otherField }} devem ser iguais',

    in: 'O valor selecionado para {{ field }} é inválido',
    notIn: 'O valor selecionado para {{ field }} não é permitido',

    file: 'O campo {{ field }} deve ser um arquivo',
    'file.size': 'O tamanho do arquivo {{ field }} deve ser menor que {{ size }}',
    'file.extname': 'O arquivo {{ field }} deve ter uma das extensões: {{ extnames }}',

    // Campos de ONG
    'name.required': 'Por favor, informe o nome da ONG',
    'email.required': 'Por favor, informe o e-mail da ONG',
    'email.email': 'Por favor, informe um e-mail válido',
    'password.required': 'Por favor, informe a senha',
    'password.minLength': 'A senha deve ter no mínimo {{ min }} caracteres',
    'cnpj.required': 'Por favor, informe o CNPJ',
    'cnpj.minLength': 'O CNPJ deve ter 14 dígitos',
    'cnpj.maxLength': 'O CNPJ não pode ter mais que 18 caracteres (com formatação)',
    'telefone.required': 'Por favor, informe o telefone',
    'telefone.minLength': 'O telefone deve ter no mínimo 10 dígitos',
    'cep.required': 'Por favor, informe o CEP',
    'cep.minLength': 'O CEP deve ter 8 dígitos',
    'descricao.maxLength': 'A descrição não pode ter mais que 500 caracteres',
    'responsavelTecnico.required': 'Por favor, informe o nome do responsável técnico',

    // Campos de Endereço
    'bairro.required': 'Por favor, informe o bairro',
    'rua.required': 'Por favor, informe a rua',
    'numero.required': 'Por favor, informe o número',
    'cidade.required': 'Por favor, informe a cidade',
    'estado.required': 'Por favor, informe o estado',
    'estado.maxLength': 'O estado deve ter 2 caracteres (UF)',

    // Campos de Animal
    'nome.required': 'Por favor, informe o nome do animal',
    'especie.required': 'Por favor, informe a espécie do animal',
    'raca.required': 'Por favor, informe a raça do animal',
    'idade.required': 'Por favor, informe a idade do animal',
    'idade.min': 'A idade não pode ser negativa',
    'sexo.required': 'Por favor, informe o sexo do animal',
    'porte.required': 'Por favor, informe o porte do animal',

    // Campos de Usuário
    'username.required': 'Por favor, escolha um nome de usuário',
    'username.minLength': 'O nome de usuário deve ter no mínimo {{ min }} caracteres',
    'password_confirmation.confirmed': 'As senhas não coincidem',
  },
  {
    // ===== Labels Personalizados para Campos =====
    // Isso substitui o nome do campo técnico por algo mais amigável
    name: 'nome',
    email: 'e-mail',
    password: 'senha',
    password_confirmation: 'confirmação de senha',
    cnpj: 'CNPJ',
    telefone: 'telefone',
    cep: 'CEP',
    descricao: 'descrição',
    bairro: 'bairro',
    rua: 'rua',
    numero: 'número',
    cidade: 'cidade',
    estado: 'estado',
    complemento: 'complemento',
    quantidadeAnimais: 'quantidade de animais',
    responsavelTecnico: 'responsável técnico',
    images: 'imagens',
    nome: 'nome',
    especie: 'espécie',
    raca: 'raça',
    idade: 'idade',
    sexo: 'sexo',
    porte: 'porte',
    username: 'nome de usuário',
  }
);
