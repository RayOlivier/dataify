import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TPlaylist, TPlaylistTracks, TPlaylistTracksItem, TTrackAnalysis } from '../../types/types';
import { getAudioFeaturesForTracks, getPlaylistById } from '../../api/spotify';
import axios from 'axios';
import { Header, Loader, TrackCard } from '../../components';

type TOptions = 'danceability' | 'tempo' | 'energy';

export const Playlist = () => {
  const { id } = useParams();

  const [sortValue, setSortValue] = useState<TOptions | ''>('');
  const sortOptions: TOptions[] = ['danceability', 'tempo', 'energy'];

  const [playlist, setPlaylist] = useState<TPlaylist | null>(null);
  const [tracksData, setTracksData] = useState<TPlaylistTracks | null>(null);

  const [tracks, setTracks] = useState<TPlaylistTracksItem[] | null>(null);

  const [audioFeatures, setAudioFeatures] = useState<TTrackAnalysis[] | null>(null);

  useEffect(() => {
    const fetchData = async (id: string) => {
      try {
        const { data } = await getPlaylistById(id);
        setPlaylist(data);
        setTracksData(data.tracks);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchData(id);
    }
  }, [id]);

  // When tracksData updates, compile arrays of tracks and audioFeatures
  useEffect(() => {
    if (!tracksData) {
      return;
    }

    // When tracksData updates, check if there are more tracks to fetch
    // then update the state variable
    const fetchMoreData = async () => {
      if (tracksData.next) {
        try {
          const { data } = await axios.get(tracksData.next);
          setTracksData(data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    setTracks(tracks => [...(tracks ? tracks : []), ...tracksData.items]);

    fetchMoreData();

    // Also update the audioFeatures state variable using the track IDs
    const fetchAudioFeatures = async () => {
      const ids = tracksData.items.map(({ track }) => track.id).join(',');
      try {
        const { data } = await getAudioFeaturesForTracks(ids);
        setAudioFeatures(audioFeatures => [...(audioFeatures ? audioFeatures : []), ...data.audio_features]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAudioFeatures();
  }, [tracksData]);

  // Map over tracks and add audio_features property to each track
  const tracksWithAudioFeatures = useMemo(() => {
    if (!tracks || !audioFeatures) {
      return null;
    }

    return tracks.map(({ track }) => {
      const trackToAdd = track;

      if (!track.audio_features) {
        const audioFeaturesObj = audioFeatures.find(item => {
          if (!item || !track) {
            return null;
          }
          return item.id === track.id;
        });

        trackToAdd['audio_features'] = audioFeaturesObj;
      }

      return trackToAdd;
    });
  }, [tracks, audioFeatures]);

  // Sort tracks by audio feature to be used in template
  const sortedTracks = useMemo(() => {
    if (!tracksWithAudioFeatures) {
      return null;
    }

    return [...tracksWithAudioFeatures].sort((a, b) => {
      const aFeatures = a['audio_features'];
      const bFeatures = b['audio_features'];

      if (!aFeatures || !bFeatures || !sortValue) {
        return 0;
      }

      return bFeatures[sortValue] - aFeatures[sortValue];
    });
  }, [sortValue, tracksWithAudioFeatures]);

  return (
    <>
      {playlist && (
        <>
          <Header playlist={playlist}></Header>

          <main>
            {tracks ? (
              <div className="section tracks">
                <h2>Tracks</h2>
                <div>
                  <label className="sr-only" htmlFor="order-select">
                    Sort tracks:{' '}
                  </label>
                  <select name="track-order" id="order-select" onChange={e => setSortValue(e.target.value as TOptions)}>
                    <option value="">Sort by</option>
                    {sortOptions.map((option, i) => (
                      <option value={option} key={i}>
                        {`${option.charAt(0).toUpperCase()}${option.slice(1)}`}
                      </option>
                    ))}
                  </select>
                </div>
                <ul className="track-list">
                  {sortedTracks?.map((item, i) => (
                    <TrackCard track={item} num={i + 1} key={item.id}></TrackCard>
                  ))}
                </ul>
              </div>
            ) : (
              <Loader />
            )}
          </main>
        </>
      )}
    </>
  );
};
