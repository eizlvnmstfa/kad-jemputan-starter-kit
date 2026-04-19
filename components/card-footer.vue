<script setup>
import { ref, onUnmounted, nextTick } from 'vue';

const props = defineProps({
    footerDetails: Object
})

const tab = ref('');
const footerPanelOpen = useState('footerPanelOpen', () => false)
const footerPanelRef = ref(null)

const scrollToFooterPanel = () => {
    if (!process.client || !footerPanelRef.value) {
        return
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    footerPanelRef.value.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'end'
    })
}

const changeTab = async (name) => {
    const nextTab = tab.value == name ? '' : name
    tab.value = nextTab
    footerPanelOpen.value = nextTab !== ''

    if (nextTab !== '') {
        await nextTick()
        requestAnimationFrame(scrollToFooterPanel)
    }
}

onUnmounted(() => {
    footerPanelOpen.value = false
})

const tabButtons = [
    {
        name: 'calendar',
        label: 'Kalendar'
    },
    {
        name: 'contact',
        label: 'Hubungi'
    },
    {
        name: 'map',
        label: 'Peta'
    },
]

const tabButtonClass = (name) => {
    return [
        'flex min-h-20 flex-col items-center justify-center gap-2 px-2 py-4 transition-colors duration-300',
        tab.value === name ? 'bg-white/80 text-groomTertiary shadow-inner' : 'text-groomSecondary/70 hover:bg-white/55 hover:text-groomTertiary',
    ]
}

const tabIconClass = (name) => {
    return [
        'mx-auto h-5 w-5 transition-all duration-300',
        tab.value === name ? 'text-groomTertiary' : 'text-groomSecondary/60 group-hover:text-groomTertiary',
    ]
}
</script>

<template>
    <div ref="footerPanelRef" class="sticky bottom-0 z-50 overflow-hidden rounded-t-3xl border-t border-groomTertiary/15 bg-[#FBF7F2] text-center shadow-[0_-14px_40px_rgba(0,0,0,0.10)] backdrop-blur-md">
        <div :class="['transition-all duration-500', tab == '' ? 'hidden' : 'p-6 pb-5']">
            <button type="button" aria-label="Tutup panel footer" class="absolute right-4 top-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-groomTertiary/30 bg-white text-groomTertiary shadow-lg transition-all hover:scale-105 hover:bg-groomSecondary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-groomTertiary/70 focus-visible:ring-offset-2" @click="changeTab('')">
                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
            </button>
            <card-footer-calendar v-if="tab == 'calendar'" :calendar="props.footerDetails.calendar"/>
            <card-footer-contact v-if="tab == 'contact'" :contacts="props.footerDetails.contacts"/>
            <card-footer-map v-if="tab == 'map' && props.footerDetails.maps.iframe" :maps="props.footerDetails.maps"/>
        </div>
        <div class="grid grid-cols-3 divide-x divide-groomTertiary/10 border-t border-groomTertiary/10 bg-white/40 text-white fill-current">
            <div v-for="button in tabButtons" :key="button.name" class="group cursor-pointer" :class="tabButtonClass(button.name)" @click="changeTab(button.name)">
                <svg v-if="button.name === 'calendar'" :class="tabIconClass(button.name)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"/></svg>
                <svg v-else-if="button.name === 'contact'" :class="tabIconClass(button.name)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>
                <svg v-else-if="button.name === 'map'" :class="tabIconClass(button.name)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M408 120c0 54.6-73.1 151.9-105.2 192c-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120C168 53.7 221.7 0 288 0s120 53.7 120 120zm8 80.4c3.5-6.9 6.7-13.8 9.6-20.6c.5-1.2 1-2.5 1.5-3.7l116-46.4C558.9 123.4 576 135 576 152V422.8c0 9.8-6 18.6-15.1 22.3L416 503V200.4zM137.6 138.3c2.4 14.1 7.2 28.3 12.8 41.5c2.9 6.8 6.1 13.7 9.6 20.6V451.8L32.9 502.7C17.1 509 0 497.4 0 480.4V209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77V504.3L192 449.4V255c20.5 31.3 42.3 59.6 56.2 77c20.5 25.6 59.1 25.6 79.6 0zM288 152a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/></svg>
                <svg v-else :class="tabIconClass(button.name)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384v38.6C310.1 219.5 256 287.4 256 368c0 59.1 29.1 111.3 73.7 143.3c-3.2 .5-6.4 .7-9.7 .7H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zM288 368a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm211.3-43.3c-6.2-6.2-16.4-6.2-22.6 0L416 385.4l-28.7-28.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l40 40c6.2 6.2 16.4 6.2 22.6 0l72-72c6.2-6.2 6.2-16.4 0-22.6z"/></svg>
                <span class="text-[10px] uppercase tracking-[0.28em] transition-colors duration-300" :class="tab === button.name ? 'text-groomTertiary' : 'text-groomSecondary/65 group-hover:text-groomTertiary'">{{ button.label }}</span>
            </div>
        </div>
    </div>
</template>
