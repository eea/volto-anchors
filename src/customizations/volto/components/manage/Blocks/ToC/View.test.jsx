import React from 'react';
import renderer from 'react-test-renderer';
import View from './View';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import config from '@plone/volto/registry';

const mockStore = configureStore();

jest.mock('@plone/volto/registry', () => ({
  blocks: {
    blocksConfig: {
      blockType: {
        tocEntry: jest.fn(),
      },
    },
  },
}));

config.blocks.blocksConfig = {
  typeA: {
    tocEntry: () => [1, 'Title A'],
  },
  typeB: {
    tocEntry: () => [3],
  },
  typeC: {
    tocEntry: () => [2],
  },
};

jest.mock('@plone/volto/helpers', () => ({
  getBlocksFieldname: jest.fn(() => 'blocksFieldname'),
  getBlocksLayoutFieldname: jest.fn(() => 'blocksLayoutFieldname'),
  withBlockExtensions: jest.fn((Component) => Component),
}));

describe('View', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  const properties = {
    blocksFieldname: {
      id1: {
        '@type': 'typeB',
        plaintext: 'Block A',
        override_toc: false,
      },
    },
    blocksLayoutFieldname: {
      items: ['id1'],
    },
  };

  const mockPropsNested = {
    properties: {
      blocksFieldname: {
        id1: { '@type': 'typeA', plaintext: 'Parent Entry' },
        id2: { '@type': 'typeB', plaintext: 'Child Entry' },
        id3: { '@type': 'typeC', plaintext: 'Child Entry' },
      },
      blocksLayoutFieldname: { items: ['id1', 'id2', 'id3'] },
    },
    data: {
      levels: ['h1', 'h3', 'h2'],
    },
    mode: 'edit',
    variation: {
      view: () => <div>Renderer Component</div>,
      id: 'variation-id',
    },
  };

  it('renders Table of content message when in edit mode with no title and no tocEntries and does not render custom Renderer', () => {
    const component = renderer.create(
      <Provider store={store}>
        <View
          properties={{
            blocksLayoutFieldname: { items: [] },
            blocksFieldname: {},
          }}
          mode="edit"
          data={{ levels: [] }}
        />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
    expect(component.toJSON().props.className).toContain('table-of-contents');
  });

  it('renders Table of content message when in edit mode with no title and no tocEntries and renders custom Renderer', () => {
    const component = renderer.create(
      <Provider store={store}>
        <View
          properties={{
            blocksLayoutFieldname: { items: [] },
            blocksFieldname: {},
          }}
          mode="edit"
          data={{ levels: [] }}
          variation={{
            view: () => <div>Renderer Component</div>,
            id: 'variation-id',
          }}
        />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
    expect(component.toJSON().props.className).toContain('table-of-contents');
  });

  it('renders Table of content message when in edit mode with no title and tocEntries and renders custom Renderer', () => {
    const component = renderer.create(
      <Provider store={store}>
        <View properties={properties} mode="edit" data={{ levels: [] }} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
    expect(component.toJSON().props.className).toContain('table-of-contents');
  });

  it('undefined type', () => {
    const properties1 = {
      blocksFieldname: {
        id1: {
          '@type': undefined,
          plaintext: 'Block A',
          override_toc: false,
        },
      },
      blocksLayoutFieldname: {
        items: ['id1'],
      },
    };
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <View properties={properties1} mode="edit" data={{ levels: [] }} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
    expect(component.toJSON().props.className).toContain('table-of-contents');
  });

  it('there are no blocks with the given id in layout', () => {
    const properties1 = {
      blocksFieldname: {},
      blocksLayoutFieldname: {
        items: ['id1'],
      },
    };
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <View properties={properties1} mode="edit" data={{ levels: [] }} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
    expect(component.toJSON().props.className).toContain('table-of-contents');
  });

  it('nested TOC entries', () => {
    const component = renderer.create(
      <Provider store={store}>
        <View {...mockPropsNested} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
    expect(component.toJSON().props.className).toContain('table-of-contents');
  });
});
