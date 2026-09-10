(function () {
  "use strict";

  const fileInput = document.getElementById("fileInput");
  const fileDrop = document.getElementById("fileDrop");
  const imageList = document.getElementById("imageList");
  const frameSelect = document.getElementById("frameSelect");
  const customRatioRow = document.getElementById("customRatioRow");
  const ratioWInput = document.getElementById("ratioW");
  const ratioHInput = document.getElementById("ratioH");
  const frameBox = document.getElementById("frameBox");
  const framePlaceholder = document.getElementById("framePlaceholder");
  const editImg = document.getElementById("editImg");
  const controls = document.getElementById("controls");
  const zoomSlider = document.getElementById("zoomSlider");
  const zoomReadout = document.getElementById("zoomReadout");
  const posReadout = document.getElementById("posReadout");
  const resetBtn = document.getElementById("resetBtn");
  const saveBtn = document.getElementById("saveBtn");
  const resultsList = document.getElementById("resultsList");
  const copyAllBtn = document.getElementById("copyAllBtn");
  const clearAllBtn = document.getElementById("clearAllBtn");
  const browsePhotosBtn = document.getElementById("browsePhotosBtn");
  const photosBrowser = document.getElementById("photosBrowser");
  const photosBrowserList = document.getElementById("photosBrowserList");
  const selectAllPhotosBtn = document.getElementById("selectAllPhotosBtn");
  const addSelectedPhotosBtn = document.getElementById("addSelectedPhotosBtn");

  const FRAME_PRESETS = {
    headshot: { label: "Board headshot (circle)", ratioW: 1, ratioH: 1, circle: true },
    gallery: { label: "Event gallery thumbnail (4:3)", ratioW: 4, ratioH: 3, circle: false },
    square: { label: "Square / logo spot", ratioW: 1, ratioH: 1, circle: false },
    custom: { label: "Custom aspect ratio", ratioW: 1, ratioH: 1, circle: false },
  };

  let images = [];
  let currentImageId = null;
  let results = [];
  let dragState = null;

  function uid() {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  function currentFrame() {
    const key = frameSelect.value;
    const preset = FRAME_PRESETS[key];
    if (key === "custom") {
      return {
        label: preset.label,
        ratioW: Math.max(1, Number(ratioWInput.value) || 1),
        ratioH: Math.max(1, Number(ratioHInput.value) || 1),
        circle: false,
      };
    }
    return preset;
  }

  function sizeFrameBox() {
    const frame = currentFrame();
    const MAX = 320;
    let w, h;
    if (frame.ratioW >= frame.ratioH) {
      w = MAX;
      h = MAX * (frame.ratioH / frame.ratioW);
    } else {
      h = MAX;
      w = MAX * (frame.ratioW / frame.ratioH);
    }
    frameBox.style.width = `${w}px`;
    frameBox.style.height = `${h}px`;
    frameBox.classList.toggle("circle", frame.circle);
  }

  function getEdit(image) {
    return image.edit;
  }

  function applyTransform(image) {
    const e = getEdit(image);
    editImg.style.transform = `translate(${e.tx}%, ${e.ty}%) scale(${e.zoom})`;
    zoomSlider.value = e.zoom;
    zoomReadout.textContent = `Zoom: ${e.zoom.toFixed(2)}x`;
    posReadout.textContent = `Position: ${e.tx.toFixed(1)}%, ${e.ty.toFixed(1)}%`;
  }

  function renderImageList() {
    imageList.innerHTML = "";
    if (!images.length) {
      const li = document.createElement("li");
      li.className = "empty-hint";
      li.textContent = "No photos added yet.";
      imageList.appendChild(li);
      return;
    }
    images.forEach((image) => {
      const li = document.createElement("li");
      li.className = "image-item" + (image.id === currentImageId ? " active" : "");
      const thumb = document.createElement("img");
      thumb.src = image.dataUrl;
      thumb.alt = "";
      const name = document.createElement("span");
      name.className = "name";
      name.textContent = image.name;
      const removeBtn = document.createElement("button");
      removeBtn.className = "remove-btn";
      removeBtn.type = "button";
      removeBtn.textContent = "×";
      removeBtn.title = "Remove photo";
      removeBtn.addEventListener("click", (evt) => {
        evt.stopPropagation();
        removeImage(image.id);
      });
      li.appendChild(thumb);
      li.appendChild(name);
      li.appendChild(removeBtn);
      li.addEventListener("click", () => selectImage(image.id));
      imageList.appendChild(li);
    });
  }

  function selectImage(id) {
    currentImageId = id;
    const image = images.find((img) => img.id === id);
    renderImageList();
    if (!image) {
      editImg.hidden = true;
      framePlaceholder.hidden = false;
      controls.hidden = true;
      return;
    }
    framePlaceholder.hidden = true;
    editImg.hidden = false;
    editImg.src = image.dataUrl;
    editImg.alt = image.name;
    controls.hidden = false;
    applyTransform(image);
  }

  function removeImage(id) {
    images = images.filter((img) => img.id !== id);
    if (currentImageId === id) {
      currentImageId = images.length ? images[0].id : null;
    }
    renderImageList();
    if (currentImageId) {
      selectImage(currentImageId);
    } else {
      editImg.hidden = true;
      framePlaceholder.hidden = false;
      controls.hidden = true;
    }
  }

  function addImage(name, src) {
    const image = {
      id: uid(),
      name,
      dataUrl: src,
      edit: { tx: 0, ty: 0, zoom: 1 },
    };
    images.push(image);
    return image;
  }

  function finishAdding(firstNewImage) {
    renderImageList();
    if (!currentImageId && firstNewImage) selectImage(firstNewImage.id);
  }

  function addFiles(fileList) {
    let firstNewImage = null;
    Array.from(fileList).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = () => {
        const image = addImage(file.name, reader.result);
        if (!firstNewImage) firstNewImage = image;
        finishAdding(firstNewImage);
      };
      reader.readAsDataURL(file);
    });
  }

  const IMAGE_EXT = /\.(png|jpe?g|gif|webp|bmp|svg)$/i;
  let photosFolderEntries = null;

  async function loadPhotosFolderEntries() {
    const res = await fetch("../Photos/");
    if (!res.ok) throw new Error("Could not read Photos folder");
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const anchors = Array.from(doc.querySelectorAll("a[href]"));
    return anchors
      .map((a) => a.getAttribute("href"))
      .filter((href) => IMAGE_EXT.test(href))
      .map((href) => ({ href, name: decodeURIComponent(href) }));
  }

  function renderPhotosBrowser() {
    photosBrowserList.innerHTML = "";
    photosFolderEntries.forEach((entry, index) => {
      const li = document.createElement("li");
      li.className = "photos-browser-item";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `photo-check-${index}`;
      checkbox.dataset.index = String(index);
      const thumb = document.createElement("img");
      thumb.src = "../Photos/" + entry.href;
      thumb.alt = "";
      thumb.loading = "lazy";
      const label = document.createElement("label");
      label.htmlFor = checkbox.id;
      label.textContent = entry.name;
      li.appendChild(checkbox);
      li.appendChild(thumb);
      li.appendChild(label);
      photosBrowserList.appendChild(li);
    });
  }

  browsePhotosBtn.addEventListener("click", async () => {
    if (!photosBrowser.hidden) {
      photosBrowser.hidden = true;
      browsePhotosBtn.textContent = "Browse Photos folder";
      return;
    }
    if (!photosFolderEntries) {
      try {
        photosFolderEntries = await loadPhotosFolderEntries();
      } catch (err) {
        alert("Couldn't read the Photos folder. Make sure this tool is opened through the local server, not as a file:// page.");
        return;
      }
    }
    renderPhotosBrowser();
    photosBrowser.hidden = false;
    browsePhotosBtn.textContent = "Hide Photos folder";
  });

  selectAllPhotosBtn.addEventListener("click", () => {
    const boxes = Array.from(photosBrowserList.querySelectorAll('input[type="checkbox"]'));
    const allChecked = boxes.length && boxes.every((box) => box.checked);
    boxes.forEach((box) => {
      box.checked = !allChecked;
    });
  });

  addSelectedPhotosBtn.addEventListener("click", () => {
    const boxes = Array.from(photosBrowserList.querySelectorAll('input[type="checkbox"]:checked'));
    if (!boxes.length) return;
    let firstNewImage = null;
    boxes.forEach((box) => {
      const entry = photosFolderEntries[Number(box.dataset.index)];
      const image = addImage(entry.name, "../Photos/" + entry.href);
      if (!firstNewImage) firstNewImage = image;
      box.checked = false;
    });
    finishAdding(firstNewImage);
  });

  fileInput.addEventListener("change", (evt) => addFiles(evt.target.files));
  fileDrop.addEventListener("click", () => fileInput.click());
  fileDrop.addEventListener("dragover", (evt) => {
    evt.preventDefault();
    fileDrop.classList.add("drag-over");
  });
  fileDrop.addEventListener("dragleave", () => fileDrop.classList.remove("drag-over"));
  fileDrop.addEventListener("drop", (evt) => {
    evt.preventDefault();
    fileDrop.classList.remove("drag-over");
    if (evt.dataTransfer.files.length) addFiles(evt.dataTransfer.files);
  });

  frameSelect.addEventListener("change", () => {
    customRatioRow.hidden = frameSelect.value !== "custom";
    sizeFrameBox();
  });
  ratioWInput.addEventListener("input", sizeFrameBox);
  ratioHInput.addEventListener("input", sizeFrameBox);

  function activeImage() {
    return images.find((img) => img.id === currentImageId) || null;
  }

  zoomSlider.addEventListener("input", () => {
    const image = activeImage();
    if (!image) return;
    image.edit.zoom = Number(zoomSlider.value);
    applyTransform(image);
  });

  frameBox.addEventListener("pointerdown", (evt) => {
    const image = activeImage();
    if (!image) return;
    frameBox.setPointerCapture(evt.pointerId);
    frameBox.classList.add("dragging");
    const rect = frameBox.getBoundingClientRect();
    dragState = {
      pointerId: evt.pointerId,
      startX: evt.clientX,
      startY: evt.clientY,
      startTx: image.edit.tx,
      startTy: image.edit.ty,
      width: rect.width,
      height: rect.height,
    };
  });

  frameBox.addEventListener("pointermove", (evt) => {
    if (!dragState || dragState.pointerId !== evt.pointerId) return;
    const image = activeImage();
    if (!image) return;
    const dxPct = ((evt.clientX - dragState.startX) / dragState.width) * 100;
    const dyPct = ((evt.clientY - dragState.startY) / dragState.height) * 100;
    image.edit.tx = clamp(dragState.startTx + dxPct, -75, 75);
    image.edit.ty = clamp(dragState.startTy + dyPct, -75, 75);
    applyTransform(image);
  });

  function endDrag(evt) {
    if (!dragState || (evt && dragState.pointerId !== evt.pointerId)) return;
    frameBox.classList.remove("dragging");
    dragState = null;
  }
  frameBox.addEventListener("pointerup", endDrag);
  frameBox.addEventListener("pointercancel", endDrag);

  frameBox.addEventListener(
    "wheel",
    (evt) => {
      const image = activeImage();
      if (!image) return;
      evt.preventDefault();
      const delta = evt.deltaY < 0 ? 0.05 : -0.05;
      image.edit.zoom = clamp(image.edit.zoom + delta, 1, 4);
      applyTransform(image);
    },
    { passive: false }
  );

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  resetBtn.addEventListener("click", () => {
    const image = activeImage();
    if (!image) return;
    image.edit = { tx: 0, ty: 0, zoom: 1 };
    applyTransform(image);
  });

  function buildSnippet(edit) {
    if (edit.tx === 0 && edit.ty === 0 && edit.zoom === 1) {
      return "(no adjustment needed — default centered cover)";
    }
    return `style="transform: translate(${edit.tx.toFixed(1)}%, ${edit.ty.toFixed(1)}%) scale(${edit.zoom.toFixed(2)});"`;
  }

  saveBtn.addEventListener("click", () => {
    const image = activeImage();
    if (!image) return;
    const frame = currentFrame();
    const entry = {
      id: uid(),
      name: image.name,
      frame: frame.label,
      tx: image.edit.tx,
      ty: image.edit.ty,
      zoom: image.edit.zoom,
      snippet: buildSnippet(image.edit),
    };
    results.unshift(entry);
    renderResults();
  });

  function renderResults() {
    resultsList.innerHTML = "";
    if (!results.length) {
      const li = document.createElement("li");
      li.className = "empty-hint";
      li.textContent = "Nothing saved yet.";
      resultsList.appendChild(li);
      return;
    }
    results.forEach((entry) => {
      const li = document.createElement("li");
      li.className = "result-item";

      const nameRow = document.createElement("div");
      nameRow.className = "name";
      const nameSpan = document.createElement("span");
      nameSpan.textContent = entry.name;
      const removeBtn = document.createElement("button");
      removeBtn.className = "remove-btn";
      removeBtn.type = "button";
      removeBtn.textContent = "×";
      removeBtn.title = "Remove";
      removeBtn.addEventListener("click", () => {
        results = results.filter((r) => r.id !== entry.id);
        renderResults();
      });
      nameRow.appendChild(nameSpan);
      nameRow.appendChild(removeBtn);

      const meta = document.createElement("p");
      meta.className = "meta";
      meta.textContent = `${entry.frame} — zoom ${entry.zoom.toFixed(2)}x, position ${entry.tx.toFixed(1)}%, ${entry.ty.toFixed(1)}%`;

      const code = document.createElement("code");
      code.textContent = entry.snippet;

      const copyBtn = document.createElement("button");
      copyBtn.className = "btn-secondary copy-btn";
      copyBtn.type = "button";
      copyBtn.textContent = "Copy snippet";
      copyBtn.addEventListener("click", () => copyText(entry.snippet, copyBtn));

      li.appendChild(nameRow);
      li.appendChild(meta);
      li.appendChild(code);
      li.appendChild(copyBtn);
      resultsList.appendChild(li);
    });
  }

  function copyText(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
      if (!btn) return;
      const original = btn.textContent;
      btn.textContent = "Copied!";
      setTimeout(() => {
        btn.textContent = original;
      }, 1200);
    });
  }

  copyAllBtn.addEventListener("click", () => {
    const payload = results.map(({ id, ...rest }) => rest);
    copyText(JSON.stringify(payload, null, 2), copyAllBtn);
  });

  clearAllBtn.addEventListener("click", () => {
    results = [];
    renderResults();
  });

  sizeFrameBox();
  renderResults();
})();
