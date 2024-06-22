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