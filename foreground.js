function getLinks(){
	var pageTitle = document.title
	console.log(pageTitle)

	var aTags = document.querySelectorAll("a")
	var allUrls = []
	var allLabels = []

    var pageUrl = window.location.href;


	if(aTags.length >1){
		aTags.forEach(a=>{
			var label = a.innerText;
			var url = a.href;
                if (url.includes("/show/") && !allUrls.includes(url)){
                    allLabels.push(label);
                    allUrls.push(url);
                }
		})

		chrome.storage.local.set({
			"urls": allUrls,
			"labels": allLabels,
			"pageTitle": pageTitle,
            "pageUrl": pageUrl
		})
	}	
}
getLinks()