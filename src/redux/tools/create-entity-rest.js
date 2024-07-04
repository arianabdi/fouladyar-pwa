function isFunction(func) {
  return typeof func === 'function';
}

function requestConfigMerger(firstConfig = {}, secondConfig = {}) {
  return {
    ...firstConfig,
    ...secondConfig,
    headers: {
      ...firstConfig.headers,
      ...secondConfig.headers,
    },
    data: {
      ...firstConfig.data,
      ...secondConfig.data,
      ...firstConfig.body,
      ...secondConfig.body,
    },
    params: {
      ...firstConfig.params,
      ...secondConfig.params,
    },
  };
}

const defaultSettings = {
  actions: {
    addOne() {
      console.error('`addOne` action is required.');
    },
    setAll() {
      console.error('`setAll` action is required.');
    },
    removeOne() {
      console.error('`removeOne` action is required.');
    },
    updateOne() {
      console.error('`updateOne` action is required.');
    },
    requestStart() {
      console.error('`updateOne` action is required.');
    },
    requestEnd() {
      console.error('`requestEnd` action is required.');
    },
    requestError() {
      console.error('`requestError` action is required.');
    },
  },
  getPagination() {
    console.warn('if you need pagination feature pass `getPagination` config');

    return {};
  },
  setPagination() {
    console.warn('if you need pagination feature pass `setPagination` config');

    return {};
  },
};

export default function createEntityREST(settings = defaultSettings) {
  const { actions, baseUrl, fetcher } = settings;
  const overridedRequestsConfigBuilder = settings.requestsConfig ?? {};

  const defaultRequestsConfigBuilder = {
    create: (info = {}, options = {}) => ({
      url: `${baseUrl}`,
      method: 'POST',
      body: info,
    }),
    getAll: (options = {}) => {
      const pagination = settings.setPagination(options);

      return {
        url: `${baseUrl}`,
        method: 'GET',
        ...pagination,
      };
    },
    getOne: (id, options = {}) => ({
      url: `${baseUrl}/${id}`,
      method: 'GET',
    }),
    deleteOne: (id, info = {}, options = {}) => ({
      url: `${baseUrl}/${id}`,
      method: 'DELETE',
      body: info,
    }),
    patchOne: (id, info = {}, options = {}) => ({
      url: `${baseUrl}/${id}`,
      method: 'PUT',
      data: info,
    }),
  };

  function buildRequestConfig(requestName, ...args) {
    const buildDefaultRequest = defaultRequestsConfigBuilder[requestName];
    const buildOverridedRequest = overridedRequestsConfigBuilder[requestName];

    const defaultRequestInfo = isFunction(buildDefaultRequest) ? buildDefaultRequest(...args) : {};
    const overridedRequestInfo = isFunction(buildOverridedRequest) ? buildOverridedRequest(...args) : {};

    const finalRequestConfigs = requestConfigMerger(defaultRequestInfo, overridedRequestInfo);

    return finalRequestConfigs;
  }

  function higherOrderThunk(requestName, requsetArgs) {
    const { selectResult, ...requestConfig } = buildRequestConfig(requestName, ...requsetArgs);

    return async (dispatch, getState) => {
      try {
        dispatch(actions.requestStart());

        const requestResponse = await fetcher(requestConfig);

        const requestResult = isFunction(selectResult) ? selectResult(requestResponse) : {};

        return requestResult;
      } catch (error) {
        dispatch(actions.requestError(error));

        throw new Error(error.message);
      } finally {
        dispatch(actions.requestEnd());
      }
    };
  }

  function create(info, options) {
    return async (dispatch, getState) => {
      const result = await dispatch(higherOrderThunk('create', [info, options]));
      dispatch(actions.addOne(result));
    };
  }

  function getAll(options) {
    return async (dispatch, getState) => {
      const result = await dispatch(higherOrderThunk('getAll', [options]));
      dispatch(actions.setAll(result));
    };
  }

  function getOne(id, options) {
    return async (dispatch, getState) => {
      const result = await dispatch(higherOrderThunk('getOne', [id, options]));
      dispatch(actions.addOne(result));
    };
  }

  function deleteOne(id, info, options) {
    return async (dispatch, getState) => {
      await dispatch(higherOrderThunk('deleteOne', [id, info, options]));
      dispatch(actions.removeOne(id));
    };
  }

  function patchOne(id, info, options) {
    return async (dispatch, getState) => {
      const result = await dispatch(higherOrderThunk('patchOne', [id, info, options]));
      dispatch(actions.updateOne({
        id,
        changes: result,
      }));
    };
  }

  return {
    create,
    getAll,
    getOne,
    deleteOne,
    patchOne,
  };
}
