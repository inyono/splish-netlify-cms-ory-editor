import * as app from 'commander';
import * as createCORSMiddleware from 'cors';
import * as createServer from 'express';
import * as fs from 'fs';
import * as path from 'path';

app
  .version('0.0.0')
  .option('-c, --config [file]', 'Netlify config file path')
  .option('-r, --root [folder]', 'Repository root')
  .parse(process.argv);

const server = createServer();
server.use(createCORSMiddleware());
const root = path.join(process.cwd(), app.root);

const config = require(path.join(process.cwd(), app.config));

server.get('/media', (req, res) => {
  fs.readdir(
    path.join(root, config.media_folder),
    {},
    (err, files: string[]) => {
      console.log(files);

      // .then(files => files.map(({ sha, name, size, download_url, path }) => {
      //   const url = new URL(download_url);
      //   if (url.pathname.match(/.svg$/)) {
      //     url.search += (url.search.slice(1) === '' ? '?' : '&') + 'sanitize=true';
      //   }
      //   return { id: sha, name, size, url: url.href, path };
      // }));

      const resp = files.map((file: string) => {
        return {
          // FIXME: id:
          // FIXME: size:
          // FIXME: path:
          name: file,
          // FIXME: serve media files
          url: `file://${path.join(root, config.media_folder, file)}`
        };
      });

      res.send(resp);
    }
  );
});

server.listen(3000, () => console.log('Example app listening on port 3000!'));
