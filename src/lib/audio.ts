class AudioPlayer {
  #cachedAudioElements: Map<string, HTMLAudioElement> = new Map();

  createAudioPlayer(src: string) {
    const audio = new Audio(src);
    this.#cachedAudioElements.set(src, audio);
  }

  #prepareAudio(src: string): HTMLAudioElement {
    const audio = this.#cachedAudioElements.get(src);

    if (!audio) {
      console.log("First create audio player");
      throw new Error("Audio player not found");
    }

    return audio;
  }

  playAudio(src: string, deleteAfterPlay: boolean = false) {
    const audioElem = this.#prepareAudio(src);

    audioElem.currentTime = 0;
    audioElem.play();

    if (deleteAfterPlay) {
      audioElem?.addEventListener("ended", () => {
        audioElem.remove();
        this.#cachedAudioElements.delete(src);
      });
    }
  }

  playAudioWithDeleteAfter(src: string) {
    this.playAudio(src, true);
  }
}

export default new AudioPlayer();
