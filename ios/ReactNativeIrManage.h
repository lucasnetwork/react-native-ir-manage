
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNReactNativeIrManageSpec.h"

@interface ReactNativeIrManage : NSObject <NativeReactNativeIrManageSpec>
#else
#import <React/RCTBridgeModule.h>

@interface ReactNativeIrManage : NSObject <RCTBridgeModule>
#endif

@end
