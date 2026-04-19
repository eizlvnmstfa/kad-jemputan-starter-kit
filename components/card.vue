<script setup>
    const backgroundUrl = '/pattern-1.png'

    const props = defineProps({
        type: String
    })

    const styling = (type) => {
        return type == 'groom'
            ? {
                background: 'linear-gradient(180deg, rgba(253, 252, 251, 0.98) 0%, rgba(244, 239, 232, 0.96) 100%)'
            }
            : {
                backgroundRepeat: 'repeat',
                backgroundImage: `url(${backgroundUrl})`,
                backgroundColor: '#FFF9F9'
            };
    }

    const textureStyle = (type) => {
        return {
            backgroundImage: `url(${backgroundUrl})`,
            backgroundRepeat: 'repeat',
            opacity: type === 'groom' ? '0.12' : '0.18'
        }
    }
</script>

<template>
    <div class="relative h-full w-full overflow-hidden rounded-[2rem] border border-groomTertiary/15 p-6 sm:p-8 shadow-[0_18px_45px_rgba(0,0,0,0.06)] transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.10)]" :style="styling(props.type)">
        <div class="pointer-events-none absolute inset-0 mix-blend-soft-light" :style="textureStyle(props.type)"></div>
        <div class="relative z-10 h-full w-full">
            <slot />
        </div>
    </div>
</template>