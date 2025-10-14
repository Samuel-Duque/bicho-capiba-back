import Animal from '#models/animal'
import Ong from '#models/ong'
import User from '#models/user'
import File from '#models/file'
import { BaseSeeder } from '@adonisjs/lucid/seeders'


export default class SeedData extends BaseSeeder {
  public async run() {
    const ongs = await Ong.createMany([
      {
        nome: 'ONG Esperança',
        cnpj: '12345678000101',
        email: 'contato@ongesperanca.org',
        telefone: '11987654321',
        descricao: 'ONG dedicada ao resgate de animais.',
        CEP: '12345000',
        quantidadeAnimais: 50,
        responsavelTecnico: 'Maria Silva',
        password: 'password123',
        bairro: 'Centro',
        rua: 'Rua das Flores',
        numero: '123',
        cidade: 'São Paulo',
        estado: 'SP',
        complemento: null,
        latitude: (Math.random() * 180 - 90).toFixed(6),
        longitude: (Math.random() * 360 - 180).toFixed(6),
      },
      {
        nome: 'Amigos dos Animais',
        cnpj: '98765432000199',
        email: 'contato@amigosanimais.org',
        telefone: '21987654321',
        descricao: 'Cuidamos de animais abandonados.',
        CEP: '54321000',
        quantidadeAnimais: 30,
        responsavelTecnico: 'João Santos',
        password: 'password123',
        bairro: ['Centro', 'Jardins', 'Vila Nova'][Math.floor(Math.random() * 3)],
        rua: 'Rua 2',
        numero: '456',
        cidade: ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte'][Math.floor(Math.random() * 3)],
        estado: ['SP', 'RJ', 'MG'][Math.floor(Math.random() * 3)],
        complemento: null,
        latitude: (Math.random() * 180 - 90).toFixed(6),
        longitude: (Math.random() * 360 - 180).toFixed(6),
      },
      {
        nome: 'Vida Animal',
        cnpj: '11223344000155',
        email: 'contato@vidaanimal.org',
        telefone: '31987654321',
        descricao: 'Promovemos adoção responsável.',
        CEP: '67890000',
        quantidadeAnimais: 40,
        responsavelTecnico: 'Ana Costa',
        password: 'password123',
        bairro: ['Centro', 'Jardins', 'Vila Nova'][Math.floor(Math.random() * 3)],
        rua: 'Rua 3',
        numero: '789',
        cidade: ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte'][Math.floor(Math.random() * 3)],
        estado: ['SP', 'RJ', 'MG'][Math.floor(Math.random() * 3)],
        complemento: null,
        latitude: (Math.random() * 180 - 90).toFixed(6),
        longitude: (Math.random() * 360 - 180).toFixed(6),
      },
    ])

    const users = await User.createMany([
      {
        fullName: 'Carlos Oliveira',
        email: 'carlos.oliveira@example.com',
        telefone: '11999999999',
        password: 'password123',
      },
      {
        fullName: 'Fernanda Lima',
        email: 'fernanda.lima@example.com',
        telefone: '21999999999',
        password: 'password123',
      },
      {
        fullName: 'Rafael Souza',
        email: 'rafael.souza@example.com',
        telefone: '31999999999',
        password: 'password123',
      },
    ])

    console.log(`Created ${users.length} users.`)

    const animals = await Animal.createMany(
      Array.from({ length: 20 }).map((_, index) => ({
        nome: `Animal ${index + 1}`,
        idade:(Math.floor(Math.random() * 15) + 1).toString(),
        sexo: (index % 2 === 0 ? 'M' : 'F') as 'M' | 'F',
        porte: ['Pequeno', 'Medio', 'Grande'][Math.floor(Math.random() * 3)] as 'Pequeno' | 'Medio' | 'Grande',
        cor: ['Preto', 'Branco', 'Marrom'][Math.floor(Math.random() * 3)],
        especie: 'Cachorro',
        raca: ['SRD', 'Labrador', 'Poodle'][Math.floor(Math.random() * 3)],
        statusAnimal: ['Disponivel', 'Adotado', 'Pendente'][Math.floor(Math.random() * 3)] as 'Disponivel' | 'Adotado' | 'Pendente',
        ongId: ongs[Math.floor(Math.random() * ongs.length)].id,
        vacinas: ['Antirrábica', 'V10', 'V8'][Math.floor(Math.random() * 3)],
        castrado: Math.random() > 0.5,
        necessidadesEspeciais: Math.random() > 0.8 ? 'Necessidade especial exemplo' : null,
        historia: `História do Animal ${index + 1}`,
        sociavelAnimal: Math.random() > 0.5,
        sociavelPessoa: Math.random() > 0.5,
        dataNascimento: new Date(Date.now() - Math.floor(Math.random() * 15 * 365 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
      }))
    )

    for (const animal of animals) {
      const availableAdjectives = ['cute', 'lovely', 'endearing', 'black', 'white', 'brown', 'fluffy', 'sweet', 'sleep', 'playful']
      
      const numberOfAdjectives = Math.floor(Math.random() * 2) + 1
      
      const shuffled = [...availableAdjectives].sort(() => Math.random() - 0.5)
      const selectedAdjectives = shuffled.slice(0, numberOfAdjectives)
      const adjectivesParam = selectedAdjectives.join(',')
      
      await File.create({
        url: `https://cataas.com/cat/${adjectivesParam}?width=400&height=400&type=square`,
        type: 'MEDIA',
        animalId: animal.id,
        ongId: animal.ongId,
        extname: 'jpg',
      })
    }

    console.log('Seed data created successfully!')
  }
}