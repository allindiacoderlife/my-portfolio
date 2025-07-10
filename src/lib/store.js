const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/my-portfolio' : '';

export const store = {
  basePath,
};

