import React from 'react';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import ScrollToTop from './ScrollToTop';

const mockStore = configureStore();

describe('ScrollToTop component', () => {
  it('calls scrollTo on componentDidUpdate if pathname changed and no hash is present', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      loadProtector: { location: { pathname: '/old' } },
    });

    window.scrollTo = jest.fn();

    const { rerender } = render(
      <Provider store={store}>
        <ScrollToTop>
          <div>test</div>
        </ScrollToTop>
      </Provider>,
    );

    const newStore = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      loadProtector: { location: { pathname: '/new' } },
    });

    rerender(
      <Provider store={newStore}>
        <ScrollToTop>
          <div>test</div>
        </ScrollToTop>
      </Provider>,
    );
    expect(window.scrollTo).toHaveBeenCalled();
  });

  it('does not call scrollTo on componentDidUpdate if pathname changed and hash is present', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      loadProtector: { location: { pathname: { hash: '/old' } } },
    });

    window.scrollTo = jest.fn();

    const { rerender } = render(
      <Provider store={store}>
        <ScrollToTop>
          <div>test</div>
        </ScrollToTop>
      </Provider>,
    );

    const newStore = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      loadProtector: { location: { pathname: { hash: '/new' } } },
    });

    rerender(
      <Provider store={newStore}>
        <ScrollToTop>
          <div>test</div>
        </ScrollToTop>
      </Provider>,
    );
    expect(window.scrollTo).not.toHaveBeenCalled();
  });
});
