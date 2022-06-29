import { Recording } from "./types"

function record (): Promise<Recording> {
  const buttonRecord: HTMLButtonElement = document.getElementById("start") as HTMLButtonElement;
  const buttonStop: HTMLButtonElement = document.getElementById("stop") as HTMLButtonElement;
  const instruction: HTMLParagraphElement = document.getElementById("instruction") as HTMLParagraphElement;
  const audioPlayer: HTMLAudioElement = document.getElementById("player") as HTMLAudioElement;

  return new Promise<Recording>(async (resolve) => {
    const stream: MediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder: MediaRecorder = new MediaRecorder(stream);
    const audioChunks: Blob[] = [];

    mediaRecorder.addEventListener("dataavailable", (event: BlobEvent) => {
      audioChunks.push(event.data);
    });

    const start = (): void => {
      buttonRecord.disabled = true;
      buttonStop.disabled = false;
      instruction.innerHTML = "Please click 'Stop' to stop recording."
      audioPlayer.style.visibility = "hidden";

      mediaRecorder.start();
    };

    const stop = (): Promise<string> => {
      buttonRecord.disabled = false;
      buttonStop.disabled = true;
      instruction.innerHTML = "Please click ▶️ to play back."
      audioPlayer.style.visibility = "visible";
  
      return new Promise<string>((resolve) => {
        mediaRecorder.addEventListener("stop", () => {
          const audioBlob: Blob = new Blob(audioChunks);
          const audioUrl: string = URL.createObjectURL(audioBlob);
          resolve(audioUrl);
        });

        mediaRecorder.stop();
        audioChunks.splice(0, audioChunks.length);
      });
    };

    resolve({ start, stop });
  });
}

export default record;
