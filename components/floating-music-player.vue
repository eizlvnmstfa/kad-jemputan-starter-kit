<template>
  <div class="fixed transition-all duration-300" :class="musicButtonPositionClass">
    <!-- Transparent YouTube Player to avoid bot detection and off-screen pausing -->
    <div class="fixed bottom-0 right-0 w-10 h-10 opacity-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div id="youtube-player"></div>
    </div>

    <button 
      @click="togglePlay"
      :aria-label="isPlaying ? 'Pause background music' : 'Play background music'"
      :aria-pressed="isPlaying"
      class="group relative flex h-14 w-14 items-center justify-center rounded-full bg-white/40 backdrop-blur-xl shadow-lg border border-white/60 transition-all duration-500 hover:scale-105 hover:bg-white/60 hover:shadow-xl"
      :class="{ 'animate-glow border-groomTertiary/60 ring-2 ring-groomTertiary/30 ring-offset-2': isPlaying }"
    >
      <!-- Play Icon -->
      <svg v-if="!isPlaying" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-groomSecondary transition-colors group-hover:text-groomTertiary ml-1" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
      </svg>

      <!-- Pause Icon -->
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-groomTertiary" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from '#app'

const route = useRoute()
const footerPanelOpen = useState('footerPanelOpen', () => false)

const isPlaying = ref(false)
let ytPlayer = null
const isPlayerReady = ref(false)

const musicButtonPositionClass = computed(() => {
  if (footerPanelOpen.value) {
    return 'bottom-[14rem] right-3 z-40 sm:bottom-24 sm:right-6 sm:z-50'
  }

  return 'bottom-[6.5rem] right-3 z-40 sm:bottom-6 sm:right-6 sm:z-50'
})

let videoId = 'xsHt1zf5lV4'
let startSeconds = 89

if (route.path.includes('pengantin-perempuan')) {
  videoId = 'KrsqPE9SMxo'
  startSeconds = 31
}

const initYouTubeAPI = () => {
  if (!window.YT) {
    const tag = document.createElement('script')
    tag.src = "https://www.youtube.com/iframe_api"
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

    window.onYouTubeIframeAPIReady = () => {
      createPlayer()
    }
  } else {
    createPlayer()
  }
}

const createPlayer = () => {
  ytPlayer = new window.YT.Player('youtube-player', {
    height: '200',
    width: '200',
    videoId: videoId,
    playerVars: {
      autoplay: 1, // Try to autoplay
      loop: 1,
      playlist: videoId, // Required for loop to work
      start: startSeconds,
      controls: 0,
      showinfo: 0,
      rel: 0,
      modestbranding: 1,
      playsinline: 1
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
      onError: (e) => console.error("YouTube Player Error:", e.data)
    }
  })
}

const onPlayerReady = (event) => {
  isPlayerReady.value = true
  event.target.setVolume(100)
  event.target.playVideo() // Attempt to play immediately
}

const onPlayerStateChange = (event) => {
  if (event.data === window.YT.PlayerState.PLAYING) {
    isPlaying.value = true
  } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
    isPlaying.value = false
  }
}

const togglePlay = () => {
  if (isPlayerReady.value && ytPlayer) {
    if (isPlaying.value) {
      ytPlayer.pauseVideo()
      isPlaying.value = false
    } else {
      ytPlayer.playVideo()
      isPlaying.value = true
    }
  }
}

// Fallback to force play on first interaction if autoplay blocked by browser
const handleFirstInteraction = () => {
  if (isPlayerReady.value && ytPlayer && !isPlaying.value) {
    ytPlayer.playVideo()
  }
}

onMounted(() => {
  initYouTubeAPI()
  
  // Add listeners for interaction to trigger music
  document.addEventListener('click', handleFirstInteraction, { once: true })
  document.addEventListener('scroll', handleFirstInteraction, { once: true })
  document.addEventListener('touchstart', handleFirstInteraction, { once: true })
})

onUnmounted(() => {
  document.removeEventListener('click', handleFirstInteraction)
  document.removeEventListener('scroll', handleFirstInteraction)
  document.removeEventListener('touchstart', handleFirstInteraction)
})
</script>
