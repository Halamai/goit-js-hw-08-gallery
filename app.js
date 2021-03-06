const galleryItems = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

const refs = {
  galleryList: document.querySelector(".js-gallery"),
  openBigimageBtn: document.querySelector(".js-lightbox"),
  closeBigimageBtn: document.querySelector(
    `button[data-action="close-lightbox"]`
  ),
  clienBigimageBtn: document.querySelector(".lightbox__image"),
  closeBigimageBtnoverlay: document.querySelector(".lightbox__overlay"),
};
const galleryItemsLength = galleryItems.length - 1;

const makeGallerysList = (galleryItems) => {
  return galleryItems.map(({ preview, original, description }, index) => {
    return `<li class="gallery__item">
  <a
    class="gallery__link"
    href='${original}'
  >
    <img data-index='${index}'
      class="gallery__image"
      src='${preview}'
      data-source='${original}'
      alt='${description}'
    />
  </a>
</li>`;
  });
};
refs.galleryList.insertAdjacentHTML(
  "beforeend",
  makeGallerysList(galleryItems).join("")
);

let activeImage = 0;

function slider(e) {
  if (e.code === "ArrowRight") {
    activeImage += 1;
    if (activeImage > galleryItemsLength) {
      activeImage = 0;
    }
  } else if (e.code === "ArrowLeft") {
    activeImage -= 1;
    if (activeImage < 0) {
      activeImage = galleryItemsLength;
    }
  }
  refs.clienBigimageBtn.src = galleryItems[activeImage].original;
}

function galleryItemsClick(e) {
  e.preventDefault();
  if (!e.target.classList.contains("gallery__image")) {
    return;
  }
  activeImage = +e.target.dataset.index;

  refs.openBigimageBtn.classList.add("is-open");

  refs.clienBigimageBtn.src = e.target.dataset.source;
}

refs.closeBigimageBtn.addEventListener("click", closeimage);
function closeimage(e) {
  refs.openBigimageBtn.classList.add("is-open");
  refs.openBigimageBtn.classList.remove("is-open");
  refs.clienBigimageBtn.src = "";
}

function closesEsc(e) {
  if (e.code === "Escape") {
    closeimage();
  }
}

refs.galleryList.addEventListener("click", galleryItemsClick);
refs.closeBigimageBtnoverlay.addEventListener("click", closeimage);
window.addEventListener("keyup", closesEsc);
window.addEventListener("keyup", slider);
