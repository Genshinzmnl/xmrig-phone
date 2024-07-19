global.__TEST__ = true;

import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

// Mocking AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

// Mocking Native Animated Helper
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

import 'react-native-gesture-handler/jestSetup';

// Mocking react-native-reanimated
jest.mock('react-native-reanimated', () => {
    const Reanimated = require('react-native-reanimated/mock');

    // Overriding the incorrect 'call' mock with a no-op function
    Reanimated.default.call = () => { };

    return Reanimated;
});

// Adding additional mocks to improve performance and consistency
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('react-native/Libraries/Interaction/InteractionManager', () => {
    return {
        runAfterInteractions: jest.fn().mockImplementation((callback) => {
            if (callback) {
                callback();
            }
        }),
    };
});