import record from "./record";
import { Recording } from "./types";
import "./styles.css";

window.onload = async function (): Promise<void> {
  const buttonRecord: HTMLButtonElement = document.getElementById("start") as HTMLButtonElement;
  const buttonStop: HTMLButtonElement = document.getElementById("stop") as HTMLButtonElement;
  const instruction: HTMLParagraphElement = document.getElementById("instruction") as HTMLParagraphElement;
  const audioPlayer: HTMLAudioElement = document.getElementById("player") as HTMLAudioElement;

  const recording: Recording = await record();
  buttonRecord.addEventListener("click", () => recording.start());
  buttonStop.addEventListener("click", async () => audioPlayer.src = await recording.stop());

  buttonStop.disabled = true;
  instruction.innerHTML = "Please click 'Record' to start recording."
  audioPlayer.style.visibility = "hidden";
};
