/*
 * Events Showcase gallery data.
 * To add a new photo or video, add an object to the matching category's
 * `items` array below. type: "image" or "video".
 * For videos, `poster` is optional (a still frame shown before playing).
 * `caption` fields (title/date/description) are all optional.
 * `position` is optional and controls where the thumbnail crop is centered,
 * e.g. "50% 50%" (dead center, the default), "50% 20%" (favor the top),
 * "20% 50%" (favor the left side).
 */
const galleryData = {
  ftc: {
    title: "FIRST Tech Challenge",
    description: "Regional, state, and world championship moments from our FTC team.",
    items: [
      {
        type: "image",
        src: "Photos/World Competition 2026.jpeg",
        alt: "Members of MOB (10949) after winning their division at the World Championship",
        position: "50% 50%",
        caption: { title: "World Competition 2026", date: "", description: "Members of MOB (10949) after winning their division at the World Championship" }
      },
      {
        type: "image",
        src: "Photos/Robot Work.JPEG",
        alt: "Members of MOB (10949) building their robot",
        position: "50% 50%",
        caption: { title: "Robot Work", date: "", description: "Members of MOB (10949) building their robot" }
      },
      {
        type: "image",
        src: "Photos/Regional Competition 2024.JPEG",
        alt: "Teams MOB (10949) and Leftovers (20203) after winning a regional FTC competition",
        position: "50% 50%",
        caption: { title: "Regional Competition 2024", date: "", description: "Teams MOB (10949) and Leftovers (20203) after winning a regional FTC competition" }
      },
      {
        type: "image",
        src: "Photos/Regional Competition 2024 2.JPEG",
        alt: "Team members of MOB (10949) attending the drivers meeting before competing",
        position: "50% 50%",
        caption: { title: "Regional Competition 2024", date: "", description: "Team members of MOB (10949) attending the drivers meeting before competing" }
      },
      {
        type: "image",
        src: "Photos/State Competition 2024.JPEG",
        alt: "Members of MOB (10949) deliberate after a heated match",
        position: "50% 50%",
        caption: { title: "State Competition 2024", date: "", description: "Members of MOB (10949) deliberate after a heated match" }
      },
      {
        type: "image",
        src: "Photos/World Competition 2023.JPEG",
        alt: "Member of MOB (10949) gets robot ready for the next match",
        position: "50% 50%",
        caption: { title: "World Competition 2023", date: "", description: "Member of MOB (10949) gets robot ready for the next match" }
      },
      {
        type: "image",
        src: "Photos/World Competition 2023 2.JPEG",
        alt: "Members of MOB (10949) get ready to compete in their match",
        position: "50% 50%",
        caption: { title: "World Competition 2023", date: "", description: "Members of MOB (10949) get ready to compete in their match" }
      },
      {
        type: "image",
        src: "Photos/State Competition 2023.JPEG",
        alt: "Members of MOB (10949) getting their robot ready to compete in a match",
        position: "50% 50%",
        caption: { title: "State Competition 2023", date: "", description: "Members of MOB (10949) getting their robot ready to compete in a match" }
      },
      {
        type: "video",
        src: "Photos/State Competition 2023.mp4",
        alt: "Members of MOB (10949) reacting after learning they made it to the World Competition",
        position: "50% 50%",
        caption: { title: "State Competition 2023", date: "", description: "Members of MOB (10949) reacting after learning they made it to the World Competition" }
      }
    ]
  },
  fll: {
    title: "FIRST LEGO League",
    description: "Highlights from FLL competitions and the teams we mentor.",
    items: [
      {
        type: "image",
        src: "Photos/FLL Competition 2026.jpg",
        alt: "Members of the FLL team show off their trophy after winning their competition",
        position: "50% 50%",
        caption: { title: "FLL Competition 2026", date: "", description: "Members of the FLL team show off their trophy after winning their competition" }
      },
      {
        type: "image",
        src: "Photos/FLL Competition 2026 2.jpg",
        alt: "Members of the FLL team show off their outreach project",
        position: "50% 30%",
        caption: { title: "FLL Competition 2026", date: "", description: "Members of the FLL team show off their outreach project" }
      },
      {
        type: "image",
        src: "Photos/FLL Competition 2026 3.jpg",
        alt: "Members of the FLL team get their robot ready for a match",
        position: "50% 50%",
        caption: { title: "FLL Competition 2026", date: "", description: "Members of the FLL team get their robot ready for a match" }
      }
    ]
  },
  joint: {
    title: "Joint Outreach",
    description: "Outreach with both the FTC teams at the high school and the FLL teams at the middle school",
    items: [
      {
        type: "image",
        src: "Photos/FLL Mentorship.JPEG",
        alt: "Members of John Jay robotics team in high school travel to the middle school to help the FLL teams at the middle school with their robots",
        position: "50% 50%",
        caption: { title: "FLL Mentorship", date: "", description: "Members of John Jay robotics team in high school travel to the middle school to help the FLL teams at the middle school with their robots" }
      },
      {
        type: "image",
        src: "Photos/FLL Mentorship 2.JPEG",
        alt: "Members of John Jay robotics team in high school travel to the middle school to help the FLL teams at the middle school with their robots",
        position: "50% 30%",
        caption: { title: "FLL Mentorship", date: "", description: "Members of John Jay robotics team in high school travel to the middle school to help the FLL teams at the middle school with their robots" }
      },
      {
        type: "image",
        src: "Photos/FLL Mentorship 3.JPEG",
        alt: "Members of John Jay robotics team in high school travel to the middle school to help the FLL teams at the middle school with their robots",
        position: "50% 75%",
        caption: { title: "FLL Mentorship", date: "", description: "Members of John Jay robotics team in high school travel to the middle school to help the FLL teams at the middle school with their robots" }
      }
    ]
  },
  outreach: {
    title: "Other Outreach",
    description: "Community events and STEM outreach beyond competition season.",
    items: [
      {
        type: "image",
        src: "Photos/Birthday Bash.JPEG",
        alt: "Member of MOB (10949) helps with STEM outreach at a birthday party",
        position: "50% 5%",
        caption: { title: "Birthday Bash", date: "", description: "Member of MOB (10949) helps with STEM outreach at a birthday party" }
      },
      {
        type: "image",
        src: "Photos/Spencer Levine Teaching.JPEG",
        alt: "Vice President and Treasurer Spencer Levine interning at the high school, teaching kids coding and basics of robot building",
        position: "50% 50%",
        caption: { title: "Spencer Levine Teaching", date: "", description: "Vice President and Treasurer Spencer Levine interning at the high school, teaching kids coding and basics of robot building" }
      },
      {
        type: "image",
        src: "Photos/Spencer Levine Teaching 2.JPEG",
        alt: "Vice President and Treasurer Spencer Levine interning at the high school, teaching kids coding and basics of robot building",
        position: "50% 50%",
        caption: { title: "Spencer Levine Teaching", date: "", description: "Vice President and Treasurer Spencer Levine interning at the high school, teaching kids coding and basics of robot building" }
      },
      {
        type: "image",
        src: "Photos/Spencer Levine Teaching 3.JPEG",
        alt: "Vice President and Treasurer Spencer Levine interning at the high school, teaching kids coding and basics of robot building",
        position: "50% 85%",
        caption: { title: "Spencer Levine Teaching", date: "", description: "Vice President and Treasurer Spencer Levine interning at the high school, teaching kids coding and basics of robot building" }
      }
    ]
  }
};

function buildCaptionHTML(caption) {
  if (!caption) return "";
  const { title, date, description } = caption;
  if (!title && !date && !description) return "";
  return `
    <div class="media-caption">
      ${title ? `<h3>${title}</h3>` : ""}
      ${date ? `<span class="media-date">${date}</span>` : ""}
      ${description ? `<p>${description}</p>` : ""}
    </div>
  `;
}

function buildHoverTitleHTML(caption) {
  if (!caption || !caption.title) return "";
  return `<span class="media-thumb-overlay">${caption.title}</span>`;
}

function buildThumbHTML(item) {
  const objectPosition = item.position || "50% 50%";

  if (item.type === "video") {
    const poster = item.poster ? ` poster="${item.poster}"` : "";
    return `
      <div class="media-thumb">
        <video src="${item.src}"${poster} muted preload="metadata" playsinline style="object-position: ${objectPosition};"></video>
        <span class="play-button" aria-hidden="true"></span>
        ${buildHoverTitleHTML(item.caption)}
      </div>
    `;
  }
  return `
    <div class="media-thumb">
      <img src="${item.src}" alt="${item.alt || ""}" loading="lazy" style="object-position: ${objectPosition};">
      ${buildHoverTitleHTML(item.caption)}
    </div>
  `;
}

function renderCategory(key, category) {
  const grid = document.getElementById(`gallery-${key}`);
  if (!grid) return;

  grid.innerHTML = category.items
    .map((item, index) => `
      <button type="button" class="media-card" data-category="${key}" data-index="${index}" aria-label="Open ${item.caption?.title || "media"} in lightbox">
        ${buildThumbHTML(item)}
      </button>
    `)
    .join("");
}

function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const content = document.getElementById("lightbox-media");
  const captionEl = document.getElementById("lightbox-caption");
  const closeBtn = document.getElementById("lightbox-close");

  function openLightbox(item) {
    content.innerHTML =
      item.type === "video"
        ? `<video src="${item.src}" controls autoplay playsinline></video>`
        : `<img src="${item.src}" alt="${item.alt || ""}">`;

    captionEl.innerHTML = buildCaptionHTML(item.caption).replace('class="media-caption"', 'class="lightbox-caption"');

    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
    content.innerHTML = "";
  }

  document.querySelectorAll(".media-grid").forEach((grid) => {
    grid.addEventListener("click", (event) => {
      const card = event.target.closest(".media-card");
      if (!card) return;
      const category = card.dataset.category;
      const index = Number(card.dataset.index);
      const item = galleryData[category].items[index];
      openLightbox(item);
    });
  });

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  Object.entries(galleryData).forEach(([key, category]) => renderCategory(key, category));
  initLightbox();
});
