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

const aboutButton = $("#about-toggle");
const aboutExtra = $("#about-extra");

if (aboutButton.length && aboutExtra.length) {
  aboutButton.on("click", function () {
    const isHidden = aboutExtra.prop("hidden");

    aboutExtra.prop("hidden", !isHidden);
    aboutButton.attr("aria-expanded", String(isHidden));

    if (isHidden) {
      aboutButton.text("Show less about me");
    } else {
      aboutButton.text("Show more about me");
    }
  });
}

const githubForm = document.getElementById("github-form");
const githubChoice = document.getElementById("github-choice");
const githubResult = document.getElementById("github-result");
const githubRepositories = document.getElementById("github-repositories");

if (githubForm && githubChoice && githubResult && githubRepositories) {
  githubForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    githubResult.textContent = "Loading...";
    githubRepositories.replaceChildren();

    const choice = githubChoice.value;
    let url = "";

    if (choice === "profile") {
      url = "https://api.github.com/users/kaybytecode";
    } else if (choice === "repositories") {
      url = "https://api.github.com/users/kaybytecode/repos?sort=updated&per_page=3";
    } else {
      githubResult.textContent = "Please select an option.";
      return;
    }

    const submitButton = githubForm.querySelector("button");
    submitButton.disabled = true;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("GitHub could not return the information.");
      }

      const data = await response.json();

      if (choice === "profile") {
        const name = data.name || data.login;

        githubResult.textContent =
          name + " has " + data.public_repos + " public repositories.";
      } else {
        githubResult.textContent =
          data.length + " public repositories loaded.";

        for (const repository of data) {
          const listItem = document.createElement("li");
          const link = document.createElement("a");

          link.textContent = repository.name;
          link.href = repository.html_url;

          listItem.appendChild(link);
          githubRepositories.appendChild(listItem);
        }
      }
    } catch (error) {
      githubResult.textContent =
        "Sorry, the information could not be loaded. Please try again.";
    } finally {
      submitButton.disabled = false;
    }
  });
}