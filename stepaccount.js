/**
* ONLY REQUIRED WHERE CSS SCROLL-DRIVEN ANIMATIONS
* ARE NOT SUPPORTED
*/

import gsap from 'https://cdn.skypack.dev/gsap@3.12.0'
import ScrollTrigger from 'https://cdn.skypack.dev/gsap@3.12.0/ScrollTrigger'

if (!CSS.supports('animation-timeline: scroll()')) {
  const SPAN = 'max(45vw, 260px)'
  const CONFIG = [
    {
      x: (index, el) => {
        return Math.max(260, window.innerWidth * 0.45) * -1
      },
      y: -10,
      r: -8,
      h: 160,
      w: (index, el) => {
        return Math.max(320, el.parentNode.offsetWidthi * 0.55)
      },
    },
    {
      x: (index, el) => {
        return Math.max(260, window.innerWidth * 0.45) * 1
      },
      y: -50,
      r: 15,
      h: 360,
      w: (index, el) => {
        return Math.max(220, el.parentNode.offsetWidth * 0.3)
      },
    },
    {
      x: (index, el) => {
        return Math.max(260, window.innerWidth * 0.45) * -1
      },
      y: -30,
      r: 6,
      h: 300,
      w: (index, el) => {
        return Math.max(330, el.parentNode.offsetWidth * 0.55)
      },
    },
    {
      x: (index, el) => {
        return Math.max(260, window.innerWidth * 0.45) * 1
      },
      y: -30,
      r: -5,
      h: 400,
      w: (index, el) => {
        return Math.max(305, el.parentNode.offsetWidth * 0.45)
      },
    },
    {
      x: (index, el) => {
        return Math.max(260, window.innerWidth * 0.45) * -1
      },
      y: -45,
      r: -20,
      h: 525,
      w: (index, el) => {
        return Math.max(160, el.parentNode.offsetWidth * 0.3)
      },
    },
    {
      x: (index, el) => {
        return Math.max(260, window.innerWidth * 0.45) * 1
      },
      y: 10,
      r: 10,
      h: 160,
      w: (index, el) => {
        return Math.max(320, el.parentNode.offsetWidth * 0.55)
      },
    },
  ]

  gsap.registerPlugin(ScrollTrigger)
  console.info('gsap: ScrollTrigger registered')

  gsap.set('.hero', { position: 'absolute' })

  const cards = document.querySelectorAll('.card')

  for (const [index, card] of [...cards].entries()) {
    if (CONFIG[index]) {
      gsap.from(card, {
        x: CONFIG[index].x,
        yPercent: CONFIG[index].y,
        height: `${CONFIG[index].h}%`,
        rotate: CONFIG[index].r,
        width: CONFIG[index].w,
        scrollTrigger: {
          trigger: '.scroller',
          start: 'top bottom',
          end: 'top 50%',
          scrub: true,
        },
      })
    }
  }

  gsap.from(
    [
      '.card__content',
      '.card--two .card__column:last-of-type',
      '.card--three .card__column:last-of-type',
      '.card--five .card__column:last-of-type',
    ],
    {
      y: '-100cqh',
      scrollTrigger: {
        trigger: '.scroller',
        start: 'top 80%',
        end: 'top top',
        scrub: true,
      },
    }
  )
  gsap.from(['.card__avatar img', '.password svg'], {
    opacity: 0,
    scrollTrigger: {
      trigger: '.scroller',
      start: 'top 50%',
      end: 'top top',
      scrub: true,
    },
  })
  gsap.from(['.card--five .card__dummy', '.card--six .card__dummy'], {
    width: (index, el) => el.parentNode.offsetWidth * 0.26,
    scrollTrigger: {
      trigger: '.scroller',
      start: 'top 80%',
      end: 'top top',
      scrub: true,
    },
  })
  gsap.from(['.card--one .card__avatar', '.card--four .card__avatar'], {
    scale: 2,
    scrollTrigger: {
      trigger: '.scroller',
      start: 'top bottom',
      end: 'top top',
      scrub: true,
    },
  })
  gsap.from('.card--two .card__avatar', {
    width: (index, el) => (Math.max(330, el.parentNode.offsetWidth * 0.55) - 32),
    borderRadius: '12px',
    height: 'calc(300cqh - 2rem)',
    scrollTrigger: {
      trigger: '.scroller',
      start: 'top bottom',
      end: 'top 20%',
      scrub: true,
    },
  })
  gsap.from('.card--six .card__column:last-of-type .card__company', {
    width: 120,
    x: '-1rem',
    scrollTrigger: {
      trigger: '.scroller',
      start: 'top bottom',
      end: 'top 20%',
      scrub: true,
    },
  })
  gsap.from('.cta', {
    scale: 1,
    scrollTrigger: {
      trigger: '.scroller',
      start: 'top bottom',
      end: 'top 20%',
      scrub: true,
    },
  })
}
import { Pane } from 'https://cdn.skypack.dev/tweakpane'
import Splitting from 'https://cdn.skypack.dev/splitting'

const main = document.querySelector('main')

const config = {
  theme: 'system',
  debug: false,
  scrub: false,
  progress: 0,
}

const ctrl = new Pane({
  title: 'Config',
  expanded: true,
})

let scrubber
let progress

const update = () => {
  document.documentElement.dataset.debug = config.debug
  document.documentElement.dataset.theme = config.theme
  document.documentElement.dataset.scrub = config.scrub
  document.documentElement.style.setProperty('--progress', config.progress)
  if (scrubber) scrubber.hidden = !config.debug
  if (progress) {
    progress.hidden = !config.debug
    progress.disabled = !config.scrub
  }
}

const sync = (event) => {
  if (
    !document.startViewTransition ||
    event.target.controller.view.labelElement.innerText !== 'Theme'
  )
    return update()
  document.startViewTransition(() => update())
}

ctrl.addBinding(config, 'debug', {
  label: 'Debug',
})

scrubber = ctrl.addBinding(config, 'scrub', {
  label: 'Scrub',
  hidden: true,
})

progress = ctrl.addBinding(config, 'progress', {
  min: 0,
  max: 100,
  step: 1,
  label: 'Progress',
  disabled: true,
})

ctrl.addBinding(config, 'theme', {
  label: 'Theme',
  options: {
    System: 'system',
    Light: 'light',
    Dark: 'dark',
  },
})

ctrl.on('change', sync)
update()
Splitting()
