code = """//VERSION=3

/*
Sentinel-2 AWEIsh Water Extraction Script
-----------------------------------------
This script computes the AWEIsh index (Automated Water Extraction Index – shadow variant)
based on Feyisa et al. (2014), optimized for water detection under shadowed conditions.

Bands:
B03 - Green
B08 - NIR
B11 - SWIR1
B12 - SWIR2
*/

function setup() {
  return {
    input: ["B03", "B08", "B11", "B12", "dataMask"],
    output: { bands: 4 }
  };
}

function evaluatePixel(sample) {

  let aweish = 4 * (sample.B03 - sample.B11) -
               (0.25 * sample.B08 + 2.75 * sample.B12);

  let val = Math.max(0, Math.min(1, (aweish + 0.5) / 1));

  return [0, 0, 2.5 * val, sample.dataMask];
}
"""

path = "/mnt/data/AWEIsh_evalscript.js"
with open(path, "w") as f:
    f.write(code)

path
