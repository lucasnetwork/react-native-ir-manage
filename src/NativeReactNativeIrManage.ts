import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  hasIrEmitter(): Promise<boolean>;
  transmit(frequency: number, pattern: number[]): Promise<boolean>;
  getCarrierFrequencies(): Promise<{
    maxFrequency: number;
    minFrequency: number;
  }>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('ReactNativeIrManage');
