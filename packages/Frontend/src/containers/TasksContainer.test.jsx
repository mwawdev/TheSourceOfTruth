/* eslint-env jest */
import { createAssertWithPropsToMatchSnapshot } from '../../test-utils';
import TasksContainer from './TasksContainer';

jest.mock('firebase');

describe('TasksContainer', () => {
  const defaultProps = {};

  const assertWithPropsToMatchSnapshot =
    createAssertWithPropsToMatchSnapshot(TasksContainer, defaultProps);
  it('should render', () => {
    assertWithPropsToMatchSnapshot();
  });
});
