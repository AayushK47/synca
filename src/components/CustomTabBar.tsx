import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { FontAwesome5, Entypo, Feather } from '@expo/vector-icons';

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const CustomTabBar: React.FC<TabBarProps> = ({ state, descriptors, navigation }) => {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastText, setToastText] = useState('');
  const [toastPosition] = useState(new Animated.Value(-50));

  const showToast = (text: string) => {
    setToastText(text);
    setToastVisible(true);
    
    Animated.sequence([
      Animated.timing(toastPosition, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.delay(1500),
      Animated.timing(toastPosition, {
        toValue: -50,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => setToastVisible(false));
  };

  const getTabIcon = (routeName: string, isFocused: boolean) => {
    const iconSize = 24;
    const iconColor = isFocused ? '#3b82f6' : '#64748b';

    switch (routeName) {
      case 'Focused':
        return <Feather name="target" size={iconSize} color={iconColor} />;
      case 'Backlogs':
        return <FontAwesome5 name="tasks" size={iconSize} color={iconColor} />;  
      case 'Goals':
        return <FontAwesome5 name="flag" size={iconSize} color={iconColor} />;
      case 'Progress':
        return <Entypo name="progress-empty" size={iconSize} color={iconColor} />;
      default:
        return <FontAwesome5 name="tasks" size={iconSize} color={iconColor} />;
    }
  };

  const getTabLabel = (routeName: string) => {
    switch (routeName) {
      case 'Focused':
        return 'Focused';
      case 'Backlogs':
        return 'Backlogs';
      case 'Goals':
        return 'Goals';
      case 'Progress':
        return 'Progress';
      default:
        return routeName;
    }
  };

  return (
    <View style={styles.container}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          showToast(getTabLabel(route.name));
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
          >
            <View style={styles.tabContent}>
              {getTabIcon(route.name, isFocused)}
              {isFocused && <View style={styles.activeIndicator} />}
            </View>
          </TouchableOpacity>
        );
      })}

      {/* Toast Message */}
      {toastVisible && (
        <Animated.View
          style={[
            styles.toast,
            {
              transform: [{ translateY: toastPosition }],
            },
          ]}
        >
          <Text style={styles.toastText}>{toastText}</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingBottom: 20,
    paddingTop: 12,
    paddingHorizontal: 16,
    position: 'relative',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  tabContent: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    minWidth: 60,
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -8,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#3b82f6',
  },

  toast: {
    position: 'absolute',
    top: -40,
    left: '50%',
    marginLeft: -50,
    backgroundColor: '#1e293b',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  toastText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default CustomTabBar;
