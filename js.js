// -------------------------------------------------------------------- filtre bounce -------------------------------------------------------------------- 
function extractLines(inputText) {
  const searchText = "550 5.7.1 Unfortunately";
  const lines = inputText.split("\n");
  const filteredLines = lines.filter(line => line.includes(searchText));
  
  // Create an object to store the last occurrence of each IP address
  const lastOccurrences = {};
  
  filteredLines.forEach(line => {
    const ipAddressMatch = line.match(/\((\d+\.\d+\.\d+\.\d+)\)/);
    if (ipAddressMatch) {
      const ipAddress = ipAddressMatch[1];
      lastOccurrences[ipAddress] = line;
    }
  });
  
  const resultText = Object.values(lastOccurrences).join("\n");
  return resultText;
}



// --------------------------------------------------------------------	returrn ip and errors 	------------------------------------------------------------------------------------
// function txt1_txt6(text) {
  // const lines = text.split('\n');
  // const ips = [];
  // const errorMessages = [];

  // for (let i = 0; i < lines.length; i++) {
    // const line = lines[i];
    // if (line.includes("550 5.7.1")) {
      // const ipMatch = /hotmail-(\d+\.\d+\.\d+\.\d+)/.exec(line);
      // const errorMessageMatch = /Error: "550 5.7.1 (.+)"/.exec(line);

      // if (ipMatch && ipMatch[1] && errorMessageMatch) {
        // ips.push(ipMatch[1]);
        // const errorMessage = errorMessageMatch[1] + line.slice(errorMessageMatch[0].length);
        // errorMessages.push(`Error: "550 5.7.1 ${errorMessage}"`);
      // }
    // }
  // }

  // return { ips, errorMessages };
// }


function txt1_txt6(text) {
  const lines = text.split('\n');
  const ips = [];
  const errorMessages = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes("550 5.7.1")) {
      const ipMatch = /messages from \[([\d.]+)\]/.exec(line); // Extract IP from messages from [x.x.x.x]
      const errorMessageMatch = /Error: "550 5.7.1 (.+)"/.exec(line);

      if (ipMatch && ipMatch[1] && errorMessageMatch) {
        const ipAddress = ipMatch[1];
        ips.push(ipAddress);
        const errorMessage = errorMessageMatch[1] + line.slice(errorMessageMatch[0].length);
        errorMessages.push({ ip: ipAddress, message: `Error: "550 5.7.1 ${errorMessage}` });
      }
    }
  }

  ips.sort((a, b) => {
    // Custom sorting function for IPs (small to big)
    const ipPartsA = a.split('.').map(part => parseInt(part));
    const ipPartsB = b.split('.').map(part => parseInt(part));
    for (let i = 0; i < 4; i++) {
      if (ipPartsA[i] !== ipPartsB[i]) {
        return ipPartsA[i] - ipPartsB[i];
      }
    }
    return 0;
  });

  errorMessages.sort((msgA, msgB) => {
    const ipA = msgA.ip.split('.').map(part => parseInt(part));
    const ipB = msgB.ip.split('.').map(part => parseInt(part));
    for (let i = 0; i < 4; i++) {
      if (ipA[i] !== ipB[i]) {
        return ipA[i] - ipB[i];
      }
    }
    return 0;
  });

  return { ips, errorMessages: errorMessages.map(msg => msg.message) };
}


// --------------------------------------------------------------------	REPLACE SPACE <SP>	------------------------------------------------------------------------------------







// --------------------------------------------------------------------	return ips not found 	------------------------------------------------------------------------------------




// --------------------------------------------------------------------	return imacros 	------------------------------------------------------------------------------------

function generateMacroScript(ips, errors, domains, email) {
  const names = ['Alice<SP>Smith', 'Bob<SP>Johnson', 'Charlie<SP>Williams', 'David<SP>Brown', 'Eva<SP>Miller', 'Grace<SP>Wilson', 'Henry<SP>JAVADI', 'Ivy<SP>Wilson', 'Jack<SP>Clark', 'Karen<SP>Taylor'];
  const Dedicated = ['Unknown', 'Dedicated', 'Shared'];
  const timeZones = [
  "Israel<SP>Standard<SP>Time",
  "Kaliningrad<SP>Standard<SP>Time",
  "Central<SP>Europe<SP>Standard<SP>Time",
  "W.<SP>Europe<SP>Standard<SP>Time",
  "GMT<SP>Standard<SP>Time",
  "Morocco<SP>Standard<SP>Time",
  "Central<SP>European<SP>Standard<SP>Time",
  "W.<SP>Central<SP>Africa<SP>Standard<SP>Time",
  "Jordan<SP>Standard<SP>Time",
  "GTB<SP>Standard<SP>Time",
  "Middle<SP>East<SP>Standard<SP>Time",
  "Egypt<SP>Standard<SP>Time",
  "South<SP>Africa<SP>Standard<SP>Time",
  "North<SP>Asia<SP>Standard<SP>Time",
  "SE<SP>Asia<SP>Standard<SP>Time",
  "Myanmar<SP>Standard<SP>Time",
  "Central<SP>Asia<SP>Standard<SP>Time",
  "Sri<SP>Lanka<SP>Standard<SP>Time",
  "AUS<SP>Central<SP>Standard<SP>Time",
  "Cen.<SP>Australia<SP>Standard<SP>Time",
  "Taipei<SP>Standard<SP>Time",
  "Korea<SP>Standard<SP>Time",
  "Tokyo<SP>Standard<SP>Time",
  "W.<SP>Australia<SP>Standard<SP>Time",
  "Singapore<SP>Standard<SP>Time",
  "Ulaanbaatar<SP>Standard<SP>Time",
  "China<SP>Standard<SP>Time",
  "Korea<SP>Standard<SP>Time",
  "Tokyo<SP>Standard<SP>Time",
  "Ulaanbaatar<SP>Standard<SP>Time",
  "China<SP>Standard<SP>Time",
  "North<SP>Asia<SP>Standard<SP>Time",
  "SE<SP>Asia<SP>Standard<SP>Time",
  "Central<SP>Asia<SP>Standard<SP>Time",
  "N.<SP>Central<SP>Asia<SP>Standard<SP>Time",
  ];


  const namesList = names.map(name => `${name}`).join("' '");
  const domainsList = domains.join(' ');
  const provider = [
  "Internet<SP>Service<SP>Provider<SP>(ISP)",
  "E-mail<SP>Service<SP>Provider<SP>(ESP)",
  "Windows<SP>Live<SP>Hotmail<SP>Customer",
  "Customer<SP>of<SP>an<SP>ISP<SP>other<SP>than<SP>Windows<SP>Live<SP>Hotmail",
  "University<SP>IT",
  "Business<SP>(non-marketing)",
  "Other"
];

	let scriptTemplate = "";
	  scriptTemplate += `\n`;
  for (let i = 1; i <= ips.length; i++) {
  scriptTemplate += `' ${i} `;
}

  scriptTemplate += `\n`;

  for (let i = 0; i < ips.length; i++) {
	const email1 = email[Math.floor(Math.random() * email.length)];
	const randomIndexProvider = Math.floor(Math.random() * provider.length);
	const randomProvider = provider[randomIndexProvider];
	const randomIndexName = Math.floor(Math.random() * names.length);
	const randomName = names[randomIndexName];
	const randomIndexZone = Math.floor(Math.random() * timeZones.length);
	const randomZone = timeZones[randomIndexZone];
	const randomIndexDedicated = Math.floor(Math.random() * Dedicated.length);
	const randomDedicated = Dedicated[randomIndexDedicated];
	
	const domainsArray = domainsList.split(' ');

	
    scriptTemplate += `
TAB OPEN
TAB T=${i + 1}
SET !ERRORIGNORE YES
SET !TIMEOUT_PAGE 5
SET !TIMEOUT_STEP 20
SET !TIMEOUT_DOWNLOAD 15
VERSION BUILD=9030808 RECORDER=FX
URL GOTO=https://olcsupport.office.com/
TAG POS=1 TYPE=INPUT:TEXT FORM=NAME:NoFormName ATTR=ID:IssueTitle CONTENT=bounce
TAG POS=1 TYPE=INPUT:TEXT FORM=NAME:NoFormName ATTR=ID:ContactName CONTENT=${randomName}
TAG POS=1 TYPE=SELECT FORM=NAME:NoFormName ATTR=ID:DomainTo CONTENT=%hotmail.com
TAG POS=1 TYPE=INPUT:TEXT FORM=NAME:NoFormName ATTR=ID:ContactEmail CONTENT=${email1}
TAG POS=1 TYPE=SELECT FORM=NAME:NoFormName ATTR=ID:ddlTimezones CONTENT=%${randomZone}
TAG POS=1 TYPE=INPUT:TEXT FORM=NAME:NoFormName ATTR=ID:DomainFrom CONTENT=${domainsArray[i]}
TAG POS=1 TYPE=SELECT FORM=NAME:NoFormName ATTR=ID:SelfDescription CONTENT=%${randomProvider}
TAG POS=1 TYPE=TEXTAREA FORM=NAME:NoFormName ATTR=ID:IpAddresses CONTENT=${ips[i]}
TAG POS=1 TYPE=SELECT FORM=NAME:NoFormName ATTR=ID:ServerType CONTENT=%${randomDedicated}
TAG POS=1 TYPE=TEXTAREA FORM=NAME:NoFormName ATTR=ID:ErrorMessages CONTENT=${errors[i]}
TAG POS=1 TYPE=TEXTAREA FORM=NAME:NoFormName ATTR=ID:WebsiteUrl CONTENT=http://${domainsArray[i]}/
wait seconds=5
TAG POS=1 TYPE=BUTTON FORM=NAME:NoFormName ATTR=TXT:Submit`;
  }
  scriptTemplate += `\n`;
  return scriptTemplate;
}
function spaceError(errorMessages) {
  return errorMessages.map(message => message.replace(/\s+/g, '<SP>'));
}


  // ------------------------------------------------------------------------------------------
let emailList = [];
let domains = [];
let ips = [];
let errorMessages = [];
let email_input = document.getElementById("textarea5");
let dom_input = document.getElementById("textarea2");
let bounce_input = document.getElementById("textarea1");

document.getElementById("execute-btn").addEventListener("click", function() {
	
  const inputText = document.getElementById("textarea1").value;
  if(inputText === ""){
	   bounce_input	.classList.add("empty-textarea");
  }
  else{
		  const extractedText = extractLines(inputText);
		  const result = txt1_txt6(extractedText);
		  ips = result.ips;  
		 if (ips.length === 0) {
		  alert('Error: The PMTA IPS is empty.');
		} else if (ips.length > 1170) {
		  alert('Error: The number of IPS is greater than 100.');
		} else {
		  errorMessages = result.errorMessages;  
		  document.getElementById("textarea3").value = ips.join("\n");
		}
	  
  }
  

});

document.getElementById("imacros-btn").addEventListener("click", function() {
  const email = document.getElementById("textarea5").value;
  emailList = email.split("\n").map(email => email.trim());  
  const dom = document.getElementById("textarea2").value;
  domains = dom.split("\n").map(email => email.trim());  
  // document.getElementById("textarea5").value = errorMessages.join("\n");
  const errorT = spaceError(errorMessages);
//-------------------
 


 
	if (dom_input.value.trim() === "" ) {
    dom_input.classList.add("empty-textarea");
	}



//--------------------

  
if (domains.length > ips.length) {
  alert('Error: There are more domains than IPS.');
} else if (domains.length < ips.length) {
  alert('Error: There are more IPS than domains.');
} else if(email_input.value.trim() === "" ) {
    email_input.classList.add("empty-textarea");
	  }else{ 
  // No error conditions, proceed with your code logic here
  document.getElementById("textarea3").value = errorT.join("\n");
  document.getElementById("textarea4").value = generateMacroScript(ips, errorT, domains, emailList);
}  
  
});

$(document).ready(function() {
    $("#textarea5").click(function() {
	email_input.classList.remove("empty-textarea");
   });

	 $("#textarea2").click(function() {
  dom_input.classList.remove("empty-textarea");
 });
  $("#textarea1").click(function() {
	bounce_input.classList.remove("empty-textarea");
  });
});
