import { Router } from 'express';
import {
  ActivityModel,
  LeaderboardEntryModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from './models.js';

const router = Router();

router.get('/users/', async (_request, response, next) => {
  try {
    const users = await UserModel.find().populate('team').lean();
    response.json(users);
  } catch (error) {
    next(error);
  }
});

router.post('/users/', async (request, response, next) => {
  try {
    const user = await UserModel.create(request.body);
    response.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.get('/teams/', async (_request, response, next) => {
  try {
    const teams = await TeamModel.find().populate('members').lean();
    response.json(teams);
  } catch (error) {
    next(error);
  }
});

router.post('/teams/', async (request, response, next) => {
  try {
    const team = await TeamModel.create(request.body);
    response.status(201).json(team);
  } catch (error) {
    next(error);
  }
});

router.get('/activities/', async (_request, response, next) => {
  try {
    const activities = await ActivityModel.find().populate('user').sort({ completedAt: -1 }).lean();
    response.json(activities);
  } catch (error) {
    next(error);
  }
});

router.post('/activities/', async (request, response, next) => {
  try {
    const activity = await ActivityModel.create(request.body);
    response.status(201).json(activity);
  } catch (error) {
    next(error);
  }
});

router.get('/leaderboard/', async (_request, response, next) => {
  try {
    const entries = await LeaderboardEntryModel.find()
      .populate('user')
      .populate('team')
      .sort({ score: -1 })
      .lean();
    response.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post('/leaderboard/', async (request, response, next) => {
  try {
    const entry = await LeaderboardEntryModel.create(request.body);
    response.status(201).json(entry);
  } catch (error) {
    next(error);
  }
});

router.get('/workouts/', async (_request, response, next) => {
  try {
    const workouts = await WorkoutModel.find().lean();
    response.json(workouts);
  } catch (error) {
    next(error);
  }
});

router.post('/workouts/', async (request, response, next) => {
  try {
    const workout = await WorkoutModel.create(request.body);
    response.status(201).json(workout);
  } catch (error) {
    next(error);
  }
});

export default router;