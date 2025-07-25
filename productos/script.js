// Enable independent sliders for every .card-wrapper on the page
// --------------------------------------------------------------
// The original script assumed a single product card. This rewrite scopes
// queries and state *inside* each card-wrapper so you can duplicate the
// markup as many times as you need without interference.

(function () {
  // Loop through every product card on the page
  document.querySelectorAll('.card-wrapper').forEach((wrapper) => {
    const showcase = wrapper.querySelector('.img-showcase');
    const anchors = Array.from(wrapper.querySelectorAll('.img-select a'));

    // Guard clause – skip if required elements are missing
    if (!showcase || anchors.length === 0) return;

    let imgId = 1;

    // Switch image on thumbnail click
    anchors.forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        imgId = Number(anchor.dataset.id) || 1;
        slideImage();
      });
    });

    // Adjust showcase offset according to selected image
    function slideImage() {
      const displayWidth = showcase.querySelector('img:first-child').clientWidth;
      showcase.style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
    }

    // Initialise and keep in sync with viewport resizes
    slideImage();
    window.addEventListener('resize', slideImage, { passive: true });
  });
})();
