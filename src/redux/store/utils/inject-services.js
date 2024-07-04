import * as services from '../services';

export default function injectServices(section) {
  return (runnerFunction) => {
    const allSections = {};

    if (!runnerFunction) {
      throw new Error('function is not provided');
    }

    if (!section) {
      throw new Error('section is not provided');
    }

    Object.keys(services).forEach((serviceName) => {
      const currentService = services[serviceName];

      allSections[serviceName] = currentService[section];
    });

    return (...params) => runnerFunction(allSections, ...params);
  };
}
