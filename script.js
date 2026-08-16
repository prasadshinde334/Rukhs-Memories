const memories = [
 {title:"The Girl From 11th",year:"11th",image:"assets/images/E56C2E41-A76F-44BE-90C8-92490398E98B.jpeg",text:"She didn't know then how many smiles she would keep putting on other people's faces. But the smile was already there."},
 {title:"The Mehndi Girl",year:"A little passion",image:"assets/images/F70F6FA6-F3F1-40DC-950F-8827B7C36592.jpeg",text:"That love for mehndi — patience, tiny details, creativity. Some things are not hobbies; they are little pieces of who you are."},
 {title:"The Day That Became a Story",year:"A wish fulfilled",image:"assets/images/DB36CB0B-0FB3-4B87-9ABB-24700380C4F2.jpeg",text:"Ajmer was once something you wanted to do. Then one day, it became something you had actually done. Keep making wishes like that."},
 {title:"Eyes That Said Enough",year:"A difficult chapter",image:"assets/images/0C0EBABA-CF8F-44C1-A4B8-7EDA8E485D9E.jpeg",text:"There were days when you were genuinely unwell and things were hard. You still found your way through them."},
 {title:"A Smile Only She Knows",year:"A little moment",image:"assets/images/34C0AFFD-276A-4CB8-BD30-D6F4B29E273B.jpeg",text:"Some photographs don't need an explanation. The people who were there know exactly why the smile was real."},
 {title:"Birthday At Home",year:"2023",image:"assets/images/9AAADC71-3C55-4544-B1E9-A6DBBD979726.jpeg",text:"Cake, home, family and a birthday. There is something beautiful about being celebrated by the people who know you best."},
 {title:"Her Love For Sarees",year:"A signature",image:"assets/images/F7ADDE09-95EC-4A2C-9A86-D370C2B199CA.jpeg",text:"A saree, a mirror, a little confidence. Another version of Rukhsar worth keeping in the album."},
 {title:"The First Trip With Friends",year:"Travel",image:"assets/images/BDDDD1C1-64D5-45A4-99C0-DCC78658F9A5.jpeg",text:"The first trips with friends have their own magic — new places, inside jokes, photographs and stories that stay."},
 {title:"Teacher's Day",year:"College",image:"assets/images/F04FA745-4516-4DAC-846F-6DB09334EF16.jpeg",text:"The part of you that enjoys learning, teaching and evolving. That part deserves plenty more chapters."},
 {title:"The Special Hoodie",year:"Just her",image:"assets/images/B1699E6B-D6FB-427A-9DE2-1B60885C95E7.jpeg",text:"A little comfort, a little style and one more ordinary photograph that somehow becomes a memory."}
];

const traits=[
 ["01","Genuine","No selfish calculations. Just a naturally warm way of being with people."],
 ["02","Helpful","You notice when someone needs help and somehow find a way to be there."],
 ["03","For Family","When someone becomes yours, you care deeply. Mum, Ruhan, Bhaiya, Bhabhi — your people matter."],
 ["04","Beautiful Heart","The kind of heart that can care about small things and still dream about big things."],
 ["05","Makes People Comfortable","Friendly enough to make a new room feel familiar."],
 ["06","Cooks With Love","Cooking is not just cooking when you are making something for someone you love."],
 ["07","Always Evolving","Teaching, learning, travelling, trying again — never really standing still."],
 ["08","A Little Wanderer","Travel and dance are two more ways the happy version of you comes out." ]
];

const memoryGrid=document.getElementById("memoryGrid");
memories.forEach((m,i)=>{
 const card=document.createElement("article");
 card.className="memory-card has-photo reveal-section";
 card.innerHTML=`<div class="visual" style="background-image:url('${m.image}')"></div><div class="memory-number">${String(i+1).padStart(2,"0")}</div><div class="memory-info"><small>${m.year}</small><h3>${m.title}</h3><p>${m.text}</p></div><div class="expand">↗</div>`;
 card.addEventListener("click",()=>openModal(m)); memoryGrid.appendChild(card);
});

const traitGrid=document.getElementById("traitGrid");
traits.forEach(t=>{const el=document.createElement("article");el.className="trait reveal-section";el.innerHTML=`<div class="num">${t[0]}</div><h3>${t[1]}</h3><p>${t[2]}</p>`;traitGrid.appendChild(el)});

const modal=document.getElementById("modal"),modalMedia=document.getElementById("modalMedia"),modalText=document.getElementById("modalText");
function openModal(m){modalMedia.innerHTML=m.image?`<img src="${m.image}" alt="${m.title}">`:"";modalText.innerHTML=`<small>${m.year||""}</small><h3>${m.title}</h3><p>${m.text}</p>`;modal.classList.add("show");modal.setAttribute("aria-hidden","false")}
function closeModal(){modal.classList.remove("show");modal.setAttribute("aria-hidden","true");modalMedia.innerHTML=""}
document.getElementById("closeModal").onclick=closeModal;modal.addEventListener("click",e=>{if(e.target===modal)closeModal()});document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});

document.querySelectorAll(".choice").forEach(btn=>btn.addEventListener("click",()=>{const r=document.getElementById("introResponse");r.textContent=btn.dataset.mode==="not"?"I know. So for the next few minutes, don't solve anything. Just look at a few versions of yourself.":"Good. Then stay for a few minutes — there are memories here worth seeing again.";setTimeout(()=>document.getElementById("memories").scrollIntoView({behavior:"smooth"}),900)}));

document.querySelectorAll(".envelope").forEach(btn=>btn.addEventListener("click",()=>openModal({title:btn.textContent,text:btn.dataset.msg})));
document.getElementById("randomBtn").onclick=()=>{const m=memories[Math.floor(Math.random()*memories.length)],box=document.getElementById("randomMemory");box.style.opacity=0;setTimeout(()=>{box.innerHTML=`<img src="${m.image}" alt=""/><span>“${m.text}”<br><small>— ${m.title}</small></span>`;box.style.opacity=1},180)};
document.getElementById("replay").onclick=()=>window.scrollTo({top:0,behavior:"smooth"});
document.getElementById("menuBtn").onclick=()=>document.getElementById("nav").classList.toggle("open");document.querySelectorAll("nav a").forEach(a=>a.onclick=()=>document.getElementById("nav").classList.remove("open"));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.08});document.querySelectorAll(".reveal-section").forEach(el=>observer.observe(el));

// The soundtrack is intentionally persistent across the whole experience.
// Browsers require a user gesture before audible autoplay; the Enter button provides that gesture.
const backgroundMusic = document.getElementById("backgroundMusic");
const musicGate = document.getElementById("musicGate");
const enterJourney = document.getElementById("enterJourney");
const musicToggle = document.getElementById("musicToggle");

backgroundMusic.loop = true;
backgroundMusic.volume = 0.42;

async function startJourney() {
  try {
    await backgroundMusic.play();
    musicGate.classList.add("hidden");
    musicToggle.classList.add("playing");
    musicToggle.innerHTML = '♫ <span>Soundtrack on</span>';
    musicToggle.setAttribute("aria-label", "Pause soundtrack");
  } catch (err) {
    // If a browser still blocks playback, the visible control remains available.
  }
}

enterJourney.addEventListener("click", startJourney);

// Also start it from the first meaningful interaction, so the experience doesn't
// depend on the user clicking a particular control.
document.addEventListener("pointerdown", () => {
  if (backgroundMusic.paused) startJourney();
}, { once: true });

musicToggle.addEventListener("click", async () => {
  if (backgroundMusic.paused) {
    await startJourney();
  } else {
    backgroundMusic.pause();
    musicToggle.classList.remove("playing");
    musicToggle.innerHTML = '♫ <span>Soundtrack off</span>';
    musicToggle.setAttribute("aria-label", "Play soundtrack");
  }
});

// Keep the small player in sync if the browser pauses the media.
backgroundMusic.addEventListener("play", () => {
  musicToggle.classList.add("playing");
  musicToggle.innerHTML = '♫ <span>Soundtrack on</span>';
});
backgroundMusic.addEventListener("pause", () => {
  musicToggle.classList.remove("playing");
});
