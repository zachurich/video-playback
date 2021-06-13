import fs from "fs";
import path from "path";
import database from "../server/database";
import ffmpeg from "fluent-ffmpeg";

const [videoPath, title]: string[] = process.argv.slice(2);

const publicDir: string = path.join(__dirname, "..", "ui/public");
const outputPathBase: string = `${publicDir}/${title}`;

const formats: { label: string; resolution: string }[] = [
  { label: "240p", resolution: "320x240" },
  { label: "480p", resolution: "854x480" },
  { label: "1080p", resolution: "1920x1080" },
  { label: "4k", resolution: "3840x2160" },
];

const updateDatabase = async (): Promise<void> => {
  try {
    const db = await database.connect();
    const { insertId } = await db.query(`INSERT INTO videos (title) VALUES (?)`, [title]);

    console.log(`\nView at: http://localhost:3000/watch/${insertId}\n`);
  } catch (error) {
    console.log("\nFailed to connect to the database.", error);
  }

  process.exit();
};

const processVideo = (): void => {
  try {
    const video: ffmpeg.FfmpegCommand = ffmpeg(videoPath);

    // Add an output for each of our desired formats
    formats.forEach((format) => {
      video.size(format.resolution).output(`${outputPathBase}-${format.label}.mp4`);
    });

    video
      .on("progress", (progress: { percent: number }) => {
        process.stdout.write(`Processing: ${Math.floor(progress.percent)}%`);
        process.stdout.clearLine(1);
        process.stdout.cursorTo(-1);
      })
      .on("end", async () => {
        console.log(`\nVideo outputs successfully placed in ${publicDir}`);
        await updateDatabase();
      })
      .on("error", (err) => console.log(err))
      .run();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

if (!videoPath) {
  console.log("Must provide a video path!");
  process.exit();
}

if (!title) {
  console.log("Must provide a video title!");
  process.exit();
}

if (!fs.existsSync(videoPath)) {
  console.error("File not found!");
  process.exit();
}

processVideo();
