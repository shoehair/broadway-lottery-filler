window.onload = e =>{

	var labels = [];
	var urls = [];
	var mainDiv = document.getElementById("mainDiv")
	var copyUrls = document.getElementById("copyLinks")
    var selectAllButton = document.getElementById("select-all");
    var unselectAllButton = document.getElementById("unselect-all");
    var createProfileButton = document.getElementById("create-profile");
    var saveProfileButton = document.getElementById("save-profile");
    var backButton = document.getElementById("back");

    var checkBoxList = document.getElementById("checkboxes");

    var mainDiv = document.getElementById("mainDiv");
    var profileDiv = document.getElementById("profileDiv");
	

	chrome.storage.local.get(["labels","urls","pageTitle","pageUrl"],(value)=>{
		labels=value.labels
		urls=value.urls
		for(var i=0;i<labels.length;i++){
            //play name
            console.log(labels[i])
            var playName = labels[i].split("(")[0]
            var playPrice = labels[i].split("Price")[1]
            var displayText = playName + " " + playPrice;
            displayText = displayText.replace(/(\r\n|\n|\r)/gm, "")
            console.log(displayText)

            var li = document.createElement('li');//li
            var checkbox = document.createElement('input');

            li.className = "checkbox-wrapper";
            checkbox.type = "checkbox";
            checkbox.value = 1;
            checkbox.className = "checkbox-show";

            var textBox = document.createElement("a")			
			textBox.classList.add("linkText")
			textBox.innerText = displayText
			textBox.target = "_blank"
			textBox.href = urls[i]
            
            li.appendChild(checkbox);
            li.appendChild(textBox);

            checkBoxList.appendChild(li)
		}
	});

	copyUrls.addEventListener("click",e=>{      
        console.log("select all three");  
        var links = [];
        document.querySelectorAll(".checkbox-wrapper").forEach( (checkbox_wrapper) => {
            checkbox = checkbox_wrapper.childNodes[0]
            if (checkbox.checked) {
                checkbox_wrapper.childNodes.forEach((node) => {
                    if (node.className == "linkText") {
                        links.push(node.href);
                    }
                })
            }
        });

        links.forEach( (link) => {
            console.log(link);
            chrome.tabs.create({ url: link, active:false });
        });

        
	})

    selectAllButton.addEventListener("click", e=> {
        console.log("clicked")
        document.querySelectorAll(".checkbox-wrapper").forEach( (checkbox_wrapper) => {
            checkbox = checkbox_wrapper.childNodes[0]
            checkbox.checked=true;
        });
    })

    unselectAllButton.addEventListener("click", e=> {
        console.log("clicked tow")
        document.querySelectorAll(".checkbox-wrapper").forEach( (checkbox_wrapper) => {
            checkbox = checkbox_wrapper.childNodes[0]
            checkbox.checked=false;
        });
    })

    createProfileButton.addEventListener("click", e=> {
        mainDiv.hidden = true
        profileDiv.hidden = false
    })

    backButton.addEventListener("click", e=> {
        mainDiv.hidden = false
        profileDiv.hidden = true
    })

    saveProfileButton.addEventListener("click", e=>{
        console.log("here")
        mainDiv.hidden = false
        profileDiv.hidden = true
        
        var firstName = document.getElementById("firstName").value;
        var lastName = document.getElementById("lastName").value;
        var dob = document.getElementById("dob").value;
        var email = document.getElementById("email").value;
        var numTickets = document.getElementById("numTickets").value;
        var zipCode = document.getElementById("zipCode").value;
        var country = document.getElementById("country").value;

        chrome.storage.local.set({"firstName":firstName, "lastName":lastName, "dob":dob, "email":email, "numTickets":numTickets,"zipCode":zipCode,"country":country});

        // Do something with the values (e.g., validation or sending to the server)
        console.log("First Name:", firstName);
        console.log("Last Name:", lastName);
        console.log("Date of Birth:", dob);
        console.log("Email:", email);
        console.log("Number of Tickets:", numTickets);
        console.log("ZIP Code:", zipCode);
        console.log("Country of Residence:", country);
    })
}
