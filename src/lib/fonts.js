import {
  Inter,
  Poiret_One,
  Great_Vibes,
  Montserrat_Alternates,
  Poppins,
} from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  fallback: ["sans-serif", "arial"],
});
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "400", "500"],
  fallback: ["sans-serif", "arial"],
});
const great_vibes = Great_Vibes({
  style: "normal",
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["sans-serif", "arial"],
});
const poiret_one = Poiret_One({
  style: "normal",
  weight: ["400"],
  subsets: ["latin"],
  fallback: ["sans-serif", "arial"],
});
const montserrat_alternates = Montserrat_Alternates({
  style: "normal",
  subsets: ["latin"],
  weight: ["400", "500"],
  fallback: ["sans-serif", "arial"],
});
const sacramento = localFont({
  src: "../../public/LocalFonts/Sacramento-Regular.ttf",
});

const plaster = localFont({
  src: "../../public/LocalFonts/Plaster-Regular.ttf",
});

const stretch = localFont({
  src: "../../public/LocalFonts/StretchPro.otf",
});

const morona = localFont({
  src: "../../public/LocalFonts/Morona.otf",
});

export {
  inter,
  poppins,
  great_vibes,
  poiret_one,
  montserrat_alternates,
  sacramento,
  plaster,
  stretch,
  morona,
};
