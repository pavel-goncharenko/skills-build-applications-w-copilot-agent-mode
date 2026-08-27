import CollectionView from './CollectionView';

type Workout = {
  _id: string;
  name: string;
  description: string;
  difficulty: string;
  durationMinutes: number;
};

export default function Workouts() {
  return (
    <CollectionView<Workout>
      collection="workouts"
      title="Workouts"
      description="Personalized workout recommendations for different training levels."
      emptyMessage="No workouts are available yet."
      renderItem={(workout) => (
        <article className="col-md-6 col-xl-4" key={workout._id}>
          <div className="data-card h-100">
            <span className="badge text-bg-success text-capitalize">{workout.difficulty}</span>
            <h2>{workout.name}</h2>
            <p>{workout.description}</p>
            <span className="metric">{workout.durationMinutes} minutes</span>
          </div>
        </article>
      )}
    />
  );
}