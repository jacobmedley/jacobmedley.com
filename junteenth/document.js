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
