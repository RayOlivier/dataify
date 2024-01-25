import { useEffect, useState } from 'react';
import './TopArtists.scss';
import { TArtist, TTimeRange } from '../../types/types';
import { getTopItems } from '../../api/spotify';
import { ArtistCard, Loader, TimeRangeButtons } from '../../components';

export const TopArtists = () => {
  const [topArtists, setTopArtists] = useState<TArtist[] | null>(null);
  const [activeRange, setActiveRange] = useState<TTimeRange>('medium_term');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topArtists = await getTopItems({ type: 'artists', time_range: activeRange });

        console.log('topArtists', topArtists);

        setTopArtists(topArtists.data.items as TArtist[]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [activeRange]);

  return (
    <main>
      <h2>Top Artists </h2>
      <TimeRangeButtons activeRange={activeRange} setActiveRange={setActiveRange}></TimeRangeButtons>
      {topArtists ? (
        <div className="artists">
          <ul className="artist-list">
            {topArtists.map(artist => (
              <ArtistCard name={artist.name} images={artist.images} key={artist.id}></ArtistCard>
            ))}
          </ul>
        </div>
      ) : (
        <Loader />
      )}
    </main>
  );
};
