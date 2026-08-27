import mongoose from 'mongoose';
import {
  ActivityModel,
  LeaderboardEntryModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      ActivityModel.deleteMany({}),
      LeaderboardEntryModel.deleteMany({}),
      UserModel.deleteMany({}),
      TeamModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
    ]);

    const teams = await TeamModel.insertMany([
      { name: 'Velocity Vipers', mascot: 'Viper' },
      { name: 'Summit Sprinters', mascot: 'Falcon' },
      { name: 'Core Crushers', mascot: 'Rhino' },
    ]);

    const users = await UserModel.insertMany([
      {
        username: 'maya_rivera',
        email: 'maya.rivera@example.com',
        passwordHash: 'demo-password-hash-1',
        displayName: 'Maya Rivera',
        team: teams[0]._id,
      },
      {
        username: 'leo_chen',
        email: 'leo.chen@example.com',
        passwordHash: 'demo-password-hash-2',
        displayName: 'Leo Chen',
        team: teams[0]._id,
      },
      {
        username: 'nina_patel',
        email: 'nina.patel@example.com',
        passwordHash: 'demo-password-hash-3',
        displayName: 'Nina Patel',
        team: teams[1]._id,
      },
      {
        username: 'owen_brooks',
        email: 'owen.brooks@example.com',
        passwordHash: 'demo-password-hash-4',
        displayName: 'Owen Brooks',
        team: teams[2]._id,
      },
    ]);

    await Promise.all([
      TeamModel.findByIdAndUpdate(teams[0]._id, { members: [users[0]._id, users[1]._id] }),
      TeamModel.findByIdAndUpdate(teams[1]._id, { members: [users[2]._id] }),
      TeamModel.findByIdAndUpdate(teams[2]._id, { members: [users[3]._id] }),
    ]);

    await ActivityModel.insertMany([
      {
        user: users[0]._id,
        type: 'Trail run',
        durationMinutes: 42,
        caloriesBurned: 430,
        completedAt: new Date('2026-08-20T12:00:00.000Z'),
      },
      {
        user: users[1]._id,
        type: 'Strength circuit',
        durationMinutes: 35,
        caloriesBurned: 310,
        completedAt: new Date('2026-08-21T12:00:00.000Z'),
      },
      {
        user: users[2]._id,
        type: 'Indoor cycling',
        durationMinutes: 50,
        caloriesBurned: 520,
        completedAt: new Date('2026-08-22T12:00:00.000Z'),
      },
      {
        user: users[3]._id,
        type: 'Mobility flow',
        durationMinutes: 25,
        caloriesBurned: 160,
        completedAt: new Date('2026-08-23T12:00:00.000Z'),
      },
    ]);

    await LeaderboardEntryModel.insertMany([
      { user: users[2]._id, team: teams[1]._id, score: 1520 },
      { user: users[0]._id, team: teams[0]._id, score: 1410 },
      { user: users[1]._id, team: teams[0]._id, score: 1285 },
      { user: users[3]._id, team: teams[2]._id, score: 980 },
    ]);

    await WorkoutModel.insertMany([
      {
        name: 'Starter Strength',
        description: 'A full-body introduction to squats, presses, rows, and core stability.',
        difficulty: 'beginner',
        durationMinutes: 30,
      },
      {
        name: 'Endurance Builder',
        description: 'Tempo intervals designed to improve aerobic capacity and recovery pace.',
        difficulty: 'intermediate',
        durationMinutes: 45,
      },
      {
        name: 'Peak Power Circuit',
        description: 'High-intensity compound movements for experienced athletes.',
        difficulty: 'advanced',
        durationMinutes: 40,
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
