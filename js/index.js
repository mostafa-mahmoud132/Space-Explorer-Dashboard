const AllAnchor = document.querySelectorAll("nav a");
const AllSection = document.querySelectorAll("section");
const Loadinputdate = document.getElementById("apod-date-input");

// Link Active Class Toggel


document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function () {

 
    document.querySelectorAll(".nav-link").forEach((l) => {
      
      
      l.classList.remove("bg-blue-500/10","text-slate-300","text-blue-400");
      
    });
  
    this.classList.add("text-blue-400" , "bg-blue-500/10");

  });
});

// Sidebar Toggle

let sidebarToggle = document.getElementById("sidebar-toggle");
let sidebar = document.getElementById("sidebar");

sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("sidebar-mobile");

  sidebar.style.cssText = sidebar.classList.contains("sidebar-mobile")
    ? ""
    : "z-index:1000;position:fixed;top:0;left:0;height:100%;backdrop-filter:blur(5px);transition:transform 0.3s ease;";

  sidebarToggle.style.cssText = sidebar.classList.contains("sidebar-mobile")
    ? ""
    : "z-index:1000;position:fixed;top:15px;left:260px;";
});

var DateNew = new Date().toISOString().split("T")[0]
Loadinputdate.value=DateNew



AllAnchor.forEach((link) => {
  link.addEventListener("click", function () {
    AllSection.forEach((sec) => {
      sec.classList.add("hidden");
    });

    document
      .getElementById(link.getAttribute("data-section"))
      .classList.remove("hidden");
  });
});

getspacetoday(DateNew);

async function getspacetoday(date) {
  document.getElementById("apod-loading").classList.remove("hidden");
  document.getElementById("apod-explanation").innerHTML = "loading...";
  document.getElementById("apod-image").classList.add("hidden");

  fetch(`https://api.nasa.gov/planetary/apod?api_key=Z1o92HQyQtRi4qwBmvRYnbj84VO0q6i0k5YNz5NY&date=${date}`)
    .then((res) => {
      return res.json();
    })
    .then((response) => {
let MyDate = new Date(response.date).toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric"  
    })
MyDate.setDate(MyDate.getDate() - 1);
      // document.getElementById("apod-image").setAttribute("src", response.hdurl);
      let imageUrl = response.hdurl || ""
      document.getElementById("apod-image").src = imageUrl;
      document.getElementById("apod-date-info").innerHTML=response.date
      document.getElementById("apod-date-detail").innerHTML=response.date
      document.getElementById("apod-explanation").innerHTML=response
      .explanation;
      document.getElementById("apod-explanation").innerHTML=`
      Astronomy Picture of the Day - ${MyDate}`
    })
    .finally(() => {
      document.getElementById("apod-loading").classList.add("hidden");
      document.getElementById("apod-image").classList.remove("hidden");
    });
}

document.getElementById("datechange").innerHTML=DateNew

document.getElementById("load-date-btn").addEventListener("click",function(){
    
    getspacetoday(Loadinputdate.value)
    
})
document.getElementById("today-apod-btn").addEventListener("click",function(){
    getspacetoday(DateNew)

  })
  Loadinputdate.addEventListener("input", function(){
    document.getElementById("datechange").innerHTML=Loadinputdate.value
  })
  
  
  //^.............LAUNCHES...........//
getlaunches()
function getlaunches (){
      fetch("https://lldev.thespacedevs.com/2.3.0/launches/upcoming")
    .then((res) => {
      return res.json();
    })
    .then((response) => {

        displaylaunches(response.results)
        document.getElementById("featured-launch").innerHTML=`
                    <div
              class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all"
            >
              <div
                class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              ></div>
              <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
                <div class="flex flex-col justify-between">
                  <div>
                    <div class="flex items-center gap-3 mb-4">
                      <span
                        class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2"
                      >
                        <i class="fas fa-star"></i>
                        Featured Launch
                      </span>
                      <span
                        class="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold"
                      >
                        Go
                      </span>
                    </div>
                    <h3 class="text-3xl font-bold mb-3 leading-tight">
                     ${response.results[0].name}
                    </h3>
                    <div
                      class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400"
                    >
                      <div class="flex items-center gap-2">
                        <i class="fas fa-building"></i>
                        <span>SpaceX</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-rocket"></i>
                        <span>Starship</span>
                      </div>
                    </div>
                    <div
                      class="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-6"
                    >
                      <i class="fas fa-clock text-2xl text-blue-400"></i>
                      <div>
                        <p class="text-2xl font-bold text-blue-400">2</p>
                        <p class="text-xs text-slate-400">Days Until Launch</p>
                      </div>
                    </div>
                    <div class="grid xl:grid-cols-2 gap-4 mb-6">
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-calendar"></i>
                          Launch Date
                        </p>
                        <p class="font-semibold">March 14, 2024</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-clock"></i>
                          Launch Time
                        </p>
                        <p class="font-semibold">12:00 PM UTC</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-map-marker-alt"></i>
                          Location
                        </p>
                        <p class="font-semibold text-sm">Starbase, Texas</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-globe"></i>
                          Country
                        </p>
                        <p class="font-semibold">USA</p>
                      </div>
                    </div>
                    <p class="text-slate-300 leading-relaxed mb-6">
                      The third integrated flight test of Starship. The
                      prototype for the heavy-lift launch vehicle is currently
                      being built by SpaceX.
                    </p>
                  </div>
                  <div class="flex flex-col md:flex-row gap-3">
                    <button
                      class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      <i class="fas fa-info-circle"></i>
                      View Full Details
                    </button>
                    <div class="icons self-end md:self-center">
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="far fa-heart"></i>
                      </button>
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="fas fa-bell"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="relative">
                  <div
                    class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50"
                  >
                    <!-- Placeholder image/icon since we can't load external images reliably without correct URLs -->
                          <img src="${response.results[0].image.image_url ?? './images/launch-placeholder.png'}" class="h-full w-full object-cover" alt="">

                    <div
                      class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
        `
            
    })
    
    
  }

  
  function displaylaunches (launches){
    let cartona=""

    for (let i = 1; i < launches.length; i++) {
        cartona+=`
                  <div
                  class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
            >
            <div
                class="relative h-48 bg-slate-900/50 flex items-center justify-center"
                >
                <img src="${launches[i].image.image_url}" class="h-full w-full object-cover" alt="">
                
                <span
                    class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
                  >
                    Go
                  </span>
                </div>
              </div>
              <div class="p-5">
                <div class="mb-3">
                  <h4
                    class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
                  >
                    Falcon 9 Block 5 | Starlink Group 6-44
                  </h4>
                  <p class="text-sm text-slate-400 flex items-center gap-2">
                    <i class="fas fa-building text-xs"></i>
                    SpaceX
                  </p>
                </div>
                <div class="space-y-2 mb-4">
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-calendar text-slate-500 w-4"></i>
                    <span class="text-slate-300">Mar 15, 2024</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-clock text-slate-500 w-4"></i>
                    <span class="text-slate-300">23:00 UTC</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-rocket text-slate-500 w-4"></i>
                    <span class="text-slate-300">Falcon 9</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                    <span class="text-slate-300 line-clamp-1">KSC, LC-39A</span>
                  </div>
                </div>
                <div
                  class="flex items-center gap-2 pt-4 border-t border-slate-700"
                >
                  <button
                    class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
                  >
                    Details
                  </button>
                  <button
                    class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <i class="far fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
        `
        
    }

    document.getElementById("launches-grid").innerHTML=cartona
}

  //^.............ALL planets...........//
                

async function getAllplanets(){
  
  try {
    const res =await fetch("https://solar-system-opendata-proxy.vercel.app/api/planets");
    if (!res.ok) {
      document.getElementById("planets-grid").lastElementChild.innerHTML = `
      
  <h3 style= " color:red;">  Server has error now please try anthor time </h3>
      `;
      return;
      
    }; 
    
    const data = await res.json();
    
    planets = data;
    displayplanets(planets);
  } catch {
    
  }
  
  
  
  
}
getAllplanets()

var planets=[]

function displayplanets (planets){
 let cartona =""

 for (let i = 0; i < planets.length; i++) {
  
  cartona+=`
            <div
            onclick="displaydetails(${i})"
              class="planet-card bg-slate-800/50 border border-slate-700 rounded-2xl p-4 transition-all cursor-pointer group"
              data-planet-id="mercury"
              style="--planet-color: #eab308"
              onmouseover="this.style.borderColor='#eab30880'"
              onmouseout="this.style.borderColor='#334155'"
            >
              <div class="relative mb-3 h-24 flex items-center justify-center">
                <img
                  class="w-20 h-20 object-contain group-hover:scale-110 transition-transform"
                  src="${planets[i].image}"
                  alt="Mercury"
                />
              </div>
              <h4 class="font-semibold text-center text-sm">${planets[i].name}</h4>
              <p class="text-xs text-slate-400 text-center">0.39 AU</p>
            </div>
  `
  
 }
 document.getElementById("planets-grid").innerHTML=cartona
}
  
function  displaydetails (i){
console.log(i);
document.getElementById("planet-detail-image").setAttribute("src",planets[i].image)
document.getElementById("planet-detail-name").innerHTML=planets[i].name
document.getElementById("planet-detail-description").innerHTML=planets[i].description
}


