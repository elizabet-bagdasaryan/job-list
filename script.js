import data from "./data.json" assert { type: "json" };

const jobsList = document.querySelector(".jobs");
const card = document.querySelector(".card")
const searchbar = document.querySelector(".searchbar")
const clear = document.getElementById("clear")
const chosenDivs = document.querySelector('.chosen-items')

const createDomElement = (tag, className, src, text, event, eventFc) => {
  const element = document.createElement(tag);

  element.classList.add(className);

  if (src) {
    element.src = src;
  }

  if (text) {
    element.textContent = text;
  }

  if (event) {
    element[event] = () => {
      eventFc();
    };
  }
  return element;
};

let clickedCategories  = []

displayJobs(data);

function displayJobs(data) {
  jobsList.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    const {company,logo,brandNew,featured,position,role,level,postedAt,contract,location,languages,tools,} = data[i];

    const card = createDomElement("div", "card");
    const companyInfo = createDomElement("div","company-info")
    const schedule = createDomElement("div", "schedule")
    const skills = createDomElement("div", "skills")
    const leftSection = createDomElement("div", "left-section");
    const rightSection = createDomElement("div", "right-section");



    const photo = createDomElement("img", "logo", logo);
    const companyName= createDomElement("p", "company", null, company);
    const dateInfo = createDomElement("p", "new", null, brandNew);
    const featuredInfo = createDomElement("p", "featured", null, featured);

   
    const positionInfo = createDomElement("p","position",null,position);
    const roleInfo = createDomElement("p", "role", null, role);
    const levelInfo = createDomElement("p", "level", null, level);


    const postedAtInfo = createDomElement("p", "postedAt", null, postedAt);
    const contractInfo= createDomElement("li","contract",null,contract);
    const locationInfo = createDomElement("li", "location", null, location);

    const horizonalLine = document.createElement("hr");
   


    for (let i = 0; i <languages.length; i++) {
      let eachLanguage = createDomElement("p","language",null,languages);
      skills.append(eachLanguage);

      eachLanguage.textContent = languages[i];
    }

    for (let i = 0; i < tools.length; i++) {
      let eachTool = createDomElement("p","tool",null,tools);
      skills.append(eachTool);

      eachTool.textContent = tools[i];
    }
  const left = createDomElement("div","left")

  leftSection.append( companyInfo, positionInfo, schedule)
  left.append(photo,leftSection)
  rightSection.append( skills)
  companyInfo.append(companyName, dateInfo, featuredInfo)
  schedule.append(postedAtInfo, contractInfo, locationInfo)
  skills.append( roleInfo, levelInfo,)

  card.append(left,horizonalLine, rightSection)

  jobsList.append(card)

    if (dateInfo.innerHTML === "true") {
      dateInfo.innerHTML = "new!";
    } else {
      dateInfo.classList.add("not-featured");
    }

    if (featuredInfo.innerHTML === "true") {
      featuredInfo.innerHTML = "featured";
    } else {
      featuredInfo.classList.add("not-featured");
    }
  }
  
  let chosenRole = document.querySelectorAll(".role")
  let chosenLevel = document.querySelectorAll(".level")
  let chosenLanguage = document.querySelectorAll(".language")
  let chosenTool = document.querySelectorAll(".tool")

  clear.addEventListener("click", function () {
    clickedCategories = [];
    displayButtons();
    searchbar.classList.remove("searchbar-active")
    // searchbar.innerHTML = " "
    filtered();})


  chosenRole.forEach( (e)=> {
    e.addEventListener("click",  () =>{
      card.classList.add("searchbar-active")
      if (!clickedCategories.includes(e.textContent)) {
        clickedCategories.push(e.textContent)
        ;
      }
      displayButtons();
      filtered();
    });
  });

chosenLevel.forEach( (e)=> {
    e.addEventListener("click",()=> {
      searchbar.classList.add("searchbar-active")
      if (!clickedCategories.includes(e.textContent)) {
        clickedCategories.push(e.textContent);
      }

      filtered();
      displayButtons();
    });
  });

  chosenLanguage.forEach( (e)=> {
    e.addEventListener("click",  ()=> {
      searchbar.classList.add("searchbar-active")
      if (!clickedCategories.includes(e.textContent)) {
        clickedCategories.push(e.textContent);
      }
      
      displayButtons();
      filtered();
    });
  });

chosenTool.forEach( (e)=> {
    e.addEventListener("click",  ()=> {
      searchbar.classList.add("searchbar-active")
      if (!clickedCategories.includes(e.textContent)) {
        clickedCategories.push(e.textContent);
      }
      displayButtons();
      filtered();
    });
  });
   
}
  
function filtered() {
  let search = data.filter((i) =>
    clickedCategories.every(
      (element) =>
        i.role === element ||i.level === element ||i.languages.includes(element) ||i.tools.includes(element)
    )
  );
  displayJobs(search);
}


function displayButtons() {
  chosenDivs.innerHTML = "";

  for (let i = 0; i < clickedCategories.length; i++) {
   const chosenOne = createDomElement("div", "chosen-one", null);
   chosenOne.textContent = clickedCategories[i];
   
   const remove = createDomElement("span", "delete", null, "x")
   chosenOne.append(remove)
   chosenDivs.append(chosenOne)
  }


}


