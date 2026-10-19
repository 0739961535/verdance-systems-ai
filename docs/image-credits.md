# Image credits

Every photograph on the site, where it came from and its licence. Add a row
here in the same commit that adds an image.

Rules: public domain or licences that allow commercial use only. NASA imagery
is generally not copyrighted (https://www.nasa.gov/nasa-brand-center/images-and-media/);
we must not imply NASA endorses Verdance and must not use the NASA insignia or
logotype as branding. ESA/Hubble only where the stated licence allows
commercial use with credit. Never SpaceX photos (non-commercial only).

## In use

None yet. The flight and hero still use our own SVG artwork.

## Shortlist for the photoreal flight (pending Daniel's OK to download)

| Use | NASA ID | What it shows | Credit | Licence | Original size |
|---|---|---|---|---|---|
| Earth limb behind the climb and orbit | [iss072e340644](https://images.nasa.gov/details/iss072e340644) | Orbital sunrise over Earth's horizon from the ISS, Nov 2024 | NASA | Public domain (NASA media guidelines) | 3.1 MB JPEG |
| Alternative limb with aurora glow | [iss073e1068530](https://images.nasa.gov/details/iss073e1068530) | Orbital sunrise bursting above Earth's horizon, Nov 2025 | NASA | Public domain (NASA media guidelines) | 3.6 MB JPEG |
| Real rocket and plume (launch moment, cut-out) | [NHQ202211160200](https://images.nasa.gov/details/NHQ202211160200) | SLS / Orion lifting off on Artemis I, 16 Nov 2022 | NASA/Bill Ingalls | Public domain (NASA media guidelines) | 4.5 MB JPEG |
| Alternative launch angle | [NHQ202211160030](https://images.nasa.gov/details/NHQ202211160030) | SLS / Orion lifting off on Artemis I | NASA/Joel Kowsky | Public domain (NASA media guidelines) | 4.8 MB JPEG |

Planned processing: originals stay out of the repo; scripts build AVIF and
WebP at 828, 1080, 1920 and 3840 wide, served with srcset/sizes (3840 only
to large, high-density screens), the one hero image preloaded, everything
else lazy with fixed aspect ratios (no layout shift).
