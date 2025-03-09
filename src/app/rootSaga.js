import _ from 'lodash';
import { all, fork } from 'redux-saga/effects';

import * as modules from '../pages';
import { saga } from '../pages/user';

const sagas = [];

// Here you can include all the saga which you write for components
_.values(modules).forEach((module) => {
  _.values(module).forEach((subModule) => {
    if (_.has(subModule, 'STATE_REDUCER_KEY') && _.has(subModule, 'saga')) {
      sagas.push(fork(subModule.saga));
    }
  });
});

export default function* rootSaga() {
  yield all([saga()]);
}
