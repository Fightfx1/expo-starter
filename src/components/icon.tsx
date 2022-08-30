import React, {useMemo} from 'react';
import {View, Colors, ViewProps} from 'react-native-ui-lib';
import {Ionicons} from '@expo/vector-icons';
import {Bounceable} from 'rn-bounceable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
type IconProps = {
  name: string;
  size?: number;
  color?: string;
  viewProps?: ViewProps;
  onPress?: PureFunc;
  bounceable?: boolean;
  comunity: boolean;
};

const ICON_SIZE = 26;

export const IconComponent = Ionicons;
export const Icon: React.FC<IconProps> = ({
  name,
  size = ICON_SIZE,
  color = Colors.textColor,
  viewProps,
  onPress,
  bounceable = true,
  comunity = false,
}: IconProps) => {
  const Icon = useMemo(
    () => (
      <View {...viewProps}>
        {comunity ? ( <MaterialCommunityIcons name={name} size={size} color={color} /> ) : ( <Ionicons name={name} size={size} color={color} /> )}
      </View>
    ),
    [viewProps, name, size, color],
  );

  if (!bounceable) return Icon;
  return (
    <Bounceable onPress={onPress} disabled={!!!onPress}>
      {Icon}
    </Bounceable>
  );
};
