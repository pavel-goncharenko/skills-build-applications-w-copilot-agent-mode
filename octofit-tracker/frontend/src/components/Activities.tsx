import CollectionView from './CollectionView';

type Activity = {
  _id: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  completedAt?: string;
  user?: { displayName?: string; username?: string };
};

export default function Activities() {
  return (
    <CollectionView<Activity>
      collection="activities"
      title="Activities"
      description="Recent workouts, movement sessions, and calorie-burning efforts."
      emptyMessage="No activities are available yet."
      renderItem={(activity) => (
        <article className="col-md-6 col-xl-4" key={activity._id}>
          <div className="data-card h-100">
            <h2>{activity.type}</h2>
            <p className="muted">{activity.user?.displayName ?? activity.user?.username ?? 'Unknown athlete'}</p>
            <div className="stats-row">
              <span>{activity.durationMinutes} min</span>
              <span>{activity.caloriesBurned} cal</span>
            </div>
          </div>
        </article>
      )}
    />
  );
}