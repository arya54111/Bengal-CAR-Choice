/* ===== CONFIG: replace with real details ===== */
const WA = "918240813448";
const GOOGLE_PROFILE_URL = ""; // TODO: paste verified Google Business Profile URL
const HOURS = [["Mon","Closes 7:30 PM (listed)"],["Tue","Confirm with dealer"],["Wed","Confirm with dealer"],["Thu","Confirm with dealer"],["Fri","Confirm with dealer"],["Sat","Confirm with dealer"],["Sun","Confirm with dealer"]];
/* Sample cars only. Add "photo":"images/xyz.jpg" to use a real photo (falls back to the illustration). */
const CARS = [
 {id:1,make:"Maruti Suzuki",model:"Swift",year:2019,km:42000,fuel:"Petrol",gear:"Manual",type:"Hatchback",price:520000,color:"#c0392b",desc:"A compact city hatchback sample listing."},
 {id:2,make:"Hyundai",model:"Creta",year:2020,km:36000,fuel:"Diesel",gear:"Automatic",type:"SUV",price:1150000,color:"#9aa7b8",desc:"A family SUV sample listing."},
 {id:3,make:"Honda",model:"City",year:2018,km:58000,fuel:"Petrol",gear:"Automatic",type:"Sedan",price:780000,color:"#e8e8ec",desc:"A comfortable sedan sample listing."},
 {id:4,make:"Tata",model:"Nexon",year:2021,km:28000,fuel:"Diesel",gear:"Manual",type:"SUV",price:960000,color:"#2e6fb7",desc:"A compact SUV sample listing."},
 {id:5,make:"Hyundai",model:"i20",year:2017,km:67000,fuel:"Petrol",gear:"Manual",type:"Hatchback",price:430000,color:"#3b3f4a",desc:"A premium hatchback sample listing."},
 {id:6,make:"Toyota",model:"Innova Crysta",year:2019,km:71000,fuel:"Diesel",gear:"Manual",type:"SUV",price:1650000,color:"#f0ece4",desc:"A spacious people carrier sample listing."},
 {id:7,make:"Maruti Suzuki",model:"Ciaz",year:2020,km:39000,fuel:"Petrol",gear:"Automatic",type:"Sedan",price:740000,color:"#7a1f2b",desc:"A roomy sedan sample listing."},
 {id:8,make:"Tata",model:"Tiago",year:2020,km:33000,fuel:"Petrol",gear:"Manual",type:"Hatchback",price:390000,color:"#d9a441",desc:"An affordable hatchback sample listing."}
];

/* ===== Car illustration (matches each listing's type + colour) ===== */
const SHAPES = {
 Hatchback:{b:"M40 140Q40 118 62 112L110 104Q130 76 170 74L270 74Q310 76 330 104L362 112Q380 118 380 140Z",w:"M128 104Q142 82 172 82L228 82L228 104ZM238 82L268 82Q294 84 308 104L238 104Z"},
 Sedan:{b:"M28 140Q28 122 52 116L120 106Q150 78 195 76L270 76Q305 80 325 106L372 114Q394 120 394 140Z",w:"M140 106Q158 84 196 84L226 84L226 106ZM236 84L266 84Q292 86 310 106L236 106Z"},
 SUV:{b:"M34 144Q34 116 60 110L92 100L112 62L292 62Q318 66 330 100L366 110Q386 118 386 144Z",w:"M120 98L130 70L212 70L212 98ZM222 70L288 70Q306 74 314 98L222 98Z"}
};
let uid=0;
function carSVG(c,{flip=false,bg=false}={}){
 const s=SHAPES[c.type],id="g"+(++uid);
 return `<svg viewBox="0 0 420 220" role="img" aria-label="Illustration of a ${c.color?c.type:""} car">
 <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.color}"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></linearGradient>
 <linearGradient id="${id}b" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#C8A96B" stop-opacity="0"/><stop offset=".5" stop-color="#C8A96B"/><stop offset="1" stop-color="#C8A96B" stop-opacity="0"/></linearGradient></defs>
 ${bg?`<circle cx="210" cy="95" r="120" fill="#18365B" opacity=".5"/>`:""}
 <g transform="${flip?"translate(420 0) scale(-1 1)":""}">
 <ellipse cx="210" cy="184" rx="170" ry="9" fill="#000" opacity=".4"/>
 <path d="${s.b}" fill="url(#${id})" stroke="#fff" stroke-opacity=".25"/>
 <path d="${s.w}" fill="#0B1426" stroke="#AAB5C7" stroke-opacity=".5"/>
 <path d="M60 128H370" stroke="#fff" stroke-opacity=".25"/>
 <rect x="372" y="120" width="14" height="7" rx="3" fill="#fff6c8"/><rect x="30" y="120" width="10" height="7" rx="3" fill="#ff5050"/>
 ${[105,305].map(x=>`<g><circle cx="${x}" cy="150" r="29" fill="#080d18"/><circle cx="${x}" cy="150" r="17" fill="#2a3446" stroke="#C8A96B" stroke-width="2"/><circle cx="${x}" cy="150" r="4" fill="#C8A96B"/></g>`).join("")}
 </g><rect x="30" y="196" width="360" height="1.5" fill="url(#${id}b)"/></svg>`;
}
const media=(c,opts)=> c.photo?`<img src="${c.photo}" alt="${c.make} ${c.model}" loading="lazy" onerror="this.outerHTML=carSVG(CARS.find(x=>x.id==${c.id}))">`:carSVG(c,opts);

/* ===== Helpers ===== */
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const inr=n=>"₹ "+n.toLocaleString("en-IN");
const wa=t=>`https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
const name=c=>`${c.year} ${c.make} ${c.model}`;
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ===== Hero / story art ===== */
$("#heroCar").innerHTML=carSVG({type:"Sedan",color:"#4b79b5"},{bg:true});
$("#storyImg").innerHTML=carSVG({type:"SUV",color:"#8f9bb0"},{bg:true});
$("#dust").innerHTML=Array.from({length:14},()=>`<i style="left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:${Math.random()*6}s"></i>`).join("");
$("#year").textContent=new Date().getFullYear();
$("#hours").innerHTML=HOURS.map(h=>`<li><span>${h[0]}</span><span>${h[1]}</span></li>`).join("");
$("#gLink").href=GOOGLE_PROFILE_URL||"https://www.google.com/maps/search/?api=1&query=Bengal+CAR+Choice+Garfa+Kolkata";
$("#emptyWa").href=wa("Hi Bengal CAR Choice, which cars do you have available right now?");
$$("[data-todo]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();alert(a.dataset.todo+" page: add your real text before launch.")}));

/* ===== Filters ===== */
const opts=(id,label,key)=>{$(id).innerHTML=`<option value="">All ${label}</option>`+[...new Set(CARS.map(c=>c[key]))].sort().map(v=>`<option>${v}</option>`).join("")};
opts("#fBrand","brands","make");opts("#fFuel","fuels","fuel");opts("#fGear","gearboxes","gear");opts("#fType","types","type");
$("#pref").innerHTML=`<option value="">Not sure yet</option>`+CARS.map(c=>`<option>${name(c)} (sample)</option>`).join("");

function render(){
 const v=id=>$(id).value,[lo,hi]=(v("#fBudget")||"0-999999999").split("-").map(Number);
 let list=CARS.filter(c=>(!v("#fBrand")||c.make===v("#fBrand"))&&(!v("#fFuel")||c.fuel===v("#fFuel"))&&(!v("#fGear")||c.gear===v("#fGear"))&&(!v("#fType")||c.type===v("#fType"))&&c.price>=lo&&c.price<hi);
 const s=v("#fSort");
 if(s==="pa")list.sort((a,b)=>a.price-b.price);if(s==="pd")list.sort((a,b)=>b.price-a.price);if(s==="yd")list.sort((a,b)=>b.year-a.year);
 $("#count").textContent=`${list.length} sample ${list.length===1?"car":"cars"} shown`;
 $("#empty").hidden=list.length>0;
 $("#grid").innerHTML=list.map(c=>`<article class="card"><div class="pic">${media(c)}<span class="tag">Sample</span></div>
 <div class="cbody"><h3>${c.make} ${c.model}</h3><p class="price">${inr(c.price)} <small style="color:var(--muted)">sample price</small></p>
 <div class="chips"><span>${c.year}</span><span>${c.km.toLocaleString("en-IN")} km</span><span>${c.fuel}</span><span>${c.gear}</span></div>
 <div class="cbtns"><button class="btn ghost" data-id="${c.id}">View Details</button><a class="btn gold" target="_blank" rel="noopener" href="${wa(`Hi, I'm interested in the ${name(c)} listed on your website.`)}">WhatsApp</a></div></div></article>`).join("");
 if(!reduce&&window.gsap)gsap.from("#grid .card",{y:30,opacity:0,duration:.5,stagger:.07,clearProps:"all"});
}
$$(".filters select").forEach(s=>s.addEventListener("change",render));
render();

/* ===== Details modal + gallery ===== */
const modal=$("#modal");let cur,slide=0;
const VIEWS=[["Side view",{}],["Opposite side",{flip:true}],["Showroom lighting",{bg:true}]];
function showSlide(){const [cap,o]=VIEWS[slide];$("#mImg").innerHTML=media(cur,o);$("#mCap").textContent=`${cap} · sample illustration (${slide+1}/3)`}
$("#grid").addEventListener("click",e=>{
 const b=e.target.closest("[data-id]");if(!b)return;
 cur=CARS.find(c=>c.id==b.dataset.id);slide=0;showSlide();
 $("#mTitle").textContent=name(cur);$("#mPrice").textContent=inr(cur.price)+" (sample price)";
 $("#mSpec").innerHTML=[["Year",cur.year],["Kilometres",cur.km.toLocaleString("en-IN")],["Fuel",cur.fuel],["Gearbox",cur.gear],["Body",cur.type],["Status","Confirm availability"]].map(s=>`<li><b>${s[0]}:</b> ${s[1]}</li>`).join("");
 $("#mDesc").textContent=cur.desc;
 $("#mWa").href=wa(`Hi, I'd like details about the ${name(cur)} on your website. Is it available?`);
 modal.showModal();
});
$("#prev").onclick=()=>{slide=(slide+2)%3;showSlide()};
$("#next").onclick=()=>{slide=(slide+1)%3;showSlide()};
$("#mClose").onclick=()=>modal.close();
modal.addEventListener("click",e=>{if(e.target===modal)modal.close()});
modal.addEventListener("keydown",e=>{if(e.key==="ArrowRight")$("#next").click();if(e.key==="ArrowLeft")$("#prev").click()});

/* ===== Nav ===== */
const nav=$("#nav"),burger=$("#burger"),menu=$("#menu");
const onScroll=()=>nav.classList.toggle("solid",scrollY>40);onScroll();addEventListener("scroll",onScroll,{passive:true});
const setMenu=o=>{menu.classList.toggle("open",o);burger.setAttribute("aria-expanded",o);burger.setAttribute("aria-label",o?"Close menu":"Open menu")};
burger.onclick=()=>setMenu(!menu.classList.contains("open"));
menu.addEventListener("click",e=>{if(e.target.closest("a"))setMenu(false)});
addEventListener("keydown",e=>{if(e.key==="Escape")setMenu(false)});

/* ===== Form (WhatsApp only, no server) ===== */
$("#form").addEventListener("submit",e=>{
 e.preventDefault();
 const n=$("#name"),p=$("#phone"),st=$("#status");let ok=true;
 const bad=(el,m)=>{el.setAttribute("aria-invalid",true);el.nextElementSibling.textContent=m;ok=false};
 [n,p].forEach(el=>{el.removeAttribute("aria-invalid");el.nextElementSibling.textContent=""});
 if(n.value.trim().length<2)bad(n,"Enter your name.");
 if(!/^(\+?91)?[6-9]\d{9}$/.test(p.value.replace(/[\s-]/g,"")))bad(p,"Enter a valid 10-digit Indian mobile number.");
 if(!ok){st.textContent="Please fix the highlighted fields.";return}
 const pref=$("#pref").value||"not decided yet";
 window.open(wa(`Hi, I'm ${n.value.trim()} (${p.value.trim()}). Interested in: ${pref}. ${$("#msg").value.trim()}`),"_blank","noopener");
 st.textContent="WhatsApp opened with your message. Press send there to reach us.";
});
$$("[data-testdrive]").forEach(a=>a.addEventListener("click",()=>{$("#msg").value="I'd like to book a test drive."}));

/* ===== GSAP ===== */
if(window.gsap&&!reduce){
 gsap.registerPlugin(ScrollTrigger);
 gsap.timeline({defaults:{ease:"power3.out"}})
  .from(".hero-car",{x:80,opacity:0,duration:1.1})
  .from(".eyebrow",{y:16,opacity:0,duration:.5},"-=.7")
  .from(".line",{yPercent:60,opacity:0,duration:.8,stagger:.15},"-=.4")
  .from(".lead,.cta,.trust",{y:20,opacity:0,duration:.6,stagger:.1},"-=.4");
 gsap.to(".hero-car",{yPercent:8,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:true}});
 gsap.from(".why article",{y:36,opacity:0,stagger:.12,duration:.7,scrollTrigger:{trigger:".why",start:"top 85%"}});
 gsap.from(".story-img",{clipPath:"inset(0 100% 0 0)",duration:1.2,ease:"power2.out",scrollTrigger:{trigger:".story",start:"top 75%"}});
 gsap.from(".story-text>*",{y:24,opacity:0,stagger:.12,scrollTrigger:{trigger:".story",start:"top 70%"}});
 addEventListener("pagehide",()=>ScrollTrigger.getAll().forEach(t=>t.kill()));
}
