// const clickOpenShow = () => {
//     try {
//       const openButtons = document.getElementsByClassName("enter-button");
//       if (openButtons.length > 0) openButtons[0].click();
//     } catch(e) {
//       console.log("Enter button not available", e);
//     }
// };

  function checkForDiv() {
    var iframe = document.getElementsByClassName("fancybox-iframe")[0];
    if (iframe != null) {
      var inner_doc = iframe.contentWindow.document;
      const targetDiv = inner_doc.getElementById("dlslot_name_first"); //dlslot_name_first
      if (targetDiv != null) {
        return true;
      }
    }
    //second check
    targetDiv = document.getElementById("dlslot_name_first");
    return targetDiv !== null;
  }

  
  const fillForm = () => {
    var iframes = document.getElementsByClassName("fancybox-iframe");
    var inner_doc = null;
    // in an iframe / popup
    if (iframes.length > 0) {
      var iframe = iframes[0];
      inner_doc = iframe.contentWindow.document;
    }
    // not in an iframe / popup
    else {
      inner_doc = document;
    }

    console.log(inner_doc);

    // if (storage.profile){
      const firstName =  inner_doc.getElementById("dlslot_name_first");
      const lastName = inner_doc.getElementById("dlslot_name_last");
      const ticketQty = inner_doc.getElementById("dlslot_ticket_qty");
      const email = inner_doc.getElementById("dlslot_email");
      const month = inner_doc.getElementById("dlslot_dob_month");
      const day = inner_doc.getElementById("dlslot_dob_day");
      const year = inner_doc.getElementById("dlslot_dob_year");
      const zip = inner_doc.getElementById("dlslot_zip");
      const country = inner_doc.getElementById("dlslot_country");
      const tos = inner_doc.getElementById("dlslot_agree");
  
      try {
        chrome.storage.local.get(["firstName", "lastName", "dob", "email", "numTickets","zipCode","country"], (profile => {
          firstName.value = profile.firstName;
          lastName.value = profile.lastName;
          ticketQty.options.selectedIndex = profile.numTickets;
          email.value = profile.email;
          dob_list = profile.dob.split("-");
          console.log(profile.dob);
          month.value = dob_list[1];
          day.value = dob_list[2];
          year.value = dob_list[0];
          zip.value = profile.zipCode;
          country.options.selectedIndex = 1;
          tos.checked = true;
        }));
      } catch (e) {
        console.log("Form not available:", e.toString());
      }
    // }
  };
  // clickOpenShow();

  function waitForDiv() {
    // Define the target element and options for the observer
    const targetNode = document;
    const observerOptions = { childList: true, subtree: true };
  
    // Create the observer with a callback function
    const observer = new MutationObserver(function (mutationsList, observer) {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          console.log("mutated!");
          // Check if the target element is now available
          if (checkForDiv()) {
            fillForm();
            // Disconnect the observer once the form is filled
            observer.disconnect();
            return;
          }
        }
      }
    });
  
    // Start observing the target element
    observer.observe(targetNode, observerOptions);
  }
  

  fillForm();
  // Call the function to start waiting for the div
  waitForDiv();
