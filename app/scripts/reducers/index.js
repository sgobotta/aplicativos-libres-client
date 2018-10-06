import app from './app';
import github from './github';
import ui from './ui';
import user from './user';
import fbEvents from './fb-events';

export default {
  ...app,
  ...github,
  ...ui,
  ...fbEvents,
  ...user,
};
