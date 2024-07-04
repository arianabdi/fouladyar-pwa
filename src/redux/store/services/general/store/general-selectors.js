export function selectPending(service, entity = 'all') {
  return (state) => {
    if (typeof state.general?.pending[service] === 'object') {
      if (state.general?.pending[service].all) {
        return true;
      }

      return state.general.pending[service][entity];
    }

    const serviceState = state[service];

    if (!serviceState) {
      throw new Error(`No service found with name ${service}`);
    }

/*    if (serviceState.pending.all) {
      return true;
    }*/

    return serviceState.pending[entity];
  };
}
