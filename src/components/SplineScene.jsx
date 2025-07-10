import { sacramento } from "@/lib/fonts";
import Image from "next/image";
import NoodleArrow from "@/public/assets/noodle_arrow.svg";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const SplineComponent = dynamic(() => import("@splinetool/react-spline/next"), {
  ssr: false,
  loading: null,
});

export default function SplineScene() {
  return (
    <div className="absolute top-[100vh] -translate-y-[35%] w-full h-[100vh]">
      <div
        className={`${sacramento.className} flex gap-4 absolute left-8 md:left-12 lg:left-28 top-8 rotate-6 pointer-events-none`}
      >
        <h1 className={`text-4xl md:text-5xl`}>
          the ultimate <b className="text-[#61cc9c]">dev</b> <br /> keyboard
          workflow
        </h1>

        <Image
          src={NoodleArrow}
          alt="noodle-arrow"
          className="w-[100px] translate-y-[10px] translate-x-[-20px]"
        />
      </div>

      <Suspense fallback={null}>
        <SplineComponent scene="https://prod.spline.design/YTurGkXAz-yWLxOO/scene.splinecode" />
      </Suspense>
    </div>
  );
}
