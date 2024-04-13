import * as React from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  hasIrEmitter,
  transmit,
  getCarrierFrequencies,
} from 'lucas-react-native-ir-manage';

export default function App() {
  const [hasIrEmitterState, setHasIrEmitterState] = React.useState<boolean>();
  const [carrierFrequenciesState, setCarrierFrequenciesState] =
    React.useState('');
  async function getCarrierFrequenciesHandle() {
    try {
      const response = await getCarrierFrequencies();
      setCarrierFrequenciesState(JSON.stringify(response));
    } catch (e) {
      console.log('error', e);
    }
  }
  async function transmitHandle() {
    try {
      await transmit(
        38400,
        [
          1901, 4453, 625, 1614, 625, 1588, 625, 1614, 625, 442, 625, 442, 625,
          468, 625, 442, 625, 494, 572, 1614, 625, 1588, 625, 1614, 625, 494,
          572, 442, 651, 442, 625, 442, 625, 442, 625, 1614, 625, 1588, 651,
          1588, 625, 442, 625, 494, 598, 442, 625, 442, 625, 520, 572, 442, 625,
          442, 625, 442, 651, 1588, 625, 1614, 625, 1588, 625, 1614, 625, 1588,
          625, 48958,
        ]
      );
    } catch (e) {
      console.log('error', e);
    }
  }
  async function hasIrEmitterHandle() {
    try {
      const response = await hasIrEmitter();
      if (response) {
        setHasIrEmitterState(true);
        return;
      }
      setHasIrEmitterState(false);
    } catch (e) {
      console.log('error', e);
    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={hasIrEmitterHandle}>
        {hasIrEmitterState === undefined && <Text>Device has IR?</Text>}
        {hasIrEmitterState === false && <Text>Fevice has not IR</Text>}
        {hasIrEmitterState === true && <Text>Device has IR</Text>}
      </TouchableOpacity>
      <TouchableOpacity onPress={transmitHandle}>
        <Text>Transmit test</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={getCarrierFrequenciesHandle}>
        <Text>Get carrier frequencies</Text>
      </TouchableOpacity>
      <Text>{carrierFrequenciesState}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
