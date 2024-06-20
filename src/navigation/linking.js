const config = {
  screens: {
    General: {
      screens: {
        Home: 'home',
      },
    },
    PromptSubscription: {
      path: 'promptSubscription/:id',
      parse: {
        id: id => `${id}`,
      },
    },
    PaymentStack: {
      screens: {
        RedeemSubscription: {
          path: 'redeemSubscription/:id',
          parse: {
            id: id => `${id}`,
          },
        },
      },
    },
  },
};

const linking = {
  prefixes: ['fanect://fanectApp'],
  config,
};

export default linking;
