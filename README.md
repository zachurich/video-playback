# Video Upload/Player

HTML5 Video Player that plays video uploaded via a script. Uses `ffmpeg` to process uploaded videos into multiple outputs.

## Initial Requirements

This project requires the following packages be installed on your machine before getting up and running:

- `node`
- `ffmpeg`
- `mysql`

All of these can be installed via `brew install <packagename>`.

## Get started

After installing the above system packages, run the following commands:

```bash
# Install server dependencies
npm install

# Install client dependencies
cd ui
npm install
```

```bash
# Navigate back to the project root
cd ..
# Bootstraps the MySQL database
npm run setup
```

```bash
# Processes a video found at the specified path
# and places outputs in the client's public directory
npm run upload -- <file path> <title>
```

```bash
# Builds both the client and server, serving both at
# http://localhost:3000
npm run serve
```

Finally, navigating to <http://localhost:3000> should display a list of available video links by title (if the upload script has been run).

The upload script will also output a direct link at which the video will be availabl, given `npm run serve` has been run.
