import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import HomeView from 'views/HomeView';

describe('HomeView', () => {
  let rendered;

  beforeEach(function() {
    let props = {};
    rendered = TestUtils.renderIntoDocument(<HomeView {...props} />);
  });

  it('(Meta) Should have a test that works with Jasmine expectations.', () => {
    expect(true).toBeTruthy();
  });
});
