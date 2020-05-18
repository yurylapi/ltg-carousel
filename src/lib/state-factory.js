// export default class StateFactory {
//   constructor(type, props) {
//     return new registeredPartFactories[type](props);
//   }
// }

// let registeredPartFactories = {};
// registeredPartFactories['tail'] = class TailFactory extends this {
// };
//
// registeredPartFactories['torso'] = class TorsoFactory {
// };
//
// registeredPartFactories['head'] = class HeadFactory {
// };

export const createState = (stateName, base) => class stateName extends base {};

export const StateFactory = {
  registeredStates: {},
  register(stateName, stateClass) {
    if (!StateFactory.registeredStates.has(stateName)) {
      StateFactory.registeredStates.set(stateName, stateClass);
    }
  },
  create(stateName, ...options) {
    if (!StateFactory.registeredStates.has(stateName)) {
      console.error('!!!');
      return null;
    }
    const StateClass = this.registeredStates.get(stateName);
    return new StateClass(...options);
  }
};
