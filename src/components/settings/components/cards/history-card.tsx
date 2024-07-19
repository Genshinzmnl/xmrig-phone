import React, { useContext, useCallback, useMemo } from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import { Text, Button, ListItem, List, Divider } from '@ui-kitten/components';
import { SettingsActionType, ISettingsWallet } from '../../../../core/settings';
import { SettingsCard, SettingsCardProps } from './../settings.card';
import { DialogContext, DialogType, IDialogContext } from '../../../dialogs/dialog.provider';

type UseButtonProps = {
    wallet: string;
    disabled: boolean;
    onPress: () => void;
};

const UseButton: React.FC<UseButtonProps> = ({ wallet, disabled, onPress }) => (
    <Button disabled={disabled} size='tiny' appearance='outline' onPress={onPress}>
        USE
    </Button>
);

const renderItemAccessory = (wallet: string, disabled: boolean, showDialog: IDialogContext['showDialog'], handleDialog: (value: boolean, wallet: string) => void): React.ReactElement => (
    <UseButton
        wallet={wallet}
        disabled={disabled}
        onPress={() => {
            showDialog({
                type: DialogType.CONFIRM,
                title: 'Change Wallet Address?',
                message: wallet,
                status: 'warning',
                onClick: (value: boolean) => handleDialog(value, wallet),
            });
        }}
    />
);

const renderItem = (item: ISettingsWallet, settings: any, showDialog: IDialogContext['showDialog'], handleDialog: (value: boolean, wallet: string) => void): React.ReactElement => (
    <ListItem
        style={styles.listItem}
        title={<Text style={{ marginLeft: 0 }} category='c2'>{item.timestamp}</Text>}
        description={<Text style={{ marginLeft: 0, marginRight: 10 }} category='c2' appearance='hint'>{item.address}</Text>}
        accessoryRight={() => renderItemAccessory(item.address, settings.wallet?.address === item.address, showDialog, handleDialog)}
    />
);

const HistoryList: React.FC<{ settings: any, showDialog: IDialogContext['showDialog'], handleDialog: (value: boolean, wallet: string) => void }> = ({ settings, showDialog, handleDialog }) => (
    <List
        data={settings.wallet_history}
        renderItem={({ item }) => renderItem(item, settings, showDialog, handleDialog)}
        ItemSeparatorComponent={Divider}
    />
);

export const HistoryCard: React.FC<ViewProps & SettingsCardProps> = ({ settings, settingsDispatcher, title, showContent, icon, onPressIn }) => {
    const { showDialog } = useContext<IDialogContext>(DialogContext);

    const handleDialog = useCallback((value: boolean, wallet: string) => {
        if (value) {
            settingsDispatcher({
                type: SettingsActionType.SET_WALLET,
                value: {
                    address: wallet,
                    timestamp: new Date().toLocaleString(),
                },
            });
        }
    }, [settingsDispatcher]);

    return useMemo(() => (
        <SettingsCard {...{ settings, settingsDispatcher, title, showContent, icon, onPressIn }} style={styles.card} status='primary'>
            <Text appearance='hint'>Your wallets history, you can change your current wallet by clicking "use".</Text>
            <HistoryList settings={settings} showDialog={showDialog} handleDialog={handleDialog} />
        </SettingsCard>
    ), [settings, settingsDispatcher, title, showContent, icon, onPressIn, showDialog, handleDialog]);
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        marginBottom: 0,
    },
    listItem: {
        marginLeft: 0,
        paddingLeft: 0,
        marginRight: 0,
        paddingRight: 0,
    },
});