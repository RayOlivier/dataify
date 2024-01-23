import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TGeneralReq, TPlaylist, TPlaylistData, TPlaylistTracks, TPlaylistTracksItem, TTrack, TTrackAnalysis } from '../../types/types';
import { getAudioFeaturesForTracks, getPlaylistById, getPlaylistTracksById } from '../../api/spotify';
import axios from 'axios';
import { TrackCard } from '../../components';

export const Playlist = () => {
  const { id } = useParams();

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
        console.log('data', data);

        // setTracks(data.tracks.items);
      } catch (error) {
        console.error(error);
      }
    };
    // "https://api.spotify.com/v1/playlists/3pENYVTMuevP3CLjzQkDpQ/tracks?offset=100&limit=100&locale=en-US%2Cen%3Bq%3D0.9"

    if (id) {
      fetchData(id);
    }
  }, [id]);

  useEffect(() => {
    console.log('MORE DATA GO');
    const tracks: TPlaylistTracksItem[] = [];
    const fetchMoreData = async ({ id, offset, limit }: TGeneralReq, final: boolean) => {
      console.log('fetching??');
      try {
        const { data } = await getPlaylistTracksById({ id, offset, limit });
        // setTracksData(data);
        console.log('data', data);
        tracks.push(...data.items);
        console.log('*****data', data);
        console.log('tracks', tracks);
        // if (final) {
        //   console.log('done!!!!!!!!!!!');
        //   setTracks(tracks);
        // }
        setTracks(tracks);
      } catch (error) {
        console.error(error);
      }
    };

    if (playlist?.tracks) {
      console.log('hi');
      const { limit, total } = playlist.tracks;
      const totalPages = total / limit;
      console.log('totalPages', totalPages);
      console.log('limit, total', limit, total);

      for (let i = 0; i < totalPages; i++) {
        console.log('i', i);
        fetchMoreData({ limit, id: playlist.id, offset: i * limit }, !(i + 1 < totalPages));
      }
    }

    // return () => {
    //   second
    // }
    console.log('tracks', tracks);
  }, [playlist]);

  // When tracksData updates, compile arrays of tracks and audioFeatures
  // useEffect(() => {
  //   if (!tracksData) {
  //     return;
  //   }

  //   // When tracksData updates, check if there are more tracks to fetch
  //   // then update the state variable
  //   const fetchMoreData = async () => {
  //     console.log('tracks?.length', tracks?.length);
  //     console.log('tracksData.offset', tracksData.offset);
  //     if (tracksData.next && (!tracks?.length || tracksData.offset < tracks?.length)) {
  //       try {
  //         const { data } = await axios.get(tracksData.next);
  //         setTracksData(data);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     }
  //   };

  //   setTracks(tracks => [...(tracks ? tracks : []), ...tracksData.items]);

  //   console.log('tracksData', tracksData);
  //   fetchMoreData();

  //   // Also update the audioFeatures state variable using the track IDs
  //   const fetchAudioFeatures = async () => {
  //     // const ids = tracksData.items.map(({ track }) => track.id).join(',');
  //     // try {
  //     //   const { data } = await getAudioFeaturesForTracks(ids);
  //     //   setAudioFeatures(audioFeatures => [...(audioFeatures ? audioFeatures : []), ...data['audio_features']]);
  //     // } catch (error) {
  //     //   console.error(error);
  //     // }
  //   };
  //   fetchAudioFeatures();
  // }, [tracksData]);

  return (
    <>
      {playlist && (
        <>
          <div className="header">
            <div className="header__inner">
              {playlist.images.length && playlist.images[0].url && <img className="header__img" src={playlist.images[0].url} alt="Playlist Artwork" />}
              <div>
                <div className="header__overline">Playlist</div>
                <h2 className="header__name">{playlist.name}</h2>
                <p className="header__meta">
                  {playlist.followers.total ? (
                    <span>
                      {playlist.followers.total} {`follower${playlist.followers.total !== 1 ? 's' : ''}`}
                    </span>
                  ) : null}
                  <span>
                    {playlist.tracks.total} {`song${playlist.tracks.total !== 1 ? 's' : ''}`}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <main>
            {tracks && (
              <div className="section tracks">
                <h2>Tracks</h2>
                <ul className="track-list">
                  {tracks.map((item, i) => (
                    <TrackCard track={item.track} num={i + 1} key={item.track.id}></TrackCard>
                  ))}
                </ul>
              </div>
            )}
          </main>
        </>
      )}
    </>
  );
};
