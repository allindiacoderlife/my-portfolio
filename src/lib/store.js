const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '' : '';

export const store = {
  basePath,
};

