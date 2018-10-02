const fs = require('fs');
const klaw = require('klaw');
const path = require('path');
const matter = require('gray-matter');

const convPaths = require('convert-tsconfig-paths-to-webpack-aliases').default;

const tsconfig = require('./tsconfig.json');

const aliases = convPaths(tsconfig);

const cwd = process.cwd();
function getPosts() {
  const items = {};
  // Walk ("klaw") through posts directory and push file paths into items array //
  const getFiles = () =>
    new Promise(resolve => {
      // Check if posts directory exists //
      if (fs.existsSync('./src/posts')) {
        items['src/posts'] = {};
        klaw('./src/posts')
          .on('data', item => {
            const pwd = path.join(cwd, 'src/posts/');
            // Filter function to retrieve .md files //
            if (path.extname(item.path) === '.md') {
              // If markdown file, read contents //
              const data = fs.readFileSync(item.path, 'utf8');
              // // Convert to frontmatter object and markdown content //
              // const dataObj = matter(data)
              // // Create slug for URL //
              // dataObj.data.slug = dataObj.data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
              // // Remove unused key //
              // delete dataObj.orig
              // // Push object into items array //
              items['src/posts'][item.path.substr(pwd.length)] = data;
            }
          })
          .on('error', e => {
            console.log(e);
          })
          .on('end', () => {
            // Resolve promise for async getRoutes request //
            // posts = items for below routes //
            resolve(items);
          });
      } else {
        // If src/posts directory doesn't exist, return items as empty array //
        resolve(items);
      }
    });
  return getFiles();
}

export default {
  getSiteData: () => ({
    title: 'React Static with Netlify CMS'
  }),
  getRoutes: async () => {
    const posts = await getPosts();
    return [
      {
        path: '/',
        component: 'src/containers/Home',
        getData: () => {
          return {
            posts
          };
        }
      },
      {
        path: '/admin',
        component: 'src/containers/Admin',
        getData: () => ({
          posts
        })
      },
      {
        is404: true,
        component: 'src/containers/404'
      }
    ];
  },
  webpack: (config, { defaultLoaders }) => {
    // Add .ts and .tsx extension to resolver
    config.resolve.extensions.push('.ts', '.tsx');

    // Add TypeScript Path Mappings (from tsconfig via webpack.config.js)
    // to react-statics alias resolution
    config.resolve.alias = aliases;

    // We replace the existing JS rule with one, that allows us to use
    // both TypeScript and JavaScript interchangeably
    config.module.rules = [
      {
        oneOf: [
          {
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: defaultLoaders.jsLoader.exclude, // as std jsLoader exclude
            use: [
              {
                loader: 'babel-loader'
              },
              {
                loader: require.resolve('ts-loader'),
                options: {
                  transpileOnly: true
                }
              }
            ]
          },
          defaultLoaders.cssLoader,
          defaultLoaders.fileLoader
        ]
      }
    ];
    return config;
  }
};
