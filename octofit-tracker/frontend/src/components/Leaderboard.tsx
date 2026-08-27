import CollectionView from './CollectionView';

type LeaderboardEntry = {
  _id: string;
  score: number;
  user?: { displayName?: string; username?: string };
  team?: { name?: string };
};

export default function Leaderboard() {
  return (
    <CollectionView<LeaderboardEntry>
      collection="leaderboard"
      title="Leaderboard"
      description="Ranked Octofit athletes by challenge score."
      emptyMessage="No leaderboard entries are available yet."
      renderItem={(entry) => (
        <article className="col-md-6 col-xl-4" key={entry._id}>
          <div className="data-card h-100 leaderboard-card">
            <span className="score">{entry.score}</span>
            <h2>{entry.user?.displayName ?? entry.user?.username ?? 'Unknown athlete'}</h2>
            <p className="muted">{entry.team?.name ?? 'Independent'}</p>
          </div>
        </article>
      )}
    />
  );
}