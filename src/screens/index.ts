import {ModalScreenLayouts, ScreenLayouts, TabScreenLayouts} from '../services/navigation/types';

import {Main} from './main';
import {Settings} from './settings';
import {Example} from './screen-sample';
import {genRootNavigator, genStackNavigator, genTabNavigator} from '../services/navigation/help';
import {screenDefaultOptions, tabBarDefaultOptions} from '../services/navigation/options';
import { SortScreen } from './sortScreen';
import { ChatScreen } from './ChatScreen';
// Describe your screens here
export type Tabs = 'Main' | 'WIP' | 'Settings';
export type Modal = 'SortModal' | "ChatModal";
export type Screen = 'Main' | 'Example' | 'Settings' | 'SortScreen' | 'ChatScreen';

export type ModalProps = {
  SortModal: undefined;
  ChatModal: undefined;
};
export type ScreenProps = {
  Main: undefined;
  Example: ExampleScreenProps;
  Settings: undefined;
} & ModalProps;

// Screens
const screens: ScreenLayouts = {
  Main: {
    name: 'Main',
    component: Main,
    options: () => ({
      title: 'Home',
      ...screenDefaultOptions(),
    }),
  },
  Example: {
    name: 'Example',
    component: Example,
    options: () => ({
      title: 'Example',
      ...screenDefaultOptions(),
    }),
  },
  SortScreen : {
    name: 'SortScreen',
    component: SortScreen,
    options: () => ({
      title: 'Sort Screen',
      ...screenDefaultOptions(),
    })
  },
  ChatScreen : {
    name: 'ChatScreen',
    component: ChatScreen,
    options: () => ({
      title: 'Chat',
      ...screenDefaultOptions(),
    })
  },
  Settings: {
    name: 'Settings',
    component: Settings,
    options: () => ({
      title: 'Settings',
      ...screenDefaultOptions(),
    }),
  },
};
const HomeStack = () => genStackNavigator([screens.Main, screens.Example]);
const ExampleStack = () => genStackNavigator([screens.Example]);
const SettingsStack = () => genStackNavigator([screens.Settings]);
const ExampleModalStack = () => genStackNavigator([screens.SortScreen]);
const ChatModel = () => genStackNavigator([screens.ChatScreen]);

// Tabs
const tabs: TabScreenLayouts = {
  Main: {
    name: 'MainNavigator',
    component: HomeStack,
    options: () => ({
      title: 'Home',
      ...tabBarDefaultOptions('MainNavigator'),
    }),
  },
  WIP: {
    name: 'ExampleNavigator',
    component: ExampleStack,
    options: () => ({
      title: 'WIP',
      ...tabBarDefaultOptions('ExampleNavigator'),
    }),
  },
  Settings: {
    name: 'SettingsNavigator',
    component: SettingsStack,
    options: () => ({
      title: 'Settings',
      ...tabBarDefaultOptions('SettingsNavigator'),
    }),
  },
};
const TabNavigator = () => genTabNavigator([tabs.Main, tabs.WIP, tabs.Settings]);

// Modals
const modals: ModalScreenLayouts = {
  SortModal: {
    name: 'SortModal',
    component: ExampleModalStack,
    options: () => ({
      title: 'SortModal',
    }),
  },
  ChatModal: {
    name: 'ChatModal',
    component: ChatModel,
    options: () => ({
      title: 'ChatModel',
    }),
  },
};

// Root Navigator
export const RootNavigator = (): JSX.Element =>
  genRootNavigator(TabNavigator, [modals.SortModal, modals.ChatModal]);
