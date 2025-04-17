import fs from "fs";
import path from "path";
import cron from "node-cron";

const PDF_FOLDER = path.resolve("./res_doc");
const DAYS_THRESHOLD = 60;
const MS_IN_DAY = 1000 * 60 * 60 * 24;

export function deleteOldPDFs() {
  fs.readdir(PDF_FOLDER, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    const now = Date.now();

    files.forEach((file) => {
      const filePath = path.join(PDF_FOLDER, file);

      if (path.extname(file) === ".pdf") {
        fs.stat(filePath, (err, stats) => {
          if (err) {
            console.error("Error reading file stats:", err);
            return;
          }

          const ageInDays = (now - stats.mtimeMs) / MS_IN_DAY;

          if (ageInDays > DAYS_THRESHOLD) {
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error("Error deleting file:", err);
              } else {
                console.log(`Deleted old PDF: ${file}`);
              }
            });
          }
        });
      }
    });
  });
}

console.log("Running cleanup task now...");
deleteOldPDFs();

// Ensuite, planifie la tâche à 19h05 chaque jour
cron.schedule("0 0 * * *", () => {
  console.log("Running cleanup task...");
  deleteOldPDFs();
});
