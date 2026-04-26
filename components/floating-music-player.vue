<template>
  <div class="fixed transition-all duration-300" :class="musicButtonPositionClass">
    <!-- Transparent YouTube Player to avoid bot detection and off-screen pausing -->
    <div class="fixed bottom-0 right-0 w-10 h-10 opacity-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div ref="youtubePlayerHost"></div>
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
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from '#app'

const route = useRoute()
const footerPanelOpen = useState('footerPanelOpen', () => false)
const musicVisualPhase = useState('musicVisualPhase', () => 'idle')
const musicVisualPulse = useState('musicVisualPulse', () => 0)

const isPlaying = ref(false)
const youtubePlayerHost = ref(null)
let ytPlayer = null
const isPlayerReady = ref(false)
let syncInterval = null
const hasUserToggledPlayback = ref(false)

const musicButtonPositionClass = computed(() => {
  if (footerPanelOpen.value) {
    return 'bottom-[14rem] right-3 z-40 sm:bottom-24 sm:right-6 sm:z-50'
  }

  return 'bottom-[6.5rem] right-3 z-40 sm:bottom-6 sm:right-6 sm:z-50'
})

const getTrackConfigByPath = (path) => {
  if (path === '/') {
    return {
      videoId: 'w10lNXHRAXw',
      startSeconds: 0
    }
  }

  if (path.includes('pengantin-perempuan')) {
    return {
      videoId: 'aR2asT32zqE',
      startSeconds: 0
    }
  }

  return {
    videoId: 'xsHt1zf5lV4',
    startSeconds: 89
  }
}

let { videoId, startSeconds } = getTrackConfigByPath(route.path)

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

const destroyPlayer = () => {
  if (ytPlayer) {
    try {
      ytPlayer.stopVideo?.()
      ytPlayer.destroy?.()
    } catch (error) {
      console.error('Failed to destroy YouTube player:', error)
    }

    ytPlayer = null
  }

  isPlayerReady.value = false
  isPlaying.value = false
  musicVisualPhase.value = 'idle'
  musicVisualPulse.value = 0
}

const createPlayer = () => {
  if (!youtubePlayerHost.value) {
    return
  }

  destroyPlayer()

  ytPlayer = new window.YT.Player(youtubePlayerHost.value, {
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
    startMusicSync()
  } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
    isPlaying.value = false
    stopMusicSync()
  }
}

const getVisualPhase = (timeSeconds) => {
  const section = timeSeconds % 96

  if (section < 24) {
    return 'verse'
  }

  if (section < 40) {
    return 'build'
  }

  if (section < 72) {
    return 'chorus'
  }

  return 'bridge'
}

const updateMusicSync = () => {
  if (!ytPlayer || !isPlayerReady.value || !isPlaying.value) {
    return
  }

  const currentTime = Number(ytPlayer.getCurrentTime?.() || 0)
  const phase = getVisualPhase(currentTime)
  const phaseMultiplier = phase === 'chorus' ? 1.15 : phase === 'build' ? 0.95 : phase === 'bridge' ? 0.9 : 0.75
  const pulse = (Math.sin(currentTime * 2.2) + 1) / 2

  musicVisualPhase.value = phase
  musicVisualPulse.value = Math.min(1, Number((pulse * phaseMultiplier).toFixed(3)))
}

const startMusicSync = () => {
  stopMusicSync()
  updateMusicSync()
  syncInterval = window.setInterval(updateMusicSync, 700)
}

const stopMusicSync = () => {
  if (syncInterval) {
    window.clearInterval(syncInterval)
    syncInterval = null
  }

  if (!isPlaying.value) {
    musicVisualPhase.value = 'idle'
    musicVisualPulse.value = 0
  }
}

const togglePlay = () => {
  hasUserToggledPlayback.value = true
  removeFirstInteractionListeners()

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
  if (hasUserToggledPlayback.value) {
    return
  }

  if (isPlayerReady.value && ytPlayer && !isPlaying.value) {
    ytPlayer.playVideo()
  }
}

const removeFirstInteractionListeners = () => {
  document.removeEventListener('click', handleFirstInteraction)
  document.removeEventListener('scroll', handleFirstInteraction)
  document.removeEventListener('touchstart', handleFirstInteraction)
}

onMounted(() => {
  initYouTubeAPI()
  
  // Add listeners for interaction to trigger music
  document.addEventListener('click', handleFirstInteraction, { once: true })
  document.addEventListener('scroll', handleFirstInteraction, { once: true })
  document.addEventListener('touchstart', handleFirstInteraction, { once: true })
})

watch(
  () => route.path,
  (newPath) => {
    const nextTrack = getTrackConfigByPath(newPath)
    const trackChanged = nextTrack.videoId !== videoId || nextTrack.startSeconds !== startSeconds

    if (!trackChanged) {
      return
    }

    videoId = nextTrack.videoId
    startSeconds = nextTrack.startSeconds

    if (window.YT) {
      createPlayer()
    }
  }
)

onUnmounted(() => {
  stopMusicSync()
  destroyPlayer()
  removeFirstInteractionListeners()
})
</script>
