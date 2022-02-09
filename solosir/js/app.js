// Make mobile navigation work

const btnNavEl = document.querySelector('.navbar__menu-btns');
const headerEl = document.querySelector('.header__container');

btnNavEl.addEventListener('click', function () {
  headerEl.classList.toggle('menu__open');
});

// Smooth scrolling animation

const allLinks = document.querySelectorAll('a:link');

allLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const href = link.getAttribute('href');

    // Scroll back to top
    if (href === '#')
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

    // Scroll to other links
    if (href !== '#' && href.startsWith('#')) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: 'smooth' });
    }

    // Close mobile naviagtion
    if (link.classList.contains('navbar__link'))
      headerEl.classList.toggle('menu__open');
  });
});

// Sticky navigation

const sectionHeroEl = document.querySelector('.section__hero');

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    if (ent.isIntersecting === false) {
      document.body.classList.add('sticky');
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove('sticky');
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: '-80px',
  }
);

obs.observe(sectionHeroEl);

// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  const flex = document.createElement('div');
  flex.style.display = 'flex';
  flex.style.flexDirection = 'column';
  flex.style.rowGap = '1px';

  flex.appendChild(document.createElement('div'));
  flex.appendChild(document.createElement('div'));

  document.body.appendChild(flex);
  const isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  if (!isSupported) document.body.classList.add('no-flexbox-gap');
}

checkFlexGap();

// Set current year
const yearEl = document.querySelector('.footer__year');
const currentYear = new Date().getFullYear();
// yearEl.textContent = currentYear;

// Testimonial Carousel Functionality

let intervalIndex = 1;

const testimonialItems = document.querySelectorAll('.testimonial__item');

const testimonialStage = document.querySelector('.testimonial__stage');

const testimonialDots = document.querySelectorAll('.testimonial__dot');

let newTest = 0;

testimonialDots.forEach((dot, dotIndex1) => {
  dot.addEventListener('click', () => {
    highlightDot(dotIndex1);
    resetInterval();
  });
});

let translateValues = [68, 23, -22, -67, 68];
function highlightDot(dotIndex1) {
  testimonialDots.forEach((dot, dotIndex2) => {
    if (dotIndex1 === dotIndex2) {
      dot.classList.add('active');
      changeTestimonial(dotIndex1);
    } else {
      dot.classList.remove('active');
    }
  });
}

function changeTestimonial(dotIndex1) {
  if (dotIndex1 > testimonialItems.length - 1) {
    intervalIndex = 0;
  } else if (dotIndex1 < 0) {
    intervalIndex = testimonialItems.length - 1;
  }
  testimonialStage.style.transform = `translateX(${translateValues[dotIndex1]}rem)`;
  testimonialItems.forEach((testimonial, testimonialIndex) => {
    if (testimonialIndex === dotIndex1) {
      testimonial.classList.remove('active');
    } else {
      testimonial.classList.add('active');
    }
  });
}

let interval = setInterval(runTestimonial, 2000);

function runTestimonial() {
  intervalIndex++;
  changeTestimonial(intervalIndex);
  highlightDot(intervalIndex);
}

function resetInterval() {
  clearInterval(interval);
  interval = setInterval(runTestimonial, 2000);
}

// Popup Modal Functionality

const popupModal = document.querySelector('.popup');

const ctaChallengeButtons = document.querySelectorAll('.cta__btn');

const btnCloseModal = document.querySelector('.popup__close');

const showPopupModal = () => {
  popupModal.classList.remove('hidden');
};

const hidePopupModal = () => {
  popupModal.classList.add('hidden');
};

ctaChallengeButtons.forEach((cta) => {
  cta.addEventListener('click', () => {
    showPopupModal();
  });
});

btnCloseModal.addEventListener('click', hidePopupModal);

popupModal.addEventListener('click', (e) => {
  if (!e.target.classList.contains('keep__popup')) {
    hidePopupModal();
  }
});
