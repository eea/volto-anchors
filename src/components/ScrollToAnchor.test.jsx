import React from 'react';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import ScrollToAnchor from './ScrollToAnchor';
import { openAccordionIfContainsAnchors } from '@eeacms/volto-anchors/helpers';

const mockStore = configureStore();

jest.mock('../helpers', () => ({
  openAccordionIfContainsAnchors: jest.fn(),
}));

describe('ScrollToAnchor', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
    loadProtector: {
      location: {
        hash: '#anchor',
        pathname: {
          hash: '#anchor',
        },
      },
    },
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call openAccordionIfContainsAnchors with the correct hash', () => {
    render(
      <Provider store={store}>
        <ScrollToAnchor />
      </Provider>,
    );
    expect(openAccordionIfContainsAnchors).toHaveBeenCalledWith('#anchor');
  });

  it('should call openAccordionIfContainsAnchors with the pathname hash', () => {
    const newStore = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      loadProtector: {
        location: {
          pathname: {
            hash: '#anchor',
          },
        },
      },
    });
    render(
      <Provider store={newStore}>
        <ScrollToAnchor />
      </Provider>,
    );
    expect(openAccordionIfContainsAnchors).toHaveBeenCalledWith('#anchor');
  });

  it('should not call openAccordionIfContainsAnchors', () => {
    const newStore = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      loadProtector: {
        location: {
          pathname: {
            hash: null,
          },
        },
      },
    });

    render(
      <Provider store={newStore}>
        <ScrollToAnchor />
      </Provider>,
    );
    expect(openAccordionIfContainsAnchors).not.toHaveBeenCalled();
  });
});
