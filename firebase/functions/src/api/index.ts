import * as functions from 'firebase-functions';
import { api as _api } from './api';

export const api = functions.https.onRequest(_api);