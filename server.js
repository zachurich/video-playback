const [folder, command] = process.argv.slice(2);
const opts = { stdio: "inherit", cwd: folder, shell: true };
require("child_process").spawn("npm run", [command], opts);
