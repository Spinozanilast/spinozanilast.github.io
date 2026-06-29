import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

interface Player {
  isPlaying: boolean;
  songUrl?: string;
  title?: string;
  artist?: string;
  duration?: number;
  progress?: number;
  albumImageUrl?: string;
}

const PlayerDefaultNotPlayingState: Player = {
  isPlaying: false,
  songUrl: undefined,
  title: undefined,
  artist: undefined,
};

function SpotifyNowPlayingWidget({ className }: { className?: string }) {
  const [player, setPlayer] = useState<Player>(PlayerDefaultNotPlayingState);
  const durationTime = useMemo(() => formatMs(player.duration ?? 0), [player.duration]);
  const nowInTime = useMemo(() => formatMs(player.progress ?? 0), [player.progress]);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const nowPlayingResponse = await fetch("/api/spotify.json");
        if (!nowPlayingResponse.ok) {
          throw new Error("Now playing from Spotify fetch failed");
        }

        const nowPlayingData = await nowPlayingResponse.json();
        setPlayer({
          isPlaying: nowPlayingData.isPlaying,
          songUrl: nowPlayingData.songUrl,
          title: nowPlayingData.title,
          artist: nowPlayingData.artist,
          duration: nowPlayingData.duration,
          progress: nowPlayingData.progress,
          albumImageUrl: nowPlayingData.albumImageUrl,
        });
      } catch (error) {
        console.error(error);
        setPlayer(PlayerDefaultNotPlayingState);
      }
    };
    fetchNowPlaying();
  }, []);

  if (!player.isPlaying)
    return (
      <div
        className={cn(
          "font-departuremono bg-section-background flex w-full justify-between rounded-md p-4 text-center text-3xl",
          className,
        )}
      >
        <p className="text-accent text-left">♫</p> Not Playing{" "}
        <p className="text-accent text-right">♬</p>
      </div>
    );

  return (
    <a
      href={player.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "font-departuremono group relative block w-full max-w-xl",
        className,
      )}
    >
      <p className="text-accent absolute -top-3 -left-2 text-2xl group-hover:text-3xl">
        ♫
      </p>
      <div className="bg-section-secondary rounded-xsl flex w-full flex-col justify-center">
        <p className="text-accent p-2 text-center text-xl">
          Playing now on my Spotify:
        </p>
        <div className="flex w-full flex-row gap-4 p-4">
          <img
            src={player.albumImageUrl}
            alt={player.title}
            className="aspect-square h-fit max-w-1/5 rounded-sm"
          />
          <div className="flex w-full flex-col gap-2">
            <p className="text-md text-balance italic">{player.title}</p>
            <p className="text-level-4 text-xl">{player.artist}</p>
            <p className="text-right">
              in {nowInTime} / {durationTime}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-section-secondary rounded-xsl absolute top-[105%] z-10 hidden max-w-80 p-2 transition-all group-hover:block">
        <img
          src={player.albumImageUrl}
          alt={player.title}
          className="w-full rounded-md"
        />
      </div>
    </a>
  );
}

function formatMs(ms: number) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default SpotifyNowPlayingWidget;
