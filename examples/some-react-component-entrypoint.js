/**
 * This is the entrypoint for some-react-component
 * that will be bundled by webpack and outputted to /dist/some-react-component.
 * 
 * We load the components we want to make embeddable and register them
 * with EmbeddableComponents. Also, we need to make
 * react and react dom available.
 */

import SomeReactComponent from './components/some-react-component';
import { EmbeddableComponents } from '../EmbeddableComponents';

import React from 'react';
import ReactDOM from 'react-dom';

EmbeddableComponents.registerLibrary({React, ReactDOM});
EmbeddableComponents.registerReactComponent('some-react-component', SomeReactComponent);

