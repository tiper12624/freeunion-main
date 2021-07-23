const slider = document.querySelector('[class^=Landing_innerwrapper_opinions]')
const slides = document.querySelectorAll('[class^=Landing_innerwrapper_card]')
const controlsWrapper = document.querySelector('[class^=Landing_innerwrapper_arrow]')

let slideMargin = 0
let slideWidth = 0
let slideHeight = 0
let slidesScreen = 0

let sliderWrapper = null

let x0 = null

function sliderInit () {
  const slideStyle = slides[0].currentStyle || window.getComputedStyle(slides[0])
  slideMargin = parseInt(slideStyle.marginRight)
  slideWidth = slides[0].clientWidth + slideMargin
  slideHeight = slides[0].clientHeight
  slidesScreen = Math.floor(slider.clientWidth / slideWidth)

  slider.style.position = 'relative'
  slider.style.display = 'block'
  slider.style.height = `${slideHeight}px`

  sliderWrapper = initWrapper()
  sliderWrapper.style.display = 'flex'
  sliderWrapper.style.width = `${sliderWrapper.children.length * slideWidth}px`
  sliderWrapper.style.transition = 'left .3s ease 0s'
  sliderWrapper.style.position = 'absolute'
  sliderWrapper.style.left = '0px'
  sliderWrapper.setAttribute('data-count', sliderWrapper.children.length.toString())
  sliderWrapper.setAttribute('data-screen', slidesScreen.toString())
  sliderWrapper.setAttribute('data-index', '0')

  if (sliderWrapper.children.length > slidesScreen) {
    controlsWrapper.style.display = 'flex'

    const [slideLeft, slideRight] = initControls()
    slideLeft.addEventListener('click', e => {
      e.preventDefault()
      scrollLeft(sliderWrapper, slideWidth)

      return false
    })
    slideRight.addEventListener('click', e => {
      e.preventDefault()
      scrollRight(sliderWrapper, slideWidth)

      return false
    })

    // swipe events
    slider.addEventListener('touchstart', startSwipe)
    slider.addEventListener('touchend', endSwipe)
  } else {
    controlsWrapper.style.display = 'none'
  }
}

function initWrapper () {
  const wrapper = document.createElement('div')
  slides.forEach((slide, index) => {
    if (index < 5) {
      wrapper.appendChild(slide)
    }
  })
  slider.innerHTML = ''
  slider.appendChild(wrapper)

  return wrapper
}

function initControls () {
  const controlsImg = controlsWrapper.querySelectorAll('img')

  const slideLeft = document.createElement('a')
  slideLeft.href = '#'
  slideLeft.style.paddingLeft = '4px'
  slideLeft.style.paddingRight = '4px'
  slideLeft.appendChild(controlsImg[0])

  const slideRight = document.createElement('a')
  slideRight.href = '#'
  slideRight.style.paddingLeft = '4px'
  slideRight.style.paddingRight = '4px'
  slideRight.appendChild(controlsImg[1])

  controlsWrapper.innerHTML = ''
  controlsWrapper.appendChild(slideLeft)
  controlsWrapper.appendChild(slideRight)

  return [slideLeft, slideRight]
}

function scrollLeft (n = 1) {
  const count = parseInt(sliderWrapper.getAttribute('data-count'))
  const screen = parseInt(sliderWrapper.getAttribute('data-screen'))
  let index = parseInt(sliderWrapper.getAttribute('data-index')) - n
  if (index < 0) {
    index = count - screen
  }
  goToSlide(index)
}

function scrollRight (n = 1) {
  const count = parseInt(sliderWrapper.getAttribute('data-count'))
  const screen = parseInt(sliderWrapper.getAttribute('data-screen'))
  let index = parseInt(sliderWrapper.getAttribute('data-index')) + n
  goToSlide(index % (count - screen + 1))
}

function goToSlide (index) {
  sliderWrapper.setAttribute('data-index', index.toString())
  sliderWrapper.style.left = `-${slideWidth * index}px`
}

function changedTouches (e) {
  return e.changedTouches ? e.changedTouches[0] : e
}

function startSwipe (e) {
  e.preventDefault()
  x0 = changedTouches(e).clientX

  return false
}

function endSwipe (e) {
  if (x0 !== null) {
    let dx = changedTouches(e).clientX - x0

    if (Math.sign(dx) > 0) {
      scrollLeft()
    } else {
      scrollRight()
    }

    x0 = null
  }
}

document.addEventListener('DOMContentLoaded', sliderInit)
window.addEventListener('resize', sliderInit)
