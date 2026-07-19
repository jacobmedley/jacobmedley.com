// function includeJML() {
//   var z, i, elmnt, file, xhttp;
//   /* Loop through a collection of all HTML elements: */
//   z = document.getElementsByTagName("*");
//   for (i = 0; i < z.length; i++) {
//     elmnt = z[i];
//     /*search for elements with a certain atrribute:*/
//     file = elmnt.getAttribute("data-jm-include");
//     if (file) {
//       /* Make an HTTP request using the attribute value as the file name: */
//       xhttp = new XMLHttpRequest();
//       xhttp.onreadystatechange = function () {
//         if (this.readyState == 4) {
//           if (this.status == 200) { elmnt.innerHTML = this.responseText; }
//           if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
//           /* Remove the attribute, and call this function once more: */
//           elmnt.removeAttribute("data-jm-include");
//           includeJML();
//         }
//       }
//       xhttp.open("GET", file, true);
//       xhttp.send();
//       /* Exit the function: */
//       return;
//     }
//   }
// }

async function includeJML() {
  document.querySelectorAll('[data-jm-include]').forEach(async (elem) => {
    const file = elem.getAttribute('data-jm-include');
    try {
      const response = await fetch(file);
      if (response.ok) {
        const content = await response.text();
        elem.innerHTML = content;
      } else {
        console.error('Failed to load include file:', file);
      }
    } catch (error) {
      console.error('Error fetching include file:', file, error);
    }
  });
}