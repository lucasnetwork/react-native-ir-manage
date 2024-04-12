const ReactNativeIrManage = require('./NativeReactNativeIrManage').default;

export function hasIrEmitter(): Promise<boolean> {
  return ReactNativeIrManage.hasIrEmitter();
}

export function transmit(
  frequency: number,
  pattern: number[]
): Promise<boolean> {
  return ReactNativeIrManage.transmit(frequency, pattern);
}

export function getCarrierFrequencies(): Promise<{
  maxFrequency: number;
  minFrequency: number;
}> {
  return ReactNativeIrManage.getCarrierFrequencies();
}
