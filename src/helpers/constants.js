export default {
  GOOGLE_API_KEY: 'AIzaSyD7aFHdf069bgIpmXzvB9DYwwMB4uXuCFA',
  API_URL: 'https://fanect-api.herokuapp.com/api/',
  PAYSTACK_PK: 'pk_test_7ef0929bad6cd1b77c44d66f876cc049e8be89d9',
  FLUTTERWAVE_PK: 'FLWPUBK_TEST-4a7209de443580aedf35a53d77f1d8cc-X',
};

const avatar = require('../assets/mock-data/Avatar.png');
const postImg = require('../assets/mock-data/Img.png');

const date = new Date();

export const reportOptions = [
  {
    id: '1',
    option: 'Sexual Content',
  },
  {
    id: '2',
    option: 'Illegal Activity',
  },
  {
    id: '3',
    option: 'Spam',
  },
  {
    id: '4',
    option: 'Hate Speech',
  },
  {
    id: '5',
    option: 'Violence',
  },
  {
    id: '6',
    option: 'Other',
  },
];

export const mockFeedData = [
  {
    id: '1',
    author: 'tiwa-savage',
    dateCreated: date,
    profilePic: avatar,
    postPic: postImg,
    comment: 9,
    likes: 124,
    location: 'Walton, IN',
    comments: [
      {
        id: '1',
        author: 'User Name',
        dateCreated: date,
        profilePic: avatar,
        comment:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.',
      },
      {
        id: '2',
        author: 'User Name',
        dateCreated: date,
        profilePic: avatar,
        comment: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.',
      },
    ],
  },
  {
    id: '2',
    author: 'tiwa-savage',
    dateCreated: date,
    profilePic: avatar,
    postPic: postImg,
    comment: 9,
    likes: 124,
    location: null,
  },
  {
    id: '3',
    author: 'tiwa-savage',
    dateCreated: date,
    profilePic: avatar,
    postPic: postImg,
    comment: 9,
    likes: 124,
    location: 'Walton, IN',
  },
];
