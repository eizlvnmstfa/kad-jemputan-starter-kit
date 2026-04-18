<template>
    <div class="min-h-screen w-full overflow-x-hidden bg-[#FDFCFB]">
        <slot />
        <floating-music-player v-if="$route.path !== '/'" />
    </div>
</template>