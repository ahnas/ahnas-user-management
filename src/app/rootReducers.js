import _ from 'lodash';
import * as modules from '../pages';
import { reducer } from '../pages/user';

const reducers = {};

_.values(modules).forEach((module) => {
  _.values(module).forEach((submodule) => {
    if (_.has(submodule, 'STATE_REDUCER_KEY') && _.has(submodule, 'reducer')) {
      _.set(reducers, `${submodule.STATE_REDUCER_KEY}`, submodule.reducer);
    }
  });
});

const rootReducer = {
  user:reducer
};

export default rootReducer;
