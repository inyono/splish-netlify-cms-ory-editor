import axios from 'axios';
import { Collection } from 'immutable';
import * as R from 'ramda';
import * as React from 'react';

interface AuthenticationPageProps {
  onLogin: () => void;
  inProgress: boolean;
}

interface Credentials {}
interface User {}
type Config = Collection.Keyed<any, any>;

class AuthenticationPage extends React.Component<AuthenticationPageProps> {
  handleLogin: React.HTMLAttributes<HTMLButtonElement>['onClick'] = e => {
    e.preventDefault();
    console.log('@@AuthenticationPage', this.props.onLogin);
    this.props.onLogin();
  };

  render() {
    const { inProgress } = this.props;

    return (
      <section className="nc-githubAuthenticationPage-root">
        <button
          className="nc-githubAuthenticationPage-button"
          disabled={inProgress}
          onClick={this.handleLogin}
        >
          {inProgress ? 'Logging in...' : 'Login'}
        </button>
      </section>
    );
  }
}

export const createLocalBackend = repoFiles => {
  return class LocalBackend {
    private assets: any[] = [];
    private config: Config;

    constructor(config: Config) {
      console.log('@@config', config.toJS());
      this.config = config;
    }

    authComponent(): React.ComponentType<AuthenticationPageProps> {
      return AuthenticationPage;
    }

    authenticate(credentials: Credentials): Promise<User> {
      return Promise.resolve({});
    }

    entriesByFolder(collection, ext) {
      /*
      FIXME: looks promising
      Pass stuff according to config (repoFiles)
      Pass logic to publish stuff
      Render in iframe because of potential css issues?
      */
      const folder = collection.get('folder');
      const entries = [];
      if (folder) {
        for (const path in repoFiles[folder]) {
          if (!path.endsWith('.' + ext)) {
            continue;
          }

          const file = { path: `${folder}/${path}` };
          entries.push({
            file,
            data: repoFiles[folder][path]
          });
        }
      }
      return Promise.resolve(entries);
    }

    getEntry(collection, slug, path) {
      const segments = R.split('/', path);
      const folder = R.join('/', R.init(segments));
      const file = R.last(segments);

      console.log('@@', folder, file, repoFiles, repoFiles[folder][file]);

      return Promise.resolve({
        file: { path },
        data: repoFiles[folder][file]
      });
    }

    getMedia(): Promise<any[]> {
      return axios.get<any[]>('http://localhost:3000/media').then(response => {
        return response.data;
      });
    }

    getToken(...args) {
      console.log('@@getToken', args);
      return Promise.resolve('');
    }

    logout(): void {}

    restoreUser(credentials: Credentials): Promise<User> {
      return this.authenticate(credentials);
    }
  };
};
