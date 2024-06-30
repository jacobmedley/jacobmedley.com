function initializeNavigationButtons() {
  const introSections = Array.from(document.querySelectorAll('.era'));
  const yearSections = Array.from(document.querySelectorAll('.year-with-content'));

  let currentIntroIndex = -1;
  let currentYearIndex = -1;

  function updateCurrentIndices() {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    console.log("Window Scroll Position:", window.scrollY);
    console.log("Viewport Height:", window.innerHeight);

    let newIntroIndex = -1;
    let newYearIndex = -1;

    introSections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      console.log(`Intro Section: ${section.id}, Top: ${sectionTop}, Bottom: ${sectionBottom}`);
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        newIntroIndex = index;
      }
    });

    yearSections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      console.log(`Year Section: ${section.id}, Top: ${sectionTop}, Bottom: ${sectionBottom}`);
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        newYearIndex = index;
      }
    });

    if (newIntroIndex !== currentIntroIndex || newYearIndex !== currentYearIndex) {
      currentIntroIndex = newIntroIndex;
      currentYearIndex = newYearIndex;

      const prevIntro = introSections[currentIntroIndex - 1];
      const nextIntro = introSections[currentIntroIndex + 1];
      const currentIntro = introSections[currentIntroIndex];

      const prevYear = yearSections[currentYearIndex - 1];
      const nextYear = yearSections[currentYearIndex + 1];
      const currentYear = yearSections[currentYearIndex];

      console.log("Scroll Position: ", scrollPosition);
      console.log("Current Intro Index: ", currentIntroIndex);
      console.log("Current Year Index: ", currentYearIndex);

      console.log("Current Intro: ", currentIntro ? currentIntro.id : "None");
      console.log("Previous Intro: ", prevIntro ? prevIntro.id : "None");
      console.log("Next Intro: ", nextIntro ? nextIntro.id : "None");

      console.log("Current Year: ", currentYear ? currentYear.id : "None");
      console.log("Previous Year: ", prevYear ? prevYear.id : "None");
      console.log("Next Year: ", nextYear ? nextYear.id : "None");

      // Log positions
      if (currentYear) {
        console.log(`Current Year Section Position: Top=${currentYear.offsetTop}, Bottom=${currentYear.offsetTop + currentYear.offsetHeight}`);
      }
      if (prevYear) {
        console.log(`Previous Year Section Position: Top=${prevYear.offsetTop}, Bottom=${prevYear.offsetTop + prevYear.offsetHeight}`);
      }
      if (nextYear) {
        console.log(`Next Year Section Position: Top=${nextYear.offsetTop}, Bottom=${nextYear.offsetTop + nextYear.offsetHeight}`);
      }
    }
  }


  // Ensure initial state is correctly set
  window.addEventListener('load', updateCurrentIndices);
  window.addEventListener('scroll', updateCurrentIndices);

  // Initial state update
  updateCurrentIndices();
}




const nextButton = document.getElementById('btnNextYear');
const sections = Array.from(document.querySelectorAll('.year-with-content, .era'));

nextButton.addEventListener('click', () => {
  const currentPosition = window.scrollY;
  let nextSection = null;

  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;

    if (sectionTop > currentPosition) {
      nextSection = section;
      break;
    }
  }

  if (nextSection) {
    window.scrollTo({
      top: nextSection.offsetTop,
      behavior: 'smooth'
    });
  }
});