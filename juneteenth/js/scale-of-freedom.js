
document.addEventListener('DOMContentLoaded', async () => {
  const loadingScreen = document.getElementById('loading-screen');
  const indicator = document.getElementById('indicator');
  const yearCounter = document.getElementById('year-counter');

  async function fetchScaleOfFreedomData() {
    const response = await fetch('data/ScaleOfFreedomData.json');
    const data = await response.json();
    return data;
  }

  function createYearSection(year, content = null, sectionClass = '') {
    const section = document.createElement('section');
    section.id = `year-${year}`;
    section.classList.add('content-section', 'year-section');

    const div = document.createElement('div');
    div.classList.add('content');

    const yearHeading = document.createElement('h2');
    yearHeading.classList.add('year', 'fw-bold');
    yearHeading.textContent = year;
    div.appendChild(yearHeading);

    if (content) {
      const titleHeading = document.createElement('h3');
      titleHeading.classList.add('title', 'fw-bold', 'mb-4', 'text-capitalize');
      titleHeading.textContent = content.title;
      div.appendChild(titleHeading);

      content.description.forEach((paragraph, index) => {
        const p = document.createElement('p');
        p.textContent = paragraph;
        if (index > 0) {
          p.classList.add('d-none', 'd-md-block');
        }
        div.appendChild(p);
      });

      const hr = document.createElement('hr');
      div.appendChild(hr);

      const source = document.createElement('p');
      source.classList.add('year-source');
      const textClass = sectionClass.split(' ').find(cls => cls.startsWith('text-'));
      source.innerHTML = `Source: <a class="${textClass}" href="${content.source.url}" target="_blank">${content.source.text} <i class="fa-regular fa-arrow-up-right-from-square"></i></a>`;
      div.appendChild(source);

      section.classList.add('year-with-content');
    } else {
      section.classList.add('year-no-content');
    }

    section.appendChild(div);
    return section;
  }

  function countYearSections() {
    const yearSections = document.querySelectorAll('.year-section');
    const totalYearSections = yearSections.length;
  }

  function createMainSection(title, intro, years, content, sectionClass, lastYearOfPreviousEra = 0) {
    const mainSection = document.createElement('section');
    mainSection.id = title.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-');

    if (sectionClass) {
      sectionClass.split(' ').forEach(cls => mainSection.classList.add(cls));
    }

    if (intro) {
      const introSection = document.createElement('section');
      introSection.id = `intro-${mainSection.id}`;
      introSection.classList.add('content-section', 'intro-section');
      const introDiv = document.createElement('div');
      introDiv.classList.add('content');
      const introHeading = document.createElement('h2');
      introHeading.classList.add('intro-title', 'fw-bold');
      introHeading.textContent = intro.title;
      introDiv.appendChild(introHeading);
      const introSubheading = document.createElement('p');
      introSubheading.classList.add('intro-subtitle');
      introSubheading.textContent = intro.subtitle;
      introDiv.appendChild(introSubheading);

      if (intro.description && intro.description.length > 0) {
        intro.description.forEach(paragraph => {
          const p = document.createElement('p');
          p.textContent = paragraph;
          introDiv.appendChild(p);
        });
      }

      introSection.appendChild(introDiv);
      mainSection.appendChild(introSection);
    }

    if (years && content) {
      let lastYear = lastYearOfPreviousEra || parseInt(years[0]);
      years.forEach((year) => {
        const currentYear = parseInt(year);

        for (let fillerYear = lastYear + 1; fillerYear < currentYear; fillerYear++) {
          const fillerSection = createYearSection(fillerYear, null, sectionClass);
          mainSection.appendChild(fillerSection);
        }

        const yearSection = createYearSection(currentYear, content[year], sectionClass);
        mainSection.appendChild(yearSection);

        lastYear = currentYear;
      });
    }

    return mainSection;
  }

  function initializeScrollSpy() {
    const sections = document.querySelectorAll('#main > section, #scale-of-freedom-container > section');
    const navItems = document.querySelectorAll('.nav-item');

    function activateNavItem(id) {
      navItems.forEach(item => {
        item.classList.remove('active', 'active-open', 'active-introduction');
        const icon = item.querySelector('i');

        if (icon) {
          icon.classList.remove('fa-solid');
          icon.classList.add('fa-regular');
        }

        if (item.querySelector(`a[href="#${id}"]`)) {
          item.classList.add('active');
          item.classList.add(`active-${id}`);

          if (icon) {
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
          }
        }
      });
    }

    window.addEventListener('scroll', () => {
      let currentSectionId = '';
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          currentSectionId = section.id;
        }
      });

      if (currentSectionId) {
        activateNavItem(currentSectionId);
      } else {
        console.log('No section in view');
      }

      const container = document.getElementById('scale-of-freedom-container');
      const containerHeight = container.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollPosition = window.scrollY;

      const totalScrollableHeight = containerHeight - viewportHeight;
      const scrollPercentage = scrollPosition / totalScrollableHeight;

      const indicatorHeight = indicator.offsetHeight;
      const timeLineContainerHeight = document.getElementById('time-line-container').offsetHeight;
      const maxIndicatorPosition = timeLineContainerHeight - indicatorHeight;

      indicator.style.top = `${scrollPercentage * maxIndicatorPosition}px`;

      // Update sequential year counter based on scroll position
      const yearSections = document.querySelectorAll('.year-section');
      let currentCount = 0;

      yearSections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < viewportHeight / 2) {
          currentCount = index;
        }
      });

      yearCounter.textContent = currentCount;
    });
  }

  async function populateScaleOfFreedom() {
    const data = await fetchScaleOfFreedomData();
    const container = document.getElementById('scale-of-freedom-container');
    let lastYearOfPreviousEra = 0;

    data.sections.forEach(section => {
      const mainSection = createMainSection(section.title, section.intro, section.years, section.content, section.class, lastYearOfPreviousEra);
      container.appendChild(mainSection);
      if (section.years && section.years.length > 0) {
        lastYearOfPreviousEra = parseInt(section.years[section.years.length - 1]);
      }
    });

    countYearSections();
    initializeScrollSpy();

    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 1000);
    }, 1000);
  }

  await populateScaleOfFreedom();

  function initializeNavigationButtons() {
    const introSections = Array.from(document.querySelectorAll('.era'));
    const yearSections = Array.from(document.querySelectorAll('.year-with-content'));

    let currentIntroIndex = -1;
    let currentYearIndex = -1;

    function updateCurrentIndices() {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      let newIntroIndex = -1;
      let newYearIndex = -1;

      introSections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          newIntroIndex = index;
        }
      });

      yearSections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
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

  initializeNavigationButtons();
});
