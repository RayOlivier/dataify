import { useEffect, useState } from 'react';
import './TopTracks.scss';
import { TTimeRange, TTrack } from '../../types/types';
import { getTopItems } from '../../api/spotify';
import { Loader, SpotifyLogo, TimeRangeButtons, TrackCard } from '../../components';
import './TopTracks.scss';

export const TopTracks = () => {
  const [topTracks, setTopTracks] = useState<TTrack[] | null>(null);
  const [activeRange, setActiveRange] = useState<TTimeRange>('medium_term');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topTracks = await getTopItems({ type: 'tracks', time_range: activeRange });

        setTopTracks(topTracks.data.items as TTrack[]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [activeRange]);

  return (
    <main>
      <div style={{ width: '100px', margin: 'auto' }}>
        <SpotifyLogo></SpotifyLogo>
      </div>
      <h2>Top Tracks</h2>

      <TimeRangeButtons activeRange={activeRange} setActiveRange={setActiveRange}></TimeRangeButtons>
      {topTracks ? (
        <div className="tracks">
          <ul className="track-list">
            {topTracks.map(track => (
              <TrackCard track={track} key={track.id}></TrackCard>
            ))}
          </ul>
        </div>
      ) : (
        <Loader />
      )}
    </main>
  );
};
