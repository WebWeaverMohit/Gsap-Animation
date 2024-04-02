function init(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

init();

var p1 = gsap.timeline({
  scrollTrigger:{
    scroller: "#main",
    trigger:"#page1",
    scrub:3,
    // markers:true,
    start:"top -1%",
    end:"top -8%"
  }
})

p1.to("#part1-left",{
  rotate:0,
  left:"50%"
})

p1.to("#part1-right",{
  rotate:0,
  left:"50%"
})

p1.to("#part1-img",{
  y:-1000
})

p1.to("#part1 h1",{
  y:-1000,
  stagger:0.5
})

var p2 = gsap.timeline({
  scrollTrigger:{
    scroller: "#main",
    trigger:"#page1",
    delay:5,
    scrub:3,
    // markers:true,
    start:"top -14%",
    end:"top -20%"
  }
})

p2.to("#part2-img",{
  top:"0%",
  delay:5,
  y:-200
})

p2.to("#part2-cen",{
  left:"50%",
  top:"0%",
  y:-10
})


p2.to("#part2-left",{
  rotate:-15,
  left:"40%",
  top:"0%",
  y:-10
})

p2.to("#part2-right",{
  rotate:15,
  left:"60%",
  top:"0%",
  y:-10
})

p2.to("#part2 h1",{
  stagger:0.4,
  top:"0%",
  y:-520
})