import CollectionView from './CollectionView';

type Team = {
  _id: string;
  name: string;
  mascot?: string;
  members?: unknown[];
};

export default function Teams() {
  return (
    <CollectionView<Team>
      collection="teams"
      title="Teams"
      description="Groups competing together across the Octofit challenge board."
      emptyMessage="No teams are available yet."
      renderItem={(team) => (
        <article className="col-md-6 col-xl-4" key={team._id}>
          <div className="data-card h-100">
            <h2>{team.name}</h2>
            <p className="muted">Mascot: {team.mascot ?? 'Not assigned'}</p>
            <span className="metric">{team.members?.length ?? 0} members</span>
          </div>
        </article>
      )}
    />
  );
}