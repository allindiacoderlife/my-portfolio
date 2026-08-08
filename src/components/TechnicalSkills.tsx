import {
  BackEndSkills,
  FrontEndSkills,
  dbSkills,
  otherSkills,
} from "@/lib/utils";

import SkillRow from "./SkillRow";

function TechnicalSkills() {
  return (
    <div className="relative min-h-[100vh] w-screen flex justify-center items-center pb-10">
      <div
        id="skills"
        className="flex flex-col w-full items-center gap-4 mt-24 md:gap-8 skew-y-12 bg-[#cbacf9c4] py-10"
      >
        <div className="flex flex-col w-full lg:w-[70%] md:gap-8 items-center">
          <SkillRow skills={FrontEndSkills} reverse={false}></SkillRow>
          <SkillRow skills={BackEndSkills} reverse={true}></SkillRow>
          <SkillRow skills={dbSkills} reverse={false}></SkillRow>
          <SkillRow skills={otherSkills} reverse={true}></SkillRow>
        </div>
      </div>
    </div>
  );
}

export default TechnicalSkills;
