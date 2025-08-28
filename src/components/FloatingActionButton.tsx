import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FloatingActionButtonProps {
  onRegularTask: () => void;
  onRecurringTask: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onRegularTask,
  onRecurringTask,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scaleValue] = useState(new Animated.Value(1));
  const [rotateValue] = useState(new Animated.Value(0));
  const [regularTaskPosition] = useState(new Animated.Value(0));
  const [recurringTaskPosition] = useState(new Animated.Value(0));

  const toggleMenu = () => {
    if (isOpen) {
      // Close menu
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(rotateValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(regularTaskPosition, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(recurringTaskPosition, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Open menu
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 1.1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(regularTaskPosition, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(recurringTaskPosition, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
    setIsOpen(!isOpen);
  };

  const handleRegularTask = () => {
    setIsOpen(false);
    onRegularTask();
  };

  const handleRecurringTask = () => {
    setIsOpen(false);
    onRecurringTask();
  };

  const spin = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  const regularTaskY = regularTaskPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -80],
  });

  const recurringTaskY = recurringTaskPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -160],
  });

  return (
    <>
      {/* Regular Task Mini FAB */}
      {isOpen && (
        <Animated.View
          style={[
            styles.miniFab,
            styles.regularTaskFab,
            {
              transform: [{ translateY: regularTaskY }],
            },
          ]}
        >
          <TouchableOpacity
            style={[styles.miniFabButton, { backgroundColor: '#3b82f6' }]}
            onPress={handleRegularTask}
            activeOpacity={0.8}
          >
            <Ionicons name="create-outline" size={20} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.miniFabLabel}>Regular</Text>
        </Animated.View>
      )}

      {/* Recurring Task Mini FAB */}
      {isOpen && (
        <Animated.View
          style={[
            styles.miniFab,
            styles.recurringTaskFab,
            {
              transform: [{ translateY: recurringTaskY }],
            },
          ]}
        >
          <TouchableOpacity
            style={[styles.miniFabButton, { backgroundColor: '#10b981' }]}
            onPress={handleRecurringTask}
            activeOpacity={0.8}
          >
            <Ionicons name="repeat-outline" size={20} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.miniFabLabel}>Recurring</Text>
        </Animated.View>
      )}

      {/* Main Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={toggleMenu}
        activeOpacity={0.8}
      >
        <Animated.View
          style={[
            styles.fabIcon,
            {
              transform: [
                { scale: scaleValue },
                { rotate: spin },
              ],
            },
          ]}
        >
          <Ionicons name="add" size={24} color="#ffffff" />
        </Animated.View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  fabIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  miniFab: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    alignItems: 'center',
  },
  regularTaskFab: {
    bottom: 180,
  },
  recurringTaskFab: {
    bottom: 260,
  },
  miniFabButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  miniFabLabel: {
    color: '#1e293b',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
    textAlign: 'center',
  },
});

export default FloatingActionButton;
