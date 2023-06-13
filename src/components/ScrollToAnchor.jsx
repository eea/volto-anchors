import React from 'react';
import { connect } from 'react-redux';
import {
  openAccordionIfContainsAnchors,
  waitForElm,
  scrollToTarget,
} from '@eeacms/volto-anchors/helpers';

const ScrollToAnchor = (props) => {
  const { location } = props;

  React.useEffect(() => {
    const anchor = location?.hash || location?.pathname.hash;
    if (anchor) {
      waitForElm(anchor)
        .then((elm) => {
          scrollToTarget(elm);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err);
        });
      openAccordionIfContainsAnchors(anchor);
    }
  }, [location]);

  return null;
};

export default connect(
  (state, props) => ({
    location: state.loadProtector.location,
  }),
  {},
)(ScrollToAnchor);
