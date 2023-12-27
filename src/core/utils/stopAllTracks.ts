export const stopAllTracks = (stream: MediaStream) => {
    stream &&
    stream.getTracks().forEach((track: MediaStreamTrack) => {
        if (track.readyState == 'live')
            track.stop();
    });
}
