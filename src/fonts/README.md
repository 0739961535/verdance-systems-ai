# Self-hosted fonts (all SIL Open Font License 1.1)

Subset to Latin (U+0020-007E, U+00A0-00FF and common punctuation) and
trimmed to the weights the site uses, to keep the first paint fast:

- `inter/Inter-400-600-latin.woff2`: Inter (rsms, OFL), variable weight
  400 to 600, from Google Fonts, instanced with fontTools varLib.instancer.
- `newsreader/Newsreader-Italic-Display-latin.woff2`: Newsreader italic
  (Production Type, OFL) at optical size 72, weight 400. Only "We ship it."
- `geist-mono/GeistMono-400-500-latin.woff2`: Geist Mono (Vercel, OFL),
  weight 400 to 500. Chapter markers and timestamps only.

Rebuild: pyftsubset <font> --unicodes="U+0020-007E,U+00A0-00FF,U+2013-2014,U+2018-201D,U+2022,U+2026,U+2192,U+00B7" --flavor=woff2
