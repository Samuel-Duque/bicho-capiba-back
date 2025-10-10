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
        endereco: 'Rua das Flores, 123',
        CEP: '12345000',
        quantidadeAnimais: 50,
        responsavelTecnico: 'Maria Silva',
        password: 'password123',
      },
      {
        nome: 'Amigos dos Animais',
        cnpj: '98765432000199',
        email: 'contato@amigosanimais.org',
        telefone: '21987654321',
        descricao: 'Cuidamos de animais abandonados.',
        endereco: 'Avenida Central, 456',
        CEP: '54321000',
        quantidadeAnimais: 30,
        responsavelTecnico: 'João Santos',
        password: 'password123',
      },
      {
        nome: 'Vida Animal',
        cnpj: '11223344000155',
        email: 'contato@vidaanimal.org',
        telefone: '31987654321',
        descricao: 'Promovemos adoção responsável.',
        endereco: 'Praça da Paz, 789',
        CEP: '67890000',
        quantidadeAnimais: 40,
        responsavelTecnico: 'Ana Costa',
        password: 'password123',
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

    // Removed unused variable warning for users
    console.log(`Created ${users.length} users.`)

    const animals = await Animal.createMany(
      Array.from({ length: 20 }).map((_, index) => ({
        nome: `Animal ${index + 1}`,
        idade: Math.floor(Math.random() * 15) + 1,
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

    // Add photos for each animal
    for (const animal of animals) {
      await File.create({
        url: `https://picsum.photos/seed/animal-${animal.id}/300/200`,
        type: 'MEDIA',
        animalId: animal.id,
        ongId: animal.ongId,
        extname: 'jpg',
      })
    }

    console.log('Seed data created successfully!')
  }
}