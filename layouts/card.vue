<script setup>
const route = useRoute()

useHead({
    meta: [{ property: 'title', content: `Walimatul Urus - ${route.meta.title}` }]
})
</script>

<template>
    <div class="w-screen min-h-screen bg-groomPrimary overflow-x-hidden">
        <div class="relative min-w-96 max-w-lg w-full mx-auto shadow-2xl bg-white min-h-screen">
            <slot />
        </div>
        <floating-music-player v-if="route.path !== '/'" :key="route.path" />
    </div>
</template>