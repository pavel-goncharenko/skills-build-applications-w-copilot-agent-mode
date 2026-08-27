import mongoose, { Schema } from 'mongoose';

export interface User {
  username: string;
  email: string;
  passwordHash?: string;
  displayName?: string;
  team?: mongoose.Types.ObjectId;
}

export interface Team {
  name: string;
  mascot?: string;
  members: mongoose.Types.ObjectId[];
}

export interface Activity {
  user: mongoose.Types.ObjectId;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  completedAt: Date;
}

export interface LeaderboardEntry {
  user: mongoose.Types.ObjectId;
  team?: mongoose.Types.ObjectId;
  score: number;
}

export interface Workout {
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
}

const userSchema = new Schema<User>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String },
    displayName: { type: String, trim: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true },
);

const teamSchema = new Schema<Team>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    mascot: { type: String, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

const activitySchema = new Schema<Activity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const leaderboardEntrySchema = new Schema<LeaderboardEntry>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    score: { type: Number, required: true, min: 0, default: 0 },
  },
  { timestamps: true },
);

const workoutSchema = new Schema<Workout>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

export const UserModel = mongoose.model<User>('User', userSchema);
export const TeamModel = mongoose.model<Team>('Team', teamSchema);
export const ActivityModel = mongoose.model<Activity>('Activity', activitySchema);
export const LeaderboardEntryModel = mongoose.model<LeaderboardEntry>(
  'LeaderboardEntry',
  leaderboardEntrySchema,
);
export const WorkoutModel = mongoose.model<Workout>('Workout', workoutSchema);