document.addEventListener("DOMContentLoaded", () => {
  const carouselContainer = document.querySelector(".carousel-container")
  const carouselTrack = document.querySelector(".carousel-track")
  const originalSlides = Array.from(carouselTrack.children)
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")
  const indicators = document.querySelectorAll(".indicator")
  const slideCount = originalSlides.length
  originalSlides.forEach((slide) => {
    const clone = slide.cloneNode(true)
    carouselTrack.appendChild(clone)
  })

  let currentIndex = 0
  let isAnimating = false

  function updateCarousel(transition = true) {
    if (!transition) {
      carouselTrack.style.transition = "none"
    } else {
      carouselTrack.style.transition = "transform 0.5s ease-in-out"
    }
    carouselTrack.style.transform = `translateX(-${currentIndex * (100 / (slideCount * 2))}%)`
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentIndex % slideCount)
    })
  }

  function handleNext() {
    if (isAnimating) return
    isAnimating = true

    currentIndex++
    updateCarousel()

    if (currentIndex >= slideCount) {
      setTimeout(() => {
        carouselTrack.style.transition = "none"
        currentIndex = 0
        carouselTrack.style.transform = `translateX(0)`
        isAnimating = false
      }, 500)
    } else {
      setTimeout(() => {
        isAnimating = false
      }, 500)
    }
  }

  function handlePrev() {
    if (isAnimating) return
    isAnimating = true

    if (currentIndex <= 0) {
      currentIndex = slideCount
      updateCarousel(false)
      setTimeout(() => {
        currentIndex--
        updateCarousel()
        setTimeout(() => {
          isAnimating = false
        }, 500)
      }, 50)
    } else {
      currentIndex--
      updateCarousel()
      setTimeout(() => {
        isAnimating = false
      }, 500)
    }
  }
  let autoScroll = setInterval(handleNext, 4000)
  carouselContainer.addEventListener("mouseenter", () => clearInterval(autoScroll))
  carouselContainer.addEventListener("mouseleave", () => {
    autoScroll = setInterval(handleNext, 4000)
  })
  nextBtn.addEventListener("click", () => {
    clearInterval(autoScroll)
    handleNext()
    autoScroll = setInterval(handleNext, 4000)
  })

  prevBtn.addEventListener("click", () => {
    clearInterval(autoScroll)
    handlePrev()
    autoScroll = setInterval(handleNext, 4000)
  })
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      if (isAnimating) return
      clearInterval(autoScroll)
      currentIndex = index
      updateCarousel()
      autoScroll = setInterval(handleNext, 4000)
    })
  })
  const video = document.getElementById("myVideo")
  const videoContainer = document.querySelector(".video-container")
  const videoOverlay = document.getElementById("videoOverlay")
  const playPauseBtn = document.getElementById("playPauseBtn")
  const progressBar = document.getElementById("progressBar")
  const currentTimeSpan = document.getElementById("currentTime")
  const durationSpan = document.getElementById("duration")
  const volumeBtn = document.getElementById("volumeBtn")
  const fullscreenBtn = document.getElementById("fullscreenBtn")

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  function togglePlayPause() {
    if (video.paused) {
      video.play()
      video.muted = false
      videoOverlay.classList.add("hidden")
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>'
    } else {
      video.pause()
      videoOverlay.classList.remove("hidden")
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i>'
    }
  }

  video.addEventListener("click", (e) => {
    e.preventDefault()
    togglePlayPause()
  })

  videoOverlay.addEventListener("click", (e) => {
    e.preventDefault()
    togglePlayPause()
  })

  const videoControls = document.querySelector(".video-controls")
  if (videoControls) {
    videoControls.addEventListener("click", (e) => {
      e.stopPropagation()
    })
  }

  playPauseBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    togglePlayPause()
  })

  video.addEventListener("play", () => {
    videoOverlay.classList.add("hidden")
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>'
  })

  video.addEventListener("pause", () => {
    videoOverlay.classList.remove("hidden")
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>'
  })

  video.addEventListener("ended", () => {
    videoOverlay.classList.remove("hidden")
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>'
  })

  video.addEventListener("timeupdate", () => {
    const value = (video.currentTime / video.duration) * 100
    progressBar.value = value
    currentTimeSpan.textContent = formatTime(video.currentTime)
  })

  video.addEventListener("loadedmetadata", () => {
    durationSpan.textContent = formatTime(video.duration)
  })

  progressBar.addEventListener("input", (e) => {
    e.stopPropagation()
    const time = (progressBar.value / 100) * video.duration
    video.currentTime = time
  })

  volumeBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    if (video.muted) {
      video.muted = false
      volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>'
    } else {
      video.muted = true
      volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>'
    }
  })

  fullscreenBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    if (video.requestFullscreen) {
      video.requestFullscreen()
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen()
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen()
    }
  })

  let touchStartTime = 0
  video.addEventListener("touchstart", (e) => {
    touchStartTime = Date.now()
  })

  video.addEventListener("touchend", (e) => {
    const touchEndTime = Date.now()
    const touchDuration = touchEndTime - touchStartTime
    if (touchDuration < 300) {
      e.preventDefault()
      togglePlayPause()
    }
  })
  const scrollToTopBtn = document.getElementById("scrollToTop")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      scrollToTopBtn.style.display = "block"
    } else {
      scrollToTopBtn.style.display = "none"
    }
  })

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
})
