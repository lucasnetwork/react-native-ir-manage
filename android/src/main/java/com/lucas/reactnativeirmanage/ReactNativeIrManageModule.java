package com.lucas.reactnativeirmanage;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.annotations.ReactModule;
import android.hardware.ConsumerIrManager;
import android.hardware.ConsumerIrManager.CarrierFrequencyRange;
import static android.content.Context.CONSUMER_IR_SERVICE;

@ReactModule(name = ReactNativeIrManageModule.NAME)
public class ReactNativeIrManageModule extends NativeReactNativeIrManageSpec {
  public static final String NAME = "ReactNativeIrManage";
  private final ConsumerIrManager manager;
  public ReactNativeIrManageModule(ReactApplicationContext reactContext) {
    super(reactContext);
    manager = (ConsumerIrManager) reactContext.getSystemService(CONSUMER_IR_SERVICE);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }


  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  public void hasIrEmitter(Promise promise) {
        promise.resolve(manager.hasIrEmitter());
    }

  @ReactMethod
  public void transmit(double carrierFrequency,  ReadableArray burstsPattern, Promise promise) {
    int[] pattern = new int[burstsPattern.size()];
    int value = (int)carrierFrequency;
    for (int i = 0; i < burstsPattern.size(); i++) {
      pattern[i] = burstsPattern.getInt(i);
    }
    try {
      manager.transmit(value, pattern);
      promise.resolve(true);
    } catch (Exception e) {
      promise.reject(e);
    }
  }

  @ReactMethod
  public void getCarrierFrequencies(Promise promise) {
      try {
          CarrierFrequencyRange[] carrierFrequencyRanges = manager.getCarrierFrequencies();
          WritableArray carrierFrequencies = Arguments.createArray();

          for (CarrierFrequencyRange carrierFrequencyRange : carrierFrequencyRanges) {
              WritableMap carrierFrequency = Arguments.createMap();
              carrierFrequency.putInt("minFrequency", carrierFrequencyRange.getMinFrequency());
              carrierFrequency.putInt("maxFrequency", carrierFrequencyRange.getMaxFrequency());
              carrierFrequencies.pushMap(carrierFrequency);
          }

          promise.resolve(carrierFrequencies);
      } catch (Exception e) {
          promise.reject(e);
      }

  }
}
