import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import FloatingActionButton from '../components/FloatingActionButton';

const BacklogScreen: React.FC = () => {
  const handleRegularTask = () => {
    Alert.alert('Regular Task', 'Create a new regular task in backlog');
    // TODO: Implement task creation logic
  };

  const handleRecurringTask = () => {
    Alert.alert('Recurring Task', 'Create a new recurring task in backlog');
    // TODO: Implement recurring task creation logic
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Backlogs</Text>
        <Text style={styles.subtitle}>Organize and prioritize your pending tasks</Text>
      </View>
      
      <FloatingActionButton
        onRegularTask={handleRegularTask}
        onRecurringTask={handleRecurringTask}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default BacklogScreen;
