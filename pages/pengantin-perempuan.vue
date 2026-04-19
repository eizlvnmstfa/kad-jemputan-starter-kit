<script setup>
    import moment from 'moment'
    
    definePageMeta({
        layout: "card",
        title: "Majlis Perempuan"
    })

    const backgroundUrl = '/pattern-1.png'
    const sectionBackgroundStyle = {
        backgroundRepeat: 'repeat',
        backgroundImage: `url(${backgroundUrl})`
    }

    const config = useRuntimeConfig()
    
    const calendarDate = moment(config.public.brideCalendarDate)

    const calendar = {
        day: config.public.brideCalendarDay,
        date: {
            masihih: config.public.brideCalendarDateMasihih,
            hijrah: config.public.brideCalendarDateHijrah
        },
        time: config.public.brideCalendarTime,
        add: {
            gcalendar: config.public.brideCalendarGcalendarUrl,
            ics: config.public.brideCalendarIcs,
            outlook: config.public.brideCalendarOutlookUrl,
        }
    }

    const contacts = []
    if (config.public.brideContact1Name && config.public.brideContact1Number) {
        contacts.push({
            name: config.public.brideContact1Name,
            number: config.public.brideContact1Number
        })
    }
    if (config.public.brideContact2Name && config.public.brideContact2Number) {
        contacts.push({
            name: config.public.brideContact2Name,
            number: config.public.brideContact2Number
        })
    }
    if (config.public.brideContact3Name && config.public.brideContact3Number) {
        contacts.push({
            name: config.public.brideContact3Name,
            number: config.public.brideContact3Number
        })
    }
    if (config.public.brideContact4Name && config.public.brideContact4Number) {
        contacts.push({
            name: config.public.brideContact4Name,
            number: config.public.brideContact4Number
        })
    }
    
    const maps = {
        iframe: config.public.brideMapsIframe,
        share: {
            gmap: config.public.brideMapsGmapUrl,
            waze: config.public.brideMapsWazeUrl
        }
    }

    const footerDetails = {
        calendar: calendar,
        contacts: contacts,
        maps: maps,
    }
</script>

<template>
    <div class="bg-[#FFF9F9] overflow-x-hidden">
        <!-- Back to Home Button -->
        <NuxtLink to="/" class="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-brideTertiary/30 rounded-full shadow-lg text-brideSecondary font-Cormorant tracking-widest uppercase text-xs hover:bg-white hover:shadow-xl hover:scale-105 transition-all duration-300 group">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-brideTertiary group-hover:-translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span class="text-brideTertiary">Kembali</span>
        </NuxtLink>
        <card-section class="overflow-hidden flex flex-col justify-center text-brideSecondary bg-bridePrimary font-Cormorant animate-fade-in-up" :style="sectionBackgroundStyle">
            <div class="relative m-3 px-3 py-32 text-center">
                <div class="absolute top-0 left-0 w-full h-full border-[1px] border-brideTertiary/60 ring-1 ring-offset-4 ring-offset-bridePrimary ring-brideTertiary/30 rounded-3xl bg-white shadow-xl"></div>
                <img class="absolute bottom-0 right-0 w-16 -translate-x-1/2 -translate-y-1/2 scale-[4] opacity-60 animate-float [animation-delay:0ms]" src="~/assets/images/flower-8.svg" alt="" aria-hidden="true"/>
                <img class="absolute bottom-0 left-0 w-16 translate-x-1/2 -translate-y-1/2 scale-[4] opacity-60 animate-float [animation-delay:500ms]" src="~/assets/images/flower-6.svg" alt="" aria-hidden="true"/>
                <img class="absolute top-0 right-0 w-16 -translate-x-1/2 translate-y-1/2 scale-[5] opacity-60 animate-float [animation-delay:1000ms]" src="~/assets/images/flower-7.svg" alt="" aria-hidden="true"/>
                <img class="absolute top-0 left-0 w-16 translate-x-1/2 scale-[4] opacity-60 animate-float [animation-delay:1500ms]" src="~/assets/images/flower-5.svg" alt="" aria-hidden="true"/>
                <p class="section-kicker text-brideTertiary z-10 relative">Jemputan Majlis</p>
                <p class="section-display text-brideTertiary z-10 relative mt-2 drop-shadow-sm">Walimatul Urus</p>
                <div class="text-3xl my-12 font-PlayfairDisplay z-10 relative">
                    <p class="section-title italic text-brideSecondary">{{ config.public.brideName }}</p>
                    <p class="section-meta font-normal text-brideSecondary/60 my-2">&</p>
                    <p class="section-title italic text-brideSecondary">{{ config.public.groomName }}</p>
                </div>
                <p class="section-kicker text-brideTertiary z-10 relative mb-4">{{ calendar.day }}</p>
                <p class="flex flex-row text-center justify-center mb-6 text-brideSecondary section-body z-10 relative uppercase tracking-[0.25em]">
                    <span class="align-middle my-auto mx-3 text-3xl font-PlayfairDisplay">{{ calendarDate.format('DD') }}</span>
                    <span class="align-middle mx-3 px-4 border-x border-brideTertiary/40 pt-2">{{ calendarDate.format('MMMM') }}</span>
                    <span class="align-middle my-auto mx-3 pt-2">{{ calendarDate.format('YYYY') }}</span>
                </p>
                <p class="section-body z-10 relative text-brideSecondary/80">{{ config.public.brideAddressVenue }}<br/>{{ config.public.brideAddressLine2 }}, {{ config.public.brideAddressState }}.</p>
            </div>
        </card-section>
        <card-section class="text-center text-brideSecondary bg-bridePrimary font-Cormorant animate-fade-in-up [animation-delay:200ms]" :style="sectionBackgroundStyle">
            <p class="section-kicker mb-6 text-brideTertiary">Assalamualaikum W.B.T</p>
            <p class="section-title mb-4 text-brideSecondary">{{ config.public.brideFatherFullName }}<br/>&<br/>{{ config.public.brideMotherFullName }}</p>
            <p class="section-body opacity-80 max-w-sm mx-auto">
                Dengan penuh kesyukuran ke hadrat Ilahi, kami sekeluarga menjemput
                <br/>
                <span class="italic font-PlayfairDisplay text-base sm:text-lg my-2 block">Dato' / Datin / Tuan / Puan / Encik / Cik / Hj / Hjh</span>
            </p>
            <p class="section-body mb-8 opacity-80">sekeluarga hadir ke Majlis Pernikahan anakanda kami</p>
            <p class="section-title text-brideTertiary">{{ config.public.brideFullName }}</p>
            <p class="section-meta italic my-2 opacity-60">&</p>
            <p class="section-title text-brideTertiary">{{ config.public.groomFullName }}</p>
        </card-section>
        <card-section class="text-center text-brideSecondary bg-white font-Cormorant rounded-3xl mx-3 shadow-lg border border-brideTertiary/20 animate-fade-in-up [animation-delay:400ms]">
            <p class="section-kicker text-brideTertiary font-bold">{{ calendar.day }}, {{ calendar.date.masihih }}</p>
            <p class="section-meta mb-4 opacity-80" v-if="calendar.date.hijrah">{{ calendar.date.hijrah }}</p>
            <p class="section-title normal-case mb-6 text-brideSecondary">{{ calendar.time }}</p>
            <div class="opacity-80">
                <p class="section-body" v-if="config.public.brideAddressVenue">{{ config.public.brideAddressVenue }},</p>
                <p class="section-body" v-if="config.public.brideAddressLine1">{{ config.public.brideAddressLine1 }},</p>
                <p class="section-body" v-if="config.public.brideAddressLine2">{{ config.public.brideAddressLine2 }},</p>
                <p class="section-body" v-if="config.public.brideAddressState">{{ config.public.brideAddressState }}.</p>
            </div>
        </card-section>
        <card-section class="text-center text-brideSecondary bg-bridePrimary font-Cormorant animate-fade-in-up [animation-delay:600ms]" :style="sectionBackgroundStyle">
            <p class="section-body italic text-base sm:text-lg">Semoga dengan doa restu</p>
            <p class="font-PlayfairDisplay text-lg sm:text-xl my-2 text-brideTertiary tracking-[0.2em] uppercase">Dato' / Datin / Tuan / Puan / Encik / Cik / Hj / Hjh</p>
            <p class="section-body italic text-base sm:text-lg">dapat menyerikan lagi majlis kami dan diberkati Allah SWT</p>
        </card-section>
        <card-section class="text-center text-brideSecondary bg-bridePrimary font-Cormorant border-t border-brideTertiary/20 animate-fade-in-up [animation-delay:800ms]" :style="sectionBackgroundStyle">
            <p class="section-kicker mb-4 text-brideTertiary">Hubungi:</p>
            <table class="mx-auto mb-6">
                <tbody>
                    <tr v-for="contact in contacts" :key="contact.number || contact.name" class="border-b border-brideTertiary/10 last:border-0">
                        <td class="text-right py-3 opacity-80 uppercase tracking-[0.28em] text-[11px] pr-4">
                            {{ contact.name }}
                        </td>
                        <td class="text-left py-3 font-bold text-brideTertiary tracking-[0.08em] pl-4 border-l border-brideTertiary/20">
                            {{ contact.number }}
                        </td>
                    </tr>
                </tbody>
            </table>
            <p class="section-body italic opacity-70">Turut Mengundang Seisi Keluarga</p>
        </card-section>
        <div class="section-meta py-4 text-brideSecondary/60 text-center bg-bridePrimary border-t border-brideTertiary/20">
            Created by <span class="font-bold">Eizlan Hakimie</span>
        </div>
    </div>
    <card-footer :footerDetails="footerDetails"/>
</template>
