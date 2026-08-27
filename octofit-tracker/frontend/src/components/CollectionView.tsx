import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

type CollectionViewProps<T> = {
  collection: string;
  title: string;
  description: string;
  emptyMessage: string;
  renderItem: (item: T) => React.ReactNode;
};

export default function CollectionView<T>({
  collection,
  title,
  description,
  emptyMessage,
  renderItem,
}: CollectionViewProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;

    async function loadItems() {
      try {
        setIsLoading(true);
        setError(null);
        const collectionItems = await fetchCollection<T>(collection);

        if (isCurrent) {
          setItems(collectionItems);
        }
      } catch (loadError) {
        if (isCurrent) {
          setError(loadError instanceof Error ? loadError.message : 'Unable to load data');
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    }

    loadItems();

    return () => {
      isCurrent = false;
    };
  }, [collection]);

  return (
    <section className="content-panel" aria-labelledby={`${collection}-title`}>
      <div className="panel-heading">
        <p className="eyebrow">Octofit tracker</p>
        <h1 id={`${collection}-title`}>{title}</h1>
        <p>{description}</p>
      </div>

      {isLoading && <p className="state-message">Loading {title.toLowerCase()}...</p>}

      {error && (
        <div className="alert alert-warning" role="alert">
          {error}
        </div>
      )}

      {!isLoading && !error && items.length === 0 && <p className="state-message">{emptyMessage}</p>}

      {!isLoading && !error && items.length > 0 && (
        <div className="row g-3">{items.map((item) => renderItem(item))}</div>
      )}
    </section>
  );
}