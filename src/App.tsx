import React, { useContext, useMemo } from 'react';
import { SafeAreaView } from 'react-native';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { SettingsContextProvider, SettingsContext, ThemeType } from './core/settings';
import { DialogContextProvider } from './components/dialogs/dialog.provider';
import { AppNavigator, AppHeader } from './components';
import { SessionDataContextProvider } from './core/session-data/session-data.context';
import { enableScreens } from 'react-native-screens';

enableScreens(false);

const AppWithSettings: React.FC = React.memo(() => (
    <>
        <IconRegistry icons={EvaIconsPack} />
        <SettingsContextProvider>
            <App />
        </SettingsContextProvider>
    </>
));

const App: React.FC = React.memo(() => {
    const { settings } = useContext(SettingsContext);
    const theme = useMemo(() => (settings.theme ? eva[settings.theme as ThemeType] : eva.dark), [settings.theme]);

    return (
        <ApplicationProvider {...eva} theme={theme}>
            <SessionDataContextProvider>
                <DialogContextProvider>
                    <SafeAreaView style={{ flex: 1 }}>
                        <AppHeader />
                        <AppNavigator />
                    </SafeAreaView>
                </DialogContextProvider>
            </SessionDataContextProvider>
        </ApplicationProvider>
    );
});

export default AppWithSettings;
