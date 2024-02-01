import { g as getAugmentedNamespace, c as commonjsGlobal, p as process, b as buffer$1, a as getDefaultExportFromCjs } from "./shim.js";
import { p as public_env } from "./shared-server.js";
function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k in e) {
        if (k !== "default" && !(k in n)) {
          const d = Object.getOwnPropertyDescriptor(e, k);
          if (d) {
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: () => e[k]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
var algoliasearch$3 = { exports: {} };
function createFallbackableCache(options) {
  const caches = [...options.caches];
  const current = caches.shift();
  if (current === void 0) {
    return createNullCache();
  }
  return {
    get(key2, defaultValue, events2 = {
      miss: () => Promise.resolve()
    }) {
      return current.get(key2, defaultValue, events2).catch(() => {
        return createFallbackableCache({ caches }).get(key2, defaultValue, events2);
      });
    },
    set(key2, value) {
      return current.set(key2, value).catch(() => {
        return createFallbackableCache({ caches }).set(key2, value);
      });
    },
    delete(key2) {
      return current.delete(key2).catch(() => {
        return createFallbackableCache({ caches }).delete(key2);
      });
    },
    clear() {
      return current.clear().catch(() => {
        return createFallbackableCache({ caches }).clear();
      });
    }
  };
}
function createNullCache() {
  return {
    get(_key, defaultValue, events2 = {
      miss: () => Promise.resolve()
    }) {
      const value = defaultValue();
      return value.then((result) => Promise.all([result, events2.miss(result)])).then(([result]) => result);
    },
    set(_key, value) {
      return Promise.resolve(value);
    },
    delete(_key) {
      return Promise.resolve();
    },
    clear() {
      return Promise.resolve();
    }
  };
}
const cacheCommon_esm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createFallbackableCache,
  createNullCache
}, Symbol.toStringTag, { value: "Module" }));
const require$$0$2 = /* @__PURE__ */ getAugmentedNamespace(cacheCommon_esm);
function createInMemoryCache(options = { serializable: true }) {
  let cache = {};
  return {
    get(key2, defaultValue, events2 = {
      miss: () => Promise.resolve()
    }) {
      const keyAsString = JSON.stringify(key2);
      if (keyAsString in cache) {
        return Promise.resolve(options.serializable ? JSON.parse(cache[keyAsString]) : cache[keyAsString]);
      }
      const promise = defaultValue();
      const miss = events2 && events2.miss || (() => Promise.resolve());
      return promise.then((value) => miss(value)).then(() => promise);
    },
    set(key2, value) {
      cache[JSON.stringify(key2)] = options.serializable ? JSON.stringify(value) : value;
      return Promise.resolve(value);
    },
    delete(key2) {
      delete cache[JSON.stringify(key2)];
      return Promise.resolve();
    },
    clear() {
      cache = {};
      return Promise.resolve();
    }
  };
}
const cacheInMemory_esm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createInMemoryCache
}, Symbol.toStringTag, { value: "Module" }));
const require$$1$1 = /* @__PURE__ */ getAugmentedNamespace(cacheInMemory_esm);
function createAuth(authMode, appId, apiKey) {
  const credentials = {
    "x-algolia-api-key": apiKey,
    "x-algolia-application-id": appId
  };
  return {
    headers() {
      return authMode === AuthMode.WithinHeaders ? credentials : {};
    },
    queryParameters() {
      return authMode === AuthMode.WithinQueryParameters ? credentials : {};
    }
  };
}
function createRetryablePromise(callback) {
  let retriesCount = 0;
  const retry = () => {
    retriesCount++;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(callback(retry));
      }, Math.min(100 * retriesCount, 1e3));
    });
  };
  return callback(retry);
}
function createWaitablePromise(promise, wait = (_response, _requestOptions) => {
  return Promise.resolve();
}) {
  return Object.assign(promise, {
    wait(requestOptions) {
      return createWaitablePromise(promise.then((response2) => Promise.all([wait(response2, requestOptions), response2])).then((promiseResults) => promiseResults[1]));
    }
  });
}
function shuffle(array) {
  let c = array.length - 1;
  for (c; c > 0; c--) {
    const b = Math.floor(Math.random() * (c + 1));
    const a = array[c];
    array[c] = array[b];
    array[b] = a;
  }
  return array;
}
function addMethods(base2, methods) {
  if (!methods) {
    return base2;
  }
  Object.keys(methods).forEach((key2) => {
    base2[key2] = methods[key2](base2);
  });
  return base2;
}
function encode$2(format, ...args) {
  let i = 0;
  return format.replace(/%s/g, () => encodeURIComponent(args[i++]));
}
const version$1 = "4.20.0";
const destroy = (base2) => {
  return () => {
    return base2.transporter.requester.destroy();
  };
};
const AuthMode = {
  /**
   * If auth credentials should be in query parameters.
   */
  WithinQueryParameters: 0,
  /**
   * If auth credentials should be in headers.
   */
  WithinHeaders: 1
};
const clientCommon_esm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AuthMode,
  addMethods,
  createAuth,
  createRetryablePromise,
  createWaitablePromise,
  destroy,
  encode: encode$2,
  shuffle,
  version: version$1
}, Symbol.toStringTag, { value: "Module" }));
const MethodEnum = {
  Delete: "DELETE",
  Get: "GET",
  Post: "POST",
  Put: "PUT"
};
function createMappedRequestOptions(requestOptions, timeout) {
  const options = requestOptions || {};
  const data = options.data || {};
  Object.keys(options).forEach((key2) => {
    if (["timeout", "headers", "queryParameters", "data", "cacheable"].indexOf(key2) === -1) {
      data[key2] = options[key2];
    }
  });
  return {
    data: Object.entries(data).length > 0 ? data : void 0,
    timeout: options.timeout || timeout,
    headers: options.headers || {},
    queryParameters: options.queryParameters || {},
    cacheable: options.cacheable
  };
}
const CallEnum = {
  /**
   * If the host is read only.
   */
  Read: 1,
  /**
   * If the host is write only.
   */
  Write: 2,
  /**
   * If the host is both read and write.
   */
  Any: 3
};
const HostStatusEnum = {
  Up: 1,
  Down: 2,
  Timeouted: 3
};
const EXPIRATION_DELAY = 2 * 60 * 1e3;
function createStatefulHost(host, status = HostStatusEnum.Up) {
  return {
    ...host,
    status,
    lastUpdate: Date.now()
  };
}
function isStatefulHostUp(host) {
  return host.status === HostStatusEnum.Up || Date.now() - host.lastUpdate > EXPIRATION_DELAY;
}
function isStatefulHostTimeouted(host) {
  return host.status === HostStatusEnum.Timeouted && Date.now() - host.lastUpdate <= EXPIRATION_DELAY;
}
function createStatelessHost(options) {
  if (typeof options === "string") {
    return {
      protocol: "https",
      url: options,
      accept: CallEnum.Any
    };
  }
  return {
    protocol: options.protocol || "https",
    url: options.url,
    accept: options.accept || CallEnum.Any
  };
}
function createRetryableOptions(hostsCache, statelessHosts) {
  return Promise.all(statelessHosts.map((statelessHost) => {
    return hostsCache.get(statelessHost, () => {
      return Promise.resolve(createStatefulHost(statelessHost));
    });
  })).then((statefulHosts) => {
    const hostsUp = statefulHosts.filter((host) => isStatefulHostUp(host));
    const hostsTimeouted = statefulHosts.filter((host) => isStatefulHostTimeouted(host));
    const hostsAvailable = [...hostsUp, ...hostsTimeouted];
    const statelessHostsAvailable = hostsAvailable.length > 0 ? hostsAvailable.map((host) => createStatelessHost(host)) : statelessHosts;
    return {
      getTimeout(timeoutsCount, baseTimeout) {
        const timeoutMultiplier = hostsTimeouted.length === 0 && timeoutsCount === 0 ? 1 : hostsTimeouted.length + 3 + timeoutsCount;
        return timeoutMultiplier * baseTimeout;
      },
      statelessHosts: statelessHostsAvailable
    };
  });
}
const isNetworkError = ({ isTimedOut, status }) => {
  return !isTimedOut && ~~status === 0;
};
const isRetryable = (response2) => {
  const status = response2.status;
  const isTimedOut = response2.isTimedOut;
  return isTimedOut || isNetworkError(response2) || ~~(status / 100) !== 2 && ~~(status / 100) !== 4;
};
const isSuccess = ({ status }) => {
  return ~~(status / 100) === 2;
};
const retryDecision = (response2, outcomes) => {
  if (isRetryable(response2)) {
    return outcomes.onRetry(response2);
  }
  if (isSuccess(response2)) {
    return outcomes.onSuccess(response2);
  }
  return outcomes.onFail(response2);
};
function retryableRequest(transporter2, statelessHosts, request2, requestOptions) {
  const stackTrace = [];
  const data = serializeData(request2, requestOptions);
  const headers = serializeHeaders(transporter2, requestOptions);
  const method = request2.method;
  const dataQueryParameters = request2.method !== MethodEnum.Get ? {} : {
    ...request2.data,
    ...requestOptions.data
  };
  const queryParameters = {
    "x-algolia-agent": transporter2.userAgent.value,
    ...transporter2.queryParameters,
    ...dataQueryParameters,
    ...requestOptions.queryParameters
  };
  let timeoutsCount = 0;
  const retry = (hosts, getTimeout) => {
    const host = hosts.pop();
    if (host === void 0) {
      throw createRetryError(stackTraceWithoutCredentials(stackTrace));
    }
    const payload = {
      data,
      headers,
      method,
      url: serializeUrl(host, request2.path, queryParameters),
      connectTimeout: getTimeout(timeoutsCount, transporter2.timeouts.connect),
      responseTimeout: getTimeout(timeoutsCount, requestOptions.timeout)
    };
    const pushToStackTrace = (response2) => {
      const stackFrame = {
        request: payload,
        response: response2,
        host,
        triesLeft: hosts.length
      };
      stackTrace.push(stackFrame);
      return stackFrame;
    };
    const decisions = {
      onSuccess: (response2) => deserializeSuccess(response2),
      onRetry(response2) {
        const stackFrame = pushToStackTrace(response2);
        if (response2.isTimedOut) {
          timeoutsCount++;
        }
        return Promise.all([
          /**
           * Failures are individually send the logger, allowing
           * the end user to debug / store stack frames even
           * when a retry error does not happen.
           */
          transporter2.logger.info("Retryable failure", stackFrameWithoutCredentials(stackFrame)),
          /**
           * We also store the state of the host in failure cases. If the host, is
           * down it will remain down for the next 2 minutes. In a timeout situation,
           * this host will be added end of the list of hosts on the next request.
           */
          transporter2.hostsCache.set(host, createStatefulHost(host, response2.isTimedOut ? HostStatusEnum.Timeouted : HostStatusEnum.Down))
        ]).then(() => retry(hosts, getTimeout));
      },
      onFail(response2) {
        pushToStackTrace(response2);
        throw deserializeFailure(response2, stackTraceWithoutCredentials(stackTrace));
      }
    };
    return transporter2.requester.send(payload).then((response2) => {
      return retryDecision(response2, decisions);
    });
  };
  return createRetryableOptions(transporter2.hostsCache, statelessHosts).then((options) => {
    return retry([...options.statelessHosts].reverse(), options.getTimeout);
  });
}
function createTransporter(options) {
  const { hostsCache, logger, requester, requestsCache, responsesCache, timeouts, userAgent, hosts, queryParameters, headers } = options;
  const transporter2 = {
    hostsCache,
    logger,
    requester,
    requestsCache,
    responsesCache,
    timeouts,
    userAgent,
    headers,
    queryParameters,
    hosts: hosts.map((host) => createStatelessHost(host)),
    read(request2, requestOptions) {
      const mappedRequestOptions = createMappedRequestOptions(requestOptions, transporter2.timeouts.read);
      const createRetryableRequest = () => {
        return retryableRequest(transporter2, transporter2.hosts.filter((host) => (host.accept & CallEnum.Read) !== 0), request2, mappedRequestOptions);
      };
      const cacheable = mappedRequestOptions.cacheable !== void 0 ? mappedRequestOptions.cacheable : request2.cacheable;
      if (cacheable !== true) {
        return createRetryableRequest();
      }
      const key2 = {
        request: request2,
        mappedRequestOptions,
        transporter: {
          queryParameters: transporter2.queryParameters,
          headers: transporter2.headers
        }
      };
      return transporter2.responsesCache.get(key2, () => {
        return transporter2.requestsCache.get(key2, () => {
          return transporter2.requestsCache.set(key2, createRetryableRequest()).then((response2) => Promise.all([transporter2.requestsCache.delete(key2), response2]), (err) => Promise.all([transporter2.requestsCache.delete(key2), Promise.reject(err)])).then(([_, response2]) => response2);
        });
      }, {
        /**
         * Of course, once we get this response back from the server, we
         * tell response cache to actually store the received response
         * to be used later.
         */
        miss: (response2) => transporter2.responsesCache.set(key2, response2)
      });
    },
    write(request2, requestOptions) {
      return retryableRequest(transporter2, transporter2.hosts.filter((host) => (host.accept & CallEnum.Write) !== 0), request2, createMappedRequestOptions(requestOptions, transporter2.timeouts.write));
    }
  };
  return transporter2;
}
function createUserAgent(version2) {
  const userAgent = {
    value: `Algolia for JavaScript (${version2})`,
    add(options) {
      const addedUserAgent = `; ${options.segment}${options.version !== void 0 ? ` (${options.version})` : ""}`;
      if (userAgent.value.indexOf(addedUserAgent) === -1) {
        userAgent.value = `${userAgent.value}${addedUserAgent}`;
      }
      return userAgent;
    }
  };
  return userAgent;
}
function deserializeSuccess(response2) {
  try {
    return JSON.parse(response2.content);
  } catch (e) {
    throw createDeserializationError(e.message, response2);
  }
}
function deserializeFailure({ content, status }, stackFrame) {
  let message = content;
  try {
    message = JSON.parse(content).message;
  } catch (e) {
  }
  return createApiError(message, status, stackFrame);
}
function encode$1(format, ...args) {
  let i = 0;
  return format.replace(/%s/g, () => encodeURIComponent(args[i++]));
}
function serializeUrl(host, path, queryParameters) {
  const queryParametersAsString = serializeQueryParameters(queryParameters);
  let url2 = `${host.protocol}://${host.url}/${path.charAt(0) === "/" ? path.substr(1) : path}`;
  if (queryParametersAsString.length) {
    url2 += `?${queryParametersAsString}`;
  }
  return url2;
}
function serializeQueryParameters(parameters) {
  const isObjectOrArray = (value) => Object.prototype.toString.call(value) === "[object Object]" || Object.prototype.toString.call(value) === "[object Array]";
  return Object.keys(parameters).map((key2) => encode$1("%s=%s", key2, isObjectOrArray(parameters[key2]) ? JSON.stringify(parameters[key2]) : parameters[key2])).join("&");
}
function serializeData(request2, requestOptions) {
  if (request2.method === MethodEnum.Get || request2.data === void 0 && requestOptions.data === void 0) {
    return void 0;
  }
  const data = Array.isArray(request2.data) ? request2.data : { ...request2.data, ...requestOptions.data };
  return JSON.stringify(data);
}
function serializeHeaders(transporter2, requestOptions) {
  const headers = {
    ...transporter2.headers,
    ...requestOptions.headers
  };
  const serializedHeaders = {};
  Object.keys(headers).forEach((header) => {
    const value = headers[header];
    serializedHeaders[header.toLowerCase()] = value;
  });
  return serializedHeaders;
}
function stackTraceWithoutCredentials(stackTrace) {
  return stackTrace.map((stackFrame) => stackFrameWithoutCredentials(stackFrame));
}
function stackFrameWithoutCredentials(stackFrame) {
  const modifiedHeaders = stackFrame.request.headers["x-algolia-api-key"] ? { "x-algolia-api-key": "*****" } : {};
  return {
    ...stackFrame,
    request: {
      ...stackFrame.request,
      headers: {
        ...stackFrame.request.headers,
        ...modifiedHeaders
      }
    }
  };
}
function createApiError(message, status, transporterStackTrace) {
  return {
    name: "ApiError",
    message,
    status,
    transporterStackTrace
  };
}
function createDeserializationError(message, response2) {
  return {
    name: "DeserializationError",
    message,
    response: response2
  };
}
function createRetryError(transporterStackTrace) {
  return {
    name: "RetryError",
    message: "Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.",
    transporterStackTrace
  };
}
const transporter_esm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CallEnum,
  HostStatusEnum,
  createApiError,
  createDeserializationError,
  createMappedRequestOptions,
  createRetryError,
  createStatefulHost,
  createStatelessHost,
  createTransporter,
  createUserAgent,
  deserializeFailure,
  deserializeSuccess,
  isStatefulHostTimeouted,
  isStatefulHostUp,
  serializeData,
  serializeHeaders,
  serializeQueryParameters,
  serializeUrl,
  stackFrameWithoutCredentials,
  stackTraceWithoutCredentials
}, Symbol.toStringTag, { value: "Module" }));
const createAnalyticsClient = (options) => {
  const region = options.region || "us";
  const auth = createAuth(AuthMode.WithinHeaders, options.appId, options.apiKey);
  const transporter2 = createTransporter({
    hosts: [{ url: `analytics.${region}.algolia.com` }],
    ...options,
    headers: {
      ...auth.headers(),
      ...{ "content-type": "application/json" },
      ...options.headers
    },
    queryParameters: {
      ...auth.queryParameters(),
      ...options.queryParameters
    }
  });
  const appId = options.appId;
  return addMethods({ appId, transporter: transporter2 }, options.methods);
};
const addABTest = (base2) => {
  return (abTest, requestOptions) => {
    return base2.transporter.write({
      method: MethodEnum.Post,
      path: "2/abtests",
      data: abTest
    }, requestOptions);
  };
};
const deleteABTest = (base2) => {
  return (abTestID, requestOptions) => {
    return base2.transporter.write({
      method: MethodEnum.Delete,
      path: encode$2("2/abtests/%s", abTestID)
    }, requestOptions);
  };
};
const getABTest = (base2) => {
  return (abTestID, requestOptions) => {
    return base2.transporter.read({
      method: MethodEnum.Get,
      path: encode$2("2/abtests/%s", abTestID)
    }, requestOptions);
  };
};
const getABTests = (base2) => {
  return (requestOptions) => {
    return base2.transporter.read({
      method: MethodEnum.Get,
      path: "2/abtests"
    }, requestOptions);
  };
};
const stopABTest = (base2) => {
  return (abTestID, requestOptions) => {
    return base2.transporter.write({
      method: MethodEnum.Post,
      path: encode$2("2/abtests/%s/stop", abTestID)
    }, requestOptions);
  };
};
const clientAnalytics_esm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addABTest,
  createAnalyticsClient,
  deleteABTest,
  getABTest,
  getABTests,
  stopABTest
}, Symbol.toStringTag, { value: "Module" }));
const require$$2 = /* @__PURE__ */ getAugmentedNamespace(clientAnalytics_esm);
const require$$3 = /* @__PURE__ */ getAugmentedNamespace(clientCommon_esm);
const createPersonalizationClient = (options) => {
  const region = options.region || "us";
  const auth = createAuth(AuthMode.WithinHeaders, options.appId, options.apiKey);
  const transporter2 = createTransporter({
    hosts: [{ url: `personalization.${region}.algolia.com` }],
    ...options,
    headers: {
      ...auth.headers(),
      ...{ "content-type": "application/json" },
      ...options.headers
    },
    queryParameters: {
      ...auth.queryParameters(),
      ...options.queryParameters
    }
  });
  return addMethods({ appId: options.appId, transporter: transporter2 }, options.methods);
};
const getPersonalizationStrategy = (base2) => {
  return (requestOptions) => {
    return base2.transporter.read({
      method: MethodEnum.Get,
      path: "1/strategies/personalization"
    }, requestOptions);
  };
};
const setPersonalizationStrategy = (base2) => {
  return (personalizationStrategy, requestOptions) => {
    return base2.transporter.write({
      method: MethodEnum.Post,
      path: "1/strategies/personalization",
      data: personalizationStrategy
    }, requestOptions);
  };
};
const clientPersonalization_esm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createPersonalizationClient,
  getPersonalizationStrategy,
  setPersonalizationStrategy
}, Symbol.toStringTag, { value: "Module" }));
const require$$4 = /* @__PURE__ */ getAugmentedNamespace(clientPersonalization_esm);
var cryptoBrowserify = {};
var randombytes;
var hasRequiredRandombytes;
function requireRandombytes() {
  if (hasRequiredRandombytes)
    return randombytes;
  hasRequiredRandombytes = 1;
  randombytes = requireCryptoBrowserify().randomBytes;
  return randombytes;
}
var createHash;
var hasRequiredCreateHash;
function requireCreateHash() {
  if (hasRequiredCreateHash)
    return createHash;
  hasRequiredCreateHash = 1;
  createHash = requireCryptoBrowserify().createHash;
  return createHash;
}
var createHmac;
var hasRequiredCreateHmac;
function requireCreateHmac() {
  if (hasRequiredCreateHmac)
    return createHmac;
  hasRequiredCreateHmac = 1;
  createHmac = requireCryptoBrowserify().createHmac;
  return createHmac;
}
const sha224WithRSAEncryption = {
  sign: "rsa",
  hash: "sha224",
  id: "302d300d06096086480165030402040500041c"
};
const sha256WithRSAEncryption = {
  sign: "rsa",
  hash: "sha256",
  id: "3031300d060960864801650304020105000420"
};
const sha384WithRSAEncryption = {
  sign: "rsa",
  hash: "sha384",
  id: "3041300d060960864801650304020205000430"
};
const sha512WithRSAEncryption = {
  sign: "rsa",
  hash: "sha512",
  id: "3051300d060960864801650304020305000440"
};
const sha256 = {
  sign: "ecdsa",
  hash: "sha256",
  id: ""
};
const sha224 = {
  sign: "ecdsa",
  hash: "sha224",
  id: ""
};
const sha384 = {
  sign: "ecdsa",
  hash: "sha384",
  id: ""
};
const sha512 = {
  sign: "ecdsa",
  hash: "sha512",
  id: ""
};
const DSA = {
  sign: "dsa",
  hash: "sha1",
  id: ""
};
const ripemd160WithRSA = {
  sign: "rsa",
  hash: "rmd160",
  id: "3021300906052b2403020105000414"
};
const md5WithRSAEncryption = {
  sign: "rsa",
  hash: "md5",
  id: "3020300c06082a864886f70d020505000410"
};
const require$$0$1 = {
  sha224WithRSAEncryption,
  "RSA-SHA224": {
    sign: "ecdsa/rsa",
    hash: "sha224",
    id: "302d300d06096086480165030402040500041c"
  },
  sha256WithRSAEncryption,
  "RSA-SHA256": {
    sign: "ecdsa/rsa",
    hash: "sha256",
    id: "3031300d060960864801650304020105000420"
  },
  sha384WithRSAEncryption,
  "RSA-SHA384": {
    sign: "ecdsa/rsa",
    hash: "sha384",
    id: "3041300d060960864801650304020205000430"
  },
  sha512WithRSAEncryption,
  "RSA-SHA512": {
    sign: "ecdsa/rsa",
    hash: "sha512",
    id: "3051300d060960864801650304020305000440"
  },
  "RSA-SHA1": {
    sign: "rsa",
    hash: "sha1",
    id: "3021300906052b0e03021a05000414"
  },
  "ecdsa-with-SHA1": {
    sign: "ecdsa",
    hash: "sha1",
    id: ""
  },
  sha256,
  sha224,
  sha384,
  sha512,
  "DSA-SHA": {
    sign: "dsa",
    hash: "sha1",
    id: ""
  },
  "DSA-SHA1": {
    sign: "dsa",
    hash: "sha1",
    id: ""
  },
  DSA,
  "DSA-WITH-SHA224": {
    sign: "dsa",
    hash: "sha224",
    id: ""
  },
  "DSA-SHA224": {
    sign: "dsa",
    hash: "sha224",
    id: ""
  },
  "DSA-WITH-SHA256": {
    sign: "dsa",
    hash: "sha256",
    id: ""
  },
  "DSA-SHA256": {
    sign: "dsa",
    hash: "sha256",
    id: ""
  },
  "DSA-WITH-SHA384": {
    sign: "dsa",
    hash: "sha384",
    id: ""
  },
  "DSA-SHA384": {
    sign: "dsa",
    hash: "sha384",
    id: ""
  },
  "DSA-WITH-SHA512": {
    sign: "dsa",
    hash: "sha512",
    id: ""
  },
  "DSA-SHA512": {
    sign: "dsa",
    hash: "sha512",
    id: ""
  },
  "DSA-RIPEMD160": {
    sign: "dsa",
    hash: "rmd160",
    id: ""
  },
  ripemd160WithRSA,
  "RSA-RIPEMD160": {
    sign: "rsa",
    hash: "rmd160",
    id: "3021300906052b2403020105000414"
  },
  md5WithRSAEncryption,
  "RSA-MD5": {
    sign: "rsa",
    hash: "md5",
    id: "3020300c06082a864886f70d020505000410"
  }
};
var algos = require$$0$1;
var pbkdf2 = {};
var MAX_ALLOC = Math.pow(2, 30) - 1;
var precondition = function(iterations, keylen) {
  if (typeof iterations !== "number") {
    throw new TypeError("Iterations not a number");
  }
  if (iterations < 0) {
    throw new TypeError("Bad iterations");
  }
  if (typeof keylen !== "number") {
    throw new TypeError("Key length not a number");
  }
  if (keylen < 0 || keylen > MAX_ALLOC || keylen !== keylen) {
    throw new TypeError("Bad key length");
  }
};
var defaultEncoding;
if (commonjsGlobal.process && commonjsGlobal.process.browser) {
  defaultEncoding = "utf-8";
} else if (commonjsGlobal.process && commonjsGlobal.process.version) {
  var pVersionMajor = parseInt(process.version.split(".")[0].slice(1), 10);
  defaultEncoding = pVersionMajor >= 6 ? "utf-8" : "binary";
} else {
  defaultEncoding = "utf-8";
}
var defaultEncoding_1 = defaultEncoding;
var safeBuffer = { exports: {} };
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
(function(module, exports) {
  var buffer2 = buffer$1;
  var Buffer2 = buffer2.Buffer;
  function copyProps(src, dst) {
    for (var key2 in src) {
      dst[key2] = src[key2];
    }
  }
  if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
    module.exports = buffer2;
  } else {
    copyProps(buffer2, exports);
    exports.Buffer = SafeBuffer;
  }
  function SafeBuffer(arg, encodingOrOffset, length) {
    return Buffer2(arg, encodingOrOffset, length);
  }
  SafeBuffer.prototype = Object.create(Buffer2.prototype);
  copyProps(Buffer2, SafeBuffer);
  SafeBuffer.from = function(arg, encodingOrOffset, length) {
    if (typeof arg === "number") {
      throw new TypeError("Argument must not be a number");
    }
    return Buffer2(arg, encodingOrOffset, length);
  };
  SafeBuffer.alloc = function(size, fill, encoding) {
    if (typeof size !== "number") {
      throw new TypeError("Argument must be a number");
    }
    var buf = Buffer2(size);
    if (fill !== void 0) {
      if (typeof encoding === "string") {
        buf.fill(fill, encoding);
      } else {
        buf.fill(fill);
      }
    } else {
      buf.fill(0);
    }
    return buf;
  };
  SafeBuffer.allocUnsafe = function(size) {
    if (typeof size !== "number") {
      throw new TypeError("Argument must be a number");
    }
    return Buffer2(size);
  };
  SafeBuffer.allocUnsafeSlow = function(size) {
    if (typeof size !== "number") {
      throw new TypeError("Argument must be a number");
    }
    return buffer2.SlowBuffer(size);
  };
})(safeBuffer, safeBuffer.exports);
var safeBufferExports = safeBuffer.exports;
var Buffer = safeBufferExports.Buffer;
var toBuffer = function(thing, encoding, name2) {
  if (Buffer.isBuffer(thing)) {
    return thing;
  } else if (typeof thing === "string") {
    return Buffer.from(thing, encoding);
  } else if (ArrayBuffer.isView(thing)) {
    return Buffer.from(thing.buffer);
  } else {
    throw new TypeError(name2 + " must be a string, a Buffer, a typed array or a DataView");
  }
};
var sync;
var hasRequiredSync;
function requireSync() {
  if (hasRequiredSync)
    return sync;
  hasRequiredSync = 1;
  var sizes = {
    md5: 16,
    sha1: 20,
    sha224: 28,
    sha256: 32,
    sha384: 48,
    sha512: 64,
    rmd160: 20,
    ripemd160: 20
  };
  var createHmac2 = requireCreateHmac();
  var Buffer2 = safeBufferExports.Buffer;
  var checkParameters = precondition;
  var defaultEncoding2 = defaultEncoding_1;
  var toBuffer$1 = toBuffer;
  function pbkdf22(password, salt, iterations, keylen, digest) {
    checkParameters(iterations, keylen);
    password = toBuffer$1(password, defaultEncoding2, "Password");
    salt = toBuffer$1(salt, defaultEncoding2, "Salt");
    digest = digest || "sha1";
    var DK = Buffer2.allocUnsafe(keylen);
    var block1 = Buffer2.allocUnsafe(salt.length + 4);
    salt.copy(block1, 0, 0, salt.length);
    var destPos = 0;
    var hLen = sizes[digest];
    var l = Math.ceil(keylen / hLen);
    for (var i = 1; i <= l; i++) {
      block1.writeUInt32BE(i, salt.length);
      var T = createHmac2(digest, password).update(block1).digest();
      var U = T;
      for (var j = 1; j < iterations; j++) {
        U = createHmac2(digest, password).update(U).digest();
        for (var k = 0; k < hLen; k++)
          T[k] ^= U[k];
      }
      T.copy(DK, destPos);
      destPos += hLen;
    }
    return DK;
  }
  sync = pbkdf22;
  return sync;
}
var async;
var hasRequiredAsync;
function requireAsync() {
  if (hasRequiredAsync)
    return async;
  hasRequiredAsync = 1;
  var Buffer2 = safeBufferExports.Buffer;
  var checkParameters = precondition;
  var defaultEncoding2 = defaultEncoding_1;
  var sync2 = requireSync();
  var toBuffer$1 = toBuffer;
  var ZERO_BUF;
  var subtle = commonjsGlobal.crypto && commonjsGlobal.crypto.subtle;
  var toBrowser = {
    sha: "SHA-1",
    "sha-1": "SHA-1",
    sha1: "SHA-1",
    sha256: "SHA-256",
    "sha-256": "SHA-256",
    sha384: "SHA-384",
    "sha-384": "SHA-384",
    "sha-512": "SHA-512",
    sha512: "SHA-512"
  };
  var checks = [];
  function checkNative(algo) {
    if (commonjsGlobal.process && !commonjsGlobal.process.browser) {
      return Promise.resolve(false);
    }
    if (!subtle || !subtle.importKey || !subtle.deriveBits) {
      return Promise.resolve(false);
    }
    if (checks[algo] !== void 0) {
      return checks[algo];
    }
    ZERO_BUF = ZERO_BUF || Buffer2.alloc(8);
    var prom = browserPbkdf2(ZERO_BUF, ZERO_BUF, 10, 128, algo).then(function() {
      return true;
    }).catch(function() {
      return false;
    });
    checks[algo] = prom;
    return prom;
  }
  var nextTick;
  function getNextTick() {
    if (nextTick) {
      return nextTick;
    }
    if (commonjsGlobal.process && commonjsGlobal.process.nextTick) {
      nextTick = commonjsGlobal.process.nextTick;
    } else if (commonjsGlobal.queueMicrotask) {
      nextTick = commonjsGlobal.queueMicrotask;
    } else if (commonjsGlobal.setImmediate) {
      nextTick = commonjsGlobal.setImmediate;
    } else {
      nextTick = commonjsGlobal.setTimeout;
    }
    return nextTick;
  }
  function browserPbkdf2(password, salt, iterations, length, algo) {
    return subtle.importKey(
      "raw",
      password,
      { name: "PBKDF2" },
      false,
      ["deriveBits"]
    ).then(function(key2) {
      return subtle.deriveBits({
        name: "PBKDF2",
        salt,
        iterations,
        hash: {
          name: algo
        }
      }, key2, length << 3);
    }).then(function(res) {
      return Buffer2.from(res);
    });
  }
  function resolvePromise(promise, callback) {
    promise.then(function(out) {
      getNextTick()(function() {
        callback(null, out);
      });
    }, function(e) {
      getNextTick()(function() {
        callback(e);
      });
    });
  }
  async = function(password, salt, iterations, keylen, digest, callback) {
    if (typeof digest === "function") {
      callback = digest;
      digest = void 0;
    }
    digest = digest || "sha1";
    var algo = toBrowser[digest.toLowerCase()];
    if (!algo || typeof commonjsGlobal.Promise !== "function") {
      getNextTick()(function() {
        var out;
        try {
          out = sync2(password, salt, iterations, keylen, digest);
        } catch (e) {
          return callback(e);
        }
        callback(null, out);
      });
      return;
    }
    checkParameters(iterations, keylen);
    password = toBuffer$1(password, defaultEncoding2, "Password");
    salt = toBuffer$1(salt, defaultEncoding2, "Salt");
    if (typeof callback !== "function")
      throw new Error("No callback provided to pbkdf2");
    resolvePromise(checkNative(algo).then(function(resp) {
      if (resp)
        return browserPbkdf2(password, salt, iterations, keylen, algo);
      return sync2(password, salt, iterations, keylen, digest);
    }), callback);
  };
  return async;
}
var hasRequiredPbkdf2;
function requirePbkdf2() {
  if (hasRequiredPbkdf2)
    return pbkdf2;
  hasRequiredPbkdf2 = 1;
  var native = requireCryptoBrowserify();
  var checkParameters = precondition;
  var defaultEncoding2 = defaultEncoding_1;
  var toBuffer$1 = toBuffer;
  function nativePBKDF2(password, salt, iterations, keylen, digest, callback) {
    checkParameters(iterations, keylen);
    password = toBuffer$1(password, defaultEncoding2, "Password");
    salt = toBuffer$1(salt, defaultEncoding2, "Salt");
    if (typeof digest === "function") {
      callback = digest;
      digest = "sha1";
    }
    if (typeof callback !== "function")
      throw new Error("No callback provided to pbkdf2");
    return native.pbkdf2(password, salt, iterations, keylen, digest, callback);
  }
  function nativePBKDF2Sync(password, salt, iterations, keylen, digest) {
    checkParameters(iterations, keylen);
    password = toBuffer$1(password, defaultEncoding2, "Password");
    salt = toBuffer$1(salt, defaultEncoding2, "Salt");
    digest = digest || "sha1";
    return native.pbkdf2Sync(password, salt, iterations, keylen, digest);
  }
  if (!native.pbkdf2Sync || native.pbkdf2Sync.toString().indexOf("keylen, digest") === -1) {
    pbkdf2.pbkdf2Sync = requireSync();
    pbkdf2.pbkdf2 = requireAsync();
  } else {
    pbkdf2.pbkdf2Sync = nativePBKDF2Sync;
    pbkdf2.pbkdf2 = nativePBKDF2;
  }
  return pbkdf2;
}
var browserifyCipher = {};
var hasRequiredBrowserifyCipher;
function requireBrowserifyCipher() {
  if (hasRequiredBrowserifyCipher)
    return browserifyCipher;
  hasRequiredBrowserifyCipher = 1;
  var crypto = requireCryptoBrowserify();
  browserifyCipher.createCipher = browserifyCipher.Cipher = crypto.createCipher;
  browserifyCipher.createCipheriv = browserifyCipher.Cipheriv = crypto.createCipheriv;
  browserifyCipher.createDecipher = browserifyCipher.Decipher = crypto.createDecipher;
  browserifyCipher.createDecipheriv = browserifyCipher.Decipheriv = crypto.createDecipheriv;
  browserifyCipher.listCiphers = browserifyCipher.getCiphers = crypto.getCiphers;
  return browserifyCipher;
}
var diffieHellman = {};
var hasRequiredDiffieHellman;
function requireDiffieHellman() {
  if (hasRequiredDiffieHellman)
    return diffieHellman;
  hasRequiredDiffieHellman = 1;
  var crypto = requireCryptoBrowserify();
  diffieHellman.DiffieHellmanGroup = crypto.DiffieHellmanGroup;
  diffieHellman.createDiffieHellmanGroup = crypto.createDiffieHellmanGroup;
  diffieHellman.getDiffieHellman = crypto.getDiffieHellman;
  diffieHellman.createDiffieHellman = crypto.createDiffieHellman;
  diffieHellman.DiffieHellman = crypto.DiffieHellman;
  return diffieHellman;
}
var browserifySign = {};
var hasRequiredBrowserifySign;
function requireBrowserifySign() {
  if (hasRequiredBrowserifySign)
    return browserifySign;
  hasRequiredBrowserifySign = 1;
  var crypto = requireCryptoBrowserify();
  browserifySign.createSign = crypto.createSign;
  browserifySign.Sign = crypto.Sign;
  browserifySign.createVerify = crypto.createVerify;
  browserifySign.Verify = crypto.Verify;
  return browserifySign;
}
var elliptic = {};
const name = "elliptic";
const version = "6.5.4";
const description = "EC cryptography";
const main = "lib/elliptic.js";
const files = [
  "lib"
];
const scripts = {
  lint: "eslint lib test",
  "lint:fix": "npm run lint -- --fix",
  unit: "istanbul test _mocha --reporter=spec test/index.js",
  test: "npm run lint && npm run unit",
  version: "grunt dist && git add dist/"
};
const repository = {
  type: "git",
  url: "git@github.com:indutny/elliptic"
};
const keywords = [
  "EC",
  "Elliptic",
  "curve",
  "Cryptography"
];
const author = "Fedor Indutny <fedor@indutny.com>";
const license = "MIT";
const bugs = {
  url: "https://github.com/indutny/elliptic/issues"
};
const homepage = "https://github.com/indutny/elliptic";
const devDependencies = {
  brfs: "^2.0.2",
  coveralls: "^3.1.0",
  eslint: "^7.6.0",
  grunt: "^1.2.1",
  "grunt-browserify": "^5.3.0",
  "grunt-cli": "^1.3.2",
  "grunt-contrib-connect": "^3.0.0",
  "grunt-contrib-copy": "^1.0.0",
  "grunt-contrib-uglify": "^5.0.0",
  "grunt-mocha-istanbul": "^5.0.2",
  "grunt-saucelabs": "^9.0.1",
  istanbul: "^0.4.5",
  mocha: "^8.0.1"
};
const dependencies = {
  "bn.js": "^4.11.9",
  brorand: "^1.1.0",
  "hash.js": "^1.0.0",
  "hmac-drbg": "^1.0.1",
  inherits: "^2.0.4",
  "minimalistic-assert": "^1.0.1",
  "minimalistic-crypto-utils": "^1.0.1"
};
const require$$0 = {
  name,
  version,
  description,
  main,
  files,
  scripts,
  repository,
  keywords,
  author,
  license,
  bugs,
  homepage,
  devDependencies,
  dependencies
};
var utils$2 = {};
var bn$1 = { exports: {} };
bn$1.exports;
var hasRequiredBn$1;
function requireBn$1() {
  if (hasRequiredBn$1)
    return bn$1.exports;
  hasRequiredBn$1 = 1;
  (function(module) {
    (function(module2, exports) {
      function assert(val, msg) {
        if (!val)
          throw new Error(msg || "Assertion failed");
      }
      function inherits2(ctor, superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
      function BN(number, base2, endian) {
        if (BN.isBN(number)) {
          return number;
        }
        this.negative = 0;
        this.words = null;
        this.length = 0;
        this.red = null;
        if (number !== null) {
          if (base2 === "le" || base2 === "be") {
            endian = base2;
            base2 = 10;
          }
          this._init(number || 0, base2 || 10, endian || "be");
        }
      }
      if (typeof module2 === "object") {
        module2.exports = BN;
      } else {
        exports.BN = BN;
      }
      BN.BN = BN;
      BN.wordSize = 26;
      var Buffer2;
      try {
        if (typeof window !== "undefined" && typeof window.Buffer !== "undefined") {
          Buffer2 = window.Buffer;
        } else {
          Buffer2 = buffer$1.Buffer;
        }
      } catch (e) {
      }
      BN.isBN = function isBN(num) {
        if (num instanceof BN) {
          return true;
        }
        return num !== null && typeof num === "object" && num.constructor.wordSize === BN.wordSize && Array.isArray(num.words);
      };
      BN.max = function max(left, right) {
        if (left.cmp(right) > 0)
          return left;
        return right;
      };
      BN.min = function min(left, right) {
        if (left.cmp(right) < 0)
          return left;
        return right;
      };
      BN.prototype._init = function init(number, base2, endian) {
        if (typeof number === "number") {
          return this._initNumber(number, base2, endian);
        }
        if (typeof number === "object") {
          return this._initArray(number, base2, endian);
        }
        if (base2 === "hex") {
          base2 = 16;
        }
        assert(base2 === (base2 | 0) && base2 >= 2 && base2 <= 36);
        number = number.toString().replace(/\s+/g, "");
        var start = 0;
        if (number[0] === "-") {
          start++;
          this.negative = 1;
        }
        if (start < number.length) {
          if (base2 === 16) {
            this._parseHex(number, start, endian);
          } else {
            this._parseBase(number, base2, start);
            if (endian === "le") {
              this._initArray(this.toArray(), base2, endian);
            }
          }
        }
      };
      BN.prototype._initNumber = function _initNumber(number, base2, endian) {
        if (number < 0) {
          this.negative = 1;
          number = -number;
        }
        if (number < 67108864) {
          this.words = [number & 67108863];
          this.length = 1;
        } else if (number < 4503599627370496) {
          this.words = [
            number & 67108863,
            number / 67108864 & 67108863
          ];
          this.length = 2;
        } else {
          assert(number < 9007199254740992);
          this.words = [
            number & 67108863,
            number / 67108864 & 67108863,
            1
          ];
          this.length = 3;
        }
        if (endian !== "le")
          return;
        this._initArray(this.toArray(), base2, endian);
      };
      BN.prototype._initArray = function _initArray(number, base2, endian) {
        assert(typeof number.length === "number");
        if (number.length <= 0) {
          this.words = [0];
          this.length = 1;
          return this;
        }
        this.length = Math.ceil(number.length / 3);
        this.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
          this.words[i] = 0;
        }
        var j, w;
        var off = 0;
        if (endian === "be") {
          for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
            w = number[i] | number[i - 1] << 8 | number[i - 2] << 16;
            this.words[j] |= w << off & 67108863;
            this.words[j + 1] = w >>> 26 - off & 67108863;
            off += 24;
            if (off >= 26) {
              off -= 26;
              j++;
            }
          }
        } else if (endian === "le") {
          for (i = 0, j = 0; i < number.length; i += 3) {
            w = number[i] | number[i + 1] << 8 | number[i + 2] << 16;
            this.words[j] |= w << off & 67108863;
            this.words[j + 1] = w >>> 26 - off & 67108863;
            off += 24;
            if (off >= 26) {
              off -= 26;
              j++;
            }
          }
        }
        return this.strip();
      };
      function parseHex4Bits(string, index2) {
        var c = string.charCodeAt(index2);
        if (c >= 65 && c <= 70) {
          return c - 55;
        } else if (c >= 97 && c <= 102) {
          return c - 87;
        } else {
          return c - 48 & 15;
        }
      }
      function parseHexByte(string, lowerBound, index2) {
        var r = parseHex4Bits(string, index2);
        if (index2 - 1 >= lowerBound) {
          r |= parseHex4Bits(string, index2 - 1) << 4;
        }
        return r;
      }
      BN.prototype._parseHex = function _parseHex(number, start, endian) {
        this.length = Math.ceil((number.length - start) / 6);
        this.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
          this.words[i] = 0;
        }
        var off = 0;
        var j = 0;
        var w;
        if (endian === "be") {
          for (i = number.length - 1; i >= start; i -= 2) {
            w = parseHexByte(number, start, i) << off;
            this.words[j] |= w & 67108863;
            if (off >= 18) {
              off -= 18;
              j += 1;
              this.words[j] |= w >>> 26;
            } else {
              off += 8;
            }
          }
        } else {
          var parseLength = number.length - start;
          for (i = parseLength % 2 === 0 ? start + 1 : start; i < number.length; i += 2) {
            w = parseHexByte(number, start, i) << off;
            this.words[j] |= w & 67108863;
            if (off >= 18) {
              off -= 18;
              j += 1;
              this.words[j] |= w >>> 26;
            } else {
              off += 8;
            }
          }
        }
        this.strip();
      };
      function parseBase(str, start, end, mul) {
        var r = 0;
        var len = Math.min(str.length, end);
        for (var i = start; i < len; i++) {
          var c = str.charCodeAt(i) - 48;
          r *= mul;
          if (c >= 49) {
            r += c - 49 + 10;
          } else if (c >= 17) {
            r += c - 17 + 10;
          } else {
            r += c;
          }
        }
        return r;
      }
      BN.prototype._parseBase = function _parseBase(number, base2, start) {
        this.words = [0];
        this.length = 1;
        for (var limbLen = 0, limbPow = 1; limbPow <= 67108863; limbPow *= base2) {
          limbLen++;
        }
        limbLen--;
        limbPow = limbPow / base2 | 0;
        var total = number.length - start;
        var mod = total % limbLen;
        var end = Math.min(total, total - mod) + start;
        var word = 0;
        for (var i = start; i < end; i += limbLen) {
          word = parseBase(number, i, i + limbLen, base2);
          this.imuln(limbPow);
          if (this.words[0] + word < 67108864) {
            this.words[0] += word;
          } else {
            this._iaddn(word);
          }
        }
        if (mod !== 0) {
          var pow = 1;
          word = parseBase(number, i, number.length, base2);
          for (i = 0; i < mod; i++) {
            pow *= base2;
          }
          this.imuln(pow);
          if (this.words[0] + word < 67108864) {
            this.words[0] += word;
          } else {
            this._iaddn(word);
          }
        }
        this.strip();
      };
      BN.prototype.copy = function copy(dest) {
        dest.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
          dest.words[i] = this.words[i];
        }
        dest.length = this.length;
        dest.negative = this.negative;
        dest.red = this.red;
      };
      BN.prototype.clone = function clone() {
        var r = new BN(null);
        this.copy(r);
        return r;
      };
      BN.prototype._expand = function _expand(size) {
        while (this.length < size) {
          this.words[this.length++] = 0;
        }
        return this;
      };
      BN.prototype.strip = function strip() {
        while (this.length > 1 && this.words[this.length - 1] === 0) {
          this.length--;
        }
        return this._normSign();
      };
      BN.prototype._normSign = function _normSign() {
        if (this.length === 1 && this.words[0] === 0) {
          this.negative = 0;
        }
        return this;
      };
      BN.prototype.inspect = function inspect() {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      };
      var zeros = [
        "",
        "0",
        "00",
        "000",
        "0000",
        "00000",
        "000000",
        "0000000",
        "00000000",
        "000000000",
        "0000000000",
        "00000000000",
        "000000000000",
        "0000000000000",
        "00000000000000",
        "000000000000000",
        "0000000000000000",
        "00000000000000000",
        "000000000000000000",
        "0000000000000000000",
        "00000000000000000000",
        "000000000000000000000",
        "0000000000000000000000",
        "00000000000000000000000",
        "000000000000000000000000",
        "0000000000000000000000000"
      ];
      var groupSizes = [
        0,
        0,
        25,
        16,
        12,
        11,
        10,
        9,
        8,
        8,
        7,
        7,
        7,
        7,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5
      ];
      var groupBases = [
        0,
        0,
        33554432,
        43046721,
        16777216,
        48828125,
        60466176,
        40353607,
        16777216,
        43046721,
        1e7,
        19487171,
        35831808,
        62748517,
        7529536,
        11390625,
        16777216,
        24137569,
        34012224,
        47045881,
        64e6,
        4084101,
        5153632,
        6436343,
        7962624,
        9765625,
        11881376,
        14348907,
        17210368,
        20511149,
        243e5,
        28629151,
        33554432,
        39135393,
        45435424,
        52521875,
        60466176
      ];
      BN.prototype.toString = function toString(base2, padding) {
        base2 = base2 || 10;
        padding = padding | 0 || 1;
        var out;
        if (base2 === 16 || base2 === "hex") {
          out = "";
          var off = 0;
          var carry = 0;
          for (var i = 0; i < this.length; i++) {
            var w = this.words[i];
            var word = ((w << off | carry) & 16777215).toString(16);
            carry = w >>> 24 - off & 16777215;
            if (carry !== 0 || i !== this.length - 1) {
              out = zeros[6 - word.length] + word + out;
            } else {
              out = word + out;
            }
            off += 2;
            if (off >= 26) {
              off -= 26;
              i--;
            }
          }
          if (carry !== 0) {
            out = carry.toString(16) + out;
          }
          while (out.length % padding !== 0) {
            out = "0" + out;
          }
          if (this.negative !== 0) {
            out = "-" + out;
          }
          return out;
        }
        if (base2 === (base2 | 0) && base2 >= 2 && base2 <= 36) {
          var groupSize = groupSizes[base2];
          var groupBase = groupBases[base2];
          out = "";
          var c = this.clone();
          c.negative = 0;
          while (!c.isZero()) {
            var r = c.modn(groupBase).toString(base2);
            c = c.idivn(groupBase);
            if (!c.isZero()) {
              out = zeros[groupSize - r.length] + r + out;
            } else {
              out = r + out;
            }
          }
          if (this.isZero()) {
            out = "0" + out;
          }
          while (out.length % padding !== 0) {
            out = "0" + out;
          }
          if (this.negative !== 0) {
            out = "-" + out;
          }
          return out;
        }
        assert(false, "Base should be between 2 and 36");
      };
      BN.prototype.toNumber = function toNumber() {
        var ret = this.words[0];
        if (this.length === 2) {
          ret += this.words[1] * 67108864;
        } else if (this.length === 3 && this.words[2] === 1) {
          ret += 4503599627370496 + this.words[1] * 67108864;
        } else if (this.length > 2) {
          assert(false, "Number can only safely store up to 53 bits");
        }
        return this.negative !== 0 ? -ret : ret;
      };
      BN.prototype.toJSON = function toJSON() {
        return this.toString(16);
      };
      BN.prototype.toBuffer = function toBuffer2(endian, length) {
        assert(typeof Buffer2 !== "undefined");
        return this.toArrayLike(Buffer2, endian, length);
      };
      BN.prototype.toArray = function toArray(endian, length) {
        return this.toArrayLike(Array, endian, length);
      };
      BN.prototype.toArrayLike = function toArrayLike(ArrayType, endian, length) {
        var byteLength = this.byteLength();
        var reqLength = length || Math.max(1, byteLength);
        assert(byteLength <= reqLength, "byte array longer than desired length");
        assert(reqLength > 0, "Requested array length <= 0");
        this.strip();
        var littleEndian = endian === "le";
        var res = new ArrayType(reqLength);
        var b, i;
        var q = this.clone();
        if (!littleEndian) {
          for (i = 0; i < reqLength - byteLength; i++) {
            res[i] = 0;
          }
          for (i = 0; !q.isZero(); i++) {
            b = q.andln(255);
            q.iushrn(8);
            res[reqLength - i - 1] = b;
          }
        } else {
          for (i = 0; !q.isZero(); i++) {
            b = q.andln(255);
            q.iushrn(8);
            res[i] = b;
          }
          for (; i < reqLength; i++) {
            res[i] = 0;
          }
        }
        return res;
      };
      if (Math.clz32) {
        BN.prototype._countBits = function _countBits(w) {
          return 32 - Math.clz32(w);
        };
      } else {
        BN.prototype._countBits = function _countBits(w) {
          var t = w;
          var r = 0;
          if (t >= 4096) {
            r += 13;
            t >>>= 13;
          }
          if (t >= 64) {
            r += 7;
            t >>>= 7;
          }
          if (t >= 8) {
            r += 4;
            t >>>= 4;
          }
          if (t >= 2) {
            r += 2;
            t >>>= 2;
          }
          return r + t;
        };
      }
      BN.prototype._zeroBits = function _zeroBits(w) {
        if (w === 0)
          return 26;
        var t = w;
        var r = 0;
        if ((t & 8191) === 0) {
          r += 13;
          t >>>= 13;
        }
        if ((t & 127) === 0) {
          r += 7;
          t >>>= 7;
        }
        if ((t & 15) === 0) {
          r += 4;
          t >>>= 4;
        }
        if ((t & 3) === 0) {
          r += 2;
          t >>>= 2;
        }
        if ((t & 1) === 0) {
          r++;
        }
        return r;
      };
      BN.prototype.bitLength = function bitLength() {
        var w = this.words[this.length - 1];
        var hi = this._countBits(w);
        return (this.length - 1) * 26 + hi;
      };
      function toBitArray(num) {
        var w = new Array(num.bitLength());
        for (var bit = 0; bit < w.length; bit++) {
          var off = bit / 26 | 0;
          var wbit = bit % 26;
          w[bit] = (num.words[off] & 1 << wbit) >>> wbit;
        }
        return w;
      }
      BN.prototype.zeroBits = function zeroBits() {
        if (this.isZero())
          return 0;
        var r = 0;
        for (var i = 0; i < this.length; i++) {
          var b = this._zeroBits(this.words[i]);
          r += b;
          if (b !== 26)
            break;
        }
        return r;
      };
      BN.prototype.byteLength = function byteLength() {
        return Math.ceil(this.bitLength() / 8);
      };
      BN.prototype.toTwos = function toTwos(width) {
        if (this.negative !== 0) {
          return this.abs().inotn(width).iaddn(1);
        }
        return this.clone();
      };
      BN.prototype.fromTwos = function fromTwos(width) {
        if (this.testn(width - 1)) {
          return this.notn(width).iaddn(1).ineg();
        }
        return this.clone();
      };
      BN.prototype.isNeg = function isNeg() {
        return this.negative !== 0;
      };
      BN.prototype.neg = function neg() {
        return this.clone().ineg();
      };
      BN.prototype.ineg = function ineg() {
        if (!this.isZero()) {
          this.negative ^= 1;
        }
        return this;
      };
      BN.prototype.iuor = function iuor(num) {
        while (this.length < num.length) {
          this.words[this.length++] = 0;
        }
        for (var i = 0; i < num.length; i++) {
          this.words[i] = this.words[i] | num.words[i];
        }
        return this.strip();
      };
      BN.prototype.ior = function ior(num) {
        assert((this.negative | num.negative) === 0);
        return this.iuor(num);
      };
      BN.prototype.or = function or(num) {
        if (this.length > num.length)
          return this.clone().ior(num);
        return num.clone().ior(this);
      };
      BN.prototype.uor = function uor(num) {
        if (this.length > num.length)
          return this.clone().iuor(num);
        return num.clone().iuor(this);
      };
      BN.prototype.iuand = function iuand(num) {
        var b;
        if (this.length > num.length) {
          b = num;
        } else {
          b = this;
        }
        for (var i = 0; i < b.length; i++) {
          this.words[i] = this.words[i] & num.words[i];
        }
        this.length = b.length;
        return this.strip();
      };
      BN.prototype.iand = function iand(num) {
        assert((this.negative | num.negative) === 0);
        return this.iuand(num);
      };
      BN.prototype.and = function and(num) {
        if (this.length > num.length)
          return this.clone().iand(num);
        return num.clone().iand(this);
      };
      BN.prototype.uand = function uand(num) {
        if (this.length > num.length)
          return this.clone().iuand(num);
        return num.clone().iuand(this);
      };
      BN.prototype.iuxor = function iuxor(num) {
        var a;
        var b;
        if (this.length > num.length) {
          a = this;
          b = num;
        } else {
          a = num;
          b = this;
        }
        for (var i = 0; i < b.length; i++) {
          this.words[i] = a.words[i] ^ b.words[i];
        }
        if (this !== a) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i];
          }
        }
        this.length = a.length;
        return this.strip();
      };
      BN.prototype.ixor = function ixor(num) {
        assert((this.negative | num.negative) === 0);
        return this.iuxor(num);
      };
      BN.prototype.xor = function xor2(num) {
        if (this.length > num.length)
          return this.clone().ixor(num);
        return num.clone().ixor(this);
      };
      BN.prototype.uxor = function uxor(num) {
        if (this.length > num.length)
          return this.clone().iuxor(num);
        return num.clone().iuxor(this);
      };
      BN.prototype.inotn = function inotn(width) {
        assert(typeof width === "number" && width >= 0);
        var bytesNeeded = Math.ceil(width / 26) | 0;
        var bitsLeft = width % 26;
        this._expand(bytesNeeded);
        if (bitsLeft > 0) {
          bytesNeeded--;
        }
        for (var i = 0; i < bytesNeeded; i++) {
          this.words[i] = ~this.words[i] & 67108863;
        }
        if (bitsLeft > 0) {
          this.words[i] = ~this.words[i] & 67108863 >> 26 - bitsLeft;
        }
        return this.strip();
      };
      BN.prototype.notn = function notn(width) {
        return this.clone().inotn(width);
      };
      BN.prototype.setn = function setn(bit, val) {
        assert(typeof bit === "number" && bit >= 0);
        var off = bit / 26 | 0;
        var wbit = bit % 26;
        this._expand(off + 1);
        if (val) {
          this.words[off] = this.words[off] | 1 << wbit;
        } else {
          this.words[off] = this.words[off] & ~(1 << wbit);
        }
        return this.strip();
      };
      BN.prototype.iadd = function iadd(num) {
        var r;
        if (this.negative !== 0 && num.negative === 0) {
          this.negative = 0;
          r = this.isub(num);
          this.negative ^= 1;
          return this._normSign();
        } else if (this.negative === 0 && num.negative !== 0) {
          num.negative = 0;
          r = this.isub(num);
          num.negative = 1;
          return r._normSign();
        }
        var a, b;
        if (this.length > num.length) {
          a = this;
          b = num;
        } else {
          a = num;
          b = this;
        }
        var carry = 0;
        for (var i = 0; i < b.length; i++) {
          r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
          this.words[i] = r & 67108863;
          carry = r >>> 26;
        }
        for (; carry !== 0 && i < a.length; i++) {
          r = (a.words[i] | 0) + carry;
          this.words[i] = r & 67108863;
          carry = r >>> 26;
        }
        this.length = a.length;
        if (carry !== 0) {
          this.words[this.length] = carry;
          this.length++;
        } else if (a !== this) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i];
          }
        }
        return this;
      };
      BN.prototype.add = function add(num) {
        var res;
        if (num.negative !== 0 && this.negative === 0) {
          num.negative = 0;
          res = this.sub(num);
          num.negative ^= 1;
          return res;
        } else if (num.negative === 0 && this.negative !== 0) {
          this.negative = 0;
          res = num.sub(this);
          this.negative = 1;
          return res;
        }
        if (this.length > num.length)
          return this.clone().iadd(num);
        return num.clone().iadd(this);
      };
      BN.prototype.isub = function isub(num) {
        if (num.negative !== 0) {
          num.negative = 0;
          var r = this.iadd(num);
          num.negative = 1;
          return r._normSign();
        } else if (this.negative !== 0) {
          this.negative = 0;
          this.iadd(num);
          this.negative = 1;
          return this._normSign();
        }
        var cmp = this.cmp(num);
        if (cmp === 0) {
          this.negative = 0;
          this.length = 1;
          this.words[0] = 0;
          return this;
        }
        var a, b;
        if (cmp > 0) {
          a = this;
          b = num;
        } else {
          a = num;
          b = this;
        }
        var carry = 0;
        for (var i = 0; i < b.length; i++) {
          r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
          carry = r >> 26;
          this.words[i] = r & 67108863;
        }
        for (; carry !== 0 && i < a.length; i++) {
          r = (a.words[i] | 0) + carry;
          carry = r >> 26;
          this.words[i] = r & 67108863;
        }
        if (carry === 0 && i < a.length && a !== this) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i];
          }
        }
        this.length = Math.max(this.length, i);
        if (a !== this) {
          this.negative = 1;
        }
        return this.strip();
      };
      BN.prototype.sub = function sub(num) {
        return this.clone().isub(num);
      };
      function smallMulTo(self2, num, out) {
        out.negative = num.negative ^ self2.negative;
        var len = self2.length + num.length | 0;
        out.length = len;
        len = len - 1 | 0;
        var a = self2.words[0] | 0;
        var b = num.words[0] | 0;
        var r = a * b;
        var lo = r & 67108863;
        var carry = r / 67108864 | 0;
        out.words[0] = lo;
        for (var k = 1; k < len; k++) {
          var ncarry = carry >>> 26;
          var rword = carry & 67108863;
          var maxJ = Math.min(k, num.length - 1);
          for (var j = Math.max(0, k - self2.length + 1); j <= maxJ; j++) {
            var i = k - j | 0;
            a = self2.words[i] | 0;
            b = num.words[j] | 0;
            r = a * b + rword;
            ncarry += r / 67108864 | 0;
            rword = r & 67108863;
          }
          out.words[k] = rword | 0;
          carry = ncarry | 0;
        }
        if (carry !== 0) {
          out.words[k] = carry | 0;
        } else {
          out.length--;
        }
        return out.strip();
      }
      var comb10MulTo = function comb10MulTo2(self2, num, out) {
        var a = self2.words;
        var b = num.words;
        var o = out.words;
        var c = 0;
        var lo;
        var mid;
        var hi;
        var a0 = a[0] | 0;
        var al0 = a0 & 8191;
        var ah0 = a0 >>> 13;
        var a1 = a[1] | 0;
        var al1 = a1 & 8191;
        var ah1 = a1 >>> 13;
        var a2 = a[2] | 0;
        var al2 = a2 & 8191;
        var ah2 = a2 >>> 13;
        var a3 = a[3] | 0;
        var al3 = a3 & 8191;
        var ah3 = a3 >>> 13;
        var a4 = a[4] | 0;
        var al4 = a4 & 8191;
        var ah4 = a4 >>> 13;
        var a5 = a[5] | 0;
        var al5 = a5 & 8191;
        var ah5 = a5 >>> 13;
        var a6 = a[6] | 0;
        var al6 = a6 & 8191;
        var ah6 = a6 >>> 13;
        var a7 = a[7] | 0;
        var al7 = a7 & 8191;
        var ah7 = a7 >>> 13;
        var a8 = a[8] | 0;
        var al8 = a8 & 8191;
        var ah8 = a8 >>> 13;
        var a9 = a[9] | 0;
        var al9 = a9 & 8191;
        var ah9 = a9 >>> 13;
        var b0 = b[0] | 0;
        var bl0 = b0 & 8191;
        var bh0 = b0 >>> 13;
        var b1 = b[1] | 0;
        var bl1 = b1 & 8191;
        var bh1 = b1 >>> 13;
        var b2 = b[2] | 0;
        var bl2 = b2 & 8191;
        var bh2 = b2 >>> 13;
        var b3 = b[3] | 0;
        var bl3 = b3 & 8191;
        var bh3 = b3 >>> 13;
        var b4 = b[4] | 0;
        var bl4 = b4 & 8191;
        var bh4 = b4 >>> 13;
        var b5 = b[5] | 0;
        var bl5 = b5 & 8191;
        var bh5 = b5 >>> 13;
        var b6 = b[6] | 0;
        var bl6 = b6 & 8191;
        var bh6 = b6 >>> 13;
        var b7 = b[7] | 0;
        var bl7 = b7 & 8191;
        var bh7 = b7 >>> 13;
        var b8 = b[8] | 0;
        var bl8 = b8 & 8191;
        var bh8 = b8 >>> 13;
        var b9 = b[9] | 0;
        var bl9 = b9 & 8191;
        var bh9 = b9 >>> 13;
        out.negative = self2.negative ^ num.negative;
        out.length = 19;
        lo = Math.imul(al0, bl0);
        mid = Math.imul(al0, bh0);
        mid = mid + Math.imul(ah0, bl0) | 0;
        hi = Math.imul(ah0, bh0);
        var w0 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w0 >>> 26) | 0;
        w0 &= 67108863;
        lo = Math.imul(al1, bl0);
        mid = Math.imul(al1, bh0);
        mid = mid + Math.imul(ah1, bl0) | 0;
        hi = Math.imul(ah1, bh0);
        lo = lo + Math.imul(al0, bl1) | 0;
        mid = mid + Math.imul(al0, bh1) | 0;
        mid = mid + Math.imul(ah0, bl1) | 0;
        hi = hi + Math.imul(ah0, bh1) | 0;
        var w1 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w1 >>> 26) | 0;
        w1 &= 67108863;
        lo = Math.imul(al2, bl0);
        mid = Math.imul(al2, bh0);
        mid = mid + Math.imul(ah2, bl0) | 0;
        hi = Math.imul(ah2, bh0);
        lo = lo + Math.imul(al1, bl1) | 0;
        mid = mid + Math.imul(al1, bh1) | 0;
        mid = mid + Math.imul(ah1, bl1) | 0;
        hi = hi + Math.imul(ah1, bh1) | 0;
        lo = lo + Math.imul(al0, bl2) | 0;
        mid = mid + Math.imul(al0, bh2) | 0;
        mid = mid + Math.imul(ah0, bl2) | 0;
        hi = hi + Math.imul(ah0, bh2) | 0;
        var w2 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w2 >>> 26) | 0;
        w2 &= 67108863;
        lo = Math.imul(al3, bl0);
        mid = Math.imul(al3, bh0);
        mid = mid + Math.imul(ah3, bl0) | 0;
        hi = Math.imul(ah3, bh0);
        lo = lo + Math.imul(al2, bl1) | 0;
        mid = mid + Math.imul(al2, bh1) | 0;
        mid = mid + Math.imul(ah2, bl1) | 0;
        hi = hi + Math.imul(ah2, bh1) | 0;
        lo = lo + Math.imul(al1, bl2) | 0;
        mid = mid + Math.imul(al1, bh2) | 0;
        mid = mid + Math.imul(ah1, bl2) | 0;
        hi = hi + Math.imul(ah1, bh2) | 0;
        lo = lo + Math.imul(al0, bl3) | 0;
        mid = mid + Math.imul(al0, bh3) | 0;
        mid = mid + Math.imul(ah0, bl3) | 0;
        hi = hi + Math.imul(ah0, bh3) | 0;
        var w3 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w3 >>> 26) | 0;
        w3 &= 67108863;
        lo = Math.imul(al4, bl0);
        mid = Math.imul(al4, bh0);
        mid = mid + Math.imul(ah4, bl0) | 0;
        hi = Math.imul(ah4, bh0);
        lo = lo + Math.imul(al3, bl1) | 0;
        mid = mid + Math.imul(al3, bh1) | 0;
        mid = mid + Math.imul(ah3, bl1) | 0;
        hi = hi + Math.imul(ah3, bh1) | 0;
        lo = lo + Math.imul(al2, bl2) | 0;
        mid = mid + Math.imul(al2, bh2) | 0;
        mid = mid + Math.imul(ah2, bl2) | 0;
        hi = hi + Math.imul(ah2, bh2) | 0;
        lo = lo + Math.imul(al1, bl3) | 0;
        mid = mid + Math.imul(al1, bh3) | 0;
        mid = mid + Math.imul(ah1, bl3) | 0;
        hi = hi + Math.imul(ah1, bh3) | 0;
        lo = lo + Math.imul(al0, bl4) | 0;
        mid = mid + Math.imul(al0, bh4) | 0;
        mid = mid + Math.imul(ah0, bl4) | 0;
        hi = hi + Math.imul(ah0, bh4) | 0;
        var w4 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w4 >>> 26) | 0;
        w4 &= 67108863;
        lo = Math.imul(al5, bl0);
        mid = Math.imul(al5, bh0);
        mid = mid + Math.imul(ah5, bl0) | 0;
        hi = Math.imul(ah5, bh0);
        lo = lo + Math.imul(al4, bl1) | 0;
        mid = mid + Math.imul(al4, bh1) | 0;
        mid = mid + Math.imul(ah4, bl1) | 0;
        hi = hi + Math.imul(ah4, bh1) | 0;
        lo = lo + Math.imul(al3, bl2) | 0;
        mid = mid + Math.imul(al3, bh2) | 0;
        mid = mid + Math.imul(ah3, bl2) | 0;
        hi = hi + Math.imul(ah3, bh2) | 0;
        lo = lo + Math.imul(al2, bl3) | 0;
        mid = mid + Math.imul(al2, bh3) | 0;
        mid = mid + Math.imul(ah2, bl3) | 0;
        hi = hi + Math.imul(ah2, bh3) | 0;
        lo = lo + Math.imul(al1, bl4) | 0;
        mid = mid + Math.imul(al1, bh4) | 0;
        mid = mid + Math.imul(ah1, bl4) | 0;
        hi = hi + Math.imul(ah1, bh4) | 0;
        lo = lo + Math.imul(al0, bl5) | 0;
        mid = mid + Math.imul(al0, bh5) | 0;
        mid = mid + Math.imul(ah0, bl5) | 0;
        hi = hi + Math.imul(ah0, bh5) | 0;
        var w5 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w5 >>> 26) | 0;
        w5 &= 67108863;
        lo = Math.imul(al6, bl0);
        mid = Math.imul(al6, bh0);
        mid = mid + Math.imul(ah6, bl0) | 0;
        hi = Math.imul(ah6, bh0);
        lo = lo + Math.imul(al5, bl1) | 0;
        mid = mid + Math.imul(al5, bh1) | 0;
        mid = mid + Math.imul(ah5, bl1) | 0;
        hi = hi + Math.imul(ah5, bh1) | 0;
        lo = lo + Math.imul(al4, bl2) | 0;
        mid = mid + Math.imul(al4, bh2) | 0;
        mid = mid + Math.imul(ah4, bl2) | 0;
        hi = hi + Math.imul(ah4, bh2) | 0;
        lo = lo + Math.imul(al3, bl3) | 0;
        mid = mid + Math.imul(al3, bh3) | 0;
        mid = mid + Math.imul(ah3, bl3) | 0;
        hi = hi + Math.imul(ah3, bh3) | 0;
        lo = lo + Math.imul(al2, bl4) | 0;
        mid = mid + Math.imul(al2, bh4) | 0;
        mid = mid + Math.imul(ah2, bl4) | 0;
        hi = hi + Math.imul(ah2, bh4) | 0;
        lo = lo + Math.imul(al1, bl5) | 0;
        mid = mid + Math.imul(al1, bh5) | 0;
        mid = mid + Math.imul(ah1, bl5) | 0;
        hi = hi + Math.imul(ah1, bh5) | 0;
        lo = lo + Math.imul(al0, bl6) | 0;
        mid = mid + Math.imul(al0, bh6) | 0;
        mid = mid + Math.imul(ah0, bl6) | 0;
        hi = hi + Math.imul(ah0, bh6) | 0;
        var w6 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w6 >>> 26) | 0;
        w6 &= 67108863;
        lo = Math.imul(al7, bl0);
        mid = Math.imul(al7, bh0);
        mid = mid + Math.imul(ah7, bl0) | 0;
        hi = Math.imul(ah7, bh0);
        lo = lo + Math.imul(al6, bl1) | 0;
        mid = mid + Math.imul(al6, bh1) | 0;
        mid = mid + Math.imul(ah6, bl1) | 0;
        hi = hi + Math.imul(ah6, bh1) | 0;
        lo = lo + Math.imul(al5, bl2) | 0;
        mid = mid + Math.imul(al5, bh2) | 0;
        mid = mid + Math.imul(ah5, bl2) | 0;
        hi = hi + Math.imul(ah5, bh2) | 0;
        lo = lo + Math.imul(al4, bl3) | 0;
        mid = mid + Math.imul(al4, bh3) | 0;
        mid = mid + Math.imul(ah4, bl3) | 0;
        hi = hi + Math.imul(ah4, bh3) | 0;
        lo = lo + Math.imul(al3, bl4) | 0;
        mid = mid + Math.imul(al3, bh4) | 0;
        mid = mid + Math.imul(ah3, bl4) | 0;
        hi = hi + Math.imul(ah3, bh4) | 0;
        lo = lo + Math.imul(al2, bl5) | 0;
        mid = mid + Math.imul(al2, bh5) | 0;
        mid = mid + Math.imul(ah2, bl5) | 0;
        hi = hi + Math.imul(ah2, bh5) | 0;
        lo = lo + Math.imul(al1, bl6) | 0;
        mid = mid + Math.imul(al1, bh6) | 0;
        mid = mid + Math.imul(ah1, bl6) | 0;
        hi = hi + Math.imul(ah1, bh6) | 0;
        lo = lo + Math.imul(al0, bl7) | 0;
        mid = mid + Math.imul(al0, bh7) | 0;
        mid = mid + Math.imul(ah0, bl7) | 0;
        hi = hi + Math.imul(ah0, bh7) | 0;
        var w7 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w7 >>> 26) | 0;
        w7 &= 67108863;
        lo = Math.imul(al8, bl0);
        mid = Math.imul(al8, bh0);
        mid = mid + Math.imul(ah8, bl0) | 0;
        hi = Math.imul(ah8, bh0);
        lo = lo + Math.imul(al7, bl1) | 0;
        mid = mid + Math.imul(al7, bh1) | 0;
        mid = mid + Math.imul(ah7, bl1) | 0;
        hi = hi + Math.imul(ah7, bh1) | 0;
        lo = lo + Math.imul(al6, bl2) | 0;
        mid = mid + Math.imul(al6, bh2) | 0;
        mid = mid + Math.imul(ah6, bl2) | 0;
        hi = hi + Math.imul(ah6, bh2) | 0;
        lo = lo + Math.imul(al5, bl3) | 0;
        mid = mid + Math.imul(al5, bh3) | 0;
        mid = mid + Math.imul(ah5, bl3) | 0;
        hi = hi + Math.imul(ah5, bh3) | 0;
        lo = lo + Math.imul(al4, bl4) | 0;
        mid = mid + Math.imul(al4, bh4) | 0;
        mid = mid + Math.imul(ah4, bl4) | 0;
        hi = hi + Math.imul(ah4, bh4) | 0;
        lo = lo + Math.imul(al3, bl5) | 0;
        mid = mid + Math.imul(al3, bh5) | 0;
        mid = mid + Math.imul(ah3, bl5) | 0;
        hi = hi + Math.imul(ah3, bh5) | 0;
        lo = lo + Math.imul(al2, bl6) | 0;
        mid = mid + Math.imul(al2, bh6) | 0;
        mid = mid + Math.imul(ah2, bl6) | 0;
        hi = hi + Math.imul(ah2, bh6) | 0;
        lo = lo + Math.imul(al1, bl7) | 0;
        mid = mid + Math.imul(al1, bh7) | 0;
        mid = mid + Math.imul(ah1, bl7) | 0;
        hi = hi + Math.imul(ah1, bh7) | 0;
        lo = lo + Math.imul(al0, bl8) | 0;
        mid = mid + Math.imul(al0, bh8) | 0;
        mid = mid + Math.imul(ah0, bl8) | 0;
        hi = hi + Math.imul(ah0, bh8) | 0;
        var w8 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w8 >>> 26) | 0;
        w8 &= 67108863;
        lo = Math.imul(al9, bl0);
        mid = Math.imul(al9, bh0);
        mid = mid + Math.imul(ah9, bl0) | 0;
        hi = Math.imul(ah9, bh0);
        lo = lo + Math.imul(al8, bl1) | 0;
        mid = mid + Math.imul(al8, bh1) | 0;
        mid = mid + Math.imul(ah8, bl1) | 0;
        hi = hi + Math.imul(ah8, bh1) | 0;
        lo = lo + Math.imul(al7, bl2) | 0;
        mid = mid + Math.imul(al7, bh2) | 0;
        mid = mid + Math.imul(ah7, bl2) | 0;
        hi = hi + Math.imul(ah7, bh2) | 0;
        lo = lo + Math.imul(al6, bl3) | 0;
        mid = mid + Math.imul(al6, bh3) | 0;
        mid = mid + Math.imul(ah6, bl3) | 0;
        hi = hi + Math.imul(ah6, bh3) | 0;
        lo = lo + Math.imul(al5, bl4) | 0;
        mid = mid + Math.imul(al5, bh4) | 0;
        mid = mid + Math.imul(ah5, bl4) | 0;
        hi = hi + Math.imul(ah5, bh4) | 0;
        lo = lo + Math.imul(al4, bl5) | 0;
        mid = mid + Math.imul(al4, bh5) | 0;
        mid = mid + Math.imul(ah4, bl5) | 0;
        hi = hi + Math.imul(ah4, bh5) | 0;
        lo = lo + Math.imul(al3, bl6) | 0;
        mid = mid + Math.imul(al3, bh6) | 0;
        mid = mid + Math.imul(ah3, bl6) | 0;
        hi = hi + Math.imul(ah3, bh6) | 0;
        lo = lo + Math.imul(al2, bl7) | 0;
        mid = mid + Math.imul(al2, bh7) | 0;
        mid = mid + Math.imul(ah2, bl7) | 0;
        hi = hi + Math.imul(ah2, bh7) | 0;
        lo = lo + Math.imul(al1, bl8) | 0;
        mid = mid + Math.imul(al1, bh8) | 0;
        mid = mid + Math.imul(ah1, bl8) | 0;
        hi = hi + Math.imul(ah1, bh8) | 0;
        lo = lo + Math.imul(al0, bl9) | 0;
        mid = mid + Math.imul(al0, bh9) | 0;
        mid = mid + Math.imul(ah0, bl9) | 0;
        hi = hi + Math.imul(ah0, bh9) | 0;
        var w9 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w9 >>> 26) | 0;
        w9 &= 67108863;
        lo = Math.imul(al9, bl1);
        mid = Math.imul(al9, bh1);
        mid = mid + Math.imul(ah9, bl1) | 0;
        hi = Math.imul(ah9, bh1);
        lo = lo + Math.imul(al8, bl2) | 0;
        mid = mid + Math.imul(al8, bh2) | 0;
        mid = mid + Math.imul(ah8, bl2) | 0;
        hi = hi + Math.imul(ah8, bh2) | 0;
        lo = lo + Math.imul(al7, bl3) | 0;
        mid = mid + Math.imul(al7, bh3) | 0;
        mid = mid + Math.imul(ah7, bl3) | 0;
        hi = hi + Math.imul(ah7, bh3) | 0;
        lo = lo + Math.imul(al6, bl4) | 0;
        mid = mid + Math.imul(al6, bh4) | 0;
        mid = mid + Math.imul(ah6, bl4) | 0;
        hi = hi + Math.imul(ah6, bh4) | 0;
        lo = lo + Math.imul(al5, bl5) | 0;
        mid = mid + Math.imul(al5, bh5) | 0;
        mid = mid + Math.imul(ah5, bl5) | 0;
        hi = hi + Math.imul(ah5, bh5) | 0;
        lo = lo + Math.imul(al4, bl6) | 0;
        mid = mid + Math.imul(al4, bh6) | 0;
        mid = mid + Math.imul(ah4, bl6) | 0;
        hi = hi + Math.imul(ah4, bh6) | 0;
        lo = lo + Math.imul(al3, bl7) | 0;
        mid = mid + Math.imul(al3, bh7) | 0;
        mid = mid + Math.imul(ah3, bl7) | 0;
        hi = hi + Math.imul(ah3, bh7) | 0;
        lo = lo + Math.imul(al2, bl8) | 0;
        mid = mid + Math.imul(al2, bh8) | 0;
        mid = mid + Math.imul(ah2, bl8) | 0;
        hi = hi + Math.imul(ah2, bh8) | 0;
        lo = lo + Math.imul(al1, bl9) | 0;
        mid = mid + Math.imul(al1, bh9) | 0;
        mid = mid + Math.imul(ah1, bl9) | 0;
        hi = hi + Math.imul(ah1, bh9) | 0;
        var w10 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w10 >>> 26) | 0;
        w10 &= 67108863;
        lo = Math.imul(al9, bl2);
        mid = Math.imul(al9, bh2);
        mid = mid + Math.imul(ah9, bl2) | 0;
        hi = Math.imul(ah9, bh2);
        lo = lo + Math.imul(al8, bl3) | 0;
        mid = mid + Math.imul(al8, bh3) | 0;
        mid = mid + Math.imul(ah8, bl3) | 0;
        hi = hi + Math.imul(ah8, bh3) | 0;
        lo = lo + Math.imul(al7, bl4) | 0;
        mid = mid + Math.imul(al7, bh4) | 0;
        mid = mid + Math.imul(ah7, bl4) | 0;
        hi = hi + Math.imul(ah7, bh4) | 0;
        lo = lo + Math.imul(al6, bl5) | 0;
        mid = mid + Math.imul(al6, bh5) | 0;
        mid = mid + Math.imul(ah6, bl5) | 0;
        hi = hi + Math.imul(ah6, bh5) | 0;
        lo = lo + Math.imul(al5, bl6) | 0;
        mid = mid + Math.imul(al5, bh6) | 0;
        mid = mid + Math.imul(ah5, bl6) | 0;
        hi = hi + Math.imul(ah5, bh6) | 0;
        lo = lo + Math.imul(al4, bl7) | 0;
        mid = mid + Math.imul(al4, bh7) | 0;
        mid = mid + Math.imul(ah4, bl7) | 0;
        hi = hi + Math.imul(ah4, bh7) | 0;
        lo = lo + Math.imul(al3, bl8) | 0;
        mid = mid + Math.imul(al3, bh8) | 0;
        mid = mid + Math.imul(ah3, bl8) | 0;
        hi = hi + Math.imul(ah3, bh8) | 0;
        lo = lo + Math.imul(al2, bl9) | 0;
        mid = mid + Math.imul(al2, bh9) | 0;
        mid = mid + Math.imul(ah2, bl9) | 0;
        hi = hi + Math.imul(ah2, bh9) | 0;
        var w11 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w11 >>> 26) | 0;
        w11 &= 67108863;
        lo = Math.imul(al9, bl3);
        mid = Math.imul(al9, bh3);
        mid = mid + Math.imul(ah9, bl3) | 0;
        hi = Math.imul(ah9, bh3);
        lo = lo + Math.imul(al8, bl4) | 0;
        mid = mid + Math.imul(al8, bh4) | 0;
        mid = mid + Math.imul(ah8, bl4) | 0;
        hi = hi + Math.imul(ah8, bh4) | 0;
        lo = lo + Math.imul(al7, bl5) | 0;
        mid = mid + Math.imul(al7, bh5) | 0;
        mid = mid + Math.imul(ah7, bl5) | 0;
        hi = hi + Math.imul(ah7, bh5) | 0;
        lo = lo + Math.imul(al6, bl6) | 0;
        mid = mid + Math.imul(al6, bh6) | 0;
        mid = mid + Math.imul(ah6, bl6) | 0;
        hi = hi + Math.imul(ah6, bh6) | 0;
        lo = lo + Math.imul(al5, bl7) | 0;
        mid = mid + Math.imul(al5, bh7) | 0;
        mid = mid + Math.imul(ah5, bl7) | 0;
        hi = hi + Math.imul(ah5, bh7) | 0;
        lo = lo + Math.imul(al4, bl8) | 0;
        mid = mid + Math.imul(al4, bh8) | 0;
        mid = mid + Math.imul(ah4, bl8) | 0;
        hi = hi + Math.imul(ah4, bh8) | 0;
        lo = lo + Math.imul(al3, bl9) | 0;
        mid = mid + Math.imul(al3, bh9) | 0;
        mid = mid + Math.imul(ah3, bl9) | 0;
        hi = hi + Math.imul(ah3, bh9) | 0;
        var w12 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w12 >>> 26) | 0;
        w12 &= 67108863;
        lo = Math.imul(al9, bl4);
        mid = Math.imul(al9, bh4);
        mid = mid + Math.imul(ah9, bl4) | 0;
        hi = Math.imul(ah9, bh4);
        lo = lo + Math.imul(al8, bl5) | 0;
        mid = mid + Math.imul(al8, bh5) | 0;
        mid = mid + Math.imul(ah8, bl5) | 0;
        hi = hi + Math.imul(ah8, bh5) | 0;
        lo = lo + Math.imul(al7, bl6) | 0;
        mid = mid + Math.imul(al7, bh6) | 0;
        mid = mid + Math.imul(ah7, bl6) | 0;
        hi = hi + Math.imul(ah7, bh6) | 0;
        lo = lo + Math.imul(al6, bl7) | 0;
        mid = mid + Math.imul(al6, bh7) | 0;
        mid = mid + Math.imul(ah6, bl7) | 0;
        hi = hi + Math.imul(ah6, bh7) | 0;
        lo = lo + Math.imul(al5, bl8) | 0;
        mid = mid + Math.imul(al5, bh8) | 0;
        mid = mid + Math.imul(ah5, bl8) | 0;
        hi = hi + Math.imul(ah5, bh8) | 0;
        lo = lo + Math.imul(al4, bl9) | 0;
        mid = mid + Math.imul(al4, bh9) | 0;
        mid = mid + Math.imul(ah4, bl9) | 0;
        hi = hi + Math.imul(ah4, bh9) | 0;
        var w13 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w13 >>> 26) | 0;
        w13 &= 67108863;
        lo = Math.imul(al9, bl5);
        mid = Math.imul(al9, bh5);
        mid = mid + Math.imul(ah9, bl5) | 0;
        hi = Math.imul(ah9, bh5);
        lo = lo + Math.imul(al8, bl6) | 0;
        mid = mid + Math.imul(al8, bh6) | 0;
        mid = mid + Math.imul(ah8, bl6) | 0;
        hi = hi + Math.imul(ah8, bh6) | 0;
        lo = lo + Math.imul(al7, bl7) | 0;
        mid = mid + Math.imul(al7, bh7) | 0;
        mid = mid + Math.imul(ah7, bl7) | 0;
        hi = hi + Math.imul(ah7, bh7) | 0;
        lo = lo + Math.imul(al6, bl8) | 0;
        mid = mid + Math.imul(al6, bh8) | 0;
        mid = mid + Math.imul(ah6, bl8) | 0;
        hi = hi + Math.imul(ah6, bh8) | 0;
        lo = lo + Math.imul(al5, bl9) | 0;
        mid = mid + Math.imul(al5, bh9) | 0;
        mid = mid + Math.imul(ah5, bl9) | 0;
        hi = hi + Math.imul(ah5, bh9) | 0;
        var w14 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w14 >>> 26) | 0;
        w14 &= 67108863;
        lo = Math.imul(al9, bl6);
        mid = Math.imul(al9, bh6);
        mid = mid + Math.imul(ah9, bl6) | 0;
        hi = Math.imul(ah9, bh6);
        lo = lo + Math.imul(al8, bl7) | 0;
        mid = mid + Math.imul(al8, bh7) | 0;
        mid = mid + Math.imul(ah8, bl7) | 0;
        hi = hi + Math.imul(ah8, bh7) | 0;
        lo = lo + Math.imul(al7, bl8) | 0;
        mid = mid + Math.imul(al7, bh8) | 0;
        mid = mid + Math.imul(ah7, bl8) | 0;
        hi = hi + Math.imul(ah7, bh8) | 0;
        lo = lo + Math.imul(al6, bl9) | 0;
        mid = mid + Math.imul(al6, bh9) | 0;
        mid = mid + Math.imul(ah6, bl9) | 0;
        hi = hi + Math.imul(ah6, bh9) | 0;
        var w15 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w15 >>> 26) | 0;
        w15 &= 67108863;
        lo = Math.imul(al9, bl7);
        mid = Math.imul(al9, bh7);
        mid = mid + Math.imul(ah9, bl7) | 0;
        hi = Math.imul(ah9, bh7);
        lo = lo + Math.imul(al8, bl8) | 0;
        mid = mid + Math.imul(al8, bh8) | 0;
        mid = mid + Math.imul(ah8, bl8) | 0;
        hi = hi + Math.imul(ah8, bh8) | 0;
        lo = lo + Math.imul(al7, bl9) | 0;
        mid = mid + Math.imul(al7, bh9) | 0;
        mid = mid + Math.imul(ah7, bl9) | 0;
        hi = hi + Math.imul(ah7, bh9) | 0;
        var w16 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w16 >>> 26) | 0;
        w16 &= 67108863;
        lo = Math.imul(al9, bl8);
        mid = Math.imul(al9, bh8);
        mid = mid + Math.imul(ah9, bl8) | 0;
        hi = Math.imul(ah9, bh8);
        lo = lo + Math.imul(al8, bl9) | 0;
        mid = mid + Math.imul(al8, bh9) | 0;
        mid = mid + Math.imul(ah8, bl9) | 0;
        hi = hi + Math.imul(ah8, bh9) | 0;
        var w17 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w17 >>> 26) | 0;
        w17 &= 67108863;
        lo = Math.imul(al9, bl9);
        mid = Math.imul(al9, bh9);
        mid = mid + Math.imul(ah9, bl9) | 0;
        hi = Math.imul(ah9, bh9);
        var w18 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w18 >>> 26) | 0;
        w18 &= 67108863;
        o[0] = w0;
        o[1] = w1;
        o[2] = w2;
        o[3] = w3;
        o[4] = w4;
        o[5] = w5;
        o[6] = w6;
        o[7] = w7;
        o[8] = w8;
        o[9] = w9;
        o[10] = w10;
        o[11] = w11;
        o[12] = w12;
        o[13] = w13;
        o[14] = w14;
        o[15] = w15;
        o[16] = w16;
        o[17] = w17;
        o[18] = w18;
        if (c !== 0) {
          o[19] = c;
          out.length++;
        }
        return out;
      };
      if (!Math.imul) {
        comb10MulTo = smallMulTo;
      }
      function bigMulTo(self2, num, out) {
        out.negative = num.negative ^ self2.negative;
        out.length = self2.length + num.length;
        var carry = 0;
        var hncarry = 0;
        for (var k = 0; k < out.length - 1; k++) {
          var ncarry = hncarry;
          hncarry = 0;
          var rword = carry & 67108863;
          var maxJ = Math.min(k, num.length - 1);
          for (var j = Math.max(0, k - self2.length + 1); j <= maxJ; j++) {
            var i = k - j;
            var a = self2.words[i] | 0;
            var b = num.words[j] | 0;
            var r = a * b;
            var lo = r & 67108863;
            ncarry = ncarry + (r / 67108864 | 0) | 0;
            lo = lo + rword | 0;
            rword = lo & 67108863;
            ncarry = ncarry + (lo >>> 26) | 0;
            hncarry += ncarry >>> 26;
            ncarry &= 67108863;
          }
          out.words[k] = rword;
          carry = ncarry;
          ncarry = hncarry;
        }
        if (carry !== 0) {
          out.words[k] = carry;
        } else {
          out.length--;
        }
        return out.strip();
      }
      function jumboMulTo(self2, num, out) {
        var fftm = new FFTM();
        return fftm.mulp(self2, num, out);
      }
      BN.prototype.mulTo = function mulTo(num, out) {
        var res;
        var len = this.length + num.length;
        if (this.length === 10 && num.length === 10) {
          res = comb10MulTo(this, num, out);
        } else if (len < 63) {
          res = smallMulTo(this, num, out);
        } else if (len < 1024) {
          res = bigMulTo(this, num, out);
        } else {
          res = jumboMulTo(this, num, out);
        }
        return res;
      };
      function FFTM(x, y) {
        this.x = x;
        this.y = y;
      }
      FFTM.prototype.makeRBT = function makeRBT(N) {
        var t = new Array(N);
        var l = BN.prototype._countBits(N) - 1;
        for (var i = 0; i < N; i++) {
          t[i] = this.revBin(i, l, N);
        }
        return t;
      };
      FFTM.prototype.revBin = function revBin(x, l, N) {
        if (x === 0 || x === N - 1)
          return x;
        var rb = 0;
        for (var i = 0; i < l; i++) {
          rb |= (x & 1) << l - i - 1;
          x >>= 1;
        }
        return rb;
      };
      FFTM.prototype.permute = function permute(rbt, rws, iws, rtws, itws, N) {
        for (var i = 0; i < N; i++) {
          rtws[i] = rws[rbt[i]];
          itws[i] = iws[rbt[i]];
        }
      };
      FFTM.prototype.transform = function transform(rws, iws, rtws, itws, N, rbt) {
        this.permute(rbt, rws, iws, rtws, itws, N);
        for (var s = 1; s < N; s <<= 1) {
          var l = s << 1;
          var rtwdf = Math.cos(2 * Math.PI / l);
          var itwdf = Math.sin(2 * Math.PI / l);
          for (var p = 0; p < N; p += l) {
            var rtwdf_ = rtwdf;
            var itwdf_ = itwdf;
            for (var j = 0; j < s; j++) {
              var re = rtws[p + j];
              var ie = itws[p + j];
              var ro = rtws[p + j + s];
              var io = itws[p + j + s];
              var rx = rtwdf_ * ro - itwdf_ * io;
              io = rtwdf_ * io + itwdf_ * ro;
              ro = rx;
              rtws[p + j] = re + ro;
              itws[p + j] = ie + io;
              rtws[p + j + s] = re - ro;
              itws[p + j + s] = ie - io;
              if (j !== l) {
                rx = rtwdf * rtwdf_ - itwdf * itwdf_;
                itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
                rtwdf_ = rx;
              }
            }
          }
        }
      };
      FFTM.prototype.guessLen13b = function guessLen13b(n, m) {
        var N = Math.max(m, n) | 1;
        var odd = N & 1;
        var i = 0;
        for (N = N / 2 | 0; N; N = N >>> 1) {
          i++;
        }
        return 1 << i + 1 + odd;
      };
      FFTM.prototype.conjugate = function conjugate(rws, iws, N) {
        if (N <= 1)
          return;
        for (var i = 0; i < N / 2; i++) {
          var t = rws[i];
          rws[i] = rws[N - i - 1];
          rws[N - i - 1] = t;
          t = iws[i];
          iws[i] = -iws[N - i - 1];
          iws[N - i - 1] = -t;
        }
      };
      FFTM.prototype.normalize13b = function normalize13b(ws, N) {
        var carry = 0;
        for (var i = 0; i < N / 2; i++) {
          var w = Math.round(ws[2 * i + 1] / N) * 8192 + Math.round(ws[2 * i] / N) + carry;
          ws[i] = w & 67108863;
          if (w < 67108864) {
            carry = 0;
          } else {
            carry = w / 67108864 | 0;
          }
        }
        return ws;
      };
      FFTM.prototype.convert13b = function convert13b(ws, len, rws, N) {
        var carry = 0;
        for (var i = 0; i < len; i++) {
          carry = carry + (ws[i] | 0);
          rws[2 * i] = carry & 8191;
          carry = carry >>> 13;
          rws[2 * i + 1] = carry & 8191;
          carry = carry >>> 13;
        }
        for (i = 2 * len; i < N; ++i) {
          rws[i] = 0;
        }
        assert(carry === 0);
        assert((carry & ~8191) === 0);
      };
      FFTM.prototype.stub = function stub(N) {
        var ph = new Array(N);
        for (var i = 0; i < N; i++) {
          ph[i] = 0;
        }
        return ph;
      };
      FFTM.prototype.mulp = function mulp(x, y, out) {
        var N = 2 * this.guessLen13b(x.length, y.length);
        var rbt = this.makeRBT(N);
        var _ = this.stub(N);
        var rws = new Array(N);
        var rwst = new Array(N);
        var iwst = new Array(N);
        var nrws = new Array(N);
        var nrwst = new Array(N);
        var niwst = new Array(N);
        var rmws = out.words;
        rmws.length = N;
        this.convert13b(x.words, x.length, rws, N);
        this.convert13b(y.words, y.length, nrws, N);
        this.transform(rws, _, rwst, iwst, N, rbt);
        this.transform(nrws, _, nrwst, niwst, N, rbt);
        for (var i = 0; i < N; i++) {
          var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
          iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
          rwst[i] = rx;
        }
        this.conjugate(rwst, iwst, N);
        this.transform(rwst, iwst, rmws, _, N, rbt);
        this.conjugate(rmws, _, N);
        this.normalize13b(rmws, N);
        out.negative = x.negative ^ y.negative;
        out.length = x.length + y.length;
        return out.strip();
      };
      BN.prototype.mul = function mul(num) {
        var out = new BN(null);
        out.words = new Array(this.length + num.length);
        return this.mulTo(num, out);
      };
      BN.prototype.mulf = function mulf(num) {
        var out = new BN(null);
        out.words = new Array(this.length + num.length);
        return jumboMulTo(this, num, out);
      };
      BN.prototype.imul = function imul(num) {
        return this.clone().mulTo(num, this);
      };
      BN.prototype.imuln = function imuln(num) {
        assert(typeof num === "number");
        assert(num < 67108864);
        var carry = 0;
        for (var i = 0; i < this.length; i++) {
          var w = (this.words[i] | 0) * num;
          var lo = (w & 67108863) + (carry & 67108863);
          carry >>= 26;
          carry += w / 67108864 | 0;
          carry += lo >>> 26;
          this.words[i] = lo & 67108863;
        }
        if (carry !== 0) {
          this.words[i] = carry;
          this.length++;
        }
        return this;
      };
      BN.prototype.muln = function muln(num) {
        return this.clone().imuln(num);
      };
      BN.prototype.sqr = function sqr() {
        return this.mul(this);
      };
      BN.prototype.isqr = function isqr() {
        return this.imul(this.clone());
      };
      BN.prototype.pow = function pow(num) {
        var w = toBitArray(num);
        if (w.length === 0)
          return new BN(1);
        var res = this;
        for (var i = 0; i < w.length; i++, res = res.sqr()) {
          if (w[i] !== 0)
            break;
        }
        if (++i < w.length) {
          for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
            if (w[i] === 0)
              continue;
            res = res.mul(q);
          }
        }
        return res;
      };
      BN.prototype.iushln = function iushln(bits) {
        assert(typeof bits === "number" && bits >= 0);
        var r = bits % 26;
        var s = (bits - r) / 26;
        var carryMask = 67108863 >>> 26 - r << 26 - r;
        var i;
        if (r !== 0) {
          var carry = 0;
          for (i = 0; i < this.length; i++) {
            var newCarry = this.words[i] & carryMask;
            var c = (this.words[i] | 0) - newCarry << r;
            this.words[i] = c | carry;
            carry = newCarry >>> 26 - r;
          }
          if (carry) {
            this.words[i] = carry;
            this.length++;
          }
        }
        if (s !== 0) {
          for (i = this.length - 1; i >= 0; i--) {
            this.words[i + s] = this.words[i];
          }
          for (i = 0; i < s; i++) {
            this.words[i] = 0;
          }
          this.length += s;
        }
        return this.strip();
      };
      BN.prototype.ishln = function ishln(bits) {
        assert(this.negative === 0);
        return this.iushln(bits);
      };
      BN.prototype.iushrn = function iushrn(bits, hint, extended) {
        assert(typeof bits === "number" && bits >= 0);
        var h;
        if (hint) {
          h = (hint - hint % 26) / 26;
        } else {
          h = 0;
        }
        var r = bits % 26;
        var s = Math.min((bits - r) / 26, this.length);
        var mask = 67108863 ^ 67108863 >>> r << r;
        var maskedWords = extended;
        h -= s;
        h = Math.max(0, h);
        if (maskedWords) {
          for (var i = 0; i < s; i++) {
            maskedWords.words[i] = this.words[i];
          }
          maskedWords.length = s;
        }
        if (s === 0)
          ;
        else if (this.length > s) {
          this.length -= s;
          for (i = 0; i < this.length; i++) {
            this.words[i] = this.words[i + s];
          }
        } else {
          this.words[0] = 0;
          this.length = 1;
        }
        var carry = 0;
        for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
          var word = this.words[i] | 0;
          this.words[i] = carry << 26 - r | word >>> r;
          carry = word & mask;
        }
        if (maskedWords && carry !== 0) {
          maskedWords.words[maskedWords.length++] = carry;
        }
        if (this.length === 0) {
          this.words[0] = 0;
          this.length = 1;
        }
        return this.strip();
      };
      BN.prototype.ishrn = function ishrn(bits, hint, extended) {
        assert(this.negative === 0);
        return this.iushrn(bits, hint, extended);
      };
      BN.prototype.shln = function shln(bits) {
        return this.clone().ishln(bits);
      };
      BN.prototype.ushln = function ushln(bits) {
        return this.clone().iushln(bits);
      };
      BN.prototype.shrn = function shrn(bits) {
        return this.clone().ishrn(bits);
      };
      BN.prototype.ushrn = function ushrn(bits) {
        return this.clone().iushrn(bits);
      };
      BN.prototype.testn = function testn(bit) {
        assert(typeof bit === "number" && bit >= 0);
        var r = bit % 26;
        var s = (bit - r) / 26;
        var q = 1 << r;
        if (this.length <= s)
          return false;
        var w = this.words[s];
        return !!(w & q);
      };
      BN.prototype.imaskn = function imaskn(bits) {
        assert(typeof bits === "number" && bits >= 0);
        var r = bits % 26;
        var s = (bits - r) / 26;
        assert(this.negative === 0, "imaskn works only with positive numbers");
        if (this.length <= s) {
          return this;
        }
        if (r !== 0) {
          s++;
        }
        this.length = Math.min(s, this.length);
        if (r !== 0) {
          var mask = 67108863 ^ 67108863 >>> r << r;
          this.words[this.length - 1] &= mask;
        }
        return this.strip();
      };
      BN.prototype.maskn = function maskn(bits) {
        return this.clone().imaskn(bits);
      };
      BN.prototype.iaddn = function iaddn(num) {
        assert(typeof num === "number");
        assert(num < 67108864);
        if (num < 0)
          return this.isubn(-num);
        if (this.negative !== 0) {
          if (this.length === 1 && (this.words[0] | 0) < num) {
            this.words[0] = num - (this.words[0] | 0);
            this.negative = 0;
            return this;
          }
          this.negative = 0;
          this.isubn(num);
          this.negative = 1;
          return this;
        }
        return this._iaddn(num);
      };
      BN.prototype._iaddn = function _iaddn(num) {
        this.words[0] += num;
        for (var i = 0; i < this.length && this.words[i] >= 67108864; i++) {
          this.words[i] -= 67108864;
          if (i === this.length - 1) {
            this.words[i + 1] = 1;
          } else {
            this.words[i + 1]++;
          }
        }
        this.length = Math.max(this.length, i + 1);
        return this;
      };
      BN.prototype.isubn = function isubn(num) {
        assert(typeof num === "number");
        assert(num < 67108864);
        if (num < 0)
          return this.iaddn(-num);
        if (this.negative !== 0) {
          this.negative = 0;
          this.iaddn(num);
          this.negative = 1;
          return this;
        }
        this.words[0] -= num;
        if (this.length === 1 && this.words[0] < 0) {
          this.words[0] = -this.words[0];
          this.negative = 1;
        } else {
          for (var i = 0; i < this.length && this.words[i] < 0; i++) {
            this.words[i] += 67108864;
            this.words[i + 1] -= 1;
          }
        }
        return this.strip();
      };
      BN.prototype.addn = function addn(num) {
        return this.clone().iaddn(num);
      };
      BN.prototype.subn = function subn(num) {
        return this.clone().isubn(num);
      };
      BN.prototype.iabs = function iabs() {
        this.negative = 0;
        return this;
      };
      BN.prototype.abs = function abs() {
        return this.clone().iabs();
      };
      BN.prototype._ishlnsubmul = function _ishlnsubmul(num, mul, shift) {
        var len = num.length + shift;
        var i;
        this._expand(len);
        var w;
        var carry = 0;
        for (i = 0; i < num.length; i++) {
          w = (this.words[i + shift] | 0) + carry;
          var right = (num.words[i] | 0) * mul;
          w -= right & 67108863;
          carry = (w >> 26) - (right / 67108864 | 0);
          this.words[i + shift] = w & 67108863;
        }
        for (; i < this.length - shift; i++) {
          w = (this.words[i + shift] | 0) + carry;
          carry = w >> 26;
          this.words[i + shift] = w & 67108863;
        }
        if (carry === 0)
          return this.strip();
        assert(carry === -1);
        carry = 0;
        for (i = 0; i < this.length; i++) {
          w = -(this.words[i] | 0) + carry;
          carry = w >> 26;
          this.words[i] = w & 67108863;
        }
        this.negative = 1;
        return this.strip();
      };
      BN.prototype._wordDiv = function _wordDiv(num, mode) {
        var shift = this.length - num.length;
        var a = this.clone();
        var b = num;
        var bhi = b.words[b.length - 1] | 0;
        var bhiBits = this._countBits(bhi);
        shift = 26 - bhiBits;
        if (shift !== 0) {
          b = b.ushln(shift);
          a.iushln(shift);
          bhi = b.words[b.length - 1] | 0;
        }
        var m = a.length - b.length;
        var q;
        if (mode !== "mod") {
          q = new BN(null);
          q.length = m + 1;
          q.words = new Array(q.length);
          for (var i = 0; i < q.length; i++) {
            q.words[i] = 0;
          }
        }
        var diff = a.clone()._ishlnsubmul(b, 1, m);
        if (diff.negative === 0) {
          a = diff;
          if (q) {
            q.words[m] = 1;
          }
        }
        for (var j = m - 1; j >= 0; j--) {
          var qj = (a.words[b.length + j] | 0) * 67108864 + (a.words[b.length + j - 1] | 0);
          qj = Math.min(qj / bhi | 0, 67108863);
          a._ishlnsubmul(b, qj, j);
          while (a.negative !== 0) {
            qj--;
            a.negative = 0;
            a._ishlnsubmul(b, 1, j);
            if (!a.isZero()) {
              a.negative ^= 1;
            }
          }
          if (q) {
            q.words[j] = qj;
          }
        }
        if (q) {
          q.strip();
        }
        a.strip();
        if (mode !== "div" && shift !== 0) {
          a.iushrn(shift);
        }
        return {
          div: q || null,
          mod: a
        };
      };
      BN.prototype.divmod = function divmod(num, mode, positive) {
        assert(!num.isZero());
        if (this.isZero()) {
          return {
            div: new BN(0),
            mod: new BN(0)
          };
        }
        var div, mod, res;
        if (this.negative !== 0 && num.negative === 0) {
          res = this.neg().divmod(num, mode);
          if (mode !== "mod") {
            div = res.div.neg();
          }
          if (mode !== "div") {
            mod = res.mod.neg();
            if (positive && mod.negative !== 0) {
              mod.iadd(num);
            }
          }
          return {
            div,
            mod
          };
        }
        if (this.negative === 0 && num.negative !== 0) {
          res = this.divmod(num.neg(), mode);
          if (mode !== "mod") {
            div = res.div.neg();
          }
          return {
            div,
            mod: res.mod
          };
        }
        if ((this.negative & num.negative) !== 0) {
          res = this.neg().divmod(num.neg(), mode);
          if (mode !== "div") {
            mod = res.mod.neg();
            if (positive && mod.negative !== 0) {
              mod.isub(num);
            }
          }
          return {
            div: res.div,
            mod
          };
        }
        if (num.length > this.length || this.cmp(num) < 0) {
          return {
            div: new BN(0),
            mod: this
          };
        }
        if (num.length === 1) {
          if (mode === "div") {
            return {
              div: this.divn(num.words[0]),
              mod: null
            };
          }
          if (mode === "mod") {
            return {
              div: null,
              mod: new BN(this.modn(num.words[0]))
            };
          }
          return {
            div: this.divn(num.words[0]),
            mod: new BN(this.modn(num.words[0]))
          };
        }
        return this._wordDiv(num, mode);
      };
      BN.prototype.div = function div(num) {
        return this.divmod(num, "div", false).div;
      };
      BN.prototype.mod = function mod(num) {
        return this.divmod(num, "mod", false).mod;
      };
      BN.prototype.umod = function umod(num) {
        return this.divmod(num, "mod", true).mod;
      };
      BN.prototype.divRound = function divRound(num) {
        var dm = this.divmod(num);
        if (dm.mod.isZero())
          return dm.div;
        var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;
        var half = num.ushrn(1);
        var r2 = num.andln(1);
        var cmp = mod.cmp(half);
        if (cmp < 0 || r2 === 1 && cmp === 0)
          return dm.div;
        return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
      };
      BN.prototype.modn = function modn(num) {
        assert(num <= 67108863);
        var p = (1 << 26) % num;
        var acc = 0;
        for (var i = this.length - 1; i >= 0; i--) {
          acc = (p * acc + (this.words[i] | 0)) % num;
        }
        return acc;
      };
      BN.prototype.idivn = function idivn(num) {
        assert(num <= 67108863);
        var carry = 0;
        for (var i = this.length - 1; i >= 0; i--) {
          var w = (this.words[i] | 0) + carry * 67108864;
          this.words[i] = w / num | 0;
          carry = w % num;
        }
        return this.strip();
      };
      BN.prototype.divn = function divn(num) {
        return this.clone().idivn(num);
      };
      BN.prototype.egcd = function egcd(p) {
        assert(p.negative === 0);
        assert(!p.isZero());
        var x = this;
        var y = p.clone();
        if (x.negative !== 0) {
          x = x.umod(p);
        } else {
          x = x.clone();
        }
        var A = new BN(1);
        var B = new BN(0);
        var C = new BN(0);
        var D = new BN(1);
        var g = 0;
        while (x.isEven() && y.isEven()) {
          x.iushrn(1);
          y.iushrn(1);
          ++g;
        }
        var yp = y.clone();
        var xp = x.clone();
        while (!x.isZero()) {
          for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1)
            ;
          if (i > 0) {
            x.iushrn(i);
            while (i-- > 0) {
              if (A.isOdd() || B.isOdd()) {
                A.iadd(yp);
                B.isub(xp);
              }
              A.iushrn(1);
              B.iushrn(1);
            }
          }
          for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1)
            ;
          if (j > 0) {
            y.iushrn(j);
            while (j-- > 0) {
              if (C.isOdd() || D.isOdd()) {
                C.iadd(yp);
                D.isub(xp);
              }
              C.iushrn(1);
              D.iushrn(1);
            }
          }
          if (x.cmp(y) >= 0) {
            x.isub(y);
            A.isub(C);
            B.isub(D);
          } else {
            y.isub(x);
            C.isub(A);
            D.isub(B);
          }
        }
        return {
          a: C,
          b: D,
          gcd: y.iushln(g)
        };
      };
      BN.prototype._invmp = function _invmp(p) {
        assert(p.negative === 0);
        assert(!p.isZero());
        var a = this;
        var b = p.clone();
        if (a.negative !== 0) {
          a = a.umod(p);
        } else {
          a = a.clone();
        }
        var x1 = new BN(1);
        var x2 = new BN(0);
        var delta = b.clone();
        while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
          for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1)
            ;
          if (i > 0) {
            a.iushrn(i);
            while (i-- > 0) {
              if (x1.isOdd()) {
                x1.iadd(delta);
              }
              x1.iushrn(1);
            }
          }
          for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1)
            ;
          if (j > 0) {
            b.iushrn(j);
            while (j-- > 0) {
              if (x2.isOdd()) {
                x2.iadd(delta);
              }
              x2.iushrn(1);
            }
          }
          if (a.cmp(b) >= 0) {
            a.isub(b);
            x1.isub(x2);
          } else {
            b.isub(a);
            x2.isub(x1);
          }
        }
        var res;
        if (a.cmpn(1) === 0) {
          res = x1;
        } else {
          res = x2;
        }
        if (res.cmpn(0) < 0) {
          res.iadd(p);
        }
        return res;
      };
      BN.prototype.gcd = function gcd(num) {
        if (this.isZero())
          return num.abs();
        if (num.isZero())
          return this.abs();
        var a = this.clone();
        var b = num.clone();
        a.negative = 0;
        b.negative = 0;
        for (var shift = 0; a.isEven() && b.isEven(); shift++) {
          a.iushrn(1);
          b.iushrn(1);
        }
        do {
          while (a.isEven()) {
            a.iushrn(1);
          }
          while (b.isEven()) {
            b.iushrn(1);
          }
          var r = a.cmp(b);
          if (r < 0) {
            var t = a;
            a = b;
            b = t;
          } else if (r === 0 || b.cmpn(1) === 0) {
            break;
          }
          a.isub(b);
        } while (true);
        return b.iushln(shift);
      };
      BN.prototype.invm = function invm(num) {
        return this.egcd(num).a.umod(num);
      };
      BN.prototype.isEven = function isEven() {
        return (this.words[0] & 1) === 0;
      };
      BN.prototype.isOdd = function isOdd() {
        return (this.words[0] & 1) === 1;
      };
      BN.prototype.andln = function andln(num) {
        return this.words[0] & num;
      };
      BN.prototype.bincn = function bincn(bit) {
        assert(typeof bit === "number");
        var r = bit % 26;
        var s = (bit - r) / 26;
        var q = 1 << r;
        if (this.length <= s) {
          this._expand(s + 1);
          this.words[s] |= q;
          return this;
        }
        var carry = q;
        for (var i = s; carry !== 0 && i < this.length; i++) {
          var w = this.words[i] | 0;
          w += carry;
          carry = w >>> 26;
          w &= 67108863;
          this.words[i] = w;
        }
        if (carry !== 0) {
          this.words[i] = carry;
          this.length++;
        }
        return this;
      };
      BN.prototype.isZero = function isZero() {
        return this.length === 1 && this.words[0] === 0;
      };
      BN.prototype.cmpn = function cmpn(num) {
        var negative = num < 0;
        if (this.negative !== 0 && !negative)
          return -1;
        if (this.negative === 0 && negative)
          return 1;
        this.strip();
        var res;
        if (this.length > 1) {
          res = 1;
        } else {
          if (negative) {
            num = -num;
          }
          assert(num <= 67108863, "Number is too big");
          var w = this.words[0] | 0;
          res = w === num ? 0 : w < num ? -1 : 1;
        }
        if (this.negative !== 0)
          return -res | 0;
        return res;
      };
      BN.prototype.cmp = function cmp(num) {
        if (this.negative !== 0 && num.negative === 0)
          return -1;
        if (this.negative === 0 && num.negative !== 0)
          return 1;
        var res = this.ucmp(num);
        if (this.negative !== 0)
          return -res | 0;
        return res;
      };
      BN.prototype.ucmp = function ucmp(num) {
        if (this.length > num.length)
          return 1;
        if (this.length < num.length)
          return -1;
        var res = 0;
        for (var i = this.length - 1; i >= 0; i--) {
          var a = this.words[i] | 0;
          var b = num.words[i] | 0;
          if (a === b)
            continue;
          if (a < b) {
            res = -1;
          } else if (a > b) {
            res = 1;
          }
          break;
        }
        return res;
      };
      BN.prototype.gtn = function gtn(num) {
        return this.cmpn(num) === 1;
      };
      BN.prototype.gt = function gt(num) {
        return this.cmp(num) === 1;
      };
      BN.prototype.gten = function gten(num) {
        return this.cmpn(num) >= 0;
      };
      BN.prototype.gte = function gte(num) {
        return this.cmp(num) >= 0;
      };
      BN.prototype.ltn = function ltn(num) {
        return this.cmpn(num) === -1;
      };
      BN.prototype.lt = function lt(num) {
        return this.cmp(num) === -1;
      };
      BN.prototype.lten = function lten(num) {
        return this.cmpn(num) <= 0;
      };
      BN.prototype.lte = function lte(num) {
        return this.cmp(num) <= 0;
      };
      BN.prototype.eqn = function eqn(num) {
        return this.cmpn(num) === 0;
      };
      BN.prototype.eq = function eq(num) {
        return this.cmp(num) === 0;
      };
      BN.red = function red(num) {
        return new Red(num);
      };
      BN.prototype.toRed = function toRed(ctx) {
        assert(!this.red, "Already a number in reduction context");
        assert(this.negative === 0, "red works only with positives");
        return ctx.convertTo(this)._forceRed(ctx);
      };
      BN.prototype.fromRed = function fromRed() {
        assert(this.red, "fromRed works only with numbers in reduction context");
        return this.red.convertFrom(this);
      };
      BN.prototype._forceRed = function _forceRed(ctx) {
        this.red = ctx;
        return this;
      };
      BN.prototype.forceRed = function forceRed(ctx) {
        assert(!this.red, "Already a number in reduction context");
        return this._forceRed(ctx);
      };
      BN.prototype.redAdd = function redAdd(num) {
        assert(this.red, "redAdd works only with red numbers");
        return this.red.add(this, num);
      };
      BN.prototype.redIAdd = function redIAdd(num) {
        assert(this.red, "redIAdd works only with red numbers");
        return this.red.iadd(this, num);
      };
      BN.prototype.redSub = function redSub(num) {
        assert(this.red, "redSub works only with red numbers");
        return this.red.sub(this, num);
      };
      BN.prototype.redISub = function redISub(num) {
        assert(this.red, "redISub works only with red numbers");
        return this.red.isub(this, num);
      };
      BN.prototype.redShl = function redShl(num) {
        assert(this.red, "redShl works only with red numbers");
        return this.red.shl(this, num);
      };
      BN.prototype.redMul = function redMul(num) {
        assert(this.red, "redMul works only with red numbers");
        this.red._verify2(this, num);
        return this.red.mul(this, num);
      };
      BN.prototype.redIMul = function redIMul(num) {
        assert(this.red, "redMul works only with red numbers");
        this.red._verify2(this, num);
        return this.red.imul(this, num);
      };
      BN.prototype.redSqr = function redSqr() {
        assert(this.red, "redSqr works only with red numbers");
        this.red._verify1(this);
        return this.red.sqr(this);
      };
      BN.prototype.redISqr = function redISqr() {
        assert(this.red, "redISqr works only with red numbers");
        this.red._verify1(this);
        return this.red.isqr(this);
      };
      BN.prototype.redSqrt = function redSqrt() {
        assert(this.red, "redSqrt works only with red numbers");
        this.red._verify1(this);
        return this.red.sqrt(this);
      };
      BN.prototype.redInvm = function redInvm() {
        assert(this.red, "redInvm works only with red numbers");
        this.red._verify1(this);
        return this.red.invm(this);
      };
      BN.prototype.redNeg = function redNeg() {
        assert(this.red, "redNeg works only with red numbers");
        this.red._verify1(this);
        return this.red.neg(this);
      };
      BN.prototype.redPow = function redPow(num) {
        assert(this.red && !num.red, "redPow(normalNum)");
        this.red._verify1(this);
        return this.red.pow(this, num);
      };
      var primes = {
        k256: null,
        p224: null,
        p192: null,
        p25519: null
      };
      function MPrime(name2, p) {
        this.name = name2;
        this.p = new BN(p, 16);
        this.n = this.p.bitLength();
        this.k = new BN(1).iushln(this.n).isub(this.p);
        this.tmp = this._tmp();
      }
      MPrime.prototype._tmp = function _tmp() {
        var tmp = new BN(null);
        tmp.words = new Array(Math.ceil(this.n / 13));
        return tmp;
      };
      MPrime.prototype.ireduce = function ireduce(num) {
        var r = num;
        var rlen;
        do {
          this.split(r, this.tmp);
          r = this.imulK(r);
          r = r.iadd(this.tmp);
          rlen = r.bitLength();
        } while (rlen > this.n);
        var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
        if (cmp === 0) {
          r.words[0] = 0;
          r.length = 1;
        } else if (cmp > 0) {
          r.isub(this.p);
        } else {
          if (r.strip !== void 0) {
            r.strip();
          } else {
            r._strip();
          }
        }
        return r;
      };
      MPrime.prototype.split = function split(input, out) {
        input.iushrn(this.n, 0, out);
      };
      MPrime.prototype.imulK = function imulK(num) {
        return num.imul(this.k);
      };
      function K256() {
        MPrime.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        );
      }
      inherits2(K256, MPrime);
      K256.prototype.split = function split(input, output) {
        var mask = 4194303;
        var outLen = Math.min(input.length, 9);
        for (var i = 0; i < outLen; i++) {
          output.words[i] = input.words[i];
        }
        output.length = outLen;
        if (input.length <= 9) {
          input.words[0] = 0;
          input.length = 1;
          return;
        }
        var prev = input.words[9];
        output.words[output.length++] = prev & mask;
        for (i = 10; i < input.length; i++) {
          var next = input.words[i] | 0;
          input.words[i - 10] = (next & mask) << 4 | prev >>> 22;
          prev = next;
        }
        prev >>>= 22;
        input.words[i - 10] = prev;
        if (prev === 0 && input.length > 10) {
          input.length -= 10;
        } else {
          input.length -= 9;
        }
      };
      K256.prototype.imulK = function imulK(num) {
        num.words[num.length] = 0;
        num.words[num.length + 1] = 0;
        num.length += 2;
        var lo = 0;
        for (var i = 0; i < num.length; i++) {
          var w = num.words[i] | 0;
          lo += w * 977;
          num.words[i] = lo & 67108863;
          lo = w * 64 + (lo / 67108864 | 0);
        }
        if (num.words[num.length - 1] === 0) {
          num.length--;
          if (num.words[num.length - 1] === 0) {
            num.length--;
          }
        }
        return num;
      };
      function P224() {
        MPrime.call(
          this,
          "p224",
          "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
        );
      }
      inherits2(P224, MPrime);
      function P192() {
        MPrime.call(
          this,
          "p192",
          "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
        );
      }
      inherits2(P192, MPrime);
      function P25519() {
        MPrime.call(
          this,
          "25519",
          "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
        );
      }
      inherits2(P25519, MPrime);
      P25519.prototype.imulK = function imulK(num) {
        var carry = 0;
        for (var i = 0; i < num.length; i++) {
          var hi = (num.words[i] | 0) * 19 + carry;
          var lo = hi & 67108863;
          hi >>>= 26;
          num.words[i] = lo;
          carry = hi;
        }
        if (carry !== 0) {
          num.words[num.length++] = carry;
        }
        return num;
      };
      BN._prime = function prime(name2) {
        if (primes[name2])
          return primes[name2];
        var prime2;
        if (name2 === "k256") {
          prime2 = new K256();
        } else if (name2 === "p224") {
          prime2 = new P224();
        } else if (name2 === "p192") {
          prime2 = new P192();
        } else if (name2 === "p25519") {
          prime2 = new P25519();
        } else {
          throw new Error("Unknown prime " + name2);
        }
        primes[name2] = prime2;
        return prime2;
      };
      function Red(m) {
        if (typeof m === "string") {
          var prime = BN._prime(m);
          this.m = prime.p;
          this.prime = prime;
        } else {
          assert(m.gtn(1), "modulus must be greater than 1");
          this.m = m;
          this.prime = null;
        }
      }
      Red.prototype._verify1 = function _verify1(a) {
        assert(a.negative === 0, "red works only with positives");
        assert(a.red, "red works only with red numbers");
      };
      Red.prototype._verify2 = function _verify2(a, b) {
        assert((a.negative | b.negative) === 0, "red works only with positives");
        assert(
          a.red && a.red === b.red,
          "red works only with red numbers"
        );
      };
      Red.prototype.imod = function imod(a) {
        if (this.prime)
          return this.prime.ireduce(a)._forceRed(this);
        return a.umod(this.m)._forceRed(this);
      };
      Red.prototype.neg = function neg(a) {
        if (a.isZero()) {
          return a.clone();
        }
        return this.m.sub(a)._forceRed(this);
      };
      Red.prototype.add = function add(a, b) {
        this._verify2(a, b);
        var res = a.add(b);
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m);
        }
        return res._forceRed(this);
      };
      Red.prototype.iadd = function iadd(a, b) {
        this._verify2(a, b);
        var res = a.iadd(b);
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m);
        }
        return res;
      };
      Red.prototype.sub = function sub(a, b) {
        this._verify2(a, b);
        var res = a.sub(b);
        if (res.cmpn(0) < 0) {
          res.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Red.prototype.isub = function isub(a, b) {
        this._verify2(a, b);
        var res = a.isub(b);
        if (res.cmpn(0) < 0) {
          res.iadd(this.m);
        }
        return res;
      };
      Red.prototype.shl = function shl(a, num) {
        this._verify1(a);
        return this.imod(a.ushln(num));
      };
      Red.prototype.imul = function imul(a, b) {
        this._verify2(a, b);
        return this.imod(a.imul(b));
      };
      Red.prototype.mul = function mul(a, b) {
        this._verify2(a, b);
        return this.imod(a.mul(b));
      };
      Red.prototype.isqr = function isqr(a) {
        return this.imul(a, a.clone());
      };
      Red.prototype.sqr = function sqr(a) {
        return this.mul(a, a);
      };
      Red.prototype.sqrt = function sqrt(a) {
        if (a.isZero())
          return a.clone();
        var mod3 = this.m.andln(3);
        assert(mod3 % 2 === 1);
        if (mod3 === 3) {
          var pow = this.m.add(new BN(1)).iushrn(2);
          return this.pow(a, pow);
        }
        var q = this.m.subn(1);
        var s = 0;
        while (!q.isZero() && q.andln(1) === 0) {
          s++;
          q.iushrn(1);
        }
        assert(!q.isZero());
        var one = new BN(1).toRed(this);
        var nOne = one.redNeg();
        var lpow = this.m.subn(1).iushrn(1);
        var z = this.m.bitLength();
        z = new BN(2 * z * z).toRed(this);
        while (this.pow(z, lpow).cmp(nOne) !== 0) {
          z.redIAdd(nOne);
        }
        var c = this.pow(z, q);
        var r = this.pow(a, q.addn(1).iushrn(1));
        var t = this.pow(a, q);
        var m = s;
        while (t.cmp(one) !== 0) {
          var tmp = t;
          for (var i = 0; tmp.cmp(one) !== 0; i++) {
            tmp = tmp.redSqr();
          }
          assert(i < m);
          var b = this.pow(c, new BN(1).iushln(m - i - 1));
          r = r.redMul(b);
          c = b.redSqr();
          t = t.redMul(c);
          m = i;
        }
        return r;
      };
      Red.prototype.invm = function invm(a) {
        var inv = a._invmp(this.m);
        if (inv.negative !== 0) {
          inv.negative = 0;
          return this.imod(inv).redNeg();
        } else {
          return this.imod(inv);
        }
      };
      Red.prototype.pow = function pow(a, num) {
        if (num.isZero())
          return new BN(1).toRed(this);
        if (num.cmpn(1) === 0)
          return a.clone();
        var windowSize = 4;
        var wnd = new Array(1 << windowSize);
        wnd[0] = new BN(1).toRed(this);
        wnd[1] = a;
        for (var i = 2; i < wnd.length; i++) {
          wnd[i] = this.mul(wnd[i - 1], a);
        }
        var res = wnd[0];
        var current = 0;
        var currentLen = 0;
        var start = num.bitLength() % 26;
        if (start === 0) {
          start = 26;
        }
        for (i = num.length - 1; i >= 0; i--) {
          var word = num.words[i];
          for (var j = start - 1; j >= 0; j--) {
            var bit = word >> j & 1;
            if (res !== wnd[0]) {
              res = this.sqr(res);
            }
            if (bit === 0 && current === 0) {
              currentLen = 0;
              continue;
            }
            current <<= 1;
            current |= bit;
            currentLen++;
            if (currentLen !== windowSize && (i !== 0 || j !== 0))
              continue;
            res = this.mul(res, wnd[current]);
            currentLen = 0;
            current = 0;
          }
          start = 26;
        }
        return res;
      };
      Red.prototype.convertTo = function convertTo(num) {
        var r = num.umod(this.m);
        return r === num ? r.clone() : r;
      };
      Red.prototype.convertFrom = function convertFrom(num) {
        var res = num.clone();
        res.red = null;
        return res;
      };
      BN.mont = function mont2(num) {
        return new Mont(num);
      };
      function Mont(m) {
        Red.call(this, m);
        this.shift = this.m.bitLength();
        if (this.shift % 26 !== 0) {
          this.shift += 26 - this.shift % 26;
        }
        this.r = new BN(1).iushln(this.shift);
        this.r2 = this.imod(this.r.sqr());
        this.rinv = this.r._invmp(this.m);
        this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
        this.minv = this.minv.umod(this.r);
        this.minv = this.r.sub(this.minv);
      }
      inherits2(Mont, Red);
      Mont.prototype.convertTo = function convertTo(num) {
        return this.imod(num.ushln(this.shift));
      };
      Mont.prototype.convertFrom = function convertFrom(num) {
        var r = this.imod(num.mul(this.rinv));
        r.red = null;
        return r;
      };
      Mont.prototype.imul = function imul(a, b) {
        if (a.isZero() || b.isZero()) {
          a.words[0] = 0;
          a.length = 1;
          return a;
        }
        var t = a.imul(b);
        var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
        var u = t.isub(c).iushrn(this.shift);
        var res = u;
        if (u.cmp(this.m) >= 0) {
          res = u.isub(this.m);
        } else if (u.cmpn(0) < 0) {
          res = u.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Mont.prototype.mul = function mul(a, b) {
        if (a.isZero() || b.isZero())
          return new BN(0)._forceRed(this);
        var t = a.mul(b);
        var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
        var u = t.isub(c).iushrn(this.shift);
        var res = u;
        if (u.cmp(this.m) >= 0) {
          res = u.isub(this.m);
        } else if (u.cmpn(0) < 0) {
          res = u.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Mont.prototype.invm = function invm(a) {
        var res = this.imod(a._invmp(this.m).mul(this.r2));
        return res._forceRed(this);
      };
    })(module, commonjsGlobal);
  })(bn$1);
  return bn$1.exports;
}
var minimalisticAssert;
var hasRequiredMinimalisticAssert;
function requireMinimalisticAssert() {
  if (hasRequiredMinimalisticAssert)
    return minimalisticAssert;
  hasRequiredMinimalisticAssert = 1;
  minimalisticAssert = assert;
  function assert(val, msg) {
    if (!val)
      throw new Error(msg || "Assertion failed");
  }
  assert.equal = function assertEqual(l, r, msg) {
    if (l != r)
      throw new Error(msg || "Assertion failed: " + l + " != " + r);
  };
  return minimalisticAssert;
}
var utils$1 = {};
var hasRequiredUtils$2;
function requireUtils$2() {
  if (hasRequiredUtils$2)
    return utils$1;
  hasRequiredUtils$2 = 1;
  (function(exports) {
    var utils2 = exports;
    function toArray(msg, enc) {
      if (Array.isArray(msg))
        return msg.slice();
      if (!msg)
        return [];
      var res = [];
      if (typeof msg !== "string") {
        for (var i = 0; i < msg.length; i++)
          res[i] = msg[i] | 0;
        return res;
      }
      if (enc === "hex") {
        msg = msg.replace(/[^a-z0-9]+/ig, "");
        if (msg.length % 2 !== 0)
          msg = "0" + msg;
        for (var i = 0; i < msg.length; i += 2)
          res.push(parseInt(msg[i] + msg[i + 1], 16));
      } else {
        for (var i = 0; i < msg.length; i++) {
          var c = msg.charCodeAt(i);
          var hi = c >> 8;
          var lo = c & 255;
          if (hi)
            res.push(hi, lo);
          else
            res.push(lo);
        }
      }
      return res;
    }
    utils2.toArray = toArray;
    function zero2(word) {
      if (word.length === 1)
        return "0" + word;
      else
        return word;
    }
    utils2.zero2 = zero2;
    function toHex(msg) {
      var res = "";
      for (var i = 0; i < msg.length; i++)
        res += zero2(msg[i].toString(16));
      return res;
    }
    utils2.toHex = toHex;
    utils2.encode = function encode2(arr, enc) {
      if (enc === "hex")
        return toHex(arr);
      else
        return arr;
    };
  })(utils$1);
  return utils$1;
}
var hasRequiredUtils$1;
function requireUtils$1() {
  if (hasRequiredUtils$1)
    return utils$2;
  hasRequiredUtils$1 = 1;
  (function(exports) {
    var utils2 = exports;
    var BN = requireBn$1();
    var minAssert = requireMinimalisticAssert();
    var minUtils = requireUtils$2();
    utils2.assert = minAssert;
    utils2.toArray = minUtils.toArray;
    utils2.zero2 = minUtils.zero2;
    utils2.toHex = minUtils.toHex;
    utils2.encode = minUtils.encode;
    function getNAF(num, w, bits) {
      var naf = new Array(Math.max(num.bitLength(), bits) + 1);
      naf.fill(0);
      var ws = 1 << w + 1;
      var k = num.clone();
      for (var i = 0; i < naf.length; i++) {
        var z;
        var mod = k.andln(ws - 1);
        if (k.isOdd()) {
          if (mod > (ws >> 1) - 1)
            z = (ws >> 1) - mod;
          else
            z = mod;
          k.isubn(z);
        } else {
          z = 0;
        }
        naf[i] = z;
        k.iushrn(1);
      }
      return naf;
    }
    utils2.getNAF = getNAF;
    function getJSF(k1, k2) {
      var jsf = [
        [],
        []
      ];
      k1 = k1.clone();
      k2 = k2.clone();
      var d1 = 0;
      var d2 = 0;
      var m8;
      while (k1.cmpn(-d1) > 0 || k2.cmpn(-d2) > 0) {
        var m14 = k1.andln(3) + d1 & 3;
        var m24 = k2.andln(3) + d2 & 3;
        if (m14 === 3)
          m14 = -1;
        if (m24 === 3)
          m24 = -1;
        var u1;
        if ((m14 & 1) === 0) {
          u1 = 0;
        } else {
          m8 = k1.andln(7) + d1 & 7;
          if ((m8 === 3 || m8 === 5) && m24 === 2)
            u1 = -m14;
          else
            u1 = m14;
        }
        jsf[0].push(u1);
        var u2;
        if ((m24 & 1) === 0) {
          u2 = 0;
        } else {
          m8 = k2.andln(7) + d2 & 7;
          if ((m8 === 3 || m8 === 5) && m14 === 2)
            u2 = -m24;
          else
            u2 = m24;
        }
        jsf[1].push(u2);
        if (2 * d1 === u1 + 1)
          d1 = 1 - d1;
        if (2 * d2 === u2 + 1)
          d2 = 1 - d2;
        k1.iushrn(1);
        k2.iushrn(1);
      }
      return jsf;
    }
    utils2.getJSF = getJSF;
    function cachedProperty(obj, name2, computer) {
      var key2 = "_" + name2;
      obj.prototype[name2] = function cachedProperty2() {
        return this[key2] !== void 0 ? this[key2] : this[key2] = computer.call(this);
      };
    }
    utils2.cachedProperty = cachedProperty;
    function parseBytes(bytes) {
      return typeof bytes === "string" ? utils2.toArray(bytes, "hex") : bytes;
    }
    utils2.parseBytes = parseBytes;
    function intFromLE(bytes) {
      return new BN(bytes, "hex", "le");
    }
    utils2.intFromLE = intFromLE;
  })(utils$2);
  return utils$2;
}
var brorand = { exports: {} };
var hasRequiredBrorand;
function requireBrorand() {
  if (hasRequiredBrorand)
    return brorand.exports;
  hasRequiredBrorand = 1;
  var r;
  brorand.exports = function rand(len) {
    if (!r)
      r = new Rand(null);
    return r.generate(len);
  };
  function Rand(rand) {
    this.rand = rand;
  }
  brorand.exports.Rand = Rand;
  Rand.prototype.generate = function generate(len) {
    return this._rand(len);
  };
  Rand.prototype._rand = function _rand(n) {
    if (this.rand.getBytes)
      return this.rand.getBytes(n);
    var res = new Uint8Array(n);
    for (var i = 0; i < res.length; i++)
      res[i] = this.rand.getByte();
    return res;
  };
  if (typeof self === "object") {
    if (self.crypto && self.crypto.getRandomValues) {
      Rand.prototype._rand = function _rand(n) {
        var arr = new Uint8Array(n);
        self.crypto.getRandomValues(arr);
        return arr;
      };
    } else if (self.msCrypto && self.msCrypto.getRandomValues) {
      Rand.prototype._rand = function _rand(n) {
        var arr = new Uint8Array(n);
        self.msCrypto.getRandomValues(arr);
        return arr;
      };
    } else if (typeof window === "object") {
      Rand.prototype._rand = function() {
        throw new Error("Not implemented yet");
      };
    }
  } else {
    try {
      var crypto = requireCryptoBrowserify();
      if (typeof crypto.randomBytes !== "function")
        throw new Error("Not supported");
      Rand.prototype._rand = function _rand(n) {
        return crypto.randomBytes(n);
      };
    } catch (e) {
    }
  }
  return brorand.exports;
}
var curve = {};
var base$1;
var hasRequiredBase$1;
function requireBase$1() {
  if (hasRequiredBase$1)
    return base$1;
  hasRequiredBase$1 = 1;
  var BN = requireBn$1();
  var utils2 = requireUtils$1();
  var getNAF = utils2.getNAF;
  var getJSF = utils2.getJSF;
  var assert = utils2.assert;
  function BaseCurve(type, conf) {
    this.type = type;
    this.p = new BN(conf.p, 16);
    this.red = conf.prime ? BN.red(conf.prime) : BN.mont(this.p);
    this.zero = new BN(0).toRed(this.red);
    this.one = new BN(1).toRed(this.red);
    this.two = new BN(2).toRed(this.red);
    this.n = conf.n && new BN(conf.n, 16);
    this.g = conf.g && this.pointFromJSON(conf.g, conf.gRed);
    this._wnafT1 = new Array(4);
    this._wnafT2 = new Array(4);
    this._wnafT3 = new Array(4);
    this._wnafT4 = new Array(4);
    this._bitLength = this.n ? this.n.bitLength() : 0;
    var adjustCount = this.n && this.p.div(this.n);
    if (!adjustCount || adjustCount.cmpn(100) > 0) {
      this.redN = null;
    } else {
      this._maxwellTrick = true;
      this.redN = this.n.toRed(this.red);
    }
  }
  base$1 = BaseCurve;
  BaseCurve.prototype.point = function point() {
    throw new Error("Not implemented");
  };
  BaseCurve.prototype.validate = function validate() {
    throw new Error("Not implemented");
  };
  BaseCurve.prototype._fixedNafMul = function _fixedNafMul(p, k) {
    assert(p.precomputed);
    var doubles = p._getDoubles();
    var naf = getNAF(k, 1, this._bitLength);
    var I = (1 << doubles.step + 1) - (doubles.step % 2 === 0 ? 2 : 1);
    I /= 3;
    var repr = [];
    var j;
    var nafW;
    for (j = 0; j < naf.length; j += doubles.step) {
      nafW = 0;
      for (var l = j + doubles.step - 1; l >= j; l--)
        nafW = (nafW << 1) + naf[l];
      repr.push(nafW);
    }
    var a = this.jpoint(null, null, null);
    var b = this.jpoint(null, null, null);
    for (var i = I; i > 0; i--) {
      for (j = 0; j < repr.length; j++) {
        nafW = repr[j];
        if (nafW === i)
          b = b.mixedAdd(doubles.points[j]);
        else if (nafW === -i)
          b = b.mixedAdd(doubles.points[j].neg());
      }
      a = a.add(b);
    }
    return a.toP();
  };
  BaseCurve.prototype._wnafMul = function _wnafMul(p, k) {
    var w = 4;
    var nafPoints = p._getNAFPoints(w);
    w = nafPoints.wnd;
    var wnd = nafPoints.points;
    var naf = getNAF(k, w, this._bitLength);
    var acc = this.jpoint(null, null, null);
    for (var i = naf.length - 1; i >= 0; i--) {
      for (var l = 0; i >= 0 && naf[i] === 0; i--)
        l++;
      if (i >= 0)
        l++;
      acc = acc.dblp(l);
      if (i < 0)
        break;
      var z = naf[i];
      assert(z !== 0);
      if (p.type === "affine") {
        if (z > 0)
          acc = acc.mixedAdd(wnd[z - 1 >> 1]);
        else
          acc = acc.mixedAdd(wnd[-z - 1 >> 1].neg());
      } else {
        if (z > 0)
          acc = acc.add(wnd[z - 1 >> 1]);
        else
          acc = acc.add(wnd[-z - 1 >> 1].neg());
      }
    }
    return p.type === "affine" ? acc.toP() : acc;
  };
  BaseCurve.prototype._wnafMulAdd = function _wnafMulAdd(defW, points, coeffs, len, jacobianResult) {
    var wndWidth = this._wnafT1;
    var wnd = this._wnafT2;
    var naf = this._wnafT3;
    var max = 0;
    var i;
    var j;
    var p;
    for (i = 0; i < len; i++) {
      p = points[i];
      var nafPoints = p._getNAFPoints(defW);
      wndWidth[i] = nafPoints.wnd;
      wnd[i] = nafPoints.points;
    }
    for (i = len - 1; i >= 1; i -= 2) {
      var a = i - 1;
      var b = i;
      if (wndWidth[a] !== 1 || wndWidth[b] !== 1) {
        naf[a] = getNAF(coeffs[a], wndWidth[a], this._bitLength);
        naf[b] = getNAF(coeffs[b], wndWidth[b], this._bitLength);
        max = Math.max(naf[a].length, max);
        max = Math.max(naf[b].length, max);
        continue;
      }
      var comb = [
        points[a],
        /* 1 */
        null,
        /* 3 */
        null,
        /* 5 */
        points[b]
        /* 7 */
      ];
      if (points[a].y.cmp(points[b].y) === 0) {
        comb[1] = points[a].add(points[b]);
        comb[2] = points[a].toJ().mixedAdd(points[b].neg());
      } else if (points[a].y.cmp(points[b].y.redNeg()) === 0) {
        comb[1] = points[a].toJ().mixedAdd(points[b]);
        comb[2] = points[a].add(points[b].neg());
      } else {
        comb[1] = points[a].toJ().mixedAdd(points[b]);
        comb[2] = points[a].toJ().mixedAdd(points[b].neg());
      }
      var index2 = [
        -3,
        /* -1 -1 */
        -1,
        /* -1 0 */
        -5,
        /* -1 1 */
        -7,
        /* 0 -1 */
        0,
        /* 0 0 */
        7,
        /* 0 1 */
        5,
        /* 1 -1 */
        1,
        /* 1 0 */
        3
        /* 1 1 */
      ];
      var jsf = getJSF(coeffs[a], coeffs[b]);
      max = Math.max(jsf[0].length, max);
      naf[a] = new Array(max);
      naf[b] = new Array(max);
      for (j = 0; j < max; j++) {
        var ja = jsf[0][j] | 0;
        var jb = jsf[1][j] | 0;
        naf[a][j] = index2[(ja + 1) * 3 + (jb + 1)];
        naf[b][j] = 0;
        wnd[a] = comb;
      }
    }
    var acc = this.jpoint(null, null, null);
    var tmp = this._wnafT4;
    for (i = max; i >= 0; i--) {
      var k = 0;
      while (i >= 0) {
        var zero = true;
        for (j = 0; j < len; j++) {
          tmp[j] = naf[j][i] | 0;
          if (tmp[j] !== 0)
            zero = false;
        }
        if (!zero)
          break;
        k++;
        i--;
      }
      if (i >= 0)
        k++;
      acc = acc.dblp(k);
      if (i < 0)
        break;
      for (j = 0; j < len; j++) {
        var z = tmp[j];
        if (z === 0)
          continue;
        else if (z > 0)
          p = wnd[j][z - 1 >> 1];
        else if (z < 0)
          p = wnd[j][-z - 1 >> 1].neg();
        if (p.type === "affine")
          acc = acc.mixedAdd(p);
        else
          acc = acc.add(p);
      }
    }
    for (i = 0; i < len; i++)
      wnd[i] = null;
    if (jacobianResult)
      return acc;
    else
      return acc.toP();
  };
  function BasePoint(curve2, type) {
    this.curve = curve2;
    this.type = type;
    this.precomputed = null;
  }
  BaseCurve.BasePoint = BasePoint;
  BasePoint.prototype.eq = function eq() {
    throw new Error("Not implemented");
  };
  BasePoint.prototype.validate = function validate() {
    return this.curve.validate(this);
  };
  BaseCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
    bytes = utils2.toArray(bytes, enc);
    var len = this.p.byteLength();
    if ((bytes[0] === 4 || bytes[0] === 6 || bytes[0] === 7) && bytes.length - 1 === 2 * len) {
      if (bytes[0] === 6)
        assert(bytes[bytes.length - 1] % 2 === 0);
      else if (bytes[0] === 7)
        assert(bytes[bytes.length - 1] % 2 === 1);
      var res = this.point(
        bytes.slice(1, 1 + len),
        bytes.slice(1 + len, 1 + 2 * len)
      );
      return res;
    } else if ((bytes[0] === 2 || bytes[0] === 3) && bytes.length - 1 === len) {
      return this.pointFromX(bytes.slice(1, 1 + len), bytes[0] === 3);
    }
    throw new Error("Unknown point format");
  };
  BasePoint.prototype.encodeCompressed = function encodeCompressed(enc) {
    return this.encode(enc, true);
  };
  BasePoint.prototype._encode = function _encode(compact) {
    var len = this.curve.p.byteLength();
    var x = this.getX().toArray("be", len);
    if (compact)
      return [this.getY().isEven() ? 2 : 3].concat(x);
    return [4].concat(x, this.getY().toArray("be", len));
  };
  BasePoint.prototype.encode = function encode2(enc, compact) {
    return utils2.encode(this._encode(compact), enc);
  };
  BasePoint.prototype.precompute = function precompute(power) {
    if (this.precomputed)
      return this;
    var precomputed = {
      doubles: null,
      naf: null,
      beta: null
    };
    precomputed.naf = this._getNAFPoints(8);
    precomputed.doubles = this._getDoubles(4, power);
    precomputed.beta = this._getBeta();
    this.precomputed = precomputed;
    return this;
  };
  BasePoint.prototype._hasDoubles = function _hasDoubles(k) {
    if (!this.precomputed)
      return false;
    var doubles = this.precomputed.doubles;
    if (!doubles)
      return false;
    return doubles.points.length >= Math.ceil((k.bitLength() + 1) / doubles.step);
  };
  BasePoint.prototype._getDoubles = function _getDoubles(step, power) {
    if (this.precomputed && this.precomputed.doubles)
      return this.precomputed.doubles;
    var doubles = [this];
    var acc = this;
    for (var i = 0; i < power; i += step) {
      for (var j = 0; j < step; j++)
        acc = acc.dbl();
      doubles.push(acc);
    }
    return {
      step,
      points: doubles
    };
  };
  BasePoint.prototype._getNAFPoints = function _getNAFPoints(wnd) {
    if (this.precomputed && this.precomputed.naf)
      return this.precomputed.naf;
    var res = [this];
    var max = (1 << wnd) - 1;
    var dbl = max === 1 ? null : this.dbl();
    for (var i = 1; i < max; i++)
      res[i] = res[i - 1].add(dbl);
    return {
      wnd,
      points: res
    };
  };
  BasePoint.prototype._getBeta = function _getBeta() {
    return null;
  };
  BasePoint.prototype.dblp = function dblp(k) {
    var r = this;
    for (var i = 0; i < k; i++)
      r = r.dbl();
    return r;
  };
  return base$1;
}
var inherits$2 = { exports: {} };
var util = {};
var types = {};
var shams$1;
var hasRequiredShams$1;
function requireShams$1() {
  if (hasRequiredShams$1)
    return shams$1;
  hasRequiredShams$1 = 1;
  shams$1 = function hasSymbols2() {
    if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
      return false;
    }
    if (typeof Symbol.iterator === "symbol") {
      return true;
    }
    var obj = {};
    var sym = Symbol("test");
    var symObj = Object(sym);
    if (typeof sym === "string") {
      return false;
    }
    if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
      return false;
    }
    if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
      return false;
    }
    var symVal = 42;
    obj[sym] = symVal;
    for (sym in obj) {
      return false;
    }
    if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
      return false;
    }
    if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
      return false;
    }
    var syms = Object.getOwnPropertySymbols(obj);
    if (syms.length !== 1 || syms[0] !== sym) {
      return false;
    }
    if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
      return false;
    }
    if (typeof Object.getOwnPropertyDescriptor === "function") {
      var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
      if (descriptor.value !== symVal || descriptor.enumerable !== true) {
        return false;
      }
    }
    return true;
  };
  return shams$1;
}
var shams;
var hasRequiredShams;
function requireShams() {
  if (hasRequiredShams)
    return shams;
  hasRequiredShams = 1;
  var hasSymbols2 = requireShams$1();
  shams = function hasToStringTagShams() {
    return hasSymbols2() && !!Symbol.toStringTag;
  };
  return shams;
}
var hasSymbols;
var hasRequiredHasSymbols;
function requireHasSymbols() {
  if (hasRequiredHasSymbols)
    return hasSymbols;
  hasRequiredHasSymbols = 1;
  var origSymbol = typeof Symbol !== "undefined" && Symbol;
  var hasSymbolSham = requireShams$1();
  hasSymbols = function hasNativeSymbols() {
    if (typeof origSymbol !== "function") {
      return false;
    }
    if (typeof Symbol !== "function") {
      return false;
    }
    if (typeof origSymbol("foo") !== "symbol") {
      return false;
    }
    if (typeof Symbol("bar") !== "symbol") {
      return false;
    }
    return hasSymbolSham();
  };
  return hasSymbols;
}
var hasProto;
var hasRequiredHasProto;
function requireHasProto() {
  if (hasRequiredHasProto)
    return hasProto;
  hasRequiredHasProto = 1;
  var test = {
    foo: {}
  };
  var $Object = Object;
  hasProto = function hasProto2() {
    return { __proto__: test }.foo === test.foo && !({ __proto__: null } instanceof $Object);
  };
  return hasProto;
}
var implementation;
var hasRequiredImplementation;
function requireImplementation() {
  if (hasRequiredImplementation)
    return implementation;
  hasRequiredImplementation = 1;
  var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
  var toStr = Object.prototype.toString;
  var max = Math.max;
  var funcType = "[object Function]";
  var concatty = function concatty2(a, b) {
    var arr = [];
    for (var i = 0; i < a.length; i += 1) {
      arr[i] = a[i];
    }
    for (var j = 0; j < b.length; j += 1) {
      arr[j + a.length] = b[j];
    }
    return arr;
  };
  var slicy = function slicy2(arrLike, offset) {
    var arr = [];
    for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
      arr[j] = arrLike[i];
    }
    return arr;
  };
  var joiny = function(arr, joiner) {
    var str = "";
    for (var i = 0; i < arr.length; i += 1) {
      str += arr[i];
      if (i + 1 < arr.length) {
        str += joiner;
      }
    }
    return str;
  };
  implementation = function bind(that) {
    var target = this;
    if (typeof target !== "function" || toStr.apply(target) !== funcType) {
      throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slicy(arguments, 1);
    var bound;
    var binder = function() {
      if (this instanceof bound) {
        var result = target.apply(
          this,
          concatty(args, arguments)
        );
        if (Object(result) === result) {
          return result;
        }
        return this;
      }
      return target.apply(
        that,
        concatty(args, arguments)
      );
    };
    var boundLength = max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
      boundArgs[i] = "$" + i;
    }
    bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
    if (target.prototype) {
      var Empty = function Empty2() {
      };
      Empty.prototype = target.prototype;
      bound.prototype = new Empty();
      Empty.prototype = null;
    }
    return bound;
  };
  return implementation;
}
var functionBind;
var hasRequiredFunctionBind;
function requireFunctionBind() {
  if (hasRequiredFunctionBind)
    return functionBind;
  hasRequiredFunctionBind = 1;
  var implementation2 = requireImplementation();
  functionBind = Function.prototype.bind || implementation2;
  return functionBind;
}
var hasown;
var hasRequiredHasown;
function requireHasown() {
  if (hasRequiredHasown)
    return hasown;
  hasRequiredHasown = 1;
  var call = Function.prototype.call;
  var $hasOwn = Object.prototype.hasOwnProperty;
  var bind = requireFunctionBind();
  hasown = bind.call(call, $hasOwn);
  return hasown;
}
var getIntrinsic;
var hasRequiredGetIntrinsic;
function requireGetIntrinsic() {
  if (hasRequiredGetIntrinsic)
    return getIntrinsic;
  hasRequiredGetIntrinsic = 1;
  var undefined$1;
  var $SyntaxError = SyntaxError;
  var $Function = Function;
  var $TypeError = TypeError;
  var getEvalledConstructor = function(expressionSyntax) {
    try {
      return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
    } catch (e) {
    }
  };
  var $gOPD = Object.getOwnPropertyDescriptor;
  if ($gOPD) {
    try {
      $gOPD({}, "");
    } catch (e) {
      $gOPD = null;
    }
  }
  var throwTypeError = function() {
    throw new $TypeError();
  };
  var ThrowTypeError = $gOPD ? function() {
    try {
      arguments.callee;
      return throwTypeError;
    } catch (calleeThrows) {
      try {
        return $gOPD(arguments, "callee").get;
      } catch (gOPDthrows) {
        return throwTypeError;
      }
    }
  }() : throwTypeError;
  var hasSymbols2 = requireHasSymbols()();
  var hasProto2 = requireHasProto()();
  var getProto = Object.getPrototypeOf || (hasProto2 ? function(x) {
    return x.__proto__;
  } : null);
  var needsEval = {};
  var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined$1 : getProto(Uint8Array);
  var INTRINSICS = {
    "%AggregateError%": typeof AggregateError === "undefined" ? undefined$1 : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined$1 : ArrayBuffer,
    "%ArrayIteratorPrototype%": hasSymbols2 && getProto ? getProto([][Symbol.iterator]()) : undefined$1,
    "%AsyncFromSyncIteratorPrototype%": undefined$1,
    "%AsyncFunction%": needsEval,
    "%AsyncGenerator%": needsEval,
    "%AsyncGeneratorFunction%": needsEval,
    "%AsyncIteratorPrototype%": needsEval,
    "%Atomics%": typeof Atomics === "undefined" ? undefined$1 : Atomics,
    "%BigInt%": typeof BigInt === "undefined" ? undefined$1 : BigInt,
    "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined$1 : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined$1 : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView === "undefined" ? undefined$1 : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": Error,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": EvalError,
    "%Float32Array%": typeof Float32Array === "undefined" ? undefined$1 : Float32Array,
    "%Float64Array%": typeof Float64Array === "undefined" ? undefined$1 : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined$1 : FinalizationRegistry,
    "%Function%": $Function,
    "%GeneratorFunction%": needsEval,
    "%Int8Array%": typeof Int8Array === "undefined" ? undefined$1 : Int8Array,
    "%Int16Array%": typeof Int16Array === "undefined" ? undefined$1 : Int16Array,
    "%Int32Array%": typeof Int32Array === "undefined" ? undefined$1 : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": hasSymbols2 && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined$1,
    "%JSON%": typeof JSON === "object" ? JSON : undefined$1,
    "%Map%": typeof Map === "undefined" ? undefined$1 : Map,
    "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols2 || !getProto ? undefined$1 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": Object,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise === "undefined" ? undefined$1 : Promise,
    "%Proxy%": typeof Proxy === "undefined" ? undefined$1 : Proxy,
    "%RangeError%": RangeError,
    "%ReferenceError%": ReferenceError,
    "%Reflect%": typeof Reflect === "undefined" ? undefined$1 : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set === "undefined" ? undefined$1 : Set,
    "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols2 || !getProto ? undefined$1 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined$1 : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": hasSymbols2 && getProto ? getProto(""[Symbol.iterator]()) : undefined$1,
    "%Symbol%": hasSymbols2 ? Symbol : undefined$1,
    "%SyntaxError%": $SyntaxError,
    "%ThrowTypeError%": ThrowTypeError,
    "%TypedArray%": TypedArray,
    "%TypeError%": $TypeError,
    "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined$1 : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined$1 : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined$1 : Uint16Array,
    "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined$1 : Uint32Array,
    "%URIError%": URIError,
    "%WeakMap%": typeof WeakMap === "undefined" ? undefined$1 : WeakMap,
    "%WeakRef%": typeof WeakRef === "undefined" ? undefined$1 : WeakRef,
    "%WeakSet%": typeof WeakSet === "undefined" ? undefined$1 : WeakSet
  };
  if (getProto) {
    try {
      null.error;
    } catch (e) {
      var errorProto = getProto(getProto(e));
      INTRINSICS["%Error.prototype%"] = errorProto;
    }
  }
  var doEval = function doEval2(name2) {
    var value;
    if (name2 === "%AsyncFunction%") {
      value = getEvalledConstructor("async function () {}");
    } else if (name2 === "%GeneratorFunction%") {
      value = getEvalledConstructor("function* () {}");
    } else if (name2 === "%AsyncGeneratorFunction%") {
      value = getEvalledConstructor("async function* () {}");
    } else if (name2 === "%AsyncGenerator%") {
      var fn = doEval2("%AsyncGeneratorFunction%");
      if (fn) {
        value = fn.prototype;
      }
    } else if (name2 === "%AsyncIteratorPrototype%") {
      var gen = doEval2("%AsyncGenerator%");
      if (gen && getProto) {
        value = getProto(gen.prototype);
      }
    }
    INTRINSICS[name2] = value;
    return value;
  };
  var LEGACY_ALIASES = {
    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
    "%ArrayPrototype%": ["Array", "prototype"],
    "%ArrayProto_entries%": ["Array", "prototype", "entries"],
    "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
    "%ArrayProto_keys%": ["Array", "prototype", "keys"],
    "%ArrayProto_values%": ["Array", "prototype", "values"],
    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
    "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
    "%BooleanPrototype%": ["Boolean", "prototype"],
    "%DataViewPrototype%": ["DataView", "prototype"],
    "%DatePrototype%": ["Date", "prototype"],
    "%ErrorPrototype%": ["Error", "prototype"],
    "%EvalErrorPrototype%": ["EvalError", "prototype"],
    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
    "%FunctionPrototype%": ["Function", "prototype"],
    "%Generator%": ["GeneratorFunction", "prototype"],
    "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
    "%JSONParse%": ["JSON", "parse"],
    "%JSONStringify%": ["JSON", "stringify"],
    "%MapPrototype%": ["Map", "prototype"],
    "%NumberPrototype%": ["Number", "prototype"],
    "%ObjectPrototype%": ["Object", "prototype"],
    "%ObjProto_toString%": ["Object", "prototype", "toString"],
    "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
    "%PromisePrototype%": ["Promise", "prototype"],
    "%PromiseProto_then%": ["Promise", "prototype", "then"],
    "%Promise_all%": ["Promise", "all"],
    "%Promise_reject%": ["Promise", "reject"],
    "%Promise_resolve%": ["Promise", "resolve"],
    "%RangeErrorPrototype%": ["RangeError", "prototype"],
    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
    "%RegExpPrototype%": ["RegExp", "prototype"],
    "%SetPrototype%": ["Set", "prototype"],
    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
    "%StringPrototype%": ["String", "prototype"],
    "%SymbolPrototype%": ["Symbol", "prototype"],
    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
    "%TypeErrorPrototype%": ["TypeError", "prototype"],
    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
    "%URIErrorPrototype%": ["URIError", "prototype"],
    "%WeakMapPrototype%": ["WeakMap", "prototype"],
    "%WeakSetPrototype%": ["WeakSet", "prototype"]
  };
  var bind = requireFunctionBind();
  var hasOwn = requireHasown();
  var $concat = bind.call(Function.call, Array.prototype.concat);
  var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
  var $replace = bind.call(Function.call, String.prototype.replace);
  var $strSlice = bind.call(Function.call, String.prototype.slice);
  var $exec = bind.call(Function.call, RegExp.prototype.exec);
  var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
  var reEscapeChar = /\\(\\)?/g;
  var stringToPath = function stringToPath2(string) {
    var first = $strSlice(string, 0, 1);
    var last = $strSlice(string, -1);
    if (first === "%" && last !== "%") {
      throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
    } else if (last === "%" && first !== "%") {
      throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
    }
    var result = [];
    $replace(string, rePropName, function(match, number, quote, subString) {
      result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
    });
    return result;
  };
  var getBaseIntrinsic = function getBaseIntrinsic2(name2, allowMissing) {
    var intrinsicName = name2;
    var alias;
    if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
      alias = LEGACY_ALIASES[intrinsicName];
      intrinsicName = "%" + alias[0] + "%";
    }
    if (hasOwn(INTRINSICS, intrinsicName)) {
      var value = INTRINSICS[intrinsicName];
      if (value === needsEval) {
        value = doEval(intrinsicName);
      }
      if (typeof value === "undefined" && !allowMissing) {
        throw new $TypeError("intrinsic " + name2 + " exists, but is not available. Please file an issue!");
      }
      return {
        alias,
        name: intrinsicName,
        value
      };
    }
    throw new $SyntaxError("intrinsic " + name2 + " does not exist!");
  };
  getIntrinsic = function GetIntrinsic(name2, allowMissing) {
    if (typeof name2 !== "string" || name2.length === 0) {
      throw new $TypeError("intrinsic name must be a non-empty string");
    }
    if (arguments.length > 1 && typeof allowMissing !== "boolean") {
      throw new $TypeError('"allowMissing" argument must be a boolean');
    }
    if ($exec(/^%?[^%]*%?$/, name2) === null) {
      throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    }
    var parts = stringToPath(name2);
    var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
    var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
    var intrinsicRealName = intrinsic.name;
    var value = intrinsic.value;
    var skipFurtherCaching = false;
    var alias = intrinsic.alias;
    if (alias) {
      intrinsicBaseName = alias[0];
      $spliceApply(parts, $concat([0, 1], alias));
    }
    for (var i = 1, isOwn = true; i < parts.length; i += 1) {
      var part = parts[i];
      var first = $strSlice(part, 0, 1);
      var last = $strSlice(part, -1);
      if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
        throw new $SyntaxError("property names with quotes must have matching quotes");
      }
      if (part === "constructor" || !isOwn) {
        skipFurtherCaching = true;
      }
      intrinsicBaseName += "." + part;
      intrinsicRealName = "%" + intrinsicBaseName + "%";
      if (hasOwn(INTRINSICS, intrinsicRealName)) {
        value = INTRINSICS[intrinsicRealName];
      } else if (value != null) {
        if (!(part in value)) {
          if (!allowMissing) {
            throw new $TypeError("base intrinsic for " + name2 + " exists, but the property is not available.");
          }
          return void 0;
        }
        if ($gOPD && i + 1 >= parts.length) {
          var desc = $gOPD(value, part);
          isOwn = !!desc;
          if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
            value = desc.get;
          } else {
            value = value[part];
          }
        } else {
          isOwn = hasOwn(value, part);
          value = value[part];
        }
        if (isOwn && !skipFurtherCaching) {
          INTRINSICS[intrinsicRealName] = value;
        }
      }
    }
    return value;
  };
  return getIntrinsic;
}
var callBind = { exports: {} };
var hasPropertyDescriptors_1;
var hasRequiredHasPropertyDescriptors;
function requireHasPropertyDescriptors() {
  if (hasRequiredHasPropertyDescriptors)
    return hasPropertyDescriptors_1;
  hasRequiredHasPropertyDescriptors = 1;
  var GetIntrinsic = requireGetIntrinsic();
  var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
  var hasPropertyDescriptors = function hasPropertyDescriptors2() {
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", { value: 1 });
        return true;
      } catch (e) {
        return false;
      }
    }
    return false;
  };
  hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
    if (!hasPropertyDescriptors()) {
      return null;
    }
    try {
      return $defineProperty([], "length", { value: 1 }).length !== 1;
    } catch (e) {
      return true;
    }
  };
  hasPropertyDescriptors_1 = hasPropertyDescriptors;
  return hasPropertyDescriptors_1;
}
var gopd;
var hasRequiredGopd;
function requireGopd() {
  if (hasRequiredGopd)
    return gopd;
  hasRequiredGopd = 1;
  var GetIntrinsic = requireGetIntrinsic();
  var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%", true);
  if ($gOPD) {
    try {
      $gOPD([], "length");
    } catch (e) {
      $gOPD = null;
    }
  }
  gopd = $gOPD;
  return gopd;
}
var defineDataProperty;
var hasRequiredDefineDataProperty;
function requireDefineDataProperty() {
  if (hasRequiredDefineDataProperty)
    return defineDataProperty;
  hasRequiredDefineDataProperty = 1;
  var hasPropertyDescriptors = requireHasPropertyDescriptors()();
  var GetIntrinsic = requireGetIntrinsic();
  var $defineProperty = hasPropertyDescriptors && GetIntrinsic("%Object.defineProperty%", true);
  if ($defineProperty) {
    try {
      $defineProperty({}, "a", { value: 1 });
    } catch (e) {
      $defineProperty = false;
    }
  }
  var $SyntaxError = GetIntrinsic("%SyntaxError%");
  var $TypeError = GetIntrinsic("%TypeError%");
  var gopd2 = requireGopd();
  defineDataProperty = function defineDataProperty2(obj, property, value) {
    if (!obj || typeof obj !== "object" && typeof obj !== "function") {
      throw new $TypeError("`obj` must be an object or a function`");
    }
    if (typeof property !== "string" && typeof property !== "symbol") {
      throw new $TypeError("`property` must be a string or a symbol`");
    }
    if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null) {
      throw new $TypeError("`nonEnumerable`, if provided, must be a boolean or null");
    }
    if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null) {
      throw new $TypeError("`nonWritable`, if provided, must be a boolean or null");
    }
    if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null) {
      throw new $TypeError("`nonConfigurable`, if provided, must be a boolean or null");
    }
    if (arguments.length > 6 && typeof arguments[6] !== "boolean") {
      throw new $TypeError("`loose`, if provided, must be a boolean");
    }
    var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
    var nonWritable = arguments.length > 4 ? arguments[4] : null;
    var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
    var loose = arguments.length > 6 ? arguments[6] : false;
    var desc = !!gopd2 && gopd2(obj, property);
    if ($defineProperty) {
      $defineProperty(obj, property, {
        configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
        enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
        value,
        writable: nonWritable === null && desc ? desc.writable : !nonWritable
      });
    } else if (loose || !nonEnumerable && !nonWritable && !nonConfigurable) {
      obj[property] = value;
    } else {
      throw new $SyntaxError("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
    }
  };
  return defineDataProperty;
}
var setFunctionLength;
var hasRequiredSetFunctionLength;
function requireSetFunctionLength() {
  if (hasRequiredSetFunctionLength)
    return setFunctionLength;
  hasRequiredSetFunctionLength = 1;
  var GetIntrinsic = requireGetIntrinsic();
  var define = requireDefineDataProperty();
  var hasDescriptors = requireHasPropertyDescriptors()();
  var gOPD = requireGopd();
  var $TypeError = GetIntrinsic("%TypeError%");
  var $floor = GetIntrinsic("%Math.floor%");
  setFunctionLength = function setFunctionLength2(fn, length) {
    if (typeof fn !== "function") {
      throw new $TypeError("`fn` is not a function");
    }
    if (typeof length !== "number" || length < 0 || length > 4294967295 || $floor(length) !== length) {
      throw new $TypeError("`length` must be a positive 32-bit integer");
    }
    var loose = arguments.length > 2 && !!arguments[2];
    var functionLengthIsConfigurable = true;
    var functionLengthIsWritable = true;
    if ("length" in fn && gOPD) {
      var desc = gOPD(fn, "length");
      if (desc && !desc.configurable) {
        functionLengthIsConfigurable = false;
      }
      if (desc && !desc.writable) {
        functionLengthIsWritable = false;
      }
    }
    if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
      if (hasDescriptors) {
        define(fn, "length", length, true, true);
      } else {
        define(fn, "length", length);
      }
    }
    return fn;
  };
  return setFunctionLength;
}
var hasRequiredCallBind;
function requireCallBind() {
  if (hasRequiredCallBind)
    return callBind.exports;
  hasRequiredCallBind = 1;
  (function(module) {
    var bind = requireFunctionBind();
    var GetIntrinsic = requireGetIntrinsic();
    var setFunctionLength2 = requireSetFunctionLength();
    var $TypeError = GetIntrinsic("%TypeError%");
    var $apply = GetIntrinsic("%Function.prototype.apply%");
    var $call = GetIntrinsic("%Function.prototype.call%");
    var $reflectApply = GetIntrinsic("%Reflect.apply%", true) || bind.call($call, $apply);
    var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
    var $max = GetIntrinsic("%Math.max%");
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", { value: 1 });
      } catch (e) {
        $defineProperty = null;
      }
    }
    module.exports = function callBind2(originalFunction) {
      if (typeof originalFunction !== "function") {
        throw new $TypeError("a function is required");
      }
      var func = $reflectApply(bind, $call, arguments);
      return setFunctionLength2(
        func,
        1 + $max(0, originalFunction.length - (arguments.length - 1)),
        true
      );
    };
    var applyBind = function applyBind2() {
      return $reflectApply(bind, $apply, arguments);
    };
    if ($defineProperty) {
      $defineProperty(module.exports, "apply", { value: applyBind });
    } else {
      module.exports.apply = applyBind;
    }
  })(callBind);
  return callBind.exports;
}
var callBound;
var hasRequiredCallBound;
function requireCallBound() {
  if (hasRequiredCallBound)
    return callBound;
  hasRequiredCallBound = 1;
  var GetIntrinsic = requireGetIntrinsic();
  var callBind2 = requireCallBind();
  var $indexOf = callBind2(GetIntrinsic("String.prototype.indexOf"));
  callBound = function callBoundIntrinsic(name2, allowMissing) {
    var intrinsic = GetIntrinsic(name2, !!allowMissing);
    if (typeof intrinsic === "function" && $indexOf(name2, ".prototype.") > -1) {
      return callBind2(intrinsic);
    }
    return intrinsic;
  };
  return callBound;
}
var isArguments;
var hasRequiredIsArguments;
function requireIsArguments() {
  if (hasRequiredIsArguments)
    return isArguments;
  hasRequiredIsArguments = 1;
  var hasToStringTag = requireShams()();
  var callBound2 = requireCallBound();
  var $toString = callBound2("Object.prototype.toString");
  var isStandardArguments = function isArguments2(value) {
    if (hasToStringTag && value && typeof value === "object" && Symbol.toStringTag in value) {
      return false;
    }
    return $toString(value) === "[object Arguments]";
  };
  var isLegacyArguments = function isArguments2(value) {
    if (isStandardArguments(value)) {
      return true;
    }
    return value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && $toString(value) !== "[object Array]" && $toString(value.callee) === "[object Function]";
  };
  var supportsStandardArguments = function() {
    return isStandardArguments(arguments);
  }();
  isStandardArguments.isLegacyArguments = isLegacyArguments;
  isArguments = supportsStandardArguments ? isStandardArguments : isLegacyArguments;
  return isArguments;
}
var isGeneratorFunction;
var hasRequiredIsGeneratorFunction;
function requireIsGeneratorFunction() {
  if (hasRequiredIsGeneratorFunction)
    return isGeneratorFunction;
  hasRequiredIsGeneratorFunction = 1;
  var toStr = Object.prototype.toString;
  var fnToStr = Function.prototype.toString;
  var isFnRegex = /^\s*(?:function)?\*/;
  var hasToStringTag = requireShams()();
  var getProto = Object.getPrototypeOf;
  var getGeneratorFunc = function() {
    if (!hasToStringTag) {
      return false;
    }
    try {
      return Function("return function*() {}")();
    } catch (e) {
    }
  };
  var GeneratorFunction;
  isGeneratorFunction = function isGeneratorFunction2(fn) {
    if (typeof fn !== "function") {
      return false;
    }
    if (isFnRegex.test(fnToStr.call(fn))) {
      return true;
    }
    if (!hasToStringTag) {
      var str = toStr.call(fn);
      return str === "[object GeneratorFunction]";
    }
    if (!getProto) {
      return false;
    }
    if (typeof GeneratorFunction === "undefined") {
      var generatorFunc = getGeneratorFunc();
      GeneratorFunction = generatorFunc ? getProto(generatorFunc) : false;
    }
    return getProto(fn) === GeneratorFunction;
  };
  return isGeneratorFunction;
}
var isCallable;
var hasRequiredIsCallable;
function requireIsCallable() {
  if (hasRequiredIsCallable)
    return isCallable;
  hasRequiredIsCallable = 1;
  var fnToStr = Function.prototype.toString;
  var reflectApply = typeof Reflect === "object" && Reflect !== null && Reflect.apply;
  var badArrayLike;
  var isCallableMarker;
  if (typeof reflectApply === "function" && typeof Object.defineProperty === "function") {
    try {
      badArrayLike = Object.defineProperty({}, "length", {
        get: function() {
          throw isCallableMarker;
        }
      });
      isCallableMarker = {};
      reflectApply(function() {
        throw 42;
      }, null, badArrayLike);
    } catch (_) {
      if (_ !== isCallableMarker) {
        reflectApply = null;
      }
    }
  } else {
    reflectApply = null;
  }
  var constructorRegex = /^\s*class\b/;
  var isES6ClassFn = function isES6ClassFunction(value) {
    try {
      var fnStr = fnToStr.call(value);
      return constructorRegex.test(fnStr);
    } catch (e) {
      return false;
    }
  };
  var tryFunctionObject = function tryFunctionToStr(value) {
    try {
      if (isES6ClassFn(value)) {
        return false;
      }
      fnToStr.call(value);
      return true;
    } catch (e) {
      return false;
    }
  };
  var toStr = Object.prototype.toString;
  var objectClass = "[object Object]";
  var fnClass = "[object Function]";
  var genClass = "[object GeneratorFunction]";
  var ddaClass = "[object HTMLAllCollection]";
  var ddaClass2 = "[object HTML document.all class]";
  var ddaClass3 = "[object HTMLCollection]";
  var hasToStringTag = typeof Symbol === "function" && !!Symbol.toStringTag;
  var isIE68 = !(0 in [,]);
  var isDDA = function isDocumentDotAll() {
    return false;
  };
  if (typeof document === "object") {
    var all = document.all;
    if (toStr.call(all) === toStr.call(document.all)) {
      isDDA = function isDocumentDotAll(value) {
        if ((isIE68 || !value) && (typeof value === "undefined" || typeof value === "object")) {
          try {
            var str = toStr.call(value);
            return (str === ddaClass || str === ddaClass2 || str === ddaClass3 || str === objectClass) && value("") == null;
          } catch (e) {
          }
        }
        return false;
      };
    }
  }
  isCallable = reflectApply ? function isCallable2(value) {
    if (isDDA(value)) {
      return true;
    }
    if (!value) {
      return false;
    }
    if (typeof value !== "function" && typeof value !== "object") {
      return false;
    }
    try {
      reflectApply(value, null, badArrayLike);
    } catch (e) {
      if (e !== isCallableMarker) {
        return false;
      }
    }
    return !isES6ClassFn(value) && tryFunctionObject(value);
  } : function isCallable2(value) {
    if (isDDA(value)) {
      return true;
    }
    if (!value) {
      return false;
    }
    if (typeof value !== "function" && typeof value !== "object") {
      return false;
    }
    if (hasToStringTag) {
      return tryFunctionObject(value);
    }
    if (isES6ClassFn(value)) {
      return false;
    }
    var strClass = toStr.call(value);
    if (strClass !== fnClass && strClass !== genClass && !/^\[object HTML/.test(strClass)) {
      return false;
    }
    return tryFunctionObject(value);
  };
  return isCallable;
}
var forEach_1;
var hasRequiredForEach;
function requireForEach() {
  if (hasRequiredForEach)
    return forEach_1;
  hasRequiredForEach = 1;
  var isCallable2 = requireIsCallable();
  var toStr = Object.prototype.toString;
  var hasOwnProperty2 = Object.prototype.hasOwnProperty;
  var forEachArray = function forEachArray2(array, iterator, receiver) {
    for (var i = 0, len = array.length; i < len; i++) {
      if (hasOwnProperty2.call(array, i)) {
        if (receiver == null) {
          iterator(array[i], i, array);
        } else {
          iterator.call(receiver, array[i], i, array);
        }
      }
    }
  };
  var forEachString = function forEachString2(string, iterator, receiver) {
    for (var i = 0, len = string.length; i < len; i++) {
      if (receiver == null) {
        iterator(string.charAt(i), i, string);
      } else {
        iterator.call(receiver, string.charAt(i), i, string);
      }
    }
  };
  var forEachObject = function forEachObject2(object, iterator, receiver) {
    for (var k in object) {
      if (hasOwnProperty2.call(object, k)) {
        if (receiver == null) {
          iterator(object[k], k, object);
        } else {
          iterator.call(receiver, object[k], k, object);
        }
      }
    }
  };
  var forEach = function forEach2(list, iterator, thisArg) {
    if (!isCallable2(iterator)) {
      throw new TypeError("iterator must be a function");
    }
    var receiver;
    if (arguments.length >= 3) {
      receiver = thisArg;
    }
    if (toStr.call(list) === "[object Array]") {
      forEachArray(list, iterator, receiver);
    } else if (typeof list === "string") {
      forEachString(list, iterator, receiver);
    } else {
      forEachObject(list, iterator, receiver);
    }
  };
  forEach_1 = forEach;
  return forEach_1;
}
var availableTypedArrays;
var hasRequiredAvailableTypedArrays;
function requireAvailableTypedArrays() {
  if (hasRequiredAvailableTypedArrays)
    return availableTypedArrays;
  hasRequiredAvailableTypedArrays = 1;
  var possibleNames = [
    "BigInt64Array",
    "BigUint64Array",
    "Float32Array",
    "Float64Array",
    "Int16Array",
    "Int32Array",
    "Int8Array",
    "Uint16Array",
    "Uint32Array",
    "Uint8Array",
    "Uint8ClampedArray"
  ];
  var g = typeof globalThis === "undefined" ? commonjsGlobal : globalThis;
  availableTypedArrays = function availableTypedArrays2() {
    var out = [];
    for (var i = 0; i < possibleNames.length; i++) {
      if (typeof g[possibleNames[i]] === "function") {
        out[out.length] = possibleNames[i];
      }
    }
    return out;
  };
  return availableTypedArrays;
}
var whichTypedArray;
var hasRequiredWhichTypedArray;
function requireWhichTypedArray() {
  if (hasRequiredWhichTypedArray)
    return whichTypedArray;
  hasRequiredWhichTypedArray = 1;
  var forEach = requireForEach();
  var availableTypedArrays2 = requireAvailableTypedArrays();
  var callBind2 = requireCallBind();
  var callBound2 = requireCallBound();
  var gOPD = requireGopd();
  var $toString = callBound2("Object.prototype.toString");
  var hasToStringTag = requireShams()();
  var g = typeof globalThis === "undefined" ? commonjsGlobal : globalThis;
  var typedArrays = availableTypedArrays2();
  var $slice = callBound2("String.prototype.slice");
  var getPrototypeOf = Object.getPrototypeOf;
  var $indexOf = callBound2("Array.prototype.indexOf", true) || function indexOf(array, value) {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i] === value) {
        return i;
      }
    }
    return -1;
  };
  var cache = { __proto__: null };
  if (hasToStringTag && gOPD && getPrototypeOf) {
    forEach(typedArrays, function(typedArray) {
      var arr = new g[typedArray]();
      if (Symbol.toStringTag in arr) {
        var proto = getPrototypeOf(arr);
        var descriptor = gOPD(proto, Symbol.toStringTag);
        if (!descriptor) {
          var superProto = getPrototypeOf(proto);
          descriptor = gOPD(superProto, Symbol.toStringTag);
        }
        cache["$" + typedArray] = callBind2(descriptor.get);
      }
    });
  } else {
    forEach(typedArrays, function(typedArray) {
      var arr = new g[typedArray]();
      var fn = arr.slice || arr.set;
      if (fn) {
        cache["$" + typedArray] = callBind2(fn);
      }
    });
  }
  var tryTypedArrays = function tryAllTypedArrays(value) {
    var found = false;
    forEach(cache, function(getter, typedArray) {
      if (!found) {
        try {
          if ("$" + getter(value) === typedArray) {
            found = $slice(typedArray, 1);
          }
        } catch (e) {
        }
      }
    });
    return found;
  };
  var trySlices = function tryAllSlices(value) {
    var found = false;
    forEach(cache, function(getter, name2) {
      if (!found) {
        try {
          getter(value);
          found = $slice(name2, 1);
        } catch (e) {
        }
      }
    });
    return found;
  };
  whichTypedArray = function whichTypedArray2(value) {
    if (!value || typeof value !== "object") {
      return false;
    }
    if (!hasToStringTag) {
      var tag = $slice($toString(value), 8, -1);
      if ($indexOf(typedArrays, tag) > -1) {
        return tag;
      }
      if (tag !== "Object") {
        return false;
      }
      return trySlices(value);
    }
    if (!gOPD) {
      return null;
    }
    return tryTypedArrays(value);
  };
  return whichTypedArray;
}
var isTypedArray;
var hasRequiredIsTypedArray;
function requireIsTypedArray() {
  if (hasRequiredIsTypedArray)
    return isTypedArray;
  hasRequiredIsTypedArray = 1;
  var whichTypedArray2 = requireWhichTypedArray();
  isTypedArray = function isTypedArray2(value) {
    return !!whichTypedArray2(value);
  };
  return isTypedArray;
}
var hasRequiredTypes;
function requireTypes() {
  if (hasRequiredTypes)
    return types;
  hasRequiredTypes = 1;
  (function(exports) {
    var isArgumentsObject = requireIsArguments();
    var isGeneratorFunction2 = requireIsGeneratorFunction();
    var whichTypedArray2 = requireWhichTypedArray();
    var isTypedArray2 = requireIsTypedArray();
    function uncurryThis(f) {
      return f.call.bind(f);
    }
    var BigIntSupported = typeof BigInt !== "undefined";
    var SymbolSupported = typeof Symbol !== "undefined";
    var ObjectToString = uncurryThis(Object.prototype.toString);
    var numberValue = uncurryThis(Number.prototype.valueOf);
    var stringValue = uncurryThis(String.prototype.valueOf);
    var booleanValue = uncurryThis(Boolean.prototype.valueOf);
    if (BigIntSupported) {
      var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
    }
    if (SymbolSupported) {
      var symbolValue = uncurryThis(Symbol.prototype.valueOf);
    }
    function checkBoxedPrimitive(value, prototypeValueOf) {
      if (typeof value !== "object") {
        return false;
      }
      try {
        prototypeValueOf(value);
        return true;
      } catch (e) {
        return false;
      }
    }
    exports.isArgumentsObject = isArgumentsObject;
    exports.isGeneratorFunction = isGeneratorFunction2;
    exports.isTypedArray = isTypedArray2;
    function isPromise(input) {
      return typeof Promise !== "undefined" && input instanceof Promise || input !== null && typeof input === "object" && typeof input.then === "function" && typeof input.catch === "function";
    }
    exports.isPromise = isPromise;
    function isArrayBufferView(value) {
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        return ArrayBuffer.isView(value);
      }
      return isTypedArray2(value) || isDataView(value);
    }
    exports.isArrayBufferView = isArrayBufferView;
    function isUint8Array(value) {
      return whichTypedArray2(value) === "Uint8Array";
    }
    exports.isUint8Array = isUint8Array;
    function isUint8ClampedArray(value) {
      return whichTypedArray2(value) === "Uint8ClampedArray";
    }
    exports.isUint8ClampedArray = isUint8ClampedArray;
    function isUint16Array(value) {
      return whichTypedArray2(value) === "Uint16Array";
    }
    exports.isUint16Array = isUint16Array;
    function isUint32Array(value) {
      return whichTypedArray2(value) === "Uint32Array";
    }
    exports.isUint32Array = isUint32Array;
    function isInt8Array(value) {
      return whichTypedArray2(value) === "Int8Array";
    }
    exports.isInt8Array = isInt8Array;
    function isInt16Array(value) {
      return whichTypedArray2(value) === "Int16Array";
    }
    exports.isInt16Array = isInt16Array;
    function isInt32Array(value) {
      return whichTypedArray2(value) === "Int32Array";
    }
    exports.isInt32Array = isInt32Array;
    function isFloat32Array(value) {
      return whichTypedArray2(value) === "Float32Array";
    }
    exports.isFloat32Array = isFloat32Array;
    function isFloat64Array(value) {
      return whichTypedArray2(value) === "Float64Array";
    }
    exports.isFloat64Array = isFloat64Array;
    function isBigInt64Array(value) {
      return whichTypedArray2(value) === "BigInt64Array";
    }
    exports.isBigInt64Array = isBigInt64Array;
    function isBigUint64Array(value) {
      return whichTypedArray2(value) === "BigUint64Array";
    }
    exports.isBigUint64Array = isBigUint64Array;
    function isMapToString(value) {
      return ObjectToString(value) === "[object Map]";
    }
    isMapToString.working = typeof Map !== "undefined" && isMapToString(/* @__PURE__ */ new Map());
    function isMap(value) {
      if (typeof Map === "undefined") {
        return false;
      }
      return isMapToString.working ? isMapToString(value) : value instanceof Map;
    }
    exports.isMap = isMap;
    function isSetToString(value) {
      return ObjectToString(value) === "[object Set]";
    }
    isSetToString.working = typeof Set !== "undefined" && isSetToString(/* @__PURE__ */ new Set());
    function isSet(value) {
      if (typeof Set === "undefined") {
        return false;
      }
      return isSetToString.working ? isSetToString(value) : value instanceof Set;
    }
    exports.isSet = isSet;
    function isWeakMapToString(value) {
      return ObjectToString(value) === "[object WeakMap]";
    }
    isWeakMapToString.working = typeof WeakMap !== "undefined" && isWeakMapToString(/* @__PURE__ */ new WeakMap());
    function isWeakMap(value) {
      if (typeof WeakMap === "undefined") {
        return false;
      }
      return isWeakMapToString.working ? isWeakMapToString(value) : value instanceof WeakMap;
    }
    exports.isWeakMap = isWeakMap;
    function isWeakSetToString(value) {
      return ObjectToString(value) === "[object WeakSet]";
    }
    isWeakSetToString.working = typeof WeakSet !== "undefined" && isWeakSetToString(/* @__PURE__ */ new WeakSet());
    function isWeakSet(value) {
      return isWeakSetToString(value);
    }
    exports.isWeakSet = isWeakSet;
    function isArrayBufferToString(value) {
      return ObjectToString(value) === "[object ArrayBuffer]";
    }
    isArrayBufferToString.working = typeof ArrayBuffer !== "undefined" && isArrayBufferToString(new ArrayBuffer());
    function isArrayBuffer(value) {
      if (typeof ArrayBuffer === "undefined") {
        return false;
      }
      return isArrayBufferToString.working ? isArrayBufferToString(value) : value instanceof ArrayBuffer;
    }
    exports.isArrayBuffer = isArrayBuffer;
    function isDataViewToString(value) {
      return ObjectToString(value) === "[object DataView]";
    }
    isDataViewToString.working = typeof ArrayBuffer !== "undefined" && typeof DataView !== "undefined" && isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1));
    function isDataView(value) {
      if (typeof DataView === "undefined") {
        return false;
      }
      return isDataViewToString.working ? isDataViewToString(value) : value instanceof DataView;
    }
    exports.isDataView = isDataView;
    var SharedArrayBufferCopy = typeof SharedArrayBuffer !== "undefined" ? SharedArrayBuffer : void 0;
    function isSharedArrayBufferToString(value) {
      return ObjectToString(value) === "[object SharedArrayBuffer]";
    }
    function isSharedArrayBuffer(value) {
      if (typeof SharedArrayBufferCopy === "undefined") {
        return false;
      }
      if (typeof isSharedArrayBufferToString.working === "undefined") {
        isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
      }
      return isSharedArrayBufferToString.working ? isSharedArrayBufferToString(value) : value instanceof SharedArrayBufferCopy;
    }
    exports.isSharedArrayBuffer = isSharedArrayBuffer;
    function isAsyncFunction(value) {
      return ObjectToString(value) === "[object AsyncFunction]";
    }
    exports.isAsyncFunction = isAsyncFunction;
    function isMapIterator(value) {
      return ObjectToString(value) === "[object Map Iterator]";
    }
    exports.isMapIterator = isMapIterator;
    function isSetIterator(value) {
      return ObjectToString(value) === "[object Set Iterator]";
    }
    exports.isSetIterator = isSetIterator;
    function isGeneratorObject(value) {
      return ObjectToString(value) === "[object Generator]";
    }
    exports.isGeneratorObject = isGeneratorObject;
    function isWebAssemblyCompiledModule(value) {
      return ObjectToString(value) === "[object WebAssembly.Module]";
    }
    exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;
    function isNumberObject(value) {
      return checkBoxedPrimitive(value, numberValue);
    }
    exports.isNumberObject = isNumberObject;
    function isStringObject(value) {
      return checkBoxedPrimitive(value, stringValue);
    }
    exports.isStringObject = isStringObject;
    function isBooleanObject(value) {
      return checkBoxedPrimitive(value, booleanValue);
    }
    exports.isBooleanObject = isBooleanObject;
    function isBigIntObject(value) {
      return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
    }
    exports.isBigIntObject = isBigIntObject;
    function isSymbolObject(value) {
      return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
    }
    exports.isSymbolObject = isSymbolObject;
    function isBoxedPrimitive(value) {
      return isNumberObject(value) || isStringObject(value) || isBooleanObject(value) || isBigIntObject(value) || isSymbolObject(value);
    }
    exports.isBoxedPrimitive = isBoxedPrimitive;
    function isAnyArrayBuffer(value) {
      return typeof Uint8Array !== "undefined" && (isArrayBuffer(value) || isSharedArrayBuffer(value));
    }
    exports.isAnyArrayBuffer = isAnyArrayBuffer;
    ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(method) {
      Object.defineProperty(exports, method, {
        enumerable: false,
        value: function() {
          throw new Error(method + " is not supported in userland");
        }
      });
    });
  })(types);
  return types;
}
var isBuffer;
var hasRequiredIsBuffer;
function requireIsBuffer() {
  if (hasRequiredIsBuffer)
    return isBuffer;
  hasRequiredIsBuffer = 1;
  isBuffer = function isBuffer2(arg) {
    return arg instanceof buffer$1.Buffer;
  };
  return isBuffer;
}
var hasRequiredUtil;
function requireUtil() {
  if (hasRequiredUtil)
    return util;
  hasRequiredUtil = 1;
  (function(exports) {
    var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors2(obj) {
      var keys = Object.keys(obj);
      var descriptors = {};
      for (var i = 0; i < keys.length; i++) {
        descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
      }
      return descriptors;
    };
    var formatRegExp = /%[sdj%]/g;
    exports.format = function(f) {
      if (!isString(f)) {
        var objects = [];
        for (var i = 0; i < arguments.length; i++) {
          objects.push(inspect(arguments[i]));
        }
        return objects.join(" ");
      }
      var i = 1;
      var args = arguments;
      var len = args.length;
      var str = String(f).replace(formatRegExp, function(x2) {
        if (x2 === "%%")
          return "%";
        if (i >= len)
          return x2;
        switch (x2) {
          case "%s":
            return String(args[i++]);
          case "%d":
            return Number(args[i++]);
          case "%j":
            try {
              return JSON.stringify(args[i++]);
            } catch (_) {
              return "[Circular]";
            }
          default:
            return x2;
        }
      });
      for (var x = args[i]; i < len; x = args[++i]) {
        if (isNull(x) || !isObject(x)) {
          str += " " + x;
        } else {
          str += " " + inspect(x);
        }
      }
      return str;
    };
    exports.deprecate = function(fn, msg) {
      if (typeof process !== "undefined" && process.noDeprecation === true) {
        return fn;
      }
      if (typeof process === "undefined") {
        return function() {
          return exports.deprecate(fn, msg).apply(this, arguments);
        };
      }
      var warned = false;
      function deprecated() {
        if (!warned) {
          if (process.throwDeprecation) {
            throw new Error(msg);
          } else if (process.traceDeprecation) {
            console.trace(msg);
          } else {
            console.error(msg);
          }
          warned = true;
        }
        return fn.apply(this, arguments);
      }
      return deprecated;
    };
    var debugs = {};
    var debugEnvRegex = /^$/;
    if (process.env.NODE_DEBUG) {
      var debugEnv = process.env.NODE_DEBUG;
      debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase();
      debugEnvRegex = new RegExp("^" + debugEnv + "$", "i");
    }
    exports.debuglog = function(set) {
      set = set.toUpperCase();
      if (!debugs[set]) {
        if (debugEnvRegex.test(set)) {
          var pid = process.pid;
          debugs[set] = function() {
            var msg = exports.format.apply(exports, arguments);
            console.error("%s %d: %s", set, pid, msg);
          };
        } else {
          debugs[set] = function() {
          };
        }
      }
      return debugs[set];
    };
    function inspect(obj, opts) {
      var ctx = {
        seen: [],
        stylize: stylizeNoColor
      };
      if (arguments.length >= 3)
        ctx.depth = arguments[2];
      if (arguments.length >= 4)
        ctx.colors = arguments[3];
      if (isBoolean(opts)) {
        ctx.showHidden = opts;
      } else if (opts) {
        exports._extend(ctx, opts);
      }
      if (isUndefined(ctx.showHidden))
        ctx.showHidden = false;
      if (isUndefined(ctx.depth))
        ctx.depth = 2;
      if (isUndefined(ctx.colors))
        ctx.colors = false;
      if (isUndefined(ctx.customInspect))
        ctx.customInspect = true;
      if (ctx.colors)
        ctx.stylize = stylizeWithColor;
      return formatValue(ctx, obj, ctx.depth);
    }
    exports.inspect = inspect;
    inspect.colors = {
      "bold": [1, 22],
      "italic": [3, 23],
      "underline": [4, 24],
      "inverse": [7, 27],
      "white": [37, 39],
      "grey": [90, 39],
      "black": [30, 39],
      "blue": [34, 39],
      "cyan": [36, 39],
      "green": [32, 39],
      "magenta": [35, 39],
      "red": [31, 39],
      "yellow": [33, 39]
    };
    inspect.styles = {
      "special": "cyan",
      "number": "yellow",
      "boolean": "yellow",
      "undefined": "grey",
      "null": "bold",
      "string": "green",
      "date": "magenta",
      // "name": intentionally not styling
      "regexp": "red"
    };
    function stylizeWithColor(str, styleType) {
      var style = inspect.styles[styleType];
      if (style) {
        return "\x1B[" + inspect.colors[style][0] + "m" + str + "\x1B[" + inspect.colors[style][1] + "m";
      } else {
        return str;
      }
    }
    function stylizeNoColor(str, styleType) {
      return str;
    }
    function arrayToHash(array) {
      var hash2 = {};
      array.forEach(function(val, idx) {
        hash2[val] = true;
      });
      return hash2;
    }
    function formatValue(ctx, value, recurseTimes) {
      if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect && // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
        var ret = value.inspect(recurseTimes, ctx);
        if (!isString(ret)) {
          ret = formatValue(ctx, ret, recurseTimes);
        }
        return ret;
      }
      var primitive = formatPrimitive(ctx, value);
      if (primitive) {
        return primitive;
      }
      var keys = Object.keys(value);
      var visibleKeys = arrayToHash(keys);
      if (ctx.showHidden) {
        keys = Object.getOwnPropertyNames(value);
      }
      if (isError(value) && (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) {
        return formatError(value);
      }
      if (keys.length === 0) {
        if (isFunction(value)) {
          var name2 = value.name ? ": " + value.name : "";
          return ctx.stylize("[Function" + name2 + "]", "special");
        }
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
        }
        if (isDate(value)) {
          return ctx.stylize(Date.prototype.toString.call(value), "date");
        }
        if (isError(value)) {
          return formatError(value);
        }
      }
      var base2 = "", array = false, braces = ["{", "}"];
      if (isArray2(value)) {
        array = true;
        braces = ["[", "]"];
      }
      if (isFunction(value)) {
        var n = value.name ? ": " + value.name : "";
        base2 = " [Function" + n + "]";
      }
      if (isRegExp(value)) {
        base2 = " " + RegExp.prototype.toString.call(value);
      }
      if (isDate(value)) {
        base2 = " " + Date.prototype.toUTCString.call(value);
      }
      if (isError(value)) {
        base2 = " " + formatError(value);
      }
      if (keys.length === 0 && (!array || value.length == 0)) {
        return braces[0] + base2 + braces[1];
      }
      if (recurseTimes < 0) {
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
        } else {
          return ctx.stylize("[Object]", "special");
        }
      }
      ctx.seen.push(value);
      var output;
      if (array) {
        output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
      } else {
        output = keys.map(function(key2) {
          return formatProperty(ctx, value, recurseTimes, visibleKeys, key2, array);
        });
      }
      ctx.seen.pop();
      return reduceToSingleString(output, base2, braces);
    }
    function formatPrimitive(ctx, value) {
      if (isUndefined(value))
        return ctx.stylize("undefined", "undefined");
      if (isString(value)) {
        var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
        return ctx.stylize(simple, "string");
      }
      if (isNumber(value))
        return ctx.stylize("" + value, "number");
      if (isBoolean(value))
        return ctx.stylize("" + value, "boolean");
      if (isNull(value))
        return ctx.stylize("null", "null");
    }
    function formatError(value) {
      return "[" + Error.prototype.toString.call(value) + "]";
    }
    function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
      var output = [];
      for (var i = 0, l = value.length; i < l; ++i) {
        if (hasOwnProperty2(value, String(i))) {
          output.push(formatProperty(
            ctx,
            value,
            recurseTimes,
            visibleKeys,
            String(i),
            true
          ));
        } else {
          output.push("");
        }
      }
      keys.forEach(function(key2) {
        if (!key2.match(/^\d+$/)) {
          output.push(formatProperty(
            ctx,
            value,
            recurseTimes,
            visibleKeys,
            key2,
            true
          ));
        }
      });
      return output;
    }
    function formatProperty(ctx, value, recurseTimes, visibleKeys, key2, array) {
      var name2, str, desc;
      desc = Object.getOwnPropertyDescriptor(value, key2) || { value: value[key2] };
      if (desc.get) {
        if (desc.set) {
          str = ctx.stylize("[Getter/Setter]", "special");
        } else {
          str = ctx.stylize("[Getter]", "special");
        }
      } else {
        if (desc.set) {
          str = ctx.stylize("[Setter]", "special");
        }
      }
      if (!hasOwnProperty2(visibleKeys, key2)) {
        name2 = "[" + key2 + "]";
      }
      if (!str) {
        if (ctx.seen.indexOf(desc.value) < 0) {
          if (isNull(recurseTimes)) {
            str = formatValue(ctx, desc.value, null);
          } else {
            str = formatValue(ctx, desc.value, recurseTimes - 1);
          }
          if (str.indexOf("\n") > -1) {
            if (array) {
              str = str.split("\n").map(function(line) {
                return "  " + line;
              }).join("\n").slice(2);
            } else {
              str = "\n" + str.split("\n").map(function(line) {
                return "   " + line;
              }).join("\n");
            }
          }
        } else {
          str = ctx.stylize("[Circular]", "special");
        }
      }
      if (isUndefined(name2)) {
        if (array && key2.match(/^\d+$/)) {
          return str;
        }
        name2 = JSON.stringify("" + key2);
        if (name2.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
          name2 = name2.slice(1, -1);
          name2 = ctx.stylize(name2, "name");
        } else {
          name2 = name2.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
          name2 = ctx.stylize(name2, "string");
        }
      }
      return name2 + ": " + str;
    }
    function reduceToSingleString(output, base2, braces) {
      var length = output.reduce(function(prev, cur) {
        if (cur.indexOf("\n") >= 0)
          ;
        return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
      }, 0);
      if (length > 60) {
        return braces[0] + (base2 === "" ? "" : base2 + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
      }
      return braces[0] + base2 + " " + output.join(", ") + " " + braces[1];
    }
    exports.types = requireTypes();
    function isArray2(ar) {
      return Array.isArray(ar);
    }
    exports.isArray = isArray2;
    function isBoolean(arg) {
      return typeof arg === "boolean";
    }
    exports.isBoolean = isBoolean;
    function isNull(arg) {
      return arg === null;
    }
    exports.isNull = isNull;
    function isNullOrUndefined(arg) {
      return arg == null;
    }
    exports.isNullOrUndefined = isNullOrUndefined;
    function isNumber(arg) {
      return typeof arg === "number";
    }
    exports.isNumber = isNumber;
    function isString(arg) {
      return typeof arg === "string";
    }
    exports.isString = isString;
    function isSymbol(arg) {
      return typeof arg === "symbol";
    }
    exports.isSymbol = isSymbol;
    function isUndefined(arg) {
      return arg === void 0;
    }
    exports.isUndefined = isUndefined;
    function isRegExp(re) {
      return isObject(re) && objectToString(re) === "[object RegExp]";
    }
    exports.isRegExp = isRegExp;
    exports.types.isRegExp = isRegExp;
    function isObject(arg) {
      return typeof arg === "object" && arg !== null;
    }
    exports.isObject = isObject;
    function isDate(d) {
      return isObject(d) && objectToString(d) === "[object Date]";
    }
    exports.isDate = isDate;
    exports.types.isDate = isDate;
    function isError(e) {
      return isObject(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
    }
    exports.isError = isError;
    exports.types.isNativeError = isError;
    function isFunction(arg) {
      return typeof arg === "function";
    }
    exports.isFunction = isFunction;
    function isPrimitive(arg) {
      return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || // ES6 symbol
      typeof arg === "undefined";
    }
    exports.isPrimitive = isPrimitive;
    exports.isBuffer = requireIsBuffer();
    function objectToString(o) {
      return Object.prototype.toString.call(o);
    }
    function pad(n) {
      return n < 10 ? "0" + n.toString(10) : n.toString(10);
    }
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    function timestamp() {
      var d = /* @__PURE__ */ new Date();
      var time = [
        pad(d.getHours()),
        pad(d.getMinutes()),
        pad(d.getSeconds())
      ].join(":");
      return [d.getDate(), months[d.getMonth()], time].join(" ");
    }
    exports.log = function() {
      console.log("%s - %s", timestamp(), exports.format.apply(exports, arguments));
    };
    exports.inherits = requireInherits();
    exports._extend = function(origin, add) {
      if (!add || !isObject(add))
        return origin;
      var keys = Object.keys(add);
      var i = keys.length;
      while (i--) {
        origin[keys[i]] = add[keys[i]];
      }
      return origin;
    };
    function hasOwnProperty2(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }
    var kCustomPromisifiedSymbol = typeof Symbol !== "undefined" ? Symbol("util.promisify.custom") : void 0;
    exports.promisify = function promisify(original) {
      if (typeof original !== "function")
        throw new TypeError('The "original" argument must be of type Function');
      if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
        var fn = original[kCustomPromisifiedSymbol];
        if (typeof fn !== "function") {
          throw new TypeError('The "util.promisify.custom" argument must be of type Function');
        }
        Object.defineProperty(fn, kCustomPromisifiedSymbol, {
          value: fn,
          enumerable: false,
          writable: false,
          configurable: true
        });
        return fn;
      }
      function fn() {
        var promiseResolve, promiseReject;
        var promise = new Promise(function(resolve, reject) {
          promiseResolve = resolve;
          promiseReject = reject;
        });
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
          args.push(arguments[i]);
        }
        args.push(function(err, value) {
          if (err) {
            promiseReject(err);
          } else {
            promiseResolve(value);
          }
        });
        try {
          original.apply(this, args);
        } catch (err) {
          promiseReject(err);
        }
        return promise;
      }
      Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
      if (kCustomPromisifiedSymbol)
        Object.defineProperty(fn, kCustomPromisifiedSymbol, {
          value: fn,
          enumerable: false,
          writable: false,
          configurable: true
        });
      return Object.defineProperties(
        fn,
        getOwnPropertyDescriptors(original)
      );
    };
    exports.promisify.custom = kCustomPromisifiedSymbol;
    function callbackifyOnRejected(reason, cb) {
      if (!reason) {
        var newReason = new Error("Promise was rejected with a falsy value");
        newReason.reason = reason;
        reason = newReason;
      }
      return cb(reason);
    }
    function callbackify(original) {
      if (typeof original !== "function") {
        throw new TypeError('The "original" argument must be of type Function');
      }
      function callbackified() {
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
          args.push(arguments[i]);
        }
        var maybeCb = args.pop();
        if (typeof maybeCb !== "function") {
          throw new TypeError("The last argument must be of type Function");
        }
        var self2 = this;
        var cb = function() {
          return maybeCb.apply(self2, arguments);
        };
        original.apply(this, args).then(
          function(ret) {
            process.nextTick(cb.bind(null, null, ret));
          },
          function(rej) {
            process.nextTick(callbackifyOnRejected.bind(null, rej, cb));
          }
        );
      }
      Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
      Object.defineProperties(
        callbackified,
        getOwnPropertyDescriptors(original)
      );
      return callbackified;
    }
    exports.callbackify = callbackify;
  })(util);
  return util;
}
var inherits_browser = { exports: {} };
var hasRequiredInherits_browser;
function requireInherits_browser() {
  if (hasRequiredInherits_browser)
    return inherits_browser.exports;
  hasRequiredInherits_browser = 1;
  if (typeof Object.create === "function") {
    inherits_browser.exports = function inherits2(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      }
    };
  } else {
    inherits_browser.exports = function inherits2(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
    };
  }
  return inherits_browser.exports;
}
var hasRequiredInherits;
function requireInherits() {
  if (hasRequiredInherits)
    return inherits$2.exports;
  hasRequiredInherits = 1;
  try {
    var util2 = requireUtil();
    if (typeof util2.inherits !== "function")
      throw "";
    inherits$2.exports = util2.inherits;
  } catch (e) {
    inherits$2.exports = requireInherits_browser();
  }
  return inherits$2.exports;
}
var short;
var hasRequiredShort;
function requireShort() {
  if (hasRequiredShort)
    return short;
  hasRequiredShort = 1;
  var utils2 = requireUtils$1();
  var BN = requireBn$1();
  var inherits2 = requireInherits();
  var Base = requireBase$1();
  var assert = utils2.assert;
  function ShortCurve(conf) {
    Base.call(this, "short", conf);
    this.a = new BN(conf.a, 16).toRed(this.red);
    this.b = new BN(conf.b, 16).toRed(this.red);
    this.tinv = this.two.redInvm();
    this.zeroA = this.a.fromRed().cmpn(0) === 0;
    this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0;
    this.endo = this._getEndomorphism(conf);
    this._endoWnafT1 = new Array(4);
    this._endoWnafT2 = new Array(4);
  }
  inherits2(ShortCurve, Base);
  short = ShortCurve;
  ShortCurve.prototype._getEndomorphism = function _getEndomorphism(conf) {
    if (!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)
      return;
    var beta;
    var lambda;
    if (conf.beta) {
      beta = new BN(conf.beta, 16).toRed(this.red);
    } else {
      var betas = this._getEndoRoots(this.p);
      beta = betas[0].cmp(betas[1]) < 0 ? betas[0] : betas[1];
      beta = beta.toRed(this.red);
    }
    if (conf.lambda) {
      lambda = new BN(conf.lambda, 16);
    } else {
      var lambdas = this._getEndoRoots(this.n);
      if (this.g.mul(lambdas[0]).x.cmp(this.g.x.redMul(beta)) === 0) {
        lambda = lambdas[0];
      } else {
        lambda = lambdas[1];
        assert(this.g.mul(lambda).x.cmp(this.g.x.redMul(beta)) === 0);
      }
    }
    var basis;
    if (conf.basis) {
      basis = conf.basis.map(function(vec) {
        return {
          a: new BN(vec.a, 16),
          b: new BN(vec.b, 16)
        };
      });
    } else {
      basis = this._getEndoBasis(lambda);
    }
    return {
      beta,
      lambda,
      basis
    };
  };
  ShortCurve.prototype._getEndoRoots = function _getEndoRoots(num) {
    var red = num === this.p ? this.red : BN.mont(num);
    var tinv = new BN(2).toRed(red).redInvm();
    var ntinv = tinv.redNeg();
    var s = new BN(3).toRed(red).redNeg().redSqrt().redMul(tinv);
    var l1 = ntinv.redAdd(s).fromRed();
    var l2 = ntinv.redSub(s).fromRed();
    return [l1, l2];
  };
  ShortCurve.prototype._getEndoBasis = function _getEndoBasis(lambda) {
    var aprxSqrt = this.n.ushrn(Math.floor(this.n.bitLength() / 2));
    var u = lambda;
    var v = this.n.clone();
    var x1 = new BN(1);
    var y1 = new BN(0);
    var x2 = new BN(0);
    var y2 = new BN(1);
    var a0;
    var b0;
    var a1;
    var b1;
    var a2;
    var b2;
    var prevR;
    var i = 0;
    var r;
    var x;
    while (u.cmpn(0) !== 0) {
      var q = v.div(u);
      r = v.sub(q.mul(u));
      x = x2.sub(q.mul(x1));
      var y = y2.sub(q.mul(y1));
      if (!a1 && r.cmp(aprxSqrt) < 0) {
        a0 = prevR.neg();
        b0 = x1;
        a1 = r.neg();
        b1 = x;
      } else if (a1 && ++i === 2) {
        break;
      }
      prevR = r;
      v = u;
      u = r;
      x2 = x1;
      x1 = x;
      y2 = y1;
      y1 = y;
    }
    a2 = r.neg();
    b2 = x;
    var len1 = a1.sqr().add(b1.sqr());
    var len2 = a2.sqr().add(b2.sqr());
    if (len2.cmp(len1) >= 0) {
      a2 = a0;
      b2 = b0;
    }
    if (a1.negative) {
      a1 = a1.neg();
      b1 = b1.neg();
    }
    if (a2.negative) {
      a2 = a2.neg();
      b2 = b2.neg();
    }
    return [
      { a: a1, b: b1 },
      { a: a2, b: b2 }
    ];
  };
  ShortCurve.prototype._endoSplit = function _endoSplit(k) {
    var basis = this.endo.basis;
    var v1 = basis[0];
    var v2 = basis[1];
    var c1 = v2.b.mul(k).divRound(this.n);
    var c2 = v1.b.neg().mul(k).divRound(this.n);
    var p1 = c1.mul(v1.a);
    var p2 = c2.mul(v2.a);
    var q1 = c1.mul(v1.b);
    var q2 = c2.mul(v2.b);
    var k1 = k.sub(p1).sub(p2);
    var k2 = q1.add(q2).neg();
    return { k1, k2 };
  };
  ShortCurve.prototype.pointFromX = function pointFromX(x, odd) {
    x = new BN(x, 16);
    if (!x.red)
      x = x.toRed(this.red);
    var y2 = x.redSqr().redMul(x).redIAdd(x.redMul(this.a)).redIAdd(this.b);
    var y = y2.redSqrt();
    if (y.redSqr().redSub(y2).cmp(this.zero) !== 0)
      throw new Error("invalid point");
    var isOdd = y.fromRed().isOdd();
    if (odd && !isOdd || !odd && isOdd)
      y = y.redNeg();
    return this.point(x, y);
  };
  ShortCurve.prototype.validate = function validate(point) {
    if (point.inf)
      return true;
    var x = point.x;
    var y = point.y;
    var ax = this.a.redMul(x);
    var rhs = x.redSqr().redMul(x).redIAdd(ax).redIAdd(this.b);
    return y.redSqr().redISub(rhs).cmpn(0) === 0;
  };
  ShortCurve.prototype._endoWnafMulAdd = function _endoWnafMulAdd(points, coeffs, jacobianResult) {
    var npoints = this._endoWnafT1;
    var ncoeffs = this._endoWnafT2;
    for (var i = 0; i < points.length; i++) {
      var split = this._endoSplit(coeffs[i]);
      var p = points[i];
      var beta = p._getBeta();
      if (split.k1.negative) {
        split.k1.ineg();
        p = p.neg(true);
      }
      if (split.k2.negative) {
        split.k2.ineg();
        beta = beta.neg(true);
      }
      npoints[i * 2] = p;
      npoints[i * 2 + 1] = beta;
      ncoeffs[i * 2] = split.k1;
      ncoeffs[i * 2 + 1] = split.k2;
    }
    var res = this._wnafMulAdd(1, npoints, ncoeffs, i * 2, jacobianResult);
    for (var j = 0; j < i * 2; j++) {
      npoints[j] = null;
      ncoeffs[j] = null;
    }
    return res;
  };
  function Point(curve2, x, y, isRed) {
    Base.BasePoint.call(this, curve2, "affine");
    if (x === null && y === null) {
      this.x = null;
      this.y = null;
      this.inf = true;
    } else {
      this.x = new BN(x, 16);
      this.y = new BN(y, 16);
      if (isRed) {
        this.x.forceRed(this.curve.red);
        this.y.forceRed(this.curve.red);
      }
      if (!this.x.red)
        this.x = this.x.toRed(this.curve.red);
      if (!this.y.red)
        this.y = this.y.toRed(this.curve.red);
      this.inf = false;
    }
  }
  inherits2(Point, Base.BasePoint);
  ShortCurve.prototype.point = function point(x, y, isRed) {
    return new Point(this, x, y, isRed);
  };
  ShortCurve.prototype.pointFromJSON = function pointFromJSON(obj, red) {
    return Point.fromJSON(this, obj, red);
  };
  Point.prototype._getBeta = function _getBeta() {
    if (!this.curve.endo)
      return;
    var pre = this.precomputed;
    if (pre && pre.beta)
      return pre.beta;
    var beta = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
    if (pre) {
      var curve2 = this.curve;
      var endoMul = function(p) {
        return curve2.point(p.x.redMul(curve2.endo.beta), p.y);
      };
      pre.beta = beta;
      beta.precomputed = {
        beta: null,
        naf: pre.naf && {
          wnd: pre.naf.wnd,
          points: pre.naf.points.map(endoMul)
        },
        doubles: pre.doubles && {
          step: pre.doubles.step,
          points: pre.doubles.points.map(endoMul)
        }
      };
    }
    return beta;
  };
  Point.prototype.toJSON = function toJSON() {
    if (!this.precomputed)
      return [this.x, this.y];
    return [this.x, this.y, this.precomputed && {
      doubles: this.precomputed.doubles && {
        step: this.precomputed.doubles.step,
        points: this.precomputed.doubles.points.slice(1)
      },
      naf: this.precomputed.naf && {
        wnd: this.precomputed.naf.wnd,
        points: this.precomputed.naf.points.slice(1)
      }
    }];
  };
  Point.fromJSON = function fromJSON(curve2, obj, red) {
    if (typeof obj === "string")
      obj = JSON.parse(obj);
    var res = curve2.point(obj[0], obj[1], red);
    if (!obj[2])
      return res;
    function obj2point(obj2) {
      return curve2.point(obj2[0], obj2[1], red);
    }
    var pre = obj[2];
    res.precomputed = {
      beta: null,
      doubles: pre.doubles && {
        step: pre.doubles.step,
        points: [res].concat(pre.doubles.points.map(obj2point))
      },
      naf: pre.naf && {
        wnd: pre.naf.wnd,
        points: [res].concat(pre.naf.points.map(obj2point))
      }
    };
    return res;
  };
  Point.prototype.inspect = function inspect() {
    if (this.isInfinity())
      return "<EC Point Infinity>";
    return "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">";
  };
  Point.prototype.isInfinity = function isInfinity() {
    return this.inf;
  };
  Point.prototype.add = function add(p) {
    if (this.inf)
      return p;
    if (p.inf)
      return this;
    if (this.eq(p))
      return this.dbl();
    if (this.neg().eq(p))
      return this.curve.point(null, null);
    if (this.x.cmp(p.x) === 0)
      return this.curve.point(null, null);
    var c = this.y.redSub(p.y);
    if (c.cmpn(0) !== 0)
      c = c.redMul(this.x.redSub(p.x).redInvm());
    var nx = c.redSqr().redISub(this.x).redISub(p.x);
    var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
    return this.curve.point(nx, ny);
  };
  Point.prototype.dbl = function dbl() {
    if (this.inf)
      return this;
    var ys1 = this.y.redAdd(this.y);
    if (ys1.cmpn(0) === 0)
      return this.curve.point(null, null);
    var a = this.curve.a;
    var x2 = this.x.redSqr();
    var dyinv = ys1.redInvm();
    var c = x2.redAdd(x2).redIAdd(x2).redIAdd(a).redMul(dyinv);
    var nx = c.redSqr().redISub(this.x.redAdd(this.x));
    var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
    return this.curve.point(nx, ny);
  };
  Point.prototype.getX = function getX() {
    return this.x.fromRed();
  };
  Point.prototype.getY = function getY() {
    return this.y.fromRed();
  };
  Point.prototype.mul = function mul(k) {
    k = new BN(k, 16);
    if (this.isInfinity())
      return this;
    else if (this._hasDoubles(k))
      return this.curve._fixedNafMul(this, k);
    else if (this.curve.endo)
      return this.curve._endoWnafMulAdd([this], [k]);
    else
      return this.curve._wnafMul(this, k);
  };
  Point.prototype.mulAdd = function mulAdd(k1, p2, k2) {
    var points = [this, p2];
    var coeffs = [k1, k2];
    if (this.curve.endo)
      return this.curve._endoWnafMulAdd(points, coeffs);
    else
      return this.curve._wnafMulAdd(1, points, coeffs, 2);
  };
  Point.prototype.jmulAdd = function jmulAdd(k1, p2, k2) {
    var points = [this, p2];
    var coeffs = [k1, k2];
    if (this.curve.endo)
      return this.curve._endoWnafMulAdd(points, coeffs, true);
    else
      return this.curve._wnafMulAdd(1, points, coeffs, 2, true);
  };
  Point.prototype.eq = function eq(p) {
    return this === p || this.inf === p.inf && (this.inf || this.x.cmp(p.x) === 0 && this.y.cmp(p.y) === 0);
  };
  Point.prototype.neg = function neg(_precompute) {
    if (this.inf)
      return this;
    var res = this.curve.point(this.x, this.y.redNeg());
    if (_precompute && this.precomputed) {
      var pre = this.precomputed;
      var negate = function(p) {
        return p.neg();
      };
      res.precomputed = {
        naf: pre.naf && {
          wnd: pre.naf.wnd,
          points: pre.naf.points.map(negate)
        },
        doubles: pre.doubles && {
          step: pre.doubles.step,
          points: pre.doubles.points.map(negate)
        }
      };
    }
    return res;
  };
  Point.prototype.toJ = function toJ() {
    if (this.inf)
      return this.curve.jpoint(null, null, null);
    var res = this.curve.jpoint(this.x, this.y, this.curve.one);
    return res;
  };
  function JPoint(curve2, x, y, z) {
    Base.BasePoint.call(this, curve2, "jacobian");
    if (x === null && y === null && z === null) {
      this.x = this.curve.one;
      this.y = this.curve.one;
      this.z = new BN(0);
    } else {
      this.x = new BN(x, 16);
      this.y = new BN(y, 16);
      this.z = new BN(z, 16);
    }
    if (!this.x.red)
      this.x = this.x.toRed(this.curve.red);
    if (!this.y.red)
      this.y = this.y.toRed(this.curve.red);
    if (!this.z.red)
      this.z = this.z.toRed(this.curve.red);
    this.zOne = this.z === this.curve.one;
  }
  inherits2(JPoint, Base.BasePoint);
  ShortCurve.prototype.jpoint = function jpoint(x, y, z) {
    return new JPoint(this, x, y, z);
  };
  JPoint.prototype.toP = function toP() {
    if (this.isInfinity())
      return this.curve.point(null, null);
    var zinv = this.z.redInvm();
    var zinv2 = zinv.redSqr();
    var ax = this.x.redMul(zinv2);
    var ay = this.y.redMul(zinv2).redMul(zinv);
    return this.curve.point(ax, ay);
  };
  JPoint.prototype.neg = function neg() {
    return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
  };
  JPoint.prototype.add = function add(p) {
    if (this.isInfinity())
      return p;
    if (p.isInfinity())
      return this;
    var pz2 = p.z.redSqr();
    var z2 = this.z.redSqr();
    var u1 = this.x.redMul(pz2);
    var u2 = p.x.redMul(z2);
    var s1 = this.y.redMul(pz2.redMul(p.z));
    var s2 = p.y.redMul(z2.redMul(this.z));
    var h = u1.redSub(u2);
    var r = s1.redSub(s2);
    if (h.cmpn(0) === 0) {
      if (r.cmpn(0) !== 0)
        return this.curve.jpoint(null, null, null);
      else
        return this.dbl();
    }
    var h2 = h.redSqr();
    var h3 = h2.redMul(h);
    var v = u1.redMul(h2);
    var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
    var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
    var nz = this.z.redMul(p.z).redMul(h);
    return this.curve.jpoint(nx, ny, nz);
  };
  JPoint.prototype.mixedAdd = function mixedAdd(p) {
    if (this.isInfinity())
      return p.toJ();
    if (p.isInfinity())
      return this;
    var z2 = this.z.redSqr();
    var u1 = this.x;
    var u2 = p.x.redMul(z2);
    var s1 = this.y;
    var s2 = p.y.redMul(z2).redMul(this.z);
    var h = u1.redSub(u2);
    var r = s1.redSub(s2);
    if (h.cmpn(0) === 0) {
      if (r.cmpn(0) !== 0)
        return this.curve.jpoint(null, null, null);
      else
        return this.dbl();
    }
    var h2 = h.redSqr();
    var h3 = h2.redMul(h);
    var v = u1.redMul(h2);
    var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
    var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
    var nz = this.z.redMul(h);
    return this.curve.jpoint(nx, ny, nz);
  };
  JPoint.prototype.dblp = function dblp(pow) {
    if (pow === 0)
      return this;
    if (this.isInfinity())
      return this;
    if (!pow)
      return this.dbl();
    var i;
    if (this.curve.zeroA || this.curve.threeA) {
      var r = this;
      for (i = 0; i < pow; i++)
        r = r.dbl();
      return r;
    }
    var a = this.curve.a;
    var tinv = this.curve.tinv;
    var jx = this.x;
    var jy = this.y;
    var jz = this.z;
    var jz4 = jz.redSqr().redSqr();
    var jyd = jy.redAdd(jy);
    for (i = 0; i < pow; i++) {
      var jx2 = jx.redSqr();
      var jyd2 = jyd.redSqr();
      var jyd4 = jyd2.redSqr();
      var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));
      var t1 = jx.redMul(jyd2);
      var nx = c.redSqr().redISub(t1.redAdd(t1));
      var t2 = t1.redISub(nx);
      var dny = c.redMul(t2);
      dny = dny.redIAdd(dny).redISub(jyd4);
      var nz = jyd.redMul(jz);
      if (i + 1 < pow)
        jz4 = jz4.redMul(jyd4);
      jx = nx;
      jz = nz;
      jyd = dny;
    }
    return this.curve.jpoint(jx, jyd.redMul(tinv), jz);
  };
  JPoint.prototype.dbl = function dbl() {
    if (this.isInfinity())
      return this;
    if (this.curve.zeroA)
      return this._zeroDbl();
    else if (this.curve.threeA)
      return this._threeDbl();
    else
      return this._dbl();
  };
  JPoint.prototype._zeroDbl = function _zeroDbl() {
    var nx;
    var ny;
    var nz;
    if (this.zOne) {
      var xx = this.x.redSqr();
      var yy = this.y.redSqr();
      var yyyy = yy.redSqr();
      var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
      s = s.redIAdd(s);
      var m = xx.redAdd(xx).redIAdd(xx);
      var t = m.redSqr().redISub(s).redISub(s);
      var yyyy8 = yyyy.redIAdd(yyyy);
      yyyy8 = yyyy8.redIAdd(yyyy8);
      yyyy8 = yyyy8.redIAdd(yyyy8);
      nx = t;
      ny = m.redMul(s.redISub(t)).redISub(yyyy8);
      nz = this.y.redAdd(this.y);
    } else {
      var a = this.x.redSqr();
      var b = this.y.redSqr();
      var c = b.redSqr();
      var d = this.x.redAdd(b).redSqr().redISub(a).redISub(c);
      d = d.redIAdd(d);
      var e = a.redAdd(a).redIAdd(a);
      var f = e.redSqr();
      var c8 = c.redIAdd(c);
      c8 = c8.redIAdd(c8);
      c8 = c8.redIAdd(c8);
      nx = f.redISub(d).redISub(d);
      ny = e.redMul(d.redISub(nx)).redISub(c8);
      nz = this.y.redMul(this.z);
      nz = nz.redIAdd(nz);
    }
    return this.curve.jpoint(nx, ny, nz);
  };
  JPoint.prototype._threeDbl = function _threeDbl() {
    var nx;
    var ny;
    var nz;
    if (this.zOne) {
      var xx = this.x.redSqr();
      var yy = this.y.redSqr();
      var yyyy = yy.redSqr();
      var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
      s = s.redIAdd(s);
      var m = xx.redAdd(xx).redIAdd(xx).redIAdd(this.curve.a);
      var t = m.redSqr().redISub(s).redISub(s);
      nx = t;
      var yyyy8 = yyyy.redIAdd(yyyy);
      yyyy8 = yyyy8.redIAdd(yyyy8);
      yyyy8 = yyyy8.redIAdd(yyyy8);
      ny = m.redMul(s.redISub(t)).redISub(yyyy8);
      nz = this.y.redAdd(this.y);
    } else {
      var delta = this.z.redSqr();
      var gamma = this.y.redSqr();
      var beta = this.x.redMul(gamma);
      var alpha = this.x.redSub(delta).redMul(this.x.redAdd(delta));
      alpha = alpha.redAdd(alpha).redIAdd(alpha);
      var beta4 = beta.redIAdd(beta);
      beta4 = beta4.redIAdd(beta4);
      var beta8 = beta4.redAdd(beta4);
      nx = alpha.redSqr().redISub(beta8);
      nz = this.y.redAdd(this.z).redSqr().redISub(gamma).redISub(delta);
      var ggamma8 = gamma.redSqr();
      ggamma8 = ggamma8.redIAdd(ggamma8);
      ggamma8 = ggamma8.redIAdd(ggamma8);
      ggamma8 = ggamma8.redIAdd(ggamma8);
      ny = alpha.redMul(beta4.redISub(nx)).redISub(ggamma8);
    }
    return this.curve.jpoint(nx, ny, nz);
  };
  JPoint.prototype._dbl = function _dbl() {
    var a = this.curve.a;
    var jx = this.x;
    var jy = this.y;
    var jz = this.z;
    var jz4 = jz.redSqr().redSqr();
    var jx2 = jx.redSqr();
    var jy2 = jy.redSqr();
    var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));
    var jxd4 = jx.redAdd(jx);
    jxd4 = jxd4.redIAdd(jxd4);
    var t1 = jxd4.redMul(jy2);
    var nx = c.redSqr().redISub(t1.redAdd(t1));
    var t2 = t1.redISub(nx);
    var jyd8 = jy2.redSqr();
    jyd8 = jyd8.redIAdd(jyd8);
    jyd8 = jyd8.redIAdd(jyd8);
    jyd8 = jyd8.redIAdd(jyd8);
    var ny = c.redMul(t2).redISub(jyd8);
    var nz = jy.redAdd(jy).redMul(jz);
    return this.curve.jpoint(nx, ny, nz);
  };
  JPoint.prototype.trpl = function trpl() {
    if (!this.curve.zeroA)
      return this.dbl().add(this);
    var xx = this.x.redSqr();
    var yy = this.y.redSqr();
    var zz = this.z.redSqr();
    var yyyy = yy.redSqr();
    var m = xx.redAdd(xx).redIAdd(xx);
    var mm = m.redSqr();
    var e = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
    e = e.redIAdd(e);
    e = e.redAdd(e).redIAdd(e);
    e = e.redISub(mm);
    var ee = e.redSqr();
    var t = yyyy.redIAdd(yyyy);
    t = t.redIAdd(t);
    t = t.redIAdd(t);
    t = t.redIAdd(t);
    var u = m.redIAdd(e).redSqr().redISub(mm).redISub(ee).redISub(t);
    var yyu4 = yy.redMul(u);
    yyu4 = yyu4.redIAdd(yyu4);
    yyu4 = yyu4.redIAdd(yyu4);
    var nx = this.x.redMul(ee).redISub(yyu4);
    nx = nx.redIAdd(nx);
    nx = nx.redIAdd(nx);
    var ny = this.y.redMul(u.redMul(t.redISub(u)).redISub(e.redMul(ee)));
    ny = ny.redIAdd(ny);
    ny = ny.redIAdd(ny);
    ny = ny.redIAdd(ny);
    var nz = this.z.redAdd(e).redSqr().redISub(zz).redISub(ee);
    return this.curve.jpoint(nx, ny, nz);
  };
  JPoint.prototype.mul = function mul(k, kbase) {
    k = new BN(k, kbase);
    return this.curve._wnafMul(this, k);
  };
  JPoint.prototype.eq = function eq(p) {
    if (p.type === "affine")
      return this.eq(p.toJ());
    if (this === p)
      return true;
    var z2 = this.z.redSqr();
    var pz2 = p.z.redSqr();
    if (this.x.redMul(pz2).redISub(p.x.redMul(z2)).cmpn(0) !== 0)
      return false;
    var z3 = z2.redMul(this.z);
    var pz3 = pz2.redMul(p.z);
    return this.y.redMul(pz3).redISub(p.y.redMul(z3)).cmpn(0) === 0;
  };
  JPoint.prototype.eqXToP = function eqXToP(x) {
    var zs = this.z.redSqr();
    var rx = x.toRed(this.curve.red).redMul(zs);
    if (this.x.cmp(rx) === 0)
      return true;
    var xc = x.clone();
    var t = this.curve.redN.redMul(zs);
    for (; ; ) {
      xc.iadd(this.curve.n);
      if (xc.cmp(this.curve.p) >= 0)
        return false;
      rx.redIAdd(t);
      if (this.x.cmp(rx) === 0)
        return true;
    }
  };
  JPoint.prototype.inspect = function inspect() {
    if (this.isInfinity())
      return "<EC JPoint Infinity>";
    return "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">";
  };
  JPoint.prototype.isInfinity = function isInfinity() {
    return this.z.cmpn(0) === 0;
  };
  return short;
}
var mont;
var hasRequiredMont;
function requireMont() {
  if (hasRequiredMont)
    return mont;
  hasRequiredMont = 1;
  var BN = requireBn$1();
  var inherits2 = requireInherits();
  var Base = requireBase$1();
  var utils2 = requireUtils$1();
  function MontCurve(conf) {
    Base.call(this, "mont", conf);
    this.a = new BN(conf.a, 16).toRed(this.red);
    this.b = new BN(conf.b, 16).toRed(this.red);
    this.i4 = new BN(4).toRed(this.red).redInvm();
    this.two = new BN(2).toRed(this.red);
    this.a24 = this.i4.redMul(this.a.redAdd(this.two));
  }
  inherits2(MontCurve, Base);
  mont = MontCurve;
  MontCurve.prototype.validate = function validate(point) {
    var x = point.normalize().x;
    var x2 = x.redSqr();
    var rhs = x2.redMul(x).redAdd(x2.redMul(this.a)).redAdd(x);
    var y = rhs.redSqrt();
    return y.redSqr().cmp(rhs) === 0;
  };
  function Point(curve2, x, z) {
    Base.BasePoint.call(this, curve2, "projective");
    if (x === null && z === null) {
      this.x = this.curve.one;
      this.z = this.curve.zero;
    } else {
      this.x = new BN(x, 16);
      this.z = new BN(z, 16);
      if (!this.x.red)
        this.x = this.x.toRed(this.curve.red);
      if (!this.z.red)
        this.z = this.z.toRed(this.curve.red);
    }
  }
  inherits2(Point, Base.BasePoint);
  MontCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
    return this.point(utils2.toArray(bytes, enc), 1);
  };
  MontCurve.prototype.point = function point(x, z) {
    return new Point(this, x, z);
  };
  MontCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
    return Point.fromJSON(this, obj);
  };
  Point.prototype.precompute = function precompute() {
  };
  Point.prototype._encode = function _encode() {
    return this.getX().toArray("be", this.curve.p.byteLength());
  };
  Point.fromJSON = function fromJSON(curve2, obj) {
    return new Point(curve2, obj[0], obj[1] || curve2.one);
  };
  Point.prototype.inspect = function inspect() {
    if (this.isInfinity())
      return "<EC Point Infinity>";
    return "<EC Point x: " + this.x.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">";
  };
  Point.prototype.isInfinity = function isInfinity() {
    return this.z.cmpn(0) === 0;
  };
  Point.prototype.dbl = function dbl() {
    var a = this.x.redAdd(this.z);
    var aa = a.redSqr();
    var b = this.x.redSub(this.z);
    var bb = b.redSqr();
    var c = aa.redSub(bb);
    var nx = aa.redMul(bb);
    var nz = c.redMul(bb.redAdd(this.curve.a24.redMul(c)));
    return this.curve.point(nx, nz);
  };
  Point.prototype.add = function add() {
    throw new Error("Not supported on Montgomery curve");
  };
  Point.prototype.diffAdd = function diffAdd(p, diff) {
    var a = this.x.redAdd(this.z);
    var b = this.x.redSub(this.z);
    var c = p.x.redAdd(p.z);
    var d = p.x.redSub(p.z);
    var da = d.redMul(a);
    var cb = c.redMul(b);
    var nx = diff.z.redMul(da.redAdd(cb).redSqr());
    var nz = diff.x.redMul(da.redISub(cb).redSqr());
    return this.curve.point(nx, nz);
  };
  Point.prototype.mul = function mul(k) {
    var t = k.clone();
    var a = this;
    var b = this.curve.point(null, null);
    var c = this;
    for (var bits = []; t.cmpn(0) !== 0; t.iushrn(1))
      bits.push(t.andln(1));
    for (var i = bits.length - 1; i >= 0; i--) {
      if (bits[i] === 0) {
        a = a.diffAdd(b, c);
        b = b.dbl();
      } else {
        b = a.diffAdd(b, c);
        a = a.dbl();
      }
    }
    return b;
  };
  Point.prototype.mulAdd = function mulAdd() {
    throw new Error("Not supported on Montgomery curve");
  };
  Point.prototype.jumlAdd = function jumlAdd() {
    throw new Error("Not supported on Montgomery curve");
  };
  Point.prototype.eq = function eq(other) {
    return this.getX().cmp(other.getX()) === 0;
  };
  Point.prototype.normalize = function normalize() {
    this.x = this.x.redMul(this.z.redInvm());
    this.z = this.curve.one;
    return this;
  };
  Point.prototype.getX = function getX() {
    this.normalize();
    return this.x.fromRed();
  };
  return mont;
}
var edwards;
var hasRequiredEdwards;
function requireEdwards() {
  if (hasRequiredEdwards)
    return edwards;
  hasRequiredEdwards = 1;
  var utils2 = requireUtils$1();
  var BN = requireBn$1();
  var inherits2 = requireInherits();
  var Base = requireBase$1();
  var assert = utils2.assert;
  function EdwardsCurve(conf) {
    this.twisted = (conf.a | 0) !== 1;
    this.mOneA = this.twisted && (conf.a | 0) === -1;
    this.extended = this.mOneA;
    Base.call(this, "edwards", conf);
    this.a = new BN(conf.a, 16).umod(this.red.m);
    this.a = this.a.toRed(this.red);
    this.c = new BN(conf.c, 16).toRed(this.red);
    this.c2 = this.c.redSqr();
    this.d = new BN(conf.d, 16).toRed(this.red);
    this.dd = this.d.redAdd(this.d);
    assert(!this.twisted || this.c.fromRed().cmpn(1) === 0);
    this.oneC = (conf.c | 0) === 1;
  }
  inherits2(EdwardsCurve, Base);
  edwards = EdwardsCurve;
  EdwardsCurve.prototype._mulA = function _mulA(num) {
    if (this.mOneA)
      return num.redNeg();
    else
      return this.a.redMul(num);
  };
  EdwardsCurve.prototype._mulC = function _mulC(num) {
    if (this.oneC)
      return num;
    else
      return this.c.redMul(num);
  };
  EdwardsCurve.prototype.jpoint = function jpoint(x, y, z, t) {
    return this.point(x, y, z, t);
  };
  EdwardsCurve.prototype.pointFromX = function pointFromX(x, odd) {
    x = new BN(x, 16);
    if (!x.red)
      x = x.toRed(this.red);
    var x2 = x.redSqr();
    var rhs = this.c2.redSub(this.a.redMul(x2));
    var lhs = this.one.redSub(this.c2.redMul(this.d).redMul(x2));
    var y2 = rhs.redMul(lhs.redInvm());
    var y = y2.redSqrt();
    if (y.redSqr().redSub(y2).cmp(this.zero) !== 0)
      throw new Error("invalid point");
    var isOdd = y.fromRed().isOdd();
    if (odd && !isOdd || !odd && isOdd)
      y = y.redNeg();
    return this.point(x, y);
  };
  EdwardsCurve.prototype.pointFromY = function pointFromY(y, odd) {
    y = new BN(y, 16);
    if (!y.red)
      y = y.toRed(this.red);
    var y2 = y.redSqr();
    var lhs = y2.redSub(this.c2);
    var rhs = y2.redMul(this.d).redMul(this.c2).redSub(this.a);
    var x2 = lhs.redMul(rhs.redInvm());
    if (x2.cmp(this.zero) === 0) {
      if (odd)
        throw new Error("invalid point");
      else
        return this.point(this.zero, y);
    }
    var x = x2.redSqrt();
    if (x.redSqr().redSub(x2).cmp(this.zero) !== 0)
      throw new Error("invalid point");
    if (x.fromRed().isOdd() !== odd)
      x = x.redNeg();
    return this.point(x, y);
  };
  EdwardsCurve.prototype.validate = function validate(point) {
    if (point.isInfinity())
      return true;
    point.normalize();
    var x2 = point.x.redSqr();
    var y2 = point.y.redSqr();
    var lhs = x2.redMul(this.a).redAdd(y2);
    var rhs = this.c2.redMul(this.one.redAdd(this.d.redMul(x2).redMul(y2)));
    return lhs.cmp(rhs) === 0;
  };
  function Point(curve2, x, y, z, t) {
    Base.BasePoint.call(this, curve2, "projective");
    if (x === null && y === null && z === null) {
      this.x = this.curve.zero;
      this.y = this.curve.one;
      this.z = this.curve.one;
      this.t = this.curve.zero;
      this.zOne = true;
    } else {
      this.x = new BN(x, 16);
      this.y = new BN(y, 16);
      this.z = z ? new BN(z, 16) : this.curve.one;
      this.t = t && new BN(t, 16);
      if (!this.x.red)
        this.x = this.x.toRed(this.curve.red);
      if (!this.y.red)
        this.y = this.y.toRed(this.curve.red);
      if (!this.z.red)
        this.z = this.z.toRed(this.curve.red);
      if (this.t && !this.t.red)
        this.t = this.t.toRed(this.curve.red);
      this.zOne = this.z === this.curve.one;
      if (this.curve.extended && !this.t) {
        this.t = this.x.redMul(this.y);
        if (!this.zOne)
          this.t = this.t.redMul(this.z.redInvm());
      }
    }
  }
  inherits2(Point, Base.BasePoint);
  EdwardsCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
    return Point.fromJSON(this, obj);
  };
  EdwardsCurve.prototype.point = function point(x, y, z, t) {
    return new Point(this, x, y, z, t);
  };
  Point.fromJSON = function fromJSON(curve2, obj) {
    return new Point(curve2, obj[0], obj[1], obj[2]);
  };
  Point.prototype.inspect = function inspect() {
    if (this.isInfinity())
      return "<EC Point Infinity>";
    return "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">";
  };
  Point.prototype.isInfinity = function isInfinity() {
    return this.x.cmpn(0) === 0 && (this.y.cmp(this.z) === 0 || this.zOne && this.y.cmp(this.curve.c) === 0);
  };
  Point.prototype._extDbl = function _extDbl() {
    var a = this.x.redSqr();
    var b = this.y.redSqr();
    var c = this.z.redSqr();
    c = c.redIAdd(c);
    var d = this.curve._mulA(a);
    var e = this.x.redAdd(this.y).redSqr().redISub(a).redISub(b);
    var g = d.redAdd(b);
    var f = g.redSub(c);
    var h = d.redSub(b);
    var nx = e.redMul(f);
    var ny = g.redMul(h);
    var nt = e.redMul(h);
    var nz = f.redMul(g);
    return this.curve.point(nx, ny, nz, nt);
  };
  Point.prototype._projDbl = function _projDbl() {
    var b = this.x.redAdd(this.y).redSqr();
    var c = this.x.redSqr();
    var d = this.y.redSqr();
    var nx;
    var ny;
    var nz;
    var e;
    var h;
    var j;
    if (this.curve.twisted) {
      e = this.curve._mulA(c);
      var f = e.redAdd(d);
      if (this.zOne) {
        nx = b.redSub(c).redSub(d).redMul(f.redSub(this.curve.two));
        ny = f.redMul(e.redSub(d));
        nz = f.redSqr().redSub(f).redSub(f);
      } else {
        h = this.z.redSqr();
        j = f.redSub(h).redISub(h);
        nx = b.redSub(c).redISub(d).redMul(j);
        ny = f.redMul(e.redSub(d));
        nz = f.redMul(j);
      }
    } else {
      e = c.redAdd(d);
      h = this.curve._mulC(this.z).redSqr();
      j = e.redSub(h).redSub(h);
      nx = this.curve._mulC(b.redISub(e)).redMul(j);
      ny = this.curve._mulC(e).redMul(c.redISub(d));
      nz = e.redMul(j);
    }
    return this.curve.point(nx, ny, nz);
  };
  Point.prototype.dbl = function dbl() {
    if (this.isInfinity())
      return this;
    if (this.curve.extended)
      return this._extDbl();
    else
      return this._projDbl();
  };
  Point.prototype._extAdd = function _extAdd(p) {
    var a = this.y.redSub(this.x).redMul(p.y.redSub(p.x));
    var b = this.y.redAdd(this.x).redMul(p.y.redAdd(p.x));
    var c = this.t.redMul(this.curve.dd).redMul(p.t);
    var d = this.z.redMul(p.z.redAdd(p.z));
    var e = b.redSub(a);
    var f = d.redSub(c);
    var g = d.redAdd(c);
    var h = b.redAdd(a);
    var nx = e.redMul(f);
    var ny = g.redMul(h);
    var nt = e.redMul(h);
    var nz = f.redMul(g);
    return this.curve.point(nx, ny, nz, nt);
  };
  Point.prototype._projAdd = function _projAdd(p) {
    var a = this.z.redMul(p.z);
    var b = a.redSqr();
    var c = this.x.redMul(p.x);
    var d = this.y.redMul(p.y);
    var e = this.curve.d.redMul(c).redMul(d);
    var f = b.redSub(e);
    var g = b.redAdd(e);
    var tmp = this.x.redAdd(this.y).redMul(p.x.redAdd(p.y)).redISub(c).redISub(d);
    var nx = a.redMul(f).redMul(tmp);
    var ny;
    var nz;
    if (this.curve.twisted) {
      ny = a.redMul(g).redMul(d.redSub(this.curve._mulA(c)));
      nz = f.redMul(g);
    } else {
      ny = a.redMul(g).redMul(d.redSub(c));
      nz = this.curve._mulC(f).redMul(g);
    }
    return this.curve.point(nx, ny, nz);
  };
  Point.prototype.add = function add(p) {
    if (this.isInfinity())
      return p;
    if (p.isInfinity())
      return this;
    if (this.curve.extended)
      return this._extAdd(p);
    else
      return this._projAdd(p);
  };
  Point.prototype.mul = function mul(k) {
    if (this._hasDoubles(k))
      return this.curve._fixedNafMul(this, k);
    else
      return this.curve._wnafMul(this, k);
  };
  Point.prototype.mulAdd = function mulAdd(k1, p, k2) {
    return this.curve._wnafMulAdd(1, [this, p], [k1, k2], 2, false);
  };
  Point.prototype.jmulAdd = function jmulAdd(k1, p, k2) {
    return this.curve._wnafMulAdd(1, [this, p], [k1, k2], 2, true);
  };
  Point.prototype.normalize = function normalize() {
    if (this.zOne)
      return this;
    var zi = this.z.redInvm();
    this.x = this.x.redMul(zi);
    this.y = this.y.redMul(zi);
    if (this.t)
      this.t = this.t.redMul(zi);
    this.z = this.curve.one;
    this.zOne = true;
    return this;
  };
  Point.prototype.neg = function neg() {
    return this.curve.point(
      this.x.redNeg(),
      this.y,
      this.z,
      this.t && this.t.redNeg()
    );
  };
  Point.prototype.getX = function getX() {
    this.normalize();
    return this.x.fromRed();
  };
  Point.prototype.getY = function getY() {
    this.normalize();
    return this.y.fromRed();
  };
  Point.prototype.eq = function eq(other) {
    return this === other || this.getX().cmp(other.getX()) === 0 && this.getY().cmp(other.getY()) === 0;
  };
  Point.prototype.eqXToP = function eqXToP(x) {
    var rx = x.toRed(this.curve.red).redMul(this.z);
    if (this.x.cmp(rx) === 0)
      return true;
    var xc = x.clone();
    var t = this.curve.redN.redMul(this.z);
    for (; ; ) {
      xc.iadd(this.curve.n);
      if (xc.cmp(this.curve.p) >= 0)
        return false;
      rx.redIAdd(t);
      if (this.x.cmp(rx) === 0)
        return true;
    }
  };
  Point.prototype.toP = Point.prototype.normalize;
  Point.prototype.mixedAdd = Point.prototype.add;
  return edwards;
}
var hasRequiredCurve;
function requireCurve() {
  if (hasRequiredCurve)
    return curve;
  hasRequiredCurve = 1;
  (function(exports) {
    var curve2 = exports;
    curve2.base = requireBase$1();
    curve2.short = requireShort();
    curve2.mont = requireMont();
    curve2.edwards = requireEdwards();
  })(curve);
  return curve;
}
var curves = {};
var hash = {};
var utils = {};
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils)
    return utils;
  hasRequiredUtils = 1;
  var assert = requireMinimalisticAssert();
  var inherits2 = requireInherits();
  utils.inherits = inherits2;
  function isSurrogatePair(msg, i) {
    if ((msg.charCodeAt(i) & 64512) !== 55296) {
      return false;
    }
    if (i < 0 || i + 1 >= msg.length) {
      return false;
    }
    return (msg.charCodeAt(i + 1) & 64512) === 56320;
  }
  function toArray(msg, enc) {
    if (Array.isArray(msg))
      return msg.slice();
    if (!msg)
      return [];
    var res = [];
    if (typeof msg === "string") {
      if (!enc) {
        var p = 0;
        for (var i = 0; i < msg.length; i++) {
          var c = msg.charCodeAt(i);
          if (c < 128) {
            res[p++] = c;
          } else if (c < 2048) {
            res[p++] = c >> 6 | 192;
            res[p++] = c & 63 | 128;
          } else if (isSurrogatePair(msg, i)) {
            c = 65536 + ((c & 1023) << 10) + (msg.charCodeAt(++i) & 1023);
            res[p++] = c >> 18 | 240;
            res[p++] = c >> 12 & 63 | 128;
            res[p++] = c >> 6 & 63 | 128;
            res[p++] = c & 63 | 128;
          } else {
            res[p++] = c >> 12 | 224;
            res[p++] = c >> 6 & 63 | 128;
            res[p++] = c & 63 | 128;
          }
        }
      } else if (enc === "hex") {
        msg = msg.replace(/[^a-z0-9]+/ig, "");
        if (msg.length % 2 !== 0)
          msg = "0" + msg;
        for (i = 0; i < msg.length; i += 2)
          res.push(parseInt(msg[i] + msg[i + 1], 16));
      }
    } else {
      for (i = 0; i < msg.length; i++)
        res[i] = msg[i] | 0;
    }
    return res;
  }
  utils.toArray = toArray;
  function toHex(msg) {
    var res = "";
    for (var i = 0; i < msg.length; i++)
      res += zero2(msg[i].toString(16));
    return res;
  }
  utils.toHex = toHex;
  function htonl(w) {
    var res = w >>> 24 | w >>> 8 & 65280 | w << 8 & 16711680 | (w & 255) << 24;
    return res >>> 0;
  }
  utils.htonl = htonl;
  function toHex32(msg, endian) {
    var res = "";
    for (var i = 0; i < msg.length; i++) {
      var w = msg[i];
      if (endian === "little")
        w = htonl(w);
      res += zero8(w.toString(16));
    }
    return res;
  }
  utils.toHex32 = toHex32;
  function zero2(word) {
    if (word.length === 1)
      return "0" + word;
    else
      return word;
  }
  utils.zero2 = zero2;
  function zero8(word) {
    if (word.length === 7)
      return "0" + word;
    else if (word.length === 6)
      return "00" + word;
    else if (word.length === 5)
      return "000" + word;
    else if (word.length === 4)
      return "0000" + word;
    else if (word.length === 3)
      return "00000" + word;
    else if (word.length === 2)
      return "000000" + word;
    else if (word.length === 1)
      return "0000000" + word;
    else
      return word;
  }
  utils.zero8 = zero8;
  function join32(msg, start, end, endian) {
    var len = end - start;
    assert(len % 4 === 0);
    var res = new Array(len / 4);
    for (var i = 0, k = start; i < res.length; i++, k += 4) {
      var w;
      if (endian === "big")
        w = msg[k] << 24 | msg[k + 1] << 16 | msg[k + 2] << 8 | msg[k + 3];
      else
        w = msg[k + 3] << 24 | msg[k + 2] << 16 | msg[k + 1] << 8 | msg[k];
      res[i] = w >>> 0;
    }
    return res;
  }
  utils.join32 = join32;
  function split32(msg, endian) {
    var res = new Array(msg.length * 4);
    for (var i = 0, k = 0; i < msg.length; i++, k += 4) {
      var m = msg[i];
      if (endian === "big") {
        res[k] = m >>> 24;
        res[k + 1] = m >>> 16 & 255;
        res[k + 2] = m >>> 8 & 255;
        res[k + 3] = m & 255;
      } else {
        res[k + 3] = m >>> 24;
        res[k + 2] = m >>> 16 & 255;
        res[k + 1] = m >>> 8 & 255;
        res[k] = m & 255;
      }
    }
    return res;
  }
  utils.split32 = split32;
  function rotr32(w, b) {
    return w >>> b | w << 32 - b;
  }
  utils.rotr32 = rotr32;
  function rotl32(w, b) {
    return w << b | w >>> 32 - b;
  }
  utils.rotl32 = rotl32;
  function sum32(a, b) {
    return a + b >>> 0;
  }
  utils.sum32 = sum32;
  function sum32_3(a, b, c) {
    return a + b + c >>> 0;
  }
  utils.sum32_3 = sum32_3;
  function sum32_4(a, b, c, d) {
    return a + b + c + d >>> 0;
  }
  utils.sum32_4 = sum32_4;
  function sum32_5(a, b, c, d, e) {
    return a + b + c + d + e >>> 0;
  }
  utils.sum32_5 = sum32_5;
  function sum64(buf, pos, ah, al) {
    var bh = buf[pos];
    var bl = buf[pos + 1];
    var lo = al + bl >>> 0;
    var hi = (lo < al ? 1 : 0) + ah + bh;
    buf[pos] = hi >>> 0;
    buf[pos + 1] = lo;
  }
  utils.sum64 = sum64;
  function sum64_hi(ah, al, bh, bl) {
    var lo = al + bl >>> 0;
    var hi = (lo < al ? 1 : 0) + ah + bh;
    return hi >>> 0;
  }
  utils.sum64_hi = sum64_hi;
  function sum64_lo(ah, al, bh, bl) {
    var lo = al + bl;
    return lo >>> 0;
  }
  utils.sum64_lo = sum64_lo;
  function sum64_4_hi(ah, al, bh, bl, ch, cl, dh, dl) {
    var carry = 0;
    var lo = al;
    lo = lo + bl >>> 0;
    carry += lo < al ? 1 : 0;
    lo = lo + cl >>> 0;
    carry += lo < cl ? 1 : 0;
    lo = lo + dl >>> 0;
    carry += lo < dl ? 1 : 0;
    var hi = ah + bh + ch + dh + carry;
    return hi >>> 0;
  }
  utils.sum64_4_hi = sum64_4_hi;
  function sum64_4_lo(ah, al, bh, bl, ch, cl, dh, dl) {
    var lo = al + bl + cl + dl;
    return lo >>> 0;
  }
  utils.sum64_4_lo = sum64_4_lo;
  function sum64_5_hi(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
    var carry = 0;
    var lo = al;
    lo = lo + bl >>> 0;
    carry += lo < al ? 1 : 0;
    lo = lo + cl >>> 0;
    carry += lo < cl ? 1 : 0;
    lo = lo + dl >>> 0;
    carry += lo < dl ? 1 : 0;
    lo = lo + el >>> 0;
    carry += lo < el ? 1 : 0;
    var hi = ah + bh + ch + dh + eh + carry;
    return hi >>> 0;
  }
  utils.sum64_5_hi = sum64_5_hi;
  function sum64_5_lo(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
    var lo = al + bl + cl + dl + el;
    return lo >>> 0;
  }
  utils.sum64_5_lo = sum64_5_lo;
  function rotr64_hi(ah, al, num) {
    var r = al << 32 - num | ah >>> num;
    return r >>> 0;
  }
  utils.rotr64_hi = rotr64_hi;
  function rotr64_lo(ah, al, num) {
    var r = ah << 32 - num | al >>> num;
    return r >>> 0;
  }
  utils.rotr64_lo = rotr64_lo;
  function shr64_hi(ah, al, num) {
    return ah >>> num;
  }
  utils.shr64_hi = shr64_hi;
  function shr64_lo(ah, al, num) {
    var r = ah << 32 - num | al >>> num;
    return r >>> 0;
  }
  utils.shr64_lo = shr64_lo;
  return utils;
}
var common$1 = {};
var hasRequiredCommon$1;
function requireCommon$1() {
  if (hasRequiredCommon$1)
    return common$1;
  hasRequiredCommon$1 = 1;
  var utils2 = requireUtils();
  var assert = requireMinimalisticAssert();
  function BlockHash() {
    this.pending = null;
    this.pendingTotal = 0;
    this.blockSize = this.constructor.blockSize;
    this.outSize = this.constructor.outSize;
    this.hmacStrength = this.constructor.hmacStrength;
    this.padLength = this.constructor.padLength / 8;
    this.endian = "big";
    this._delta8 = this.blockSize / 8;
    this._delta32 = this.blockSize / 32;
  }
  common$1.BlockHash = BlockHash;
  BlockHash.prototype.update = function update(msg, enc) {
    msg = utils2.toArray(msg, enc);
    if (!this.pending)
      this.pending = msg;
    else
      this.pending = this.pending.concat(msg);
    this.pendingTotal += msg.length;
    if (this.pending.length >= this._delta8) {
      msg = this.pending;
      var r = msg.length % this._delta8;
      this.pending = msg.slice(msg.length - r, msg.length);
      if (this.pending.length === 0)
        this.pending = null;
      msg = utils2.join32(msg, 0, msg.length - r, this.endian);
      for (var i = 0; i < msg.length; i += this._delta32)
        this._update(msg, i, i + this._delta32);
    }
    return this;
  };
  BlockHash.prototype.digest = function digest(enc) {
    this.update(this._pad());
    assert(this.pending === null);
    return this._digest(enc);
  };
  BlockHash.prototype._pad = function pad() {
    var len = this.pendingTotal;
    var bytes = this._delta8;
    var k = bytes - (len + this.padLength) % bytes;
    var res = new Array(k + this.padLength);
    res[0] = 128;
    for (var i = 1; i < k; i++)
      res[i] = 0;
    len <<= 3;
    if (this.endian === "big") {
      for (var t = 8; t < this.padLength; t++)
        res[i++] = 0;
      res[i++] = 0;
      res[i++] = 0;
      res[i++] = 0;
      res[i++] = 0;
      res[i++] = len >>> 24 & 255;
      res[i++] = len >>> 16 & 255;
      res[i++] = len >>> 8 & 255;
      res[i++] = len & 255;
    } else {
      res[i++] = len & 255;
      res[i++] = len >>> 8 & 255;
      res[i++] = len >>> 16 & 255;
      res[i++] = len >>> 24 & 255;
      res[i++] = 0;
      res[i++] = 0;
      res[i++] = 0;
      res[i++] = 0;
      for (t = 8; t < this.padLength; t++)
        res[i++] = 0;
    }
    return res;
  };
  return common$1;
}
var sha = {};
var common = {};
var hasRequiredCommon;
function requireCommon() {
  if (hasRequiredCommon)
    return common;
  hasRequiredCommon = 1;
  var utils2 = requireUtils();
  var rotr32 = utils2.rotr32;
  function ft_1(s, x, y, z) {
    if (s === 0)
      return ch32(x, y, z);
    if (s === 1 || s === 3)
      return p32(x, y, z);
    if (s === 2)
      return maj32(x, y, z);
  }
  common.ft_1 = ft_1;
  function ch32(x, y, z) {
    return x & y ^ ~x & z;
  }
  common.ch32 = ch32;
  function maj32(x, y, z) {
    return x & y ^ x & z ^ y & z;
  }
  common.maj32 = maj32;
  function p32(x, y, z) {
    return x ^ y ^ z;
  }
  common.p32 = p32;
  function s0_256(x) {
    return rotr32(x, 2) ^ rotr32(x, 13) ^ rotr32(x, 22);
  }
  common.s0_256 = s0_256;
  function s1_256(x) {
    return rotr32(x, 6) ^ rotr32(x, 11) ^ rotr32(x, 25);
  }
  common.s1_256 = s1_256;
  function g0_256(x) {
    return rotr32(x, 7) ^ rotr32(x, 18) ^ x >>> 3;
  }
  common.g0_256 = g0_256;
  function g1_256(x) {
    return rotr32(x, 17) ^ rotr32(x, 19) ^ x >>> 10;
  }
  common.g1_256 = g1_256;
  return common;
}
var _1;
var hasRequired_1;
function require_1() {
  if (hasRequired_1)
    return _1;
  hasRequired_1 = 1;
  var utils2 = requireUtils();
  var common2 = requireCommon$1();
  var shaCommon = requireCommon();
  var rotl32 = utils2.rotl32;
  var sum32 = utils2.sum32;
  var sum32_5 = utils2.sum32_5;
  var ft_1 = shaCommon.ft_1;
  var BlockHash = common2.BlockHash;
  var sha1_K = [
    1518500249,
    1859775393,
    2400959708,
    3395469782
  ];
  function SHA1() {
    if (!(this instanceof SHA1))
      return new SHA1();
    BlockHash.call(this);
    this.h = [
      1732584193,
      4023233417,
      2562383102,
      271733878,
      3285377520
    ];
    this.W = new Array(80);
  }
  utils2.inherits(SHA1, BlockHash);
  _1 = SHA1;
  SHA1.blockSize = 512;
  SHA1.outSize = 160;
  SHA1.hmacStrength = 80;
  SHA1.padLength = 64;
  SHA1.prototype._update = function _update(msg, start) {
    var W = this.W;
    for (var i = 0; i < 16; i++)
      W[i] = msg[start + i];
    for (; i < W.length; i++)
      W[i] = rotl32(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
    var a = this.h[0];
    var b = this.h[1];
    var c = this.h[2];
    var d = this.h[3];
    var e = this.h[4];
    for (i = 0; i < W.length; i++) {
      var s = ~~(i / 20);
      var t = sum32_5(rotl32(a, 5), ft_1(s, b, c, d), e, W[i], sha1_K[s]);
      e = d;
      d = c;
      c = rotl32(b, 30);
      b = a;
      a = t;
    }
    this.h[0] = sum32(this.h[0], a);
    this.h[1] = sum32(this.h[1], b);
    this.h[2] = sum32(this.h[2], c);
    this.h[3] = sum32(this.h[3], d);
    this.h[4] = sum32(this.h[4], e);
  };
  SHA1.prototype._digest = function digest(enc) {
    if (enc === "hex")
      return utils2.toHex32(this.h, "big");
    else
      return utils2.split32(this.h, "big");
  };
  return _1;
}
var _256;
var hasRequired_256;
function require_256() {
  if (hasRequired_256)
    return _256;
  hasRequired_256 = 1;
  var utils2 = requireUtils();
  var common2 = requireCommon$1();
  var shaCommon = requireCommon();
  var assert = requireMinimalisticAssert();
  var sum32 = utils2.sum32;
  var sum32_4 = utils2.sum32_4;
  var sum32_5 = utils2.sum32_5;
  var ch32 = shaCommon.ch32;
  var maj32 = shaCommon.maj32;
  var s0_256 = shaCommon.s0_256;
  var s1_256 = shaCommon.s1_256;
  var g0_256 = shaCommon.g0_256;
  var g1_256 = shaCommon.g1_256;
  var BlockHash = common2.BlockHash;
  var sha256_K = [
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ];
  function SHA256() {
    if (!(this instanceof SHA256))
      return new SHA256();
    BlockHash.call(this);
    this.h = [
      1779033703,
      3144134277,
      1013904242,
      2773480762,
      1359893119,
      2600822924,
      528734635,
      1541459225
    ];
    this.k = sha256_K;
    this.W = new Array(64);
  }
  utils2.inherits(SHA256, BlockHash);
  _256 = SHA256;
  SHA256.blockSize = 512;
  SHA256.outSize = 256;
  SHA256.hmacStrength = 192;
  SHA256.padLength = 64;
  SHA256.prototype._update = function _update(msg, start) {
    var W = this.W;
    for (var i = 0; i < 16; i++)
      W[i] = msg[start + i];
    for (; i < W.length; i++)
      W[i] = sum32_4(g1_256(W[i - 2]), W[i - 7], g0_256(W[i - 15]), W[i - 16]);
    var a = this.h[0];
    var b = this.h[1];
    var c = this.h[2];
    var d = this.h[3];
    var e = this.h[4];
    var f = this.h[5];
    var g = this.h[6];
    var h = this.h[7];
    assert(this.k.length === W.length);
    for (i = 0; i < W.length; i++) {
      var T1 = sum32_5(h, s1_256(e), ch32(e, f, g), this.k[i], W[i]);
      var T2 = sum32(s0_256(a), maj32(a, b, c));
      h = g;
      g = f;
      f = e;
      e = sum32(d, T1);
      d = c;
      c = b;
      b = a;
      a = sum32(T1, T2);
    }
    this.h[0] = sum32(this.h[0], a);
    this.h[1] = sum32(this.h[1], b);
    this.h[2] = sum32(this.h[2], c);
    this.h[3] = sum32(this.h[3], d);
    this.h[4] = sum32(this.h[4], e);
    this.h[5] = sum32(this.h[5], f);
    this.h[6] = sum32(this.h[6], g);
    this.h[7] = sum32(this.h[7], h);
  };
  SHA256.prototype._digest = function digest(enc) {
    if (enc === "hex")
      return utils2.toHex32(this.h, "big");
    else
      return utils2.split32(this.h, "big");
  };
  return _256;
}
var _224;
var hasRequired_224;
function require_224() {
  if (hasRequired_224)
    return _224;
  hasRequired_224 = 1;
  var utils2 = requireUtils();
  var SHA256 = require_256();
  function SHA224() {
    if (!(this instanceof SHA224))
      return new SHA224();
    SHA256.call(this);
    this.h = [
      3238371032,
      914150663,
      812702999,
      4144912697,
      4290775857,
      1750603025,
      1694076839,
      3204075428
    ];
  }
  utils2.inherits(SHA224, SHA256);
  _224 = SHA224;
  SHA224.blockSize = 512;
  SHA224.outSize = 224;
  SHA224.hmacStrength = 192;
  SHA224.padLength = 64;
  SHA224.prototype._digest = function digest(enc) {
    if (enc === "hex")
      return utils2.toHex32(this.h.slice(0, 7), "big");
    else
      return utils2.split32(this.h.slice(0, 7), "big");
  };
  return _224;
}
var _512;
var hasRequired_512;
function require_512() {
  if (hasRequired_512)
    return _512;
  hasRequired_512 = 1;
  var utils2 = requireUtils();
  var common2 = requireCommon$1();
  var assert = requireMinimalisticAssert();
  var rotr64_hi = utils2.rotr64_hi;
  var rotr64_lo = utils2.rotr64_lo;
  var shr64_hi = utils2.shr64_hi;
  var shr64_lo = utils2.shr64_lo;
  var sum64 = utils2.sum64;
  var sum64_hi = utils2.sum64_hi;
  var sum64_lo = utils2.sum64_lo;
  var sum64_4_hi = utils2.sum64_4_hi;
  var sum64_4_lo = utils2.sum64_4_lo;
  var sum64_5_hi = utils2.sum64_5_hi;
  var sum64_5_lo = utils2.sum64_5_lo;
  var BlockHash = common2.BlockHash;
  var sha512_K = [
    1116352408,
    3609767458,
    1899447441,
    602891725,
    3049323471,
    3964484399,
    3921009573,
    2173295548,
    961987163,
    4081628472,
    1508970993,
    3053834265,
    2453635748,
    2937671579,
    2870763221,
    3664609560,
    3624381080,
    2734883394,
    310598401,
    1164996542,
    607225278,
    1323610764,
    1426881987,
    3590304994,
    1925078388,
    4068182383,
    2162078206,
    991336113,
    2614888103,
    633803317,
    3248222580,
    3479774868,
    3835390401,
    2666613458,
    4022224774,
    944711139,
    264347078,
    2341262773,
    604807628,
    2007800933,
    770255983,
    1495990901,
    1249150122,
    1856431235,
    1555081692,
    3175218132,
    1996064986,
    2198950837,
    2554220882,
    3999719339,
    2821834349,
    766784016,
    2952996808,
    2566594879,
    3210313671,
    3203337956,
    3336571891,
    1034457026,
    3584528711,
    2466948901,
    113926993,
    3758326383,
    338241895,
    168717936,
    666307205,
    1188179964,
    773529912,
    1546045734,
    1294757372,
    1522805485,
    1396182291,
    2643833823,
    1695183700,
    2343527390,
    1986661051,
    1014477480,
    2177026350,
    1206759142,
    2456956037,
    344077627,
    2730485921,
    1290863460,
    2820302411,
    3158454273,
    3259730800,
    3505952657,
    3345764771,
    106217008,
    3516065817,
    3606008344,
    3600352804,
    1432725776,
    4094571909,
    1467031594,
    275423344,
    851169720,
    430227734,
    3100823752,
    506948616,
    1363258195,
    659060556,
    3750685593,
    883997877,
    3785050280,
    958139571,
    3318307427,
    1322822218,
    3812723403,
    1537002063,
    2003034995,
    1747873779,
    3602036899,
    1955562222,
    1575990012,
    2024104815,
    1125592928,
    2227730452,
    2716904306,
    2361852424,
    442776044,
    2428436474,
    593698344,
    2756734187,
    3733110249,
    3204031479,
    2999351573,
    3329325298,
    3815920427,
    3391569614,
    3928383900,
    3515267271,
    566280711,
    3940187606,
    3454069534,
    4118630271,
    4000239992,
    116418474,
    1914138554,
    174292421,
    2731055270,
    289380356,
    3203993006,
    460393269,
    320620315,
    685471733,
    587496836,
    852142971,
    1086792851,
    1017036298,
    365543100,
    1126000580,
    2618297676,
    1288033470,
    3409855158,
    1501505948,
    4234509866,
    1607167915,
    987167468,
    1816402316,
    1246189591
  ];
  function SHA512() {
    if (!(this instanceof SHA512))
      return new SHA512();
    BlockHash.call(this);
    this.h = [
      1779033703,
      4089235720,
      3144134277,
      2227873595,
      1013904242,
      4271175723,
      2773480762,
      1595750129,
      1359893119,
      2917565137,
      2600822924,
      725511199,
      528734635,
      4215389547,
      1541459225,
      327033209
    ];
    this.k = sha512_K;
    this.W = new Array(160);
  }
  utils2.inherits(SHA512, BlockHash);
  _512 = SHA512;
  SHA512.blockSize = 1024;
  SHA512.outSize = 512;
  SHA512.hmacStrength = 192;
  SHA512.padLength = 128;
  SHA512.prototype._prepareBlock = function _prepareBlock(msg, start) {
    var W = this.W;
    for (var i = 0; i < 32; i++)
      W[i] = msg[start + i];
    for (; i < W.length; i += 2) {
      var c0_hi = g1_512_hi(W[i - 4], W[i - 3]);
      var c0_lo = g1_512_lo(W[i - 4], W[i - 3]);
      var c1_hi = W[i - 14];
      var c1_lo = W[i - 13];
      var c2_hi = g0_512_hi(W[i - 30], W[i - 29]);
      var c2_lo = g0_512_lo(W[i - 30], W[i - 29]);
      var c3_hi = W[i - 32];
      var c3_lo = W[i - 31];
      W[i] = sum64_4_hi(
        c0_hi,
        c0_lo,
        c1_hi,
        c1_lo,
        c2_hi,
        c2_lo,
        c3_hi,
        c3_lo
      );
      W[i + 1] = sum64_4_lo(
        c0_hi,
        c0_lo,
        c1_hi,
        c1_lo,
        c2_hi,
        c2_lo,
        c3_hi,
        c3_lo
      );
    }
  };
  SHA512.prototype._update = function _update(msg, start) {
    this._prepareBlock(msg, start);
    var W = this.W;
    var ah = this.h[0];
    var al = this.h[1];
    var bh = this.h[2];
    var bl = this.h[3];
    var ch = this.h[4];
    var cl = this.h[5];
    var dh = this.h[6];
    var dl = this.h[7];
    var eh = this.h[8];
    var el = this.h[9];
    var fh = this.h[10];
    var fl = this.h[11];
    var gh = this.h[12];
    var gl = this.h[13];
    var hh = this.h[14];
    var hl = this.h[15];
    assert(this.k.length === W.length);
    for (var i = 0; i < W.length; i += 2) {
      var c0_hi = hh;
      var c0_lo = hl;
      var c1_hi = s1_512_hi(eh, el);
      var c1_lo = s1_512_lo(eh, el);
      var c2_hi = ch64_hi(eh, el, fh, fl, gh);
      var c2_lo = ch64_lo(eh, el, fh, fl, gh, gl);
      var c3_hi = this.k[i];
      var c3_lo = this.k[i + 1];
      var c4_hi = W[i];
      var c4_lo = W[i + 1];
      var T1_hi = sum64_5_hi(
        c0_hi,
        c0_lo,
        c1_hi,
        c1_lo,
        c2_hi,
        c2_lo,
        c3_hi,
        c3_lo,
        c4_hi,
        c4_lo
      );
      var T1_lo = sum64_5_lo(
        c0_hi,
        c0_lo,
        c1_hi,
        c1_lo,
        c2_hi,
        c2_lo,
        c3_hi,
        c3_lo,
        c4_hi,
        c4_lo
      );
      c0_hi = s0_512_hi(ah, al);
      c0_lo = s0_512_lo(ah, al);
      c1_hi = maj64_hi(ah, al, bh, bl, ch);
      c1_lo = maj64_lo(ah, al, bh, bl, ch, cl);
      var T2_hi = sum64_hi(c0_hi, c0_lo, c1_hi, c1_lo);
      var T2_lo = sum64_lo(c0_hi, c0_lo, c1_hi, c1_lo);
      hh = gh;
      hl = gl;
      gh = fh;
      gl = fl;
      fh = eh;
      fl = el;
      eh = sum64_hi(dh, dl, T1_hi, T1_lo);
      el = sum64_lo(dl, dl, T1_hi, T1_lo);
      dh = ch;
      dl = cl;
      ch = bh;
      cl = bl;
      bh = ah;
      bl = al;
      ah = sum64_hi(T1_hi, T1_lo, T2_hi, T2_lo);
      al = sum64_lo(T1_hi, T1_lo, T2_hi, T2_lo);
    }
    sum64(this.h, 0, ah, al);
    sum64(this.h, 2, bh, bl);
    sum64(this.h, 4, ch, cl);
    sum64(this.h, 6, dh, dl);
    sum64(this.h, 8, eh, el);
    sum64(this.h, 10, fh, fl);
    sum64(this.h, 12, gh, gl);
    sum64(this.h, 14, hh, hl);
  };
  SHA512.prototype._digest = function digest(enc) {
    if (enc === "hex")
      return utils2.toHex32(this.h, "big");
    else
      return utils2.split32(this.h, "big");
  };
  function ch64_hi(xh, xl, yh, yl, zh) {
    var r = xh & yh ^ ~xh & zh;
    if (r < 0)
      r += 4294967296;
    return r;
  }
  function ch64_lo(xh, xl, yh, yl, zh, zl) {
    var r = xl & yl ^ ~xl & zl;
    if (r < 0)
      r += 4294967296;
    return r;
  }
  function maj64_hi(xh, xl, yh, yl, zh) {
    var r = xh & yh ^ xh & zh ^ yh & zh;
    if (r < 0)
      r += 4294967296;
    return r;
  }
  function maj64_lo(xh, xl, yh, yl, zh, zl) {
    var r = xl & yl ^ xl & zl ^ yl & zl;
    if (r < 0)
      r += 4294967296;
    return r;
  }
  function s0_512_hi(xh, xl) {
    var c0_hi = rotr64_hi(xh, xl, 28);
    var c1_hi = rotr64_hi(xl, xh, 2);
    var c2_hi = rotr64_hi(xl, xh, 7);
    var r = c0_hi ^ c1_hi ^ c2_hi;
    if (r < 0)
      r += 4294967296;
    return r;
  }
  function s0_512_lo(xh, xl) {
    var c0_lo = rotr64_lo(xh, xl, 28);
    var c1_lo = rotr64_lo(xl, xh, 2);
    var c2_lo = rotr64_lo(xl, xh, 7);
    var r = c0_lo ^ c1_lo ^ c2_lo;
    if (r < 0)
      r += 4294967296;
    return r;
  }
  function s1_512_hi(xh, xl) {
    var c0_hi = rotr64_hi(xh, xl, 14);
    var c1_hi = rotr64_hi(xh, xl, 18);
    var c2_hi = rotr64_hi(xl, xh, 9);
    var r = c0_hi ^ c1_hi ^ c2_hi;
    if (r < 0)
      r += 4294967296;
    return r;
  }
  function s1_512_lo(xh, xl) {
    var c0_lo = rotr64_lo(xh, xl, 14);
    var c1_lo = rotr64_lo(xh, xl, 18);
    var c2_lo = rotr64_lo(xl, xh, 9);
    var r = c0_lo ^ c1_lo ^ c2_lo;
    if (r < 0)
      r += 4294967296;
    return r;
  }
  function g0_512_hi(xh, xl) {
    var c0_hi = rotr64_hi(xh, xl, 1);
    var c1_hi = rotr64_hi(xh, xl, 8);
    var c2_hi = shr64_hi(xh, xl, 7);
    var r = c0_hi ^ c1_hi ^ c2_hi;
    if (r < 0)
      r += 4294967296;
    return r;
  }
  function g0_512_lo(xh, xl) {
    var c0_lo = rotr64_lo(xh, xl, 1);
    var c1_lo = rotr64_lo(xh, xl, 8);
    var c2_lo = shr64_lo(xh, xl, 7);
    var r = c0_lo ^ c1_lo ^ c2_lo;
    if (r < 0)
      r += 4294967296;
    return r;
  }
  function g1_512_hi(xh, xl) {
    var c0_hi = rotr64_hi(xh, xl, 19);
    var c1_hi = rotr64_hi(xl, xh, 29);
    var c2_hi = shr64_hi(xh, xl, 6);
    var r = c0_hi ^ c1_hi ^ c2_hi;
    if (r < 0)
      r += 4294967296;
    return r;
  }
  function g1_512_lo(xh, xl) {
    var c0_lo = rotr64_lo(xh, xl, 19);
    var c1_lo = rotr64_lo(xl, xh, 29);
    var c2_lo = shr64_lo(xh, xl, 6);
    var r = c0_lo ^ c1_lo ^ c2_lo;
    if (r < 0)
      r += 4294967296;
    return r;
  }
  return _512;
}
var _384;
var hasRequired_384;
function require_384() {
  if (hasRequired_384)
    return _384;
  hasRequired_384 = 1;
  var utils2 = requireUtils();
  var SHA512 = require_512();
  function SHA384() {
    if (!(this instanceof SHA384))
      return new SHA384();
    SHA512.call(this);
    this.h = [
      3418070365,
      3238371032,
      1654270250,
      914150663,
      2438529370,
      812702999,
      355462360,
      4144912697,
      1731405415,
      4290775857,
      2394180231,
      1750603025,
      3675008525,
      1694076839,
      1203062813,
      3204075428
    ];
  }
  utils2.inherits(SHA384, SHA512);
  _384 = SHA384;
  SHA384.blockSize = 1024;
  SHA384.outSize = 384;
  SHA384.hmacStrength = 192;
  SHA384.padLength = 128;
  SHA384.prototype._digest = function digest(enc) {
    if (enc === "hex")
      return utils2.toHex32(this.h.slice(0, 12), "big");
    else
      return utils2.split32(this.h.slice(0, 12), "big");
  };
  return _384;
}
var hasRequiredSha;
function requireSha() {
  if (hasRequiredSha)
    return sha;
  hasRequiredSha = 1;
  sha.sha1 = require_1();
  sha.sha224 = require_224();
  sha.sha256 = require_256();
  sha.sha384 = require_384();
  sha.sha512 = require_512();
  return sha;
}
var ripemd = {};
var hasRequiredRipemd;
function requireRipemd() {
  if (hasRequiredRipemd)
    return ripemd;
  hasRequiredRipemd = 1;
  var utils2 = requireUtils();
  var common2 = requireCommon$1();
  var rotl32 = utils2.rotl32;
  var sum32 = utils2.sum32;
  var sum32_3 = utils2.sum32_3;
  var sum32_4 = utils2.sum32_4;
  var BlockHash = common2.BlockHash;
  function RIPEMD160() {
    if (!(this instanceof RIPEMD160))
      return new RIPEMD160();
    BlockHash.call(this);
    this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
    this.endian = "little";
  }
  utils2.inherits(RIPEMD160, BlockHash);
  ripemd.ripemd160 = RIPEMD160;
  RIPEMD160.blockSize = 512;
  RIPEMD160.outSize = 160;
  RIPEMD160.hmacStrength = 192;
  RIPEMD160.padLength = 64;
  RIPEMD160.prototype._update = function update(msg, start) {
    var A = this.h[0];
    var B = this.h[1];
    var C = this.h[2];
    var D = this.h[3];
    var E = this.h[4];
    var Ah = A;
    var Bh = B;
    var Ch = C;
    var Dh = D;
    var Eh = E;
    for (var j = 0; j < 80; j++) {
      var T = sum32(
        rotl32(
          sum32_4(A, f(j, B, C, D), msg[r[j] + start], K(j)),
          s[j]
        ),
        E
      );
      A = E;
      E = D;
      D = rotl32(C, 10);
      C = B;
      B = T;
      T = sum32(
        rotl32(
          sum32_4(Ah, f(79 - j, Bh, Ch, Dh), msg[rh[j] + start], Kh(j)),
          sh[j]
        ),
        Eh
      );
      Ah = Eh;
      Eh = Dh;
      Dh = rotl32(Ch, 10);
      Ch = Bh;
      Bh = T;
    }
    T = sum32_3(this.h[1], C, Dh);
    this.h[1] = sum32_3(this.h[2], D, Eh);
    this.h[2] = sum32_3(this.h[3], E, Ah);
    this.h[3] = sum32_3(this.h[4], A, Bh);
    this.h[4] = sum32_3(this.h[0], B, Ch);
    this.h[0] = T;
  };
  RIPEMD160.prototype._digest = function digest(enc) {
    if (enc === "hex")
      return utils2.toHex32(this.h, "little");
    else
      return utils2.split32(this.h, "little");
  };
  function f(j, x, y, z) {
    if (j <= 15)
      return x ^ y ^ z;
    else if (j <= 31)
      return x & y | ~x & z;
    else if (j <= 47)
      return (x | ~y) ^ z;
    else if (j <= 63)
      return x & z | y & ~z;
    else
      return x ^ (y | ~z);
  }
  function K(j) {
    if (j <= 15)
      return 0;
    else if (j <= 31)
      return 1518500249;
    else if (j <= 47)
      return 1859775393;
    else if (j <= 63)
      return 2400959708;
    else
      return 2840853838;
  }
  function Kh(j) {
    if (j <= 15)
      return 1352829926;
    else if (j <= 31)
      return 1548603684;
    else if (j <= 47)
      return 1836072691;
    else if (j <= 63)
      return 2053994217;
    else
      return 0;
  }
  var r = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    7,
    4,
    13,
    1,
    10,
    6,
    15,
    3,
    12,
    0,
    9,
    5,
    2,
    14,
    11,
    8,
    3,
    10,
    14,
    4,
    9,
    15,
    8,
    1,
    2,
    7,
    0,
    6,
    13,
    11,
    5,
    12,
    1,
    9,
    11,
    10,
    0,
    8,
    12,
    4,
    13,
    3,
    7,
    15,
    14,
    5,
    6,
    2,
    4,
    0,
    5,
    9,
    7,
    12,
    2,
    10,
    14,
    1,
    3,
    8,
    11,
    6,
    15,
    13
  ];
  var rh = [
    5,
    14,
    7,
    0,
    9,
    2,
    11,
    4,
    13,
    6,
    15,
    8,
    1,
    10,
    3,
    12,
    6,
    11,
    3,
    7,
    0,
    13,
    5,
    10,
    14,
    15,
    8,
    12,
    4,
    9,
    1,
    2,
    15,
    5,
    1,
    3,
    7,
    14,
    6,
    9,
    11,
    8,
    12,
    2,
    10,
    0,
    4,
    13,
    8,
    6,
    4,
    1,
    3,
    11,
    15,
    0,
    5,
    12,
    2,
    13,
    9,
    7,
    10,
    14,
    12,
    15,
    10,
    4,
    1,
    5,
    8,
    7,
    6,
    2,
    13,
    14,
    0,
    3,
    9,
    11
  ];
  var s = [
    11,
    14,
    15,
    12,
    5,
    8,
    7,
    9,
    11,
    13,
    14,
    15,
    6,
    7,
    9,
    8,
    7,
    6,
    8,
    13,
    11,
    9,
    7,
    15,
    7,
    12,
    15,
    9,
    11,
    7,
    13,
    12,
    11,
    13,
    6,
    7,
    14,
    9,
    13,
    15,
    14,
    8,
    13,
    6,
    5,
    12,
    7,
    5,
    11,
    12,
    14,
    15,
    14,
    15,
    9,
    8,
    9,
    14,
    5,
    6,
    8,
    6,
    5,
    12,
    9,
    15,
    5,
    11,
    6,
    8,
    13,
    12,
    5,
    12,
    13,
    14,
    11,
    8,
    5,
    6
  ];
  var sh = [
    8,
    9,
    9,
    11,
    13,
    15,
    15,
    5,
    7,
    7,
    8,
    11,
    14,
    14,
    12,
    6,
    9,
    13,
    15,
    7,
    12,
    8,
    9,
    11,
    7,
    7,
    12,
    7,
    6,
    15,
    13,
    11,
    9,
    7,
    15,
    11,
    8,
    6,
    6,
    14,
    12,
    13,
    5,
    14,
    13,
    13,
    7,
    5,
    15,
    5,
    8,
    11,
    14,
    14,
    6,
    14,
    6,
    9,
    12,
    9,
    12,
    5,
    15,
    8,
    8,
    5,
    12,
    9,
    12,
    5,
    14,
    6,
    8,
    13,
    6,
    5,
    15,
    13,
    11,
    11
  ];
  return ripemd;
}
var hmac;
var hasRequiredHmac;
function requireHmac() {
  if (hasRequiredHmac)
    return hmac;
  hasRequiredHmac = 1;
  var utils2 = requireUtils();
  var assert = requireMinimalisticAssert();
  function Hmac(hash2, key2, enc) {
    if (!(this instanceof Hmac))
      return new Hmac(hash2, key2, enc);
    this.Hash = hash2;
    this.blockSize = hash2.blockSize / 8;
    this.outSize = hash2.outSize / 8;
    this.inner = null;
    this.outer = null;
    this._init(utils2.toArray(key2, enc));
  }
  hmac = Hmac;
  Hmac.prototype._init = function init(key2) {
    if (key2.length > this.blockSize)
      key2 = new this.Hash().update(key2).digest();
    assert(key2.length <= this.blockSize);
    for (var i = key2.length; i < this.blockSize; i++)
      key2.push(0);
    for (i = 0; i < key2.length; i++)
      key2[i] ^= 54;
    this.inner = new this.Hash().update(key2);
    for (i = 0; i < key2.length; i++)
      key2[i] ^= 106;
    this.outer = new this.Hash().update(key2);
  };
  Hmac.prototype.update = function update(msg, enc) {
    this.inner.update(msg, enc);
    return this;
  };
  Hmac.prototype.digest = function digest(enc) {
    this.outer.update(this.inner.digest());
    return this.outer.digest(enc);
  };
  return hmac;
}
var hasRequiredHash;
function requireHash() {
  if (hasRequiredHash)
    return hash;
  hasRequiredHash = 1;
  (function(exports) {
    var hash2 = exports;
    hash2.utils = requireUtils();
    hash2.common = requireCommon$1();
    hash2.sha = requireSha();
    hash2.ripemd = requireRipemd();
    hash2.hmac = requireHmac();
    hash2.sha1 = hash2.sha.sha1;
    hash2.sha256 = hash2.sha.sha256;
    hash2.sha224 = hash2.sha.sha224;
    hash2.sha384 = hash2.sha.sha384;
    hash2.sha512 = hash2.sha.sha512;
    hash2.ripemd160 = hash2.ripemd.ripemd160;
  })(hash);
  return hash;
}
var secp256k1;
var hasRequiredSecp256k1;
function requireSecp256k1() {
  if (hasRequiredSecp256k1)
    return secp256k1;
  hasRequiredSecp256k1 = 1;
  secp256k1 = {
    doubles: {
      step: 4,
      points: [
        [
          "e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a",
          "f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821"
        ],
        [
          "8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508",
          "11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf"
        ],
        [
          "175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739",
          "d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695"
        ],
        [
          "363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640",
          "4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9"
        ],
        [
          "8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c",
          "4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36"
        ],
        [
          "723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda",
          "96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f"
        ],
        [
          "eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa",
          "5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999"
        ],
        [
          "100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0",
          "cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09"
        ],
        [
          "e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d",
          "9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d"
        ],
        [
          "feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d",
          "e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088"
        ],
        [
          "da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1",
          "9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d"
        ],
        [
          "53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0",
          "5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8"
        ],
        [
          "8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047",
          "10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a"
        ],
        [
          "385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862",
          "283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453"
        ],
        [
          "6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7",
          "7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160"
        ],
        [
          "3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd",
          "56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0"
        ],
        [
          "85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83",
          "7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6"
        ],
        [
          "948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a",
          "53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589"
        ],
        [
          "6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8",
          "bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17"
        ],
        [
          "e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d",
          "4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda"
        ],
        [
          "e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725",
          "7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd"
        ],
        [
          "213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754",
          "4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2"
        ],
        [
          "4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c",
          "17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6"
        ],
        [
          "fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6",
          "6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f"
        ],
        [
          "76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39",
          "c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01"
        ],
        [
          "c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891",
          "893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3"
        ],
        [
          "d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b",
          "febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f"
        ],
        [
          "b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03",
          "2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7"
        ],
        [
          "e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d",
          "eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78"
        ],
        [
          "a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070",
          "7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1"
        ],
        [
          "90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4",
          "e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150"
        ],
        [
          "8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da",
          "662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82"
        ],
        [
          "e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11",
          "1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc"
        ],
        [
          "8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e",
          "efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b"
        ],
        [
          "e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41",
          "2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51"
        ],
        [
          "b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef",
          "67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45"
        ],
        [
          "d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8",
          "db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120"
        ],
        [
          "324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d",
          "648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84"
        ],
        [
          "4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96",
          "35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d"
        ],
        [
          "9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd",
          "ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d"
        ],
        [
          "6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5",
          "9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8"
        ],
        [
          "a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266",
          "40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8"
        ],
        [
          "7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71",
          "34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac"
        ],
        [
          "928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac",
          "c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f"
        ],
        [
          "85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751",
          "1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962"
        ],
        [
          "ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e",
          "493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907"
        ],
        [
          "827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241",
          "c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec"
        ],
        [
          "eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3",
          "be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d"
        ],
        [
          "e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f",
          "4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414"
        ],
        [
          "1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19",
          "aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd"
        ],
        [
          "146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be",
          "b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0"
        ],
        [
          "fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9",
          "6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811"
        ],
        [
          "da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2",
          "8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1"
        ],
        [
          "a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13",
          "7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c"
        ],
        [
          "174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c",
          "ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73"
        ],
        [
          "959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba",
          "2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd"
        ],
        [
          "d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151",
          "e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405"
        ],
        [
          "64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073",
          "d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589"
        ],
        [
          "8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458",
          "38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e"
        ],
        [
          "13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b",
          "69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27"
        ],
        [
          "bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366",
          "d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1"
        ],
        [
          "8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa",
          "40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482"
        ],
        [
          "8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0",
          "620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945"
        ],
        [
          "dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787",
          "7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573"
        ],
        [
          "f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e",
          "ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82"
        ]
      ]
    },
    naf: {
      wnd: 7,
      points: [
        [
          "f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9",
          "388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672"
        ],
        [
          "2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4",
          "d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6"
        ],
        [
          "5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc",
          "6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da"
        ],
        [
          "acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe",
          "cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37"
        ],
        [
          "774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb",
          "d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b"
        ],
        [
          "f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8",
          "ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81"
        ],
        [
          "d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e",
          "581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58"
        ],
        [
          "defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34",
          "4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77"
        ],
        [
          "2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c",
          "85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a"
        ],
        [
          "352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5",
          "321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c"
        ],
        [
          "2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f",
          "2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67"
        ],
        [
          "9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714",
          "73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402"
        ],
        [
          "daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729",
          "a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55"
        ],
        [
          "c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db",
          "2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482"
        ],
        [
          "6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4",
          "e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82"
        ],
        [
          "1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5",
          "b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396"
        ],
        [
          "605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479",
          "2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49"
        ],
        [
          "62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d",
          "80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf"
        ],
        [
          "80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f",
          "1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a"
        ],
        [
          "7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb",
          "d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7"
        ],
        [
          "d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9",
          "eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933"
        ],
        [
          "49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963",
          "758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a"
        ],
        [
          "77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74",
          "958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6"
        ],
        [
          "f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530",
          "e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37"
        ],
        [
          "463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b",
          "5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e"
        ],
        [
          "f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247",
          "cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6"
        ],
        [
          "caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1",
          "cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476"
        ],
        [
          "2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120",
          "4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40"
        ],
        [
          "7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435",
          "91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61"
        ],
        [
          "754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18",
          "673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683"
        ],
        [
          "e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8",
          "59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5"
        ],
        [
          "186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb",
          "3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b"
        ],
        [
          "df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f",
          "55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417"
        ],
        [
          "5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143",
          "efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868"
        ],
        [
          "290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba",
          "e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a"
        ],
        [
          "af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45",
          "f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6"
        ],
        [
          "766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a",
          "744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996"
        ],
        [
          "59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e",
          "c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e"
        ],
        [
          "f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8",
          "e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d"
        ],
        [
          "7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c",
          "30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2"
        ],
        [
          "948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519",
          "e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e"
        ],
        [
          "7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab",
          "100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437"
        ],
        [
          "3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca",
          "ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311"
        ],
        [
          "d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf",
          "8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4"
        ],
        [
          "1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610",
          "68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575"
        ],
        [
          "733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4",
          "f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d"
        ],
        [
          "15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c",
          "d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d"
        ],
        [
          "a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940",
          "edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629"
        ],
        [
          "e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980",
          "a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06"
        ],
        [
          "311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3",
          "66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374"
        ],
        [
          "34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf",
          "9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee"
        ],
        [
          "f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63",
          "4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1"
        ],
        [
          "d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448",
          "fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b"
        ],
        [
          "32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf",
          "5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661"
        ],
        [
          "7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5",
          "8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6"
        ],
        [
          "ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6",
          "8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e"
        ],
        [
          "16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5",
          "5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d"
        ],
        [
          "eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99",
          "f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc"
        ],
        [
          "78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51",
          "f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4"
        ],
        [
          "494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5",
          "42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c"
        ],
        [
          "a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5",
          "204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b"
        ],
        [
          "c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997",
          "4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913"
        ],
        [
          "841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881",
          "73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154"
        ],
        [
          "5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5",
          "39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865"
        ],
        [
          "36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66",
          "d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc"
        ],
        [
          "336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726",
          "ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224"
        ],
        [
          "8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede",
          "6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e"
        ],
        [
          "1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94",
          "60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6"
        ],
        [
          "85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31",
          "3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511"
        ],
        [
          "29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51",
          "b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b"
        ],
        [
          "a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252",
          "ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2"
        ],
        [
          "4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5",
          "cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c"
        ],
        [
          "d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b",
          "6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3"
        ],
        [
          "ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4",
          "322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d"
        ],
        [
          "af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f",
          "6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700"
        ],
        [
          "e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889",
          "2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4"
        ],
        [
          "591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246",
          "b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196"
        ],
        [
          "11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984",
          "998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4"
        ],
        [
          "3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a",
          "b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257"
        ],
        [
          "cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030",
          "bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13"
        ],
        [
          "c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197",
          "6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096"
        ],
        [
          "c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593",
          "c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38"
        ],
        [
          "a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef",
          "21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f"
        ],
        [
          "347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38",
          "60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448"
        ],
        [
          "da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a",
          "49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a"
        ],
        [
          "c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111",
          "5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4"
        ],
        [
          "4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502",
          "7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437"
        ],
        [
          "3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea",
          "be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7"
        ],
        [
          "cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26",
          "8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d"
        ],
        [
          "b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986",
          "39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a"
        ],
        [
          "d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e",
          "62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54"
        ],
        [
          "48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4",
          "25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77"
        ],
        [
          "dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda",
          "ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517"
        ],
        [
          "6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859",
          "cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10"
        ],
        [
          "e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f",
          "f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125"
        ],
        [
          "eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c",
          "6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e"
        ],
        [
          "13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942",
          "fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1"
        ],
        [
          "ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a",
          "1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2"
        ],
        [
          "b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80",
          "5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423"
        ],
        [
          "ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d",
          "438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8"
        ],
        [
          "8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1",
          "cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758"
        ],
        [
          "52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63",
          "c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375"
        ],
        [
          "e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352",
          "6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d"
        ],
        [
          "7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193",
          "ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec"
        ],
        [
          "5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00",
          "9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0"
        ],
        [
          "32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58",
          "ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c"
        ],
        [
          "e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7",
          "d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4"
        ],
        [
          "8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8",
          "c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f"
        ],
        [
          "4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e",
          "67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649"
        ],
        [
          "3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d",
          "cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826"
        ],
        [
          "674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b",
          "299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5"
        ],
        [
          "d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f",
          "f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87"
        ],
        [
          "30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6",
          "462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b"
        ],
        [
          "be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297",
          "62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc"
        ],
        [
          "93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a",
          "7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c"
        ],
        [
          "b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c",
          "ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f"
        ],
        [
          "d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52",
          "4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a"
        ],
        [
          "d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb",
          "bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46"
        ],
        [
          "463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065",
          "bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f"
        ],
        [
          "7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917",
          "603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03"
        ],
        [
          "74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9",
          "cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08"
        ],
        [
          "30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3",
          "553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8"
        ],
        [
          "9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57",
          "712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373"
        ],
        [
          "176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66",
          "ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3"
        ],
        [
          "75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8",
          "9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8"
        ],
        [
          "809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721",
          "9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1"
        ],
        [
          "1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180",
          "4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9"
        ]
      ]
    }
  };
  return secp256k1;
}
var hasRequiredCurves;
function requireCurves() {
  if (hasRequiredCurves)
    return curves;
  hasRequiredCurves = 1;
  (function(exports) {
    var curves2 = exports;
    var hash2 = requireHash();
    var curve2 = requireCurve();
    var utils2 = requireUtils$1();
    var assert = utils2.assert;
    function PresetCurve(options) {
      if (options.type === "short")
        this.curve = new curve2.short(options);
      else if (options.type === "edwards")
        this.curve = new curve2.edwards(options);
      else
        this.curve = new curve2.mont(options);
      this.g = this.curve.g;
      this.n = this.curve.n;
      this.hash = options.hash;
      assert(this.g.validate(), "Invalid curve");
      assert(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O");
    }
    curves2.PresetCurve = PresetCurve;
    function defineCurve(name2, options) {
      Object.defineProperty(curves2, name2, {
        configurable: true,
        enumerable: true,
        get: function() {
          var curve3 = new PresetCurve(options);
          Object.defineProperty(curves2, name2, {
            configurable: true,
            enumerable: true,
            value: curve3
          });
          return curve3;
        }
      });
    }
    defineCurve("p192", {
      type: "short",
      prime: "p192",
      p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
      a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
      b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
      n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
      hash: hash2.sha256,
      gRed: false,
      g: [
        "188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012",
        "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"
      ]
    });
    defineCurve("p224", {
      type: "short",
      prime: "p224",
      p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
      a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
      b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
      n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
      hash: hash2.sha256,
      gRed: false,
      g: [
        "b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21",
        "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"
      ]
    });
    defineCurve("p256", {
      type: "short",
      prime: null,
      p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
      a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
      b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
      n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
      hash: hash2.sha256,
      gRed: false,
      g: [
        "6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296",
        "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"
      ]
    });
    defineCurve("p384", {
      type: "short",
      prime: null,
      p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
      a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
      b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
      n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
      hash: hash2.sha384,
      gRed: false,
      g: [
        "aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7",
        "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"
      ]
    });
    defineCurve("p521", {
      type: "short",
      prime: null,
      p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
      a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
      b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
      n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
      hash: hash2.sha512,
      gRed: false,
      g: [
        "000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66",
        "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"
      ]
    });
    defineCurve("curve25519", {
      type: "mont",
      prime: "p25519",
      p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
      a: "76d06",
      b: "1",
      n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
      hash: hash2.sha256,
      gRed: false,
      g: [
        "9"
      ]
    });
    defineCurve("ed25519", {
      type: "edwards",
      prime: "p25519",
      p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
      a: "-1",
      c: "1",
      // -121665 * (121666^(-1)) (mod P)
      d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
      n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
      hash: hash2.sha256,
      gRed: false,
      g: [
        "216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a",
        // 4/5
        "6666666666666666666666666666666666666666666666666666666666666658"
      ]
    });
    var pre;
    try {
      pre = requireSecp256k1();
    } catch (e) {
      pre = void 0;
    }
    defineCurve("secp256k1", {
      type: "short",
      prime: "k256",
      p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
      a: "0",
      b: "7",
      n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
      h: "1",
      hash: hash2.sha256,
      // Precomputed endomorphism
      beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
      lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
      basis: [
        {
          a: "3086d221a7d46bcde86c90e49284eb15",
          b: "-e4437ed6010e88286f547fa90abfe4c3"
        },
        {
          a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
          b: "3086d221a7d46bcde86c90e49284eb15"
        }
      ],
      gRed: false,
      g: [
        "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
        "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
        pre
      ]
    });
  })(curves);
  return curves;
}
var hmacDrbg;
var hasRequiredHmacDrbg;
function requireHmacDrbg() {
  if (hasRequiredHmacDrbg)
    return hmacDrbg;
  hasRequiredHmacDrbg = 1;
  var hash2 = requireHash();
  var utils2 = requireUtils$2();
  var assert = requireMinimalisticAssert();
  function HmacDRBG(options) {
    if (!(this instanceof HmacDRBG))
      return new HmacDRBG(options);
    this.hash = options.hash;
    this.predResist = !!options.predResist;
    this.outLen = this.hash.outSize;
    this.minEntropy = options.minEntropy || this.hash.hmacStrength;
    this._reseed = null;
    this.reseedInterval = null;
    this.K = null;
    this.V = null;
    var entropy = utils2.toArray(options.entropy, options.entropyEnc || "hex");
    var nonce = utils2.toArray(options.nonce, options.nonceEnc || "hex");
    var pers = utils2.toArray(options.pers, options.persEnc || "hex");
    assert(
      entropy.length >= this.minEntropy / 8,
      "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
    );
    this._init(entropy, nonce, pers);
  }
  hmacDrbg = HmacDRBG;
  HmacDRBG.prototype._init = function init(entropy, nonce, pers) {
    var seed = entropy.concat(nonce).concat(pers);
    this.K = new Array(this.outLen / 8);
    this.V = new Array(this.outLen / 8);
    for (var i = 0; i < this.V.length; i++) {
      this.K[i] = 0;
      this.V[i] = 1;
    }
    this._update(seed);
    this._reseed = 1;
    this.reseedInterval = 281474976710656;
  };
  HmacDRBG.prototype._hmac = function hmac2() {
    return new hash2.hmac(this.hash, this.K);
  };
  HmacDRBG.prototype._update = function update(seed) {
    var kmac = this._hmac().update(this.V).update([0]);
    if (seed)
      kmac = kmac.update(seed);
    this.K = kmac.digest();
    this.V = this._hmac().update(this.V).digest();
    if (!seed)
      return;
    this.K = this._hmac().update(this.V).update([1]).update(seed).digest();
    this.V = this._hmac().update(this.V).digest();
  };
  HmacDRBG.prototype.reseed = function reseed(entropy, entropyEnc, add, addEnc) {
    if (typeof entropyEnc !== "string") {
      addEnc = add;
      add = entropyEnc;
      entropyEnc = null;
    }
    entropy = utils2.toArray(entropy, entropyEnc);
    add = utils2.toArray(add, addEnc);
    assert(
      entropy.length >= this.minEntropy / 8,
      "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
    );
    this._update(entropy.concat(add || []));
    this._reseed = 1;
  };
  HmacDRBG.prototype.generate = function generate(len, enc, add, addEnc) {
    if (this._reseed > this.reseedInterval)
      throw new Error("Reseed is required");
    if (typeof enc !== "string") {
      addEnc = add;
      add = enc;
      enc = null;
    }
    if (add) {
      add = utils2.toArray(add, addEnc || "hex");
      this._update(add);
    }
    var temp = [];
    while (temp.length < len) {
      this.V = this._hmac().update(this.V).digest();
      temp = temp.concat(this.V);
    }
    var res = temp.slice(0, len);
    this._update(add);
    this._reseed++;
    return utils2.encode(res, enc);
  };
  return hmacDrbg;
}
var key$1;
var hasRequiredKey$1;
function requireKey$1() {
  if (hasRequiredKey$1)
    return key$1;
  hasRequiredKey$1 = 1;
  var BN = requireBn$1();
  var utils2 = requireUtils$1();
  var assert = utils2.assert;
  function KeyPair(ec2, options) {
    this.ec = ec2;
    this.priv = null;
    this.pub = null;
    if (options.priv)
      this._importPrivate(options.priv, options.privEnc);
    if (options.pub)
      this._importPublic(options.pub, options.pubEnc);
  }
  key$1 = KeyPair;
  KeyPair.fromPublic = function fromPublic(ec2, pub, enc) {
    if (pub instanceof KeyPair)
      return pub;
    return new KeyPair(ec2, {
      pub,
      pubEnc: enc
    });
  };
  KeyPair.fromPrivate = function fromPrivate(ec2, priv, enc) {
    if (priv instanceof KeyPair)
      return priv;
    return new KeyPair(ec2, {
      priv,
      privEnc: enc
    });
  };
  KeyPair.prototype.validate = function validate() {
    var pub = this.getPublic();
    if (pub.isInfinity())
      return { result: false, reason: "Invalid public key" };
    if (!pub.validate())
      return { result: false, reason: "Public key is not a point" };
    if (!pub.mul(this.ec.curve.n).isInfinity())
      return { result: false, reason: "Public key * N != O" };
    return { result: true, reason: null };
  };
  KeyPair.prototype.getPublic = function getPublic(compact, enc) {
    if (typeof compact === "string") {
      enc = compact;
      compact = null;
    }
    if (!this.pub)
      this.pub = this.ec.g.mul(this.priv);
    if (!enc)
      return this.pub;
    return this.pub.encode(enc, compact);
  };
  KeyPair.prototype.getPrivate = function getPrivate(enc) {
    if (enc === "hex")
      return this.priv.toString(16, 2);
    else
      return this.priv;
  };
  KeyPair.prototype._importPrivate = function _importPrivate(key2, enc) {
    this.priv = new BN(key2, enc || 16);
    this.priv = this.priv.umod(this.ec.curve.n);
  };
  KeyPair.prototype._importPublic = function _importPublic(key2, enc) {
    if (key2.x || key2.y) {
      if (this.ec.curve.type === "mont") {
        assert(key2.x, "Need x coordinate");
      } else if (this.ec.curve.type === "short" || this.ec.curve.type === "edwards") {
        assert(key2.x && key2.y, "Need both x and y coordinate");
      }
      this.pub = this.ec.curve.point(key2.x, key2.y);
      return;
    }
    this.pub = this.ec.curve.decodePoint(key2, enc);
  };
  KeyPair.prototype.derive = function derive(pub) {
    if (!pub.validate()) {
      assert(pub.validate(), "public point not validated");
    }
    return pub.mul(this.priv).getX();
  };
  KeyPair.prototype.sign = function sign(msg, enc, options) {
    return this.ec.sign(msg, this, enc, options);
  };
  KeyPair.prototype.verify = function verify(msg, signature2) {
    return this.ec.verify(msg, signature2, this);
  };
  KeyPair.prototype.inspect = function inspect() {
    return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >";
  };
  return key$1;
}
var signature$1;
var hasRequiredSignature$1;
function requireSignature$1() {
  if (hasRequiredSignature$1)
    return signature$1;
  hasRequiredSignature$1 = 1;
  var BN = requireBn$1();
  var utils2 = requireUtils$1();
  var assert = utils2.assert;
  function Signature(options, enc) {
    if (options instanceof Signature)
      return options;
    if (this._importDER(options, enc))
      return;
    assert(options.r && options.s, "Signature without r or s");
    this.r = new BN(options.r, 16);
    this.s = new BN(options.s, 16);
    if (options.recoveryParam === void 0)
      this.recoveryParam = null;
    else
      this.recoveryParam = options.recoveryParam;
  }
  signature$1 = Signature;
  function Position() {
    this.place = 0;
  }
  function getLength(buf, p) {
    var initial = buf[p.place++];
    if (!(initial & 128)) {
      return initial;
    }
    var octetLen = initial & 15;
    if (octetLen === 0 || octetLen > 4) {
      return false;
    }
    var val = 0;
    for (var i = 0, off = p.place; i < octetLen; i++, off++) {
      val <<= 8;
      val |= buf[off];
      val >>>= 0;
    }
    if (val <= 127) {
      return false;
    }
    p.place = off;
    return val;
  }
  function rmPadding(buf) {
    var i = 0;
    var len = buf.length - 1;
    while (!buf[i] && !(buf[i + 1] & 128) && i < len) {
      i++;
    }
    if (i === 0) {
      return buf;
    }
    return buf.slice(i);
  }
  Signature.prototype._importDER = function _importDER(data, enc) {
    data = utils2.toArray(data, enc);
    var p = new Position();
    if (data[p.place++] !== 48) {
      return false;
    }
    var len = getLength(data, p);
    if (len === false) {
      return false;
    }
    if (len + p.place !== data.length) {
      return false;
    }
    if (data[p.place++] !== 2) {
      return false;
    }
    var rlen = getLength(data, p);
    if (rlen === false) {
      return false;
    }
    var r = data.slice(p.place, rlen + p.place);
    p.place += rlen;
    if (data[p.place++] !== 2) {
      return false;
    }
    var slen = getLength(data, p);
    if (slen === false) {
      return false;
    }
    if (data.length !== slen + p.place) {
      return false;
    }
    var s = data.slice(p.place, slen + p.place);
    if (r[0] === 0) {
      if (r[1] & 128) {
        r = r.slice(1);
      } else {
        return false;
      }
    }
    if (s[0] === 0) {
      if (s[1] & 128) {
        s = s.slice(1);
      } else {
        return false;
      }
    }
    this.r = new BN(r);
    this.s = new BN(s);
    this.recoveryParam = null;
    return true;
  };
  function constructLength(arr, len) {
    if (len < 128) {
      arr.push(len);
      return;
    }
    var octets = 1 + (Math.log(len) / Math.LN2 >>> 3);
    arr.push(octets | 128);
    while (--octets) {
      arr.push(len >>> (octets << 3) & 255);
    }
    arr.push(len);
  }
  Signature.prototype.toDER = function toDER(enc) {
    var r = this.r.toArray();
    var s = this.s.toArray();
    if (r[0] & 128)
      r = [0].concat(r);
    if (s[0] & 128)
      s = [0].concat(s);
    r = rmPadding(r);
    s = rmPadding(s);
    while (!s[0] && !(s[1] & 128)) {
      s = s.slice(1);
    }
    var arr = [2];
    constructLength(arr, r.length);
    arr = arr.concat(r);
    arr.push(2);
    constructLength(arr, s.length);
    var backHalf = arr.concat(s);
    var res = [48];
    constructLength(res, backHalf.length);
    res = res.concat(backHalf);
    return utils2.encode(res, enc);
  };
  return signature$1;
}
var ec;
var hasRequiredEc;
function requireEc() {
  if (hasRequiredEc)
    return ec;
  hasRequiredEc = 1;
  var BN = requireBn$1();
  var HmacDRBG = requireHmacDrbg();
  var utils2 = requireUtils$1();
  var curves2 = requireCurves();
  var rand = requireBrorand();
  var assert = utils2.assert;
  var KeyPair = requireKey$1();
  var Signature = requireSignature$1();
  function EC(options) {
    if (!(this instanceof EC))
      return new EC(options);
    if (typeof options === "string") {
      assert(
        Object.prototype.hasOwnProperty.call(curves2, options),
        "Unknown curve " + options
      );
      options = curves2[options];
    }
    if (options instanceof curves2.PresetCurve)
      options = { curve: options };
    this.curve = options.curve.curve;
    this.n = this.curve.n;
    this.nh = this.n.ushrn(1);
    this.g = this.curve.g;
    this.g = options.curve.g;
    this.g.precompute(options.curve.n.bitLength() + 1);
    this.hash = options.hash || options.curve.hash;
  }
  ec = EC;
  EC.prototype.keyPair = function keyPair(options) {
    return new KeyPair(this, options);
  };
  EC.prototype.keyFromPrivate = function keyFromPrivate(priv, enc) {
    return KeyPair.fromPrivate(this, priv, enc);
  };
  EC.prototype.keyFromPublic = function keyFromPublic(pub, enc) {
    return KeyPair.fromPublic(this, pub, enc);
  };
  EC.prototype.genKeyPair = function genKeyPair(options) {
    if (!options)
      options = {};
    var drbg = new HmacDRBG({
      hash: this.hash,
      pers: options.pers,
      persEnc: options.persEnc || "utf8",
      entropy: options.entropy || rand(this.hash.hmacStrength),
      entropyEnc: options.entropy && options.entropyEnc || "utf8",
      nonce: this.n.toArray()
    });
    var bytes = this.n.byteLength();
    var ns2 = this.n.sub(new BN(2));
    for (; ; ) {
      var priv = new BN(drbg.generate(bytes));
      if (priv.cmp(ns2) > 0)
        continue;
      priv.iaddn(1);
      return this.keyFromPrivate(priv);
    }
  };
  EC.prototype._truncateToN = function _truncateToN(msg, truncOnly) {
    var delta = msg.byteLength() * 8 - this.n.bitLength();
    if (delta > 0)
      msg = msg.ushrn(delta);
    if (!truncOnly && msg.cmp(this.n) >= 0)
      return msg.sub(this.n);
    else
      return msg;
  };
  EC.prototype.sign = function sign(msg, key2, enc, options) {
    if (typeof enc === "object") {
      options = enc;
      enc = null;
    }
    if (!options)
      options = {};
    key2 = this.keyFromPrivate(key2, enc);
    msg = this._truncateToN(new BN(msg, 16));
    var bytes = this.n.byteLength();
    var bkey = key2.getPrivate().toArray("be", bytes);
    var nonce = msg.toArray("be", bytes);
    var drbg = new HmacDRBG({
      hash: this.hash,
      entropy: bkey,
      nonce,
      pers: options.pers,
      persEnc: options.persEnc || "utf8"
    });
    var ns1 = this.n.sub(new BN(1));
    for (var iter = 0; ; iter++) {
      var k = options.k ? options.k(iter) : new BN(drbg.generate(this.n.byteLength()));
      k = this._truncateToN(k, true);
      if (k.cmpn(1) <= 0 || k.cmp(ns1) >= 0)
        continue;
      var kp = this.g.mul(k);
      if (kp.isInfinity())
        continue;
      var kpX = kp.getX();
      var r = kpX.umod(this.n);
      if (r.cmpn(0) === 0)
        continue;
      var s = k.invm(this.n).mul(r.mul(key2.getPrivate()).iadd(msg));
      s = s.umod(this.n);
      if (s.cmpn(0) === 0)
        continue;
      var recoveryParam = (kp.getY().isOdd() ? 1 : 0) | (kpX.cmp(r) !== 0 ? 2 : 0);
      if (options.canonical && s.cmp(this.nh) > 0) {
        s = this.n.sub(s);
        recoveryParam ^= 1;
      }
      return new Signature({ r, s, recoveryParam });
    }
  };
  EC.prototype.verify = function verify(msg, signature2, key2, enc) {
    msg = this._truncateToN(new BN(msg, 16));
    key2 = this.keyFromPublic(key2, enc);
    signature2 = new Signature(signature2, "hex");
    var r = signature2.r;
    var s = signature2.s;
    if (r.cmpn(1) < 0 || r.cmp(this.n) >= 0)
      return false;
    if (s.cmpn(1) < 0 || s.cmp(this.n) >= 0)
      return false;
    var sinv = s.invm(this.n);
    var u1 = sinv.mul(msg).umod(this.n);
    var u2 = sinv.mul(r).umod(this.n);
    var p;
    if (!this.curve._maxwellTrick) {
      p = this.g.mulAdd(u1, key2.getPublic(), u2);
      if (p.isInfinity())
        return false;
      return p.getX().umod(this.n).cmp(r) === 0;
    }
    p = this.g.jmulAdd(u1, key2.getPublic(), u2);
    if (p.isInfinity())
      return false;
    return p.eqXToP(r);
  };
  EC.prototype.recoverPubKey = function(msg, signature2, j, enc) {
    assert((3 & j) === j, "The recovery param is more than two bits");
    signature2 = new Signature(signature2, enc);
    var n = this.n;
    var e = new BN(msg);
    var r = signature2.r;
    var s = signature2.s;
    var isYOdd = j & 1;
    var isSecondKey = j >> 1;
    if (r.cmp(this.curve.p.umod(this.curve.n)) >= 0 && isSecondKey)
      throw new Error("Unable to find sencond key candinate");
    if (isSecondKey)
      r = this.curve.pointFromX(r.add(this.curve.n), isYOdd);
    else
      r = this.curve.pointFromX(r, isYOdd);
    var rInv = signature2.r.invm(n);
    var s1 = n.sub(e).mul(rInv).umod(n);
    var s2 = s.mul(rInv).umod(n);
    return this.g.mulAdd(s1, r, s2);
  };
  EC.prototype.getKeyRecoveryParam = function(e, signature2, Q, enc) {
    signature2 = new Signature(signature2, enc);
    if (signature2.recoveryParam !== null)
      return signature2.recoveryParam;
    for (var i = 0; i < 4; i++) {
      var Qprime;
      try {
        Qprime = this.recoverPubKey(e, signature2, i);
      } catch (e2) {
        continue;
      }
      if (Qprime.eq(Q))
        return i;
    }
    throw new Error("Unable to find valid recovery factor");
  };
  return ec;
}
var key;
var hasRequiredKey;
function requireKey() {
  if (hasRequiredKey)
    return key;
  hasRequiredKey = 1;
  var utils2 = requireUtils$1();
  var assert = utils2.assert;
  var parseBytes = utils2.parseBytes;
  var cachedProperty = utils2.cachedProperty;
  function KeyPair(eddsa2, params) {
    this.eddsa = eddsa2;
    this._secret = parseBytes(params.secret);
    if (eddsa2.isPoint(params.pub))
      this._pub = params.pub;
    else
      this._pubBytes = parseBytes(params.pub);
  }
  KeyPair.fromPublic = function fromPublic(eddsa2, pub) {
    if (pub instanceof KeyPair)
      return pub;
    return new KeyPair(eddsa2, { pub });
  };
  KeyPair.fromSecret = function fromSecret(eddsa2, secret) {
    if (secret instanceof KeyPair)
      return secret;
    return new KeyPair(eddsa2, { secret });
  };
  KeyPair.prototype.secret = function secret() {
    return this._secret;
  };
  cachedProperty(KeyPair, "pubBytes", function pubBytes() {
    return this.eddsa.encodePoint(this.pub());
  });
  cachedProperty(KeyPair, "pub", function pub() {
    if (this._pubBytes)
      return this.eddsa.decodePoint(this._pubBytes);
    return this.eddsa.g.mul(this.priv());
  });
  cachedProperty(KeyPair, "privBytes", function privBytes() {
    var eddsa2 = this.eddsa;
    var hash2 = this.hash();
    var lastIx = eddsa2.encodingLength - 1;
    var a = hash2.slice(0, eddsa2.encodingLength);
    a[0] &= 248;
    a[lastIx] &= 127;
    a[lastIx] |= 64;
    return a;
  });
  cachedProperty(KeyPair, "priv", function priv() {
    return this.eddsa.decodeInt(this.privBytes());
  });
  cachedProperty(KeyPair, "hash", function hash2() {
    return this.eddsa.hash().update(this.secret()).digest();
  });
  cachedProperty(KeyPair, "messagePrefix", function messagePrefix() {
    return this.hash().slice(this.eddsa.encodingLength);
  });
  KeyPair.prototype.sign = function sign(message) {
    assert(this._secret, "KeyPair can only verify");
    return this.eddsa.sign(message, this);
  };
  KeyPair.prototype.verify = function verify(message, sig) {
    return this.eddsa.verify(message, sig, this);
  };
  KeyPair.prototype.getSecret = function getSecret(enc) {
    assert(this._secret, "KeyPair is public only");
    return utils2.encode(this.secret(), enc);
  };
  KeyPair.prototype.getPublic = function getPublic(enc) {
    return utils2.encode(this.pubBytes(), enc);
  };
  key = KeyPair;
  return key;
}
var signature;
var hasRequiredSignature;
function requireSignature() {
  if (hasRequiredSignature)
    return signature;
  hasRequiredSignature = 1;
  var BN = requireBn$1();
  var utils2 = requireUtils$1();
  var assert = utils2.assert;
  var cachedProperty = utils2.cachedProperty;
  var parseBytes = utils2.parseBytes;
  function Signature(eddsa2, sig) {
    this.eddsa = eddsa2;
    if (typeof sig !== "object")
      sig = parseBytes(sig);
    if (Array.isArray(sig)) {
      sig = {
        R: sig.slice(0, eddsa2.encodingLength),
        S: sig.slice(eddsa2.encodingLength)
      };
    }
    assert(sig.R && sig.S, "Signature without R or S");
    if (eddsa2.isPoint(sig.R))
      this._R = sig.R;
    if (sig.S instanceof BN)
      this._S = sig.S;
    this._Rencoded = Array.isArray(sig.R) ? sig.R : sig.Rencoded;
    this._Sencoded = Array.isArray(sig.S) ? sig.S : sig.Sencoded;
  }
  cachedProperty(Signature, "S", function S() {
    return this.eddsa.decodeInt(this.Sencoded());
  });
  cachedProperty(Signature, "R", function R2() {
    return this.eddsa.decodePoint(this.Rencoded());
  });
  cachedProperty(Signature, "Rencoded", function Rencoded() {
    return this.eddsa.encodePoint(this.R());
  });
  cachedProperty(Signature, "Sencoded", function Sencoded() {
    return this.eddsa.encodeInt(this.S());
  });
  Signature.prototype.toBytes = function toBytes() {
    return this.Rencoded().concat(this.Sencoded());
  };
  Signature.prototype.toHex = function toHex() {
    return utils2.encode(this.toBytes(), "hex").toUpperCase();
  };
  signature = Signature;
  return signature;
}
var eddsa;
var hasRequiredEddsa;
function requireEddsa() {
  if (hasRequiredEddsa)
    return eddsa;
  hasRequiredEddsa = 1;
  var hash2 = requireHash();
  var curves2 = requireCurves();
  var utils2 = requireUtils$1();
  var assert = utils2.assert;
  var parseBytes = utils2.parseBytes;
  var KeyPair = requireKey();
  var Signature = requireSignature();
  function EDDSA(curve2) {
    assert(curve2 === "ed25519", "only tested with ed25519 so far");
    if (!(this instanceof EDDSA))
      return new EDDSA(curve2);
    curve2 = curves2[curve2].curve;
    this.curve = curve2;
    this.g = curve2.g;
    this.g.precompute(curve2.n.bitLength() + 1);
    this.pointClass = curve2.point().constructor;
    this.encodingLength = Math.ceil(curve2.n.bitLength() / 8);
    this.hash = hash2.sha512;
  }
  eddsa = EDDSA;
  EDDSA.prototype.sign = function sign(message, secret) {
    message = parseBytes(message);
    var key2 = this.keyFromSecret(secret);
    var r = this.hashInt(key2.messagePrefix(), message);
    var R2 = this.g.mul(r);
    var Rencoded = this.encodePoint(R2);
    var s_ = this.hashInt(Rencoded, key2.pubBytes(), message).mul(key2.priv());
    var S = r.add(s_).umod(this.curve.n);
    return this.makeSignature({ R: R2, S, Rencoded });
  };
  EDDSA.prototype.verify = function verify(message, sig, pub) {
    message = parseBytes(message);
    sig = this.makeSignature(sig);
    var key2 = this.keyFromPublic(pub);
    var h = this.hashInt(sig.Rencoded(), key2.pubBytes(), message);
    var SG = this.g.mul(sig.S());
    var RplusAh = sig.R().add(key2.pub().mul(h));
    return RplusAh.eq(SG);
  };
  EDDSA.prototype.hashInt = function hashInt() {
    var hash3 = this.hash();
    for (var i = 0; i < arguments.length; i++)
      hash3.update(arguments[i]);
    return utils2.intFromLE(hash3.digest()).umod(this.curve.n);
  };
  EDDSA.prototype.keyFromPublic = function keyFromPublic(pub) {
    return KeyPair.fromPublic(this, pub);
  };
  EDDSA.prototype.keyFromSecret = function keyFromSecret(secret) {
    return KeyPair.fromSecret(this, secret);
  };
  EDDSA.prototype.makeSignature = function makeSignature(sig) {
    if (sig instanceof Signature)
      return sig;
    return new Signature(this, sig);
  };
  EDDSA.prototype.encodePoint = function encodePoint(point) {
    var enc = point.getY().toArray("le", this.encodingLength);
    enc[this.encodingLength - 1] |= point.getX().isOdd() ? 128 : 0;
    return enc;
  };
  EDDSA.prototype.decodePoint = function decodePoint(bytes) {
    bytes = utils2.parseBytes(bytes);
    var lastIx = bytes.length - 1;
    var normed = bytes.slice(0, lastIx).concat(bytes[lastIx] & ~128);
    var xIsOdd = (bytes[lastIx] & 128) !== 0;
    var y = utils2.intFromLE(normed);
    return this.curve.pointFromY(y, xIsOdd);
  };
  EDDSA.prototype.encodeInt = function encodeInt(num) {
    return num.toArray("le", this.encodingLength);
  };
  EDDSA.prototype.decodeInt = function decodeInt(bytes) {
    return utils2.intFromLE(bytes);
  };
  EDDSA.prototype.isPoint = function isPoint(val) {
    return val instanceof this.pointClass;
  };
  return eddsa;
}
var hasRequiredElliptic;
function requireElliptic() {
  if (hasRequiredElliptic)
    return elliptic;
  hasRequiredElliptic = 1;
  (function(exports) {
    var elliptic2 = exports;
    elliptic2.version = require$$0.version;
    elliptic2.utils = requireUtils$1();
    elliptic2.rand = requireBrorand();
    elliptic2.curve = requireCurve();
    elliptic2.curves = requireCurves();
    elliptic2.ec = requireEc();
    elliptic2.eddsa = requireEddsa();
  })(elliptic);
  return elliptic;
}
var browser$2;
var hasRequiredBrowser$2;
function requireBrowser$2() {
  if (hasRequiredBrowser$2)
    return browser$2;
  hasRequiredBrowser$2 = 1;
  var elliptic2 = requireElliptic();
  var BN = requireBn$1();
  browser$2 = function createECDH(curve2) {
    return new ECDH(curve2);
  };
  var aliases = {
    secp256k1: {
      name: "secp256k1",
      byteLength: 32
    },
    secp224r1: {
      name: "p224",
      byteLength: 28
    },
    prime256v1: {
      name: "p256",
      byteLength: 32
    },
    prime192v1: {
      name: "p192",
      byteLength: 24
    },
    ed25519: {
      name: "ed25519",
      byteLength: 32
    },
    secp384r1: {
      name: "p384",
      byteLength: 48
    },
    secp521r1: {
      name: "p521",
      byteLength: 66
    }
  };
  aliases.p224 = aliases.secp224r1;
  aliases.p256 = aliases.secp256r1 = aliases.prime256v1;
  aliases.p192 = aliases.secp192r1 = aliases.prime192v1;
  aliases.p384 = aliases.secp384r1;
  aliases.p521 = aliases.secp521r1;
  function ECDH(curve2) {
    this.curveType = aliases[curve2];
    if (!this.curveType) {
      this.curveType = {
        name: curve2
      };
    }
    this.curve = new elliptic2.ec(this.curveType.name);
    this.keys = void 0;
  }
  ECDH.prototype.generateKeys = function(enc, format) {
    this.keys = this.curve.genKeyPair();
    return this.getPublicKey(enc, format);
  };
  ECDH.prototype.computeSecret = function(other, inenc, enc) {
    inenc = inenc || "utf8";
    if (!buffer$1.Buffer.isBuffer(other)) {
      other = new buffer$1.Buffer(other, inenc);
    }
    var otherPub = this.curve.keyFromPublic(other).getPublic();
    var out = otherPub.mul(this.keys.getPrivate()).getX();
    return formatReturnValue(out, enc, this.curveType.byteLength);
  };
  ECDH.prototype.getPublicKey = function(enc, format) {
    var key2 = this.keys.getPublic(format === "compressed", true);
    if (format === "hybrid") {
      if (key2[key2.length - 1] % 2) {
        key2[0] = 7;
      } else {
        key2[0] = 6;
      }
    }
    return formatReturnValue(key2, enc);
  };
  ECDH.prototype.getPrivateKey = function(enc) {
    return formatReturnValue(this.keys.getPrivate(), enc);
  };
  ECDH.prototype.setPublicKey = function(pub, enc) {
    enc = enc || "utf8";
    if (!buffer$1.Buffer.isBuffer(pub)) {
      pub = new buffer$1.Buffer(pub, enc);
    }
    this.keys._importPublic(pub);
    return this;
  };
  ECDH.prototype.setPrivateKey = function(priv, enc) {
    enc = enc || "utf8";
    if (!buffer$1.Buffer.isBuffer(priv)) {
      priv = new buffer$1.Buffer(priv, enc);
    }
    var _priv = new BN(priv);
    _priv = _priv.toString(16);
    this.keys = this.curve.genKeyPair();
    this.keys._importPrivate(_priv);
    return this;
  };
  function formatReturnValue(bn2, enc, len) {
    if (!Array.isArray(bn2)) {
      bn2 = bn2.toArray();
    }
    var buf = new buffer$1.Buffer(bn2);
    if (len && buf.length < len) {
      var zeros = new buffer$1.Buffer(len - buf.length);
      zeros.fill(0);
      buf = buffer$1.Buffer.concat([zeros, buf]);
    }
    if (!enc) {
      return buf;
    } else {
      return buf.toString(enc);
    }
  }
  return browser$2;
}
var createEcdh;
var hasRequiredCreateEcdh;
function requireCreateEcdh() {
  if (hasRequiredCreateEcdh)
    return createEcdh;
  hasRequiredCreateEcdh = 1;
  var createECDH = requireCryptoBrowserify().createECDH;
  createEcdh = createECDH || requireBrowser$2();
  return createEcdh;
}
var publicEncrypt$1 = {};
var browser$1 = {};
var asn1$1 = {};
var asn1 = {};
var api = {};
var encoders = {};
var safer_1;
var hasRequiredSafer;
function requireSafer() {
  if (hasRequiredSafer)
    return safer_1;
  hasRequiredSafer = 1;
  var buffer2 = buffer$1;
  var Buffer2 = buffer2.Buffer;
  var safer = {};
  var key2;
  for (key2 in buffer2) {
    if (!buffer2.hasOwnProperty(key2))
      continue;
    if (key2 === "SlowBuffer" || key2 === "Buffer")
      continue;
    safer[key2] = buffer2[key2];
  }
  var Safer = safer.Buffer = {};
  for (key2 in Buffer2) {
    if (!Buffer2.hasOwnProperty(key2))
      continue;
    if (key2 === "allocUnsafe" || key2 === "allocUnsafeSlow")
      continue;
    Safer[key2] = Buffer2[key2];
  }
  safer.Buffer.prototype = Buffer2.prototype;
  if (!Safer.from || Safer.from === Uint8Array.from) {
    Safer.from = function(value, encodingOrOffset, length) {
      if (typeof value === "number") {
        throw new TypeError('The "value" argument must not be of type number. Received type ' + typeof value);
      }
      if (value && typeof value.length === "undefined") {
        throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
      }
      return Buffer2(value, encodingOrOffset, length);
    };
  }
  if (!Safer.alloc) {
    Safer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError('The "size" argument must be of type number. Received type ' + typeof size);
      }
      if (size < 0 || size >= 2 * (1 << 30)) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
      }
      var buf = Buffer2(size);
      if (!fill || fill.length === 0) {
        buf.fill(0);
      } else if (typeof encoding === "string") {
        buf.fill(fill, encoding);
      } else {
        buf.fill(fill);
      }
      return buf;
    };
  }
  if (!safer.kStringMaxLength) {
    try {
      safer.kStringMaxLength = process.binding("buffer").kStringMaxLength;
    } catch (e) {
    }
  }
  if (!safer.constants) {
    safer.constants = {
      MAX_LENGTH: safer.kMaxLength
    };
    if (safer.kStringMaxLength) {
      safer.constants.MAX_STRING_LENGTH = safer.kStringMaxLength;
    }
  }
  safer_1 = safer;
  return safer_1;
}
var reporter = {};
var hasRequiredReporter;
function requireReporter() {
  if (hasRequiredReporter)
    return reporter;
  hasRequiredReporter = 1;
  const inherits2 = requireInherits();
  function Reporter(options) {
    this._reporterState = {
      obj: null,
      path: [],
      options: options || {},
      errors: []
    };
  }
  reporter.Reporter = Reporter;
  Reporter.prototype.isError = function isError(obj) {
    return obj instanceof ReporterError;
  };
  Reporter.prototype.save = function save() {
    const state2 = this._reporterState;
    return { obj: state2.obj, pathLen: state2.path.length };
  };
  Reporter.prototype.restore = function restore(data) {
    const state2 = this._reporterState;
    state2.obj = data.obj;
    state2.path = state2.path.slice(0, data.pathLen);
  };
  Reporter.prototype.enterKey = function enterKey(key2) {
    return this._reporterState.path.push(key2);
  };
  Reporter.prototype.exitKey = function exitKey(index2) {
    const state2 = this._reporterState;
    state2.path = state2.path.slice(0, index2 - 1);
  };
  Reporter.prototype.leaveKey = function leaveKey(index2, key2, value) {
    const state2 = this._reporterState;
    this.exitKey(index2);
    if (state2.obj !== null)
      state2.obj[key2] = value;
  };
  Reporter.prototype.path = function path() {
    return this._reporterState.path.join("/");
  };
  Reporter.prototype.enterObject = function enterObject() {
    const state2 = this._reporterState;
    const prev = state2.obj;
    state2.obj = {};
    return prev;
  };
  Reporter.prototype.leaveObject = function leaveObject(prev) {
    const state2 = this._reporterState;
    const now = state2.obj;
    state2.obj = prev;
    return now;
  };
  Reporter.prototype.error = function error(msg) {
    let err;
    const state2 = this._reporterState;
    const inherited = msg instanceof ReporterError;
    if (inherited) {
      err = msg;
    } else {
      err = new ReporterError(state2.path.map(function(elem) {
        return "[" + JSON.stringify(elem) + "]";
      }).join(""), msg.message || msg, msg.stack);
    }
    if (!state2.options.partial)
      throw err;
    if (!inherited)
      state2.errors.push(err);
    return err;
  };
  Reporter.prototype.wrapResult = function wrapResult(result) {
    const state2 = this._reporterState;
    if (!state2.options.partial)
      return result;
    return {
      result: this.isError(result) ? null : result,
      errors: state2.errors
    };
  };
  function ReporterError(path, msg) {
    this.path = path;
    this.rethrow(msg);
  }
  inherits2(ReporterError, Error);
  ReporterError.prototype.rethrow = function rethrow(msg) {
    this.message = msg + " at: " + (this.path || "(shallow)");
    if (Error.captureStackTrace)
      Error.captureStackTrace(this, ReporterError);
    if (!this.stack) {
      try {
        throw new Error(this.message);
      } catch (e) {
        this.stack = e.stack;
      }
    }
    return this;
  };
  return reporter;
}
var buffer = {};
var hasRequiredBuffer;
function requireBuffer() {
  if (hasRequiredBuffer)
    return buffer;
  hasRequiredBuffer = 1;
  const inherits2 = requireInherits();
  const Reporter = requireReporter().Reporter;
  const Buffer2 = requireSafer().Buffer;
  function DecoderBuffer(base2, options) {
    Reporter.call(this, options);
    if (!Buffer2.isBuffer(base2)) {
      this.error("Input not Buffer");
      return;
    }
    this.base = base2;
    this.offset = 0;
    this.length = base2.length;
  }
  inherits2(DecoderBuffer, Reporter);
  buffer.DecoderBuffer = DecoderBuffer;
  DecoderBuffer.isDecoderBuffer = function isDecoderBuffer(data) {
    if (data instanceof DecoderBuffer) {
      return true;
    }
    const isCompatible = typeof data === "object" && Buffer2.isBuffer(data.base) && data.constructor.name === "DecoderBuffer" && typeof data.offset === "number" && typeof data.length === "number" && typeof data.save === "function" && typeof data.restore === "function" && typeof data.isEmpty === "function" && typeof data.readUInt8 === "function" && typeof data.skip === "function" && typeof data.raw === "function";
    return isCompatible;
  };
  DecoderBuffer.prototype.save = function save() {
    return { offset: this.offset, reporter: Reporter.prototype.save.call(this) };
  };
  DecoderBuffer.prototype.restore = function restore(save) {
    const res = new DecoderBuffer(this.base);
    res.offset = save.offset;
    res.length = this.offset;
    this.offset = save.offset;
    Reporter.prototype.restore.call(this, save.reporter);
    return res;
  };
  DecoderBuffer.prototype.isEmpty = function isEmpty() {
    return this.offset === this.length;
  };
  DecoderBuffer.prototype.readUInt8 = function readUInt8(fail) {
    if (this.offset + 1 <= this.length)
      return this.base.readUInt8(this.offset++, true);
    else
      return this.error(fail || "DecoderBuffer overrun");
  };
  DecoderBuffer.prototype.skip = function skip(bytes, fail) {
    if (!(this.offset + bytes <= this.length))
      return this.error(fail || "DecoderBuffer overrun");
    const res = new DecoderBuffer(this.base);
    res._reporterState = this._reporterState;
    res.offset = this.offset;
    res.length = this.offset + bytes;
    this.offset += bytes;
    return res;
  };
  DecoderBuffer.prototype.raw = function raw(save) {
    return this.base.slice(save ? save.offset : this.offset, this.length);
  };
  function EncoderBuffer(value, reporter2) {
    if (Array.isArray(value)) {
      this.length = 0;
      this.value = value.map(function(item) {
        if (!EncoderBuffer.isEncoderBuffer(item))
          item = new EncoderBuffer(item, reporter2);
        this.length += item.length;
        return item;
      }, this);
    } else if (typeof value === "number") {
      if (!(0 <= value && value <= 255))
        return reporter2.error("non-byte EncoderBuffer value");
      this.value = value;
      this.length = 1;
    } else if (typeof value === "string") {
      this.value = value;
      this.length = Buffer2.byteLength(value);
    } else if (Buffer2.isBuffer(value)) {
      this.value = value;
      this.length = value.length;
    } else {
      return reporter2.error("Unsupported type: " + typeof value);
    }
  }
  buffer.EncoderBuffer = EncoderBuffer;
  EncoderBuffer.isEncoderBuffer = function isEncoderBuffer(data) {
    if (data instanceof EncoderBuffer) {
      return true;
    }
    const isCompatible = typeof data === "object" && data.constructor.name === "EncoderBuffer" && typeof data.length === "number" && typeof data.join === "function";
    return isCompatible;
  };
  EncoderBuffer.prototype.join = function join(out, offset) {
    if (!out)
      out = Buffer2.alloc(this.length);
    if (!offset)
      offset = 0;
    if (this.length === 0)
      return out;
    if (Array.isArray(this.value)) {
      this.value.forEach(function(item) {
        item.join(out, offset);
        offset += item.length;
      });
    } else {
      if (typeof this.value === "number")
        out[offset] = this.value;
      else if (typeof this.value === "string")
        out.write(this.value, offset);
      else if (Buffer2.isBuffer(this.value))
        this.value.copy(out, offset);
      offset += this.length;
    }
    return out;
  };
  return buffer;
}
var node$1;
var hasRequiredNode$1;
function requireNode$1() {
  if (hasRequiredNode$1)
    return node$1;
  hasRequiredNode$1 = 1;
  const Reporter = requireReporter().Reporter;
  const EncoderBuffer = requireBuffer().EncoderBuffer;
  const DecoderBuffer = requireBuffer().DecoderBuffer;
  const assert = requireMinimalisticAssert();
  const tags = [
    "seq",
    "seqof",
    "set",
    "setof",
    "objid",
    "bool",
    "gentime",
    "utctime",
    "null_",
    "enum",
    "int",
    "objDesc",
    "bitstr",
    "bmpstr",
    "charstr",
    "genstr",
    "graphstr",
    "ia5str",
    "iso646str",
    "numstr",
    "octstr",
    "printstr",
    "t61str",
    "unistr",
    "utf8str",
    "videostr"
  ];
  const methods = [
    "key",
    "obj",
    "use",
    "optional",
    "explicit",
    "implicit",
    "def",
    "choice",
    "any",
    "contains"
  ].concat(tags);
  const overrided = [
    "_peekTag",
    "_decodeTag",
    "_use",
    "_decodeStr",
    "_decodeObjid",
    "_decodeTime",
    "_decodeNull",
    "_decodeInt",
    "_decodeBool",
    "_decodeList",
    "_encodeComposite",
    "_encodeStr",
    "_encodeObjid",
    "_encodeTime",
    "_encodeNull",
    "_encodeInt",
    "_encodeBool"
  ];
  function Node(enc, parent, name2) {
    const state2 = {};
    this._baseState = state2;
    state2.name = name2;
    state2.enc = enc;
    state2.parent = parent || null;
    state2.children = null;
    state2.tag = null;
    state2.args = null;
    state2.reverseArgs = null;
    state2.choice = null;
    state2.optional = false;
    state2.any = false;
    state2.obj = false;
    state2.use = null;
    state2.useDecoder = null;
    state2.key = null;
    state2["default"] = null;
    state2.explicit = null;
    state2.implicit = null;
    state2.contains = null;
    if (!state2.parent) {
      state2.children = [];
      this._wrap();
    }
  }
  node$1 = Node;
  const stateProps = [
    "enc",
    "parent",
    "children",
    "tag",
    "args",
    "reverseArgs",
    "choice",
    "optional",
    "any",
    "obj",
    "use",
    "alteredUse",
    "key",
    "default",
    "explicit",
    "implicit",
    "contains"
  ];
  Node.prototype.clone = function clone() {
    const state2 = this._baseState;
    const cstate = {};
    stateProps.forEach(function(prop) {
      cstate[prop] = state2[prop];
    });
    const res = new this.constructor(cstate.parent);
    res._baseState = cstate;
    return res;
  };
  Node.prototype._wrap = function wrap() {
    const state2 = this._baseState;
    methods.forEach(function(method) {
      this[method] = function _wrappedMethod() {
        const clone = new this.constructor(this);
        state2.children.push(clone);
        return clone[method].apply(clone, arguments);
      };
    }, this);
  };
  Node.prototype._init = function init(body) {
    const state2 = this._baseState;
    assert(state2.parent === null);
    body.call(this);
    state2.children = state2.children.filter(function(child) {
      return child._baseState.parent === this;
    }, this);
    assert.equal(state2.children.length, 1, "Root node can have only one child");
  };
  Node.prototype._useArgs = function useArgs(args) {
    const state2 = this._baseState;
    const children = args.filter(function(arg) {
      return arg instanceof this.constructor;
    }, this);
    args = args.filter(function(arg) {
      return !(arg instanceof this.constructor);
    }, this);
    if (children.length !== 0) {
      assert(state2.children === null);
      state2.children = children;
      children.forEach(function(child) {
        child._baseState.parent = this;
      }, this);
    }
    if (args.length !== 0) {
      assert(state2.args === null);
      state2.args = args;
      state2.reverseArgs = args.map(function(arg) {
        if (typeof arg !== "object" || arg.constructor !== Object)
          return arg;
        const res = {};
        Object.keys(arg).forEach(function(key2) {
          if (key2 == (key2 | 0))
            key2 |= 0;
          const value = arg[key2];
          res[value] = key2;
        });
        return res;
      });
    }
  };
  overrided.forEach(function(method) {
    Node.prototype[method] = function _overrided() {
      const state2 = this._baseState;
      throw new Error(method + " not implemented for encoding: " + state2.enc);
    };
  });
  tags.forEach(function(tag) {
    Node.prototype[tag] = function _tagMethod() {
      const state2 = this._baseState;
      const args = Array.prototype.slice.call(arguments);
      assert(state2.tag === null);
      state2.tag = tag;
      this._useArgs(args);
      return this;
    };
  });
  Node.prototype.use = function use(item) {
    assert(item);
    const state2 = this._baseState;
    assert(state2.use === null);
    state2.use = item;
    return this;
  };
  Node.prototype.optional = function optional() {
    const state2 = this._baseState;
    state2.optional = true;
    return this;
  };
  Node.prototype.def = function def(val) {
    const state2 = this._baseState;
    assert(state2["default"] === null);
    state2["default"] = val;
    state2.optional = true;
    return this;
  };
  Node.prototype.explicit = function explicit(num) {
    const state2 = this._baseState;
    assert(state2.explicit === null && state2.implicit === null);
    state2.explicit = num;
    return this;
  };
  Node.prototype.implicit = function implicit(num) {
    const state2 = this._baseState;
    assert(state2.explicit === null && state2.implicit === null);
    state2.implicit = num;
    return this;
  };
  Node.prototype.obj = function obj() {
    const state2 = this._baseState;
    const args = Array.prototype.slice.call(arguments);
    state2.obj = true;
    if (args.length !== 0)
      this._useArgs(args);
    return this;
  };
  Node.prototype.key = function key2(newKey) {
    const state2 = this._baseState;
    assert(state2.key === null);
    state2.key = newKey;
    return this;
  };
  Node.prototype.any = function any() {
    const state2 = this._baseState;
    state2.any = true;
    return this;
  };
  Node.prototype.choice = function choice(obj) {
    const state2 = this._baseState;
    assert(state2.choice === null);
    state2.choice = obj;
    this._useArgs(Object.keys(obj).map(function(key2) {
      return obj[key2];
    }));
    return this;
  };
  Node.prototype.contains = function contains(item) {
    const state2 = this._baseState;
    assert(state2.use === null);
    state2.contains = item;
    return this;
  };
  Node.prototype._decode = function decode2(input, options) {
    const state2 = this._baseState;
    if (state2.parent === null)
      return input.wrapResult(state2.children[0]._decode(input, options));
    let result = state2["default"];
    let present = true;
    let prevKey = null;
    if (state2.key !== null)
      prevKey = input.enterKey(state2.key);
    if (state2.optional) {
      let tag = null;
      if (state2.explicit !== null)
        tag = state2.explicit;
      else if (state2.implicit !== null)
        tag = state2.implicit;
      else if (state2.tag !== null)
        tag = state2.tag;
      if (tag === null && !state2.any) {
        const save = input.save();
        try {
          if (state2.choice === null)
            this._decodeGeneric(state2.tag, input, options);
          else
            this._decodeChoice(input, options);
          present = true;
        } catch (e) {
          present = false;
        }
        input.restore(save);
      } else {
        present = this._peekTag(input, tag, state2.any);
        if (input.isError(present))
          return present;
      }
    }
    let prevObj;
    if (state2.obj && present)
      prevObj = input.enterObject();
    if (present) {
      if (state2.explicit !== null) {
        const explicit = this._decodeTag(input, state2.explicit);
        if (input.isError(explicit))
          return explicit;
        input = explicit;
      }
      const start = input.offset;
      if (state2.use === null && state2.choice === null) {
        let save;
        if (state2.any)
          save = input.save();
        const body = this._decodeTag(
          input,
          state2.implicit !== null ? state2.implicit : state2.tag,
          state2.any
        );
        if (input.isError(body))
          return body;
        if (state2.any)
          result = input.raw(save);
        else
          input = body;
      }
      if (options && options.track && state2.tag !== null)
        options.track(input.path(), start, input.length, "tagged");
      if (options && options.track && state2.tag !== null)
        options.track(input.path(), input.offset, input.length, "content");
      if (state2.any)
        ;
      else if (state2.choice === null) {
        result = this._decodeGeneric(state2.tag, input, options);
      } else {
        result = this._decodeChoice(input, options);
      }
      if (input.isError(result))
        return result;
      if (!state2.any && state2.choice === null && state2.children !== null) {
        state2.children.forEach(function decodeChildren(child) {
          child._decode(input, options);
        });
      }
      if (state2.contains && (state2.tag === "octstr" || state2.tag === "bitstr")) {
        const data = new DecoderBuffer(result);
        result = this._getUse(state2.contains, input._reporterState.obj)._decode(data, options);
      }
    }
    if (state2.obj && present)
      result = input.leaveObject(prevObj);
    if (state2.key !== null && (result !== null || present === true))
      input.leaveKey(prevKey, state2.key, result);
    else if (prevKey !== null)
      input.exitKey(prevKey);
    return result;
  };
  Node.prototype._decodeGeneric = function decodeGeneric(tag, input, options) {
    const state2 = this._baseState;
    if (tag === "seq" || tag === "set")
      return null;
    if (tag === "seqof" || tag === "setof")
      return this._decodeList(input, tag, state2.args[0], options);
    else if (/str$/.test(tag))
      return this._decodeStr(input, tag, options);
    else if (tag === "objid" && state2.args)
      return this._decodeObjid(input, state2.args[0], state2.args[1], options);
    else if (tag === "objid")
      return this._decodeObjid(input, null, null, options);
    else if (tag === "gentime" || tag === "utctime")
      return this._decodeTime(input, tag, options);
    else if (tag === "null_")
      return this._decodeNull(input, options);
    else if (tag === "bool")
      return this._decodeBool(input, options);
    else if (tag === "objDesc")
      return this._decodeStr(input, tag, options);
    else if (tag === "int" || tag === "enum")
      return this._decodeInt(input, state2.args && state2.args[0], options);
    if (state2.use !== null) {
      return this._getUse(state2.use, input._reporterState.obj)._decode(input, options);
    } else {
      return input.error("unknown tag: " + tag);
    }
  };
  Node.prototype._getUse = function _getUse(entity, obj) {
    const state2 = this._baseState;
    state2.useDecoder = this._use(entity, obj);
    assert(state2.useDecoder._baseState.parent === null);
    state2.useDecoder = state2.useDecoder._baseState.children[0];
    if (state2.implicit !== state2.useDecoder._baseState.implicit) {
      state2.useDecoder = state2.useDecoder.clone();
      state2.useDecoder._baseState.implicit = state2.implicit;
    }
    return state2.useDecoder;
  };
  Node.prototype._decodeChoice = function decodeChoice(input, options) {
    const state2 = this._baseState;
    let result = null;
    let match = false;
    Object.keys(state2.choice).some(function(key2) {
      const save = input.save();
      const node2 = state2.choice[key2];
      try {
        const value = node2._decode(input, options);
        if (input.isError(value))
          return false;
        result = { type: key2, value };
        match = true;
      } catch (e) {
        input.restore(save);
        return false;
      }
      return true;
    }, this);
    if (!match)
      return input.error("Choice not matched");
    return result;
  };
  Node.prototype._createEncoderBuffer = function createEncoderBuffer(data) {
    return new EncoderBuffer(data, this.reporter);
  };
  Node.prototype._encode = function encode2(data, reporter2, parent) {
    const state2 = this._baseState;
    if (state2["default"] !== null && state2["default"] === data)
      return;
    const result = this._encodeValue(data, reporter2, parent);
    if (result === void 0)
      return;
    if (this._skipDefault(result, reporter2, parent))
      return;
    return result;
  };
  Node.prototype._encodeValue = function encode2(data, reporter2, parent) {
    const state2 = this._baseState;
    if (state2.parent === null)
      return state2.children[0]._encode(data, reporter2 || new Reporter());
    let result = null;
    this.reporter = reporter2;
    if (state2.optional && data === void 0) {
      if (state2["default"] !== null)
        data = state2["default"];
      else
        return;
    }
    let content = null;
    let primitive = false;
    if (state2.any) {
      result = this._createEncoderBuffer(data);
    } else if (state2.choice) {
      result = this._encodeChoice(data, reporter2);
    } else if (state2.contains) {
      content = this._getUse(state2.contains, parent)._encode(data, reporter2);
      primitive = true;
    } else if (state2.children) {
      content = state2.children.map(function(child) {
        if (child._baseState.tag === "null_")
          return child._encode(null, reporter2, data);
        if (child._baseState.key === null)
          return reporter2.error("Child should have a key");
        const prevKey = reporter2.enterKey(child._baseState.key);
        if (typeof data !== "object")
          return reporter2.error("Child expected, but input is not object");
        const res = child._encode(data[child._baseState.key], reporter2, data);
        reporter2.leaveKey(prevKey);
        return res;
      }, this).filter(function(child) {
        return child;
      });
      content = this._createEncoderBuffer(content);
    } else {
      if (state2.tag === "seqof" || state2.tag === "setof") {
        if (!(state2.args && state2.args.length === 1))
          return reporter2.error("Too many args for : " + state2.tag);
        if (!Array.isArray(data))
          return reporter2.error("seqof/setof, but data is not Array");
        const child = this.clone();
        child._baseState.implicit = null;
        content = this._createEncoderBuffer(data.map(function(item) {
          const state3 = this._baseState;
          return this._getUse(state3.args[0], data)._encode(item, reporter2);
        }, child));
      } else if (state2.use !== null) {
        result = this._getUse(state2.use, parent)._encode(data, reporter2);
      } else {
        content = this._encodePrimitive(state2.tag, data);
        primitive = true;
      }
    }
    if (!state2.any && state2.choice === null) {
      const tag = state2.implicit !== null ? state2.implicit : state2.tag;
      const cls = state2.implicit === null ? "universal" : "context";
      if (tag === null) {
        if (state2.use === null)
          reporter2.error("Tag could be omitted only for .use()");
      } else {
        if (state2.use === null)
          result = this._encodeComposite(tag, primitive, cls, content);
      }
    }
    if (state2.explicit !== null)
      result = this._encodeComposite(state2.explicit, false, "context", result);
    return result;
  };
  Node.prototype._encodeChoice = function encodeChoice(data, reporter2) {
    const state2 = this._baseState;
    const node2 = state2.choice[data.type];
    if (!node2) {
      assert(
        false,
        data.type + " not found in " + JSON.stringify(Object.keys(state2.choice))
      );
    }
    return node2._encode(data.value, reporter2);
  };
  Node.prototype._encodePrimitive = function encodePrimitive(tag, data) {
    const state2 = this._baseState;
    if (/str$/.test(tag))
      return this._encodeStr(data, tag);
    else if (tag === "objid" && state2.args)
      return this._encodeObjid(data, state2.reverseArgs[0], state2.args[1]);
    else if (tag === "objid")
      return this._encodeObjid(data, null, null);
    else if (tag === "gentime" || tag === "utctime")
      return this._encodeTime(data, tag);
    else if (tag === "null_")
      return this._encodeNull();
    else if (tag === "int" || tag === "enum")
      return this._encodeInt(data, state2.args && state2.reverseArgs[0]);
    else if (tag === "bool")
      return this._encodeBool(data);
    else if (tag === "objDesc")
      return this._encodeStr(data, tag);
    else
      throw new Error("Unsupported tag: " + tag);
  };
  Node.prototype._isNumstr = function isNumstr(str) {
    return /^[0-9 ]*$/.test(str);
  };
  Node.prototype._isPrintstr = function isPrintstr(str) {
    return /^[A-Za-z0-9 '()+,-./:=?]*$/.test(str);
  };
  return node$1;
}
var der = {};
var hasRequiredDer$2;
function requireDer$2() {
  if (hasRequiredDer$2)
    return der;
  hasRequiredDer$2 = 1;
  (function(exports) {
    function reverse(map2) {
      const res = {};
      Object.keys(map2).forEach(function(key2) {
        if ((key2 | 0) == key2)
          key2 = key2 | 0;
        const value = map2[key2];
        res[value] = key2;
      });
      return res;
    }
    exports.tagClass = {
      0: "universal",
      1: "application",
      2: "context",
      3: "private"
    };
    exports.tagClassByName = reverse(exports.tagClass);
    exports.tag = {
      0: "end",
      1: "bool",
      2: "int",
      3: "bitstr",
      4: "octstr",
      5: "null_",
      6: "objid",
      7: "objDesc",
      8: "external",
      9: "real",
      10: "enum",
      11: "embed",
      12: "utf8str",
      13: "relativeOid",
      16: "seq",
      17: "set",
      18: "numstr",
      19: "printstr",
      20: "t61str",
      21: "videostr",
      22: "ia5str",
      23: "utctime",
      24: "gentime",
      25: "graphstr",
      26: "iso646str",
      27: "genstr",
      28: "unistr",
      29: "charstr",
      30: "bmpstr"
    };
    exports.tagByName = reverse(exports.tag);
  })(der);
  return der;
}
var der_1$1;
var hasRequiredDer$1;
function requireDer$1() {
  if (hasRequiredDer$1)
    return der_1$1;
  hasRequiredDer$1 = 1;
  const inherits2 = requireInherits();
  const Buffer2 = requireSafer().Buffer;
  const Node = requireNode$1();
  const der2 = requireDer$2();
  function DEREncoder(entity) {
    this.enc = "der";
    this.name = entity.name;
    this.entity = entity;
    this.tree = new DERNode();
    this.tree._init(entity.body);
  }
  der_1$1 = DEREncoder;
  DEREncoder.prototype.encode = function encode2(data, reporter2) {
    return this.tree._encode(data, reporter2).join();
  };
  function DERNode(parent) {
    Node.call(this, "der", parent);
  }
  inherits2(DERNode, Node);
  DERNode.prototype._encodeComposite = function encodeComposite(tag, primitive, cls, content) {
    const encodedTag = encodeTag(tag, primitive, cls, this.reporter);
    if (content.length < 128) {
      const header2 = Buffer2.alloc(2);
      header2[0] = encodedTag;
      header2[1] = content.length;
      return this._createEncoderBuffer([header2, content]);
    }
    let lenOctets = 1;
    for (let i = content.length; i >= 256; i >>= 8)
      lenOctets++;
    const header = Buffer2.alloc(1 + 1 + lenOctets);
    header[0] = encodedTag;
    header[1] = 128 | lenOctets;
    for (let i = 1 + lenOctets, j = content.length; j > 0; i--, j >>= 8)
      header[i] = j & 255;
    return this._createEncoderBuffer([header, content]);
  };
  DERNode.prototype._encodeStr = function encodeStr(str, tag) {
    if (tag === "bitstr") {
      return this._createEncoderBuffer([str.unused | 0, str.data]);
    } else if (tag === "bmpstr") {
      const buf = Buffer2.alloc(str.length * 2);
      for (let i = 0; i < str.length; i++) {
        buf.writeUInt16BE(str.charCodeAt(i), i * 2);
      }
      return this._createEncoderBuffer(buf);
    } else if (tag === "numstr") {
      if (!this._isNumstr(str)) {
        return this.reporter.error("Encoding of string type: numstr supports only digits and space");
      }
      return this._createEncoderBuffer(str);
    } else if (tag === "printstr") {
      if (!this._isPrintstr(str)) {
        return this.reporter.error("Encoding of string type: printstr supports only latin upper and lower case letters, digits, space, apostrophe, left and rigth parenthesis, plus sign, comma, hyphen, dot, slash, colon, equal sign, question mark");
      }
      return this._createEncoderBuffer(str);
    } else if (/str$/.test(tag)) {
      return this._createEncoderBuffer(str);
    } else if (tag === "objDesc") {
      return this._createEncoderBuffer(str);
    } else {
      return this.reporter.error("Encoding of string type: " + tag + " unsupported");
    }
  };
  DERNode.prototype._encodeObjid = function encodeObjid(id, values, relative) {
    if (typeof id === "string") {
      if (!values)
        return this.reporter.error("string objid given, but no values map found");
      if (!values.hasOwnProperty(id))
        return this.reporter.error("objid not found in values map");
      id = values[id].split(/[\s.]+/g);
      for (let i = 0; i < id.length; i++)
        id[i] |= 0;
    } else if (Array.isArray(id)) {
      id = id.slice();
      for (let i = 0; i < id.length; i++)
        id[i] |= 0;
    }
    if (!Array.isArray(id)) {
      return this.reporter.error("objid() should be either array or string, got: " + JSON.stringify(id));
    }
    if (!relative) {
      if (id[1] >= 40)
        return this.reporter.error("Second objid identifier OOB");
      id.splice(0, 2, id[0] * 40 + id[1]);
    }
    let size = 0;
    for (let i = 0; i < id.length; i++) {
      let ident = id[i];
      for (size++; ident >= 128; ident >>= 7)
        size++;
    }
    const objid = Buffer2.alloc(size);
    let offset = objid.length - 1;
    for (let i = id.length - 1; i >= 0; i--) {
      let ident = id[i];
      objid[offset--] = ident & 127;
      while ((ident >>= 7) > 0)
        objid[offset--] = 128 | ident & 127;
    }
    return this._createEncoderBuffer(objid);
  };
  function two(num) {
    if (num < 10)
      return "0" + num;
    else
      return num;
  }
  DERNode.prototype._encodeTime = function encodeTime(time, tag) {
    let str;
    const date = new Date(time);
    if (tag === "gentime") {
      str = [
        two(date.getUTCFullYear()),
        two(date.getUTCMonth() + 1),
        two(date.getUTCDate()),
        two(date.getUTCHours()),
        two(date.getUTCMinutes()),
        two(date.getUTCSeconds()),
        "Z"
      ].join("");
    } else if (tag === "utctime") {
      str = [
        two(date.getUTCFullYear() % 100),
        two(date.getUTCMonth() + 1),
        two(date.getUTCDate()),
        two(date.getUTCHours()),
        two(date.getUTCMinutes()),
        two(date.getUTCSeconds()),
        "Z"
      ].join("");
    } else {
      this.reporter.error("Encoding " + tag + " time is not supported yet");
    }
    return this._encodeStr(str, "octstr");
  };
  DERNode.prototype._encodeNull = function encodeNull() {
    return this._createEncoderBuffer("");
  };
  DERNode.prototype._encodeInt = function encodeInt(num, values) {
    if (typeof num === "string") {
      if (!values)
        return this.reporter.error("String int or enum given, but no values map");
      if (!values.hasOwnProperty(num)) {
        return this.reporter.error("Values map doesn't contain: " + JSON.stringify(num));
      }
      num = values[num];
    }
    if (typeof num !== "number" && !Buffer2.isBuffer(num)) {
      const numArray = num.toArray();
      if (!num.sign && numArray[0] & 128) {
        numArray.unshift(0);
      }
      num = Buffer2.from(numArray);
    }
    if (Buffer2.isBuffer(num)) {
      let size2 = num.length;
      if (num.length === 0)
        size2++;
      const out2 = Buffer2.alloc(size2);
      num.copy(out2);
      if (num.length === 0)
        out2[0] = 0;
      return this._createEncoderBuffer(out2);
    }
    if (num < 128)
      return this._createEncoderBuffer(num);
    if (num < 256)
      return this._createEncoderBuffer([0, num]);
    let size = 1;
    for (let i = num; i >= 256; i >>= 8)
      size++;
    const out = new Array(size);
    for (let i = out.length - 1; i >= 0; i--) {
      out[i] = num & 255;
      num >>= 8;
    }
    if (out[0] & 128) {
      out.unshift(0);
    }
    return this._createEncoderBuffer(Buffer2.from(out));
  };
  DERNode.prototype._encodeBool = function encodeBool(value) {
    return this._createEncoderBuffer(value ? 255 : 0);
  };
  DERNode.prototype._use = function use(entity, obj) {
    if (typeof entity === "function")
      entity = entity(obj);
    return entity._getEncoder("der").tree;
  };
  DERNode.prototype._skipDefault = function skipDefault(dataBuffer, reporter2, parent) {
    const state2 = this._baseState;
    let i;
    if (state2["default"] === null)
      return false;
    const data = dataBuffer.join();
    if (state2.defaultBuffer === void 0)
      state2.defaultBuffer = this._encodeValue(state2["default"], reporter2, parent).join();
    if (data.length !== state2.defaultBuffer.length)
      return false;
    for (i = 0; i < data.length; i++)
      if (data[i] !== state2.defaultBuffer[i])
        return false;
    return true;
  };
  function encodeTag(tag, primitive, cls, reporter2) {
    let res;
    if (tag === "seqof")
      tag = "seq";
    else if (tag === "setof")
      tag = "set";
    if (der2.tagByName.hasOwnProperty(tag))
      res = der2.tagByName[tag];
    else if (typeof tag === "number" && (tag | 0) === tag)
      res = tag;
    else
      return reporter2.error("Unknown tag: " + tag);
    if (res >= 31)
      return reporter2.error("Multi-octet tag encoding unsupported");
    if (!primitive)
      res |= 32;
    res |= der2.tagClassByName[cls || "universal"] << 6;
    return res;
  }
  return der_1$1;
}
var pem$1;
var hasRequiredPem$1;
function requirePem$1() {
  if (hasRequiredPem$1)
    return pem$1;
  hasRequiredPem$1 = 1;
  const inherits2 = requireInherits();
  const DEREncoder = requireDer$1();
  function PEMEncoder(entity) {
    DEREncoder.call(this, entity);
    this.enc = "pem";
  }
  inherits2(PEMEncoder, DEREncoder);
  pem$1 = PEMEncoder;
  PEMEncoder.prototype.encode = function encode2(data, options) {
    const buf = DEREncoder.prototype.encode.call(this, data);
    const p = buf.toString("base64");
    const out = ["-----BEGIN " + options.label + "-----"];
    for (let i = 0; i < p.length; i += 64)
      out.push(p.slice(i, i + 64));
    out.push("-----END " + options.label + "-----");
    return out.join("\n");
  };
  return pem$1;
}
var hasRequiredEncoders;
function requireEncoders() {
  if (hasRequiredEncoders)
    return encoders;
  hasRequiredEncoders = 1;
  (function(exports) {
    const encoders2 = exports;
    encoders2.der = requireDer$1();
    encoders2.pem = requirePem$1();
  })(encoders);
  return encoders;
}
var decoders = {};
var der_1;
var hasRequiredDer;
function requireDer() {
  if (hasRequiredDer)
    return der_1;
  hasRequiredDer = 1;
  const inherits2 = requireInherits();
  const bignum = requireBn$1();
  const DecoderBuffer = requireBuffer().DecoderBuffer;
  const Node = requireNode$1();
  const der2 = requireDer$2();
  function DERDecoder(entity) {
    this.enc = "der";
    this.name = entity.name;
    this.entity = entity;
    this.tree = new DERNode();
    this.tree._init(entity.body);
  }
  der_1 = DERDecoder;
  DERDecoder.prototype.decode = function decode2(data, options) {
    if (!DecoderBuffer.isDecoderBuffer(data)) {
      data = new DecoderBuffer(data, options);
    }
    return this.tree._decode(data, options);
  };
  function DERNode(parent) {
    Node.call(this, "der", parent);
  }
  inherits2(DERNode, Node);
  DERNode.prototype._peekTag = function peekTag(buffer2, tag, any) {
    if (buffer2.isEmpty())
      return false;
    const state2 = buffer2.save();
    const decodedTag = derDecodeTag(buffer2, 'Failed to peek tag: "' + tag + '"');
    if (buffer2.isError(decodedTag))
      return decodedTag;
    buffer2.restore(state2);
    return decodedTag.tag === tag || decodedTag.tagStr === tag || decodedTag.tagStr + "of" === tag || any;
  };
  DERNode.prototype._decodeTag = function decodeTag(buffer2, tag, any) {
    const decodedTag = derDecodeTag(
      buffer2,
      'Failed to decode tag of "' + tag + '"'
    );
    if (buffer2.isError(decodedTag))
      return decodedTag;
    let len = derDecodeLen(
      buffer2,
      decodedTag.primitive,
      'Failed to get length of "' + tag + '"'
    );
    if (buffer2.isError(len))
      return len;
    if (!any && decodedTag.tag !== tag && decodedTag.tagStr !== tag && decodedTag.tagStr + "of" !== tag) {
      return buffer2.error('Failed to match tag: "' + tag + '"');
    }
    if (decodedTag.primitive || len !== null)
      return buffer2.skip(len, 'Failed to match body of: "' + tag + '"');
    const state2 = buffer2.save();
    const res = this._skipUntilEnd(
      buffer2,
      'Failed to skip indefinite length body: "' + this.tag + '"'
    );
    if (buffer2.isError(res))
      return res;
    len = buffer2.offset - state2.offset;
    buffer2.restore(state2);
    return buffer2.skip(len, 'Failed to match body of: "' + tag + '"');
  };
  DERNode.prototype._skipUntilEnd = function skipUntilEnd(buffer2, fail) {
    for (; ; ) {
      const tag = derDecodeTag(buffer2, fail);
      if (buffer2.isError(tag))
        return tag;
      const len = derDecodeLen(buffer2, tag.primitive, fail);
      if (buffer2.isError(len))
        return len;
      let res;
      if (tag.primitive || len !== null)
        res = buffer2.skip(len);
      else
        res = this._skipUntilEnd(buffer2, fail);
      if (buffer2.isError(res))
        return res;
      if (tag.tagStr === "end")
        break;
    }
  };
  DERNode.prototype._decodeList = function decodeList(buffer2, tag, decoder, options) {
    const result = [];
    while (!buffer2.isEmpty()) {
      const possibleEnd = this._peekTag(buffer2, "end");
      if (buffer2.isError(possibleEnd))
        return possibleEnd;
      const res = decoder.decode(buffer2, "der", options);
      if (buffer2.isError(res) && possibleEnd)
        break;
      result.push(res);
    }
    return result;
  };
  DERNode.prototype._decodeStr = function decodeStr(buffer2, tag) {
    if (tag === "bitstr") {
      const unused = buffer2.readUInt8();
      if (buffer2.isError(unused))
        return unused;
      return { unused, data: buffer2.raw() };
    } else if (tag === "bmpstr") {
      const raw = buffer2.raw();
      if (raw.length % 2 === 1)
        return buffer2.error("Decoding of string type: bmpstr length mismatch");
      let str = "";
      for (let i = 0; i < raw.length / 2; i++) {
        str += String.fromCharCode(raw.readUInt16BE(i * 2));
      }
      return str;
    } else if (tag === "numstr") {
      const numstr = buffer2.raw().toString("ascii");
      if (!this._isNumstr(numstr)) {
        return buffer2.error("Decoding of string type: numstr unsupported characters");
      }
      return numstr;
    } else if (tag === "octstr") {
      return buffer2.raw();
    } else if (tag === "objDesc") {
      return buffer2.raw();
    } else if (tag === "printstr") {
      const printstr = buffer2.raw().toString("ascii");
      if (!this._isPrintstr(printstr)) {
        return buffer2.error("Decoding of string type: printstr unsupported characters");
      }
      return printstr;
    } else if (/str$/.test(tag)) {
      return buffer2.raw().toString();
    } else {
      return buffer2.error("Decoding of string type: " + tag + " unsupported");
    }
  };
  DERNode.prototype._decodeObjid = function decodeObjid(buffer2, values, relative) {
    let result;
    const identifiers = [];
    let ident = 0;
    let subident = 0;
    while (!buffer2.isEmpty()) {
      subident = buffer2.readUInt8();
      ident <<= 7;
      ident |= subident & 127;
      if ((subident & 128) === 0) {
        identifiers.push(ident);
        ident = 0;
      }
    }
    if (subident & 128)
      identifiers.push(ident);
    const first = identifiers[0] / 40 | 0;
    const second = identifiers[0] % 40;
    if (relative)
      result = identifiers;
    else
      result = [first, second].concat(identifiers.slice(1));
    if (values) {
      let tmp = values[result.join(" ")];
      if (tmp === void 0)
        tmp = values[result.join(".")];
      if (tmp !== void 0)
        result = tmp;
    }
    return result;
  };
  DERNode.prototype._decodeTime = function decodeTime(buffer2, tag) {
    const str = buffer2.raw().toString();
    let year;
    let mon;
    let day;
    let hour;
    let min;
    let sec;
    if (tag === "gentime") {
      year = str.slice(0, 4) | 0;
      mon = str.slice(4, 6) | 0;
      day = str.slice(6, 8) | 0;
      hour = str.slice(8, 10) | 0;
      min = str.slice(10, 12) | 0;
      sec = str.slice(12, 14) | 0;
    } else if (tag === "utctime") {
      year = str.slice(0, 2) | 0;
      mon = str.slice(2, 4) | 0;
      day = str.slice(4, 6) | 0;
      hour = str.slice(6, 8) | 0;
      min = str.slice(8, 10) | 0;
      sec = str.slice(10, 12) | 0;
      if (year < 70)
        year = 2e3 + year;
      else
        year = 1900 + year;
    } else {
      return buffer2.error("Decoding " + tag + " time is not supported yet");
    }
    return Date.UTC(year, mon - 1, day, hour, min, sec, 0);
  };
  DERNode.prototype._decodeNull = function decodeNull() {
    return null;
  };
  DERNode.prototype._decodeBool = function decodeBool(buffer2) {
    const res = buffer2.readUInt8();
    if (buffer2.isError(res))
      return res;
    else
      return res !== 0;
  };
  DERNode.prototype._decodeInt = function decodeInt(buffer2, values) {
    const raw = buffer2.raw();
    let res = new bignum(raw);
    if (values)
      res = values[res.toString(10)] || res;
    return res;
  };
  DERNode.prototype._use = function use(entity, obj) {
    if (typeof entity === "function")
      entity = entity(obj);
    return entity._getDecoder("der").tree;
  };
  function derDecodeTag(buf, fail) {
    let tag = buf.readUInt8(fail);
    if (buf.isError(tag))
      return tag;
    const cls = der2.tagClass[tag >> 6];
    const primitive = (tag & 32) === 0;
    if ((tag & 31) === 31) {
      let oct = tag;
      tag = 0;
      while ((oct & 128) === 128) {
        oct = buf.readUInt8(fail);
        if (buf.isError(oct))
          return oct;
        tag <<= 7;
        tag |= oct & 127;
      }
    } else {
      tag &= 31;
    }
    const tagStr = der2.tag[tag];
    return {
      cls,
      primitive,
      tag,
      tagStr
    };
  }
  function derDecodeLen(buf, primitive, fail) {
    let len = buf.readUInt8(fail);
    if (buf.isError(len))
      return len;
    if (!primitive && len === 128)
      return null;
    if ((len & 128) === 0) {
      return len;
    }
    const num = len & 127;
    if (num > 4)
      return buf.error("length octect is too long");
    len = 0;
    for (let i = 0; i < num; i++) {
      len <<= 8;
      const j = buf.readUInt8(fail);
      if (buf.isError(j))
        return j;
      len |= j;
    }
    return len;
  }
  return der_1;
}
var pem;
var hasRequiredPem;
function requirePem() {
  if (hasRequiredPem)
    return pem;
  hasRequiredPem = 1;
  const inherits2 = requireInherits();
  const Buffer2 = requireSafer().Buffer;
  const DERDecoder = requireDer();
  function PEMDecoder(entity) {
    DERDecoder.call(this, entity);
    this.enc = "pem";
  }
  inherits2(PEMDecoder, DERDecoder);
  pem = PEMDecoder;
  PEMDecoder.prototype.decode = function decode2(data, options) {
    const lines = data.toString().split(/[\r\n]+/g);
    const label = options.label.toUpperCase();
    const re = /^-----(BEGIN|END) ([^-]+)-----$/;
    let start = -1;
    let end = -1;
    for (let i = 0; i < lines.length; i++) {
      const match = lines[i].match(re);
      if (match === null)
        continue;
      if (match[2] !== label)
        continue;
      if (start === -1) {
        if (match[1] !== "BEGIN")
          break;
        start = i;
      } else {
        if (match[1] !== "END")
          break;
        end = i;
        break;
      }
    }
    if (start === -1 || end === -1)
      throw new Error("PEM section not found for: " + label);
    const base64 = lines.slice(start + 1, end).join("");
    base64.replace(/[^a-z0-9+/=]+/gi, "");
    const input = Buffer2.from(base64, "base64");
    return DERDecoder.prototype.decode.call(this, input, options);
  };
  return pem;
}
var hasRequiredDecoders;
function requireDecoders() {
  if (hasRequiredDecoders)
    return decoders;
  hasRequiredDecoders = 1;
  (function(exports) {
    const decoders2 = exports;
    decoders2.der = requireDer();
    decoders2.pem = requirePem();
  })(decoders);
  return decoders;
}
var hasRequiredApi;
function requireApi() {
  if (hasRequiredApi)
    return api;
  hasRequiredApi = 1;
  (function(exports) {
    const encoders2 = requireEncoders();
    const decoders2 = requireDecoders();
    const inherits2 = requireInherits();
    const api2 = exports;
    api2.define = function define(name2, body) {
      return new Entity(name2, body);
    };
    function Entity(name2, body) {
      this.name = name2;
      this.body = body;
      this.decoders = {};
      this.encoders = {};
    }
    Entity.prototype._createNamed = function createNamed(Base) {
      const name2 = this.name;
      function Generated(entity) {
        this._initNamed(entity, name2);
      }
      inherits2(Generated, Base);
      Generated.prototype._initNamed = function _initNamed(entity, name3) {
        Base.call(this, entity, name3);
      };
      return new Generated(this);
    };
    Entity.prototype._getDecoder = function _getDecoder(enc) {
      enc = enc || "der";
      if (!this.decoders.hasOwnProperty(enc))
        this.decoders[enc] = this._createNamed(decoders2[enc]);
      return this.decoders[enc];
    };
    Entity.prototype.decode = function decode2(data, enc, options) {
      return this._getDecoder(enc).decode(data, options);
    };
    Entity.prototype._getEncoder = function _getEncoder(enc) {
      enc = enc || "der";
      if (!this.encoders.hasOwnProperty(enc))
        this.encoders[enc] = this._createNamed(encoders2[enc]);
      return this.encoders[enc];
    };
    Entity.prototype.encode = function encode2(data, enc, reporter2) {
      return this._getEncoder(enc).encode(data, reporter2);
    };
  })(api);
  return api;
}
var base = {};
var hasRequiredBase;
function requireBase() {
  if (hasRequiredBase)
    return base;
  hasRequiredBase = 1;
  (function(exports) {
    const base2 = exports;
    base2.Reporter = requireReporter().Reporter;
    base2.DecoderBuffer = requireBuffer().DecoderBuffer;
    base2.EncoderBuffer = requireBuffer().EncoderBuffer;
    base2.Node = requireNode$1();
  })(base);
  return base;
}
var constants = {};
var hasRequiredConstants;
function requireConstants() {
  if (hasRequiredConstants)
    return constants;
  hasRequiredConstants = 1;
  (function(exports) {
    const constants2 = exports;
    constants2._reverse = function reverse(map2) {
      const res = {};
      Object.keys(map2).forEach(function(key2) {
        if ((key2 | 0) == key2)
          key2 = key2 | 0;
        const value = map2[key2];
        res[value] = key2;
      });
      return res;
    };
    constants2.der = requireDer$2();
  })(constants);
  return constants;
}
var hasRequiredAsn1$1;
function requireAsn1$1() {
  if (hasRequiredAsn1$1)
    return asn1;
  hasRequiredAsn1$1 = 1;
  (function(exports) {
    const asn12 = exports;
    asn12.bignum = requireBn$1();
    asn12.define = requireApi().define;
    asn12.base = requireBase();
    asn12.constants = requireConstants();
    asn12.decoders = requireDecoders();
    asn12.encoders = requireEncoders();
  })(asn1);
  return asn1;
}
var certificate;
var hasRequiredCertificate;
function requireCertificate() {
  if (hasRequiredCertificate)
    return certificate;
  hasRequiredCertificate = 1;
  var asn = requireAsn1$1();
  var Time = asn.define("Time", function() {
    this.choice({
      utcTime: this.utctime(),
      generalTime: this.gentime()
    });
  });
  var AttributeTypeValue = asn.define("AttributeTypeValue", function() {
    this.seq().obj(
      this.key("type").objid(),
      this.key("value").any()
    );
  });
  var AlgorithmIdentifier = asn.define("AlgorithmIdentifier", function() {
    this.seq().obj(
      this.key("algorithm").objid(),
      this.key("parameters").optional(),
      this.key("curve").objid().optional()
    );
  });
  var SubjectPublicKeyInfo = asn.define("SubjectPublicKeyInfo", function() {
    this.seq().obj(
      this.key("algorithm").use(AlgorithmIdentifier),
      this.key("subjectPublicKey").bitstr()
    );
  });
  var RelativeDistinguishedName = asn.define("RelativeDistinguishedName", function() {
    this.setof(AttributeTypeValue);
  });
  var RDNSequence = asn.define("RDNSequence", function() {
    this.seqof(RelativeDistinguishedName);
  });
  var Name = asn.define("Name", function() {
    this.choice({
      rdnSequence: this.use(RDNSequence)
    });
  });
  var Validity = asn.define("Validity", function() {
    this.seq().obj(
      this.key("notBefore").use(Time),
      this.key("notAfter").use(Time)
    );
  });
  var Extension = asn.define("Extension", function() {
    this.seq().obj(
      this.key("extnID").objid(),
      this.key("critical").bool().def(false),
      this.key("extnValue").octstr()
    );
  });
  var TBSCertificate = asn.define("TBSCertificate", function() {
    this.seq().obj(
      this.key("version").explicit(0).int().optional(),
      this.key("serialNumber").int(),
      this.key("signature").use(AlgorithmIdentifier),
      this.key("issuer").use(Name),
      this.key("validity").use(Validity),
      this.key("subject").use(Name),
      this.key("subjectPublicKeyInfo").use(SubjectPublicKeyInfo),
      this.key("issuerUniqueID").implicit(1).bitstr().optional(),
      this.key("subjectUniqueID").implicit(2).bitstr().optional(),
      this.key("extensions").explicit(3).seqof(Extension).optional()
    );
  });
  var X509Certificate = asn.define("X509Certificate", function() {
    this.seq().obj(
      this.key("tbsCertificate").use(TBSCertificate),
      this.key("signatureAlgorithm").use(AlgorithmIdentifier),
      this.key("signatureValue").bitstr()
    );
  });
  certificate = X509Certificate;
  return certificate;
}
var hasRequiredAsn1;
function requireAsn1() {
  if (hasRequiredAsn1)
    return asn1$1;
  hasRequiredAsn1 = 1;
  var asn12 = requireAsn1$1();
  asn1$1.certificate = requireCertificate();
  var RSAPrivateKey = asn12.define("RSAPrivateKey", function() {
    this.seq().obj(
      this.key("version").int(),
      this.key("modulus").int(),
      this.key("publicExponent").int(),
      this.key("privateExponent").int(),
      this.key("prime1").int(),
      this.key("prime2").int(),
      this.key("exponent1").int(),
      this.key("exponent2").int(),
      this.key("coefficient").int()
    );
  });
  asn1$1.RSAPrivateKey = RSAPrivateKey;
  var RSAPublicKey = asn12.define("RSAPublicKey", function() {
    this.seq().obj(
      this.key("modulus").int(),
      this.key("publicExponent").int()
    );
  });
  asn1$1.RSAPublicKey = RSAPublicKey;
  var PublicKey = asn12.define("SubjectPublicKeyInfo", function() {
    this.seq().obj(
      this.key("algorithm").use(AlgorithmIdentifier),
      this.key("subjectPublicKey").bitstr()
    );
  });
  asn1$1.PublicKey = PublicKey;
  var AlgorithmIdentifier = asn12.define("AlgorithmIdentifier", function() {
    this.seq().obj(
      this.key("algorithm").objid(),
      this.key("none").null_().optional(),
      this.key("curve").objid().optional(),
      this.key("params").seq().obj(
        this.key("p").int(),
        this.key("q").int(),
        this.key("g").int()
      ).optional()
    );
  });
  var PrivateKeyInfo = asn12.define("PrivateKeyInfo", function() {
    this.seq().obj(
      this.key("version").int(),
      this.key("algorithm").use(AlgorithmIdentifier),
      this.key("subjectPrivateKey").octstr()
    );
  });
  asn1$1.PrivateKey = PrivateKeyInfo;
  var EncryptedPrivateKeyInfo = asn12.define("EncryptedPrivateKeyInfo", function() {
    this.seq().obj(
      this.key("algorithm").seq().obj(
        this.key("id").objid(),
        this.key("decrypt").seq().obj(
          this.key("kde").seq().obj(
            this.key("id").objid(),
            this.key("kdeparams").seq().obj(
              this.key("salt").octstr(),
              this.key("iters").int()
            )
          ),
          this.key("cipher").seq().obj(
            this.key("algo").objid(),
            this.key("iv").octstr()
          )
        )
      ),
      this.key("subjectPrivateKey").octstr()
    );
  });
  asn1$1.EncryptedPrivateKey = EncryptedPrivateKeyInfo;
  var DSAPrivateKey = asn12.define("DSAPrivateKey", function() {
    this.seq().obj(
      this.key("version").int(),
      this.key("p").int(),
      this.key("q").int(),
      this.key("g").int(),
      this.key("pub_key").int(),
      this.key("priv_key").int()
    );
  });
  asn1$1.DSAPrivateKey = DSAPrivateKey;
  asn1$1.DSAparam = asn12.define("DSAparam", function() {
    this.int();
  });
  var ECPrivateKey = asn12.define("ECPrivateKey", function() {
    this.seq().obj(
      this.key("version").int(),
      this.key("privateKey").octstr(),
      this.key("parameters").optional().explicit(0).use(ECParameters),
      this.key("publicKey").optional().explicit(1).bitstr()
    );
  });
  asn1$1.ECPrivateKey = ECPrivateKey;
  var ECParameters = asn12.define("ECParameters", function() {
    this.choice({
      namedCurve: this.objid()
    });
  });
  asn1$1.signature = asn12.define("signature", function() {
    this.seq().obj(
      this.key("r").int(),
      this.key("s").int()
    );
  });
  return asn1$1;
}
const require$$1 = {
  "2.16.840.1.101.3.4.1.1": "aes-128-ecb",
  "2.16.840.1.101.3.4.1.2": "aes-128-cbc",
  "2.16.840.1.101.3.4.1.3": "aes-128-ofb",
  "2.16.840.1.101.3.4.1.4": "aes-128-cfb",
  "2.16.840.1.101.3.4.1.21": "aes-192-ecb",
  "2.16.840.1.101.3.4.1.22": "aes-192-cbc",
  "2.16.840.1.101.3.4.1.23": "aes-192-ofb",
  "2.16.840.1.101.3.4.1.24": "aes-192-cfb",
  "2.16.840.1.101.3.4.1.41": "aes-256-ecb",
  "2.16.840.1.101.3.4.1.42": "aes-256-cbc",
  "2.16.840.1.101.3.4.1.43": "aes-256-ofb",
  "2.16.840.1.101.3.4.1.44": "aes-256-cfb"
};
var readable = { exports: {} };
var events = { exports: {} };
var R = typeof Reflect === "object" ? Reflect : null;
var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
  return Function.prototype.apply.call(target, receiver, args);
};
var ReflectOwnKeys;
if (R && typeof R.ownKeys === "function") {
  ReflectOwnKeys = R.ownKeys;
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys2(target) {
    return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys2(target) {
    return Object.getOwnPropertyNames(target);
  };
}
function ProcessEmitWarning(warning) {
  if (console && console.warn)
    console.warn(warning);
}
var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
  return value !== value;
};
function EventEmitter() {
  EventEmitter.init.call(this);
}
events.exports = EventEmitter;
events.exports.once = once2;
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.prototype._events = void 0;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = void 0;
var defaultMaxListeners = 10;
function checkListener(listener) {
  if (typeof listener !== "function") {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}
Object.defineProperty(EventEmitter, "defaultMaxListeners", {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
    }
    defaultMaxListeners = arg;
  }
});
EventEmitter.init = function() {
  if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
    this._events = /* @__PURE__ */ Object.create(null);
    this._eventsCount = 0;
  }
  this._maxListeners = this._maxListeners || void 0;
};
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
  }
  this._maxListeners = n;
  return this;
};
function _getMaxListeners(that) {
  if (that._maxListeners === void 0)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}
EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};
EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++)
    args.push(arguments[i]);
  var doError = type === "error";
  var events2 = this._events;
  if (events2 !== void 0)
    doError = doError && events2.error === void 0;
  else if (!doError)
    return false;
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      throw er;
    }
    var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
    err.context = er;
    throw err;
  }
  var handler = events2[type];
  if (handler === void 0)
    return false;
  if (typeof handler === "function") {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners2 = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners2[i], this, args);
  }
  return true;
};
function _addListener(target, type, listener, prepend) {
  var m;
  var events2;
  var existing;
  checkListener(listener);
  events2 = target._events;
  if (events2 === void 0) {
    events2 = target._events = /* @__PURE__ */ Object.create(null);
    target._eventsCount = 0;
  } else {
    if (events2.newListener !== void 0) {
      target.emit(
        "newListener",
        type,
        listener.listener ? listener.listener : listener
      );
      events2 = target._events;
    }
    existing = events2[type];
  }
  if (existing === void 0) {
    existing = events2[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === "function") {
      existing = events2[type] = prepend ? [listener, existing] : [existing, listener];
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      w.name = "MaxListenersExceededWarning";
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }
  return target;
}
EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};
EventEmitter.prototype.on = EventEmitter.prototype.addListener;
EventEmitter.prototype.prependListener = function prependListener(type, listener) {
  return _addListener(this, type, listener, true);
};
function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}
function _onceWrap(target, type, listener) {
  var state2 = { fired: false, wrapFn: void 0, target, type, listener };
  var wrapped = onceWrapper.bind(state2);
  wrapped.listener = listener;
  state2.wrapFn = wrapped;
  return wrapped;
}
EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};
EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
  checkListener(listener);
  this.prependListener(type, _onceWrap(this, type, listener));
  return this;
};
EventEmitter.prototype.removeListener = function removeListener(type, listener) {
  var list, events2, position, i, originalListener;
  checkListener(listener);
  events2 = this._events;
  if (events2 === void 0)
    return this;
  list = events2[type];
  if (list === void 0)
    return this;
  if (list === listener || list.listener === listener) {
    if (--this._eventsCount === 0)
      this._events = /* @__PURE__ */ Object.create(null);
    else {
      delete events2[type];
      if (events2.removeListener)
        this.emit("removeListener", type, list.listener || listener);
    }
  } else if (typeof list !== "function") {
    position = -1;
    for (i = list.length - 1; i >= 0; i--) {
      if (list[i] === listener || list[i].listener === listener) {
        originalListener = list[i].listener;
        position = i;
        break;
      }
    }
    if (position < 0)
      return this;
    if (position === 0)
      list.shift();
    else {
      spliceOne(list, position);
    }
    if (list.length === 1)
      events2[type] = list[0];
    if (events2.removeListener !== void 0)
      this.emit("removeListener", type, originalListener || listener);
  }
  return this;
};
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
  var listeners2, events2, i;
  events2 = this._events;
  if (events2 === void 0)
    return this;
  if (events2.removeListener === void 0) {
    if (arguments.length === 0) {
      this._events = /* @__PURE__ */ Object.create(null);
      this._eventsCount = 0;
    } else if (events2[type] !== void 0) {
      if (--this._eventsCount === 0)
        this._events = /* @__PURE__ */ Object.create(null);
      else
        delete events2[type];
    }
    return this;
  }
  if (arguments.length === 0) {
    var keys = Object.keys(events2);
    var key2;
    for (i = 0; i < keys.length; ++i) {
      key2 = keys[i];
      if (key2 === "removeListener")
        continue;
      this.removeAllListeners(key2);
    }
    this.removeAllListeners("removeListener");
    this._events = /* @__PURE__ */ Object.create(null);
    this._eventsCount = 0;
    return this;
  }
  listeners2 = events2[type];
  if (typeof listeners2 === "function") {
    this.removeListener(type, listeners2);
  } else if (listeners2 !== void 0) {
    for (i = listeners2.length - 1; i >= 0; i--) {
      this.removeListener(type, listeners2[i]);
    }
  }
  return this;
};
function _listeners(target, type, unwrap) {
  var events2 = target._events;
  if (events2 === void 0)
    return [];
  var evlistener = events2[type];
  if (evlistener === void 0)
    return [];
  if (typeof evlistener === "function")
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];
  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}
EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};
EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};
EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === "function") {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};
EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events2 = this._events;
  if (events2 !== void 0) {
    var evlistener = events2[type];
    if (typeof evlistener === "function") {
      return 1;
    } else if (evlistener !== void 0) {
      return evlistener.length;
    }
  }
  return 0;
}
EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};
function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}
function spliceOne(list, index2) {
  for (; index2 + 1 < list.length; index2++)
    list[index2] = list[index2 + 1];
  list.pop();
}
function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}
function once2(emitter, name2) {
  return new Promise(function(resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name2, resolver);
      reject(err);
    }
    function resolver() {
      if (typeof emitter.removeListener === "function") {
        emitter.removeListener("error", errorListener);
      }
      resolve([].slice.call(arguments));
    }
    eventTargetAgnosticAddListener(emitter, name2, resolver, { once: true });
    if (name2 !== "error") {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}
function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === "function") {
    eventTargetAgnosticAddListener(emitter, "error", handler, flags);
  }
}
function eventTargetAgnosticAddListener(emitter, name2, listener, flags) {
  if (typeof emitter.on === "function") {
    if (flags.once) {
      emitter.once(name2, listener);
    } else {
      emitter.on(name2, listener);
    }
  } else if (typeof emitter.addEventListener === "function") {
    emitter.addEventListener(name2, function wrapListener(arg) {
      if (flags.once) {
        emitter.removeEventListener(name2, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}
var eventsExports = events.exports;
var stream$2;
var hasRequiredStream;
function requireStream() {
  if (hasRequiredStream)
    return stream$2;
  hasRequiredStream = 1;
  stream$2 = requireStreamBrowserify();
  return stream$2;
}
var buffer_list;
var hasRequiredBuffer_list;
function requireBuffer_list() {
  if (hasRequiredBuffer_list)
    return buffer_list;
  hasRequiredBuffer_list = 1;
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), true).forEach(function(key2) {
        _defineProperty(target, key2, source[key2]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key2) {
        Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
      });
    }
    return target;
  }
  function _defineProperty(obj, key2, value) {
    key2 = _toPropertyKey(key2);
    if (key2 in obj) {
      Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key2] = value;
    }
    return obj;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", { writable: false });
    return Constructor;
  }
  function _toPropertyKey(arg) {
    var key2 = _toPrimitive(arg, "string");
    return typeof key2 === "symbol" ? key2 : String(key2);
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null)
      return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== void 0) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object")
        return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  var _require = buffer$1, Buffer2 = _require.Buffer;
  var _require2 = requireUtil(), inspect = _require2.inspect;
  var custom = inspect && inspect.custom || "inspect";
  function copyBuffer(src, target, offset) {
    Buffer2.prototype.copy.call(src, target, offset);
  }
  buffer_list = /* @__PURE__ */ function() {
    function BufferList() {
      _classCallCheck(this, BufferList);
      this.head = null;
      this.tail = null;
      this.length = 0;
    }
    _createClass(BufferList, [{
      key: "push",
      value: function push(v) {
        var entry = {
          data: v,
          next: null
        };
        if (this.length > 0)
          this.tail.next = entry;
        else
          this.head = entry;
        this.tail = entry;
        ++this.length;
      }
    }, {
      key: "unshift",
      value: function unshift(v) {
        var entry = {
          data: v,
          next: this.head
        };
        if (this.length === 0)
          this.tail = entry;
        this.head = entry;
        ++this.length;
      }
    }, {
      key: "shift",
      value: function shift() {
        if (this.length === 0)
          return;
        var ret = this.head.data;
        if (this.length === 1)
          this.head = this.tail = null;
        else
          this.head = this.head.next;
        --this.length;
        return ret;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.head = this.tail = null;
        this.length = 0;
      }
    }, {
      key: "join",
      value: function join(s) {
        if (this.length === 0)
          return "";
        var p = this.head;
        var ret = "" + p.data;
        while (p = p.next)
          ret += s + p.data;
        return ret;
      }
    }, {
      key: "concat",
      value: function concat(n) {
        if (this.length === 0)
          return Buffer2.alloc(0);
        var ret = Buffer2.allocUnsafe(n >>> 0);
        var p = this.head;
        var i = 0;
        while (p) {
          copyBuffer(p.data, ret, i);
          i += p.data.length;
          p = p.next;
        }
        return ret;
      }
      // Consumes a specified amount of bytes or characters from the buffered data.
    }, {
      key: "consume",
      value: function consume(n, hasStrings) {
        var ret;
        if (n < this.head.data.length) {
          ret = this.head.data.slice(0, n);
          this.head.data = this.head.data.slice(n);
        } else if (n === this.head.data.length) {
          ret = this.shift();
        } else {
          ret = hasStrings ? this._getString(n) : this._getBuffer(n);
        }
        return ret;
      }
    }, {
      key: "first",
      value: function first() {
        return this.head.data;
      }
      // Consumes a specified amount of characters from the buffered data.
    }, {
      key: "_getString",
      value: function _getString(n) {
        var p = this.head;
        var c = 1;
        var ret = p.data;
        n -= ret.length;
        while (p = p.next) {
          var str = p.data;
          var nb = n > str.length ? str.length : n;
          if (nb === str.length)
            ret += str;
          else
            ret += str.slice(0, n);
          n -= nb;
          if (n === 0) {
            if (nb === str.length) {
              ++c;
              if (p.next)
                this.head = p.next;
              else
                this.head = this.tail = null;
            } else {
              this.head = p;
              p.data = str.slice(nb);
            }
            break;
          }
          ++c;
        }
        this.length -= c;
        return ret;
      }
      // Consumes a specified amount of bytes from the buffered data.
    }, {
      key: "_getBuffer",
      value: function _getBuffer(n) {
        var ret = Buffer2.allocUnsafe(n);
        var p = this.head;
        var c = 1;
        p.data.copy(ret);
        n -= p.data.length;
        while (p = p.next) {
          var buf = p.data;
          var nb = n > buf.length ? buf.length : n;
          buf.copy(ret, ret.length - n, 0, nb);
          n -= nb;
          if (n === 0) {
            if (nb === buf.length) {
              ++c;
              if (p.next)
                this.head = p.next;
              else
                this.head = this.tail = null;
            } else {
              this.head = p;
              p.data = buf.slice(nb);
            }
            break;
          }
          ++c;
        }
        this.length -= c;
        return ret;
      }
      // Make sure the linked list only shows the minimal necessary information.
    }, {
      key: custom,
      value: function value(_, options) {
        return inspect(this, _objectSpread(_objectSpread({}, options), {}, {
          // Only inspect one level.
          depth: 0,
          // It should not recurse.
          customInspect: false
        }));
      }
    }]);
    return BufferList;
  }();
  return buffer_list;
}
var destroy_1;
var hasRequiredDestroy;
function requireDestroy() {
  if (hasRequiredDestroy)
    return destroy_1;
  hasRequiredDestroy = 1;
  function destroy2(err, cb) {
    var _this = this;
    var readableDestroyed = this._readableState && this._readableState.destroyed;
    var writableDestroyed = this._writableState && this._writableState.destroyed;
    if (readableDestroyed || writableDestroyed) {
      if (cb) {
        cb(err);
      } else if (err) {
        if (!this._writableState) {
          process.nextTick(emitErrorNT, this, err);
        } else if (!this._writableState.errorEmitted) {
          this._writableState.errorEmitted = true;
          process.nextTick(emitErrorNT, this, err);
        }
      }
      return this;
    }
    if (this._readableState) {
      this._readableState.destroyed = true;
    }
    if (this._writableState) {
      this._writableState.destroyed = true;
    }
    this._destroy(err || null, function(err2) {
      if (!cb && err2) {
        if (!_this._writableState) {
          process.nextTick(emitErrorAndCloseNT, _this, err2);
        } else if (!_this._writableState.errorEmitted) {
          _this._writableState.errorEmitted = true;
          process.nextTick(emitErrorAndCloseNT, _this, err2);
        } else {
          process.nextTick(emitCloseNT, _this);
        }
      } else if (cb) {
        process.nextTick(emitCloseNT, _this);
        cb(err2);
      } else {
        process.nextTick(emitCloseNT, _this);
      }
    });
    return this;
  }
  function emitErrorAndCloseNT(self2, err) {
    emitErrorNT(self2, err);
    emitCloseNT(self2);
  }
  function emitCloseNT(self2) {
    if (self2._writableState && !self2._writableState.emitClose)
      return;
    if (self2._readableState && !self2._readableState.emitClose)
      return;
    self2.emit("close");
  }
  function undestroy() {
    if (this._readableState) {
      this._readableState.destroyed = false;
      this._readableState.reading = false;
      this._readableState.ended = false;
      this._readableState.endEmitted = false;
    }
    if (this._writableState) {
      this._writableState.destroyed = false;
      this._writableState.ended = false;
      this._writableState.ending = false;
      this._writableState.finalCalled = false;
      this._writableState.prefinished = false;
      this._writableState.finished = false;
      this._writableState.errorEmitted = false;
    }
  }
  function emitErrorNT(self2, err) {
    self2.emit("error", err);
  }
  function errorOrDestroy(stream2, err) {
    var rState = stream2._readableState;
    var wState = stream2._writableState;
    if (rState && rState.autoDestroy || wState && wState.autoDestroy)
      stream2.destroy(err);
    else
      stream2.emit("error", err);
  }
  destroy_1 = {
    destroy: destroy2,
    undestroy,
    errorOrDestroy
  };
  return destroy_1;
}
var errors = {};
var hasRequiredErrors;
function requireErrors() {
  if (hasRequiredErrors)
    return errors;
  hasRequiredErrors = 1;
  const codes = {};
  function createErrorType(code, message, Base) {
    if (!Base) {
      Base = Error;
    }
    function getMessage(arg1, arg2, arg3) {
      if (typeof message === "string") {
        return message;
      } else {
        return message(arg1, arg2, arg3);
      }
    }
    class NodeError extends Base {
      constructor(arg1, arg2, arg3) {
        super(getMessage(arg1, arg2, arg3));
      }
    }
    NodeError.prototype.name = Base.name;
    NodeError.prototype.code = code;
    codes[code] = NodeError;
  }
  function oneOf(expected, thing) {
    if (Array.isArray(expected)) {
      const len = expected.length;
      expected = expected.map((i) => String(i));
      if (len > 2) {
        return `one of ${thing} ${expected.slice(0, len - 1).join(", ")}, or ` + expected[len - 1];
      } else if (len === 2) {
        return `one of ${thing} ${expected[0]} or ${expected[1]}`;
      } else {
        return `of ${thing} ${expected[0]}`;
      }
    } else {
      return `of ${thing} ${String(expected)}`;
    }
  }
  function startsWith(str, search2, pos) {
    return str.substr(!pos || pos < 0 ? 0 : +pos, search2.length) === search2;
  }
  function endsWith(str, search2, this_len) {
    if (this_len === void 0 || this_len > str.length) {
      this_len = str.length;
    }
    return str.substring(this_len - search2.length, this_len) === search2;
  }
  function includes(str, search2, start) {
    if (typeof start !== "number") {
      start = 0;
    }
    if (start + search2.length > str.length) {
      return false;
    } else {
      return str.indexOf(search2, start) !== -1;
    }
  }
  createErrorType("ERR_INVALID_OPT_VALUE", function(name2, value) {
    return 'The value "' + value + '" is invalid for option "' + name2 + '"';
  }, TypeError);
  createErrorType("ERR_INVALID_ARG_TYPE", function(name2, expected, actual) {
    let determiner;
    if (typeof expected === "string" && startsWith(expected, "not ")) {
      determiner = "must not be";
      expected = expected.replace(/^not /, "");
    } else {
      determiner = "must be";
    }
    let msg;
    if (endsWith(name2, " argument")) {
      msg = `The ${name2} ${determiner} ${oneOf(expected, "type")}`;
    } else {
      const type = includes(name2, ".") ? "property" : "argument";
      msg = `The "${name2}" ${type} ${determiner} ${oneOf(expected, "type")}`;
    }
    msg += `. Received type ${typeof actual}`;
    return msg;
  }, TypeError);
  createErrorType("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
  createErrorType("ERR_METHOD_NOT_IMPLEMENTED", function(name2) {
    return "The " + name2 + " method is not implemented";
  });
  createErrorType("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
  createErrorType("ERR_STREAM_DESTROYED", function(name2) {
    return "Cannot call " + name2 + " after a stream was destroyed";
  });
  createErrorType("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
  createErrorType("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
  createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
  createErrorType("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
  createErrorType("ERR_UNKNOWN_ENCODING", function(arg) {
    return "Unknown encoding: " + arg;
  }, TypeError);
  createErrorType("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
  errors.codes = codes;
  return errors;
}
var state;
var hasRequiredState;
function requireState() {
  if (hasRequiredState)
    return state;
  hasRequiredState = 1;
  var ERR_INVALID_OPT_VALUE = requireErrors().codes.ERR_INVALID_OPT_VALUE;
  function highWaterMarkFrom(options, isDuplex, duplexKey) {
    return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
  }
  function getHighWaterMark(state2, options, duplexKey, isDuplex) {
    var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
    if (hwm != null) {
      if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
        var name2 = isDuplex ? duplexKey : "highWaterMark";
        throw new ERR_INVALID_OPT_VALUE(name2, hwm);
      }
      return Math.floor(hwm);
    }
    return state2.objectMode ? 16 : 16 * 1024;
  }
  state = {
    getHighWaterMark
  };
  return state;
}
var node;
var hasRequiredNode;
function requireNode() {
  if (hasRequiredNode)
    return node;
  hasRequiredNode = 1;
  node = requireUtil().deprecate;
  return node;
}
var _stream_writable;
var hasRequired_stream_writable;
function require_stream_writable() {
  if (hasRequired_stream_writable)
    return _stream_writable;
  hasRequired_stream_writable = 1;
  _stream_writable = Writable;
  function CorkedRequest(state2) {
    var _this = this;
    this.next = null;
    this.entry = null;
    this.finish = function() {
      onCorkedFinish(_this, state2);
    };
  }
  var Duplex;
  Writable.WritableState = WritableState;
  var internalUtil = {
    deprecate: requireNode()
  };
  var Stream = requireStream();
  var Buffer2 = buffer$1.Buffer;
  var OurUint8Array = (typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
  };
  function _uint8ArrayToBuffer(chunk) {
    return Buffer2.from(chunk);
  }
  function _isUint8Array(obj) {
    return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
  }
  var destroyImpl = requireDestroy();
  var _require = requireState(), getHighWaterMark = _require.getHighWaterMark;
  var _require$codes = requireErrors().codes, ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE, ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED, ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK, ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE, ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED, ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES, ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END, ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;
  var errorOrDestroy = destroyImpl.errorOrDestroy;
  requireInherits()(Writable, Stream);
  function nop() {
  }
  function WritableState(options, stream2, isDuplex) {
    Duplex = Duplex || require_stream_duplex();
    options = options || {};
    if (typeof isDuplex !== "boolean")
      isDuplex = stream2 instanceof Duplex;
    this.objectMode = !!options.objectMode;
    if (isDuplex)
      this.objectMode = this.objectMode || !!options.writableObjectMode;
    this.highWaterMark = getHighWaterMark(this, options, "writableHighWaterMark", isDuplex);
    this.finalCalled = false;
    this.needDrain = false;
    this.ending = false;
    this.ended = false;
    this.finished = false;
    this.destroyed = false;
    var noDecode = options.decodeStrings === false;
    this.decodeStrings = !noDecode;
    this.defaultEncoding = options.defaultEncoding || "utf8";
    this.length = 0;
    this.writing = false;
    this.corked = 0;
    this.sync = true;
    this.bufferProcessing = false;
    this.onwrite = function(er) {
      onwrite(stream2, er);
    };
    this.writecb = null;
    this.writelen = 0;
    this.bufferedRequest = null;
    this.lastBufferedRequest = null;
    this.pendingcb = 0;
    this.prefinished = false;
    this.errorEmitted = false;
    this.emitClose = options.emitClose !== false;
    this.autoDestroy = !!options.autoDestroy;
    this.bufferedRequestCount = 0;
    this.corkedRequestsFree = new CorkedRequest(this);
  }
  WritableState.prototype.getBuffer = function getBuffer() {
    var current = this.bufferedRequest;
    var out = [];
    while (current) {
      out.push(current);
      current = current.next;
    }
    return out;
  };
  (function() {
    try {
      Object.defineProperty(WritableState.prototype, "buffer", {
        get: internalUtil.deprecate(function writableStateBufferGetter() {
          return this.getBuffer();
        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
      });
    } catch (_) {
    }
  })();
  var realHasInstance;
  if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
    realHasInstance = Function.prototype[Symbol.hasInstance];
    Object.defineProperty(Writable, Symbol.hasInstance, {
      value: function value(object) {
        if (realHasInstance.call(this, object))
          return true;
        if (this !== Writable)
          return false;
        return object && object._writableState instanceof WritableState;
      }
    });
  } else {
    realHasInstance = function realHasInstance2(object) {
      return object instanceof this;
    };
  }
  function Writable(options) {
    Duplex = Duplex || require_stream_duplex();
    var isDuplex = this instanceof Duplex;
    if (!isDuplex && !realHasInstance.call(Writable, this))
      return new Writable(options);
    this._writableState = new WritableState(options, this, isDuplex);
    this.writable = true;
    if (options) {
      if (typeof options.write === "function")
        this._write = options.write;
      if (typeof options.writev === "function")
        this._writev = options.writev;
      if (typeof options.destroy === "function")
        this._destroy = options.destroy;
      if (typeof options.final === "function")
        this._final = options.final;
    }
    Stream.call(this);
  }
  Writable.prototype.pipe = function() {
    errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
  };
  function writeAfterEnd(stream2, cb) {
    var er = new ERR_STREAM_WRITE_AFTER_END();
    errorOrDestroy(stream2, er);
    process.nextTick(cb, er);
  }
  function validChunk(stream2, state2, chunk, cb) {
    var er;
    if (chunk === null) {
      er = new ERR_STREAM_NULL_VALUES();
    } else if (typeof chunk !== "string" && !state2.objectMode) {
      er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer"], chunk);
    }
    if (er) {
      errorOrDestroy(stream2, er);
      process.nextTick(cb, er);
      return false;
    }
    return true;
  }
  Writable.prototype.write = function(chunk, encoding, cb) {
    var state2 = this._writableState;
    var ret = false;
    var isBuf = !state2.objectMode && _isUint8Array(chunk);
    if (isBuf && !Buffer2.isBuffer(chunk)) {
      chunk = _uint8ArrayToBuffer(chunk);
    }
    if (typeof encoding === "function") {
      cb = encoding;
      encoding = null;
    }
    if (isBuf)
      encoding = "buffer";
    else if (!encoding)
      encoding = state2.defaultEncoding;
    if (typeof cb !== "function")
      cb = nop;
    if (state2.ending)
      writeAfterEnd(this, cb);
    else if (isBuf || validChunk(this, state2, chunk, cb)) {
      state2.pendingcb++;
      ret = writeOrBuffer(this, state2, isBuf, chunk, encoding, cb);
    }
    return ret;
  };
  Writable.prototype.cork = function() {
    this._writableState.corked++;
  };
  Writable.prototype.uncork = function() {
    var state2 = this._writableState;
    if (state2.corked) {
      state2.corked--;
      if (!state2.writing && !state2.corked && !state2.bufferProcessing && state2.bufferedRequest)
        clearBuffer(this, state2);
    }
  };
  Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
    if (typeof encoding === "string")
      encoding = encoding.toLowerCase();
    if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1))
      throw new ERR_UNKNOWN_ENCODING(encoding);
    this._writableState.defaultEncoding = encoding;
    return this;
  };
  Object.defineProperty(Writable.prototype, "writableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      return this._writableState && this._writableState.getBuffer();
    }
  });
  function decodeChunk(state2, chunk, encoding) {
    if (!state2.objectMode && state2.decodeStrings !== false && typeof chunk === "string") {
      chunk = Buffer2.from(chunk, encoding);
    }
    return chunk;
  }
  Object.defineProperty(Writable.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      return this._writableState.highWaterMark;
    }
  });
  function writeOrBuffer(stream2, state2, isBuf, chunk, encoding, cb) {
    if (!isBuf) {
      var newChunk = decodeChunk(state2, chunk, encoding);
      if (chunk !== newChunk) {
        isBuf = true;
        encoding = "buffer";
        chunk = newChunk;
      }
    }
    var len = state2.objectMode ? 1 : chunk.length;
    state2.length += len;
    var ret = state2.length < state2.highWaterMark;
    if (!ret)
      state2.needDrain = true;
    if (state2.writing || state2.corked) {
      var last = state2.lastBufferedRequest;
      state2.lastBufferedRequest = {
        chunk,
        encoding,
        isBuf,
        callback: cb,
        next: null
      };
      if (last) {
        last.next = state2.lastBufferedRequest;
      } else {
        state2.bufferedRequest = state2.lastBufferedRequest;
      }
      state2.bufferedRequestCount += 1;
    } else {
      doWrite(stream2, state2, false, len, chunk, encoding, cb);
    }
    return ret;
  }
  function doWrite(stream2, state2, writev, len, chunk, encoding, cb) {
    state2.writelen = len;
    state2.writecb = cb;
    state2.writing = true;
    state2.sync = true;
    if (state2.destroyed)
      state2.onwrite(new ERR_STREAM_DESTROYED("write"));
    else if (writev)
      stream2._writev(chunk, state2.onwrite);
    else
      stream2._write(chunk, encoding, state2.onwrite);
    state2.sync = false;
  }
  function onwriteError(stream2, state2, sync2, er, cb) {
    --state2.pendingcb;
    if (sync2) {
      process.nextTick(cb, er);
      process.nextTick(finishMaybe, stream2, state2);
      stream2._writableState.errorEmitted = true;
      errorOrDestroy(stream2, er);
    } else {
      cb(er);
      stream2._writableState.errorEmitted = true;
      errorOrDestroy(stream2, er);
      finishMaybe(stream2, state2);
    }
  }
  function onwriteStateUpdate(state2) {
    state2.writing = false;
    state2.writecb = null;
    state2.length -= state2.writelen;
    state2.writelen = 0;
  }
  function onwrite(stream2, er) {
    var state2 = stream2._writableState;
    var sync2 = state2.sync;
    var cb = state2.writecb;
    if (typeof cb !== "function")
      throw new ERR_MULTIPLE_CALLBACK();
    onwriteStateUpdate(state2);
    if (er)
      onwriteError(stream2, state2, sync2, er, cb);
    else {
      var finished = needFinish(state2) || stream2.destroyed;
      if (!finished && !state2.corked && !state2.bufferProcessing && state2.bufferedRequest) {
        clearBuffer(stream2, state2);
      }
      if (sync2) {
        process.nextTick(afterWrite, stream2, state2, finished, cb);
      } else {
        afterWrite(stream2, state2, finished, cb);
      }
    }
  }
  function afterWrite(stream2, state2, finished, cb) {
    if (!finished)
      onwriteDrain(stream2, state2);
    state2.pendingcb--;
    cb();
    finishMaybe(stream2, state2);
  }
  function onwriteDrain(stream2, state2) {
    if (state2.length === 0 && state2.needDrain) {
      state2.needDrain = false;
      stream2.emit("drain");
    }
  }
  function clearBuffer(stream2, state2) {
    state2.bufferProcessing = true;
    var entry = state2.bufferedRequest;
    if (stream2._writev && entry && entry.next) {
      var l = state2.bufferedRequestCount;
      var buffer2 = new Array(l);
      var holder = state2.corkedRequestsFree;
      holder.entry = entry;
      var count = 0;
      var allBuffers = true;
      while (entry) {
        buffer2[count] = entry;
        if (!entry.isBuf)
          allBuffers = false;
        entry = entry.next;
        count += 1;
      }
      buffer2.allBuffers = allBuffers;
      doWrite(stream2, state2, true, state2.length, buffer2, "", holder.finish);
      state2.pendingcb++;
      state2.lastBufferedRequest = null;
      if (holder.next) {
        state2.corkedRequestsFree = holder.next;
        holder.next = null;
      } else {
        state2.corkedRequestsFree = new CorkedRequest(state2);
      }
      state2.bufferedRequestCount = 0;
    } else {
      while (entry) {
        var chunk = entry.chunk;
        var encoding = entry.encoding;
        var cb = entry.callback;
        var len = state2.objectMode ? 1 : chunk.length;
        doWrite(stream2, state2, false, len, chunk, encoding, cb);
        entry = entry.next;
        state2.bufferedRequestCount--;
        if (state2.writing) {
          break;
        }
      }
      if (entry === null)
        state2.lastBufferedRequest = null;
    }
    state2.bufferedRequest = entry;
    state2.bufferProcessing = false;
  }
  Writable.prototype._write = function(chunk, encoding, cb) {
    cb(new ERR_METHOD_NOT_IMPLEMENTED("_write()"));
  };
  Writable.prototype._writev = null;
  Writable.prototype.end = function(chunk, encoding, cb) {
    var state2 = this._writableState;
    if (typeof chunk === "function") {
      cb = chunk;
      chunk = null;
      encoding = null;
    } else if (typeof encoding === "function") {
      cb = encoding;
      encoding = null;
    }
    if (chunk !== null && chunk !== void 0)
      this.write(chunk, encoding);
    if (state2.corked) {
      state2.corked = 1;
      this.uncork();
    }
    if (!state2.ending)
      endWritable(this, state2, cb);
    return this;
  };
  Object.defineProperty(Writable.prototype, "writableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      return this._writableState.length;
    }
  });
  function needFinish(state2) {
    return state2.ending && state2.length === 0 && state2.bufferedRequest === null && !state2.finished && !state2.writing;
  }
  function callFinal(stream2, state2) {
    stream2._final(function(err) {
      state2.pendingcb--;
      if (err) {
        errorOrDestroy(stream2, err);
      }
      state2.prefinished = true;
      stream2.emit("prefinish");
      finishMaybe(stream2, state2);
    });
  }
  function prefinish(stream2, state2) {
    if (!state2.prefinished && !state2.finalCalled) {
      if (typeof stream2._final === "function" && !state2.destroyed) {
        state2.pendingcb++;
        state2.finalCalled = true;
        process.nextTick(callFinal, stream2, state2);
      } else {
        state2.prefinished = true;
        stream2.emit("prefinish");
      }
    }
  }
  function finishMaybe(stream2, state2) {
    var need = needFinish(state2);
    if (need) {
      prefinish(stream2, state2);
      if (state2.pendingcb === 0) {
        state2.finished = true;
        stream2.emit("finish");
        if (state2.autoDestroy) {
          var rState = stream2._readableState;
          if (!rState || rState.autoDestroy && rState.endEmitted) {
            stream2.destroy();
          }
        }
      }
    }
    return need;
  }
  function endWritable(stream2, state2, cb) {
    state2.ending = true;
    finishMaybe(stream2, state2);
    if (cb) {
      if (state2.finished)
        process.nextTick(cb);
      else
        stream2.once("finish", cb);
    }
    state2.ended = true;
    stream2.writable = false;
  }
  function onCorkedFinish(corkReq, state2, err) {
    var entry = corkReq.entry;
    corkReq.entry = null;
    while (entry) {
      var cb = entry.callback;
      state2.pendingcb--;
      cb(err);
      entry = entry.next;
    }
    state2.corkedRequestsFree.next = corkReq;
  }
  Object.defineProperty(Writable.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      if (this._writableState === void 0) {
        return false;
      }
      return this._writableState.destroyed;
    },
    set: function set(value) {
      if (!this._writableState) {
        return;
      }
      this._writableState.destroyed = value;
    }
  });
  Writable.prototype.destroy = destroyImpl.destroy;
  Writable.prototype._undestroy = destroyImpl.undestroy;
  Writable.prototype._destroy = function(err, cb) {
    cb(err);
  };
  return _stream_writable;
}
var _stream_duplex;
var hasRequired_stream_duplex;
function require_stream_duplex() {
  if (hasRequired_stream_duplex)
    return _stream_duplex;
  hasRequired_stream_duplex = 1;
  var objectKeys2 = Object.keys || function(obj) {
    var keys2 = [];
    for (var key2 in obj)
      keys2.push(key2);
    return keys2;
  };
  _stream_duplex = Duplex;
  var Readable = require_stream_readable();
  var Writable = require_stream_writable();
  requireInherits()(Duplex, Readable);
  {
    var keys = objectKeys2(Writable.prototype);
    for (var v = 0; v < keys.length; v++) {
      var method = keys[v];
      if (!Duplex.prototype[method])
        Duplex.prototype[method] = Writable.prototype[method];
    }
  }
  function Duplex(options) {
    if (!(this instanceof Duplex))
      return new Duplex(options);
    Readable.call(this, options);
    Writable.call(this, options);
    this.allowHalfOpen = true;
    if (options) {
      if (options.readable === false)
        this.readable = false;
      if (options.writable === false)
        this.writable = false;
      if (options.allowHalfOpen === false) {
        this.allowHalfOpen = false;
        this.once("end", onend);
      }
    }
  }
  Object.defineProperty(Duplex.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      return this._writableState.highWaterMark;
    }
  });
  Object.defineProperty(Duplex.prototype, "writableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      return this._writableState && this._writableState.getBuffer();
    }
  });
  Object.defineProperty(Duplex.prototype, "writableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      return this._writableState.length;
    }
  });
  function onend() {
    if (this._writableState.ended)
      return;
    process.nextTick(onEndNT, this);
  }
  function onEndNT(self2) {
    self2.end();
  }
  Object.defineProperty(Duplex.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      if (this._readableState === void 0 || this._writableState === void 0) {
        return false;
      }
      return this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function set(value) {
      if (this._readableState === void 0 || this._writableState === void 0) {
        return;
      }
      this._readableState.destroyed = value;
      this._writableState.destroyed = value;
    }
  });
  return _stream_duplex;
}
var string_decoder = {};
var hasRequiredString_decoder;
function requireString_decoder() {
  if (hasRequiredString_decoder)
    return string_decoder;
  hasRequiredString_decoder = 1;
  var Buffer2 = safeBufferExports.Buffer;
  var isEncoding = Buffer2.isEncoding || function(encoding) {
    encoding = "" + encoding;
    switch (encoding && encoding.toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
      case "raw":
        return true;
      default:
        return false;
    }
  };
  function _normalizeEncoding(enc) {
    if (!enc)
      return "utf8";
    var retried;
    while (true) {
      switch (enc) {
        case "utf8":
        case "utf-8":
          return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return "utf16le";
        case "latin1":
        case "binary":
          return "latin1";
        case "base64":
        case "ascii":
        case "hex":
          return enc;
        default:
          if (retried)
            return;
          enc = ("" + enc).toLowerCase();
          retried = true;
      }
    }
  }
  function normalizeEncoding(enc) {
    var nenc = _normalizeEncoding(enc);
    if (typeof nenc !== "string" && (Buffer2.isEncoding === isEncoding || !isEncoding(enc)))
      throw new Error("Unknown encoding: " + enc);
    return nenc || enc;
  }
  string_decoder.StringDecoder = StringDecoder;
  function StringDecoder(encoding) {
    this.encoding = normalizeEncoding(encoding);
    var nb;
    switch (this.encoding) {
      case "utf16le":
        this.text = utf16Text;
        this.end = utf16End;
        nb = 4;
        break;
      case "utf8":
        this.fillLast = utf8FillLast;
        nb = 4;
        break;
      case "base64":
        this.text = base64Text;
        this.end = base64End;
        nb = 3;
        break;
      default:
        this.write = simpleWrite;
        this.end = simpleEnd;
        return;
    }
    this.lastNeed = 0;
    this.lastTotal = 0;
    this.lastChar = Buffer2.allocUnsafe(nb);
  }
  StringDecoder.prototype.write = function(buf) {
    if (buf.length === 0)
      return "";
    var r;
    var i;
    if (this.lastNeed) {
      r = this.fillLast(buf);
      if (r === void 0)
        return "";
      i = this.lastNeed;
      this.lastNeed = 0;
    } else {
      i = 0;
    }
    if (i < buf.length)
      return r ? r + this.text(buf, i) : this.text(buf, i);
    return r || "";
  };
  StringDecoder.prototype.end = utf8End;
  StringDecoder.prototype.text = utf8Text;
  StringDecoder.prototype.fillLast = function(buf) {
    if (this.lastNeed <= buf.length) {
      buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
      return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
    this.lastNeed -= buf.length;
  };
  function utf8CheckByte(byte) {
    if (byte <= 127)
      return 0;
    else if (byte >> 5 === 6)
      return 2;
    else if (byte >> 4 === 14)
      return 3;
    else if (byte >> 3 === 30)
      return 4;
    return byte >> 6 === 2 ? -1 : -2;
  }
  function utf8CheckIncomplete(self2, buf, i) {
    var j = buf.length - 1;
    if (j < i)
      return 0;
    var nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
      if (nb > 0)
        self2.lastNeed = nb - 1;
      return nb;
    }
    if (--j < i || nb === -2)
      return 0;
    nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
      if (nb > 0)
        self2.lastNeed = nb - 2;
      return nb;
    }
    if (--j < i || nb === -2)
      return 0;
    nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
      if (nb > 0) {
        if (nb === 2)
          nb = 0;
        else
          self2.lastNeed = nb - 3;
      }
      return nb;
    }
    return 0;
  }
  function utf8CheckExtraBytes(self2, buf, p) {
    if ((buf[0] & 192) !== 128) {
      self2.lastNeed = 0;
      return "�";
    }
    if (self2.lastNeed > 1 && buf.length > 1) {
      if ((buf[1] & 192) !== 128) {
        self2.lastNeed = 1;
        return "�";
      }
      if (self2.lastNeed > 2 && buf.length > 2) {
        if ((buf[2] & 192) !== 128) {
          self2.lastNeed = 2;
          return "�";
        }
      }
    }
  }
  function utf8FillLast(buf) {
    var p = this.lastTotal - this.lastNeed;
    var r = utf8CheckExtraBytes(this, buf);
    if (r !== void 0)
      return r;
    if (this.lastNeed <= buf.length) {
      buf.copy(this.lastChar, p, 0, this.lastNeed);
      return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, p, 0, buf.length);
    this.lastNeed -= buf.length;
  }
  function utf8Text(buf, i) {
    var total = utf8CheckIncomplete(this, buf, i);
    if (!this.lastNeed)
      return buf.toString("utf8", i);
    this.lastTotal = total;
    var end = buf.length - (total - this.lastNeed);
    buf.copy(this.lastChar, 0, end);
    return buf.toString("utf8", i, end);
  }
  function utf8End(buf) {
    var r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed)
      return r + "�";
    return r;
  }
  function utf16Text(buf, i) {
    if ((buf.length - i) % 2 === 0) {
      var r = buf.toString("utf16le", i);
      if (r) {
        var c = r.charCodeAt(r.length - 1);
        if (c >= 55296 && c <= 56319) {
          this.lastNeed = 2;
          this.lastTotal = 4;
          this.lastChar[0] = buf[buf.length - 2];
          this.lastChar[1] = buf[buf.length - 1];
          return r.slice(0, -1);
        }
      }
      return r;
    }
    this.lastNeed = 1;
    this.lastTotal = 2;
    this.lastChar[0] = buf[buf.length - 1];
    return buf.toString("utf16le", i, buf.length - 1);
  }
  function utf16End(buf) {
    var r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed) {
      var end = this.lastTotal - this.lastNeed;
      return r + this.lastChar.toString("utf16le", 0, end);
    }
    return r;
  }
  function base64Text(buf, i) {
    var n = (buf.length - i) % 3;
    if (n === 0)
      return buf.toString("base64", i);
    this.lastNeed = 3 - n;
    this.lastTotal = 3;
    if (n === 1) {
      this.lastChar[0] = buf[buf.length - 1];
    } else {
      this.lastChar[0] = buf[buf.length - 2];
      this.lastChar[1] = buf[buf.length - 1];
    }
    return buf.toString("base64", i, buf.length - n);
  }
  function base64End(buf) {
    var r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed)
      return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
    return r;
  }
  function simpleWrite(buf) {
    return buf.toString(this.encoding);
  }
  function simpleEnd(buf) {
    return buf && buf.length ? this.write(buf) : "";
  }
  return string_decoder;
}
var endOfStream;
var hasRequiredEndOfStream;
function requireEndOfStream() {
  if (hasRequiredEndOfStream)
    return endOfStream;
  hasRequiredEndOfStream = 1;
  var ERR_STREAM_PREMATURE_CLOSE = requireErrors().codes.ERR_STREAM_PREMATURE_CLOSE;
  function once3(callback) {
    var called = false;
    return function() {
      if (called)
        return;
      called = true;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      callback.apply(this, args);
    };
  }
  function noop() {
  }
  function isRequest(stream2) {
    return stream2.setHeader && typeof stream2.abort === "function";
  }
  function eos(stream2, opts, callback) {
    if (typeof opts === "function")
      return eos(stream2, null, opts);
    if (!opts)
      opts = {};
    callback = once3(callback || noop);
    var readable2 = opts.readable || opts.readable !== false && stream2.readable;
    var writable = opts.writable || opts.writable !== false && stream2.writable;
    var onlegacyfinish = function onlegacyfinish2() {
      if (!stream2.writable)
        onfinish();
    };
    var writableEnded = stream2._writableState && stream2._writableState.finished;
    var onfinish = function onfinish2() {
      writable = false;
      writableEnded = true;
      if (!readable2)
        callback.call(stream2);
    };
    var readableEnded = stream2._readableState && stream2._readableState.endEmitted;
    var onend = function onend2() {
      readable2 = false;
      readableEnded = true;
      if (!writable)
        callback.call(stream2);
    };
    var onerror = function onerror2(err) {
      callback.call(stream2, err);
    };
    var onclose = function onclose2() {
      var err;
      if (readable2 && !readableEnded) {
        if (!stream2._readableState || !stream2._readableState.ended)
          err = new ERR_STREAM_PREMATURE_CLOSE();
        return callback.call(stream2, err);
      }
      if (writable && !writableEnded) {
        if (!stream2._writableState || !stream2._writableState.ended)
          err = new ERR_STREAM_PREMATURE_CLOSE();
        return callback.call(stream2, err);
      }
    };
    var onrequest = function onrequest2() {
      stream2.req.on("finish", onfinish);
    };
    if (isRequest(stream2)) {
      stream2.on("complete", onfinish);
      stream2.on("abort", onclose);
      if (stream2.req)
        onrequest();
      else
        stream2.on("request", onrequest);
    } else if (writable && !stream2._writableState) {
      stream2.on("end", onlegacyfinish);
      stream2.on("close", onlegacyfinish);
    }
    stream2.on("end", onend);
    stream2.on("finish", onfinish);
    if (opts.error !== false)
      stream2.on("error", onerror);
    stream2.on("close", onclose);
    return function() {
      stream2.removeListener("complete", onfinish);
      stream2.removeListener("abort", onclose);
      stream2.removeListener("request", onrequest);
      if (stream2.req)
        stream2.req.removeListener("finish", onfinish);
      stream2.removeListener("end", onlegacyfinish);
      stream2.removeListener("close", onlegacyfinish);
      stream2.removeListener("finish", onfinish);
      stream2.removeListener("end", onend);
      stream2.removeListener("error", onerror);
      stream2.removeListener("close", onclose);
    };
  }
  endOfStream = eos;
  return endOfStream;
}
var async_iterator;
var hasRequiredAsync_iterator;
function requireAsync_iterator() {
  if (hasRequiredAsync_iterator)
    return async_iterator;
  hasRequiredAsync_iterator = 1;
  var _Object$setPrototypeO;
  function _defineProperty(obj, key2, value) {
    key2 = _toPropertyKey(key2);
    if (key2 in obj) {
      Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key2] = value;
    }
    return obj;
  }
  function _toPropertyKey(arg) {
    var key2 = _toPrimitive(arg, "string");
    return typeof key2 === "symbol" ? key2 : String(key2);
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null)
      return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== void 0) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object")
        return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  var finished = requireEndOfStream();
  var kLastResolve = Symbol("lastResolve");
  var kLastReject = Symbol("lastReject");
  var kError = Symbol("error");
  var kEnded = Symbol("ended");
  var kLastPromise = Symbol("lastPromise");
  var kHandlePromise = Symbol("handlePromise");
  var kStream = Symbol("stream");
  function createIterResult(value, done) {
    return {
      value,
      done
    };
  }
  function readAndResolve(iter) {
    var resolve = iter[kLastResolve];
    if (resolve !== null) {
      var data = iter[kStream].read();
      if (data !== null) {
        iter[kLastPromise] = null;
        iter[kLastResolve] = null;
        iter[kLastReject] = null;
        resolve(createIterResult(data, false));
      }
    }
  }
  function onReadable(iter) {
    process.nextTick(readAndResolve, iter);
  }
  function wrapForNext(lastPromise, iter) {
    return function(resolve, reject) {
      lastPromise.then(function() {
        if (iter[kEnded]) {
          resolve(createIterResult(void 0, true));
          return;
        }
        iter[kHandlePromise](resolve, reject);
      }, reject);
    };
  }
  var AsyncIteratorPrototype = Object.getPrototypeOf(function() {
  });
  var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
    get stream() {
      return this[kStream];
    },
    next: function next() {
      var _this = this;
      var error = this[kError];
      if (error !== null) {
        return Promise.reject(error);
      }
      if (this[kEnded]) {
        return Promise.resolve(createIterResult(void 0, true));
      }
      if (this[kStream].destroyed) {
        return new Promise(function(resolve, reject) {
          process.nextTick(function() {
            if (_this[kError]) {
              reject(_this[kError]);
            } else {
              resolve(createIterResult(void 0, true));
            }
          });
        });
      }
      var lastPromise = this[kLastPromise];
      var promise;
      if (lastPromise) {
        promise = new Promise(wrapForNext(lastPromise, this));
      } else {
        var data = this[kStream].read();
        if (data !== null) {
          return Promise.resolve(createIterResult(data, false));
        }
        promise = new Promise(this[kHandlePromise]);
      }
      this[kLastPromise] = promise;
      return promise;
    }
  }, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function() {
    return this;
  }), _defineProperty(_Object$setPrototypeO, "return", function _return() {
    var _this2 = this;
    return new Promise(function(resolve, reject) {
      _this2[kStream].destroy(null, function(err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(createIterResult(void 0, true));
      });
    });
  }), _Object$setPrototypeO), AsyncIteratorPrototype);
  var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator2(stream2) {
    var _Object$create;
    var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
      value: stream2,
      writable: true
    }), _defineProperty(_Object$create, kLastResolve, {
      value: null,
      writable: true
    }), _defineProperty(_Object$create, kLastReject, {
      value: null,
      writable: true
    }), _defineProperty(_Object$create, kError, {
      value: null,
      writable: true
    }), _defineProperty(_Object$create, kEnded, {
      value: stream2._readableState.endEmitted,
      writable: true
    }), _defineProperty(_Object$create, kHandlePromise, {
      value: function value(resolve, reject) {
        var data = iterator[kStream].read();
        if (data) {
          iterator[kLastPromise] = null;
          iterator[kLastResolve] = null;
          iterator[kLastReject] = null;
          resolve(createIterResult(data, false));
        } else {
          iterator[kLastResolve] = resolve;
          iterator[kLastReject] = reject;
        }
      },
      writable: true
    }), _Object$create));
    iterator[kLastPromise] = null;
    finished(stream2, function(err) {
      if (err && err.code !== "ERR_STREAM_PREMATURE_CLOSE") {
        var reject = iterator[kLastReject];
        if (reject !== null) {
          iterator[kLastPromise] = null;
          iterator[kLastResolve] = null;
          iterator[kLastReject] = null;
          reject(err);
        }
        iterator[kError] = err;
        return;
      }
      var resolve = iterator[kLastResolve];
      if (resolve !== null) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        resolve(createIterResult(void 0, true));
      }
      iterator[kEnded] = true;
    });
    stream2.on("readable", onReadable.bind(null, iterator));
    return iterator;
  };
  async_iterator = createReadableStreamAsyncIterator;
  return async_iterator;
}
var from_1;
var hasRequiredFrom;
function requireFrom() {
  if (hasRequiredFrom)
    return from_1;
  hasRequiredFrom = 1;
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key2, arg) {
    try {
      var info = gen[key2](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function() {
      var self2 = this, args = arguments;
      return new Promise(function(resolve, reject) {
        var gen = fn.apply(self2, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(void 0);
      });
    };
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), true).forEach(function(key2) {
        _defineProperty(target, key2, source[key2]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key2) {
        Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
      });
    }
    return target;
  }
  function _defineProperty(obj, key2, value) {
    key2 = _toPropertyKey(key2);
    if (key2 in obj) {
      Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key2] = value;
    }
    return obj;
  }
  function _toPropertyKey(arg) {
    var key2 = _toPrimitive(arg, "string");
    return typeof key2 === "symbol" ? key2 : String(key2);
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null)
      return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== void 0) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object")
        return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  var ERR_INVALID_ARG_TYPE = requireErrors().codes.ERR_INVALID_ARG_TYPE;
  function from(Readable, iterable, opts) {
    var iterator;
    if (iterable && typeof iterable.next === "function") {
      iterator = iterable;
    } else if (iterable && iterable[Symbol.asyncIterator])
      iterator = iterable[Symbol.asyncIterator]();
    else if (iterable && iterable[Symbol.iterator])
      iterator = iterable[Symbol.iterator]();
    else
      throw new ERR_INVALID_ARG_TYPE("iterable", ["Iterable"], iterable);
    var readable2 = new Readable(_objectSpread({
      objectMode: true
    }, opts));
    var reading = false;
    readable2._read = function() {
      if (!reading) {
        reading = true;
        next();
      }
    };
    function next() {
      return _next2.apply(this, arguments);
    }
    function _next2() {
      _next2 = _asyncToGenerator(function* () {
        try {
          var _yield$iterator$next = yield iterator.next(), value = _yield$iterator$next.value, done = _yield$iterator$next.done;
          if (done) {
            readable2.push(null);
          } else if (readable2.push(yield value)) {
            next();
          } else {
            reading = false;
          }
        } catch (err) {
          readable2.destroy(err);
        }
      });
      return _next2.apply(this, arguments);
    }
    return readable2;
  }
  from_1 = from;
  return from_1;
}
var _stream_readable;
var hasRequired_stream_readable;
function require_stream_readable() {
  if (hasRequired_stream_readable)
    return _stream_readable;
  hasRequired_stream_readable = 1;
  _stream_readable = Readable;
  var Duplex;
  Readable.ReadableState = ReadableState;
  eventsExports.EventEmitter;
  var EElistenerCount = function EElistenerCount2(emitter, type) {
    return emitter.listeners(type).length;
  };
  var Stream = requireStream();
  var Buffer2 = buffer$1.Buffer;
  var OurUint8Array = (typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
  };
  function _uint8ArrayToBuffer(chunk) {
    return Buffer2.from(chunk);
  }
  function _isUint8Array(obj) {
    return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
  }
  var debugUtil = requireUtil();
  var debug;
  if (debugUtil && debugUtil.debuglog) {
    debug = debugUtil.debuglog("stream");
  } else {
    debug = function debug2() {
    };
  }
  var BufferList = requireBuffer_list();
  var destroyImpl = requireDestroy();
  var _require = requireState(), getHighWaterMark = _require.getHighWaterMark;
  var _require$codes = requireErrors().codes, ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE, ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF, ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED, ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
  var StringDecoder;
  var createReadableStreamAsyncIterator;
  var from;
  requireInherits()(Readable, Stream);
  var errorOrDestroy = destroyImpl.errorOrDestroy;
  var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];
  function prependListener2(emitter, event, fn) {
    if (typeof emitter.prependListener === "function")
      return emitter.prependListener(event, fn);
    if (!emitter._events || !emitter._events[event])
      emitter.on(event, fn);
    else if (Array.isArray(emitter._events[event]))
      emitter._events[event].unshift(fn);
    else
      emitter._events[event] = [fn, emitter._events[event]];
  }
  function ReadableState(options, stream2, isDuplex) {
    Duplex = Duplex || require_stream_duplex();
    options = options || {};
    if (typeof isDuplex !== "boolean")
      isDuplex = stream2 instanceof Duplex;
    this.objectMode = !!options.objectMode;
    if (isDuplex)
      this.objectMode = this.objectMode || !!options.readableObjectMode;
    this.highWaterMark = getHighWaterMark(this, options, "readableHighWaterMark", isDuplex);
    this.buffer = new BufferList();
    this.length = 0;
    this.pipes = null;
    this.pipesCount = 0;
    this.flowing = null;
    this.ended = false;
    this.endEmitted = false;
    this.reading = false;
    this.sync = true;
    this.needReadable = false;
    this.emittedReadable = false;
    this.readableListening = false;
    this.resumeScheduled = false;
    this.paused = true;
    this.emitClose = options.emitClose !== false;
    this.autoDestroy = !!options.autoDestroy;
    this.destroyed = false;
    this.defaultEncoding = options.defaultEncoding || "utf8";
    this.awaitDrain = 0;
    this.readingMore = false;
    this.decoder = null;
    this.encoding = null;
    if (options.encoding) {
      if (!StringDecoder)
        StringDecoder = requireString_decoder().StringDecoder;
      this.decoder = new StringDecoder(options.encoding);
      this.encoding = options.encoding;
    }
  }
  function Readable(options) {
    Duplex = Duplex || require_stream_duplex();
    if (!(this instanceof Readable))
      return new Readable(options);
    var isDuplex = this instanceof Duplex;
    this._readableState = new ReadableState(options, this, isDuplex);
    this.readable = true;
    if (options) {
      if (typeof options.read === "function")
        this._read = options.read;
      if (typeof options.destroy === "function")
        this._destroy = options.destroy;
    }
    Stream.call(this);
  }
  Object.defineProperty(Readable.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      if (this._readableState === void 0) {
        return false;
      }
      return this._readableState.destroyed;
    },
    set: function set(value) {
      if (!this._readableState) {
        return;
      }
      this._readableState.destroyed = value;
    }
  });
  Readable.prototype.destroy = destroyImpl.destroy;
  Readable.prototype._undestroy = destroyImpl.undestroy;
  Readable.prototype._destroy = function(err, cb) {
    cb(err);
  };
  Readable.prototype.push = function(chunk, encoding) {
    var state2 = this._readableState;
    var skipChunkCheck;
    if (!state2.objectMode) {
      if (typeof chunk === "string") {
        encoding = encoding || state2.defaultEncoding;
        if (encoding !== state2.encoding) {
          chunk = Buffer2.from(chunk, encoding);
          encoding = "";
        }
        skipChunkCheck = true;
      }
    } else {
      skipChunkCheck = true;
    }
    return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
  };
  Readable.prototype.unshift = function(chunk) {
    return readableAddChunk(this, chunk, null, true, false);
  };
  function readableAddChunk(stream2, chunk, encoding, addToFront, skipChunkCheck) {
    debug("readableAddChunk", chunk);
    var state2 = stream2._readableState;
    if (chunk === null) {
      state2.reading = false;
      onEofChunk(stream2, state2);
    } else {
      var er;
      if (!skipChunkCheck)
        er = chunkInvalid(state2, chunk);
      if (er) {
        errorOrDestroy(stream2, er);
      } else if (state2.objectMode || chunk && chunk.length > 0) {
        if (typeof chunk !== "string" && !state2.objectMode && Object.getPrototypeOf(chunk) !== Buffer2.prototype) {
          chunk = _uint8ArrayToBuffer(chunk);
        }
        if (addToFront) {
          if (state2.endEmitted)
            errorOrDestroy(stream2, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
          else
            addChunk(stream2, state2, chunk, true);
        } else if (state2.ended) {
          errorOrDestroy(stream2, new ERR_STREAM_PUSH_AFTER_EOF());
        } else if (state2.destroyed) {
          return false;
        } else {
          state2.reading = false;
          if (state2.decoder && !encoding) {
            chunk = state2.decoder.write(chunk);
            if (state2.objectMode || chunk.length !== 0)
              addChunk(stream2, state2, chunk, false);
            else
              maybeReadMore(stream2, state2);
          } else {
            addChunk(stream2, state2, chunk, false);
          }
        }
      } else if (!addToFront) {
        state2.reading = false;
        maybeReadMore(stream2, state2);
      }
    }
    return !state2.ended && (state2.length < state2.highWaterMark || state2.length === 0);
  }
  function addChunk(stream2, state2, chunk, addToFront) {
    if (state2.flowing && state2.length === 0 && !state2.sync) {
      state2.awaitDrain = 0;
      stream2.emit("data", chunk);
    } else {
      state2.length += state2.objectMode ? 1 : chunk.length;
      if (addToFront)
        state2.buffer.unshift(chunk);
      else
        state2.buffer.push(chunk);
      if (state2.needReadable)
        emitReadable(stream2);
    }
    maybeReadMore(stream2, state2);
  }
  function chunkInvalid(state2, chunk) {
    var er;
    if (!_isUint8Array(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state2.objectMode) {
      er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer", "Uint8Array"], chunk);
    }
    return er;
  }
  Readable.prototype.isPaused = function() {
    return this._readableState.flowing === false;
  };
  Readable.prototype.setEncoding = function(enc) {
    if (!StringDecoder)
      StringDecoder = requireString_decoder().StringDecoder;
    var decoder = new StringDecoder(enc);
    this._readableState.decoder = decoder;
    this._readableState.encoding = this._readableState.decoder.encoding;
    var p = this._readableState.buffer.head;
    var content = "";
    while (p !== null) {
      content += decoder.write(p.data);
      p = p.next;
    }
    this._readableState.buffer.clear();
    if (content !== "")
      this._readableState.buffer.push(content);
    this._readableState.length = content.length;
    return this;
  };
  var MAX_HWM = 1073741824;
  function computeNewHighWaterMark(n) {
    if (n >= MAX_HWM) {
      n = MAX_HWM;
    } else {
      n--;
      n |= n >>> 1;
      n |= n >>> 2;
      n |= n >>> 4;
      n |= n >>> 8;
      n |= n >>> 16;
      n++;
    }
    return n;
  }
  function howMuchToRead(n, state2) {
    if (n <= 0 || state2.length === 0 && state2.ended)
      return 0;
    if (state2.objectMode)
      return 1;
    if (n !== n) {
      if (state2.flowing && state2.length)
        return state2.buffer.head.data.length;
      else
        return state2.length;
    }
    if (n > state2.highWaterMark)
      state2.highWaterMark = computeNewHighWaterMark(n);
    if (n <= state2.length)
      return n;
    if (!state2.ended) {
      state2.needReadable = true;
      return 0;
    }
    return state2.length;
  }
  Readable.prototype.read = function(n) {
    debug("read", n);
    n = parseInt(n, 10);
    var state2 = this._readableState;
    var nOrig = n;
    if (n !== 0)
      state2.emittedReadable = false;
    if (n === 0 && state2.needReadable && ((state2.highWaterMark !== 0 ? state2.length >= state2.highWaterMark : state2.length > 0) || state2.ended)) {
      debug("read: emitReadable", state2.length, state2.ended);
      if (state2.length === 0 && state2.ended)
        endReadable(this);
      else
        emitReadable(this);
      return null;
    }
    n = howMuchToRead(n, state2);
    if (n === 0 && state2.ended) {
      if (state2.length === 0)
        endReadable(this);
      return null;
    }
    var doRead = state2.needReadable;
    debug("need readable", doRead);
    if (state2.length === 0 || state2.length - n < state2.highWaterMark) {
      doRead = true;
      debug("length less than watermark", doRead);
    }
    if (state2.ended || state2.reading) {
      doRead = false;
      debug("reading or ended", doRead);
    } else if (doRead) {
      debug("do read");
      state2.reading = true;
      state2.sync = true;
      if (state2.length === 0)
        state2.needReadable = true;
      this._read(state2.highWaterMark);
      state2.sync = false;
      if (!state2.reading)
        n = howMuchToRead(nOrig, state2);
    }
    var ret;
    if (n > 0)
      ret = fromList(n, state2);
    else
      ret = null;
    if (ret === null) {
      state2.needReadable = state2.length <= state2.highWaterMark;
      n = 0;
    } else {
      state2.length -= n;
      state2.awaitDrain = 0;
    }
    if (state2.length === 0) {
      if (!state2.ended)
        state2.needReadable = true;
      if (nOrig !== n && state2.ended)
        endReadable(this);
    }
    if (ret !== null)
      this.emit("data", ret);
    return ret;
  };
  function onEofChunk(stream2, state2) {
    debug("onEofChunk");
    if (state2.ended)
      return;
    if (state2.decoder) {
      var chunk = state2.decoder.end();
      if (chunk && chunk.length) {
        state2.buffer.push(chunk);
        state2.length += state2.objectMode ? 1 : chunk.length;
      }
    }
    state2.ended = true;
    if (state2.sync) {
      emitReadable(stream2);
    } else {
      state2.needReadable = false;
      if (!state2.emittedReadable) {
        state2.emittedReadable = true;
        emitReadable_(stream2);
      }
    }
  }
  function emitReadable(stream2) {
    var state2 = stream2._readableState;
    debug("emitReadable", state2.needReadable, state2.emittedReadable);
    state2.needReadable = false;
    if (!state2.emittedReadable) {
      debug("emitReadable", state2.flowing);
      state2.emittedReadable = true;
      process.nextTick(emitReadable_, stream2);
    }
  }
  function emitReadable_(stream2) {
    var state2 = stream2._readableState;
    debug("emitReadable_", state2.destroyed, state2.length, state2.ended);
    if (!state2.destroyed && (state2.length || state2.ended)) {
      stream2.emit("readable");
      state2.emittedReadable = false;
    }
    state2.needReadable = !state2.flowing && !state2.ended && state2.length <= state2.highWaterMark;
    flow(stream2);
  }
  function maybeReadMore(stream2, state2) {
    if (!state2.readingMore) {
      state2.readingMore = true;
      process.nextTick(maybeReadMore_, stream2, state2);
    }
  }
  function maybeReadMore_(stream2, state2) {
    while (!state2.reading && !state2.ended && (state2.length < state2.highWaterMark || state2.flowing && state2.length === 0)) {
      var len = state2.length;
      debug("maybeReadMore read 0");
      stream2.read(0);
      if (len === state2.length)
        break;
    }
    state2.readingMore = false;
  }
  Readable.prototype._read = function(n) {
    errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED("_read()"));
  };
  Readable.prototype.pipe = function(dest, pipeOpts) {
    var src = this;
    var state2 = this._readableState;
    switch (state2.pipesCount) {
      case 0:
        state2.pipes = dest;
        break;
      case 1:
        state2.pipes = [state2.pipes, dest];
        break;
      default:
        state2.pipes.push(dest);
        break;
    }
    state2.pipesCount += 1;
    debug("pipe count=%d opts=%j", state2.pipesCount, pipeOpts);
    var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
    var endFn = doEnd ? onend : unpipe;
    if (state2.endEmitted)
      process.nextTick(endFn);
    else
      src.once("end", endFn);
    dest.on("unpipe", onunpipe);
    function onunpipe(readable2, unpipeInfo) {
      debug("onunpipe");
      if (readable2 === src) {
        if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
          unpipeInfo.hasUnpiped = true;
          cleanup();
        }
      }
    }
    function onend() {
      debug("onend");
      dest.end();
    }
    var ondrain = pipeOnDrain(src);
    dest.on("drain", ondrain);
    var cleanedUp = false;
    function cleanup() {
      debug("cleanup");
      dest.removeListener("close", onclose);
      dest.removeListener("finish", onfinish);
      dest.removeListener("drain", ondrain);
      dest.removeListener("error", onerror);
      dest.removeListener("unpipe", onunpipe);
      src.removeListener("end", onend);
      src.removeListener("end", unpipe);
      src.removeListener("data", ondata);
      cleanedUp = true;
      if (state2.awaitDrain && (!dest._writableState || dest._writableState.needDrain))
        ondrain();
    }
    src.on("data", ondata);
    function ondata(chunk) {
      debug("ondata");
      var ret = dest.write(chunk);
      debug("dest.write", ret);
      if (ret === false) {
        if ((state2.pipesCount === 1 && state2.pipes === dest || state2.pipesCount > 1 && indexOf(state2.pipes, dest) !== -1) && !cleanedUp) {
          debug("false write response, pause", state2.awaitDrain);
          state2.awaitDrain++;
        }
        src.pause();
      }
    }
    function onerror(er) {
      debug("onerror", er);
      unpipe();
      dest.removeListener("error", onerror);
      if (EElistenerCount(dest, "error") === 0)
        errorOrDestroy(dest, er);
    }
    prependListener2(dest, "error", onerror);
    function onclose() {
      dest.removeListener("finish", onfinish);
      unpipe();
    }
    dest.once("close", onclose);
    function onfinish() {
      debug("onfinish");
      dest.removeListener("close", onclose);
      unpipe();
    }
    dest.once("finish", onfinish);
    function unpipe() {
      debug("unpipe");
      src.unpipe(dest);
    }
    dest.emit("pipe", src);
    if (!state2.flowing) {
      debug("pipe resume");
      src.resume();
    }
    return dest;
  };
  function pipeOnDrain(src) {
    return function pipeOnDrainFunctionResult() {
      var state2 = src._readableState;
      debug("pipeOnDrain", state2.awaitDrain);
      if (state2.awaitDrain)
        state2.awaitDrain--;
      if (state2.awaitDrain === 0 && EElistenerCount(src, "data")) {
        state2.flowing = true;
        flow(src);
      }
    };
  }
  Readable.prototype.unpipe = function(dest) {
    var state2 = this._readableState;
    var unpipeInfo = {
      hasUnpiped: false
    };
    if (state2.pipesCount === 0)
      return this;
    if (state2.pipesCount === 1) {
      if (dest && dest !== state2.pipes)
        return this;
      if (!dest)
        dest = state2.pipes;
      state2.pipes = null;
      state2.pipesCount = 0;
      state2.flowing = false;
      if (dest)
        dest.emit("unpipe", this, unpipeInfo);
      return this;
    }
    if (!dest) {
      var dests = state2.pipes;
      var len = state2.pipesCount;
      state2.pipes = null;
      state2.pipesCount = 0;
      state2.flowing = false;
      for (var i = 0; i < len; i++)
        dests[i].emit("unpipe", this, {
          hasUnpiped: false
        });
      return this;
    }
    var index2 = indexOf(state2.pipes, dest);
    if (index2 === -1)
      return this;
    state2.pipes.splice(index2, 1);
    state2.pipesCount -= 1;
    if (state2.pipesCount === 1)
      state2.pipes = state2.pipes[0];
    dest.emit("unpipe", this, unpipeInfo);
    return this;
  };
  Readable.prototype.on = function(ev, fn) {
    var res = Stream.prototype.on.call(this, ev, fn);
    var state2 = this._readableState;
    if (ev === "data") {
      state2.readableListening = this.listenerCount("readable") > 0;
      if (state2.flowing !== false)
        this.resume();
    } else if (ev === "readable") {
      if (!state2.endEmitted && !state2.readableListening) {
        state2.readableListening = state2.needReadable = true;
        state2.flowing = false;
        state2.emittedReadable = false;
        debug("on readable", state2.length, state2.reading);
        if (state2.length) {
          emitReadable(this);
        } else if (!state2.reading) {
          process.nextTick(nReadingNextTick, this);
        }
      }
    }
    return res;
  };
  Readable.prototype.addListener = Readable.prototype.on;
  Readable.prototype.removeListener = function(ev, fn) {
    var res = Stream.prototype.removeListener.call(this, ev, fn);
    if (ev === "readable") {
      process.nextTick(updateReadableListening, this);
    }
    return res;
  };
  Readable.prototype.removeAllListeners = function(ev) {
    var res = Stream.prototype.removeAllListeners.apply(this, arguments);
    if (ev === "readable" || ev === void 0) {
      process.nextTick(updateReadableListening, this);
    }
    return res;
  };
  function updateReadableListening(self2) {
    var state2 = self2._readableState;
    state2.readableListening = self2.listenerCount("readable") > 0;
    if (state2.resumeScheduled && !state2.paused) {
      state2.flowing = true;
    } else if (self2.listenerCount("data") > 0) {
      self2.resume();
    }
  }
  function nReadingNextTick(self2) {
    debug("readable nexttick read 0");
    self2.read(0);
  }
  Readable.prototype.resume = function() {
    var state2 = this._readableState;
    if (!state2.flowing) {
      debug("resume");
      state2.flowing = !state2.readableListening;
      resume(this, state2);
    }
    state2.paused = false;
    return this;
  };
  function resume(stream2, state2) {
    if (!state2.resumeScheduled) {
      state2.resumeScheduled = true;
      process.nextTick(resume_, stream2, state2);
    }
  }
  function resume_(stream2, state2) {
    debug("resume", state2.reading);
    if (!state2.reading) {
      stream2.read(0);
    }
    state2.resumeScheduled = false;
    stream2.emit("resume");
    flow(stream2);
    if (state2.flowing && !state2.reading)
      stream2.read(0);
  }
  Readable.prototype.pause = function() {
    debug("call pause flowing=%j", this._readableState.flowing);
    if (this._readableState.flowing !== false) {
      debug("pause");
      this._readableState.flowing = false;
      this.emit("pause");
    }
    this._readableState.paused = true;
    return this;
  };
  function flow(stream2) {
    var state2 = stream2._readableState;
    debug("flow", state2.flowing);
    while (state2.flowing && stream2.read() !== null)
      ;
  }
  Readable.prototype.wrap = function(stream2) {
    var _this = this;
    var state2 = this._readableState;
    var paused = false;
    stream2.on("end", function() {
      debug("wrapped end");
      if (state2.decoder && !state2.ended) {
        var chunk = state2.decoder.end();
        if (chunk && chunk.length)
          _this.push(chunk);
      }
      _this.push(null);
    });
    stream2.on("data", function(chunk) {
      debug("wrapped data");
      if (state2.decoder)
        chunk = state2.decoder.write(chunk);
      if (state2.objectMode && (chunk === null || chunk === void 0))
        return;
      else if (!state2.objectMode && (!chunk || !chunk.length))
        return;
      var ret = _this.push(chunk);
      if (!ret) {
        paused = true;
        stream2.pause();
      }
    });
    for (var i in stream2) {
      if (this[i] === void 0 && typeof stream2[i] === "function") {
        this[i] = function methodWrap(method) {
          return function methodWrapReturnFunction() {
            return stream2[method].apply(stream2, arguments);
          };
        }(i);
      }
    }
    for (var n = 0; n < kProxyEvents.length; n++) {
      stream2.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
    }
    this._read = function(n2) {
      debug("wrapped _read", n2);
      if (paused) {
        paused = false;
        stream2.resume();
      }
    };
    return this;
  };
  if (typeof Symbol === "function") {
    Readable.prototype[Symbol.asyncIterator] = function() {
      if (createReadableStreamAsyncIterator === void 0) {
        createReadableStreamAsyncIterator = requireAsync_iterator();
      }
      return createReadableStreamAsyncIterator(this);
    };
  }
  Object.defineProperty(Readable.prototype, "readableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      return this._readableState.highWaterMark;
    }
  });
  Object.defineProperty(Readable.prototype, "readableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      return this._readableState && this._readableState.buffer;
    }
  });
  Object.defineProperty(Readable.prototype, "readableFlowing", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      return this._readableState.flowing;
    },
    set: function set(state2) {
      if (this._readableState) {
        this._readableState.flowing = state2;
      }
    }
  });
  Readable._fromList = fromList;
  Object.defineProperty(Readable.prototype, "readableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      return this._readableState.length;
    }
  });
  function fromList(n, state2) {
    if (state2.length === 0)
      return null;
    var ret;
    if (state2.objectMode)
      ret = state2.buffer.shift();
    else if (!n || n >= state2.length) {
      if (state2.decoder)
        ret = state2.buffer.join("");
      else if (state2.buffer.length === 1)
        ret = state2.buffer.first();
      else
        ret = state2.buffer.concat(state2.length);
      state2.buffer.clear();
    } else {
      ret = state2.buffer.consume(n, state2.decoder);
    }
    return ret;
  }
  function endReadable(stream2) {
    var state2 = stream2._readableState;
    debug("endReadable", state2.endEmitted);
    if (!state2.endEmitted) {
      state2.ended = true;
      process.nextTick(endReadableNT, state2, stream2);
    }
  }
  function endReadableNT(state2, stream2) {
    debug("endReadableNT", state2.endEmitted, state2.length);
    if (!state2.endEmitted && state2.length === 0) {
      state2.endEmitted = true;
      stream2.readable = false;
      stream2.emit("end");
      if (state2.autoDestroy) {
        var wState = stream2._writableState;
        if (!wState || wState.autoDestroy && wState.finished) {
          stream2.destroy();
        }
      }
    }
  }
  if (typeof Symbol === "function") {
    Readable.from = function(iterable, opts) {
      if (from === void 0) {
        from = requireFrom();
      }
      return from(Readable, iterable, opts);
    };
  }
  function indexOf(xs, x) {
    for (var i = 0, l = xs.length; i < l; i++) {
      if (xs[i] === x)
        return i;
    }
    return -1;
  }
  return _stream_readable;
}
var _stream_transform;
var hasRequired_stream_transform;
function require_stream_transform() {
  if (hasRequired_stream_transform)
    return _stream_transform;
  hasRequired_stream_transform = 1;
  _stream_transform = Transform;
  var _require$codes = requireErrors().codes, ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED, ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK, ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING, ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;
  var Duplex = require_stream_duplex();
  requireInherits()(Transform, Duplex);
  function afterTransform(er, data) {
    var ts = this._transformState;
    ts.transforming = false;
    var cb = ts.writecb;
    if (cb === null) {
      return this.emit("error", new ERR_MULTIPLE_CALLBACK());
    }
    ts.writechunk = null;
    ts.writecb = null;
    if (data != null)
      this.push(data);
    cb(er);
    var rs = this._readableState;
    rs.reading = false;
    if (rs.needReadable || rs.length < rs.highWaterMark) {
      this._read(rs.highWaterMark);
    }
  }
  function Transform(options) {
    if (!(this instanceof Transform))
      return new Transform(options);
    Duplex.call(this, options);
    this._transformState = {
      afterTransform: afterTransform.bind(this),
      needTransform: false,
      transforming: false,
      writecb: null,
      writechunk: null,
      writeencoding: null
    };
    this._readableState.needReadable = true;
    this._readableState.sync = false;
    if (options) {
      if (typeof options.transform === "function")
        this._transform = options.transform;
      if (typeof options.flush === "function")
        this._flush = options.flush;
    }
    this.on("prefinish", prefinish);
  }
  function prefinish() {
    var _this = this;
    if (typeof this._flush === "function" && !this._readableState.destroyed) {
      this._flush(function(er, data) {
        done(_this, er, data);
      });
    } else {
      done(this, null, null);
    }
  }
  Transform.prototype.push = function(chunk, encoding) {
    this._transformState.needTransform = false;
    return Duplex.prototype.push.call(this, chunk, encoding);
  };
  Transform.prototype._transform = function(chunk, encoding, cb) {
    cb(new ERR_METHOD_NOT_IMPLEMENTED("_transform()"));
  };
  Transform.prototype._write = function(chunk, encoding, cb) {
    var ts = this._transformState;
    ts.writecb = cb;
    ts.writechunk = chunk;
    ts.writeencoding = encoding;
    if (!ts.transforming) {
      var rs = this._readableState;
      if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark)
        this._read(rs.highWaterMark);
    }
  };
  Transform.prototype._read = function(n) {
    var ts = this._transformState;
    if (ts.writechunk !== null && !ts.transforming) {
      ts.transforming = true;
      this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
    } else {
      ts.needTransform = true;
    }
  };
  Transform.prototype._destroy = function(err, cb) {
    Duplex.prototype._destroy.call(this, err, function(err2) {
      cb(err2);
    });
  };
  function done(stream2, er, data) {
    if (er)
      return stream2.emit("error", er);
    if (data != null)
      stream2.push(data);
    if (stream2._writableState.length)
      throw new ERR_TRANSFORM_WITH_LENGTH_0();
    if (stream2._transformState.transforming)
      throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
    return stream2.push(null);
  }
  return _stream_transform;
}
var _stream_passthrough;
var hasRequired_stream_passthrough;
function require_stream_passthrough() {
  if (hasRequired_stream_passthrough)
    return _stream_passthrough;
  hasRequired_stream_passthrough = 1;
  _stream_passthrough = PassThrough;
  var Transform = require_stream_transform();
  requireInherits()(PassThrough, Transform);
  function PassThrough(options) {
    if (!(this instanceof PassThrough))
      return new PassThrough(options);
    Transform.call(this, options);
  }
  PassThrough.prototype._transform = function(chunk, encoding, cb) {
    cb(null, chunk);
  };
  return _stream_passthrough;
}
var pipeline_1;
var hasRequiredPipeline;
function requirePipeline() {
  if (hasRequiredPipeline)
    return pipeline_1;
  hasRequiredPipeline = 1;
  var eos;
  function once3(callback) {
    var called = false;
    return function() {
      if (called)
        return;
      called = true;
      callback.apply(void 0, arguments);
    };
  }
  var _require$codes = requireErrors().codes, ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS, ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
  function noop(err) {
    if (err)
      throw err;
  }
  function isRequest(stream2) {
    return stream2.setHeader && typeof stream2.abort === "function";
  }
  function destroyer(stream2, reading, writing, callback) {
    callback = once3(callback);
    var closed = false;
    stream2.on("close", function() {
      closed = true;
    });
    if (eos === void 0)
      eos = requireEndOfStream();
    eos(stream2, {
      readable: reading,
      writable: writing
    }, function(err) {
      if (err)
        return callback(err);
      closed = true;
      callback();
    });
    var destroyed = false;
    return function(err) {
      if (closed)
        return;
      if (destroyed)
        return;
      destroyed = true;
      if (isRequest(stream2))
        return stream2.abort();
      if (typeof stream2.destroy === "function")
        return stream2.destroy();
      callback(err || new ERR_STREAM_DESTROYED("pipe"));
    };
  }
  function call(fn) {
    fn();
  }
  function pipe(from, to) {
    return from.pipe(to);
  }
  function popCallback(streams) {
    if (!streams.length)
      return noop;
    if (typeof streams[streams.length - 1] !== "function")
      return noop;
    return streams.pop();
  }
  function pipeline() {
    for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
      streams[_key] = arguments[_key];
    }
    var callback = popCallback(streams);
    if (Array.isArray(streams[0]))
      streams = streams[0];
    if (streams.length < 2) {
      throw new ERR_MISSING_ARGS("streams");
    }
    var error;
    var destroys = streams.map(function(stream2, i) {
      var reading = i < streams.length - 1;
      var writing = i > 0;
      return destroyer(stream2, reading, writing, function(err) {
        if (!error)
          error = err;
        if (err)
          destroys.forEach(call);
        if (reading)
          return;
        destroys.forEach(call);
        callback(error);
      });
    });
    return streams.reduce(pipe);
  }
  pipeline_1 = pipeline;
  return pipeline_1;
}
var streamBrowserify;
var hasRequiredStreamBrowserify;
function requireStreamBrowserify() {
  if (hasRequiredStreamBrowserify)
    return streamBrowserify;
  hasRequiredStreamBrowserify = 1;
  streamBrowserify = Stream;
  var EE = eventsExports.EventEmitter;
  var inherits2 = requireInherits();
  inherits2(Stream, EE);
  Stream.Readable = require_stream_readable();
  Stream.Writable = require_stream_writable();
  Stream.Duplex = require_stream_duplex();
  Stream.Transform = require_stream_transform();
  Stream.PassThrough = require_stream_passthrough();
  Stream.finished = requireEndOfStream();
  Stream.pipeline = requirePipeline();
  Stream.Stream = Stream;
  function Stream() {
    EE.call(this);
  }
  Stream.prototype.pipe = function(dest, options) {
    var source = this;
    function ondata(chunk) {
      if (dest.writable) {
        if (false === dest.write(chunk) && source.pause) {
          source.pause();
        }
      }
    }
    source.on("data", ondata);
    function ondrain() {
      if (source.readable && source.resume) {
        source.resume();
      }
    }
    dest.on("drain", ondrain);
    if (!dest._isStdio && (!options || options.end !== false)) {
      source.on("end", onend);
      source.on("close", onclose);
    }
    var didOnEnd = false;
    function onend() {
      if (didOnEnd)
        return;
      didOnEnd = true;
      dest.end();
    }
    function onclose() {
      if (didOnEnd)
        return;
      didOnEnd = true;
      if (typeof dest.destroy === "function")
        dest.destroy();
    }
    function onerror(er) {
      cleanup();
      if (EE.listenerCount(this, "error") === 0) {
        throw er;
      }
    }
    source.on("error", onerror);
    dest.on("error", onerror);
    function cleanup() {
      source.removeListener("data", ondata);
      dest.removeListener("drain", ondrain);
      source.removeListener("end", onend);
      source.removeListener("close", onclose);
      source.removeListener("error", onerror);
      dest.removeListener("error", onerror);
      source.removeListener("end", cleanup);
      source.removeListener("close", cleanup);
      dest.removeListener("close", cleanup);
    }
    source.on("end", cleanup);
    source.on("close", cleanup);
    dest.on("close", cleanup);
    dest.emit("pipe", source);
    return dest;
  };
  return streamBrowserify;
}
(function(module, exports) {
  var Stream = requireStreamBrowserify();
  if (process.env.READABLE_STREAM === "disable" && Stream) {
    module.exports = Stream.Readable;
    Object.assign(module.exports, Stream);
    module.exports.Stream = Stream;
  } else {
    exports = module.exports = require_stream_readable();
    exports.Stream = Stream || exports;
    exports.Readable = exports;
    exports.Writable = require_stream_writable();
    exports.Duplex = require_stream_duplex();
    exports.Transform = require_stream_transform();
    exports.PassThrough = require_stream_passthrough();
    exports.finished = requireEndOfStream();
    exports.pipeline = requirePipeline();
  }
})(readable, readable.exports);
var readableExports = readable.exports;
var hashBase;
var hasRequiredHashBase;
function requireHashBase() {
  if (hasRequiredHashBase)
    return hashBase;
  hasRequiredHashBase = 1;
  var Buffer2 = safeBufferExports.Buffer;
  var Transform = readableExports.Transform;
  var inherits2 = requireInherits();
  function throwIfNotStringOrBuffer(val, prefix) {
    if (!Buffer2.isBuffer(val) && typeof val !== "string") {
      throw new TypeError(prefix + " must be a string or a buffer");
    }
  }
  function HashBase(blockSize) {
    Transform.call(this);
    this._block = Buffer2.allocUnsafe(blockSize);
    this._blockSize = blockSize;
    this._blockOffset = 0;
    this._length = [0, 0, 0, 0];
    this._finalized = false;
  }
  inherits2(HashBase, Transform);
  HashBase.prototype._transform = function(chunk, encoding, callback) {
    var error = null;
    try {
      this.update(chunk, encoding);
    } catch (err) {
      error = err;
    }
    callback(error);
  };
  HashBase.prototype._flush = function(callback) {
    var error = null;
    try {
      this.push(this.digest());
    } catch (err) {
      error = err;
    }
    callback(error);
  };
  HashBase.prototype.update = function(data, encoding) {
    throwIfNotStringOrBuffer(data, "Data");
    if (this._finalized)
      throw new Error("Digest already called");
    if (!Buffer2.isBuffer(data))
      data = Buffer2.from(data, encoding);
    var block = this._block;
    var offset = 0;
    while (this._blockOffset + data.length - offset >= this._blockSize) {
      for (var i = this._blockOffset; i < this._blockSize; )
        block[i++] = data[offset++];
      this._update();
      this._blockOffset = 0;
    }
    while (offset < data.length)
      block[this._blockOffset++] = data[offset++];
    for (var j = 0, carry = data.length * 8; carry > 0; ++j) {
      this._length[j] += carry;
      carry = this._length[j] / 4294967296 | 0;
      if (carry > 0)
        this._length[j] -= 4294967296 * carry;
    }
    return this;
  };
  HashBase.prototype._update = function() {
    throw new Error("_update is not implemented");
  };
  HashBase.prototype.digest = function(encoding) {
    if (this._finalized)
      throw new Error("Digest already called");
    this._finalized = true;
    var digest = this._digest();
    if (encoding !== void 0)
      digest = digest.toString(encoding);
    this._block.fill(0);
    this._blockOffset = 0;
    for (var i = 0; i < 4; ++i)
      this._length[i] = 0;
    return digest;
  };
  HashBase.prototype._digest = function() {
    throw new Error("_digest is not implemented");
  };
  hashBase = HashBase;
  return hashBase;
}
var md5_js;
var hasRequiredMd5_js;
function requireMd5_js() {
  if (hasRequiredMd5_js)
    return md5_js;
  hasRequiredMd5_js = 1;
  var inherits2 = requireInherits();
  var HashBase = requireHashBase();
  var Buffer2 = safeBufferExports.Buffer;
  var ARRAY16 = new Array(16);
  function MD5() {
    HashBase.call(this, 64);
    this._a = 1732584193;
    this._b = 4023233417;
    this._c = 2562383102;
    this._d = 271733878;
  }
  inherits2(MD5, HashBase);
  MD5.prototype._update = function() {
    var M = ARRAY16;
    for (var i = 0; i < 16; ++i)
      M[i] = this._block.readInt32LE(i * 4);
    var a = this._a;
    var b = this._b;
    var c = this._c;
    var d = this._d;
    a = fnF(a, b, c, d, M[0], 3614090360, 7);
    d = fnF(d, a, b, c, M[1], 3905402710, 12);
    c = fnF(c, d, a, b, M[2], 606105819, 17);
    b = fnF(b, c, d, a, M[3], 3250441966, 22);
    a = fnF(a, b, c, d, M[4], 4118548399, 7);
    d = fnF(d, a, b, c, M[5], 1200080426, 12);
    c = fnF(c, d, a, b, M[6], 2821735955, 17);
    b = fnF(b, c, d, a, M[7], 4249261313, 22);
    a = fnF(a, b, c, d, M[8], 1770035416, 7);
    d = fnF(d, a, b, c, M[9], 2336552879, 12);
    c = fnF(c, d, a, b, M[10], 4294925233, 17);
    b = fnF(b, c, d, a, M[11], 2304563134, 22);
    a = fnF(a, b, c, d, M[12], 1804603682, 7);
    d = fnF(d, a, b, c, M[13], 4254626195, 12);
    c = fnF(c, d, a, b, M[14], 2792965006, 17);
    b = fnF(b, c, d, a, M[15], 1236535329, 22);
    a = fnG(a, b, c, d, M[1], 4129170786, 5);
    d = fnG(d, a, b, c, M[6], 3225465664, 9);
    c = fnG(c, d, a, b, M[11], 643717713, 14);
    b = fnG(b, c, d, a, M[0], 3921069994, 20);
    a = fnG(a, b, c, d, M[5], 3593408605, 5);
    d = fnG(d, a, b, c, M[10], 38016083, 9);
    c = fnG(c, d, a, b, M[15], 3634488961, 14);
    b = fnG(b, c, d, a, M[4], 3889429448, 20);
    a = fnG(a, b, c, d, M[9], 568446438, 5);
    d = fnG(d, a, b, c, M[14], 3275163606, 9);
    c = fnG(c, d, a, b, M[3], 4107603335, 14);
    b = fnG(b, c, d, a, M[8], 1163531501, 20);
    a = fnG(a, b, c, d, M[13], 2850285829, 5);
    d = fnG(d, a, b, c, M[2], 4243563512, 9);
    c = fnG(c, d, a, b, M[7], 1735328473, 14);
    b = fnG(b, c, d, a, M[12], 2368359562, 20);
    a = fnH(a, b, c, d, M[5], 4294588738, 4);
    d = fnH(d, a, b, c, M[8], 2272392833, 11);
    c = fnH(c, d, a, b, M[11], 1839030562, 16);
    b = fnH(b, c, d, a, M[14], 4259657740, 23);
    a = fnH(a, b, c, d, M[1], 2763975236, 4);
    d = fnH(d, a, b, c, M[4], 1272893353, 11);
    c = fnH(c, d, a, b, M[7], 4139469664, 16);
    b = fnH(b, c, d, a, M[10], 3200236656, 23);
    a = fnH(a, b, c, d, M[13], 681279174, 4);
    d = fnH(d, a, b, c, M[0], 3936430074, 11);
    c = fnH(c, d, a, b, M[3], 3572445317, 16);
    b = fnH(b, c, d, a, M[6], 76029189, 23);
    a = fnH(a, b, c, d, M[9], 3654602809, 4);
    d = fnH(d, a, b, c, M[12], 3873151461, 11);
    c = fnH(c, d, a, b, M[15], 530742520, 16);
    b = fnH(b, c, d, a, M[2], 3299628645, 23);
    a = fnI(a, b, c, d, M[0], 4096336452, 6);
    d = fnI(d, a, b, c, M[7], 1126891415, 10);
    c = fnI(c, d, a, b, M[14], 2878612391, 15);
    b = fnI(b, c, d, a, M[5], 4237533241, 21);
    a = fnI(a, b, c, d, M[12], 1700485571, 6);
    d = fnI(d, a, b, c, M[3], 2399980690, 10);
    c = fnI(c, d, a, b, M[10], 4293915773, 15);
    b = fnI(b, c, d, a, M[1], 2240044497, 21);
    a = fnI(a, b, c, d, M[8], 1873313359, 6);
    d = fnI(d, a, b, c, M[15], 4264355552, 10);
    c = fnI(c, d, a, b, M[6], 2734768916, 15);
    b = fnI(b, c, d, a, M[13], 1309151649, 21);
    a = fnI(a, b, c, d, M[4], 4149444226, 6);
    d = fnI(d, a, b, c, M[11], 3174756917, 10);
    c = fnI(c, d, a, b, M[2], 718787259, 15);
    b = fnI(b, c, d, a, M[9], 3951481745, 21);
    this._a = this._a + a | 0;
    this._b = this._b + b | 0;
    this._c = this._c + c | 0;
    this._d = this._d + d | 0;
  };
  MD5.prototype._digest = function() {
    this._block[this._blockOffset++] = 128;
    if (this._blockOffset > 56) {
      this._block.fill(0, this._blockOffset, 64);
      this._update();
      this._blockOffset = 0;
    }
    this._block.fill(0, this._blockOffset, 56);
    this._block.writeUInt32LE(this._length[0], 56);
    this._block.writeUInt32LE(this._length[1], 60);
    this._update();
    var buffer2 = Buffer2.allocUnsafe(16);
    buffer2.writeInt32LE(this._a, 0);
    buffer2.writeInt32LE(this._b, 4);
    buffer2.writeInt32LE(this._c, 8);
    buffer2.writeInt32LE(this._d, 12);
    return buffer2;
  };
  function rotl(x, n) {
    return x << n | x >>> 32 - n;
  }
  function fnF(a, b, c, d, m, k, s) {
    return rotl(a + (b & c | ~b & d) + m + k | 0, s) + b | 0;
  }
  function fnG(a, b, c, d, m, k, s) {
    return rotl(a + (b & d | c & ~d) + m + k | 0, s) + b | 0;
  }
  function fnH(a, b, c, d, m, k, s) {
    return rotl(a + (b ^ c ^ d) + m + k | 0, s) + b | 0;
  }
  function fnI(a, b, c, d, m, k, s) {
    return rotl(a + (c ^ (b | ~d)) + m + k | 0, s) + b | 0;
  }
  md5_js = MD5;
  return md5_js;
}
var evp_bytestokey;
var hasRequiredEvp_bytestokey;
function requireEvp_bytestokey() {
  if (hasRequiredEvp_bytestokey)
    return evp_bytestokey;
  hasRequiredEvp_bytestokey = 1;
  var Buffer2 = safeBufferExports.Buffer;
  var MD5 = requireMd5_js();
  function EVP_BytesToKey(password, salt, keyBits, ivLen) {
    if (!Buffer2.isBuffer(password))
      password = Buffer2.from(password, "binary");
    if (salt) {
      if (!Buffer2.isBuffer(salt))
        salt = Buffer2.from(salt, "binary");
      if (salt.length !== 8)
        throw new RangeError("salt should be Buffer with 8 byte length");
    }
    var keyLen = keyBits / 8;
    var key2 = Buffer2.alloc(keyLen);
    var iv = Buffer2.alloc(ivLen || 0);
    var tmp = Buffer2.alloc(0);
    while (keyLen > 0 || ivLen > 0) {
      var hash2 = new MD5();
      hash2.update(tmp);
      hash2.update(password);
      if (salt)
        hash2.update(salt);
      tmp = hash2.digest();
      var used = 0;
      if (keyLen > 0) {
        var keyStart = key2.length - keyLen;
        used = Math.min(keyLen, tmp.length);
        tmp.copy(key2, keyStart, 0, used);
        keyLen -= used;
      }
      if (used < tmp.length && ivLen > 0) {
        var ivStart = iv.length - ivLen;
        var length = Math.min(ivLen, tmp.length - used);
        tmp.copy(iv, ivStart, used, used + length);
        ivLen -= length;
      }
    }
    tmp.fill(0);
    return { key: key2, iv };
  }
  evp_bytestokey = EVP_BytesToKey;
  return evp_bytestokey;
}
var browserifyAes = {};
var hasRequiredBrowserifyAes;
function requireBrowserifyAes() {
  if (hasRequiredBrowserifyAes)
    return browserifyAes;
  hasRequiredBrowserifyAes = 1;
  var crypto = requireCryptoBrowserify();
  browserifyAes.createCipher = browserifyAes.Cipher = crypto.createCipher;
  browserifyAes.createCipheriv = browserifyAes.Cipheriv = crypto.createCipheriv;
  browserifyAes.createDecipher = browserifyAes.Decipher = crypto.createDecipher;
  browserifyAes.createDecipheriv = browserifyAes.Decipheriv = crypto.createDecipheriv;
  browserifyAes.listCiphers = browserifyAes.getCiphers = crypto.getCiphers;
  return browserifyAes;
}
var fixProc;
var hasRequiredFixProc;
function requireFixProc() {
  if (hasRequiredFixProc)
    return fixProc;
  hasRequiredFixProc = 1;
  var findProc = /Proc-Type: 4,ENCRYPTED[\n\r]+DEK-Info: AES-((?:128)|(?:192)|(?:256))-CBC,([0-9A-H]+)[\n\r]+([0-9A-z\n\r+/=]+)[\n\r]+/m;
  var startRegex = /^-----BEGIN ((?:.*? KEY)|CERTIFICATE)-----/m;
  var fullRegex = /^-----BEGIN ((?:.*? KEY)|CERTIFICATE)-----([0-9A-z\n\r+/=]+)-----END \1-----$/m;
  var evp = requireEvp_bytestokey();
  var ciphers = requireBrowserifyAes();
  var Buffer2 = safeBufferExports.Buffer;
  fixProc = function(okey, password) {
    var key2 = okey.toString();
    var match = key2.match(findProc);
    var decrypted;
    if (!match) {
      var match2 = key2.match(fullRegex);
      decrypted = Buffer2.from(match2[2].replace(/[\r\n]/g, ""), "base64");
    } else {
      var suite = "aes" + match[1];
      var iv = Buffer2.from(match[2], "hex");
      var cipherText = Buffer2.from(match[3].replace(/[\r\n]/g, ""), "base64");
      var cipherKey = evp(password, iv.slice(0, 8), parseInt(match[1], 10)).key;
      var out = [];
      var cipher = ciphers.createDecipheriv(suite, cipherKey, iv);
      out.push(cipher.update(cipherText));
      out.push(cipher.final());
      decrypted = Buffer2.concat(out);
    }
    var tag = key2.match(startRegex)[1];
    return {
      tag,
      data: decrypted
    };
  };
  return fixProc;
}
var parseAsn1;
var hasRequiredParseAsn1;
function requireParseAsn1() {
  if (hasRequiredParseAsn1)
    return parseAsn1;
  hasRequiredParseAsn1 = 1;
  var asn12 = requireAsn1();
  var aesid = require$$1;
  var fixProc2 = requireFixProc();
  var ciphers = requireBrowserifyAes();
  var compat = requirePbkdf2();
  var Buffer2 = safeBufferExports.Buffer;
  parseAsn1 = parseKeys;
  function parseKeys(buffer2) {
    var password;
    if (typeof buffer2 === "object" && !Buffer2.isBuffer(buffer2)) {
      password = buffer2.passphrase;
      buffer2 = buffer2.key;
    }
    if (typeof buffer2 === "string") {
      buffer2 = Buffer2.from(buffer2);
    }
    var stripped = fixProc2(buffer2, password);
    var type = stripped.tag;
    var data = stripped.data;
    var subtype, ndata;
    switch (type) {
      case "CERTIFICATE":
        ndata = asn12.certificate.decode(data, "der").tbsCertificate.subjectPublicKeyInfo;
      case "PUBLIC KEY":
        if (!ndata) {
          ndata = asn12.PublicKey.decode(data, "der");
        }
        subtype = ndata.algorithm.algorithm.join(".");
        switch (subtype) {
          case "1.2.840.113549.1.1.1":
            return asn12.RSAPublicKey.decode(ndata.subjectPublicKey.data, "der");
          case "1.2.840.10045.2.1":
            ndata.subjectPrivateKey = ndata.subjectPublicKey;
            return {
              type: "ec",
              data: ndata
            };
          case "1.2.840.10040.4.1":
            ndata.algorithm.params.pub_key = asn12.DSAparam.decode(ndata.subjectPublicKey.data, "der");
            return {
              type: "dsa",
              data: ndata.algorithm.params
            };
          default:
            throw new Error("unknown key id " + subtype);
        }
      case "ENCRYPTED PRIVATE KEY":
        data = asn12.EncryptedPrivateKey.decode(data, "der");
        data = decrypt(data, password);
      case "PRIVATE KEY":
        ndata = asn12.PrivateKey.decode(data, "der");
        subtype = ndata.algorithm.algorithm.join(".");
        switch (subtype) {
          case "1.2.840.113549.1.1.1":
            return asn12.RSAPrivateKey.decode(ndata.subjectPrivateKey, "der");
          case "1.2.840.10045.2.1":
            return {
              curve: ndata.algorithm.curve,
              privateKey: asn12.ECPrivateKey.decode(ndata.subjectPrivateKey, "der").privateKey
            };
          case "1.2.840.10040.4.1":
            ndata.algorithm.params.priv_key = asn12.DSAparam.decode(ndata.subjectPrivateKey, "der");
            return {
              type: "dsa",
              params: ndata.algorithm.params
            };
          default:
            throw new Error("unknown key id " + subtype);
        }
      case "RSA PUBLIC KEY":
        return asn12.RSAPublicKey.decode(data, "der");
      case "RSA PRIVATE KEY":
        return asn12.RSAPrivateKey.decode(data, "der");
      case "DSA PRIVATE KEY":
        return {
          type: "dsa",
          params: asn12.DSAPrivateKey.decode(data, "der")
        };
      case "EC PRIVATE KEY":
        data = asn12.ECPrivateKey.decode(data, "der");
        return {
          curve: data.parameters.value,
          privateKey: data.privateKey
        };
      default:
        throw new Error("unknown key type " + type);
    }
  }
  parseKeys.signature = asn12.signature;
  function decrypt(data, password) {
    var salt = data.algorithm.decrypt.kde.kdeparams.salt;
    var iters = parseInt(data.algorithm.decrypt.kde.kdeparams.iters.toString(), 10);
    var algo = aesid[data.algorithm.decrypt.cipher.algo.join(".")];
    var iv = data.algorithm.decrypt.cipher.iv;
    var cipherText = data.subjectPrivateKey;
    var keylen = parseInt(algo.split("-")[1], 10) / 8;
    var key2 = compat.pbkdf2Sync(password, salt, iters, keylen, "sha1");
    var cipher = ciphers.createDecipheriv(algo, key2, iv);
    var out = [];
    out.push(cipher.update(cipherText));
    out.push(cipher.final());
    return Buffer2.concat(out);
  }
  return parseAsn1;
}
var mgf;
var hasRequiredMgf;
function requireMgf() {
  if (hasRequiredMgf)
    return mgf;
  hasRequiredMgf = 1;
  var createHash2 = requireCreateHash();
  var Buffer2 = safeBufferExports.Buffer;
  mgf = function(seed, len) {
    var t = Buffer2.alloc(0);
    var i = 0;
    var c;
    while (t.length < len) {
      c = i2ops(i++);
      t = Buffer2.concat([t, createHash2("sha1").update(seed).update(c).digest()]);
    }
    return t.slice(0, len);
  };
  function i2ops(c) {
    var out = Buffer2.allocUnsafe(4);
    out.writeUInt32BE(c, 0);
    return out;
  }
  return mgf;
}
var xor;
var hasRequiredXor;
function requireXor() {
  if (hasRequiredXor)
    return xor;
  hasRequiredXor = 1;
  xor = function xor2(a, b) {
    var len = a.length;
    var i = -1;
    while (++i < len) {
      a[i] ^= b[i];
    }
    return a;
  };
  return xor;
}
var withPublic_1;
var hasRequiredWithPublic;
function requireWithPublic() {
  if (hasRequiredWithPublic)
    return withPublic_1;
  hasRequiredWithPublic = 1;
  var BN = requireBn$1();
  var Buffer2 = safeBufferExports.Buffer;
  function withPublic(paddedMsg, key2) {
    return Buffer2.from(paddedMsg.toRed(BN.mont(key2.modulus)).redPow(new BN(key2.publicExponent)).fromRed().toArray());
  }
  withPublic_1 = withPublic;
  return withPublic_1;
}
var bn = { exports: {} };
bn.exports;
var hasRequiredBn;
function requireBn() {
  if (hasRequiredBn)
    return bn.exports;
  hasRequiredBn = 1;
  (function(module) {
    (function(module2, exports) {
      function assert(val, msg) {
        if (!val)
          throw new Error(msg || "Assertion failed");
      }
      function inherits2(ctor, superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
      function BN(number, base2, endian) {
        if (BN.isBN(number)) {
          return number;
        }
        this.negative = 0;
        this.words = null;
        this.length = 0;
        this.red = null;
        if (number !== null) {
          if (base2 === "le" || base2 === "be") {
            endian = base2;
            base2 = 10;
          }
          this._init(number || 0, base2 || 10, endian || "be");
        }
      }
      if (typeof module2 === "object") {
        module2.exports = BN;
      } else {
        exports.BN = BN;
      }
      BN.BN = BN;
      BN.wordSize = 26;
      var Buffer2;
      try {
        if (typeof window !== "undefined" && typeof window.Buffer !== "undefined") {
          Buffer2 = window.Buffer;
        } else {
          Buffer2 = buffer$1.Buffer;
        }
      } catch (e) {
      }
      BN.isBN = function isBN(num) {
        if (num instanceof BN) {
          return true;
        }
        return num !== null && typeof num === "object" && num.constructor.wordSize === BN.wordSize && Array.isArray(num.words);
      };
      BN.max = function max(left, right) {
        if (left.cmp(right) > 0)
          return left;
        return right;
      };
      BN.min = function min(left, right) {
        if (left.cmp(right) < 0)
          return left;
        return right;
      };
      BN.prototype._init = function init(number, base2, endian) {
        if (typeof number === "number") {
          return this._initNumber(number, base2, endian);
        }
        if (typeof number === "object") {
          return this._initArray(number, base2, endian);
        }
        if (base2 === "hex") {
          base2 = 16;
        }
        assert(base2 === (base2 | 0) && base2 >= 2 && base2 <= 36);
        number = number.toString().replace(/\s+/g, "");
        var start = 0;
        if (number[0] === "-") {
          start++;
          this.negative = 1;
        }
        if (start < number.length) {
          if (base2 === 16) {
            this._parseHex(number, start, endian);
          } else {
            this._parseBase(number, base2, start);
            if (endian === "le") {
              this._initArray(this.toArray(), base2, endian);
            }
          }
        }
      };
      BN.prototype._initNumber = function _initNumber(number, base2, endian) {
        if (number < 0) {
          this.negative = 1;
          number = -number;
        }
        if (number < 67108864) {
          this.words = [number & 67108863];
          this.length = 1;
        } else if (number < 4503599627370496) {
          this.words = [
            number & 67108863,
            number / 67108864 & 67108863
          ];
          this.length = 2;
        } else {
          assert(number < 9007199254740992);
          this.words = [
            number & 67108863,
            number / 67108864 & 67108863,
            1
          ];
          this.length = 3;
        }
        if (endian !== "le")
          return;
        this._initArray(this.toArray(), base2, endian);
      };
      BN.prototype._initArray = function _initArray(number, base2, endian) {
        assert(typeof number.length === "number");
        if (number.length <= 0) {
          this.words = [0];
          this.length = 1;
          return this;
        }
        this.length = Math.ceil(number.length / 3);
        this.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
          this.words[i] = 0;
        }
        var j, w;
        var off = 0;
        if (endian === "be") {
          for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
            w = number[i] | number[i - 1] << 8 | number[i - 2] << 16;
            this.words[j] |= w << off & 67108863;
            this.words[j + 1] = w >>> 26 - off & 67108863;
            off += 24;
            if (off >= 26) {
              off -= 26;
              j++;
            }
          }
        } else if (endian === "le") {
          for (i = 0, j = 0; i < number.length; i += 3) {
            w = number[i] | number[i + 1] << 8 | number[i + 2] << 16;
            this.words[j] |= w << off & 67108863;
            this.words[j + 1] = w >>> 26 - off & 67108863;
            off += 24;
            if (off >= 26) {
              off -= 26;
              j++;
            }
          }
        }
        return this._strip();
      };
      function parseHex4Bits(string, index2) {
        var c = string.charCodeAt(index2);
        if (c >= 48 && c <= 57) {
          return c - 48;
        } else if (c >= 65 && c <= 70) {
          return c - 55;
        } else if (c >= 97 && c <= 102) {
          return c - 87;
        } else {
          assert(false, "Invalid character in " + string);
        }
      }
      function parseHexByte(string, lowerBound, index2) {
        var r = parseHex4Bits(string, index2);
        if (index2 - 1 >= lowerBound) {
          r |= parseHex4Bits(string, index2 - 1) << 4;
        }
        return r;
      }
      BN.prototype._parseHex = function _parseHex(number, start, endian) {
        this.length = Math.ceil((number.length - start) / 6);
        this.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
          this.words[i] = 0;
        }
        var off = 0;
        var j = 0;
        var w;
        if (endian === "be") {
          for (i = number.length - 1; i >= start; i -= 2) {
            w = parseHexByte(number, start, i) << off;
            this.words[j] |= w & 67108863;
            if (off >= 18) {
              off -= 18;
              j += 1;
              this.words[j] |= w >>> 26;
            } else {
              off += 8;
            }
          }
        } else {
          var parseLength = number.length - start;
          for (i = parseLength % 2 === 0 ? start + 1 : start; i < number.length; i += 2) {
            w = parseHexByte(number, start, i) << off;
            this.words[j] |= w & 67108863;
            if (off >= 18) {
              off -= 18;
              j += 1;
              this.words[j] |= w >>> 26;
            } else {
              off += 8;
            }
          }
        }
        this._strip();
      };
      function parseBase(str, start, end, mul) {
        var r = 0;
        var b = 0;
        var len = Math.min(str.length, end);
        for (var i = start; i < len; i++) {
          var c = str.charCodeAt(i) - 48;
          r *= mul;
          if (c >= 49) {
            b = c - 49 + 10;
          } else if (c >= 17) {
            b = c - 17 + 10;
          } else {
            b = c;
          }
          assert(c >= 0 && b < mul, "Invalid character");
          r += b;
        }
        return r;
      }
      BN.prototype._parseBase = function _parseBase(number, base2, start) {
        this.words = [0];
        this.length = 1;
        for (var limbLen = 0, limbPow = 1; limbPow <= 67108863; limbPow *= base2) {
          limbLen++;
        }
        limbLen--;
        limbPow = limbPow / base2 | 0;
        var total = number.length - start;
        var mod = total % limbLen;
        var end = Math.min(total, total - mod) + start;
        var word = 0;
        for (var i = start; i < end; i += limbLen) {
          word = parseBase(number, i, i + limbLen, base2);
          this.imuln(limbPow);
          if (this.words[0] + word < 67108864) {
            this.words[0] += word;
          } else {
            this._iaddn(word);
          }
        }
        if (mod !== 0) {
          var pow = 1;
          word = parseBase(number, i, number.length, base2);
          for (i = 0; i < mod; i++) {
            pow *= base2;
          }
          this.imuln(pow);
          if (this.words[0] + word < 67108864) {
            this.words[0] += word;
          } else {
            this._iaddn(word);
          }
        }
        this._strip();
      };
      BN.prototype.copy = function copy(dest) {
        dest.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
          dest.words[i] = this.words[i];
        }
        dest.length = this.length;
        dest.negative = this.negative;
        dest.red = this.red;
      };
      function move(dest, src) {
        dest.words = src.words;
        dest.length = src.length;
        dest.negative = src.negative;
        dest.red = src.red;
      }
      BN.prototype._move = function _move(dest) {
        move(dest, this);
      };
      BN.prototype.clone = function clone() {
        var r = new BN(null);
        this.copy(r);
        return r;
      };
      BN.prototype._expand = function _expand(size) {
        while (this.length < size) {
          this.words[this.length++] = 0;
        }
        return this;
      };
      BN.prototype._strip = function strip() {
        while (this.length > 1 && this.words[this.length - 1] === 0) {
          this.length--;
        }
        return this._normSign();
      };
      BN.prototype._normSign = function _normSign() {
        if (this.length === 1 && this.words[0] === 0) {
          this.negative = 0;
        }
        return this;
      };
      if (typeof Symbol !== "undefined" && typeof Symbol.for === "function") {
        try {
          BN.prototype[Symbol.for("nodejs.util.inspect.custom")] = inspect;
        } catch (e) {
          BN.prototype.inspect = inspect;
        }
      } else {
        BN.prototype.inspect = inspect;
      }
      function inspect() {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      }
      var zeros = [
        "",
        "0",
        "00",
        "000",
        "0000",
        "00000",
        "000000",
        "0000000",
        "00000000",
        "000000000",
        "0000000000",
        "00000000000",
        "000000000000",
        "0000000000000",
        "00000000000000",
        "000000000000000",
        "0000000000000000",
        "00000000000000000",
        "000000000000000000",
        "0000000000000000000",
        "00000000000000000000",
        "000000000000000000000",
        "0000000000000000000000",
        "00000000000000000000000",
        "000000000000000000000000",
        "0000000000000000000000000"
      ];
      var groupSizes = [
        0,
        0,
        25,
        16,
        12,
        11,
        10,
        9,
        8,
        8,
        7,
        7,
        7,
        7,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5
      ];
      var groupBases = [
        0,
        0,
        33554432,
        43046721,
        16777216,
        48828125,
        60466176,
        40353607,
        16777216,
        43046721,
        1e7,
        19487171,
        35831808,
        62748517,
        7529536,
        11390625,
        16777216,
        24137569,
        34012224,
        47045881,
        64e6,
        4084101,
        5153632,
        6436343,
        7962624,
        9765625,
        11881376,
        14348907,
        17210368,
        20511149,
        243e5,
        28629151,
        33554432,
        39135393,
        45435424,
        52521875,
        60466176
      ];
      BN.prototype.toString = function toString(base2, padding) {
        base2 = base2 || 10;
        padding = padding | 0 || 1;
        var out;
        if (base2 === 16 || base2 === "hex") {
          out = "";
          var off = 0;
          var carry = 0;
          for (var i = 0; i < this.length; i++) {
            var w = this.words[i];
            var word = ((w << off | carry) & 16777215).toString(16);
            carry = w >>> 24 - off & 16777215;
            off += 2;
            if (off >= 26) {
              off -= 26;
              i--;
            }
            if (carry !== 0 || i !== this.length - 1) {
              out = zeros[6 - word.length] + word + out;
            } else {
              out = word + out;
            }
          }
          if (carry !== 0) {
            out = carry.toString(16) + out;
          }
          while (out.length % padding !== 0) {
            out = "0" + out;
          }
          if (this.negative !== 0) {
            out = "-" + out;
          }
          return out;
        }
        if (base2 === (base2 | 0) && base2 >= 2 && base2 <= 36) {
          var groupSize = groupSizes[base2];
          var groupBase = groupBases[base2];
          out = "";
          var c = this.clone();
          c.negative = 0;
          while (!c.isZero()) {
            var r = c.modrn(groupBase).toString(base2);
            c = c.idivn(groupBase);
            if (!c.isZero()) {
              out = zeros[groupSize - r.length] + r + out;
            } else {
              out = r + out;
            }
          }
          if (this.isZero()) {
            out = "0" + out;
          }
          while (out.length % padding !== 0) {
            out = "0" + out;
          }
          if (this.negative !== 0) {
            out = "-" + out;
          }
          return out;
        }
        assert(false, "Base should be between 2 and 36");
      };
      BN.prototype.toNumber = function toNumber() {
        var ret = this.words[0];
        if (this.length === 2) {
          ret += this.words[1] * 67108864;
        } else if (this.length === 3 && this.words[2] === 1) {
          ret += 4503599627370496 + this.words[1] * 67108864;
        } else if (this.length > 2) {
          assert(false, "Number can only safely store up to 53 bits");
        }
        return this.negative !== 0 ? -ret : ret;
      };
      BN.prototype.toJSON = function toJSON() {
        return this.toString(16, 2);
      };
      if (Buffer2) {
        BN.prototype.toBuffer = function toBuffer2(endian, length) {
          return this.toArrayLike(Buffer2, endian, length);
        };
      }
      BN.prototype.toArray = function toArray(endian, length) {
        return this.toArrayLike(Array, endian, length);
      };
      var allocate = function allocate2(ArrayType, size) {
        if (ArrayType.allocUnsafe) {
          return ArrayType.allocUnsafe(size);
        }
        return new ArrayType(size);
      };
      BN.prototype.toArrayLike = function toArrayLike(ArrayType, endian, length) {
        this._strip();
        var byteLength = this.byteLength();
        var reqLength = length || Math.max(1, byteLength);
        assert(byteLength <= reqLength, "byte array longer than desired length");
        assert(reqLength > 0, "Requested array length <= 0");
        var res = allocate(ArrayType, reqLength);
        var postfix = endian === "le" ? "LE" : "BE";
        this["_toArrayLike" + postfix](res, byteLength);
        return res;
      };
      BN.prototype._toArrayLikeLE = function _toArrayLikeLE(res, byteLength) {
        var position = 0;
        var carry = 0;
        for (var i = 0, shift = 0; i < this.length; i++) {
          var word = this.words[i] << shift | carry;
          res[position++] = word & 255;
          if (position < res.length) {
            res[position++] = word >> 8 & 255;
          }
          if (position < res.length) {
            res[position++] = word >> 16 & 255;
          }
          if (shift === 6) {
            if (position < res.length) {
              res[position++] = word >> 24 & 255;
            }
            carry = 0;
            shift = 0;
          } else {
            carry = word >>> 24;
            shift += 2;
          }
        }
        if (position < res.length) {
          res[position++] = carry;
          while (position < res.length) {
            res[position++] = 0;
          }
        }
      };
      BN.prototype._toArrayLikeBE = function _toArrayLikeBE(res, byteLength) {
        var position = res.length - 1;
        var carry = 0;
        for (var i = 0, shift = 0; i < this.length; i++) {
          var word = this.words[i] << shift | carry;
          res[position--] = word & 255;
          if (position >= 0) {
            res[position--] = word >> 8 & 255;
          }
          if (position >= 0) {
            res[position--] = word >> 16 & 255;
          }
          if (shift === 6) {
            if (position >= 0) {
              res[position--] = word >> 24 & 255;
            }
            carry = 0;
            shift = 0;
          } else {
            carry = word >>> 24;
            shift += 2;
          }
        }
        if (position >= 0) {
          res[position--] = carry;
          while (position >= 0) {
            res[position--] = 0;
          }
        }
      };
      if (Math.clz32) {
        BN.prototype._countBits = function _countBits(w) {
          return 32 - Math.clz32(w);
        };
      } else {
        BN.prototype._countBits = function _countBits(w) {
          var t = w;
          var r = 0;
          if (t >= 4096) {
            r += 13;
            t >>>= 13;
          }
          if (t >= 64) {
            r += 7;
            t >>>= 7;
          }
          if (t >= 8) {
            r += 4;
            t >>>= 4;
          }
          if (t >= 2) {
            r += 2;
            t >>>= 2;
          }
          return r + t;
        };
      }
      BN.prototype._zeroBits = function _zeroBits(w) {
        if (w === 0)
          return 26;
        var t = w;
        var r = 0;
        if ((t & 8191) === 0) {
          r += 13;
          t >>>= 13;
        }
        if ((t & 127) === 0) {
          r += 7;
          t >>>= 7;
        }
        if ((t & 15) === 0) {
          r += 4;
          t >>>= 4;
        }
        if ((t & 3) === 0) {
          r += 2;
          t >>>= 2;
        }
        if ((t & 1) === 0) {
          r++;
        }
        return r;
      };
      BN.prototype.bitLength = function bitLength() {
        var w = this.words[this.length - 1];
        var hi = this._countBits(w);
        return (this.length - 1) * 26 + hi;
      };
      function toBitArray(num) {
        var w = new Array(num.bitLength());
        for (var bit = 0; bit < w.length; bit++) {
          var off = bit / 26 | 0;
          var wbit = bit % 26;
          w[bit] = num.words[off] >>> wbit & 1;
        }
        return w;
      }
      BN.prototype.zeroBits = function zeroBits() {
        if (this.isZero())
          return 0;
        var r = 0;
        for (var i = 0; i < this.length; i++) {
          var b = this._zeroBits(this.words[i]);
          r += b;
          if (b !== 26)
            break;
        }
        return r;
      };
      BN.prototype.byteLength = function byteLength() {
        return Math.ceil(this.bitLength() / 8);
      };
      BN.prototype.toTwos = function toTwos(width) {
        if (this.negative !== 0) {
          return this.abs().inotn(width).iaddn(1);
        }
        return this.clone();
      };
      BN.prototype.fromTwos = function fromTwos(width) {
        if (this.testn(width - 1)) {
          return this.notn(width).iaddn(1).ineg();
        }
        return this.clone();
      };
      BN.prototype.isNeg = function isNeg() {
        return this.negative !== 0;
      };
      BN.prototype.neg = function neg() {
        return this.clone().ineg();
      };
      BN.prototype.ineg = function ineg() {
        if (!this.isZero()) {
          this.negative ^= 1;
        }
        return this;
      };
      BN.prototype.iuor = function iuor(num) {
        while (this.length < num.length) {
          this.words[this.length++] = 0;
        }
        for (var i = 0; i < num.length; i++) {
          this.words[i] = this.words[i] | num.words[i];
        }
        return this._strip();
      };
      BN.prototype.ior = function ior(num) {
        assert((this.negative | num.negative) === 0);
        return this.iuor(num);
      };
      BN.prototype.or = function or(num) {
        if (this.length > num.length)
          return this.clone().ior(num);
        return num.clone().ior(this);
      };
      BN.prototype.uor = function uor(num) {
        if (this.length > num.length)
          return this.clone().iuor(num);
        return num.clone().iuor(this);
      };
      BN.prototype.iuand = function iuand(num) {
        var b;
        if (this.length > num.length) {
          b = num;
        } else {
          b = this;
        }
        for (var i = 0; i < b.length; i++) {
          this.words[i] = this.words[i] & num.words[i];
        }
        this.length = b.length;
        return this._strip();
      };
      BN.prototype.iand = function iand(num) {
        assert((this.negative | num.negative) === 0);
        return this.iuand(num);
      };
      BN.prototype.and = function and(num) {
        if (this.length > num.length)
          return this.clone().iand(num);
        return num.clone().iand(this);
      };
      BN.prototype.uand = function uand(num) {
        if (this.length > num.length)
          return this.clone().iuand(num);
        return num.clone().iuand(this);
      };
      BN.prototype.iuxor = function iuxor(num) {
        var a;
        var b;
        if (this.length > num.length) {
          a = this;
          b = num;
        } else {
          a = num;
          b = this;
        }
        for (var i = 0; i < b.length; i++) {
          this.words[i] = a.words[i] ^ b.words[i];
        }
        if (this !== a) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i];
          }
        }
        this.length = a.length;
        return this._strip();
      };
      BN.prototype.ixor = function ixor(num) {
        assert((this.negative | num.negative) === 0);
        return this.iuxor(num);
      };
      BN.prototype.xor = function xor2(num) {
        if (this.length > num.length)
          return this.clone().ixor(num);
        return num.clone().ixor(this);
      };
      BN.prototype.uxor = function uxor(num) {
        if (this.length > num.length)
          return this.clone().iuxor(num);
        return num.clone().iuxor(this);
      };
      BN.prototype.inotn = function inotn(width) {
        assert(typeof width === "number" && width >= 0);
        var bytesNeeded = Math.ceil(width / 26) | 0;
        var bitsLeft = width % 26;
        this._expand(bytesNeeded);
        if (bitsLeft > 0) {
          bytesNeeded--;
        }
        for (var i = 0; i < bytesNeeded; i++) {
          this.words[i] = ~this.words[i] & 67108863;
        }
        if (bitsLeft > 0) {
          this.words[i] = ~this.words[i] & 67108863 >> 26 - bitsLeft;
        }
        return this._strip();
      };
      BN.prototype.notn = function notn(width) {
        return this.clone().inotn(width);
      };
      BN.prototype.setn = function setn(bit, val) {
        assert(typeof bit === "number" && bit >= 0);
        var off = bit / 26 | 0;
        var wbit = bit % 26;
        this._expand(off + 1);
        if (val) {
          this.words[off] = this.words[off] | 1 << wbit;
        } else {
          this.words[off] = this.words[off] & ~(1 << wbit);
        }
        return this._strip();
      };
      BN.prototype.iadd = function iadd(num) {
        var r;
        if (this.negative !== 0 && num.negative === 0) {
          this.negative = 0;
          r = this.isub(num);
          this.negative ^= 1;
          return this._normSign();
        } else if (this.negative === 0 && num.negative !== 0) {
          num.negative = 0;
          r = this.isub(num);
          num.negative = 1;
          return r._normSign();
        }
        var a, b;
        if (this.length > num.length) {
          a = this;
          b = num;
        } else {
          a = num;
          b = this;
        }
        var carry = 0;
        for (var i = 0; i < b.length; i++) {
          r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
          this.words[i] = r & 67108863;
          carry = r >>> 26;
        }
        for (; carry !== 0 && i < a.length; i++) {
          r = (a.words[i] | 0) + carry;
          this.words[i] = r & 67108863;
          carry = r >>> 26;
        }
        this.length = a.length;
        if (carry !== 0) {
          this.words[this.length] = carry;
          this.length++;
        } else if (a !== this) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i];
          }
        }
        return this;
      };
      BN.prototype.add = function add(num) {
        var res;
        if (num.negative !== 0 && this.negative === 0) {
          num.negative = 0;
          res = this.sub(num);
          num.negative ^= 1;
          return res;
        } else if (num.negative === 0 && this.negative !== 0) {
          this.negative = 0;
          res = num.sub(this);
          this.negative = 1;
          return res;
        }
        if (this.length > num.length)
          return this.clone().iadd(num);
        return num.clone().iadd(this);
      };
      BN.prototype.isub = function isub(num) {
        if (num.negative !== 0) {
          num.negative = 0;
          var r = this.iadd(num);
          num.negative = 1;
          return r._normSign();
        } else if (this.negative !== 0) {
          this.negative = 0;
          this.iadd(num);
          this.negative = 1;
          return this._normSign();
        }
        var cmp = this.cmp(num);
        if (cmp === 0) {
          this.negative = 0;
          this.length = 1;
          this.words[0] = 0;
          return this;
        }
        var a, b;
        if (cmp > 0) {
          a = this;
          b = num;
        } else {
          a = num;
          b = this;
        }
        var carry = 0;
        for (var i = 0; i < b.length; i++) {
          r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
          carry = r >> 26;
          this.words[i] = r & 67108863;
        }
        for (; carry !== 0 && i < a.length; i++) {
          r = (a.words[i] | 0) + carry;
          carry = r >> 26;
          this.words[i] = r & 67108863;
        }
        if (carry === 0 && i < a.length && a !== this) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i];
          }
        }
        this.length = Math.max(this.length, i);
        if (a !== this) {
          this.negative = 1;
        }
        return this._strip();
      };
      BN.prototype.sub = function sub(num) {
        return this.clone().isub(num);
      };
      function smallMulTo(self2, num, out) {
        out.negative = num.negative ^ self2.negative;
        var len = self2.length + num.length | 0;
        out.length = len;
        len = len - 1 | 0;
        var a = self2.words[0] | 0;
        var b = num.words[0] | 0;
        var r = a * b;
        var lo = r & 67108863;
        var carry = r / 67108864 | 0;
        out.words[0] = lo;
        for (var k = 1; k < len; k++) {
          var ncarry = carry >>> 26;
          var rword = carry & 67108863;
          var maxJ = Math.min(k, num.length - 1);
          for (var j = Math.max(0, k - self2.length + 1); j <= maxJ; j++) {
            var i = k - j | 0;
            a = self2.words[i] | 0;
            b = num.words[j] | 0;
            r = a * b + rword;
            ncarry += r / 67108864 | 0;
            rword = r & 67108863;
          }
          out.words[k] = rword | 0;
          carry = ncarry | 0;
        }
        if (carry !== 0) {
          out.words[k] = carry | 0;
        } else {
          out.length--;
        }
        return out._strip();
      }
      var comb10MulTo = function comb10MulTo2(self2, num, out) {
        var a = self2.words;
        var b = num.words;
        var o = out.words;
        var c = 0;
        var lo;
        var mid;
        var hi;
        var a0 = a[0] | 0;
        var al0 = a0 & 8191;
        var ah0 = a0 >>> 13;
        var a1 = a[1] | 0;
        var al1 = a1 & 8191;
        var ah1 = a1 >>> 13;
        var a2 = a[2] | 0;
        var al2 = a2 & 8191;
        var ah2 = a2 >>> 13;
        var a3 = a[3] | 0;
        var al3 = a3 & 8191;
        var ah3 = a3 >>> 13;
        var a4 = a[4] | 0;
        var al4 = a4 & 8191;
        var ah4 = a4 >>> 13;
        var a5 = a[5] | 0;
        var al5 = a5 & 8191;
        var ah5 = a5 >>> 13;
        var a6 = a[6] | 0;
        var al6 = a6 & 8191;
        var ah6 = a6 >>> 13;
        var a7 = a[7] | 0;
        var al7 = a7 & 8191;
        var ah7 = a7 >>> 13;
        var a8 = a[8] | 0;
        var al8 = a8 & 8191;
        var ah8 = a8 >>> 13;
        var a9 = a[9] | 0;
        var al9 = a9 & 8191;
        var ah9 = a9 >>> 13;
        var b0 = b[0] | 0;
        var bl0 = b0 & 8191;
        var bh0 = b0 >>> 13;
        var b1 = b[1] | 0;
        var bl1 = b1 & 8191;
        var bh1 = b1 >>> 13;
        var b2 = b[2] | 0;
        var bl2 = b2 & 8191;
        var bh2 = b2 >>> 13;
        var b3 = b[3] | 0;
        var bl3 = b3 & 8191;
        var bh3 = b3 >>> 13;
        var b4 = b[4] | 0;
        var bl4 = b4 & 8191;
        var bh4 = b4 >>> 13;
        var b5 = b[5] | 0;
        var bl5 = b5 & 8191;
        var bh5 = b5 >>> 13;
        var b6 = b[6] | 0;
        var bl6 = b6 & 8191;
        var bh6 = b6 >>> 13;
        var b7 = b[7] | 0;
        var bl7 = b7 & 8191;
        var bh7 = b7 >>> 13;
        var b8 = b[8] | 0;
        var bl8 = b8 & 8191;
        var bh8 = b8 >>> 13;
        var b9 = b[9] | 0;
        var bl9 = b9 & 8191;
        var bh9 = b9 >>> 13;
        out.negative = self2.negative ^ num.negative;
        out.length = 19;
        lo = Math.imul(al0, bl0);
        mid = Math.imul(al0, bh0);
        mid = mid + Math.imul(ah0, bl0) | 0;
        hi = Math.imul(ah0, bh0);
        var w0 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w0 >>> 26) | 0;
        w0 &= 67108863;
        lo = Math.imul(al1, bl0);
        mid = Math.imul(al1, bh0);
        mid = mid + Math.imul(ah1, bl0) | 0;
        hi = Math.imul(ah1, bh0);
        lo = lo + Math.imul(al0, bl1) | 0;
        mid = mid + Math.imul(al0, bh1) | 0;
        mid = mid + Math.imul(ah0, bl1) | 0;
        hi = hi + Math.imul(ah0, bh1) | 0;
        var w1 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w1 >>> 26) | 0;
        w1 &= 67108863;
        lo = Math.imul(al2, bl0);
        mid = Math.imul(al2, bh0);
        mid = mid + Math.imul(ah2, bl0) | 0;
        hi = Math.imul(ah2, bh0);
        lo = lo + Math.imul(al1, bl1) | 0;
        mid = mid + Math.imul(al1, bh1) | 0;
        mid = mid + Math.imul(ah1, bl1) | 0;
        hi = hi + Math.imul(ah1, bh1) | 0;
        lo = lo + Math.imul(al0, bl2) | 0;
        mid = mid + Math.imul(al0, bh2) | 0;
        mid = mid + Math.imul(ah0, bl2) | 0;
        hi = hi + Math.imul(ah0, bh2) | 0;
        var w2 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w2 >>> 26) | 0;
        w2 &= 67108863;
        lo = Math.imul(al3, bl0);
        mid = Math.imul(al3, bh0);
        mid = mid + Math.imul(ah3, bl0) | 0;
        hi = Math.imul(ah3, bh0);
        lo = lo + Math.imul(al2, bl1) | 0;
        mid = mid + Math.imul(al2, bh1) | 0;
        mid = mid + Math.imul(ah2, bl1) | 0;
        hi = hi + Math.imul(ah2, bh1) | 0;
        lo = lo + Math.imul(al1, bl2) | 0;
        mid = mid + Math.imul(al1, bh2) | 0;
        mid = mid + Math.imul(ah1, bl2) | 0;
        hi = hi + Math.imul(ah1, bh2) | 0;
        lo = lo + Math.imul(al0, bl3) | 0;
        mid = mid + Math.imul(al0, bh3) | 0;
        mid = mid + Math.imul(ah0, bl3) | 0;
        hi = hi + Math.imul(ah0, bh3) | 0;
        var w3 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w3 >>> 26) | 0;
        w3 &= 67108863;
        lo = Math.imul(al4, bl0);
        mid = Math.imul(al4, bh0);
        mid = mid + Math.imul(ah4, bl0) | 0;
        hi = Math.imul(ah4, bh0);
        lo = lo + Math.imul(al3, bl1) | 0;
        mid = mid + Math.imul(al3, bh1) | 0;
        mid = mid + Math.imul(ah3, bl1) | 0;
        hi = hi + Math.imul(ah3, bh1) | 0;
        lo = lo + Math.imul(al2, bl2) | 0;
        mid = mid + Math.imul(al2, bh2) | 0;
        mid = mid + Math.imul(ah2, bl2) | 0;
        hi = hi + Math.imul(ah2, bh2) | 0;
        lo = lo + Math.imul(al1, bl3) | 0;
        mid = mid + Math.imul(al1, bh3) | 0;
        mid = mid + Math.imul(ah1, bl3) | 0;
        hi = hi + Math.imul(ah1, bh3) | 0;
        lo = lo + Math.imul(al0, bl4) | 0;
        mid = mid + Math.imul(al0, bh4) | 0;
        mid = mid + Math.imul(ah0, bl4) | 0;
        hi = hi + Math.imul(ah0, bh4) | 0;
        var w4 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w4 >>> 26) | 0;
        w4 &= 67108863;
        lo = Math.imul(al5, bl0);
        mid = Math.imul(al5, bh0);
        mid = mid + Math.imul(ah5, bl0) | 0;
        hi = Math.imul(ah5, bh0);
        lo = lo + Math.imul(al4, bl1) | 0;
        mid = mid + Math.imul(al4, bh1) | 0;
        mid = mid + Math.imul(ah4, bl1) | 0;
        hi = hi + Math.imul(ah4, bh1) | 0;
        lo = lo + Math.imul(al3, bl2) | 0;
        mid = mid + Math.imul(al3, bh2) | 0;
        mid = mid + Math.imul(ah3, bl2) | 0;
        hi = hi + Math.imul(ah3, bh2) | 0;
        lo = lo + Math.imul(al2, bl3) | 0;
        mid = mid + Math.imul(al2, bh3) | 0;
        mid = mid + Math.imul(ah2, bl3) | 0;
        hi = hi + Math.imul(ah2, bh3) | 0;
        lo = lo + Math.imul(al1, bl4) | 0;
        mid = mid + Math.imul(al1, bh4) | 0;
        mid = mid + Math.imul(ah1, bl4) | 0;
        hi = hi + Math.imul(ah1, bh4) | 0;
        lo = lo + Math.imul(al0, bl5) | 0;
        mid = mid + Math.imul(al0, bh5) | 0;
        mid = mid + Math.imul(ah0, bl5) | 0;
        hi = hi + Math.imul(ah0, bh5) | 0;
        var w5 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w5 >>> 26) | 0;
        w5 &= 67108863;
        lo = Math.imul(al6, bl0);
        mid = Math.imul(al6, bh0);
        mid = mid + Math.imul(ah6, bl0) | 0;
        hi = Math.imul(ah6, bh0);
        lo = lo + Math.imul(al5, bl1) | 0;
        mid = mid + Math.imul(al5, bh1) | 0;
        mid = mid + Math.imul(ah5, bl1) | 0;
        hi = hi + Math.imul(ah5, bh1) | 0;
        lo = lo + Math.imul(al4, bl2) | 0;
        mid = mid + Math.imul(al4, bh2) | 0;
        mid = mid + Math.imul(ah4, bl2) | 0;
        hi = hi + Math.imul(ah4, bh2) | 0;
        lo = lo + Math.imul(al3, bl3) | 0;
        mid = mid + Math.imul(al3, bh3) | 0;
        mid = mid + Math.imul(ah3, bl3) | 0;
        hi = hi + Math.imul(ah3, bh3) | 0;
        lo = lo + Math.imul(al2, bl4) | 0;
        mid = mid + Math.imul(al2, bh4) | 0;
        mid = mid + Math.imul(ah2, bl4) | 0;
        hi = hi + Math.imul(ah2, bh4) | 0;
        lo = lo + Math.imul(al1, bl5) | 0;
        mid = mid + Math.imul(al1, bh5) | 0;
        mid = mid + Math.imul(ah1, bl5) | 0;
        hi = hi + Math.imul(ah1, bh5) | 0;
        lo = lo + Math.imul(al0, bl6) | 0;
        mid = mid + Math.imul(al0, bh6) | 0;
        mid = mid + Math.imul(ah0, bl6) | 0;
        hi = hi + Math.imul(ah0, bh6) | 0;
        var w6 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w6 >>> 26) | 0;
        w6 &= 67108863;
        lo = Math.imul(al7, bl0);
        mid = Math.imul(al7, bh0);
        mid = mid + Math.imul(ah7, bl0) | 0;
        hi = Math.imul(ah7, bh0);
        lo = lo + Math.imul(al6, bl1) | 0;
        mid = mid + Math.imul(al6, bh1) | 0;
        mid = mid + Math.imul(ah6, bl1) | 0;
        hi = hi + Math.imul(ah6, bh1) | 0;
        lo = lo + Math.imul(al5, bl2) | 0;
        mid = mid + Math.imul(al5, bh2) | 0;
        mid = mid + Math.imul(ah5, bl2) | 0;
        hi = hi + Math.imul(ah5, bh2) | 0;
        lo = lo + Math.imul(al4, bl3) | 0;
        mid = mid + Math.imul(al4, bh3) | 0;
        mid = mid + Math.imul(ah4, bl3) | 0;
        hi = hi + Math.imul(ah4, bh3) | 0;
        lo = lo + Math.imul(al3, bl4) | 0;
        mid = mid + Math.imul(al3, bh4) | 0;
        mid = mid + Math.imul(ah3, bl4) | 0;
        hi = hi + Math.imul(ah3, bh4) | 0;
        lo = lo + Math.imul(al2, bl5) | 0;
        mid = mid + Math.imul(al2, bh5) | 0;
        mid = mid + Math.imul(ah2, bl5) | 0;
        hi = hi + Math.imul(ah2, bh5) | 0;
        lo = lo + Math.imul(al1, bl6) | 0;
        mid = mid + Math.imul(al1, bh6) | 0;
        mid = mid + Math.imul(ah1, bl6) | 0;
        hi = hi + Math.imul(ah1, bh6) | 0;
        lo = lo + Math.imul(al0, bl7) | 0;
        mid = mid + Math.imul(al0, bh7) | 0;
        mid = mid + Math.imul(ah0, bl7) | 0;
        hi = hi + Math.imul(ah0, bh7) | 0;
        var w7 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w7 >>> 26) | 0;
        w7 &= 67108863;
        lo = Math.imul(al8, bl0);
        mid = Math.imul(al8, bh0);
        mid = mid + Math.imul(ah8, bl0) | 0;
        hi = Math.imul(ah8, bh0);
        lo = lo + Math.imul(al7, bl1) | 0;
        mid = mid + Math.imul(al7, bh1) | 0;
        mid = mid + Math.imul(ah7, bl1) | 0;
        hi = hi + Math.imul(ah7, bh1) | 0;
        lo = lo + Math.imul(al6, bl2) | 0;
        mid = mid + Math.imul(al6, bh2) | 0;
        mid = mid + Math.imul(ah6, bl2) | 0;
        hi = hi + Math.imul(ah6, bh2) | 0;
        lo = lo + Math.imul(al5, bl3) | 0;
        mid = mid + Math.imul(al5, bh3) | 0;
        mid = mid + Math.imul(ah5, bl3) | 0;
        hi = hi + Math.imul(ah5, bh3) | 0;
        lo = lo + Math.imul(al4, bl4) | 0;
        mid = mid + Math.imul(al4, bh4) | 0;
        mid = mid + Math.imul(ah4, bl4) | 0;
        hi = hi + Math.imul(ah4, bh4) | 0;
        lo = lo + Math.imul(al3, bl5) | 0;
        mid = mid + Math.imul(al3, bh5) | 0;
        mid = mid + Math.imul(ah3, bl5) | 0;
        hi = hi + Math.imul(ah3, bh5) | 0;
        lo = lo + Math.imul(al2, bl6) | 0;
        mid = mid + Math.imul(al2, bh6) | 0;
        mid = mid + Math.imul(ah2, bl6) | 0;
        hi = hi + Math.imul(ah2, bh6) | 0;
        lo = lo + Math.imul(al1, bl7) | 0;
        mid = mid + Math.imul(al1, bh7) | 0;
        mid = mid + Math.imul(ah1, bl7) | 0;
        hi = hi + Math.imul(ah1, bh7) | 0;
        lo = lo + Math.imul(al0, bl8) | 0;
        mid = mid + Math.imul(al0, bh8) | 0;
        mid = mid + Math.imul(ah0, bl8) | 0;
        hi = hi + Math.imul(ah0, bh8) | 0;
        var w8 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w8 >>> 26) | 0;
        w8 &= 67108863;
        lo = Math.imul(al9, bl0);
        mid = Math.imul(al9, bh0);
        mid = mid + Math.imul(ah9, bl0) | 0;
        hi = Math.imul(ah9, bh0);
        lo = lo + Math.imul(al8, bl1) | 0;
        mid = mid + Math.imul(al8, bh1) | 0;
        mid = mid + Math.imul(ah8, bl1) | 0;
        hi = hi + Math.imul(ah8, bh1) | 0;
        lo = lo + Math.imul(al7, bl2) | 0;
        mid = mid + Math.imul(al7, bh2) | 0;
        mid = mid + Math.imul(ah7, bl2) | 0;
        hi = hi + Math.imul(ah7, bh2) | 0;
        lo = lo + Math.imul(al6, bl3) | 0;
        mid = mid + Math.imul(al6, bh3) | 0;
        mid = mid + Math.imul(ah6, bl3) | 0;
        hi = hi + Math.imul(ah6, bh3) | 0;
        lo = lo + Math.imul(al5, bl4) | 0;
        mid = mid + Math.imul(al5, bh4) | 0;
        mid = mid + Math.imul(ah5, bl4) | 0;
        hi = hi + Math.imul(ah5, bh4) | 0;
        lo = lo + Math.imul(al4, bl5) | 0;
        mid = mid + Math.imul(al4, bh5) | 0;
        mid = mid + Math.imul(ah4, bl5) | 0;
        hi = hi + Math.imul(ah4, bh5) | 0;
        lo = lo + Math.imul(al3, bl6) | 0;
        mid = mid + Math.imul(al3, bh6) | 0;
        mid = mid + Math.imul(ah3, bl6) | 0;
        hi = hi + Math.imul(ah3, bh6) | 0;
        lo = lo + Math.imul(al2, bl7) | 0;
        mid = mid + Math.imul(al2, bh7) | 0;
        mid = mid + Math.imul(ah2, bl7) | 0;
        hi = hi + Math.imul(ah2, bh7) | 0;
        lo = lo + Math.imul(al1, bl8) | 0;
        mid = mid + Math.imul(al1, bh8) | 0;
        mid = mid + Math.imul(ah1, bl8) | 0;
        hi = hi + Math.imul(ah1, bh8) | 0;
        lo = lo + Math.imul(al0, bl9) | 0;
        mid = mid + Math.imul(al0, bh9) | 0;
        mid = mid + Math.imul(ah0, bl9) | 0;
        hi = hi + Math.imul(ah0, bh9) | 0;
        var w9 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w9 >>> 26) | 0;
        w9 &= 67108863;
        lo = Math.imul(al9, bl1);
        mid = Math.imul(al9, bh1);
        mid = mid + Math.imul(ah9, bl1) | 0;
        hi = Math.imul(ah9, bh1);
        lo = lo + Math.imul(al8, bl2) | 0;
        mid = mid + Math.imul(al8, bh2) | 0;
        mid = mid + Math.imul(ah8, bl2) | 0;
        hi = hi + Math.imul(ah8, bh2) | 0;
        lo = lo + Math.imul(al7, bl3) | 0;
        mid = mid + Math.imul(al7, bh3) | 0;
        mid = mid + Math.imul(ah7, bl3) | 0;
        hi = hi + Math.imul(ah7, bh3) | 0;
        lo = lo + Math.imul(al6, bl4) | 0;
        mid = mid + Math.imul(al6, bh4) | 0;
        mid = mid + Math.imul(ah6, bl4) | 0;
        hi = hi + Math.imul(ah6, bh4) | 0;
        lo = lo + Math.imul(al5, bl5) | 0;
        mid = mid + Math.imul(al5, bh5) | 0;
        mid = mid + Math.imul(ah5, bl5) | 0;
        hi = hi + Math.imul(ah5, bh5) | 0;
        lo = lo + Math.imul(al4, bl6) | 0;
        mid = mid + Math.imul(al4, bh6) | 0;
        mid = mid + Math.imul(ah4, bl6) | 0;
        hi = hi + Math.imul(ah4, bh6) | 0;
        lo = lo + Math.imul(al3, bl7) | 0;
        mid = mid + Math.imul(al3, bh7) | 0;
        mid = mid + Math.imul(ah3, bl7) | 0;
        hi = hi + Math.imul(ah3, bh7) | 0;
        lo = lo + Math.imul(al2, bl8) | 0;
        mid = mid + Math.imul(al2, bh8) | 0;
        mid = mid + Math.imul(ah2, bl8) | 0;
        hi = hi + Math.imul(ah2, bh8) | 0;
        lo = lo + Math.imul(al1, bl9) | 0;
        mid = mid + Math.imul(al1, bh9) | 0;
        mid = mid + Math.imul(ah1, bl9) | 0;
        hi = hi + Math.imul(ah1, bh9) | 0;
        var w10 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w10 >>> 26) | 0;
        w10 &= 67108863;
        lo = Math.imul(al9, bl2);
        mid = Math.imul(al9, bh2);
        mid = mid + Math.imul(ah9, bl2) | 0;
        hi = Math.imul(ah9, bh2);
        lo = lo + Math.imul(al8, bl3) | 0;
        mid = mid + Math.imul(al8, bh3) | 0;
        mid = mid + Math.imul(ah8, bl3) | 0;
        hi = hi + Math.imul(ah8, bh3) | 0;
        lo = lo + Math.imul(al7, bl4) | 0;
        mid = mid + Math.imul(al7, bh4) | 0;
        mid = mid + Math.imul(ah7, bl4) | 0;
        hi = hi + Math.imul(ah7, bh4) | 0;
        lo = lo + Math.imul(al6, bl5) | 0;
        mid = mid + Math.imul(al6, bh5) | 0;
        mid = mid + Math.imul(ah6, bl5) | 0;
        hi = hi + Math.imul(ah6, bh5) | 0;
        lo = lo + Math.imul(al5, bl6) | 0;
        mid = mid + Math.imul(al5, bh6) | 0;
        mid = mid + Math.imul(ah5, bl6) | 0;
        hi = hi + Math.imul(ah5, bh6) | 0;
        lo = lo + Math.imul(al4, bl7) | 0;
        mid = mid + Math.imul(al4, bh7) | 0;
        mid = mid + Math.imul(ah4, bl7) | 0;
        hi = hi + Math.imul(ah4, bh7) | 0;
        lo = lo + Math.imul(al3, bl8) | 0;
        mid = mid + Math.imul(al3, bh8) | 0;
        mid = mid + Math.imul(ah3, bl8) | 0;
        hi = hi + Math.imul(ah3, bh8) | 0;
        lo = lo + Math.imul(al2, bl9) | 0;
        mid = mid + Math.imul(al2, bh9) | 0;
        mid = mid + Math.imul(ah2, bl9) | 0;
        hi = hi + Math.imul(ah2, bh9) | 0;
        var w11 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w11 >>> 26) | 0;
        w11 &= 67108863;
        lo = Math.imul(al9, bl3);
        mid = Math.imul(al9, bh3);
        mid = mid + Math.imul(ah9, bl3) | 0;
        hi = Math.imul(ah9, bh3);
        lo = lo + Math.imul(al8, bl4) | 0;
        mid = mid + Math.imul(al8, bh4) | 0;
        mid = mid + Math.imul(ah8, bl4) | 0;
        hi = hi + Math.imul(ah8, bh4) | 0;
        lo = lo + Math.imul(al7, bl5) | 0;
        mid = mid + Math.imul(al7, bh5) | 0;
        mid = mid + Math.imul(ah7, bl5) | 0;
        hi = hi + Math.imul(ah7, bh5) | 0;
        lo = lo + Math.imul(al6, bl6) | 0;
        mid = mid + Math.imul(al6, bh6) | 0;
        mid = mid + Math.imul(ah6, bl6) | 0;
        hi = hi + Math.imul(ah6, bh6) | 0;
        lo = lo + Math.imul(al5, bl7) | 0;
        mid = mid + Math.imul(al5, bh7) | 0;
        mid = mid + Math.imul(ah5, bl7) | 0;
        hi = hi + Math.imul(ah5, bh7) | 0;
        lo = lo + Math.imul(al4, bl8) | 0;
        mid = mid + Math.imul(al4, bh8) | 0;
        mid = mid + Math.imul(ah4, bl8) | 0;
        hi = hi + Math.imul(ah4, bh8) | 0;
        lo = lo + Math.imul(al3, bl9) | 0;
        mid = mid + Math.imul(al3, bh9) | 0;
        mid = mid + Math.imul(ah3, bl9) | 0;
        hi = hi + Math.imul(ah3, bh9) | 0;
        var w12 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w12 >>> 26) | 0;
        w12 &= 67108863;
        lo = Math.imul(al9, bl4);
        mid = Math.imul(al9, bh4);
        mid = mid + Math.imul(ah9, bl4) | 0;
        hi = Math.imul(ah9, bh4);
        lo = lo + Math.imul(al8, bl5) | 0;
        mid = mid + Math.imul(al8, bh5) | 0;
        mid = mid + Math.imul(ah8, bl5) | 0;
        hi = hi + Math.imul(ah8, bh5) | 0;
        lo = lo + Math.imul(al7, bl6) | 0;
        mid = mid + Math.imul(al7, bh6) | 0;
        mid = mid + Math.imul(ah7, bl6) | 0;
        hi = hi + Math.imul(ah7, bh6) | 0;
        lo = lo + Math.imul(al6, bl7) | 0;
        mid = mid + Math.imul(al6, bh7) | 0;
        mid = mid + Math.imul(ah6, bl7) | 0;
        hi = hi + Math.imul(ah6, bh7) | 0;
        lo = lo + Math.imul(al5, bl8) | 0;
        mid = mid + Math.imul(al5, bh8) | 0;
        mid = mid + Math.imul(ah5, bl8) | 0;
        hi = hi + Math.imul(ah5, bh8) | 0;
        lo = lo + Math.imul(al4, bl9) | 0;
        mid = mid + Math.imul(al4, bh9) | 0;
        mid = mid + Math.imul(ah4, bl9) | 0;
        hi = hi + Math.imul(ah4, bh9) | 0;
        var w13 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w13 >>> 26) | 0;
        w13 &= 67108863;
        lo = Math.imul(al9, bl5);
        mid = Math.imul(al9, bh5);
        mid = mid + Math.imul(ah9, bl5) | 0;
        hi = Math.imul(ah9, bh5);
        lo = lo + Math.imul(al8, bl6) | 0;
        mid = mid + Math.imul(al8, bh6) | 0;
        mid = mid + Math.imul(ah8, bl6) | 0;
        hi = hi + Math.imul(ah8, bh6) | 0;
        lo = lo + Math.imul(al7, bl7) | 0;
        mid = mid + Math.imul(al7, bh7) | 0;
        mid = mid + Math.imul(ah7, bl7) | 0;
        hi = hi + Math.imul(ah7, bh7) | 0;
        lo = lo + Math.imul(al6, bl8) | 0;
        mid = mid + Math.imul(al6, bh8) | 0;
        mid = mid + Math.imul(ah6, bl8) | 0;
        hi = hi + Math.imul(ah6, bh8) | 0;
        lo = lo + Math.imul(al5, bl9) | 0;
        mid = mid + Math.imul(al5, bh9) | 0;
        mid = mid + Math.imul(ah5, bl9) | 0;
        hi = hi + Math.imul(ah5, bh9) | 0;
        var w14 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w14 >>> 26) | 0;
        w14 &= 67108863;
        lo = Math.imul(al9, bl6);
        mid = Math.imul(al9, bh6);
        mid = mid + Math.imul(ah9, bl6) | 0;
        hi = Math.imul(ah9, bh6);
        lo = lo + Math.imul(al8, bl7) | 0;
        mid = mid + Math.imul(al8, bh7) | 0;
        mid = mid + Math.imul(ah8, bl7) | 0;
        hi = hi + Math.imul(ah8, bh7) | 0;
        lo = lo + Math.imul(al7, bl8) | 0;
        mid = mid + Math.imul(al7, bh8) | 0;
        mid = mid + Math.imul(ah7, bl8) | 0;
        hi = hi + Math.imul(ah7, bh8) | 0;
        lo = lo + Math.imul(al6, bl9) | 0;
        mid = mid + Math.imul(al6, bh9) | 0;
        mid = mid + Math.imul(ah6, bl9) | 0;
        hi = hi + Math.imul(ah6, bh9) | 0;
        var w15 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w15 >>> 26) | 0;
        w15 &= 67108863;
        lo = Math.imul(al9, bl7);
        mid = Math.imul(al9, bh7);
        mid = mid + Math.imul(ah9, bl7) | 0;
        hi = Math.imul(ah9, bh7);
        lo = lo + Math.imul(al8, bl8) | 0;
        mid = mid + Math.imul(al8, bh8) | 0;
        mid = mid + Math.imul(ah8, bl8) | 0;
        hi = hi + Math.imul(ah8, bh8) | 0;
        lo = lo + Math.imul(al7, bl9) | 0;
        mid = mid + Math.imul(al7, bh9) | 0;
        mid = mid + Math.imul(ah7, bl9) | 0;
        hi = hi + Math.imul(ah7, bh9) | 0;
        var w16 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w16 >>> 26) | 0;
        w16 &= 67108863;
        lo = Math.imul(al9, bl8);
        mid = Math.imul(al9, bh8);
        mid = mid + Math.imul(ah9, bl8) | 0;
        hi = Math.imul(ah9, bh8);
        lo = lo + Math.imul(al8, bl9) | 0;
        mid = mid + Math.imul(al8, bh9) | 0;
        mid = mid + Math.imul(ah8, bl9) | 0;
        hi = hi + Math.imul(ah8, bh9) | 0;
        var w17 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w17 >>> 26) | 0;
        w17 &= 67108863;
        lo = Math.imul(al9, bl9);
        mid = Math.imul(al9, bh9);
        mid = mid + Math.imul(ah9, bl9) | 0;
        hi = Math.imul(ah9, bh9);
        var w18 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w18 >>> 26) | 0;
        w18 &= 67108863;
        o[0] = w0;
        o[1] = w1;
        o[2] = w2;
        o[3] = w3;
        o[4] = w4;
        o[5] = w5;
        o[6] = w6;
        o[7] = w7;
        o[8] = w8;
        o[9] = w9;
        o[10] = w10;
        o[11] = w11;
        o[12] = w12;
        o[13] = w13;
        o[14] = w14;
        o[15] = w15;
        o[16] = w16;
        o[17] = w17;
        o[18] = w18;
        if (c !== 0) {
          o[19] = c;
          out.length++;
        }
        return out;
      };
      if (!Math.imul) {
        comb10MulTo = smallMulTo;
      }
      function bigMulTo(self2, num, out) {
        out.negative = num.negative ^ self2.negative;
        out.length = self2.length + num.length;
        var carry = 0;
        var hncarry = 0;
        for (var k = 0; k < out.length - 1; k++) {
          var ncarry = hncarry;
          hncarry = 0;
          var rword = carry & 67108863;
          var maxJ = Math.min(k, num.length - 1);
          for (var j = Math.max(0, k - self2.length + 1); j <= maxJ; j++) {
            var i = k - j;
            var a = self2.words[i] | 0;
            var b = num.words[j] | 0;
            var r = a * b;
            var lo = r & 67108863;
            ncarry = ncarry + (r / 67108864 | 0) | 0;
            lo = lo + rword | 0;
            rword = lo & 67108863;
            ncarry = ncarry + (lo >>> 26) | 0;
            hncarry += ncarry >>> 26;
            ncarry &= 67108863;
          }
          out.words[k] = rword;
          carry = ncarry;
          ncarry = hncarry;
        }
        if (carry !== 0) {
          out.words[k] = carry;
        } else {
          out.length--;
        }
        return out._strip();
      }
      function jumboMulTo(self2, num, out) {
        return bigMulTo(self2, num, out);
      }
      BN.prototype.mulTo = function mulTo(num, out) {
        var res;
        var len = this.length + num.length;
        if (this.length === 10 && num.length === 10) {
          res = comb10MulTo(this, num, out);
        } else if (len < 63) {
          res = smallMulTo(this, num, out);
        } else if (len < 1024) {
          res = bigMulTo(this, num, out);
        } else {
          res = jumboMulTo(this, num, out);
        }
        return res;
      };
      BN.prototype.mul = function mul(num) {
        var out = new BN(null);
        out.words = new Array(this.length + num.length);
        return this.mulTo(num, out);
      };
      BN.prototype.mulf = function mulf(num) {
        var out = new BN(null);
        out.words = new Array(this.length + num.length);
        return jumboMulTo(this, num, out);
      };
      BN.prototype.imul = function imul(num) {
        return this.clone().mulTo(num, this);
      };
      BN.prototype.imuln = function imuln(num) {
        var isNegNum = num < 0;
        if (isNegNum)
          num = -num;
        assert(typeof num === "number");
        assert(num < 67108864);
        var carry = 0;
        for (var i = 0; i < this.length; i++) {
          var w = (this.words[i] | 0) * num;
          var lo = (w & 67108863) + (carry & 67108863);
          carry >>= 26;
          carry += w / 67108864 | 0;
          carry += lo >>> 26;
          this.words[i] = lo & 67108863;
        }
        if (carry !== 0) {
          this.words[i] = carry;
          this.length++;
        }
        return isNegNum ? this.ineg() : this;
      };
      BN.prototype.muln = function muln(num) {
        return this.clone().imuln(num);
      };
      BN.prototype.sqr = function sqr() {
        return this.mul(this);
      };
      BN.prototype.isqr = function isqr() {
        return this.imul(this.clone());
      };
      BN.prototype.pow = function pow(num) {
        var w = toBitArray(num);
        if (w.length === 0)
          return new BN(1);
        var res = this;
        for (var i = 0; i < w.length; i++, res = res.sqr()) {
          if (w[i] !== 0)
            break;
        }
        if (++i < w.length) {
          for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
            if (w[i] === 0)
              continue;
            res = res.mul(q);
          }
        }
        return res;
      };
      BN.prototype.iushln = function iushln(bits) {
        assert(typeof bits === "number" && bits >= 0);
        var r = bits % 26;
        var s = (bits - r) / 26;
        var carryMask = 67108863 >>> 26 - r << 26 - r;
        var i;
        if (r !== 0) {
          var carry = 0;
          for (i = 0; i < this.length; i++) {
            var newCarry = this.words[i] & carryMask;
            var c = (this.words[i] | 0) - newCarry << r;
            this.words[i] = c | carry;
            carry = newCarry >>> 26 - r;
          }
          if (carry) {
            this.words[i] = carry;
            this.length++;
          }
        }
        if (s !== 0) {
          for (i = this.length - 1; i >= 0; i--) {
            this.words[i + s] = this.words[i];
          }
          for (i = 0; i < s; i++) {
            this.words[i] = 0;
          }
          this.length += s;
        }
        return this._strip();
      };
      BN.prototype.ishln = function ishln(bits) {
        assert(this.negative === 0);
        return this.iushln(bits);
      };
      BN.prototype.iushrn = function iushrn(bits, hint, extended) {
        assert(typeof bits === "number" && bits >= 0);
        var h;
        if (hint) {
          h = (hint - hint % 26) / 26;
        } else {
          h = 0;
        }
        var r = bits % 26;
        var s = Math.min((bits - r) / 26, this.length);
        var mask = 67108863 ^ 67108863 >>> r << r;
        var maskedWords = extended;
        h -= s;
        h = Math.max(0, h);
        if (maskedWords) {
          for (var i = 0; i < s; i++) {
            maskedWords.words[i] = this.words[i];
          }
          maskedWords.length = s;
        }
        if (s === 0)
          ;
        else if (this.length > s) {
          this.length -= s;
          for (i = 0; i < this.length; i++) {
            this.words[i] = this.words[i + s];
          }
        } else {
          this.words[0] = 0;
          this.length = 1;
        }
        var carry = 0;
        for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
          var word = this.words[i] | 0;
          this.words[i] = carry << 26 - r | word >>> r;
          carry = word & mask;
        }
        if (maskedWords && carry !== 0) {
          maskedWords.words[maskedWords.length++] = carry;
        }
        if (this.length === 0) {
          this.words[0] = 0;
          this.length = 1;
        }
        return this._strip();
      };
      BN.prototype.ishrn = function ishrn(bits, hint, extended) {
        assert(this.negative === 0);
        return this.iushrn(bits, hint, extended);
      };
      BN.prototype.shln = function shln(bits) {
        return this.clone().ishln(bits);
      };
      BN.prototype.ushln = function ushln(bits) {
        return this.clone().iushln(bits);
      };
      BN.prototype.shrn = function shrn(bits) {
        return this.clone().ishrn(bits);
      };
      BN.prototype.ushrn = function ushrn(bits) {
        return this.clone().iushrn(bits);
      };
      BN.prototype.testn = function testn(bit) {
        assert(typeof bit === "number" && bit >= 0);
        var r = bit % 26;
        var s = (bit - r) / 26;
        var q = 1 << r;
        if (this.length <= s)
          return false;
        var w = this.words[s];
        return !!(w & q);
      };
      BN.prototype.imaskn = function imaskn(bits) {
        assert(typeof bits === "number" && bits >= 0);
        var r = bits % 26;
        var s = (bits - r) / 26;
        assert(this.negative === 0, "imaskn works only with positive numbers");
        if (this.length <= s) {
          return this;
        }
        if (r !== 0) {
          s++;
        }
        this.length = Math.min(s, this.length);
        if (r !== 0) {
          var mask = 67108863 ^ 67108863 >>> r << r;
          this.words[this.length - 1] &= mask;
        }
        return this._strip();
      };
      BN.prototype.maskn = function maskn(bits) {
        return this.clone().imaskn(bits);
      };
      BN.prototype.iaddn = function iaddn(num) {
        assert(typeof num === "number");
        assert(num < 67108864);
        if (num < 0)
          return this.isubn(-num);
        if (this.negative !== 0) {
          if (this.length === 1 && (this.words[0] | 0) <= num) {
            this.words[0] = num - (this.words[0] | 0);
            this.negative = 0;
            return this;
          }
          this.negative = 0;
          this.isubn(num);
          this.negative = 1;
          return this;
        }
        return this._iaddn(num);
      };
      BN.prototype._iaddn = function _iaddn(num) {
        this.words[0] += num;
        for (var i = 0; i < this.length && this.words[i] >= 67108864; i++) {
          this.words[i] -= 67108864;
          if (i === this.length - 1) {
            this.words[i + 1] = 1;
          } else {
            this.words[i + 1]++;
          }
        }
        this.length = Math.max(this.length, i + 1);
        return this;
      };
      BN.prototype.isubn = function isubn(num) {
        assert(typeof num === "number");
        assert(num < 67108864);
        if (num < 0)
          return this.iaddn(-num);
        if (this.negative !== 0) {
          this.negative = 0;
          this.iaddn(num);
          this.negative = 1;
          return this;
        }
        this.words[0] -= num;
        if (this.length === 1 && this.words[0] < 0) {
          this.words[0] = -this.words[0];
          this.negative = 1;
        } else {
          for (var i = 0; i < this.length && this.words[i] < 0; i++) {
            this.words[i] += 67108864;
            this.words[i + 1] -= 1;
          }
        }
        return this._strip();
      };
      BN.prototype.addn = function addn(num) {
        return this.clone().iaddn(num);
      };
      BN.prototype.subn = function subn(num) {
        return this.clone().isubn(num);
      };
      BN.prototype.iabs = function iabs() {
        this.negative = 0;
        return this;
      };
      BN.prototype.abs = function abs() {
        return this.clone().iabs();
      };
      BN.prototype._ishlnsubmul = function _ishlnsubmul(num, mul, shift) {
        var len = num.length + shift;
        var i;
        this._expand(len);
        var w;
        var carry = 0;
        for (i = 0; i < num.length; i++) {
          w = (this.words[i + shift] | 0) + carry;
          var right = (num.words[i] | 0) * mul;
          w -= right & 67108863;
          carry = (w >> 26) - (right / 67108864 | 0);
          this.words[i + shift] = w & 67108863;
        }
        for (; i < this.length - shift; i++) {
          w = (this.words[i + shift] | 0) + carry;
          carry = w >> 26;
          this.words[i + shift] = w & 67108863;
        }
        if (carry === 0)
          return this._strip();
        assert(carry === -1);
        carry = 0;
        for (i = 0; i < this.length; i++) {
          w = -(this.words[i] | 0) + carry;
          carry = w >> 26;
          this.words[i] = w & 67108863;
        }
        this.negative = 1;
        return this._strip();
      };
      BN.prototype._wordDiv = function _wordDiv(num, mode) {
        var shift = this.length - num.length;
        var a = this.clone();
        var b = num;
        var bhi = b.words[b.length - 1] | 0;
        var bhiBits = this._countBits(bhi);
        shift = 26 - bhiBits;
        if (shift !== 0) {
          b = b.ushln(shift);
          a.iushln(shift);
          bhi = b.words[b.length - 1] | 0;
        }
        var m = a.length - b.length;
        var q;
        if (mode !== "mod") {
          q = new BN(null);
          q.length = m + 1;
          q.words = new Array(q.length);
          for (var i = 0; i < q.length; i++) {
            q.words[i] = 0;
          }
        }
        var diff = a.clone()._ishlnsubmul(b, 1, m);
        if (diff.negative === 0) {
          a = diff;
          if (q) {
            q.words[m] = 1;
          }
        }
        for (var j = m - 1; j >= 0; j--) {
          var qj = (a.words[b.length + j] | 0) * 67108864 + (a.words[b.length + j - 1] | 0);
          qj = Math.min(qj / bhi | 0, 67108863);
          a._ishlnsubmul(b, qj, j);
          while (a.negative !== 0) {
            qj--;
            a.negative = 0;
            a._ishlnsubmul(b, 1, j);
            if (!a.isZero()) {
              a.negative ^= 1;
            }
          }
          if (q) {
            q.words[j] = qj;
          }
        }
        if (q) {
          q._strip();
        }
        a._strip();
        if (mode !== "div" && shift !== 0) {
          a.iushrn(shift);
        }
        return {
          div: q || null,
          mod: a
        };
      };
      BN.prototype.divmod = function divmod(num, mode, positive) {
        assert(!num.isZero());
        if (this.isZero()) {
          return {
            div: new BN(0),
            mod: new BN(0)
          };
        }
        var div, mod, res;
        if (this.negative !== 0 && num.negative === 0) {
          res = this.neg().divmod(num, mode);
          if (mode !== "mod") {
            div = res.div.neg();
          }
          if (mode !== "div") {
            mod = res.mod.neg();
            if (positive && mod.negative !== 0) {
              mod.iadd(num);
            }
          }
          return {
            div,
            mod
          };
        }
        if (this.negative === 0 && num.negative !== 0) {
          res = this.divmod(num.neg(), mode);
          if (mode !== "mod") {
            div = res.div.neg();
          }
          return {
            div,
            mod: res.mod
          };
        }
        if ((this.negative & num.negative) !== 0) {
          res = this.neg().divmod(num.neg(), mode);
          if (mode !== "div") {
            mod = res.mod.neg();
            if (positive && mod.negative !== 0) {
              mod.isub(num);
            }
          }
          return {
            div: res.div,
            mod
          };
        }
        if (num.length > this.length || this.cmp(num) < 0) {
          return {
            div: new BN(0),
            mod: this
          };
        }
        if (num.length === 1) {
          if (mode === "div") {
            return {
              div: this.divn(num.words[0]),
              mod: null
            };
          }
          if (mode === "mod") {
            return {
              div: null,
              mod: new BN(this.modrn(num.words[0]))
            };
          }
          return {
            div: this.divn(num.words[0]),
            mod: new BN(this.modrn(num.words[0]))
          };
        }
        return this._wordDiv(num, mode);
      };
      BN.prototype.div = function div(num) {
        return this.divmod(num, "div", false).div;
      };
      BN.prototype.mod = function mod(num) {
        return this.divmod(num, "mod", false).mod;
      };
      BN.prototype.umod = function umod(num) {
        return this.divmod(num, "mod", true).mod;
      };
      BN.prototype.divRound = function divRound(num) {
        var dm = this.divmod(num);
        if (dm.mod.isZero())
          return dm.div;
        var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;
        var half = num.ushrn(1);
        var r2 = num.andln(1);
        var cmp = mod.cmp(half);
        if (cmp < 0 || r2 === 1 && cmp === 0)
          return dm.div;
        return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
      };
      BN.prototype.modrn = function modrn(num) {
        var isNegNum = num < 0;
        if (isNegNum)
          num = -num;
        assert(num <= 67108863);
        var p = (1 << 26) % num;
        var acc = 0;
        for (var i = this.length - 1; i >= 0; i--) {
          acc = (p * acc + (this.words[i] | 0)) % num;
        }
        return isNegNum ? -acc : acc;
      };
      BN.prototype.modn = function modn(num) {
        return this.modrn(num);
      };
      BN.prototype.idivn = function idivn(num) {
        var isNegNum = num < 0;
        if (isNegNum)
          num = -num;
        assert(num <= 67108863);
        var carry = 0;
        for (var i = this.length - 1; i >= 0; i--) {
          var w = (this.words[i] | 0) + carry * 67108864;
          this.words[i] = w / num | 0;
          carry = w % num;
        }
        this._strip();
        return isNegNum ? this.ineg() : this;
      };
      BN.prototype.divn = function divn(num) {
        return this.clone().idivn(num);
      };
      BN.prototype.egcd = function egcd(p) {
        assert(p.negative === 0);
        assert(!p.isZero());
        var x = this;
        var y = p.clone();
        if (x.negative !== 0) {
          x = x.umod(p);
        } else {
          x = x.clone();
        }
        var A = new BN(1);
        var B = new BN(0);
        var C = new BN(0);
        var D = new BN(1);
        var g = 0;
        while (x.isEven() && y.isEven()) {
          x.iushrn(1);
          y.iushrn(1);
          ++g;
        }
        var yp = y.clone();
        var xp = x.clone();
        while (!x.isZero()) {
          for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1)
            ;
          if (i > 0) {
            x.iushrn(i);
            while (i-- > 0) {
              if (A.isOdd() || B.isOdd()) {
                A.iadd(yp);
                B.isub(xp);
              }
              A.iushrn(1);
              B.iushrn(1);
            }
          }
          for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1)
            ;
          if (j > 0) {
            y.iushrn(j);
            while (j-- > 0) {
              if (C.isOdd() || D.isOdd()) {
                C.iadd(yp);
                D.isub(xp);
              }
              C.iushrn(1);
              D.iushrn(1);
            }
          }
          if (x.cmp(y) >= 0) {
            x.isub(y);
            A.isub(C);
            B.isub(D);
          } else {
            y.isub(x);
            C.isub(A);
            D.isub(B);
          }
        }
        return {
          a: C,
          b: D,
          gcd: y.iushln(g)
        };
      };
      BN.prototype._invmp = function _invmp(p) {
        assert(p.negative === 0);
        assert(!p.isZero());
        var a = this;
        var b = p.clone();
        if (a.negative !== 0) {
          a = a.umod(p);
        } else {
          a = a.clone();
        }
        var x1 = new BN(1);
        var x2 = new BN(0);
        var delta = b.clone();
        while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
          for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1)
            ;
          if (i > 0) {
            a.iushrn(i);
            while (i-- > 0) {
              if (x1.isOdd()) {
                x1.iadd(delta);
              }
              x1.iushrn(1);
            }
          }
          for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1)
            ;
          if (j > 0) {
            b.iushrn(j);
            while (j-- > 0) {
              if (x2.isOdd()) {
                x2.iadd(delta);
              }
              x2.iushrn(1);
            }
          }
          if (a.cmp(b) >= 0) {
            a.isub(b);
            x1.isub(x2);
          } else {
            b.isub(a);
            x2.isub(x1);
          }
        }
        var res;
        if (a.cmpn(1) === 0) {
          res = x1;
        } else {
          res = x2;
        }
        if (res.cmpn(0) < 0) {
          res.iadd(p);
        }
        return res;
      };
      BN.prototype.gcd = function gcd(num) {
        if (this.isZero())
          return num.abs();
        if (num.isZero())
          return this.abs();
        var a = this.clone();
        var b = num.clone();
        a.negative = 0;
        b.negative = 0;
        for (var shift = 0; a.isEven() && b.isEven(); shift++) {
          a.iushrn(1);
          b.iushrn(1);
        }
        do {
          while (a.isEven()) {
            a.iushrn(1);
          }
          while (b.isEven()) {
            b.iushrn(1);
          }
          var r = a.cmp(b);
          if (r < 0) {
            var t = a;
            a = b;
            b = t;
          } else if (r === 0 || b.cmpn(1) === 0) {
            break;
          }
          a.isub(b);
        } while (true);
        return b.iushln(shift);
      };
      BN.prototype.invm = function invm(num) {
        return this.egcd(num).a.umod(num);
      };
      BN.prototype.isEven = function isEven() {
        return (this.words[0] & 1) === 0;
      };
      BN.prototype.isOdd = function isOdd() {
        return (this.words[0] & 1) === 1;
      };
      BN.prototype.andln = function andln(num) {
        return this.words[0] & num;
      };
      BN.prototype.bincn = function bincn(bit) {
        assert(typeof bit === "number");
        var r = bit % 26;
        var s = (bit - r) / 26;
        var q = 1 << r;
        if (this.length <= s) {
          this._expand(s + 1);
          this.words[s] |= q;
          return this;
        }
        var carry = q;
        for (var i = s; carry !== 0 && i < this.length; i++) {
          var w = this.words[i] | 0;
          w += carry;
          carry = w >>> 26;
          w &= 67108863;
          this.words[i] = w;
        }
        if (carry !== 0) {
          this.words[i] = carry;
          this.length++;
        }
        return this;
      };
      BN.prototype.isZero = function isZero() {
        return this.length === 1 && this.words[0] === 0;
      };
      BN.prototype.cmpn = function cmpn(num) {
        var negative = num < 0;
        if (this.negative !== 0 && !negative)
          return -1;
        if (this.negative === 0 && negative)
          return 1;
        this._strip();
        var res;
        if (this.length > 1) {
          res = 1;
        } else {
          if (negative) {
            num = -num;
          }
          assert(num <= 67108863, "Number is too big");
          var w = this.words[0] | 0;
          res = w === num ? 0 : w < num ? -1 : 1;
        }
        if (this.negative !== 0)
          return -res | 0;
        return res;
      };
      BN.prototype.cmp = function cmp(num) {
        if (this.negative !== 0 && num.negative === 0)
          return -1;
        if (this.negative === 0 && num.negative !== 0)
          return 1;
        var res = this.ucmp(num);
        if (this.negative !== 0)
          return -res | 0;
        return res;
      };
      BN.prototype.ucmp = function ucmp(num) {
        if (this.length > num.length)
          return 1;
        if (this.length < num.length)
          return -1;
        var res = 0;
        for (var i = this.length - 1; i >= 0; i--) {
          var a = this.words[i] | 0;
          var b = num.words[i] | 0;
          if (a === b)
            continue;
          if (a < b) {
            res = -1;
          } else if (a > b) {
            res = 1;
          }
          break;
        }
        return res;
      };
      BN.prototype.gtn = function gtn(num) {
        return this.cmpn(num) === 1;
      };
      BN.prototype.gt = function gt(num) {
        return this.cmp(num) === 1;
      };
      BN.prototype.gten = function gten(num) {
        return this.cmpn(num) >= 0;
      };
      BN.prototype.gte = function gte(num) {
        return this.cmp(num) >= 0;
      };
      BN.prototype.ltn = function ltn(num) {
        return this.cmpn(num) === -1;
      };
      BN.prototype.lt = function lt(num) {
        return this.cmp(num) === -1;
      };
      BN.prototype.lten = function lten(num) {
        return this.cmpn(num) <= 0;
      };
      BN.prototype.lte = function lte(num) {
        return this.cmp(num) <= 0;
      };
      BN.prototype.eqn = function eqn(num) {
        return this.cmpn(num) === 0;
      };
      BN.prototype.eq = function eq(num) {
        return this.cmp(num) === 0;
      };
      BN.red = function red(num) {
        return new Red(num);
      };
      BN.prototype.toRed = function toRed(ctx) {
        assert(!this.red, "Already a number in reduction context");
        assert(this.negative === 0, "red works only with positives");
        return ctx.convertTo(this)._forceRed(ctx);
      };
      BN.prototype.fromRed = function fromRed() {
        assert(this.red, "fromRed works only with numbers in reduction context");
        return this.red.convertFrom(this);
      };
      BN.prototype._forceRed = function _forceRed(ctx) {
        this.red = ctx;
        return this;
      };
      BN.prototype.forceRed = function forceRed(ctx) {
        assert(!this.red, "Already a number in reduction context");
        return this._forceRed(ctx);
      };
      BN.prototype.redAdd = function redAdd(num) {
        assert(this.red, "redAdd works only with red numbers");
        return this.red.add(this, num);
      };
      BN.prototype.redIAdd = function redIAdd(num) {
        assert(this.red, "redIAdd works only with red numbers");
        return this.red.iadd(this, num);
      };
      BN.prototype.redSub = function redSub(num) {
        assert(this.red, "redSub works only with red numbers");
        return this.red.sub(this, num);
      };
      BN.prototype.redISub = function redISub(num) {
        assert(this.red, "redISub works only with red numbers");
        return this.red.isub(this, num);
      };
      BN.prototype.redShl = function redShl(num) {
        assert(this.red, "redShl works only with red numbers");
        return this.red.shl(this, num);
      };
      BN.prototype.redMul = function redMul(num) {
        assert(this.red, "redMul works only with red numbers");
        this.red._verify2(this, num);
        return this.red.mul(this, num);
      };
      BN.prototype.redIMul = function redIMul(num) {
        assert(this.red, "redMul works only with red numbers");
        this.red._verify2(this, num);
        return this.red.imul(this, num);
      };
      BN.prototype.redSqr = function redSqr() {
        assert(this.red, "redSqr works only with red numbers");
        this.red._verify1(this);
        return this.red.sqr(this);
      };
      BN.prototype.redISqr = function redISqr() {
        assert(this.red, "redISqr works only with red numbers");
        this.red._verify1(this);
        return this.red.isqr(this);
      };
      BN.prototype.redSqrt = function redSqrt() {
        assert(this.red, "redSqrt works only with red numbers");
        this.red._verify1(this);
        return this.red.sqrt(this);
      };
      BN.prototype.redInvm = function redInvm() {
        assert(this.red, "redInvm works only with red numbers");
        this.red._verify1(this);
        return this.red.invm(this);
      };
      BN.prototype.redNeg = function redNeg() {
        assert(this.red, "redNeg works only with red numbers");
        this.red._verify1(this);
        return this.red.neg(this);
      };
      BN.prototype.redPow = function redPow(num) {
        assert(this.red && !num.red, "redPow(normalNum)");
        this.red._verify1(this);
        return this.red.pow(this, num);
      };
      var primes = {
        k256: null,
        p224: null,
        p192: null,
        p25519: null
      };
      function MPrime(name2, p) {
        this.name = name2;
        this.p = new BN(p, 16);
        this.n = this.p.bitLength();
        this.k = new BN(1).iushln(this.n).isub(this.p);
        this.tmp = this._tmp();
      }
      MPrime.prototype._tmp = function _tmp() {
        var tmp = new BN(null);
        tmp.words = new Array(Math.ceil(this.n / 13));
        return tmp;
      };
      MPrime.prototype.ireduce = function ireduce(num) {
        var r = num;
        var rlen;
        do {
          this.split(r, this.tmp);
          r = this.imulK(r);
          r = r.iadd(this.tmp);
          rlen = r.bitLength();
        } while (rlen > this.n);
        var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
        if (cmp === 0) {
          r.words[0] = 0;
          r.length = 1;
        } else if (cmp > 0) {
          r.isub(this.p);
        } else {
          if (r.strip !== void 0) {
            r.strip();
          } else {
            r._strip();
          }
        }
        return r;
      };
      MPrime.prototype.split = function split(input, out) {
        input.iushrn(this.n, 0, out);
      };
      MPrime.prototype.imulK = function imulK(num) {
        return num.imul(this.k);
      };
      function K256() {
        MPrime.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        );
      }
      inherits2(K256, MPrime);
      K256.prototype.split = function split(input, output) {
        var mask = 4194303;
        var outLen = Math.min(input.length, 9);
        for (var i = 0; i < outLen; i++) {
          output.words[i] = input.words[i];
        }
        output.length = outLen;
        if (input.length <= 9) {
          input.words[0] = 0;
          input.length = 1;
          return;
        }
        var prev = input.words[9];
        output.words[output.length++] = prev & mask;
        for (i = 10; i < input.length; i++) {
          var next = input.words[i] | 0;
          input.words[i - 10] = (next & mask) << 4 | prev >>> 22;
          prev = next;
        }
        prev >>>= 22;
        input.words[i - 10] = prev;
        if (prev === 0 && input.length > 10) {
          input.length -= 10;
        } else {
          input.length -= 9;
        }
      };
      K256.prototype.imulK = function imulK(num) {
        num.words[num.length] = 0;
        num.words[num.length + 1] = 0;
        num.length += 2;
        var lo = 0;
        for (var i = 0; i < num.length; i++) {
          var w = num.words[i] | 0;
          lo += w * 977;
          num.words[i] = lo & 67108863;
          lo = w * 64 + (lo / 67108864 | 0);
        }
        if (num.words[num.length - 1] === 0) {
          num.length--;
          if (num.words[num.length - 1] === 0) {
            num.length--;
          }
        }
        return num;
      };
      function P224() {
        MPrime.call(
          this,
          "p224",
          "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
        );
      }
      inherits2(P224, MPrime);
      function P192() {
        MPrime.call(
          this,
          "p192",
          "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
        );
      }
      inherits2(P192, MPrime);
      function P25519() {
        MPrime.call(
          this,
          "25519",
          "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
        );
      }
      inherits2(P25519, MPrime);
      P25519.prototype.imulK = function imulK(num) {
        var carry = 0;
        for (var i = 0; i < num.length; i++) {
          var hi = (num.words[i] | 0) * 19 + carry;
          var lo = hi & 67108863;
          hi >>>= 26;
          num.words[i] = lo;
          carry = hi;
        }
        if (carry !== 0) {
          num.words[num.length++] = carry;
        }
        return num;
      };
      BN._prime = function prime(name2) {
        if (primes[name2])
          return primes[name2];
        var prime2;
        if (name2 === "k256") {
          prime2 = new K256();
        } else if (name2 === "p224") {
          prime2 = new P224();
        } else if (name2 === "p192") {
          prime2 = new P192();
        } else if (name2 === "p25519") {
          prime2 = new P25519();
        } else {
          throw new Error("Unknown prime " + name2);
        }
        primes[name2] = prime2;
        return prime2;
      };
      function Red(m) {
        if (typeof m === "string") {
          var prime = BN._prime(m);
          this.m = prime.p;
          this.prime = prime;
        } else {
          assert(m.gtn(1), "modulus must be greater than 1");
          this.m = m;
          this.prime = null;
        }
      }
      Red.prototype._verify1 = function _verify1(a) {
        assert(a.negative === 0, "red works only with positives");
        assert(a.red, "red works only with red numbers");
      };
      Red.prototype._verify2 = function _verify2(a, b) {
        assert((a.negative | b.negative) === 0, "red works only with positives");
        assert(
          a.red && a.red === b.red,
          "red works only with red numbers"
        );
      };
      Red.prototype.imod = function imod(a) {
        if (this.prime)
          return this.prime.ireduce(a)._forceRed(this);
        move(a, a.umod(this.m)._forceRed(this));
        return a;
      };
      Red.prototype.neg = function neg(a) {
        if (a.isZero()) {
          return a.clone();
        }
        return this.m.sub(a)._forceRed(this);
      };
      Red.prototype.add = function add(a, b) {
        this._verify2(a, b);
        var res = a.add(b);
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m);
        }
        return res._forceRed(this);
      };
      Red.prototype.iadd = function iadd(a, b) {
        this._verify2(a, b);
        var res = a.iadd(b);
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m);
        }
        return res;
      };
      Red.prototype.sub = function sub(a, b) {
        this._verify2(a, b);
        var res = a.sub(b);
        if (res.cmpn(0) < 0) {
          res.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Red.prototype.isub = function isub(a, b) {
        this._verify2(a, b);
        var res = a.isub(b);
        if (res.cmpn(0) < 0) {
          res.iadd(this.m);
        }
        return res;
      };
      Red.prototype.shl = function shl(a, num) {
        this._verify1(a);
        return this.imod(a.ushln(num));
      };
      Red.prototype.imul = function imul(a, b) {
        this._verify2(a, b);
        return this.imod(a.imul(b));
      };
      Red.prototype.mul = function mul(a, b) {
        this._verify2(a, b);
        return this.imod(a.mul(b));
      };
      Red.prototype.isqr = function isqr(a) {
        return this.imul(a, a.clone());
      };
      Red.prototype.sqr = function sqr(a) {
        return this.mul(a, a);
      };
      Red.prototype.sqrt = function sqrt(a) {
        if (a.isZero())
          return a.clone();
        var mod3 = this.m.andln(3);
        assert(mod3 % 2 === 1);
        if (mod3 === 3) {
          var pow = this.m.add(new BN(1)).iushrn(2);
          return this.pow(a, pow);
        }
        var q = this.m.subn(1);
        var s = 0;
        while (!q.isZero() && q.andln(1) === 0) {
          s++;
          q.iushrn(1);
        }
        assert(!q.isZero());
        var one = new BN(1).toRed(this);
        var nOne = one.redNeg();
        var lpow = this.m.subn(1).iushrn(1);
        var z = this.m.bitLength();
        z = new BN(2 * z * z).toRed(this);
        while (this.pow(z, lpow).cmp(nOne) !== 0) {
          z.redIAdd(nOne);
        }
        var c = this.pow(z, q);
        var r = this.pow(a, q.addn(1).iushrn(1));
        var t = this.pow(a, q);
        var m = s;
        while (t.cmp(one) !== 0) {
          var tmp = t;
          for (var i = 0; tmp.cmp(one) !== 0; i++) {
            tmp = tmp.redSqr();
          }
          assert(i < m);
          var b = this.pow(c, new BN(1).iushln(m - i - 1));
          r = r.redMul(b);
          c = b.redSqr();
          t = t.redMul(c);
          m = i;
        }
        return r;
      };
      Red.prototype.invm = function invm(a) {
        var inv = a._invmp(this.m);
        if (inv.negative !== 0) {
          inv.negative = 0;
          return this.imod(inv).redNeg();
        } else {
          return this.imod(inv);
        }
      };
      Red.prototype.pow = function pow(a, num) {
        if (num.isZero())
          return new BN(1).toRed(this);
        if (num.cmpn(1) === 0)
          return a.clone();
        var windowSize = 4;
        var wnd = new Array(1 << windowSize);
        wnd[0] = new BN(1).toRed(this);
        wnd[1] = a;
        for (var i = 2; i < wnd.length; i++) {
          wnd[i] = this.mul(wnd[i - 1], a);
        }
        var res = wnd[0];
        var current = 0;
        var currentLen = 0;
        var start = num.bitLength() % 26;
        if (start === 0) {
          start = 26;
        }
        for (i = num.length - 1; i >= 0; i--) {
          var word = num.words[i];
          for (var j = start - 1; j >= 0; j--) {
            var bit = word >> j & 1;
            if (res !== wnd[0]) {
              res = this.sqr(res);
            }
            if (bit === 0 && current === 0) {
              currentLen = 0;
              continue;
            }
            current <<= 1;
            current |= bit;
            currentLen++;
            if (currentLen !== windowSize && (i !== 0 || j !== 0))
              continue;
            res = this.mul(res, wnd[current]);
            currentLen = 0;
            current = 0;
          }
          start = 26;
        }
        return res;
      };
      Red.prototype.convertTo = function convertTo(num) {
        var r = num.umod(this.m);
        return r === num ? r.clone() : r;
      };
      Red.prototype.convertFrom = function convertFrom(num) {
        var res = num.clone();
        res.red = null;
        return res;
      };
      BN.mont = function mont2(num) {
        return new Mont(num);
      };
      function Mont(m) {
        Red.call(this, m);
        this.shift = this.m.bitLength();
        if (this.shift % 26 !== 0) {
          this.shift += 26 - this.shift % 26;
        }
        this.r = new BN(1).iushln(this.shift);
        this.r2 = this.imod(this.r.sqr());
        this.rinv = this.r._invmp(this.m);
        this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
        this.minv = this.minv.umod(this.r);
        this.minv = this.r.sub(this.minv);
      }
      inherits2(Mont, Red);
      Mont.prototype.convertTo = function convertTo(num) {
        return this.imod(num.ushln(this.shift));
      };
      Mont.prototype.convertFrom = function convertFrom(num) {
        var r = this.imod(num.mul(this.rinv));
        r.red = null;
        return r;
      };
      Mont.prototype.imul = function imul(a, b) {
        if (a.isZero() || b.isZero()) {
          a.words[0] = 0;
          a.length = 1;
          return a;
        }
        var t = a.imul(b);
        var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
        var u = t.isub(c).iushrn(this.shift);
        var res = u;
        if (u.cmp(this.m) >= 0) {
          res = u.isub(this.m);
        } else if (u.cmpn(0) < 0) {
          res = u.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Mont.prototype.mul = function mul(a, b) {
        if (a.isZero() || b.isZero())
          return new BN(0)._forceRed(this);
        var t = a.mul(b);
        var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
        var u = t.isub(c).iushrn(this.shift);
        var res = u;
        if (u.cmp(this.m) >= 0) {
          res = u.isub(this.m);
        } else if (u.cmpn(0) < 0) {
          res = u.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Mont.prototype.invm = function invm(a) {
        var res = this.imod(a._invmp(this.m).mul(this.r2));
        return res._forceRed(this);
      };
    })(module, commonjsGlobal);
  })(bn);
  return bn.exports;
}
var browserifyRsa;
var hasRequiredBrowserifyRsa;
function requireBrowserifyRsa() {
  if (hasRequiredBrowserifyRsa)
    return browserifyRsa;
  hasRequiredBrowserifyRsa = 1;
  var BN = requireBn();
  var randomBytes = requireRandombytes();
  function blind(priv) {
    var r = getr(priv);
    var blinder = r.toRed(BN.mont(priv.modulus)).redPow(new BN(priv.publicExponent)).fromRed();
    return { blinder, unblinder: r.invm(priv.modulus) };
  }
  function getr(priv) {
    var len = priv.modulus.byteLength();
    var r;
    do {
      r = new BN(randomBytes(len));
    } while (r.cmp(priv.modulus) >= 0 || !r.umod(priv.prime1) || !r.umod(priv.prime2));
    return r;
  }
  function crt(msg, priv) {
    var blinds = blind(priv);
    var len = priv.modulus.byteLength();
    var blinded = new BN(msg).mul(blinds.blinder).umod(priv.modulus);
    var c1 = blinded.toRed(BN.mont(priv.prime1));
    var c2 = blinded.toRed(BN.mont(priv.prime2));
    var qinv = priv.coefficient;
    var p = priv.prime1;
    var q = priv.prime2;
    var m1 = c1.redPow(priv.exponent1).fromRed();
    var m2 = c2.redPow(priv.exponent2).fromRed();
    var h = m1.isub(m2).imul(qinv).umod(p).imul(q);
    return m2.iadd(h).imul(blinds.unblinder).umod(priv.modulus).toArrayLike(buffer$1.Buffer, "be", len);
  }
  crt.getr = getr;
  browserifyRsa = crt;
  return browserifyRsa;
}
var publicEncrypt;
var hasRequiredPublicEncrypt$1;
function requirePublicEncrypt$1() {
  if (hasRequiredPublicEncrypt$1)
    return publicEncrypt;
  hasRequiredPublicEncrypt$1 = 1;
  var parseKeys = requireParseAsn1();
  var randomBytes = requireRandombytes();
  var createHash2 = requireCreateHash();
  var mgf2 = requireMgf();
  var xor2 = requireXor();
  var BN = requireBn$1();
  var withPublic = requireWithPublic();
  var crt = requireBrowserifyRsa();
  var Buffer2 = safeBufferExports.Buffer;
  publicEncrypt = function publicEncrypt2(publicKey, msg, reverse) {
    var padding;
    if (publicKey.padding) {
      padding = publicKey.padding;
    } else if (reverse) {
      padding = 1;
    } else {
      padding = 4;
    }
    var key2 = parseKeys(publicKey);
    var paddedMsg;
    if (padding === 4) {
      paddedMsg = oaep(key2, msg);
    } else if (padding === 1) {
      paddedMsg = pkcs1(key2, msg, reverse);
    } else if (padding === 3) {
      paddedMsg = new BN(msg);
      if (paddedMsg.cmp(key2.modulus) >= 0) {
        throw new Error("data too long for modulus");
      }
    } else {
      throw new Error("unknown padding");
    }
    if (reverse) {
      return crt(paddedMsg, key2);
    } else {
      return withPublic(paddedMsg, key2);
    }
  };
  function oaep(key2, msg) {
    var k = key2.modulus.byteLength();
    var mLen = msg.length;
    var iHash = createHash2("sha1").update(Buffer2.alloc(0)).digest();
    var hLen = iHash.length;
    var hLen2 = 2 * hLen;
    if (mLen > k - hLen2 - 2) {
      throw new Error("message too long");
    }
    var ps = Buffer2.alloc(k - mLen - hLen2 - 2);
    var dblen = k - hLen - 1;
    var seed = randomBytes(hLen);
    var maskedDb = xor2(Buffer2.concat([iHash, ps, Buffer2.alloc(1, 1), msg], dblen), mgf2(seed, dblen));
    var maskedSeed = xor2(seed, mgf2(maskedDb, hLen));
    return new BN(Buffer2.concat([Buffer2.alloc(1), maskedSeed, maskedDb], k));
  }
  function pkcs1(key2, msg, reverse) {
    var mLen = msg.length;
    var k = key2.modulus.byteLength();
    if (mLen > k - 11) {
      throw new Error("message too long");
    }
    var ps;
    if (reverse) {
      ps = Buffer2.alloc(k - mLen - 3, 255);
    } else {
      ps = nonZero(k - mLen - 3);
    }
    return new BN(Buffer2.concat([Buffer2.from([0, reverse ? 1 : 2]), ps, Buffer2.alloc(1), msg], k));
  }
  function nonZero(len) {
    var out = Buffer2.allocUnsafe(len);
    var i = 0;
    var cache = randomBytes(len * 2);
    var cur = 0;
    var num;
    while (i < len) {
      if (cur === cache.length) {
        cache = randomBytes(len * 2);
        cur = 0;
      }
      num = cache[cur++];
      if (num) {
        out[i++] = num;
      }
    }
    return out;
  }
  return publicEncrypt;
}
var privateDecrypt;
var hasRequiredPrivateDecrypt;
function requirePrivateDecrypt() {
  if (hasRequiredPrivateDecrypt)
    return privateDecrypt;
  hasRequiredPrivateDecrypt = 1;
  var parseKeys = requireParseAsn1();
  var mgf2 = requireMgf();
  var xor2 = requireXor();
  var BN = requireBn$1();
  var crt = requireBrowserifyRsa();
  var createHash2 = requireCreateHash();
  var withPublic = requireWithPublic();
  var Buffer2 = safeBufferExports.Buffer;
  privateDecrypt = function privateDecrypt2(privateKey, enc, reverse) {
    var padding;
    if (privateKey.padding) {
      padding = privateKey.padding;
    } else if (reverse) {
      padding = 1;
    } else {
      padding = 4;
    }
    var key2 = parseKeys(privateKey);
    var k = key2.modulus.byteLength();
    if (enc.length > k || new BN(enc).cmp(key2.modulus) >= 0) {
      throw new Error("decryption error");
    }
    var msg;
    if (reverse) {
      msg = withPublic(new BN(enc), key2);
    } else {
      msg = crt(enc, key2);
    }
    var zBuffer = Buffer2.alloc(k - msg.length);
    msg = Buffer2.concat([zBuffer, msg], k);
    if (padding === 4) {
      return oaep(key2, msg);
    } else if (padding === 1) {
      return pkcs1(key2, msg, reverse);
    } else if (padding === 3) {
      return msg;
    } else {
      throw new Error("unknown padding");
    }
  };
  function oaep(key2, msg) {
    var k = key2.modulus.byteLength();
    var iHash = createHash2("sha1").update(Buffer2.alloc(0)).digest();
    var hLen = iHash.length;
    if (msg[0] !== 0) {
      throw new Error("decryption error");
    }
    var maskedSeed = msg.slice(1, hLen + 1);
    var maskedDb = msg.slice(hLen + 1);
    var seed = xor2(maskedSeed, mgf2(maskedDb, hLen));
    var db = xor2(maskedDb, mgf2(seed, k - hLen - 1));
    if (compare(iHash, db.slice(0, hLen))) {
      throw new Error("decryption error");
    }
    var i = hLen;
    while (db[i] === 0) {
      i++;
    }
    if (db[i++] !== 1) {
      throw new Error("decryption error");
    }
    return db.slice(i);
  }
  function pkcs1(key2, msg, reverse) {
    var p1 = msg.slice(0, 2);
    var i = 2;
    var status = 0;
    while (msg[i++] !== 0) {
      if (i >= msg.length) {
        status++;
        break;
      }
    }
    var ps = msg.slice(2, i - 1);
    if (p1.toString("hex") !== "0002" && !reverse || p1.toString("hex") !== "0001" && reverse) {
      status++;
    }
    if (ps.length < 8) {
      status++;
    }
    if (status) {
      throw new Error("decryption error");
    }
    return msg.slice(i);
  }
  function compare(a, b) {
    a = Buffer2.from(a);
    b = Buffer2.from(b);
    var dif = 0;
    var len = a.length;
    if (a.length !== b.length) {
      dif++;
      len = Math.min(a.length, b.length);
    }
    var i = -1;
    while (++i < len) {
      dif += a[i] ^ b[i];
    }
    return dif;
  }
  return privateDecrypt;
}
var hasRequiredBrowser$1;
function requireBrowser$1() {
  if (hasRequiredBrowser$1)
    return browser$1;
  hasRequiredBrowser$1 = 1;
  (function(exports) {
    exports.publicEncrypt = requirePublicEncrypt$1();
    exports.privateDecrypt = requirePrivateDecrypt();
    exports.privateEncrypt = function privateEncrypt(key2, buf) {
      return exports.publicEncrypt(key2, buf, true);
    };
    exports.publicDecrypt = function publicDecrypt(key2, buf) {
      return exports.privateDecrypt(key2, buf, true);
    };
  })(browser$1);
  return browser$1;
}
var hasRequiredPublicEncrypt;
function requirePublicEncrypt() {
  if (hasRequiredPublicEncrypt)
    return publicEncrypt$1;
  hasRequiredPublicEncrypt = 1;
  var crypto = requireCryptoBrowserify();
  if (typeof crypto.publicEncrypt !== "function") {
    crypto = requireBrowser$1();
  }
  publicEncrypt$1.publicEncrypt = crypto.publicEncrypt;
  publicEncrypt$1.privateDecrypt = crypto.privateDecrypt;
  if (typeof crypto.privateEncrypt !== "function") {
    publicEncrypt$1.privateEncrypt = requireBrowser$1().privateEncrypt;
  } else {
    publicEncrypt$1.privateEncrypt = crypto.privateEncrypt;
  }
  if (typeof crypto.publicDecrypt !== "function") {
    publicEncrypt$1.publicDecrypt = requireBrowser$1().publicDecrypt;
  } else {
    publicEncrypt$1.publicDecrypt = crypto.publicDecrypt;
  }
  return publicEncrypt$1;
}
var randomfill = { exports: {} };
var browser = {};
var hasRequiredBrowser;
function requireBrowser() {
  if (hasRequiredBrowser)
    return browser;
  hasRequiredBrowser = 1;
  function oldBrowser() {
    throw new Error("secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11");
  }
  var safeBuffer2 = safeBufferExports;
  var randombytes2 = requireRandombytes();
  var Buffer2 = safeBuffer2.Buffer;
  var kBufferMaxLength = safeBuffer2.kMaxLength;
  var crypto = commonjsGlobal.crypto || commonjsGlobal.msCrypto;
  var kMaxUint32 = Math.pow(2, 32) - 1;
  function assertOffset(offset, length) {
    if (typeof offset !== "number" || offset !== offset) {
      throw new TypeError("offset must be a number");
    }
    if (offset > kMaxUint32 || offset < 0) {
      throw new TypeError("offset must be a uint32");
    }
    if (offset > kBufferMaxLength || offset > length) {
      throw new RangeError("offset out of range");
    }
  }
  function assertSize(size, offset, length) {
    if (typeof size !== "number" || size !== size) {
      throw new TypeError("size must be a number");
    }
    if (size > kMaxUint32 || size < 0) {
      throw new TypeError("size must be a uint32");
    }
    if (size + offset > length || size > kBufferMaxLength) {
      throw new RangeError("buffer too small");
    }
  }
  if (crypto && crypto.getRandomValues || !process.browser) {
    browser.randomFill = randomFill;
    browser.randomFillSync = randomFillSync;
  } else {
    browser.randomFill = oldBrowser;
    browser.randomFillSync = oldBrowser;
  }
  function randomFill(buf, offset, size, cb) {
    if (!Buffer2.isBuffer(buf) && !(buf instanceof commonjsGlobal.Uint8Array)) {
      throw new TypeError('"buf" argument must be a Buffer or Uint8Array');
    }
    if (typeof offset === "function") {
      cb = offset;
      offset = 0;
      size = buf.length;
    } else if (typeof size === "function") {
      cb = size;
      size = buf.length - offset;
    } else if (typeof cb !== "function") {
      throw new TypeError('"cb" argument must be a function');
    }
    assertOffset(offset, buf.length);
    assertSize(size, offset, buf.length);
    return actualFill(buf, offset, size, cb);
  }
  function actualFill(buf, offset, size, cb) {
    if (process.browser) {
      var ourBuf = buf.buffer;
      var uint = new Uint8Array(ourBuf, offset, size);
      crypto.getRandomValues(uint);
      if (cb) {
        process.nextTick(function() {
          cb(null, buf);
        });
        return;
      }
      return buf;
    }
    if (cb) {
      randombytes2(size, function(err, bytes2) {
        if (err) {
          return cb(err);
        }
        bytes2.copy(buf, offset);
        cb(null, buf);
      });
      return;
    }
    var bytes = randombytes2(size);
    bytes.copy(buf, offset);
    return buf;
  }
  function randomFillSync(buf, offset, size) {
    if (typeof offset === "undefined") {
      offset = 0;
    }
    if (!Buffer2.isBuffer(buf) && !(buf instanceof commonjsGlobal.Uint8Array)) {
      throw new TypeError('"buf" argument must be a Buffer or Uint8Array');
    }
    assertOffset(offset, buf.length);
    if (size === void 0)
      size = buf.length - offset;
    assertSize(size, offset, buf.length);
    return actualFill(buf, offset, size);
  }
  return browser;
}
var hasRequiredRandomfill;
function requireRandomfill() {
  if (hasRequiredRandomfill)
    return randomfill.exports;
  hasRequiredRandomfill = 1;
  (function(module, exports) {
    var crypto = requireCryptoBrowserify();
    if (typeof crypto.randomFill === "function" && typeof crypto.randomFillSync === "function") {
      exports.randomFill = crypto.randomFill;
      exports.randomFillSync = crypto.randomFillSync;
    } else {
      module.exports = requireBrowser();
    }
  })(randomfill, randomfill.exports);
  return randomfill.exports;
}
var hasRequiredCryptoBrowserify;
function requireCryptoBrowserify() {
  if (hasRequiredCryptoBrowserify)
    return cryptoBrowserify;
  hasRequiredCryptoBrowserify = 1;
  cryptoBrowserify.randomBytes = cryptoBrowserify.rng = cryptoBrowserify.pseudoRandomBytes = cryptoBrowserify.prng = requireRandombytes();
  cryptoBrowserify.createHash = cryptoBrowserify.Hash = requireCreateHash();
  cryptoBrowserify.createHmac = cryptoBrowserify.Hmac = requireCreateHmac();
  var algos$1 = algos;
  var algoKeys = Object.keys(algos$1);
  var hashes = ["sha1", "sha224", "sha256", "sha384", "sha512", "md5", "rmd160"].concat(algoKeys);
  cryptoBrowserify.getHashes = function() {
    return hashes;
  };
  var p = requirePbkdf2();
  cryptoBrowserify.pbkdf2 = p.pbkdf2;
  cryptoBrowserify.pbkdf2Sync = p.pbkdf2Sync;
  var aes = requireBrowserifyCipher();
  cryptoBrowserify.Cipher = aes.Cipher;
  cryptoBrowserify.createCipher = aes.createCipher;
  cryptoBrowserify.Cipheriv = aes.Cipheriv;
  cryptoBrowserify.createCipheriv = aes.createCipheriv;
  cryptoBrowserify.Decipher = aes.Decipher;
  cryptoBrowserify.createDecipher = aes.createDecipher;
  cryptoBrowserify.Decipheriv = aes.Decipheriv;
  cryptoBrowserify.createDecipheriv = aes.createDecipheriv;
  cryptoBrowserify.getCiphers = aes.getCiphers;
  cryptoBrowserify.listCiphers = aes.listCiphers;
  var dh = requireDiffieHellman();
  cryptoBrowserify.DiffieHellmanGroup = dh.DiffieHellmanGroup;
  cryptoBrowserify.createDiffieHellmanGroup = dh.createDiffieHellmanGroup;
  cryptoBrowserify.getDiffieHellman = dh.getDiffieHellman;
  cryptoBrowserify.createDiffieHellman = dh.createDiffieHellman;
  cryptoBrowserify.DiffieHellman = dh.DiffieHellman;
  var sign = requireBrowserifySign();
  cryptoBrowserify.createSign = sign.createSign;
  cryptoBrowserify.Sign = sign.Sign;
  cryptoBrowserify.createVerify = sign.createVerify;
  cryptoBrowserify.Verify = sign.Verify;
  cryptoBrowserify.createECDH = requireCreateEcdh();
  var publicEncrypt2 = requirePublicEncrypt();
  cryptoBrowserify.publicEncrypt = publicEncrypt2.publicEncrypt;
  cryptoBrowserify.privateEncrypt = publicEncrypt2.privateEncrypt;
  cryptoBrowserify.publicDecrypt = publicEncrypt2.publicDecrypt;
  cryptoBrowserify.privateDecrypt = publicEncrypt2.privateDecrypt;
  var rf = requireRandomfill();
  cryptoBrowserify.randomFill = rf.randomFill;
  cryptoBrowserify.randomFillSync = rf.randomFillSync;
  cryptoBrowserify.createCredentials = function() {
    throw new Error([
      "sorry, createCredentials is not implemented yet",
      "we accept pull requests",
      "https://github.com/crypto-browserify/crypto-browserify"
    ].join("\n"));
  };
  cryptoBrowserify.constants = {
    "DH_CHECK_P_NOT_SAFE_PRIME": 2,
    "DH_CHECK_P_NOT_PRIME": 1,
    "DH_UNABLE_TO_CHECK_GENERATOR": 4,
    "DH_NOT_SUITABLE_GENERATOR": 8,
    "NPN_ENABLED": 1,
    "ALPN_ENABLED": 1,
    "RSA_PKCS1_PADDING": 1,
    "RSA_SSLV23_PADDING": 2,
    "RSA_NO_PADDING": 3,
    "RSA_PKCS1_OAEP_PADDING": 4,
    "RSA_X931_PADDING": 5,
    "RSA_PKCS1_PSS_PADDING": 6,
    "POINT_CONVERSION_COMPRESSED": 2,
    "POINT_CONVERSION_UNCOMPRESSED": 4,
    "POINT_CONVERSION_HYBRID": 6
  };
  return cryptoBrowserify;
}
var cryptoBrowserifyExports = requireCryptoBrowserify();
function createBrowsablePromise(options) {
  const browse = (data) => {
    return options.request(data).then((response2) => {
      if (options.batch !== void 0) {
        options.batch(response2.hits);
      }
      if (options.shouldStop(response2)) {
        return void 0;
      }
      if (response2.cursor) {
        return browse({
          cursor: response2.cursor
        });
      }
      return browse({
        page: (data.page || 0) + 1
      });
    });
  };
  return browse({});
}
const createSearchClient = (options) => {
  const appId = options.appId;
  const auth = createAuth(options.authMode !== void 0 ? options.authMode : AuthMode.WithinHeaders, appId, options.apiKey);
  const transporter2 = createTransporter({
    hosts: [
      { url: `${appId}-dsn.algolia.net`, accept: CallEnum.Read },
      { url: `${appId}.algolia.net`, accept: CallEnum.Write }
    ].concat(shuffle([
      { url: `${appId}-1.algolianet.com` },
      { url: `${appId}-2.algolianet.com` },
      { url: `${appId}-3.algolianet.com` }
    ])),
    ...options,
    headers: {
      ...auth.headers(),
      ...{ "content-type": "application/x-www-form-urlencoded" },
      ...options.headers
    },
    queryParameters: {
      ...auth.queryParameters(),
      ...options.queryParameters
    }
  });
  const base2 = {
    transporter: transporter2,
    appId,
    addAlgoliaAgent(segment, version2) {
      transporter2.userAgent.add({ segment, version: version2 });
    },
    clearCache() {
      return Promise.all([
        transporter2.requestsCache.clear(),
        transporter2.responsesCache.clear()
      ]).then(() => void 0);
    }
  };
  return addMethods(base2, options.methods);
};
function createMissingObjectIDError() {
  return {
    name: "MissingObjectIDError",
    message: "All objects must have an unique objectID (like a primary key) to be valid. Algolia is also able to generate objectIDs automatically but *it's not recommended*. To do it, use the `{'autoGenerateObjectIDIfNotExist': true}` option."
  };
}
function createObjectNotFoundError() {
  return {
    name: "ObjectNotFoundError",
    message: "Object not found."
  };
}
function createValidUntilNotFoundError() {
  return {
    name: "ValidUntilNotFoundError",
    message: "ValidUntil not found in given secured api key."
  };
}
const addApiKey = (base2) => {
  return (acl, requestOptions) => {
    const { queryParameters, ...options } = requestOptions || {};
    const data = {
      acl,
      ...queryParameters !== void 0 ? { queryParameters } : {}
    };
    const wait = (response2, waitRequestOptions) => {
      return createRetryablePromise((retry) => {
        return getApiKey(base2)(response2.key, waitRequestOptions).catch((apiError) => {
          if (apiError.status !== 404) {
            throw apiError;
          }
          return retry();
        });
      });
    };
    return createWaitablePromise(base2.transporter.write({
      method: MethodEnum.Post,
      path: "1/keys",
      data
    }, options), wait);
  };
};
const assignUserID = (base2) => {
  return (userID, clusterName, requestOptions) => {
    const mappedRequestOptions = createMappedRequestOptions(requestOptions);
    mappedRequestOptions.queryParameters["X-Algolia-User-ID"] = userID;
    return base2.transporter.write({
      method: MethodEnum.Post,
      path: "1/clusters/mapping",
      data: { cluster: clusterName }
    }, mappedRequestOptions);
  };
};
const assignUserIDs = (base2) => {
  return (userIDs, clusterName, requestOptions) => {
    return base2.transporter.write({
      method: MethodEnum.Post,
      path: "1/clusters/mapping/batch",
      data: {
        users: userIDs,
        cluster: clusterName
      }
    }, requestOptions);
  };
};
const clearDictionaryEntries = (base2) => {
  return (dictionary, requestOptions) => {
    return createWaitablePromise(base2.transporter.write({
      method: MethodEnum.Post,
      path: encode$2("/1/dictionaries/%s/batch", dictionary),
      data: {
        clearExistingDictionaryEntries: true,
        requests: { action: "addEntry", body: [] }
      }
    }, requestOptions), (response2, waitRequestOptions) => waitAppTask(base2)(response2.taskID, waitRequestOptions));
  };
};
const copyIndex = (base2) => {
  return (from, to, requestOptions) => {
    const wait = (response2, waitRequestOptions) => {
      return initIndex(base2)(from, {
        methods: { waitTask }
      }).waitTask(response2.taskID, waitRequestOptions);
    };
    return createWaitablePromise(base2.transporter.write({
      method: MethodEnum.Post,
      path: encode$2("1/indexes/%s/operation", from),
      data: {
        operation: "copy",
        destination: to
      }
    }, requestOptions), wait);
  };
};
const copyRules = (base2) => {
  return (from, to, requestOptions) => {
    return copyIndex(base2)(from, to, {
      ...requestOptions,
      scope: [ScopeEnum.Rules]
    });
  };
};
const copySettings = (base2) => {
  return (from, to, requestOptions) => {
    return copyIndex(base2)(from, to, {
      ...requestOptions,
      scope: [ScopeEnum.Settings]
    });
  };
};
const copySynonyms = (base2) => {
  return (from, to, requestOptions) => {
    return copyIndex(base2)(from, to, {
      ...requestOptions,
      scope: [ScopeEnum.Synonyms]
    });
  };
};
const customRequest = (base2) => {
  return (request2, requestOptions) => {
    if (request2.method === MethodEnum.Get) {
      return base2.transporter.read(request2, requestOptions);
    }
    return base2.transporter.write(request2, requestOptions);
  };
};
const deleteApiKey = (base2) => {
  return (apiKey, requestOptions) => {
    const wait = (_, waitRequestOptions) => {
      return createRetryablePromise((retry) => {
        return getApiKey(base2)(apiKey, waitRequestOptions).then(retry).catch((apiError) => {
          if (apiError.status !== 404) {
            throw apiError;
          }
        });
      });
    };
    return createWaitablePromise(base2.transporter.write({
      method: MethodEnum.Delete,
      path: encode$2("1/keys/%s", apiKey)
    }, requestOptions), wait);
  };
};
const deleteDictionaryEntries = (base2) => {
  return (dictionary, objectIDs, requestOptions) => {
    const requests = objectIDs.map((objectID) => ({
      action: "deleteEntry",
      body: { objectID }
    }));
    return createWaitablePromise(base2.transporter.write({
      method: MethodEnum.Post,
      path: encode$2("/1/dictionaries/%s/batch", dictionary),
      data: { clearExistingDictionaryEntries: false, requests }
    }, requestOptions), (response2, waitRequestOptions) => waitAppTask(base2)(response2.taskID, waitRequestOptions));
  };
};
const generateSecuredApiKey = () => {
  return (parentApiKey, restrictions) => {
    const queryParameters = serializeQueryParameters(restrictions);
    const securedKey = cryptoBrowserifyExports.createHmac("sha256", parentApiKey).update(queryParameters).digest("hex");
    return buffer$1.Buffer.from(securedKey + queryParameters).toString("base64");
  };
};
const getApiKey = (base2) => {
  return (apiKey, requestOptions) => {
    return base2.transporter.read({
      method: MethodEnum.Get,
      path: encode$2("1/keys/%s", apiKey)
    }, requestOptions);
  };
};
const getAppTask = (base2) => {
  return (taskID, requestOptions) => {
    return base2.transporter.read({
      method: MethodEnum.Get,
      path: encode$2("1/task/%s", taskID.toString())
    }, requestOptions);
  };
};
const getDictionarySettings = (base2) => {
  return (requestOptions) => {
    return base2.transporter.read({
      method: MethodEnum.Get,
      path: "/1/dictionaries/*/settings"
    }, requestOptions);
  };
};
const getLogs = (base2) => {
  return (requestOptions) => {
    return base2.transporter.read({
      method: MethodEnum.Get,
      path: "1/logs"
    }, requestOptions);
  };
};
const getSecuredApiKeyRemainingValidity = () => {
  return (securedApiKey) => {
    const decodedString = buffer$1.Buffer.from(securedApiKey, "base64").toString("ascii");
    const regex = /validUntil=(\d+)/;
    const match = decodedString.match(regex);
    if (match === null) {
      throw createValidUntilNotFoundError();
    }
    return parseInt(match[1], 10) - Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3);
  };
};
const getTopUserIDs = (base2) => {
  return (requestOptions) => {
    return base2.transporter.read({
      method: MethodEnum.Get,
      path: "1/clusters/mapping/top"
    }, requestOptions);
  };
};
const getUserID = (base2) => {
  return (userID, requestOptions) => {
    return base2.transporter.read({
      method: MethodEnum.Get,
      path: encode$2("1/clusters/mapping/%s", userID)
    }, requestOptions);
  };
};
const hasPendingMappings = (base2) => {
  return (requestOptions) => {
    const { retrieveMappings, ...options } = requestOptions || {};
    if (retrieveMappings === true) {
      options.getClusters = true;
    }
    return base2.transporter.read({
      method: MethodEnum.Get,
      path: "1/clusters/mapping/pending"
    }, options);
  };
};
const initIndex = (base2) => {
  return (indexName, options = {}) => {
    const searchIndex = {
      transporter: base2.transporter,
      appId: base2.appId,
      indexName
    };
    return addMethods(searchIndex, options.methods);
  };
};
const listApiKeys = (base2) => {
  return (requestOptions) => {
    return base2.transporter.read({
      method: MethodEnum.Get,
      path: "1/keys"
    }, requestOptions);
  };
};
const listClusters = (base2) => {
  return (requestOptions) => {
    return base2.transporter.read({
      method: MethodEnum.Get,
      path: "1/clusters"
    }, requestOptions);
  };
};
const listIndices = (base2) => {
  return (requestOptions) => {
    return base2.transporter.read({
      method: MethodEnum.Get,
      path: "1/indexes"
    }, requestOptions);
  };
};
const listUserIDs = (base2) => {
  return (requestOptions) => {
    return base2.transporter.read({
      method: MethodEnum.Get,
      path: "1/clusters/mapping"
    }, requestOptions);
  };
};
const moveIndex = (base2) => {
  return (from, to, requestOptions) => {
    const wait = (response2, waitRequestOptions) => {
      return initIndex(base2)(from, {
        methods: { waitTask }
      }).waitTask(response2.taskID, waitRequestOptions);
    };
    return createWaitablePromise(base2.transporter.write({
      method: MethodEnum.Post,
      path: encode$2("1/indexes/%s/operation", from),
      data: {
        operation: "move",
        destination: to
      }
    }, requestOptions), wait);
  };
};
const multipleBatch = (base2) => {
  return (requests, requestOptions) => {
    const wait = (response2, waitRequestOptions) => {
      return Promise.all(Object.keys(response2.taskID).map((indexName) => {
        return initIndex(base2)(indexName, {
          methods: { waitTask }
        }).waitTask(response2.taskID[indexName], waitRequestOptions);
      }));
    };
    return createWaitablePromise(base2.transporter.write({
      method: MethodEnum.Post,
      path: "1/indexes/*/batch",
      data: {
        requests
      }
    }, requestOptions), wait);
  };
};
const multipleGetObjects = (base2) => {
  return (requests, requestOptions) => {
    return base2.transporter.read({
      method: MethodEnum.Post,
      path: "1/indexes/*/objects",
      data: {
        requests
      }
    }, requestOptions);
  };
};
const multipleQueries = (base2) => {
  return (queries, requestOptions) => {
    const requests = queries.map((query) => {
      return {
        ...query,
        params: serializeQueryParameters(query.params || {})
      };
    });
    return base2.transporter.read({
      method: MethodEnum.Post,
      path: "1/indexes/*/queries",
      data: {
        requests
      },
      cacheable: true
    }, requestOptions);
  };
};
const multipleSearchForFacetValues = (base2) => {
  return (queries, requestOptions) => {
    return Promise.all(queries.map((query) => {
      const { facetName, facetQuery, ...params } = query.params;
      return initIndex(base2)(query.indexName, {
        methods: { searchForFacetValues }
      }).searchForFacetValues(facetName, facetQuery, {
        ...requestOptions,
        ...params
      });
    }));
  };
};
const removeUserID = (base2) => {
  return (userID, requestOptions) => {
    const mappedRequestOptions = createMappedRequestOptions(requestOptions);
    mappedRequestOptions.queryParameters["X-Algolia-User-ID"] = userID;
    return base2.transporter.write({
      method: MethodEnum.Delete,
      path: "1/clusters/mapping"
    }, mappedRequestOptions);
  };
};
const replaceDictionaryEntries = (base2) => {
  return (dictionary, entries, requestOptions) => {
    const requests = entries.map((entry) => ({
      action: "addEntry",
      body: entry
    }));
    return createWaitablePromise(base2.transporter.write({
      method: MethodEnum.Post,
      path: encode$2("/1/dictionaries/%s/batch", dictionary),
      data: { clearExistingDictionaryEntries: true, requests }
    }, requestOptions), (response2, waitRequestOptions) => waitAppTask(base2)(response2.taskID, waitRequestOptions));
  };
};
const restoreApiKey = (base2) => {
  return (apiKey, requestOptions) => {
    const wait = (_, waitRequestOptions) => {
      return createRetryablePromise((retry) => {
        return getApiKey(base2)(apiKey, waitRequestOptions).catch((apiError) => {
          if (apiError.status !== 404) {
            throw apiError;
          }
          return retry();
        });
      });
    };
    return createWaitablePromise(base2.transporter.write({
      method: MethodEnum.Post,
      path: encode$2("1/keys/%s/restore", apiKey)
    }, requestOptions), wait);
  };
};
const saveDictionaryEntries = (base2) => {
  return (dictionary, entries, requestOptions) => {
    const requests = entries.map((entry) => ({
      action: "addEntry",
      body: entry
    }));
    return createWaitablePromise(base2.transporter.write({
      method: MethodEnum.Post,
      path: encode$2("/1/dictionaries/%s/batch", dictionary),
      data: { clearExistingDictionaryEntries: false, requests }
    }, requestOptions), (response2, waitRequestOptions) => waitAppTask(base2)(response2.taskID, waitRequestOptions));
  };
};
const searchDictionaryEntries = (base2) => {
  return (dictionary, query, requestOptions) => {
    return base2.transporter.read({
      method: MethodEnum.Post,
      path: encode$2("/1/dictionaries/%s/search", dictionary),
      data: {
        query
      },
      cacheable: true
    }, requestOptions);
  };
};
const searchUserIDs = (base2) => {
  return (query, requestOptions) => {
    return base2.transporter.read({
      method: MethodEnum.Post,
      path: "1/clusters/mapping/search",
      data: {
        query
      }
    }, requestOptions);
  };
};
const setDictionarySettings = (base2) => {
  return (settings, requestOptions) => {
    return createWaitablePromise(base2.transporter.write({
      method: MethodEnum.Put,
      path: "/1/dictionaries/*/settings",
      data: settings
    }, requestOptions), (response2, waitRequestOptions) => waitAppTask(base2)(response2.taskID, waitRequestOptions));
  };
};
const updateApiKey = (base2) => {
  return (apiKey, requestOptions) => {
    const updatedFields = Object.assign({}, requestOptions);
    const { queryParameters, ...options } = requestOptions || {};
    const data = queryParameters ? { queryParameters } : {};
    const apiKeyFields = [
      "acl",
      "indexes",
      "referers",
      "restrictSources",
      "queryParameters",
      "description",
      "maxQueriesPerIPPerHour",
      "maxHitsPerQuery"
    ];
    const hasChanged = (getApiKeyResponse) => {
      return Object.keys(updatedFields).filter((updatedField) => apiKeyFields.indexOf(updatedField) !== -1).every((updatedField) => {
        if (Array.isArray(getApiKeyResponse[updatedField]) && Array.isArray(updatedFields[updatedField])) {
          const getApiKeyResponseArray = getApiKeyResponse[updatedField];
          return getApiKeyResponseArray.length === updatedFields[updatedField].length && getApiKeyResponseArray.every((value, index2) => value === updatedFields[updatedField][index2]);
        } else {
          return getApiKeyResponse[updatedField] === updatedFields[updatedField];
        }
      });
    };
    const wait = (_, waitRequestOptions) => createRetryablePromise((retry) => {
      return getApiKey(base2)(apiKey, waitRequestOptions).then((getApiKeyResponse) => {
        return hasChanged(getApiKeyResponse) ? Promise.resolve() : retry();
      });
    });
    return createWaitablePromise(base2.transporter.write({
      method: MethodEnum.Put,
      path: encode$2("1/keys/%s", apiKey),
      data
    }, options), wait);
  };
};
const waitAppTask = (base2) => {
  return (taskID, requestOptions) => {
    return createRetryablePromise((retry) => {
      return getAppTask(base2)(taskID, requestOptions).then((response2) => {
        return response2.status !== "published" ? retry() : void 0;
      });
    });
  };
};
const batch = (base2) => {
  return (requests, requestOptions) => {
    const wait = (response2, waitRequestOptions) => {
      return waitTask(base2)(response2.taskID, waitRequestOptions);
    };
    return createWaitablePromise(base2.transporter.write({
      method: MethodEnum.Post,
      path: encode$2("1/indexes/%s/batch", base2.indexName),
      data: {
        requests
      }
    }, requestOptions), wait);
  };
};
const browseObjects = (base2) => {
  return (requestOptions) => {
    return createBrowsablePromise({
      shouldStop: (response2) => response2.cursor === void 0,
      ...requestOptions,
      request: (data) => base2.transporter.read({
        method: MethodEnum.Post,
        path: encode$2("1/indexes/%s/browse", base2.indexName),
        data
      }, requestOptions)
    });
  };
};
const browseRules = (base2) => {
  return (requestOptions) => {
    const options = {
      hitsPerPage: 1e3,
      ...requestOptions
    };
    return createBrowsablePromise({
      shouldStop: (response2) => response2.hits.length < options.hitsPerPage,
      ...options,
      request(data) {
        return searchRules(base2)("", { ...options, ...data }).then((response2) => {
          return {
            ...response2,
            hits: response2.hits.map((rule) => {
              delete rule._highlightResult;
              return rule;
            })
          };
        });
      }
    });
  };
};
const browseSynonyms = (base2) => {
  return (requestOptions) => {
    const options = {
      hitsPerPage: 1e3,
      ...requestOptions
    };
    return createBrowsablePromise({
      shouldStop: (response2) => response2.hits.length < options.hitsPerPage,
      ...options,
      request(data) {
        return searchSynonyms(base2)("", { ...options, ...data }).then((response2) => {
          return {
            ...response2,
            hits: response2.hits.map((synonym) => {
              delete synonym._highlightResult;
              return synonym;
            })
          };
        });
      }
    });
  };
};
const chunkedBatch = (base2) => {
  return (bodies, action, requestOptions) => {
    const { batchSize, ...options } = requestOptions || {};
    const response2 = {
      taskIDs: [],
      objectIDs: []
    };
    const forEachBatch = (lastIndex = 0) => {
      const bodiesChunk = [];
      let index2;
      for (index2 = lastIndex; index2 < bodies.length; index2++) {
        bodiesChunk.push(bodies[index2]);
        if (bodiesChunk.length === (batchSize || 1e3)) {
          break;
        }
      }
      if (bodiesChunk.length === 0) {
        return Promise.resolve(response2);
      }
      return batch(base2)(bodiesChunk.map((body) => {
        return {
          action,
          body
        };
      }), options).then((res) => {
        response2.objectIDs = response2.objectIDs.concat(res.objectIDs);
        response2.taskIDs.push(res.taskID);
        index2++;
        return forEachBatch(index2);
      });
    };
    return createWaitablePromise(forEachBatch(), (chunkedBatchResponse, waitRequestOptions) => {
      return Promise.all(chunkedBatchResponse.taskIDs.map((taskID) => {
        return waitTask(base2)(taskID, waitRequestOptions);
      }));
    });
  };
};
const clearObjects = (base2) => {
  return (requestOptions) => {
    return createWaitablePromise(base2.transporter.write({
      method: MethodEnum.Post,
      path: encode$2("1/indexes/%s/clear", base2.indexName)
    }, requestOptions), (response2, waitRequestOptions) => waitTask(base2)(response2.taskID, waitRequestOptions));
  };
};
const clearRules = (base2) => {
  return (requestOptions) => {
    const { forwardToReplicas, ...options } = requestOptions || {};
    const mappedRequestOptions = createMappedRequestOptions(options);
    if (forwardToReplicas) {
      mappedRequestOptions.queryParameters.forwardToReplicas = 1;
    }
    return createWaitablePromise(base2.transporter.write({
      method: MethodEnum.Post,
      path: encode$2("1/indexes/%s/rules/clear", base2.indexName)
    }, mappedRequestOptions), (response2, waitRequestOptions) => waitTask(base2)(response2.taskID, waitRequestOptions));
  };
};
const clearSynonyms = (base2) => {
  return (requestOptions) => {
    const { forwardToReplicas, ...options } = requestOptions || {};
    const mappedRequestOptions = createMappedRequestOptions(options);
    if (forwardToReplicas) {
      mappedRequestOptions.queryParameters.forwardToReplicas = 1;
    }
    return createWaitablePromise(base2.transporter.write({
      method: MethodEnum.Post,
      path: encode$2("1/indexes/%s/synonyms/clear", base2.indexName)
    }, mappedRequestOptions), (response2, waitRequestOptions) => waitTask(base2)(response2.taskID, waitRequestOptions));
  };
};
const deleteBy = (base2) => {
  return (filters, requestOptions) => {
    return createWaitablePromise(base2.transporter.write({
      method: MethodEnum.Post,
      path: encode$2("1/indexes/%s/deleteByQuery", base2.indexName),
      data: filters
    }, requestOptions), (response2, waitRequestOptions) => waitTask(base2)(response2.taskID, waitRequestOptions));
  };
};
const deleteIndex = (base2) => {
  return (requestOptions) => {
    return createWaitablePromise(base2.transporter.write({
      method: MethodEnum.Delete,
      path: encode$2("1/indexes/%s", base2.indexName)
    }, requestOptions), (response2, waitRequestOptions) => waitTask(base2)(response2.taskID, waitRequestOptions));
  };
};
const deleteObject = (base2) => {
  return (objectID, requestOptions) => {
    return createWaitablePromise(deleteObjects(base2)([objectID], requestOptions).then((response2) => {
      return { taskID: response2.taskIDs[0] };
    }), (response2, waitRequestOptions) => waitTask(base2)(response2.taskID, waitRequestOptions));
  };
};
const deleteObjects = (base2) => {
  return (objectIDs, requestOptions) => {
    const objects = objectIDs.map((objectID) => {
      return { objectID };
    });
    return chunkedBatch(base2)(objects, BatchActionEnum.DeleteObject, requestOptions);
  };
};
const deleteRule = (base2) => {
  return (objectID, requestOptions) => {
    const { forwardToReplicas, ...options } = requestOptions || {};
    const mappedRequestOptions = createMappedRequestOptions(options);
    if (forwardToReplicas) {
      mappedRequestOptions.queryParameters.forwardToReplicas = 1;
    }
    return createWaitablePromise(base2.transporter.write({
      method: MethodEnum.Delete,
      path: encode$2("1/indexes/%s/rules/%s", base2.indexName, objectID)
    }, mappedRequestOptions), (response2, waitRequestOptions) => waitTask(base2)(response2.taskID, waitRequestOptions));
  };
};
const deleteSynonym = (base2) => {
  return (objectID, requestOptions) => {
    const { forwardToReplicas, ...options } = requestOptions || {};
    const mappedRequestOptions = createMappedRequestOptions(options);
    if (forwardToReplicas) {
      mappedRequestOptions.queryParameters.forwardToReplicas = 1;
    }
    return createWaitablePromise(base2.transporter.write({
      method: MethodEnum.Delete,
      path: encode$2("1/indexes/%s/synonyms/%s", base2.indexName, objectID)
    }, mappedRequestOptions), (response2, waitRequestOptions) => waitTask(base2)(response2.taskID, waitRequestOptions));
  };
};
const exists = (base2) => {
  return (requestOptions) => {
    return getSettings(base2)(requestOptions).then(() => true).catch((error) => {
      if (error.status !== 404) {
        throw error;
      }
      return false;
    });
  };
};
const findAnswers = (base2) => {
  return (query, queryLanguages, requestOptions) => {
    return base2.transporter.read({
      method: MethodEnum.Post,
      path: encode$2("1/answers/%s/prediction", base2.indexName),
      data: {
        query,
        queryLanguages
      },
      cacheable: true
    }, requestOptions);
  };
};
const findObject = (base2) => {
  return (callback, requestOptions) => {
    const { query, paginate, ...options } = requestOptions || {};
    let page = 0;
    const forEachPage = () => {
      return search(base2)(query || "", { ...options, page }).then((result) => {
        for (const [position, hit] of Object.entries(result.hits)) {
          if (callback(hit)) {
            return {
              object: hit,
              position: parseInt(position, 10),
              page
            };
          }
        }
        page++;
        if (paginate === false || page >= result.nbPages) {
          throw createObjectNotFoundError();
        }
        return forEachPage();
      });
    };
    return forEachPage();
  };
};
const getObject = (base2) => {
  return (objectID, requestOptions) => {
    return base2.transporter.read({
      method: MethodEnum.Get,
      path: encode$2("1/indexes/%s/%s", base2.indexName, objectID)
    }, requestOptions);
  };
};
const getObjectPosition = () => {
  return (searchResponse, objectID) => {
    for (const [position, hit] of Object.entries(searchResponse.hits)) {
      if (hit.objectID === objectID) {
        return parseInt(position, 10);
      }
    }
    return -1;
  };
};
const getObjects = (base2) => {
  return (objectIDs, requestOptions) => {
    const { attributesToRetrieve, ...options } = requestOptions || {};
    const requests = objectIDs.map((objectID) => {
      return {
        indexName: base2.indexName,
        objectID,
        ...attributesToRetrieve ? { attributesToRetrieve } : {}
      };
    });
    return base2.transporter.read({
      method: MethodEnum.Post,
      path: "1/indexes/*/objects",
      data: {
        requests
      }
    }, options);
  };
};
const getRule = (base2) => {
  return (objectID, requestOptions) => {
    return base2.transporter.read({
      method: MethodEnum.Get,
      path: encode$2("1/indexes/%s/rules/%s", base2.indexName, objectID)
    }, requestOptions);
  };
};
const getSettings = (base2) => {
  return (requestOptions) => {
    return base2.transporter.read({
      method: MethodEnum.Get,
      path: encode$2("1/indexes/%s/settings", base2.indexName),
      data: {
        getVersion: 2
      }
    }, requestOptions);
  };
};
const getSynonym = (base2) => {
  return (objectID, requestOptions) => {
    return base2.transporter.read({
      method: MethodEnum.Get,
      path: encode$2(`1/indexes/%s/synonyms/%s`, base2.indexName, objectID)
    }, requestOptions);
  };
};
const getTask = (base2) => {
  return (taskID, requestOptions) => {
    return base2.transporter.read({
      method: MethodEnum.Get,
      path: encode$2("1/indexes/%s/task/%s", base2.indexName, taskID.toString())
    }, requestOptions);
  };
};
const partialUpdateObject = (base2) => {
  return (object, requestOptions) => {
    return createWaitablePromise(partialUpdateObjects(base2)([object], requestOptions).then((response2) => {
      return {
        objectID: response2.objectIDs[0],
        taskID: response2.taskIDs[0]
      };
    }), (response2, waitRequestOptions) => waitTask(base2)(response2.taskID, waitRequestOptions));
  };
};
const partialUpdateObjects = (base2) => {
  return (objects, requestOptions) => {
    const { createIfNotExists, ...options } = requestOptions || {};
    const action = createIfNotExists ? BatchActionEnum.PartialUpdateObject : BatchActionEnum.PartialUpdateObjectNoCreate;
    return chunkedBatch(base2)(objects, action, options);
  };
};
const replaceAllObjects = (base2) => {
  return (objects, requestOptions) => {
    const { safe, autoGenerateObjectIDIfNotExist, batchSize, ...options } = requestOptions || {};
    const operation = (from, to, type, operationRequestOptions) => {
      return createWaitablePromise(base2.transporter.write({
        method: MethodEnum.Post,
        path: encode$2("1/indexes/%s/operation", from),
        data: {
          operation: type,
          destination: to
        }
      }, operationRequestOptions), (response2, waitRequestOptions) => waitTask(base2)(response2.taskID, waitRequestOptions));
    };
    const randomSuffix = Math.random().toString(36).substring(7);
    const temporaryIndexName = `${base2.indexName}_tmp_${randomSuffix}`;
    const saveObjectsInTemporary = saveObjects({
      appId: base2.appId,
      transporter: base2.transporter,
      indexName: temporaryIndexName
    });
    let responses = [];
    const copyWaitablePromise = operation(base2.indexName, temporaryIndexName, "copy", {
      ...options,
      scope: ["settings", "synonyms", "rules"]
    });
    responses.push(copyWaitablePromise);
    const result = (safe ? copyWaitablePromise.wait(options) : copyWaitablePromise).then(() => {
      const saveObjectsWaitablePromise = saveObjectsInTemporary(objects, {
        ...options,
        autoGenerateObjectIDIfNotExist,
        batchSize
      });
      responses.push(saveObjectsWaitablePromise);
      return safe ? saveObjectsWaitablePromise.wait(options) : saveObjectsWaitablePromise;
    }).then(() => {
      const moveWaitablePromise = operation(temporaryIndexName, base2.indexName, "move", options);
      responses.push(moveWaitablePromise);
      return safe ? moveWaitablePromise.wait(options) : moveWaitablePromise;
    }).then(() => Promise.all(responses)).then(([copyResponse, saveObjectsResponse, moveResponse]) => {
      return {
        objectIDs: saveObjectsResponse.objectIDs,
        taskIDs: [copyResponse.taskID, ...saveObjectsResponse.taskIDs, moveResponse.taskID]
      };
    });
    return createWaitablePromise(result, (_, waitRequestOptions) => {
      return Promise.all(responses.map((response2) => response2.wait(waitRequestOptions)));
    });
  };
};
const replaceAllRules = (base2) => {
  return (rules, requestOptions) => {
    return saveRules(base2)(rules, {
      ...requestOptions,
      clearExistingRules: true
    });
  };
};
const replaceAllSynonyms = (base2) => {
  return (synonyms, requestOptions) => {
    return saveSynonyms(base2)(synonyms, {
      ...requestOptions,
      clearExistingSynonyms: true
    });
  };
};
const saveObject = (base2) => {
  return (object, requestOptions) => {
    return createWaitablePromise(saveObjects(base2)([object], requestOptions).then((response2) => {
      return {
        objectID: response2.objectIDs[0],
        taskID: response2.taskIDs[0]
      };
    }), (response2, waitRequestOptions) => waitTask(base2)(response2.taskID, waitRequestOptions));
  };
};
const saveObjects = (base2) => {
  return (objects, requestOptions) => {
    const { autoGenerateObjectIDIfNotExist, ...options } = requestOptions || {};
    const action = autoGenerateObjectIDIfNotExist ? BatchActionEnum.AddObject : BatchActionEnum.UpdateObject;
    if (action === BatchActionEnum.UpdateObject) {
      for (const object of objects) {
        if (object.objectID === void 0) {
          return createWaitablePromise(Promise.reject(createMissingObjectIDError()));
        }
      }
    }
    return chunkedBatch(base2)(objects, action, options);
  };
};
const saveRule = (base2) => {
  return (rule, requestOptions) => {
    return saveRules(base2)([rule], requestOptions);
  };
};
const saveRules = (base2) => {
  return (rules, requestOptions) => {
    const { forwardToReplicas, clearExistingRules, ...options } = requestOptions || {};
    const mappedRequestOptions = createMappedRequestOptions(options);
    if (forwardToReplicas) {
      mappedRequestOptions.queryParameters.forwardToReplicas = 1;
    }
    if (clearExistingRules) {
      mappedRequestOptions.queryParameters.clearExistingRules = 1;
    }
    return createWaitablePromise(base2.transporter.write({
      method: MethodEnum.Post,
      path: encode$2("1/indexes/%s/rules/batch", base2.indexName),
      data: rules
    }, mappedRequestOptions), (response2, waitRequestOptions) => waitTask(base2)(response2.taskID, waitRequestOptions));
  };
};
const saveSynonym = (base2) => {
  return (synonym, requestOptions) => {
    return saveSynonyms(base2)([synonym], requestOptions);
  };
};
const saveSynonyms = (base2) => {
  return (synonyms, requestOptions) => {
    const { forwardToReplicas, clearExistingSynonyms, replaceExistingSynonyms, ...options } = requestOptions || {};
    const mappedRequestOptions = createMappedRequestOptions(options);
    if (forwardToReplicas) {
      mappedRequestOptions.queryParameters.forwardToReplicas = 1;
    }
    if (replaceExistingSynonyms || clearExistingSynonyms) {
      mappedRequestOptions.queryParameters.replaceExistingSynonyms = 1;
    }
    return createWaitablePromise(base2.transporter.write({
      method: MethodEnum.Post,
      path: encode$2("1/indexes/%s/synonyms/batch", base2.indexName),
      data: synonyms
    }, mappedRequestOptions), (response2, waitRequestOptions) => waitTask(base2)(response2.taskID, waitRequestOptions));
  };
};
const search = (base2) => {
  return (query, requestOptions) => {
    return base2.transporter.read({
      method: MethodEnum.Post,
      path: encode$2("1/indexes/%s/query", base2.indexName),
      data: {
        query
      },
      cacheable: true
    }, requestOptions);
  };
};
const searchForFacetValues = (base2) => {
  return (facetName, facetQuery, requestOptions) => {
    return base2.transporter.read({
      method: MethodEnum.Post,
      path: encode$2("1/indexes/%s/facets/%s/query", base2.indexName, facetName),
      data: {
        facetQuery
      },
      cacheable: true
    }, requestOptions);
  };
};
const searchRules = (base2) => {
  return (query, requestOptions) => {
    return base2.transporter.read({
      method: MethodEnum.Post,
      path: encode$2("1/indexes/%s/rules/search", base2.indexName),
      data: {
        query
      }
    }, requestOptions);
  };
};
const searchSynonyms = (base2) => {
  return (query, requestOptions) => {
    return base2.transporter.read({
      method: MethodEnum.Post,
      path: encode$2("1/indexes/%s/synonyms/search", base2.indexName),
      data: {
        query
      }
    }, requestOptions);
  };
};
const setSettings = (base2) => {
  return (settings, requestOptions) => {
    const { forwardToReplicas, ...options } = requestOptions || {};
    const mappedRequestOptions = createMappedRequestOptions(options);
    if (forwardToReplicas) {
      mappedRequestOptions.queryParameters.forwardToReplicas = 1;
    }
    return createWaitablePromise(base2.transporter.write({
      method: MethodEnum.Put,
      path: encode$2("1/indexes/%s/settings", base2.indexName),
      data: settings
    }, mappedRequestOptions), (response2, waitRequestOptions) => waitTask(base2)(response2.taskID, waitRequestOptions));
  };
};
const waitTask = (base2) => {
  return (taskID, requestOptions) => {
    return createRetryablePromise((retry) => {
      return getTask(base2)(taskID, requestOptions).then((response2) => {
        return response2.status !== "published" ? retry() : void 0;
      });
    });
  };
};
const ApiKeyACLEnum = {
  AddObject: "addObject",
  Analytics: "analytics",
  Browser: "browse",
  DeleteIndex: "deleteIndex",
  DeleteObject: "deleteObject",
  EditSettings: "editSettings",
  Inference: "inference",
  ListIndexes: "listIndexes",
  Logs: "logs",
  Personalization: "personalization",
  Recommendation: "recommendation",
  Search: "search",
  SeeUnretrievableAttributes: "seeUnretrievableAttributes",
  Settings: "settings",
  Usage: "usage"
};
const BatchActionEnum = {
  AddObject: "addObject",
  UpdateObject: "updateObject",
  PartialUpdateObject: "partialUpdateObject",
  PartialUpdateObjectNoCreate: "partialUpdateObjectNoCreate",
  DeleteObject: "deleteObject",
  DeleteIndex: "delete",
  ClearIndex: "clear"
};
const ScopeEnum = {
  Settings: "settings",
  Synonyms: "synonyms",
  Rules: "rules"
};
const StrategyEnum = {
  None: "none",
  StopIfEnoughMatches: "stopIfEnoughMatches"
};
const SynonymEnum = {
  Synonym: "synonym",
  OneWaySynonym: "oneWaySynonym",
  AltCorrection1: "altCorrection1",
  AltCorrection2: "altCorrection2",
  Placeholder: "placeholder"
};
const clientSearch_esm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ApiKeyACLEnum,
  BatchActionEnum,
  ScopeEnum,
  StrategyEnum,
  SynonymEnum,
  addApiKey,
  assignUserID,
  assignUserIDs,
  batch,
  browseObjects,
  browseRules,
  browseSynonyms,
  chunkedBatch,
  clearDictionaryEntries,
  clearObjects,
  clearRules,
  clearSynonyms,
  copyIndex,
  copyRules,
  copySettings,
  copySynonyms,
  createBrowsablePromise,
  createMissingObjectIDError,
  createObjectNotFoundError,
  createSearchClient,
  createValidUntilNotFoundError,
  customRequest,
  deleteApiKey,
  deleteBy,
  deleteDictionaryEntries,
  deleteIndex,
  deleteObject,
  deleteObjects,
  deleteRule,
  deleteSynonym,
  exists,
  findAnswers,
  findObject,
  generateSecuredApiKey,
  getApiKey,
  getAppTask,
  getDictionarySettings,
  getLogs,
  getObject,
  getObjectPosition,
  getObjects,
  getRule,
  getSecuredApiKeyRemainingValidity,
  getSettings,
  getSynonym,
  getTask,
  getTopUserIDs,
  getUserID,
  hasPendingMappings,
  initIndex,
  listApiKeys,
  listClusters,
  listIndices,
  listUserIDs,
  moveIndex,
  multipleBatch,
  multipleGetObjects,
  multipleQueries,
  multipleSearchForFacetValues,
  partialUpdateObject,
  partialUpdateObjects,
  removeUserID,
  replaceAllObjects,
  replaceAllRules,
  replaceAllSynonyms,
  replaceDictionaryEntries,
  restoreApiKey,
  saveDictionaryEntries,
  saveObject,
  saveObjects,
  saveRule,
  saveRules,
  saveSynonym,
  saveSynonyms,
  search,
  searchDictionaryEntries,
  searchForFacetValues,
  searchRules,
  searchSynonyms,
  searchUserIDs,
  setDictionarySettings,
  setSettings,
  updateApiKey,
  waitAppTask,
  waitTask
}, Symbol.toStringTag, { value: "Module" }));
const require$$5 = /* @__PURE__ */ getAugmentedNamespace(clientSearch_esm);
function createNullLogger() {
  return {
    debug(_message, _args) {
      return Promise.resolve();
    },
    info(_message, _args) {
      return Promise.resolve();
    },
    error(_message, _args) {
      return Promise.resolve();
    }
  };
}
const LogLevelEnum = {
  Debug: 1,
  Info: 2,
  Error: 3
};
const loggerCommon_esm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LogLevelEnum,
  createNullLogger
}, Symbol.toStringTag, { value: "Module" }));
const require$$6 = /* @__PURE__ */ getAugmentedNamespace(loggerCommon_esm);
var streamHttp = {};
var request = { exports: {} };
var capability$2 = {};
(function(exports) {
  exports.fetch = isFunction(commonjsGlobal.fetch) && isFunction(commonjsGlobal.ReadableStream);
  exports.writableStream = isFunction(commonjsGlobal.WritableStream);
  exports.abortController = isFunction(commonjsGlobal.AbortController);
  var xhr;
  function getXHR() {
    if (xhr !== void 0)
      return xhr;
    if (commonjsGlobal.XMLHttpRequest) {
      xhr = new commonjsGlobal.XMLHttpRequest();
      try {
        xhr.open("GET", commonjsGlobal.XDomainRequest ? "/" : "https://example.com");
      } catch (e) {
        xhr = null;
      }
    } else {
      xhr = null;
    }
    return xhr;
  }
  function checkTypeSupport(type) {
    var xhr2 = getXHR();
    if (!xhr2)
      return false;
    try {
      xhr2.responseType = type;
      return xhr2.responseType === type;
    } catch (e) {
    }
    return false;
  }
  exports.arraybuffer = exports.fetch || checkTypeSupport("arraybuffer");
  exports.msstream = !exports.fetch && checkTypeSupport("ms-stream");
  exports.mozchunkedarraybuffer = !exports.fetch && checkTypeSupport("moz-chunked-arraybuffer");
  exports.overrideMimeType = exports.fetch || (getXHR() ? isFunction(getXHR().overrideMimeType) : false);
  function isFunction(value) {
    return typeof value === "function";
  }
  xhr = null;
})(capability$2);
var response$1 = {};
var capability$1 = capability$2;
var inherits$1 = requireInherits();
var stream$1 = readableExports;
var rStates$1 = response$1.readyStates = {
  UNSENT: 0,
  OPENED: 1,
  HEADERS_RECEIVED: 2,
  LOADING: 3,
  DONE: 4
};
var IncomingMessage$1 = response$1.IncomingMessage = function(xhr, response2, mode, resetTimers) {
  var self2 = this;
  stream$1.Readable.call(self2);
  self2._mode = mode;
  self2.headers = {};
  self2.rawHeaders = [];
  self2.trailers = {};
  self2.rawTrailers = [];
  self2.on("end", function() {
    process.nextTick(function() {
      self2.emit("close");
    });
  });
  if (mode === "fetch") {
    let read = function() {
      reader.read().then(function(result) {
        if (self2._destroyed)
          return;
        resetTimers(result.done);
        if (result.done) {
          self2.push(null);
          return;
        }
        self2.push(buffer$1.Buffer.from(result.value));
        read();
      }).catch(function(err) {
        resetTimers(true);
        if (!self2._destroyed)
          self2.emit("error", err);
      });
    };
    self2._fetchResponse = response2;
    self2.url = response2.url;
    self2.statusCode = response2.status;
    self2.statusMessage = response2.statusText;
    response2.headers.forEach(function(header, key2) {
      self2.headers[key2.toLowerCase()] = header;
      self2.rawHeaders.push(key2, header);
    });
    if (capability$1.writableStream) {
      var writable = new WritableStream({
        write: function(chunk) {
          resetTimers(false);
          return new Promise(function(resolve, reject) {
            if (self2._destroyed) {
              reject();
            } else if (self2.push(buffer$1.Buffer.from(chunk))) {
              resolve();
            } else {
              self2._resumeFetch = resolve;
            }
          });
        },
        close: function() {
          resetTimers(true);
          if (!self2._destroyed)
            self2.push(null);
        },
        abort: function(err) {
          resetTimers(true);
          if (!self2._destroyed)
            self2.emit("error", err);
        }
      });
      try {
        response2.body.pipeTo(writable).catch(function(err) {
          resetTimers(true);
          if (!self2._destroyed)
            self2.emit("error", err);
        });
        return;
      } catch (e) {
      }
    }
    var reader = response2.body.getReader();
    read();
  } else {
    self2._xhr = xhr;
    self2._pos = 0;
    self2.url = xhr.responseURL;
    self2.statusCode = xhr.status;
    self2.statusMessage = xhr.statusText;
    var headers = xhr.getAllResponseHeaders().split(/\r?\n/);
    headers.forEach(function(header) {
      var matches = header.match(/^([^:]+):\s*(.*)/);
      if (matches) {
        var key2 = matches[1].toLowerCase();
        if (key2 === "set-cookie") {
          if (self2.headers[key2] === void 0) {
            self2.headers[key2] = [];
          }
          self2.headers[key2].push(matches[2]);
        } else if (self2.headers[key2] !== void 0) {
          self2.headers[key2] += ", " + matches[2];
        } else {
          self2.headers[key2] = matches[2];
        }
        self2.rawHeaders.push(matches[1], matches[2]);
      }
    });
    self2._charset = "x-user-defined";
    if (!capability$1.overrideMimeType) {
      var mimeType = self2.rawHeaders["mime-type"];
      if (mimeType) {
        var charsetMatch = mimeType.match(/;\s*charset=([^;])(;|$)/);
        if (charsetMatch) {
          self2._charset = charsetMatch[1].toLowerCase();
        }
      }
      if (!self2._charset)
        self2._charset = "utf-8";
    }
  }
};
inherits$1(IncomingMessage$1, stream$1.Readable);
IncomingMessage$1.prototype._read = function() {
  var self2 = this;
  var resolve = self2._resumeFetch;
  if (resolve) {
    self2._resumeFetch = null;
    resolve();
  }
};
IncomingMessage$1.prototype._onXHRProgress = function(resetTimers) {
  var self2 = this;
  var xhr = self2._xhr;
  var response2 = null;
  switch (self2._mode) {
    case "text":
      response2 = xhr.responseText;
      if (response2.length > self2._pos) {
        var newData = response2.substr(self2._pos);
        if (self2._charset === "x-user-defined") {
          var buffer2 = buffer$1.Buffer.alloc(newData.length);
          for (var i = 0; i < newData.length; i++)
            buffer2[i] = newData.charCodeAt(i) & 255;
          self2.push(buffer2);
        } else {
          self2.push(newData, self2._charset);
        }
        self2._pos = response2.length;
      }
      break;
    case "arraybuffer":
      if (xhr.readyState !== rStates$1.DONE || !xhr.response)
        break;
      response2 = xhr.response;
      self2.push(buffer$1.Buffer.from(new Uint8Array(response2)));
      break;
    case "moz-chunked-arraybuffer":
      response2 = xhr.response;
      if (xhr.readyState !== rStates$1.LOADING || !response2)
        break;
      self2.push(buffer$1.Buffer.from(new Uint8Array(response2)));
      break;
    case "ms-stream":
      response2 = xhr.response;
      if (xhr.readyState !== rStates$1.LOADING)
        break;
      var reader = new commonjsGlobal.MSStreamReader();
      reader.onprogress = function() {
        if (reader.result.byteLength > self2._pos) {
          self2.push(buffer$1.Buffer.from(new Uint8Array(reader.result.slice(self2._pos))));
          self2._pos = reader.result.byteLength;
        }
      };
      reader.onload = function() {
        resetTimers(true);
        self2.push(null);
      };
      reader.readAsArrayBuffer(response2);
      break;
  }
  if (self2._xhr.readyState === rStates$1.DONE && self2._mode !== "ms-stream") {
    resetTimers(true);
    self2.push(null);
  }
};
var capability = capability$2;
var inherits = requireInherits();
var response = response$1;
var stream = readableExports;
var IncomingMessage = response.IncomingMessage;
var rStates = response.readyStates;
function decideMode(preferBinary, useFetch) {
  if (capability.fetch && useFetch) {
    return "fetch";
  } else if (capability.mozchunkedarraybuffer) {
    return "moz-chunked-arraybuffer";
  } else if (capability.msstream) {
    return "ms-stream";
  } else if (capability.arraybuffer && preferBinary) {
    return "arraybuffer";
  } else {
    return "text";
  }
}
var ClientRequest = request.exports = function(opts) {
  var self2 = this;
  stream.Writable.call(self2);
  self2._opts = opts;
  self2._body = [];
  self2._headers = {};
  if (opts.auth)
    self2.setHeader("Authorization", "Basic " + buffer$1.Buffer.from(opts.auth).toString("base64"));
  Object.keys(opts.headers).forEach(function(name2) {
    self2.setHeader(name2, opts.headers[name2]);
  });
  var preferBinary;
  var useFetch = true;
  if (opts.mode === "disable-fetch" || "requestTimeout" in opts && !capability.abortController) {
    useFetch = false;
    preferBinary = true;
  } else if (opts.mode === "prefer-streaming") {
    preferBinary = false;
  } else if (opts.mode === "allow-wrong-content-type") {
    preferBinary = !capability.overrideMimeType;
  } else if (!opts.mode || opts.mode === "default" || opts.mode === "prefer-fast") {
    preferBinary = true;
  } else {
    throw new Error("Invalid value for opts.mode");
  }
  self2._mode = decideMode(preferBinary, useFetch);
  self2._fetchTimer = null;
  self2._socketTimeout = null;
  self2._socketTimer = null;
  self2.on("finish", function() {
    self2._onFinish();
  });
};
inherits(ClientRequest, stream.Writable);
ClientRequest.prototype.setHeader = function(name2, value) {
  var self2 = this;
  var lowerName = name2.toLowerCase();
  if (unsafeHeaders.indexOf(lowerName) !== -1)
    return;
  self2._headers[lowerName] = {
    name: name2,
    value
  };
};
ClientRequest.prototype.getHeader = function(name2) {
  var header = this._headers[name2.toLowerCase()];
  if (header)
    return header.value;
  return null;
};
ClientRequest.prototype.removeHeader = function(name2) {
  var self2 = this;
  delete self2._headers[name2.toLowerCase()];
};
ClientRequest.prototype._onFinish = function() {
  var self2 = this;
  if (self2._destroyed)
    return;
  var opts = self2._opts;
  if ("timeout" in opts && opts.timeout !== 0) {
    self2.setTimeout(opts.timeout);
  }
  var headersObj = self2._headers;
  var body = null;
  if (opts.method !== "GET" && opts.method !== "HEAD") {
    body = new Blob(self2._body, {
      type: (headersObj["content-type"] || {}).value || ""
    });
  }
  var headersList = [];
  Object.keys(headersObj).forEach(function(keyName) {
    var name2 = headersObj[keyName].name;
    var value = headersObj[keyName].value;
    if (Array.isArray(value)) {
      value.forEach(function(v) {
        headersList.push([name2, v]);
      });
    } else {
      headersList.push([name2, value]);
    }
  });
  if (self2._mode === "fetch") {
    var signal = null;
    if (capability.abortController) {
      var controller = new AbortController();
      signal = controller.signal;
      self2._fetchAbortController = controller;
      if ("requestTimeout" in opts && opts.requestTimeout !== 0) {
        self2._fetchTimer = commonjsGlobal.setTimeout(function() {
          self2.emit("requestTimeout");
          if (self2._fetchAbortController)
            self2._fetchAbortController.abort();
        }, opts.requestTimeout);
      }
    }
    commonjsGlobal.fetch(self2._opts.url, {
      method: self2._opts.method,
      headers: headersList,
      body: body || void 0,
      mode: "cors",
      credentials: opts.withCredentials ? "include" : "same-origin",
      signal
    }).then(function(response2) {
      self2._fetchResponse = response2;
      self2._resetTimers(false);
      self2._connect();
    }, function(reason) {
      self2._resetTimers(true);
      if (!self2._destroyed)
        self2.emit("error", reason);
    });
  } else {
    var xhr = self2._xhr = new commonjsGlobal.XMLHttpRequest();
    try {
      xhr.open(self2._opts.method, self2._opts.url, true);
    } catch (err) {
      process.nextTick(function() {
        self2.emit("error", err);
      });
      return;
    }
    if ("responseType" in xhr)
      xhr.responseType = self2._mode;
    if ("withCredentials" in xhr)
      xhr.withCredentials = !!opts.withCredentials;
    if (self2._mode === "text" && "overrideMimeType" in xhr)
      xhr.overrideMimeType("text/plain; charset=x-user-defined");
    if ("requestTimeout" in opts) {
      xhr.timeout = opts.requestTimeout;
      xhr.ontimeout = function() {
        self2.emit("requestTimeout");
      };
    }
    headersList.forEach(function(header) {
      xhr.setRequestHeader(header[0], header[1]);
    });
    self2._response = null;
    xhr.onreadystatechange = function() {
      switch (xhr.readyState) {
        case rStates.LOADING:
        case rStates.DONE:
          self2._onXHRProgress();
          break;
      }
    };
    if (self2._mode === "moz-chunked-arraybuffer") {
      xhr.onprogress = function() {
        self2._onXHRProgress();
      };
    }
    xhr.onerror = function() {
      if (self2._destroyed)
        return;
      self2._resetTimers(true);
      self2.emit("error", new Error("XHR error"));
    };
    try {
      xhr.send(body);
    } catch (err) {
      process.nextTick(function() {
        self2.emit("error", err);
      });
      return;
    }
  }
};
function statusValid(xhr) {
  try {
    var status = xhr.status;
    return status !== null && status !== 0;
  } catch (e) {
    return false;
  }
}
ClientRequest.prototype._onXHRProgress = function() {
  var self2 = this;
  self2._resetTimers(false);
  if (!statusValid(self2._xhr) || self2._destroyed)
    return;
  if (!self2._response)
    self2._connect();
  self2._response._onXHRProgress(self2._resetTimers.bind(self2));
};
ClientRequest.prototype._connect = function() {
  var self2 = this;
  if (self2._destroyed)
    return;
  self2._response = new IncomingMessage(self2._xhr, self2._fetchResponse, self2._mode, self2._resetTimers.bind(self2));
  self2._response.on("error", function(err) {
    self2.emit("error", err);
  });
  self2.emit("response", self2._response);
};
ClientRequest.prototype._write = function(chunk, encoding, cb) {
  var self2 = this;
  self2._body.push(chunk);
  cb();
};
ClientRequest.prototype._resetTimers = function(done) {
  var self2 = this;
  commonjsGlobal.clearTimeout(self2._socketTimer);
  self2._socketTimer = null;
  if (done) {
    commonjsGlobal.clearTimeout(self2._fetchTimer);
    self2._fetchTimer = null;
  } else if (self2._socketTimeout) {
    self2._socketTimer = commonjsGlobal.setTimeout(function() {
      self2.emit("timeout");
    }, self2._socketTimeout);
  }
};
ClientRequest.prototype.abort = ClientRequest.prototype.destroy = function(err) {
  var self2 = this;
  self2._destroyed = true;
  self2._resetTimers(true);
  if (self2._response)
    self2._response._destroyed = true;
  if (self2._xhr)
    self2._xhr.abort();
  else if (self2._fetchAbortController)
    self2._fetchAbortController.abort();
  if (err)
    self2.emit("error", err);
};
ClientRequest.prototype.end = function(data, encoding, cb) {
  var self2 = this;
  if (typeof data === "function") {
    cb = data;
    data = void 0;
  }
  stream.Writable.prototype.end.call(self2, data, encoding, cb);
};
ClientRequest.prototype.setTimeout = function(timeout, cb) {
  var self2 = this;
  if (cb)
    self2.once("timeout", cb);
  self2._socketTimeout = timeout;
  self2._resetTimers(false);
};
ClientRequest.prototype.flushHeaders = function() {
};
ClientRequest.prototype.setNoDelay = function() {
};
ClientRequest.prototype.setSocketKeepAlive = function() {
};
var unsafeHeaders = [
  "accept-charset",
  "accept-encoding",
  "access-control-request-headers",
  "access-control-request-method",
  "connection",
  "content-length",
  "cookie",
  "cookie2",
  "date",
  "dnt",
  "expect",
  "host",
  "keep-alive",
  "origin",
  "referer",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
  "via"
];
var requestExports = request.exports;
var immutable = extend;
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
function extend() {
  var target = {};
  for (var i = 0; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key2 in source) {
      if (hasOwnProperty$1.call(source, key2)) {
        target[key2] = source[key2];
      }
    }
  }
  return target;
}
var builtinStatusCodes;
var hasRequiredBuiltinStatusCodes;
function requireBuiltinStatusCodes() {
  if (hasRequiredBuiltinStatusCodes)
    return builtinStatusCodes;
  hasRequiredBuiltinStatusCodes = 1;
  builtinStatusCodes = requireStreamHttp().STATUS_CODES;
  return builtinStatusCodes;
}
var url = { exports: {} };
var punycode = { exports: {} };
/*! https://mths.be/punycode v1.4.1 by @mathias */
punycode.exports;
(function(module, exports) {
  (function(root) {
    var freeExports = exports && !exports.nodeType && exports;
    var freeModule = module && !module.nodeType && module;
    var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal;
    if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal) {
      root = freeGlobal;
    }
    var punycode2, maxInt = 2147483647, base2 = 36, tMin = 1, tMax = 26, skew = 38, damp = 700, initialBias = 72, initialN = 128, delimiter = "-", regexPunycode = /^xn--/, regexNonASCII = /[^\x20-\x7E]/, regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, errors2 = {
      "overflow": "Overflow: input needs wider integers to process",
      "not-basic": "Illegal input >= 0x80 (not a basic code point)",
      "invalid-input": "Invalid input"
    }, baseMinusTMin = base2 - tMin, floor = Math.floor, stringFromCharCode = String.fromCharCode, key2;
    function error(type) {
      throw new RangeError(errors2[type]);
    }
    function map2(array, fn) {
      var length = array.length;
      var result = [];
      while (length--) {
        result[length] = fn(array[length]);
      }
      return result;
    }
    function mapDomain(string, fn) {
      var parts = string.split("@");
      var result = "";
      if (parts.length > 1) {
        result = parts[0] + "@";
        string = parts[1];
      }
      string = string.replace(regexSeparators, ".");
      var labels = string.split(".");
      var encoded = map2(labels, fn).join(".");
      return result + encoded;
    }
    function ucs2decode(string) {
      var output = [], counter = 0, length = string.length, value, extra;
      while (counter < length) {
        value = string.charCodeAt(counter++);
        if (value >= 55296 && value <= 56319 && counter < length) {
          extra = string.charCodeAt(counter++);
          if ((extra & 64512) == 56320) {
            output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
          } else {
            output.push(value);
            counter--;
          }
        } else {
          output.push(value);
        }
      }
      return output;
    }
    function ucs2encode(array) {
      return map2(array, function(value) {
        var output = "";
        if (value > 65535) {
          value -= 65536;
          output += stringFromCharCode(value >>> 10 & 1023 | 55296);
          value = 56320 | value & 1023;
        }
        output += stringFromCharCode(value);
        return output;
      }).join("");
    }
    function basicToDigit(codePoint) {
      if (codePoint - 48 < 10) {
        return codePoint - 22;
      }
      if (codePoint - 65 < 26) {
        return codePoint - 65;
      }
      if (codePoint - 97 < 26) {
        return codePoint - 97;
      }
      return base2;
    }
    function digitToBasic(digit, flag) {
      return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
    }
    function adapt(delta, numPoints, firstTime) {
      var k = 0;
      delta = firstTime ? floor(delta / damp) : delta >> 1;
      delta += floor(delta / numPoints);
      for (; delta > baseMinusTMin * tMax >> 1; k += base2) {
        delta = floor(delta / baseMinusTMin);
      }
      return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
    }
    function decode2(input) {
      var output = [], inputLength = input.length, out, i = 0, n = initialN, bias = initialBias, basic, j, index2, oldi, w, k, digit, t, baseMinusT;
      basic = input.lastIndexOf(delimiter);
      if (basic < 0) {
        basic = 0;
      }
      for (j = 0; j < basic; ++j) {
        if (input.charCodeAt(j) >= 128) {
          error("not-basic");
        }
        output.push(input.charCodeAt(j));
      }
      for (index2 = basic > 0 ? basic + 1 : 0; index2 < inputLength; ) {
        for (oldi = i, w = 1, k = base2; ; k += base2) {
          if (index2 >= inputLength) {
            error("invalid-input");
          }
          digit = basicToDigit(input.charCodeAt(index2++));
          if (digit >= base2 || digit > floor((maxInt - i) / w)) {
            error("overflow");
          }
          i += digit * w;
          t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
          if (digit < t) {
            break;
          }
          baseMinusT = base2 - t;
          if (w > floor(maxInt / baseMinusT)) {
            error("overflow");
          }
          w *= baseMinusT;
        }
        out = output.length + 1;
        bias = adapt(i - oldi, out, oldi == 0);
        if (floor(i / out) > maxInt - n) {
          error("overflow");
        }
        n += floor(i / out);
        i %= out;
        output.splice(i++, 0, n);
      }
      return ucs2encode(output);
    }
    function encode2(input) {
      var n, delta, handledCPCount, basicLength, bias, j, m, q, k, t, currentValue, output = [], inputLength, handledCPCountPlusOne, baseMinusT, qMinusT;
      input = ucs2decode(input);
      inputLength = input.length;
      n = initialN;
      delta = 0;
      bias = initialBias;
      for (j = 0; j < inputLength; ++j) {
        currentValue = input[j];
        if (currentValue < 128) {
          output.push(stringFromCharCode(currentValue));
        }
      }
      handledCPCount = basicLength = output.length;
      if (basicLength) {
        output.push(delimiter);
      }
      while (handledCPCount < inputLength) {
        for (m = maxInt, j = 0; j < inputLength; ++j) {
          currentValue = input[j];
          if (currentValue >= n && currentValue < m) {
            m = currentValue;
          }
        }
        handledCPCountPlusOne = handledCPCount + 1;
        if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
          error("overflow");
        }
        delta += (m - n) * handledCPCountPlusOne;
        n = m;
        for (j = 0; j < inputLength; ++j) {
          currentValue = input[j];
          if (currentValue < n && ++delta > maxInt) {
            error("overflow");
          }
          if (currentValue == n) {
            for (q = delta, k = base2; ; k += base2) {
              t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
              if (q < t) {
                break;
              }
              qMinusT = q - t;
              baseMinusT = base2 - t;
              output.push(
                stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
              );
              q = floor(qMinusT / baseMinusT);
            }
            output.push(stringFromCharCode(digitToBasic(q, 0)));
            bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
            delta = 0;
            ++handledCPCount;
          }
        }
        ++delta;
        ++n;
      }
      return output.join("");
    }
    function toUnicode(input) {
      return mapDomain(input, function(string) {
        return regexPunycode.test(string) ? decode2(string.slice(4).toLowerCase()) : string;
      });
    }
    function toASCII(input) {
      return mapDomain(input, function(string) {
        return regexNonASCII.test(string) ? "xn--" + encode2(string) : string;
      });
    }
    punycode2 = {
      /**
       * A string representing the current Punycode.js version number.
       * @memberOf punycode
       * @type String
       */
      "version": "1.4.1",
      /**
       * An object of methods to convert from JavaScript's internal character
       * representation (UCS-2) to Unicode code points, and back.
       * @see <https://mathiasbynens.be/notes/javascript-encoding>
       * @memberOf punycode
       * @type Object
       */
      "ucs2": {
        "decode": ucs2decode,
        "encode": ucs2encode
      },
      "decode": decode2,
      "encode": encode2,
      "toASCII": toASCII,
      "toUnicode": toUnicode
    };
    if (freeExports && freeModule) {
      if (module.exports == freeExports) {
        freeModule.exports = punycode2;
      } else {
        for (key2 in punycode2) {
          punycode2.hasOwnProperty(key2) && (freeExports[key2] = punycode2[key2]);
        }
      }
    } else {
      root.punycode = punycode2;
    }
  })(commonjsGlobal);
})(punycode, punycode.exports);
var punycodeExports = punycode.exports;
var querystring = { exports: {} };
var querystringEs3 = {};
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
var decode = function(qs, sep, eq, options) {
  sep = sep || "&";
  eq = eq || "=";
  var obj = {};
  if (typeof qs !== "string" || qs.length === 0) {
    return obj;
  }
  var regexp = /\+/g;
  qs = qs.split(sep);
  var maxKeys = 1e3;
  if (options && typeof options.maxKeys === "number") {
    maxKeys = options.maxKeys;
  }
  var len = qs.length;
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }
  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, "%20"), idx = x.indexOf(eq), kstr, vstr, k, v;
    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = "";
    }
    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);
    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray$1(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }
  return obj;
};
var isArray$1 = Array.isArray || function(xs) {
  return Object.prototype.toString.call(xs) === "[object Array]";
};
var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case "string":
      return v;
    case "boolean":
      return v ? "true" : "false";
    case "number":
      return isFinite(v) ? v : "";
    default:
      return "";
  }
};
var encode = function(obj, sep, eq, name2) {
  sep = sep || "&";
  eq = eq || "=";
  if (obj === null) {
    obj = void 0;
  }
  if (typeof obj === "object") {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);
  }
  if (!name2)
    return "";
  return encodeURIComponent(stringifyPrimitive(name2)) + eq + encodeURIComponent(stringifyPrimitive(obj));
};
var isArray = Array.isArray || function(xs) {
  return Object.prototype.toString.call(xs) === "[object Array]";
};
function map(xs, f) {
  if (xs.map)
    return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}
var objectKeys = Object.keys || function(obj) {
  var res = [];
  for (var key2 in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key2))
      res.push(key2);
  }
  return res;
};
querystringEs3.decode = querystringEs3.parse = decode;
querystringEs3.encode = querystringEs3.stringify = encode;
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var querystringEs3$1 = querystringEs3;
  function qsEscape(string) {
    return encodeURIComponent(string);
  }
  function qsUnescape(string) {
    return decodeURIComponent(string);
  }
  var api2 = {
    decode: querystringEs3$1.decode,
    encode: querystringEs3$1.encode,
    parse: querystringEs3$1.parse,
    stringify: querystringEs3$1.stringify,
    escape: qsEscape,
    unescape: qsUnescape
  };
  Object.defineProperty(exports, "decode", {
    enumerable: true,
    get: function() {
      return querystringEs3$1.decode;
    }
  });
  Object.defineProperty(exports, "encode", {
    enumerable: true,
    get: function() {
      return querystringEs3$1.encode;
    }
  });
  Object.defineProperty(exports, "parse", {
    enumerable: true,
    get: function() {
      return querystringEs3$1.parse;
    }
  });
  Object.defineProperty(exports, "stringify", {
    enumerable: true,
    get: function() {
      return querystringEs3$1.stringify;
    }
  });
  exports["default"] = api2;
  exports.escape = qsEscape;
  exports.unescape = qsUnescape;
  exports = module.exports = api2;
})(querystring, querystring.exports);
var querystringExports = querystring.exports;
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var require$$02 = punycodeExports;
  var require$$22 = querystringExports;
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : { "default": e };
  }
  var require$$0__default = /* @__PURE__ */ _interopDefaultLegacy(require$$02);
  var require$$2__default = /* @__PURE__ */ _interopDefaultLegacy(require$$22);
  var util$1 = {
    isString: function(arg) {
      return typeof arg === "string";
    },
    isObject: function(arg) {
      return typeof arg === "object" && arg !== null;
    },
    isNull: function(arg) {
      return arg === null;
    },
    isNullOrUndefined: function(arg) {
      return arg == null;
    }
  };
  var punycode2 = require$$0__default["default"];
  var util2 = util$1;
  var parse = urlParse;
  var resolve$1 = urlResolve;
  var resolveObject = urlResolveObject;
  var format = urlFormat;
  var Url_1 = Url;
  function Url() {
    this.protocol = null;
    this.slashes = null;
    this.auth = null;
    this.host = null;
    this.port = null;
    this.hostname = null;
    this.hash = null;
    this.search = null;
    this.query = null;
    this.pathname = null;
    this.path = null;
    this.href = null;
  }
  var protocolPattern = /^([a-z0-9.+-]+:)/i, portPattern = /:[0-9]*$/, simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, delims = ["<", ">", '"', "`", " ", "\r", "\n", "	"], unwise = ["{", "}", "|", "\\", "^", "`"].concat(delims), autoEscape = ["'"].concat(unwise), nonHostChars = ["%", "/", "?", ";", "#"].concat(autoEscape), hostEndingChars = ["/", "?", "#"], hostnameMaxLen = 255, hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/, hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, unsafeProtocol = {
    "javascript": true,
    "javascript:": true
  }, hostlessProtocol = {
    "javascript": true,
    "javascript:": true
  }, slashedProtocol = {
    "http": true,
    "https": true,
    "ftp": true,
    "gopher": true,
    "file": true,
    "http:": true,
    "https:": true,
    "ftp:": true,
    "gopher:": true,
    "file:": true
  }, querystring2 = require$$2__default["default"];
  function urlParse(url2, parseQueryString, slashesDenoteHost) {
    if (url2 && util2.isObject(url2) && url2 instanceof Url)
      return url2;
    var u = new Url();
    u.parse(url2, parseQueryString, slashesDenoteHost);
    return u;
  }
  Url.prototype.parse = function(url2, parseQueryString, slashesDenoteHost) {
    if (!util2.isString(url2)) {
      throw new TypeError("Parameter 'url' must be a string, not " + typeof url2);
    }
    var queryIndex = url2.indexOf("?"), splitter = queryIndex !== -1 && queryIndex < url2.indexOf("#") ? "?" : "#", uSplit = url2.split(splitter), slashRegex = /\\/g;
    uSplit[0] = uSplit[0].replace(slashRegex, "/");
    url2 = uSplit.join(splitter);
    var rest = url2;
    rest = rest.trim();
    if (!slashesDenoteHost && url2.split("#").length === 1) {
      var simplePath = simplePathPattern.exec(rest);
      if (simplePath) {
        this.path = rest;
        this.href = rest;
        this.pathname = simplePath[1];
        if (simplePath[2]) {
          this.search = simplePath[2];
          if (parseQueryString) {
            this.query = querystring2.parse(this.search.substr(1));
          } else {
            this.query = this.search.substr(1);
          }
        } else if (parseQueryString) {
          this.search = "";
          this.query = {};
        }
        return this;
      }
    }
    var proto = protocolPattern.exec(rest);
    if (proto) {
      proto = proto[0];
      var lowerProto = proto.toLowerCase();
      this.protocol = lowerProto;
      rest = rest.substr(proto.length);
    }
    if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
      var slashes = rest.substr(0, 2) === "//";
      if (slashes && !(proto && hostlessProtocol[proto])) {
        rest = rest.substr(2);
        this.slashes = true;
      }
    }
    if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
      var hostEnd = -1;
      for (var i = 0; i < hostEndingChars.length; i++) {
        var hec = rest.indexOf(hostEndingChars[i]);
        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
          hostEnd = hec;
      }
      var auth, atSign;
      if (hostEnd === -1) {
        atSign = rest.lastIndexOf("@");
      } else {
        atSign = rest.lastIndexOf("@", hostEnd);
      }
      if (atSign !== -1) {
        auth = rest.slice(0, atSign);
        rest = rest.slice(atSign + 1);
        this.auth = decodeURIComponent(auth);
      }
      hostEnd = -1;
      for (var i = 0; i < nonHostChars.length; i++) {
        var hec = rest.indexOf(nonHostChars[i]);
        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
          hostEnd = hec;
      }
      if (hostEnd === -1)
        hostEnd = rest.length;
      this.host = rest.slice(0, hostEnd);
      rest = rest.slice(hostEnd);
      this.parseHost();
      this.hostname = this.hostname || "";
      var ipv6Hostname = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
      if (!ipv6Hostname) {
        var hostparts = this.hostname.split(/\./);
        for (var i = 0, l = hostparts.length; i < l; i++) {
          var part = hostparts[i];
          if (!part)
            continue;
          if (!part.match(hostnamePartPattern)) {
            var newpart = "";
            for (var j = 0, k = part.length; j < k; j++) {
              if (part.charCodeAt(j) > 127) {
                newpart += "x";
              } else {
                newpart += part[j];
              }
            }
            if (!newpart.match(hostnamePartPattern)) {
              var validParts = hostparts.slice(0, i);
              var notHost = hostparts.slice(i + 1);
              var bit = part.match(hostnamePartStart);
              if (bit) {
                validParts.push(bit[1]);
                notHost.unshift(bit[2]);
              }
              if (notHost.length) {
                rest = "/" + notHost.join(".") + rest;
              }
              this.hostname = validParts.join(".");
              break;
            }
          }
        }
      }
      if (this.hostname.length > hostnameMaxLen) {
        this.hostname = "";
      } else {
        this.hostname = this.hostname.toLowerCase();
      }
      if (!ipv6Hostname) {
        this.hostname = punycode2.toASCII(this.hostname);
      }
      var p = this.port ? ":" + this.port : "";
      var h = this.hostname || "";
      this.host = h + p;
      this.href += this.host;
      if (ipv6Hostname) {
        this.hostname = this.hostname.substr(1, this.hostname.length - 2);
        if (rest[0] !== "/") {
          rest = "/" + rest;
        }
      }
    }
    if (!unsafeProtocol[lowerProto]) {
      for (var i = 0, l = autoEscape.length; i < l; i++) {
        var ae = autoEscape[i];
        if (rest.indexOf(ae) === -1)
          continue;
        var esc = encodeURIComponent(ae);
        if (esc === ae) {
          esc = escape(ae);
        }
        rest = rest.split(ae).join(esc);
      }
    }
    var hash2 = rest.indexOf("#");
    if (hash2 !== -1) {
      this.hash = rest.substr(hash2);
      rest = rest.slice(0, hash2);
    }
    var qm = rest.indexOf("?");
    if (qm !== -1) {
      this.search = rest.substr(qm);
      this.query = rest.substr(qm + 1);
      if (parseQueryString) {
        this.query = querystring2.parse(this.query);
      }
      rest = rest.slice(0, qm);
    } else if (parseQueryString) {
      this.search = "";
      this.query = {};
    }
    if (rest)
      this.pathname = rest;
    if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
      this.pathname = "/";
    }
    if (this.pathname || this.search) {
      var p = this.pathname || "";
      var s = this.search || "";
      this.path = p + s;
    }
    this.href = this.format();
    return this;
  };
  function urlFormat(obj) {
    if (util2.isString(obj))
      obj = urlParse(obj);
    if (!(obj instanceof Url))
      return Url.prototype.format.call(obj);
    return obj.format();
  }
  Url.prototype.format = function() {
    var auth = this.auth || "";
    if (auth) {
      auth = encodeURIComponent(auth);
      auth = auth.replace(/%3A/i, ":");
      auth += "@";
    }
    var protocol = this.protocol || "", pathname = this.pathname || "", hash2 = this.hash || "", host = false, query = "";
    if (this.host) {
      host = auth + this.host;
    } else if (this.hostname) {
      host = auth + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]");
      if (this.port) {
        host += ":" + this.port;
      }
    }
    if (this.query && util2.isObject(this.query) && Object.keys(this.query).length) {
      query = querystring2.stringify(this.query);
    }
    var search2 = this.search || query && "?" + query || "";
    if (protocol && protocol.substr(-1) !== ":")
      protocol += ":";
    if (this.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {
      host = "//" + (host || "");
      if (pathname && pathname.charAt(0) !== "/")
        pathname = "/" + pathname;
    } else if (!host) {
      host = "";
    }
    if (hash2 && hash2.charAt(0) !== "#")
      hash2 = "#" + hash2;
    if (search2 && search2.charAt(0) !== "?")
      search2 = "?" + search2;
    pathname = pathname.replace(/[?#]/g, function(match) {
      return encodeURIComponent(match);
    });
    search2 = search2.replace("#", "%23");
    return protocol + host + pathname + search2 + hash2;
  };
  function urlResolve(source, relative) {
    return urlParse(source, false, true).resolve(relative);
  }
  Url.prototype.resolve = function(relative) {
    return this.resolveObject(urlParse(relative, false, true)).format();
  };
  function urlResolveObject(source, relative) {
    if (!source)
      return relative;
    return urlParse(source, false, true).resolveObject(relative);
  }
  Url.prototype.resolveObject = function(relative) {
    if (util2.isString(relative)) {
      var rel = new Url();
      rel.parse(relative, false, true);
      relative = rel;
    }
    var result = new Url();
    var tkeys = Object.keys(this);
    for (var tk = 0; tk < tkeys.length; tk++) {
      var tkey = tkeys[tk];
      result[tkey] = this[tkey];
    }
    result.hash = relative.hash;
    if (relative.href === "") {
      result.href = result.format();
      return result;
    }
    if (relative.slashes && !relative.protocol) {
      var rkeys = Object.keys(relative);
      for (var rk = 0; rk < rkeys.length; rk++) {
        var rkey = rkeys[rk];
        if (rkey !== "protocol")
          result[rkey] = relative[rkey];
      }
      if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {
        result.path = result.pathname = "/";
      }
      result.href = result.format();
      return result;
    }
    if (relative.protocol && relative.protocol !== result.protocol) {
      if (!slashedProtocol[relative.protocol]) {
        var keys = Object.keys(relative);
        for (var v = 0; v < keys.length; v++) {
          var k = keys[v];
          result[k] = relative[k];
        }
        result.href = result.format();
        return result;
      }
      result.protocol = relative.protocol;
      if (!relative.host && !hostlessProtocol[relative.protocol]) {
        var relPath = (relative.pathname || "").split("/");
        while (relPath.length && !(relative.host = relPath.shift()))
          ;
        if (!relative.host)
          relative.host = "";
        if (!relative.hostname)
          relative.hostname = "";
        if (relPath[0] !== "")
          relPath.unshift("");
        if (relPath.length < 2)
          relPath.unshift("");
        result.pathname = relPath.join("/");
      } else {
        result.pathname = relative.pathname;
      }
      result.search = relative.search;
      result.query = relative.query;
      result.host = relative.host || "";
      result.auth = relative.auth;
      result.hostname = relative.hostname || relative.host;
      result.port = relative.port;
      if (result.pathname || result.search) {
        var p = result.pathname || "";
        var s = result.search || "";
        result.path = p + s;
      }
      result.slashes = result.slashes || relative.slashes;
      result.href = result.format();
      return result;
    }
    var isSourceAbs = result.pathname && result.pathname.charAt(0) === "/", isRelAbs = relative.host || relative.pathname && relative.pathname.charAt(0) === "/", mustEndAbs = isRelAbs || isSourceAbs || result.host && relative.pathname, removeAllDots = mustEndAbs, srcPath = result.pathname && result.pathname.split("/") || [], relPath = relative.pathname && relative.pathname.split("/") || [], psychotic = result.protocol && !slashedProtocol[result.protocol];
    if (psychotic) {
      result.hostname = "";
      result.port = null;
      if (result.host) {
        if (srcPath[0] === "")
          srcPath[0] = result.host;
        else
          srcPath.unshift(result.host);
      }
      result.host = "";
      if (relative.protocol) {
        relative.hostname = null;
        relative.port = null;
        if (relative.host) {
          if (relPath[0] === "")
            relPath[0] = relative.host;
          else
            relPath.unshift(relative.host);
        }
        relative.host = null;
      }
      mustEndAbs = mustEndAbs && (relPath[0] === "" || srcPath[0] === "");
    }
    if (isRelAbs) {
      result.host = relative.host || relative.host === "" ? relative.host : result.host;
      result.hostname = relative.hostname || relative.hostname === "" ? relative.hostname : result.hostname;
      result.search = relative.search;
      result.query = relative.query;
      srcPath = relPath;
    } else if (relPath.length) {
      if (!srcPath)
        srcPath = [];
      srcPath.pop();
      srcPath = srcPath.concat(relPath);
      result.search = relative.search;
      result.query = relative.query;
    } else if (!util2.isNullOrUndefined(relative.search)) {
      if (psychotic) {
        result.hostname = result.host = srcPath.shift();
        var authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
        if (authInHost) {
          result.auth = authInHost.shift();
          result.host = result.hostname = authInHost.shift();
        }
      }
      result.search = relative.search;
      result.query = relative.query;
      if (!util2.isNull(result.pathname) || !util2.isNull(result.search)) {
        result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
      }
      result.href = result.format();
      return result;
    }
    if (!srcPath.length) {
      result.pathname = null;
      if (result.search) {
        result.path = "/" + result.search;
      } else {
        result.path = null;
      }
      result.href = result.format();
      return result;
    }
    var last = srcPath.slice(-1)[0];
    var hasTrailingSlash = (result.host || relative.host || srcPath.length > 1) && (last === "." || last === "..") || last === "";
    var up = 0;
    for (var i = srcPath.length; i >= 0; i--) {
      last = srcPath[i];
      if (last === ".") {
        srcPath.splice(i, 1);
      } else if (last === "..") {
        srcPath.splice(i, 1);
        up++;
      } else if (up) {
        srcPath.splice(i, 1);
        up--;
      }
    }
    if (!mustEndAbs && !removeAllDots) {
      for (; up--; up) {
        srcPath.unshift("..");
      }
    }
    if (mustEndAbs && srcPath[0] !== "" && (!srcPath[0] || srcPath[0].charAt(0) !== "/")) {
      srcPath.unshift("");
    }
    if (hasTrailingSlash && srcPath.join("/").substr(-1) !== "/") {
      srcPath.push("");
    }
    var isAbsolute = srcPath[0] === "" || srcPath[0] && srcPath[0].charAt(0) === "/";
    if (psychotic) {
      result.hostname = result.host = isAbsolute ? "" : srcPath.length ? srcPath.shift() : "";
      var authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    mustEndAbs = mustEndAbs || result.host && srcPath.length;
    if (mustEndAbs && !isAbsolute) {
      srcPath.unshift("");
    }
    if (!srcPath.length) {
      result.pathname = null;
      result.path = null;
    } else {
      result.pathname = srcPath.join("/");
    }
    if (!util2.isNull(result.pathname) || !util2.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
    }
    result.auth = relative.auth || result.auth;
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  };
  Url.prototype.parseHost = function() {
    var host = this.host;
    var port = portPattern.exec(host);
    if (port) {
      port = port[0];
      if (port !== ":") {
        this.port = port.substr(1);
      }
      host = host.substr(0, host.length - port.length);
    }
    if (host)
      this.hostname = host;
  };
  function normalizeArray(parts, allowAboveRoot) {
    var up = 0;
    for (var i = parts.length - 1; i >= 0; i--) {
      var last = parts[i];
      if (last === ".") {
        parts.splice(i, 1);
      } else if (last === "..") {
        parts.splice(i, 1);
        up++;
      } else if (up) {
        parts.splice(i, 1);
        up--;
      }
    }
    if (allowAboveRoot) {
      for (; up--; up) {
        parts.unshift("..");
      }
    }
    return parts;
  }
  function resolve() {
    var resolvedPath = "", resolvedAbsolute = false;
    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path = i >= 0 ? arguments[i] : "/";
      if (typeof path !== "string") {
        throw new TypeError("Arguments to path.resolve must be strings");
      } else if (!path) {
        continue;
      }
      resolvedPath = path + "/" + resolvedPath;
      resolvedAbsolute = path.charAt(0) === "/";
    }
    resolvedPath = normalizeArray(filter(resolvedPath.split("/"), function(p) {
      return !!p;
    }), !resolvedAbsolute).join("/");
    return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
  }
  function filter(xs, f) {
    if (xs.filter)
      return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
      if (f(xs[i], i, xs))
        res.push(xs[i]);
    }
    return res;
  }
  var _globalThis = function(Object2) {
    function get() {
      var _global2 = this || self;
      delete Object2.prototype.__magic__;
      return _global2;
    }
    if (typeof globalThis === "object") {
      return globalThis;
    }
    if (this) {
      return get();
    } else {
      Object2.defineProperty(Object2.prototype, "__magic__", {
        configurable: true,
        get
      });
      var _global = __magic__;
      return _global;
    }
  }(Object);
  var formatImport = (
    /** @type {formatImport}*/
    format
  );
  var parseImport = (
    /** @type {parseImport}*/
    parse
  );
  var resolveImport = (
    /** @type {resolveImport}*/
    resolve$1
  );
  var UrlImport = (
    /** @type {UrlImport}*/
    Url_1
  );
  var URL = _globalThis.URL;
  var URLSearchParams = _globalThis.URLSearchParams;
  var percentRegEx = /%/g;
  var backslashRegEx = /\\/g;
  var newlineRegEx = /\n/g;
  var carriageReturnRegEx = /\r/g;
  var tabRegEx = /\t/g;
  var CHAR_FORWARD_SLASH = 47;
  function isURLInstance(instance) {
    var resolved = (
      /** @type {URL|null} */
      instance != null ? instance : null
    );
    return Boolean(resolved !== null && (resolved == null ? void 0 : resolved.href) && (resolved == null ? void 0 : resolved.origin));
  }
  function getPathFromURLPosix(url2) {
    if (url2.hostname !== "") {
      throw new TypeError('File URL host must be "localhost" or empty on browser');
    }
    var pathname = url2.pathname;
    for (var n = 0; n < pathname.length; n++) {
      if (pathname[n] === "%") {
        var third = pathname.codePointAt(n + 2) | 32;
        if (pathname[n + 1] === "2" && third === 102) {
          throw new TypeError("File URL path must not include encoded / characters");
        }
      }
    }
    return decodeURIComponent(pathname);
  }
  function encodePathChars(filepath) {
    if (filepath.includes("%")) {
      filepath = filepath.replace(percentRegEx, "%25");
    }
    if (filepath.includes("\\")) {
      filepath = filepath.replace(backslashRegEx, "%5C");
    }
    if (filepath.includes("\n")) {
      filepath = filepath.replace(newlineRegEx, "%0A");
    }
    if (filepath.includes("\r")) {
      filepath = filepath.replace(carriageReturnRegEx, "%0D");
    }
    if (filepath.includes("	")) {
      filepath = filepath.replace(tabRegEx, "%09");
    }
    return filepath;
  }
  var domainToASCII = (
    /**
     * @type {domainToASCII}
     */
    function domainToASCII2(domain) {
      if (typeof domain === "undefined") {
        throw new TypeError('The "domain" argument must be specified');
      }
      return new URL("http://" + domain).hostname;
    }
  );
  var domainToUnicode = (
    /**
     * @type {domainToUnicode}
     */
    function domainToUnicode2(domain) {
      if (typeof domain === "undefined") {
        throw new TypeError('The "domain" argument must be specified');
      }
      return new URL("http://" + domain).hostname;
    }
  );
  var pathToFileURL = (
    /**
     * @type {(url: string) => URL}
     */
    function pathToFileURL2(filepath) {
      var outURL = new URL("file://");
      var resolved = resolve(filepath);
      var filePathLast = filepath.charCodeAt(filepath.length - 1);
      if (filePathLast === CHAR_FORWARD_SLASH && resolved[resolved.length - 1] !== "/") {
        resolved += "/";
      }
      outURL.pathname = encodePathChars(resolved);
      return outURL;
    }
  );
  var fileURLToPath = (
    /**
     * @type {fileURLToPath & ((path: string | URL) => string)}
     */
    function fileURLToPath2(path) {
      if (!isURLInstance(path) && typeof path !== "string") {
        throw new TypeError('The "path" argument must be of type string or an instance of URL. Received type ' + typeof path + " (" + path + ")");
      }
      var resolved = new URL(path);
      if (resolved.protocol !== "file:") {
        throw new TypeError("The URL must be of scheme file");
      }
      return getPathFromURLPosix(resolved);
    }
  );
  var formatImportWithOverloads = (
    /**
     * @type {(
     *   ((urlObject: URL, options?: URLFormatOptions) => string) &
     *   ((urlObject: UrlObject | string, options?: never) => string)
     * )}
     */
    function formatImportWithOverloads2(urlObject, options) {
      var _options$auth, _options$fragment, _options$search;
      if (options === void 0) {
        options = {};
      }
      if (!(urlObject instanceof URL)) {
        return formatImport(urlObject);
      }
      if (typeof options !== "object" || options === null) {
        throw new TypeError('The "options" argument must be of type object.');
      }
      var auth = (_options$auth = options.auth) != null ? _options$auth : true;
      var fragment = (_options$fragment = options.fragment) != null ? _options$fragment : true;
      var search2 = (_options$search = options.search) != null ? _options$search : true;
      var parsed = new URL(urlObject.toString());
      if (!auth) {
        parsed.username = "";
        parsed.password = "";
      }
      if (!fragment) {
        parsed.hash = "";
      }
      if (!search2) {
        parsed.search = "";
      }
      return parsed.toString();
    }
  );
  var api2 = {
    format: formatImportWithOverloads,
    parse: parseImport,
    resolve: resolveImport,
    resolveObject,
    Url: UrlImport,
    URL,
    URLSearchParams,
    domainToASCII,
    domainToUnicode,
    pathToFileURL,
    fileURLToPath
  };
  exports.URL = URL;
  exports.URLSearchParams = URLSearchParams;
  exports.Url = UrlImport;
  exports["default"] = api2;
  exports.domainToASCII = domainToASCII;
  exports.domainToUnicode = domainToUnicode;
  exports.fileURLToPath = fileURLToPath;
  exports.format = formatImportWithOverloads;
  exports.parse = parseImport;
  exports.pathToFileURL = pathToFileURL;
  exports.resolve = resolveImport;
  exports.resolveObject = resolveObject;
  exports = module.exports = api2;
})(url, url.exports);
var urlExports = url.exports;
var hasRequiredStreamHttp;
function requireStreamHttp() {
  if (hasRequiredStreamHttp)
    return streamHttp;
  hasRequiredStreamHttp = 1;
  (function(exports) {
    var ClientRequest2 = requestExports;
    var response2 = response$1;
    var extend2 = immutable;
    var statusCodes = requireBuiltinStatusCodes();
    var url2 = urlExports;
    var http2 = exports;
    http2.request = function(opts, cb) {
      if (typeof opts === "string")
        opts = url2.parse(opts);
      else
        opts = extend2(opts);
      var defaultProtocol = commonjsGlobal.location.protocol.search(/^https?:$/) === -1 ? "http:" : "";
      var protocol = opts.protocol || defaultProtocol;
      var host = opts.hostname || opts.host;
      var port = opts.port;
      var path = opts.path || "/";
      if (host && host.indexOf(":") !== -1)
        host = "[" + host + "]";
      opts.url = (host ? protocol + "//" + host : "") + (port ? ":" + port : "") + path;
      opts.method = (opts.method || "GET").toUpperCase();
      opts.headers = opts.headers || {};
      var req = new ClientRequest2(opts);
      if (cb)
        req.on("response", cb);
      return req;
    };
    http2.get = function get(opts, cb) {
      var req = http2.request(opts, cb);
      req.end();
      return req;
    };
    http2.ClientRequest = ClientRequest2;
    http2.IncomingMessage = response2.IncomingMessage;
    http2.Agent = function() {
    };
    http2.Agent.defaultMaxSockets = 4;
    http2.globalAgent = new http2.Agent();
    http2.STATUS_CODES = statusCodes;
    http2.METHODS = [
      "CHECKOUT",
      "CONNECT",
      "COPY",
      "DELETE",
      "GET",
      "HEAD",
      "LOCK",
      "M-SEARCH",
      "MERGE",
      "MKACTIVITY",
      "MKCOL",
      "MOVE",
      "NOTIFY",
      "OPTIONS",
      "PATCH",
      "POST",
      "PROPFIND",
      "PROPPATCH",
      "PURGE",
      "PUT",
      "REPORT",
      "SEARCH",
      "SUBSCRIBE",
      "TRACE",
      "UNLOCK",
      "UNSUBSCRIBE"
    ];
  })(streamHttp);
  return streamHttp;
}
var streamHttpExports = requireStreamHttp();
const index$1 = /* @__PURE__ */ getDefaultExportFromCjs(streamHttpExports);
const http = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: index$1
}, [streamHttpExports]);
var httpsBrowserify = { exports: {} };
(function(module) {
  var http2 = requireStreamHttp();
  var url2 = urlExports;
  var https2 = module.exports;
  for (var key2 in http2) {
    if (http2.hasOwnProperty(key2))
      https2[key2] = http2[key2];
  }
  https2.request = function(params, cb) {
    params = validateParams(params);
    return http2.request.call(this, params, cb);
  };
  https2.get = function(params, cb) {
    params = validateParams(params);
    return http2.get.call(this, params, cb);
  };
  function validateParams(params) {
    if (typeof params === "string") {
      params = url2.parse(params);
    }
    if (!params.protocol) {
      params.protocol = "https:";
    }
    if (params.protocol !== "https:") {
      throw new Error('Protocol "' + params.protocol + '" not supported. Expected "https:"');
    }
    return params;
  }
})(httpsBrowserify);
var httpsBrowserifyExports = httpsBrowserify.exports;
const index = /* @__PURE__ */ getDefaultExportFromCjs(httpsBrowserifyExports);
const https = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: index
}, [httpsBrowserifyExports]);
const agentOptions = { keepAlive: true };
const defaultHttpAgent = new streamHttpExports.Agent(agentOptions);
const defaultHttpsAgent = new httpsBrowserifyExports.Agent(agentOptions);
function createNodeHttpRequester({ agent: userGlobalAgent, httpAgent: userHttpAgent, httpsAgent: userHttpsAgent, requesterOptions = {} } = {}) {
  const httpAgent = userHttpAgent || userGlobalAgent || defaultHttpAgent;
  const httpsAgent = userHttpsAgent || userGlobalAgent || defaultHttpsAgent;
  return {
    send(request2) {
      return new Promise((resolve) => {
        const url2 = urlExports.parse(request2.url);
        const path = url2.query === null ? url2.pathname : `${url2.pathname}?${url2.query}`;
        const options = {
          ...requesterOptions,
          agent: url2.protocol === "https:" ? httpsAgent : httpAgent,
          hostname: url2.hostname,
          path,
          method: request2.method,
          headers: {
            ...requesterOptions && requesterOptions.headers ? requesterOptions.headers : {},
            ...request2.headers
          },
          ...url2.port !== void 0 ? { port: url2.port || "" } : {}
        };
        const req = (url2.protocol === "https:" ? https : http).request(options, (response2) => {
          let contentBuffers = [];
          response2.on("data", (chunk) => {
            contentBuffers = contentBuffers.concat(chunk);
          });
          response2.on("end", () => {
            clearTimeout(connectTimeout);
            clearTimeout(responseTimeout);
            resolve({
              status: response2.statusCode || 0,
              content: buffer$1.Buffer.concat(contentBuffers).toString(),
              isTimedOut: false
            });
          });
        });
        const createTimeout = (timeout, content) => {
          return setTimeout(() => {
            req.abort();
            resolve({
              status: 0,
              content,
              isTimedOut: true
            });
          }, timeout * 1e3);
        };
        const connectTimeout = createTimeout(request2.connectTimeout, "Connection timeout");
        let responseTimeout;
        req.on("error", (error) => {
          clearTimeout(connectTimeout);
          clearTimeout(responseTimeout);
          resolve({ status: 0, content: error.message, isTimedOut: false });
        });
        req.once("response", () => {
          clearTimeout(connectTimeout);
          responseTimeout = createTimeout(request2.responseTimeout, "Socket timeout");
        });
        if (request2.data !== void 0) {
          req.write(request2.data);
        }
        req.end();
      });
    },
    destroy() {
      httpAgent.destroy();
      httpsAgent.destroy();
      return Promise.resolve();
    }
  };
}
const requesterNodeHttp_esm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createNodeHttpRequester
}, Symbol.toStringTag, { value: "Module" }));
const require$$7 = /* @__PURE__ */ getAugmentedNamespace(requesterNodeHttp_esm);
const require$$8 = /* @__PURE__ */ getAugmentedNamespace(transporter_esm);
var cacheCommon = require$$0$2;
var cacheInMemory = require$$1$1;
var clientAnalytics = require$$2;
var clientCommon = require$$3;
var clientPersonalization = require$$4;
var clientSearch = require$$5;
var loggerCommon = require$$6;
var requesterNodeHttp = require$$7;
var transporter = require$$8;
function algoliasearch$2(appId, apiKey, options) {
  const commonOptions = {
    appId,
    apiKey,
    timeouts: {
      connect: 2,
      read: 5,
      write: 30
    },
    requester: requesterNodeHttp.createNodeHttpRequester(),
    logger: loggerCommon.createNullLogger(),
    responsesCache: cacheCommon.createNullCache(),
    requestsCache: cacheCommon.createNullCache(),
    hostsCache: cacheInMemory.createInMemoryCache(),
    userAgent: transporter.createUserAgent(clientCommon.version).add({
      segment: "Node.js",
      version: process.versions.node
    })
  };
  const searchClientOptions = { ...commonOptions, ...options };
  const initPersonalization = () => (clientOptions) => {
    return clientPersonalization.createPersonalizationClient({
      ...commonOptions,
      ...clientOptions,
      methods: {
        getPersonalizationStrategy: clientPersonalization.getPersonalizationStrategy,
        setPersonalizationStrategy: clientPersonalization.setPersonalizationStrategy
      }
    });
  };
  return clientSearch.createSearchClient({
    ...searchClientOptions,
    methods: {
      search: clientSearch.multipleQueries,
      searchForFacetValues: clientSearch.multipleSearchForFacetValues,
      multipleBatch: clientSearch.multipleBatch,
      multipleGetObjects: clientSearch.multipleGetObjects,
      multipleQueries: clientSearch.multipleQueries,
      copyIndex: clientSearch.copyIndex,
      copySettings: clientSearch.copySettings,
      copyRules: clientSearch.copyRules,
      copySynonyms: clientSearch.copySynonyms,
      moveIndex: clientSearch.moveIndex,
      listIndices: clientSearch.listIndices,
      getLogs: clientSearch.getLogs,
      listClusters: clientSearch.listClusters,
      multipleSearchForFacetValues: clientSearch.multipleSearchForFacetValues,
      getApiKey: clientSearch.getApiKey,
      addApiKey: clientSearch.addApiKey,
      listApiKeys: clientSearch.listApiKeys,
      updateApiKey: clientSearch.updateApiKey,
      deleteApiKey: clientSearch.deleteApiKey,
      restoreApiKey: clientSearch.restoreApiKey,
      assignUserID: clientSearch.assignUserID,
      assignUserIDs: clientSearch.assignUserIDs,
      getUserID: clientSearch.getUserID,
      searchUserIDs: clientSearch.searchUserIDs,
      listUserIDs: clientSearch.listUserIDs,
      getTopUserIDs: clientSearch.getTopUserIDs,
      removeUserID: clientSearch.removeUserID,
      hasPendingMappings: clientSearch.hasPendingMappings,
      generateSecuredApiKey: clientSearch.generateSecuredApiKey,
      getSecuredApiKeyRemainingValidity: clientSearch.getSecuredApiKeyRemainingValidity,
      destroy: clientCommon.destroy,
      clearDictionaryEntries: clientSearch.clearDictionaryEntries,
      deleteDictionaryEntries: clientSearch.deleteDictionaryEntries,
      getDictionarySettings: clientSearch.getDictionarySettings,
      getAppTask: clientSearch.getAppTask,
      replaceDictionaryEntries: clientSearch.replaceDictionaryEntries,
      saveDictionaryEntries: clientSearch.saveDictionaryEntries,
      searchDictionaryEntries: clientSearch.searchDictionaryEntries,
      setDictionarySettings: clientSearch.setDictionarySettings,
      waitAppTask: clientSearch.waitAppTask,
      customRequest: clientSearch.customRequest,
      initIndex: (base2) => (indexName) => {
        return clientSearch.initIndex(base2)(indexName, {
          methods: {
            batch: clientSearch.batch,
            delete: clientSearch.deleteIndex,
            findAnswers: clientSearch.findAnswers,
            getObject: clientSearch.getObject,
            getObjects: clientSearch.getObjects,
            saveObject: clientSearch.saveObject,
            saveObjects: clientSearch.saveObjects,
            search: clientSearch.search,
            searchForFacetValues: clientSearch.searchForFacetValues,
            waitTask: clientSearch.waitTask,
            setSettings: clientSearch.setSettings,
            getSettings: clientSearch.getSettings,
            partialUpdateObject: clientSearch.partialUpdateObject,
            partialUpdateObjects: clientSearch.partialUpdateObjects,
            deleteObject: clientSearch.deleteObject,
            deleteObjects: clientSearch.deleteObjects,
            deleteBy: clientSearch.deleteBy,
            clearObjects: clientSearch.clearObjects,
            browseObjects: clientSearch.browseObjects,
            getObjectPosition: clientSearch.getObjectPosition,
            findObject: clientSearch.findObject,
            exists: clientSearch.exists,
            saveSynonym: clientSearch.saveSynonym,
            saveSynonyms: clientSearch.saveSynonyms,
            getSynonym: clientSearch.getSynonym,
            searchSynonyms: clientSearch.searchSynonyms,
            browseSynonyms: clientSearch.browseSynonyms,
            deleteSynonym: clientSearch.deleteSynonym,
            clearSynonyms: clientSearch.clearSynonyms,
            replaceAllObjects: clientSearch.replaceAllObjects,
            replaceAllSynonyms: clientSearch.replaceAllSynonyms,
            searchRules: clientSearch.searchRules,
            getRule: clientSearch.getRule,
            deleteRule: clientSearch.deleteRule,
            saveRule: clientSearch.saveRule,
            saveRules: clientSearch.saveRules,
            replaceAllRules: clientSearch.replaceAllRules,
            browseRules: clientSearch.browseRules,
            clearRules: clientSearch.clearRules
          }
        });
      },
      initAnalytics: () => (clientOptions) => {
        return clientAnalytics.createAnalyticsClient({
          ...commonOptions,
          ...clientOptions,
          methods: {
            addABTest: clientAnalytics.addABTest,
            getABTest: clientAnalytics.getABTest,
            getABTests: clientAnalytics.getABTests,
            stopABTest: clientAnalytics.stopABTest,
            deleteABTest: clientAnalytics.deleteABTest
          }
        });
      },
      initPersonalization,
      initRecommendation: () => (clientOptions) => {
        searchClientOptions.logger.info("The `initRecommendation` method is deprecated. Use `initPersonalization` instead.");
        return initPersonalization()(clientOptions);
      }
    }
  });
}
algoliasearch$2.version = clientCommon.version;
var algoliasearch_cjs = algoliasearch$2;
const algoliasearch$1 = algoliasearch_cjs;
algoliasearch$3.exports = algoliasearch$1;
algoliasearch$3.exports.default = algoliasearch$1;
var algoliasearchExports = algoliasearch$3.exports;
var lite = algoliasearchExports;
const algoliasearch = /* @__PURE__ */ getDefaultExportFromCjs(lite);
const APP_ID = public_env.PUBLIC_ALGOLIA_ID || "Q2TJ3C12P0";
const API = public_env.PUBLIC_ALGOLIA_API || "82dde6340231c1db41428ce4805ca2c0";
const searchClient = algoliasearch(APP_ID, API);
export {
  searchClient as s
};
