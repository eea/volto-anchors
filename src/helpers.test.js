import { isArray } from 'lodash';
import config from '@plone/volto/registry';
import { serializeNodes } from '@plone/volto-slate/editor/render';
import * as helpers from './helpers';
import '@testing-library/jest-dom/extend-expect';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';

const mockStore = configureStore();

const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
});

jest.mock('@plone/volto-slate/editor/render', () => ({
  serializeNodes: jest.fn(),
}));

describe('createSlateParagraph', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return default value when input is not an array', () => {
    const input = 'test';
    const slate = helpers.createSlateParagraph(input);
    expect(slate).toEqual(config.settings.slate.defaultValue('test'));
  });

  it('should return input when input is an array', () => {
    const input = ['test'];
    const result = helpers.createSlateParagraph(input);
    expect(result).toBe(input);
  });
});

describe('serializeText', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return the text when it is not an array', () => {
    const text = 'Hello, World!';

    expect(helpers.serializeText(text)).toEqual(text);
    expect(isArray(text)).toBe(false);
    expect(serializeNodes).not.toHaveBeenCalled();
  });

  it('should call serializeNodes when text is an array', () => {
    const text = ['Hello', 'World!'];

    helpers.serializeText(text);
    expect(isArray(text)).toBe(true);
    expect(serializeNodes).toHaveBeenCalledWith(text);
  });
});

describe('toSlug', () => {
  it('should convert string to slug', () => {
    const input = 'Hello World';
    const result = helpers.toSlug(input);
    expect(result).toBe('hello-world');
  });
});

describe('waitForElm', () => {
  let mockObserver;

  beforeEach(() => {
    // Reset the document.querySelector mock
    document.querySelector = jest.fn();

    // Mock the MutationObserver
    mockObserver = {
      observe: jest.fn(),
      disconnect: jest.fn(),
    };

    global.MutationObserver = jest.fn((callback) => {
      mockObserver.callback = callback;
      return mockObserver;
    });
  });

  it('should resolve immediately if the element is already in the DOM', async () => {
    const mockElement = {};
    document.querySelector.mockReturnValue(mockElement);

    const result = await helpers.waitForElm('.test');
    expect(result).toBe(mockElement);
    expect(mockObserver.observe).not.toHaveBeenCalled();
  });

  it('should start observing if the element is not in the DOM', () => {
    document.querySelector.mockReturnValue(null);

    // Call our function but don't await its promise (because the .test is never going to be added to the DOM)
    const promise = helpers.waitForElm('.test');

    expect(mockObserver.observe).toHaveBeenCalledWith(document.body, {
      childList: true,
      subtree: true,
    });

    // Clean up
    promise.catch(() => {});
  });

  it('should resolve and stop observing when the element is added to the DOM', async () => {
    const mockElement = {};

    document.querySelector = jest.fn((selector) =>
      selector === '.test' ? mockElement : null,
    );
    // we need to mock the querySelector twice, because the first time it will return null (not added to the DOM)
    // and the second time it will return the mockElement (added to the DOM)
    document.querySelector
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(mockElement);

    const promise = helpers.waitForElm('.test');

    // Simulate a DOM change
    mockObserver.callback([]);

    await expect(promise).resolves.toBe(mockElement);
    expect(mockObserver.disconnect).toHaveBeenCalled();
  });
});

describe('scrollToTarget', () => {
  it('should call window.scrollTo with the correct arguments', () => {
    window.scrollTo = jest.fn();

    // Create a mock element and mock its getBoundingClientRect function
    const mockElement = {
      getBoundingClientRect: jest.fn(),
    };
    // Mock the return values of getBoundingClientRect
    document.body.getBoundingClientRect = jest.fn(() => ({ top: 100 }));
    mockElement.getBoundingClientRect.mockReturnValue({ top: 200 });

    // Call our function
    helpers.scrollToTarget(mockElement, 50);

    // Assert that window.scrollTo was called with the correct arguments
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 50, // 200 - 100 - 50
      behavior: 'smooth',
    });
  });
});

describe('visitBlocks', () => {
  it('should call callback with correct arguments and in correct order', () => {
    const content = {
      blocks: {
        1: {
          id: 1,
          value: 'test1',
          blocks: {
            3: { id: 3, value: 'test3' },
          },
        },
        2: {
          id: 2,
          value: 'test2',
          data: {
            blocks: {
              4: { id: 4, value: 'test2.1' },
            },
          },
        },
      },
      blocks_layout: {
        items: [1, 2],
      },
    };

    const callback = jest.fn();
    helpers.visitBlocks(content, callback);
    expect(callback).toHaveBeenNthCalledWith(1, [
      2,
      {
        id: 2,
        value: 'test2',
        data: {
          blocks: {
            4: { id: 4, value: 'test2.1' },
          },
        },
      },
    ]);
    expect(callback).toHaveBeenNthCalledWith(2, [
      1,
      {
        id: 1,
        value: 'test1',
        blocks: { 3: { id: 3, value: 'test3' } },
      },
    ]);
  });
});

describe('renderLinkElement', () => {
  it('renders a link element with children and default props', () => {
    const TestComponent = helpers.renderLinkElement('div');
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <TestComponent attributes={{ id: 'test' }}>Test test</TestComponent>
        </Router>
      </Provider>,
    );
    expect(getByText('Test test')).toBeInTheDocument();
    expect(getByText('Test test').tagName).toBe('DIV');
    expect(getByText('Test test')).toHaveAttribute('id', 'test');
  });

  it('renders a link element with a className', () => {
    const TestComponent = helpers.renderLinkElement('div');
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <TestComponent className="test-class" attributes={{ id: 'test' }}>
            Test test
          </TestComponent>
        </Router>
      </Provider>,
    );
    expect(getByText('Test test')).toBeInTheDocument();
    expect(getByText('Test test')).toHaveClass('test-class');
  });

  it('renders an anchor link when mode is set to view', () => {
    const TestComponent = helpers.renderLinkElement('div');

    const { container } = render(
      <Provider store={store}>
        <Router>
          <TestComponent
            mode="view"
            className="test-class"
            attributes={{ id: 'test' }}
          >
            Test test
          </TestComponent>
        </Router>
      </Provider>,
    );
    const aTag = container.querySelector('a');
    expect(aTag).toBeInTheDocument();
    expect(aTag).toHaveAttribute('href', '/#test');
  });
});
