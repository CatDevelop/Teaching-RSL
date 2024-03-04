import MockAdapter from 'axios-mock-adapter';

import { http } from 'api/http';

export const httpMock = new MockAdapter(http);