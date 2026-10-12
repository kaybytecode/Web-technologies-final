const skillsForm = document.getElementById("skills-form");
const skillChoice = document.getElementById("skill-choice");
const skillResult = document.getElementById("skill-result");

const descriptions = {
  delivery:
    "My experience includes coordinating project activities, tracking deadlines and supporting delivery within the pharmaceutical and clinical-trials sector.",

  communication:
    "I work with clients and internal teams to clarify requirements, communicate progress and keep people informed when priorities or circumstances change.",

  improvement:
    "I enjoy identifying gaps in processes and finding practical ways to make work clearer, more consistent and easier to manage.",

  quality:
    "Working in a controlled environment has strengthened my attention to detail and my approach to accurate documentation, clear records and reliable handovers.",

  web:
    "I am developing my HTML, CSS and JavaScript skills by building this portfolio, including responsive layouts, accessible content and interactive features.",

  python:
    "Through my MSc, I am developing my Python skills and applying functions, data structures and algorithms to solve programming problems.",

  data:
    "I am building practical experience with SQL, relational databases, data modelling and normalisation through my MSc coursework.",

  organisation:
    "Balancing project responsibilities with part-time postgraduate study requires me to plan ahead, prioritise competing tasks and adapt when deadlines change."
};

if (skillsForm && skillChoice && skillResult) {
  skillsForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const selectedSkill = skillChoice.value;
    skillResult.textContent = descriptions[selectedSkill] || "";
  });
}

const aboutButton = document.getElementById("about-toggle");
const aboutExtra = document.getElementById("about-extra");

if (aboutButton && aboutExtra) {
  function toggleAbout() {
    const isHidden = aboutExtra.hidden;

    aboutExtra.hidden = !isHidden;
    aboutButton.setAttribute("aria-expanded", String(isHidden));

    if (isHidden) {
      aboutButton.textContent = "Show less about me";
    } else {
      aboutButton.textContent = "Show more about me";
    }
  }

  aboutButton.addEventListener("click", toggleAbout);
}
const githubButton = document.getElementById("github-button");
const githubResult = document.getElementById("github-result");

if (githubButton && githubResult) {
  githubButton.addEventListener("click", async function () {
    githubResult.textContent = "Loading...";

    try {
      const response = await fetch(
        "https://api.github.com/users/kaybytecode"
      );

      if (!response.ok) {
        throw new Error("Unable to load profile.");
      }

      const profile = await response.json();

      githubResult.textContent =
        "GitHub profile: " + (profile.name || profile.login);
    } catch (error) {
      githubResult.textContent =
        "Sorry, the profile could not be loaded. Please try again.";
    }
  });
}
