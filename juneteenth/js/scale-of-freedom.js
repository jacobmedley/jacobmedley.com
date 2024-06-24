document.addEventListener('DOMContentLoaded', () => {
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

      content.description.forEach(paragraph => {
        const p = document.createElement('p');
        p.textContent = paragraph;
        div.appendChild(p);
      });

      const hr = document.createElement('hr');
      div.appendChild(hr);

      const source = document.createElement('p');
      source.classList.add('year-source');
      const textClass = sectionClass.split(' ').find(cls => cls.startsWith('text-'));
      source.innerHTML = `Source: <a class="${textClass}" href="${content.source.url}" target="_blank">${content.source.text} <i class="fa-regular fa-arrow-up-right-from-square"></i></a>`;
      div.appendChild(source);

      const keepGoingMessage = document.createElement('p');
      keepGoingMessage.classList.add('text-center', 'mt-5');
      keepGoingMessage.innerHTML = `<span class="d-block mb-3 fs-4">Keep on keeping on.</span><i class="fa-regular fa-arrow-down-long fa-bounce fa-2x"></i>`;
      div.appendChild(keepGoingMessage);

      section.classList.add('year-with-content');
    } else {
      section.classList.add('year-no-content');
    }

    section.appendChild(div);
    return section;
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

      const keepGoingMessage = document.createElement('p');
      keepGoingMessage.classList.add('text-center', 'mt-5');
      keepGoingMessage.innerHTML = `<span class="d-block mb-3 fs-4">Keep on keeping on.</span><i class="fa-regular fa-arrow-down-long fa-bounce fa-2x"></i>`;
      introDiv.appendChild(keepGoingMessage);

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
    handleStickySections();

    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 1000);
    }, 1000);
  }

  function countYearSections() {
    const yearSections = document.querySelectorAll('.year-section');
    const totalYearSections = yearSections.length;
    console.log(`Total number of year-section elements: ${totalYearSections}`);
  }

  function initializeScrollSpy() {
    console.log('Initializing scroll spy');

    const sections = document.querySelectorAll('#main > section, #scale-of-freedom-container > section');
    console.log(`Found ${sections.length} sections`);

    const navItems = document.querySelectorAll('.nav-item');
    console.log(`Found ${navItems.length} nav items`);

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
      console.log('Scrolling...');
      let currentSectionId = '';
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        console.log(`Section ${section.id} rect: top=${rect.top}, bottom=${rect.bottom}`);
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          currentSectionId = section.id;
        }
      });
      if (currentSectionId) {
        console.log(`Currently in section: ${currentSectionId}`);
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
      console.log(`Year counter updated to: ${currentCount}`);
    });
  }

  function handleStickySections() {
    const yearSections = document.querySelectorAll('.year-with-content');

    window.addEventListener('scroll', () => {
      let currentStickySection = null;

      yearSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom > 0) {
          if (currentStickySection && currentStickySection !== section) {
            currentStickySection.classList.remove('is-sticky');
          }
          section.classList.add('is-sticky');
          currentStickySection = section;
        } else {
          section.classList.remove('is-sticky');
        }
      });
    });
  }

  populateScaleOfFreedom();
});
