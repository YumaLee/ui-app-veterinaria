import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const POST_TITLES = [
  'Clinica 1',
  'Clinica 2',
  'Designify Agency Landing Page Design',
  '✨What is Done is Done ✨',
  'Clinica 3',
  'Clinica 4',
  'Clinica 5',
  'Clinica 6',
  'Clinica 7',
  'Clinica 7',
  'Clinica 8',
  'Clinica 10',
  'Clinica 11',
  'Clinica 12',
  'Clinica 13',
  'Clinica 14',
  'Clinica 15',
  'Clinica 16',
  'Clinica 17',
  'Clinica 18',
];

const posts = [...Array(23)].map((_, index) => ({
  id: faker.datatype.uuid(),
  cover: `/assets/images/covers/cover_${index + 1}.jpg`,
  title: POST_TITLES[index + 1],
  createdAt: faker.date.past(),
  view: faker.datatype.number(),
  comment: faker.datatype.number(),
  share: faker.datatype.number(),
  favorite: faker.datatype.number(),
  author: {
    name: faker.name.fullName(),
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  },
}));

export default posts;
