import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Task, TaskStats } from '../types/task';

// Mock data for demonstration
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Write and submit the quarterly project proposal',
    completed: false,
    createdAt: new Date(),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    priority: 'high',
    category: 'Work',
  },
  {
    id: '2',
    title: 'Review code changes',
    description: 'Review pull requests for the main branch',
    completed: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    priority: 'medium',
    category: 'Development',
  },
  {
    id: '3',
    title: 'Update documentation',
    description: 'Update API documentation with new endpoints',
    completed: false,
    createdAt: new Date(),
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    priority: 'low',
    category: 'Documentation',
  },
  {
    id: '4',
    title: 'Team meeting',
    description: 'Weekly team sync meeting',
    completed: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    priority: 'medium',
    category: 'Meetings',
  },
  {
    id: '5',
    title: 'Bug fixes',
    description: 'Fix critical bugs in production',
    completed: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    priority: 'high',
    category: 'Development',
  },
];

const ProgressScreen: React.FC = () => {
  const [tasks] = useState<Task[]>(mockTasks);

  const calculateStats = (): TaskStats => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    const progressPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, pending, progressPercentage };
  };

  const getCategoryStats = () => {
    const categoryMap = new Map<string, { total: number; completed: number }>();
    
    tasks.forEach(task => {
      const current = categoryMap.get(task.category) || { total: 0, completed: 0 };
      current.total += 1;
      if (task.completed) current.completed += 1;
      categoryMap.set(task.category, current);
    });

    return Array.from(categoryMap.entries()).map(([category, stats]) => ({
      category,
      ...stats,
      percentage: Math.round((stats.completed / stats.total) * 100),
    }));
  };

  const stats = calculateStats();
  const categoryStats = getCategoryStats();

  const ProgressBar: React.FC<{ percentage: number; color: string }> = ({ percentage, color }) => (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBar, { backgroundColor: '#e2e8f0' }]}>
        <View
          style={[
            styles.progressFill,
            { width: `${percentage}%`, backgroundColor: color },
          ]}
        />
      </View>
      <Text style={styles.progressText}>{percentage}%</Text>
    </View>
  );

  const StatCard: React.FC<{ title: string; value: number; subtitle: string; color: string }> = ({
    title,
    value,
    subtitle,
    color,
  }) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statSubtitle}>{subtitle}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Progress Overview</Text>
          <Text style={styles.headerSubtitle}>Track your task completion</Text>
        </View>

        {/* Main Progress Circle */}
        <View style={styles.mainProgressContainer}>
          <View style={styles.progressCircle}>
            <Text style={styles.progressPercentage}>{stats.progressPercentage}%</Text>
            <Text style={styles.progressLabel}>Complete</Text>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <StatCard
            title="Total Tasks"
            value={stats.total}
            subtitle="All tasks"
            color="#3b82f6"
          />
          <StatCard
            title="Completed"
            value={stats.completed}
            subtitle="Finished tasks"
            color="#10b981"
          />
          <StatCard
            title="Pending"
            value={stats.pending}
            subtitle="Remaining tasks"
            color="#f59e0b"
          />
        </View>

        {/* Category Progress */}
        <View style={styles.categorySection}>
          <Text style={styles.sectionTitle}>Progress by Category</Text>
          {categoryStats.map((categoryStat, index) => (
            <View key={index} style={styles.categoryItem}>
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryName}>{categoryStat.category}</Text>
                <Text style={styles.categoryCount}>
                  {categoryStat.completed}/{categoryStat.total}
                </Text>
              </View>
              <ProgressBar
                percentage={categoryStat.percentage}
                color={categoryStat.percentage === 100 ? '#10b981' : '#3b82f6'}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  mainProgressContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  progressCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  progressLabel: {
    fontSize: 12,
    color: '#ffffff',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  statSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  categorySection: {
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  categoryItem: {
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  categoryCount: {
    fontSize: 14,
    color: '#6b7280',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    minWidth: 35,
  },
});

export default ProgressScreen;
