import React, { useState, useEffect } from "react";
import {
  BackEndSkills as defaultBackEnd,
  FrontEndSkills as defaultFrontEnd,
  dbSkills as defaultDb,
  otherSkills as defaultOther,
} from "@/lib/utils";

import SkillRow from "./SkillRow";

function TechnicalSkills() {
  const [frontend, setFrontend] = useState(defaultFrontEnd);
  const [backend, setBackend] = useState(defaultBackEnd);
  const [database, setDatabase] = useState(defaultDb);
  const [other, setOther] = useState(defaultOther);

  useEffect(() => {
    fetch("/api/skills")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.categorized) {
          if (data.categorized.frontend?.length > 0) setFrontend(data.categorized.frontend);
          if (data.categorized.backend?.length > 0) setBackend(data.categorized.backend);
          if (data.categorized.database?.length > 0) setDatabase(data.categorized.database);
          if (data.categorized.other?.length > 0) setOther(data.categorized.other);
        }
      })
      .catch((err) => {
        console.warn("Using default skills fallback:", err.message);
      });
  }, []);

  return (
    <div className="relative min-h-[100vh] w-screen flex justify-center items-center pb-10">
      <div
        id="skills"
        className="flex flex-col w-full items-center gap-4 mt-24 md:gap-8 skew-y-12 bg-[#cbacf9c4] py-10"
      >
        <div className="flex flex-col w-full lg:w-[70%] md:gap-8 items-center">
          <SkillRow skills={frontend} reverse={false}></SkillRow>
          <SkillRow skills={backend} reverse={true}></SkillRow>
          <SkillRow skills={database} reverse={false}></SkillRow>
          <SkillRow skills={other} reverse={true}></SkillRow>
        </div>
      </div>
    </div>
  );
}

export default TechnicalSkills;
