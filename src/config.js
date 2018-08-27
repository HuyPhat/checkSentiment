const domain = {
  dev: 'http://multi-branch-checker.advosights.com',
  prod: 'http://localhost:50014',
  test: 'http://localhost:50014',
};

export default {
  apiDomain: process.env.NODE_ENV === 'development' ? domain.dev : domain.prod,
};
