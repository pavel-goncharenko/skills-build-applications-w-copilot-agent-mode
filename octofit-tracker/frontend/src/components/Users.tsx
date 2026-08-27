import CollectionView from './CollectionView';

type User = {
  _id: string;
  username: string;
  email: string;
  displayName?: string;
  team?: { name?: string };
};

export default function Users() {
  return (
    <CollectionView<User>
      collection="users"
      title="Users"
      description="Member profiles connected to Octofit teams and activity history."
      emptyMessage="No users are available yet."
      renderItem={(user) => (
        <article className="col-md-6 col-xl-4" key={user._id}>
          <div className="data-card h-100">
            <h2>{user.displayName ?? user.username}</h2>
            <p className="muted">@{user.username}</p>
            <p>{user.email}</p>
            <span className="badge text-bg-light">{user.team?.name ?? 'Unassigned'}</span>
          </div>
        </article>
      )}
    />
  );
}