import * as React from 'react';
import { Router, withRouteData } from 'react-static';

import 'netlify-cms/dist/cms.css';

import { createLocalBackend } from '../package/backend';
import { createORYEditorPreview } from '../package/preview';
import { InnerApp } from '../App';
import config from '../config.json';

window.CMS_MANUAL_INIT = true;

class MockRoutes extends React.Component {
  render() {
    console.log('#@#', global);

    return <div />;
  }
}

class Preview extends React.Component {
  render() {
    return (
      <Router type="memory">
        <InnerApp RoutesComp={MockRoutes} />
      </Router>
    );
  }
}

const { default: CMS, init } = require('netlify-cms');

class Admin extends React.Component {
  componentDidMount() {
    const LocalBackend = createLocalBackend(this.props.posts);
    CMS.registerBackend('local', LocalBackend);

    console.log(this.props);
    init({ config });

    CMS.registerPreviewTemplate('blog', createORYEditorPreview(Preview));
  }

  render() {
    return null;
  }
}

export default withRouteData(Admin);
