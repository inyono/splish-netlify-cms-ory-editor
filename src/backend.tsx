import axios from 'axios'
import { Collection } from 'immutable'
import * as React from 'react'

interface AuthenticationPageProps {
  onLogin: () => void
  inProgress: boolean
}

interface Credentials {}
interface User {}
type Config = Collection.Keyed<any, any>

class AuthenticationPage extends React.Component<AuthenticationPageProps> {
  handleLogin: React.HTMLAttributes<HTMLButtonElement>['onClick'] = e => {
    e.preventDefault()
    console.log('@@AuthenticationPage', this.props.onLogin)
    this.props.onLogin()
  }

  render() {
    const { inProgress } = this.props

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
    )
  }
}

export class LocalBackend {
  private assets: any[] = []
  private config: Config

  constructor(config: Config) {
    console.log('@@config', config.toJS())
    this.config = config
  }

  authComponent(): React.ComponentType<AuthenticationPageProps> {
    return AuthenticationPage
  }

  authenticate(credentials: Credentials): Promise<User> {
    return Promise.resolve({})
  }

  entriesByFolder(...args) {
    const entries = []
    // const folder = collection.get('folder');
    // if (folder) {
    //   for (const path in window.repoFiles[folder]) {
    //     if (!path.endsWith('.' + extension)) {
    //       continue;
    //     }

    //     const file = { path: `${ folder }/${ path }` };
    //     entries.push(
    //       {
    //         file,
    //         data: window.repoFiles[folder][path].content,
    //       }
    //     );
    //   }
    // }
    return Promise.resolve(entries)
  }

  getEntry(...args) {
    console.log('@@getEntry', args)
    return Promise.resolve()
  }

  getMedia(): Promise<any[]> {
    return axios.get<any[]>('http://localhost:3000/media').then(response => {
      return response.data
    })
  }

  getToken(...args) {
    console.log('@@getToken', args)
    return Promise.resolve('')
  }

  logout(): void {}

  restoreUser(credentials: Credentials): Promise<User> {
    return this.authenticate(credentials)
  }
}
