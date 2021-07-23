function sliderInit () {
  const slider = document.querySelector('[class^=Landing_innerwrapper_opinions]')
  const slides = document.querySelectorAll('[class^=Landing_innerwrapper_card]')
  const controlsWrapper = document.querySelector('[class^=Landing_innerwrapper_arrow]')

  const slideStyle = slides[0].currentStyle || window.getComputedStyle(slides[0])
  const slideMargin = parseInt(slideStyle.marginRight)
  const slideWidth = slides[0].clientWidth + slideMargin
  const slideHeight = slides[0].clientHeight
  const slidesScreen = Math.floor(slider.clientWidth / slideWidth)

  slider.style.position = 'relative'
  slider.style.display = 'block'
  slider.style.height = `${slideHeight}px`

  const sliderWrapper = initWrapper(slider, slides)
  sliderWrapper.style.display = 'flex'
  sliderWrapper.style.width = `${sliderWrapper.children.length * slideWidth}px`
  sliderWrapper.style.transition = 'left .3s ease 0s'
  sliderWrapper.style.position = 'absolute'
  sliderWrapper.style.left = '0px'
  sliderWrapper.setAttribute('data-count', sliderWrapper.children.length.toString())
  sliderWrapper.setAttribute('data-screen', slidesScreen.toString())
  sliderWrapper.setAttribute('data-index', '0')

  if (sliderWrapper.children.length > slidesScreen) {
    const [slideLeft, slideRight] = initControls(controlsWrapper)
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
  } else {
    controlsWrapper.remove()
  }
}

function initWrapper (slider, slides) {
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

function initControls (controlsWrapper) {
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

function scrollLeft (sliderWrapper, slideWidth, n = 1) {
  const count = parseInt(sliderWrapper.getAttribute('data-count'))
  const screen = parseInt(sliderWrapper.getAttribute('data-screen'))
  let index = parseInt(sliderWrapper.getAttribute('data-index')) - n
  if (index < 0) {
    index = count - screen
  }
  goToSlide(sliderWrapper, slideWidth, index)
}

function scrollRight (sliderWrapper, slideWidth, n = 1) {
  const count = parseInt(sliderWrapper.getAttribute('data-count'))
  const screen = parseInt(sliderWrapper.getAttribute('data-screen'))
  let index = parseInt(sliderWrapper.getAttribute('data-index')) + n
  goToSlide(sliderWrapper, slideWidth, index % (count - screen + 1))
}

function goToSlide (sliderWrapper, slideWidth, index) {
  sliderWrapper.setAttribute('data-index', index.toString())
  sliderWrapper.style.left = `-${slideWidth * index}px`
}

document.addEventListener('DOMContentLoaded', sliderInit)
window.addEventListener('resize', sliderInit)
