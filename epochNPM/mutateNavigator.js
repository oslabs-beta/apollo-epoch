// eslint-disable-next-line import/no-unresolved
import { canUseWeakMap } from '@apollo/client/utilities/common/canUse';

const mutateNavigator = (function mutateNavigator() {
  console.log('WEAK MAP -> ', canUseWeakMap);
  console.log('NAVIGATOR -> ', navigator);
  Object.defineProperty(navigator, 'product', {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'ReactNative',
  });
})();
// eslint-disable-next-line import/prefer-default-export
export { mutateNavigator };
