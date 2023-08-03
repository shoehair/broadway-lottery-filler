chrome.tabs.onActivated.addListener(tab=>{
	setTimeout(()=>{
		chrome.tabs.get(tab.tabId, curTabInfo =>{
			try{
				if(curTabInfo.url.startsWith("https://lottery") || curTabInfo.url.startsWith("http://lottery")){
					chrome.tabs.executeScript(null,{file:"./foreground.js"},()=>{console.log("Injected")}) //null means inject into active tab
				}
			}
			catch(e){
                console.log(e)
			}
		});
	},1000)
})