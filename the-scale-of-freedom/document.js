document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM loaded');
  const sections = document.querySelectorAll('section');
  const indicator = document.getElementById('indicator');
  console.log(`Sections: ${sections}`);
  console.log(`Indicator: ${indicator}`);

  const sectionPositions = [
    { id: 'slavery', start: 0, end: 60.74 },
    { id: 'emancipation', start: 60.74, end: 63.70 },
    { id: 'post-reconstruction', start: 63.70, end: 85.18 },
    { id: 'civil-rights', start: 85.18, end: 88.64 },
    { id: 'post-civil-rights', start: 88.64, end: 100 }
  ];

  function updateIndicator() {
    console.log('updateIndicator() is called');

    // 1. Calculate the Total Scrollable Height
    let totalScrollableHeight = document.documentElement.scrollHeight - window.outerHeight;
    console.log(`Total Scrollable Height: ${totalScrollableHeight}`);

    // 2. Adjust Scroll Position Calculation
    let scrollPosition = window.scrollY / totalScrollableHeight * 100;
    console.log(`Adjusted Scroll Position: ${scrollPosition}`);

    sectionPositions.forEach((section, index) => {
      console.log(`Section: ${section.id}`);

      let sectionTop = section.start;
      let sectionBottom = section.end;
      let sectionHeight = sectionBottom - sectionTop;
      console.log(`sectionTop: ${sectionTop}`);
      console.log(`sectionHeight: ${sectionHeight}`);
      console.log(`sectionBottom: ${sectionBottom}`);

      if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
        let percentage = ((scrollPosition - sectionTop) / sectionHeight) * 99.6;
        console.log(`Percentage: ${percentage}`);
        indicator.style.left = `calc(${percentage}% - 8px)`; // Adjust the 15px offset based on the indicator's width for centering
      }
    });
  }

  function testUpdateIndicator() {
    console.log('updateIndicator() is called');

    let scrollPosition = window.scrollY + window.innerHeight / 2;
    sectionPositions.forEach((section, index) => {
      console.log(`Section: ${section.id}`);
      let rect = section.getBoundingClientRect();
      let sectionTop = rect.top + window.scrollY;
      let sectionHeight = rect.height;
      let sectionBottom = sectionTop + sectionHeight;
      console.log(`rect: ${rect}`);
      console.log(`sectionTop: ${sectionTop}`);
      console.log(`sectionHeight: ${sectionHeight}`);
      console.log(`sectionBottom: ${sectionBottom}`);

      if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
        console.log(`if statement`);
        let percentage = ((scrollPosition - sectionTop) / sectionHeight) * (sectionPositions[index].end - sectionPositions[index].start) + sectionPositions[index].start;
        indicator.style.left = `${percentage}%`;
      }
    });
  }

  window.addEventListener('scroll', updateIndicator);
  window.addEventListener('resize', updateIndicator);
  updateIndicator();
});



{
  "title": "Open",
    "class": "content-container text-white bg-black",
      "intro": {
    "title": "The Scale of Freedom",
      "subtitle": "\"The Scale of Freedom\" explores the extensive history and timeline of Black American rights, focusing on the significant milestones that have shaped the journey from slavery to the present day.",
        "description": [
          "This project aims to highlight the immense length of time it took to achieve the freedoms and rights that Black Americans have today, illustrating just how recently these advancements have occurred in the grand scope of history. The timeline will show the arduous struggle for freedom, equality, and justice, emphasizing that we are in a relatively new era of freedom for Black Americans descended from slavery.",
          "Despite the progress made, the journey is ongoing, and the pursuit of true equality and the eradication of systemic racism continue to be crucial endeavors."
        ]
  }
},


< !-- < script >
  document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded');
    const sections = document.querySelectorAll('section');
    const indicator = document.getElementById('indicator');
    console.log(`Sections: ${sections}`);
    console.log(`Indicator: ${indicator}`);

    const sectionPositions = [
      { id: 'slavery', start: 0, end: 60.74 },
      { id: 'emancipation', start: 60.74, end: 63.70 },
      { id: 'post-reconstruction', start: 63.70, end: 85.18 },
      { id: 'civil-rights', start: 85.18, end: 88.64 },
      { id: 'post-civil-rights', start: 88.64, end: 100 }
    ];

    function updateIndicator() {
      console.log('updateIndicator() is called');

      // 1. Calculate the Total Scrollable Height
      let totalScrollableHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      console.log(`Total Scrollable Height: ${totalScrollableHeight}`);

      // 2. Adjust Scroll Position (%) Calculation
      let scrollPosition = window.scrollY / totalScrollableHeight * 100;
      console.log(`Adjusted Scroll Position: ${scrollPosition}`);

      sectionPositions.forEach((section, index) => {
        console.log(`Section: ${section.id}`);

        let sectionTop = section.start;
        let sectionBottom = section.end;
        let sectionHeight = sectionBottom - sectionTop;
        console.log(`sectionTop: ${sectionTop}`);
        console.log(`sectionHeight: ${sectionHeight}`);
        console.log(`sectionBottom: ${sectionBottom}`);

        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
          let percentage = ((scrollPosition - sectionTop) / sectionHeight) * 99.6;
          console.log(`Percentage: ${percentage}`);
          // indicator.style.left = `calc(${percentage}% - 8px)`; 
          indicator.style.left = `${percentage}%`;
        }
      });
    }
    function updateIndicatorv1() {
      // Assuming there's an indicator element with the ID 'indicator'
      const indicator = document.getElementById('indicator');
      if (!indicator) {
        console.error('Indicator element not found');
        return;
      }

      // Get the total height of the document
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

      // Get the current scroll position
      const scrollPosition = window.scrollY;

      // Calculate the scroll percentage
      const scrollPercentage = (scrollPosition / totalHeight) * 100;

      // Update the indicator based on the scroll percentage
      // This example assumes the indicator's progress is shown with a width percentage
      // Adjust this logic based on how your indicator should reflect the scroll position
      indicator.style.left = `${scrollPercentage}%`;
    }

    // Listen for scroll events on the window and update the indicator
    window.addEventListener('scroll', updateIndicator);

    // Initialize the indicator position on page load
    document.addEventListener('DOMContentLoaded', updateIndicator);

    function updateIndicatorv0() {
      console.log('updateIndicator() is called');

      let scrollPosition = window.scrollY + window.innerHeight / 2;
      sectionPositions.forEach((section, index) => {
        console.log(`Section: ${section.id}`);
        let rect = section.getBoundingClientRect();
        let sectionTop = rect.top + window.scrollY;
        let sectionHeight = rect.height;
        let sectionBottom = sectionTop + sectionHeight;
        console.log(`rect: ${rect}`);
        console.log(`sectionTop: ${sectionTop}`);
        console.log(`sectionHeight: ${sectionHeight}`);
        console.log(`sectionBottom: ${sectionBottom}`);

        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
          console.log(`if statement`);
          let percentage = ((scrollPosition - sectionTop) / sectionHeight) * (sectionPositions[index].end - sectionPositions[index].start) + sectionPositions[index].start;
          indicator.style.left = `${percentage}%`;
        }
      });
    }

    window.addEventListener('scroll', updateIndicator);
    window.addEventListener('resize', updateIndicator);
    updateIndicator();
  });
</script > -->



  <script>
document.addEventListener('DOMContentLoaded', () => {
   const indicator = document.getElementById('indicator');
    const yearCounter = document.getElementById('year-counter');

   window.addEventListener('scroll', () => {
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

    // Update year counter based on scroll position
    const yearSections = document.querySelectorAll('.year-section');
    let currentYear = 0;

      yearSections.forEach((section, index) => {
         const rect = section.getBoundingClientRect();
    if (rect.top < viewportHeight / 2) {
      currentYear = parseInt(section.id.replace('year-', ''));
         }
      });

    yearCounter.textContent = currentYear || '1619';
   });
});
  </script>






// stable:

function handleStickySections() {
  const sections = document.querySelectorAll('.year-with-content');
  const menuHeight = document.getElementById('the-menu').offsetHeight;

  window.addEventListener('scroll', () => {
    let currentYearOnScreen = '';

    sections.forEach((section, index) => {
      const yearElement = section.querySelector('h2.year');
      const yearRect = yearElement.getBoundingClientRect();
      const yearSource = section.querySelector('.year-source');
      const yearSourceRect = yearSource.getBoundingClientRect();

      // Log information to understand current positions
      console.log(`Year ${yearElement.textContent}: yearRect.bottom=${yearRect.bottom}, yearSourceRect.bottom=${yearSourceRect.bottom}`);

      // Detect if the year element is at the bottom of the screen
      if (yearRect.top <= window.innerHeight && yearRect.bottom >= menuHeight) {
        console.log(`Year ${yearElement.textContent} is on screen`);
        currentYearOnScreen = yearElement.textContent;
      }

      // Detect if the year source is at the bottom of the menu
      if (yearSourceRect.bottom <= menuHeight) {
        console.log(`Year ${yearElement.textContent} source is at the bottom of the menu`);
      }

      // Detect if the year element scrolls off the bottom of the screen
      if (yearRect.bottom < 0) {
        console.log(`Year ${yearElement.textContent} went off the bottom of the screen`);
      }

      // Detect if the year element touches the #the-menu
      if (yearRect.bottom <= menuHeight && yearRect.top <= menuHeight) {
        console.log(`Year ${yearElement.textContent} touched the menu`);
      }
    });

    if (currentYearOnScreen) {
      console.log(`Current year with content on screen: ${currentYearOnScreen}`);
    }
  });
}





<!doctype html>
<html lang="en">

<head>
   <!-- Required meta tags -->
   <meta charset="utf-8">
   <meta name="description"
      content="Explore the extensive timeline of Black American rights from slavery to the present day. This page offers a year-by-year eperience with significant events, providing historical context.">
   <meta name="keywords"
      content="Black American history, Timeline of freedom, American history, Slavery to present, Black rights timeline, History of Black Americans, Year-by-year timeline, Jacob Medley, UX/UI Designer, Digital Strategist">


   <meta name="author" content="Jacob Medley">
   <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

   <meta property="og:image" content="https://jacobmedley.com/juneteenth/images/full-freedom.png">
   <meta property="og:image:type" content="image/png">
   <meta property="og:image:width" content="1024">
   <meta property="og:image:height" content="1024">

   <title>Scale of Freedom</title>
   <!-- ICON STUFF -->
   <link rel="apple-touch-icon" sizes="180x180" href="images/icons/apple-touch-icon.png">
   <link rel="icon" type="image/png" sizes="32x32" href="images/icons/favicon-32x32.png">
   <link rel="icon" type="image/png" sizes="16x16" href="images/icons/favicon-16x16.png">
   <link rel="manifest" href="images/icons/site.webmanifest">
   <link rel="mask-icon" href="images/icons/safari-pinned-tab.svg" color="#bb382c">
   <meta name="msapplication-TileColor" content="#bb382c">
   <meta name="theme-color" content="#ffffff">

   <script type="application/ld+json">
      {
          "@context": "https://schema.org/",
          "@type": "WebPage",
          "name": "Scale of Freedom",
          "description": "Explore the extensive timeline of Black American rights from slavery to present day. This page offers a detailed year-by-year account of significant events, providing historical context and insights.",
          "url": "https://jacobmedley.com/juneteenth/",
          "image": "https://jacobmedley.com/juneteenth/images/full-freedom.png",
          "author": {
              "@type": "Person",
              "name": "Jacob Medley",
              "url": "https://jacobmedley.com",
              "image": "https://jacobmedley.com/juneteenth/images/full-freedom.png",
              "sameAs": [
                  "https://jacobmedley.com",
                  "https://www.linkedin.com/in/jacobmedley/"
              ],
              "jobTitle": "UX/UI Designer and Digital Strategist",
              "worksFor": {
                  "@type": "Organization",
                  "name": "Mutual of America"
              }
          }
      }
      </script>


   <!-- Fonts -->
   <link rel="stylesheet" href="https://use.typekit.net/zps8jqb.css">

   <!-- The Style -->
   <link rel="stylesheet" href="../css/styles-freedom.css">

   <!-- Icons -->
   <script src="https://kit.fontawesome.com/644e13edf7.js" crossorigin="anonymous"></script>

   <!-- include template -->
   <!-- <script src="js/include.js"></script> -->

   <!-- Google Tag Manager -->
   <script>
      (function (w, d, s, l, i) {
         w[l] = w[l] || [];
         w[l].push({
            'gtm.start': new Date().getTime(), event: 'gtm.js'
         });
         var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
         j.async = true;
         j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
         f.parentNode.insertBefore(j, f);
      })(window, document, 'script', 'dataLayer', 'GTM-PC65Z8');
   </script>
   <!-- End Google Tag Manager -->
</head>

<body>

   <!-- Google Tag Manager (noscript) -->
   <noscript>
      <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PC65Z8" height="0" width="0"
         style="display:none;visibility:hidden"></iframe>
   </noscript>
   <!-- End Google Tag Manager (noscript) -->


   <div id="loading-screen">
      <div class="loading-message fa-fade fa-5x" style="--fa-animation-duration: 1s;">

         <span class="fa-stack" style="vertical-align: top;">
            <i class="fa-light fa-circle-notch fa-spin fa-stack-2x" style="--fa-animation-duration: 2s;"></i>
            <i class="fa-sharp fa-solid fa-hand-fist fa-stack-1x"></i>
         </span>

      </div>
   </div>

   <div class="offcanvas offcanvas-end bg-fourth text-white" tabindex="-1" id="theMenu" aria-labelledby="theMenuLabel">
      <div class="offcanvas-header border-1 border-bottom border-white">
         <h5 class="offcanvas-title" id="theMenuLabel"><i class="fa-regular fa-list-timeline"></i> Choose a Milestone
         </h5>
         <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
         <ul class="navbar-nav fa-ul">
            <li class="nav-item active active-open">
               <a class="nav-link" href="#open"><span class="fa-li"><i class="fa-sharp fa-solid   fa-circle"></i></span>
                  Introduction</a>
            </li>
            <li class="nav-item">
               <a class="nav-link" href="#slavery"><span class="fa-li"><i
                        class="fa-sharp fa-regular fa-circle"></i></span> Slavery</a>
            </li>
            <li class="nav-item">
               <a class="nav-link" href="#emancipation-reconstruction"><span class="fa-li"><i
                        class="fa-sharp fa-regular fa-circle"></i></span> Emancipation &#38;
                  Reconstruction</a>
            </li>
            <li class="nav-item">
               <a class="nav-link" href="#post-reconstruction"><span class="fa-li"><i
                        class="fa-sharp fa-regular fa-circle"></i></span> Post-Reconstruction</a>
            </li>
            <li class="nav-item">
               <a class="nav-link" href="#civil-rights"><span class="fa-li"><i
                        class="fa-sharp fa-regular fa-circle"></i></span> Civil Rights</a>
            </li>
            <li class="nav-item">
               <a class="nav-link" href="#post-civil-rights"><span class="fa-li"><i
                        class="fa-sharp fa-regular fa-circle"></i></span> Post-Civil Rights</a>
            </li>
            <li class="nav-item">
               <a class="nav-link" href="#today"><span class="fa-li"><i
                        class="fa-sharp fa-regular fa-circle"></i></span>Today</a>
            </li>
         </ul>
      </div>
   </div>

   <div id="screen">
      <aside id="time-line-container">
         <div class="timeline-section" id="timeline-slavery"></div>
         <div class="timeline-section" id="timeline-emancipation-reconstruction"></div>
         <div class="timeline-section" id="timeline-post-reconstruction"></div>
         <div class="timeline-section" id="timeline-civil-rights"></div>
         <div class="timeline-section" id="timeline-post-civil-rights"></div>
         <div id="indicator">
            <div id="year-counter" class="indicator-year">0</div>
            <div class="indicator-label">YEARS</div>
         </div>
      </aside>

      <div id="main">
         <header class="bg-white sticky-top">
            <nav id="the-menu" class="navbar navbar-expand-lg navbar-light">
               <div class="container-fluid">
                  <a href="#" class="navbar-brand"><i class="fa-sharp fa-solid fa-hand-fist"></i></a>
                  <button class="btn btn-lg btn-outline-fourth" type="button" data-bs-toggle="offcanvas"
                     data-bs-target="#theMenu" aria-controls="theMenu">
                     <i class="fa-sharp fa-list-timeline"></i> Key Milestones </button>
               </div>
            </nav>
         </header>

         <section id="open" class="content-container text-white bg-black">
            <section id="intro-open" class="content-section intro-section">
               <div class="content">
                  <h2 class="intro-title fw-bold">The Scale of Freedom</h2>
                  <p class="intro-subtitle d-none d-md-block">"The Scale of Freedom" explores the extensive history and
                     timeline of Black
                     American rights, focusing on the significant milestones that have shaped the journey from slavery
                     to
                     the
                     present day.</p>
                  <p>This project aims to highlight the immense length of time it took to achieve the freedoms and
                     rights
                     that
                     Black Americans have today, illustrating just how recently these advancements have occurred in the
                     grand
                     scope of history. <span class="d-none d-md-block">The timeline will show the arduous
                        struggle for freedom, equality, and justice,
                        emphasizing that we are in a relatively new era of freedom for Black Americans descended from
                        slavery.</span>
                  </p>
                  <p class="d-none d-md-block">Despite the progress made, the journey is ongoing, and the pursuit of
                     true equality and the
                     eradication
                     of systemic racism continue to be crucial endeavors.</p>
                  <p class="text-center mt-5">
                     <span class="d-block fs-2 fw-bold">Journey to Freedom</span>
                     <span class="d-block mb-3 fs-4">It's going to be awhile.</span>
                     <i class="fa-regular fa-arrow-down-long fa-bounce fa-2x"></i>
                  </p>
               </div>
            </section>
         </section>


         <div id="scale-of-freedom-container"></div>


      </div>
   </div>

   <script>
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

            // initializeIntersectionObserver();

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


         // function initializeIntersectionObserver() {
         //    const sections = document.querySelectorAll('.year-with-content');
         //    const menuHeight = document.getElementById('the-menu').offsetHeight;

         //    const observer = new IntersectionObserver((entries) => {
         //       entries.forEach(entry => {
         //          const section = entry.target.closest('.year-with-content');
         //          const yearElement = section.querySelector('h2.year');
         //          const isIntersecting = entry.isIntersecting;
         //          const yearRect = yearElement.getBoundingClientRect();

         //          if (isIntersecting) {
         //             section.classList.add('is-visible');
         //             console.log(`Added is-visible to section: ${section.id}`);

         //             // Handle stickiness
         //             if (yearRect.top <= menuHeight) {
         //                section.classList.add('is-sticky');
         //                section.style.top = `${menuHeight}px`;
         //             } else {
         //                section.classList.remove('is-sticky');
         //                section.style.top = 'auto';
         //             }
         //          } else {
         //             section.classList.remove('is-visible');
         //             console.log(`Removed is-visible from section: ${section.id}`);

         //             section.classList.remove('is-sticky');
         //             section.style.top = 'auto';
         //          }
         //       });
         //    }, {
         //       threshold: [0, 0.5, 1]
         //    });

         //    sections.forEach(section => {
         //       const yearElement = section.querySelector('h2.year');
         //       console.log(`Observing year element in section: ${section.id}`);
         //       observer.observe(yearElement);
         //    });
         // }

         populateScaleOfFreedom();
      });

   </script>



   <script src="../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>







</body>

</html>