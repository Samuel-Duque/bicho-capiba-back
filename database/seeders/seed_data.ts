import Animal from '#models/animal';
import Ong from '#models/ong';
import User from '#models/user';
import File from '#models/file';
import Especie from '#models/especie';
import Raca from '#models/raca';
import Cor from '#models/cor';
import Vacina from '#models/vacina';
import { BaseSeeder } from '@adonisjs/lucid/seeders';

export default class SeedData extends BaseSeeder {
  public async run() {
    const ongs = await Ong.createMany([
      {
        nome: 'ONG Esperança',
        cnpj: '12345678000101',
        email: 'ong@gmail.com',
        telefone: '81987654321',
        descricao: 'ONG dedicada ao resgate de animais.',
        cep: '51011000',
        quantidadeAnimais: 50,
        responsavelTecnico: 'Maria Silva',
        password: 'secret123',
        bairro: 'Boa Viagem',
        rua: 'Rua das Flores',
        numero: '123',
        cidade: 'Recife',
        estado: 'PE',
        complemento: null,
        latitude: (Math.random() * 180 - 90).toFixed(6),
        longitude: (Math.random() * 360 - 180).toFixed(6),
      },
      {
        nome: 'Amigos dos Animais',
        cnpj: '98765432000199',
        email: 'contato@amigosanimais.org',
        telefone: '81976543210',
        descricao: 'Cuidamos de animais abandonados.',
        cep: '52060000',
        quantidadeAnimais: 30,
        responsavelTecnico: 'João Santos',
        password: 'secret123',
        bairro: 'Casa Forte',
        rua: 'Rua 2',
        numero: '456',
        cidade: 'Recife',
        estado: 'PE',
        complemento: null,
        latitude: (Math.random() * 180 - 90).toFixed(6),
        longitude: (Math.random() * 360 - 180).toFixed(6),
      },
      {
        nome: 'Vida Animal',
        cnpj: '11223344000155',
        email: 'contato@vidaanimal.org',
        telefone: '81965432109',
        descricao: 'Promovemos adoção responsável.',
        cep: '52020000',
        quantidadeAnimais: 40,
        responsavelTecnico: 'Ana Costa',
        password: 'secret123',
        bairro: 'Espinheiro',
        rua: 'Rua 3',
        numero: '789',
        cidade: 'Recife',
        estado: 'PE',
        complemento: null,
        latitude: (Math.random() * 180 - 90).toFixed(6),
        longitude: (Math.random() * 360 - 180).toFixed(6),
      },
    ]);

    const users = await User.createMany([
      {
        fullName: 'Carlos Oliveira',
        email: 'ze@gmail.com',
        telefone: '11999999999',
        password: 'secret123',
      },
      {
        fullName: 'Fernanda Lima',
        email: 'fernanda.lima@example.com',
        telefone: '21999999999',
        password: 'secret123',
      },
      {
        fullName: 'Rafael Souza',
        email: 'rafael.souza@example.com',
        telefone: '31999999999',
        password: 'secret123',
      },
    ]);

    console.log(`Created ${users.length} users.`);

    // Criar dados de apoio: cores, especies, racas e vacinas
    const coresData = [
      { nome: 'Preto', hexadecimal: '#000000' },
      { nome: 'Branco', hexadecimal: '#FFFFFF' },
      { nome: 'Marrom', hexadecimal: '#8B4513' },
      { nome: 'Caramelo', hexadecimal: '#D2691E' },
      { nome: 'Cinza', hexadecimal: '#808080' },
      { nome: 'Dourado', hexadecimal: '#FFD700' },
      { nome: 'Amarelo', hexadecimal: '#FFFF00' },
      { nome: 'Laranja', hexadecimal: '#FF8C00' },
      { nome: 'Vermelho', hexadecimal: '#FF0000' },
      {
        nome: 'Tricolor',
        hexadecimal: 'linear-gradient(45deg, #8B4513, #FFFFFF, #000000)',
      },
      { nome: 'Rajado', hexadecimal: 'linear-gradient(45deg, #8B4513, #D2691E)' },
      { nome: 'Malhado', hexadecimal: 'linear-gradient(45deg, #FFFFFF, #000000)' },
      { nome: 'Outros', hexadecimal: '#9CA3AF' },
    ];

    const createdCores: any[] = await Cor.createMany(coresData as any);

    const especiesNames = ['Coelho', 'Gato', 'Cachorro', 'Equino', 'Roedor'];
    const createdEspecies: any[] = await Especie.createMany(
      especiesNames.map((nome) => ({ nome })) as any
    );

    // Map name -> id (number) for convenience
    const especieIdByName: Record<string, number> = {};
    for (const e of createdEspecies) {
      especieIdByName[(e as any).nome] = Number((e as any).id);
    }

    const racasPorEspecieSeed: Record<string, string[]> = {
      Cachorro: [
        'Sem Raça Definida',
        'Akita',
        'Beagle',
        'Border Collie',
        'Boxer',
        'Bulldog Francês',
        'Bulldog Inglês',
        'Chihuahua',
        'Cocker Spaniel',
        'Dachshund',
        'Dálmata',
        'Doberman',
        'Fila Brasileiro',
        'Golden Retriever',
        'Husky Siberiano',
        'Labrador',
        'Lhasa Apso',
        'Maltês',
        'Pastor Alemão',
        'Pinscher',
        'Pitbull',
        'Poodle',
        'Pug',
        'Rottweiler',
        'Schnauzer',
        'Shih Tzu',
        'Yorkshire',
        'Outra Raça',
      ],
      Gato: [
        'Sem Raça Definida',
        'Angorá',
        'Bengal',
        'Birmanês',
        'British Shorthair',
        'Maine Coon',
        'Persa',
        'Ragdoll',
        'Russo Azul',
        'Sagrado da Birmânia',
        'Siamês',
        'Sphynx',
        'Outra Raça',
      ],
      Equino: ['Mangalarga', 'Puro-sangue', 'Maremano'],
      Roedor: ['Porquinho-da-índia', 'Hamster', 'Rato'],
      Coelho: ['SRD', 'Angorá', 'Rex'],
    };

    const racasToCreate: { nome: string; especie_id: number }[] = [];
    for (const [esp, racas] of Object.entries(racasPorEspecieSeed)) {
      const espId = especieIdByName[esp];
      for (const r of racas) {
        racasToCreate.push({ nome: r, especie_id: espId });
      }
    }

    const createdRacas: any[] = await Raca.createMany(racasToCreate as any);

    const racasByEspecie: Record<string, any[]> = {};
    for (const r of createdRacas) {
      const especieId = Number((r as any).especie_id);
      const especieObj = createdEspecies.find((e) => Number((e as any).id) === especieId);
      const especieNome = especieObj ? (especieObj as any).nome : 'Unknown';
      racasByEspecie[especieNome] = racasByEspecie[especieNome] || [];
      racasByEspecie[especieNome].push(r);
    }

    const corByName: Record<string, any> = {};
    for (const c of createdCores) {
      corByName[(c as any).nome] = c;
    }

    const bairrosPE = [
      'Boa Viagem',
      'Casa Forte',
      'Aflitos',
      'Boa Vista',
      'Espinheiro',
      'Tamarineira',
      'Pina',
      'Graças',
      'Casa Amarela',
      'Derby',
    ];

    const especies = ['Coelho', 'Gato', 'Cachorro', 'Equino', 'Roedor'];

    const vacinasPossiveis = [
      'Antirrábica',
      'V10',
      'V8',
      'Tétano',
      'Leptospirose',
      'Influenza',
      'Gripe',
      'Completa',
    ];

    const vacinasToCreate: {
      nome: string;
      especie_id: number;
    }[] = [];
    for (const esp of createdEspecies) {
      const espId = Number((esp as any).id);
      for (const v of vacinasPossiveis) {
        vacinasToCreate.push({ nome: v, especie_id: espId });
      }
    }

    await Vacina.createMany(vacinasToCreate as any);

    const idadesPossiveis = ['0.5', '1', '2', '3', '4', '6', '8', '10', '12', '18'];

    const animals = await Animal.createMany(
      Array.from({ length: 5 }).map((_, index) => {
        const especie = especies[index % especies.length];
        const bairro = bairrosPE[index % bairrosPE.length];
        const idade = idadesPossiveis[index % idadesPossiveis.length];
        const idadeFloat = parseFloat(idade);
        const yearsMs = Math.floor(idadeFloat * 365 * 24 * 60 * 60 * 1000);
        const nascimento = new Date(Date.now() - yearsMs).toISOString().split('T')[0];

        const historiasPorEspecie: Record<string, string[]> = {
          Coelho: [
            `Encontrado em um quintal no bairro ${bairro} - PE. Adora cenouras e um cantinho com capim para roer. Muito dócil e procura um lar tranquilo.`,
            `Pequeno saltitante dos jardins de ${bairro}, PE. Carinhoso e esperto, ideal para quem quer companhia calma.`,
          ],
          Gato: [
            `Miau! Morador do beco florido em ${bairro}, PE. Adora subir em armários e ganhar petiscos. Muito carinhoso com quem vira amigo.`,
            `Gatinho arteiro do ${bairro}, PE que gosta de brincar com novelos e tirar sonecas ao sol. Ideal para quem procura companhia divertida.`,
          ],
          Cachorro: [
            `Companheiro fiel das caminhadas pelo ${bairro}, PE. Ama correr na praia imaginária e receber carinho. Está vacinado e pronto para adoção.`,
            `Amigo do povo do ${bairro}, PE. Brincalhão e leal, adora crianças e passeios longos.`,
          ],
          Equino: [
            `Cavalo sereno encontrado em uma fazenda próxima ao ${bairro}, PE. Forte, dócil e com olhar sábio — ideal para quem tem espaço e carinho.`,
            `Equino tranquilo que trabalhou em trilhas pela região de ${bairro}, PE. Busca um lar com espaço ao ar livre e atenção.`,
          ],
          Roedor: [
            `Pequeno roedor curioso dos arredores de ${bairro}, PE. Adora esconder petiscos e explorar túneis. Perfeito para quem gosta de cuidados delicados.`,
            `Roedor simpático que vive entre jardins em ${bairro}, PE. Fácil de cuidar e ótimo para apartamentos pequenos.`,
          ],
        };

        const historiaOptions = historiasPorEspecie[especie] || [
          `Resgatado em ${bairro} - PE.`,
        ];
        const historia = historiaOptions[index % historiaOptions.length];

        let porte: 'Pequeno' | 'Medio' | 'Grande' = ['Pequeno', 'Medio', 'Grande'][
          Math.floor(Math.random() * 3)
        ] as 'Pequeno' | 'Medio' | 'Grande';
        if (especie === 'Equino') porte = 'Grande';
        if (especie === 'Roedor') porte = 'Pequeno';

        const racaObjs = racasByEspecie[especie] || [];
        const racaObj =
          racaObjs.length > 0
            ? racaObjs[Math.floor(Math.random() * racaObjs.length)]
            : null;

        const corName = ['Preto', 'Branco', 'Marrom', 'Caramelo', 'Cinza'][
          Math.floor(Math.random() * 5)
        ];
        const corObj = corByName[corName];
        const corId = corObj
          ? String((corObj as any).id)
          : String((createdCores[0] as any).id);
        const especieId = especieIdByName[especie];
        // Ensure raca_id is never null: prefer chosen raca, else first raca for the especie, else first created raca overall
        let racaId: number;
        if (racaObj) {
          racaId = Number((racaObj as any).id);
        } else {
          const fallbackRacas = racasByEspecie[especie] || [];
          if (fallbackRacas.length > 0) {
            racaId = Number((fallbackRacas[0] as any).id);
          } else if (createdRacas.length > 0) {
            racaId = Number((createdRacas[0] as any).id);
          } else {
            // As a last resort, set to 0 (shouldn't happen if seeds ran correctly)
            racaId = 0;
          }
        }

        return {
          nome: `${especie} ${index + 1}`,
          sexo: (index % 2 === 0 ? 'M' : 'F') as 'M' | 'F',
          porte,
          cor: corName,
          cor_id: corId,
          especie,
          especie_id: especieId,
          raca: racaObj ? (racaObj as any).nome : 'SRD',
          raca_id: racaId,
          statusAnimal: ['Disponivel', 'Adotado', 'Pendente'][
            Math.floor(Math.random() * 3)
          ] as 'Disponivel' | 'Adotado' | 'Pendente',
          ongId: ongs[Math.floor(Math.random() * ongs.length)].id,
          castrado:
            especie === 'Gato' || especie === 'Cachorro' ? Math.random() > 0.3 : null,
          necessidadesEspeciais:
            Math.random() > 0.9 ? 'Requer medicamentos diários' : null,
          historia,
          sociavelAnimal: Math.random() > 0.4,
          sociavelPessoa: Math.random() > 0.4,
          dataNascimento: nascimento,
        };
      })
    );

    const photoUrlsList: string[][] = [
      // Coelho 1
      [
        'https://img.olx.com.br/images/41/414556825681361.webp',
        'https://img.olx.com.br/images/38/384541102844771.webp',
        'https://img.olx.com.br/images/40/402568104545068.webp',
      ],
      // Gato 2
      [
        'https://adotar.com.br/upload/2025-10/animais_imagem1279271.jpg?w=700&format=webp',
        'https://adotar.com.br/upload/2025-10/animais_imagem1279257.jpeg?w=700&format=webp',
        'https://adotar.com.br/upload/2025-10/animais_imagem1279258.jpeg?w=700&format=webp',
      ],
      // Cachorro 3
      [
        'https://adotar.com.br/upload/2024-08/animais_imagem1147686.jpg?w=700&format=webp',
        'https://adotar.com.br/upload/2024-08/animais_imagem1147679.jpg?w=700&format=webp',
        'https://adotar.com.br/upload/2024-08/animais_imagem1147677.jpg?w=700&format=webp',
      ],
      // Equino 4
      [
        'https://img.olx.com.br/images/26/261523349554190.webp',
        'https://img.olx.com.br/images/33/339502344372916.webp',
        'https://img.olx.com.br/images/35/351599702978777.webp',
      ],
      // Roedor 5
      [
        'https://img.olx.com.br/images/47/471525572619343.webp',
        'https://img.olx.com.br/images/52/528507938719798.webp',
        'https://img.olx.com.br/images/49/497596817812559.webp',
      ],
    ];

    // const especieToKeyword: Record<string, string> = {
    //   Coelho: 'rabbit',
    //   Gato: 'cat',
    //   Cachorro: 'dog',
    //   Equino: 'horse',
    //   Roedor: 'rodent',
    // };

    for (const [idx, animal] of animals.entries()) {
      const manualUrls = photoUrlsList[idx] || [];
      const hasManual = manualUrls.some((u) => u && u.trim() !== '');

      if (hasManual) {
        // Usar as URLs manuais fornecidas (filtrar vazias)
        for (const url of manualUrls.filter((u) => u && u.trim() !== '')) {
          await File.create({
            url,
            type: 'MEDIA',
            animalId: animal.id,
            ongId: animal.ongId,
            extname: url.split('.').pop() || 'jpg',
          });
        }
      }
    }

    console.log('Seed data created successfully!');
  }
}
