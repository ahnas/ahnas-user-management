import _ from 'lodash';
import * as modules from '../pages';
import { reducer } from '../pages/user';

const reducers = {};

// Include all the reducer to combine and provide to configure store.

_.values(modules).forEach((module) => {
  _.values(module).forEach((submodule) => {
    console.log('asdas')
    if (_.has(submodule, 'STATE_REDUCER_KEY') && _.has(submodule, 'reducer')) {
      _.set(reducers, `${submodule.STATE_REDUCER_KEY}`, submodule.reducer);
    }
  });
});

const rootReducer = {
  user:reducer
};

export default rootReducer;
