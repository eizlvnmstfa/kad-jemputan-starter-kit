<script setup>
const props = defineProps({
    rsvp: Object
})

</script>

<template>
    <div class="relative text-white w-full h-full">
        <p class="footer-section-title mb-9">RSVP</p>
        <iframe :src="props.rsvp.iframe" style="border:0; width: 100%; height: 55vh; margin: 0;" frameborder="0" marginheight="0" marginwidth="0" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade">Loading…</iframe>
    </div>
</template>