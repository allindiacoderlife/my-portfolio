"use client";
import { useEffect, useState } from "react";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

const color = "#CBACF9";

const defaultProfile = {
  name: "Chirag Saxena",
  email: "chiragsaxena728@gmail.com",
  address: "Budaun",
  phone: "[+91] 89 2366 7469",
  nationality: "India",
  birthDate: "2005-02-10",
  gender: "Male",
  story: "I've always been fascinated by technology and software development. I started my journey as a web-designer, but I realized that I wanted to be a full-stack developer. After pursuing higher education, I dedicated myself to building high-performance web applications, interactive 3D experiences, and production-grade architectures.",
};

const StoryAndDetailsCard = () => {
  const [showStory, setShowStory] = useState(true);
  const [profile, setProfile] = useState(defaultProfile);

  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.about) {
          setProfile((prev) => ({ ...prev, ...data.about }));
        }
      })
      .catch((err) => {
        console.warn("Using default profile fallback:", err.message);
      });
  }, []);

  useEffect(() => {
    let detailsCard = document.querySelector(".details-card");
    if (!detailsCard) return;
    
    const handleMouseLeave = () => {
      detailsCard.classList.add("return");
      setTimeout(() => {
        detailsCard.classList.remove("return");
      }, 500);
    };

    detailsCard.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      detailsCard.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  function yearsSince(dateString) {
    if (!dateString) return 20;
    const pastDate = new Date(dateString);
    const currentDate = new Date();

    const yearsDifference = currentDate.getFullYear() - pastDate.getFullYear();
    const monthDifference = currentDate.getMonth() - pastDate.getMonth();
    const dayDifference = currentDate.getDate() - pastDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      return yearsDifference - 1;
    }

    return yearsDifference;
  }

  return (
    <div className={`flex flex-1 flex-col mt-1 md:mt-4 gap-2 w-full z-50`}>
      <h2 className="font-semibold">
        {showStory ? (
          <>
            How it all started{" "}
            <i className="text-[#CBACF9]">
              {"{"} story time! {"}"}
            </i>
          </>
        ) : (
          "Profile"
        )}
        <hr className="mt-2 md:mt-3" />
      </h2>

      {showStory ? (
        <p className="text-md md:text-base tracking-wide">
          {profile.story || defaultProfile.story}
        </p>
      ) : (
        <div className="text-md md:text-base flex flex-col gap-2 tracking-wide">
          <h2>
            name ~{" "}
            <i className="font-medium text-[#CBACF9]">{profile.name}</i>
          </h2>
          <h2>
            email ~{" "}
            <i className="font-medium text-[#CBACF9]">{profile.email}</i>
          </h2>
          <h2>
            address ~{" "}
            <i className="font-medium text-[#CBACF9]">{profile.address}</i>
          </h2>
          <h2>
            phone ~{" "}
            <i className="font-medium text-[#CBACF9]">{profile.phone}</i>
          </h2>
          <hr className="opacity-25" />
          <h2>
            nationality ~ <i className="font-medium text-[#CBACF9]">{profile.nationality}</i>
          </h2>
          <h2>
            age ~{" "}
            <i className="font-medium text-[#CBACF9]">
              {yearsSince(profile.birthDate)}
            </i>
          </h2>
          <h2>
            gender {"{"} default {"}"} ~{" "}
            <i className="font-medium text-[#CBACF9]">{profile.gender}</i>
          </h2>
        </div>
      )}

      <button
        className="relative flex items-center justify-center gap-2 mt-auto border border-[#CBACF9]/[40%] py-3 before:absolute before:size-[10px] before:left-0 before:top-0 before:border-2 before:border-[#CBACF9] before:border-b-0 before:border-r-0 after:absolute after:size-[10px] after:right-0 after:bottom-0 after:border-2 after:border-[#CBACF9] after:border-t-0 after:border-l-0"
        onClick={() => {
          setShowStory((prev) => !prev);
        }}
      >
        {showStory ? (
          <>
            <span className="text-sm md:text-base">View Profile</span>
            <div className="text-2xl">
              <MdOutlineKeyboardDoubleArrowRight />
            </div>
          </>
        ) : (
          <>
            <div className="text-sm md:text-base">
              <MdOutlineKeyboardDoubleArrowLeft />
            </div>
            <span>Back to Story</span>
          </>
        )}
      </button>
    </div>
  );
};

export default StoryAndDetailsCard;
