const config = {
  screens: {
    General: {
      path: 'general',
    },
    Redeem: {
      path: 'redeemSubscription/:id',
      parse: {
        id: id => `${id}`,
      },
    },
  },
};

const linking = {
  prefixes: ['fanect://app'],
  config,
};

export default linking;
