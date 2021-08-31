# thumbs-up 👍

Thumbnail server.

## Usage

```bash
$ docker run -ti -p 8009:8009 btimby/thumbs-up
```

## What is it?

This is a thumbnail and preview server. I can convert many file types into pdf
and png.

This project relies upon an external service, [officer-pdf](https://github.com/btimby/officer-pdf/) to support office documents. officer-pdf should be run behind a load balancer for medium to high load.

In addition, there are a number of libraries below that are used to do conversion directly within this service.

## Docker / environment options

## REST Interface

### Request and Parameters

### Response

## Libraries

### Video

 - https://github.com/Streampunk/beamcoder

### Images

 - https://sharp.pixelplumbing.com/

### CSV / TSV / Plain text / Source code

Plain text, CSV, TSV and source code  are converted to HTML, which is then converted to a pdf or an image.

 - https://gist.github.com/RandomEtc/1803645
 - https://github.com/marcbachmann/node-html-pdf
 - https://www.npmjs.com/package/pdf-poppler
 - https://github.com/juliangruber/capture-phantomjs
