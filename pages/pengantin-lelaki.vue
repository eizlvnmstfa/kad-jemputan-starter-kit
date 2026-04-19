<script setup>
    import moment from 'moment'
    
    definePageMeta({
        layout: "card",
        title: "Majlis Lelaki"
    })

    const config = useRuntimeConfig()

    const backgroundUrl = '/pattern-1.png'
    const sectionBackgroundStyle = {
        backgroundRepeat: 'repeat',
        backgroundImage: `url(${backgroundUrl})`
    }

    const calendarDate = moment(config.public.groomCalendarDate)

    const calendar = {
        day: config.public.groomCalendarDay,
        date: {
            masihih: config.public.groomCalendarDateMasihih,
            hijrah: config.public.groomCalendarDateHijrah
        },
        time: config.public.groomCalendarTime,
        add: {
            gcalendar: config.public.groomCalendarGcalendarUrl,
            ics: config.public.groomCalendarIcs,
            outlook: config.public.groomCalendarOutlookUrl,
        }
    }

    const contacts = []
    if (config.public.groomContact1Name && config.public.groomContact1Number) {
        contacts.push({
            name: config.public.groomContact1Name,
            number: config.public.groomContact1Number
        })
    }
    if (config.public.groomContact2Name && config.public.groomContact2Number) {
        contacts.push({
            name: config.public.groomContact2Name,
            number: config.public.groomContact2Number
        })
    }
    if (config.public.groomContact3Name && config.public.groomContact3Number) {
        contacts.push({
            name: config.public.groomContact3Name,
            number: config.public.groomContact3Number
        })
    }
    if (config.public.groomContact4Name && config.public.groomContact4Number) {
        contacts.push({
            name: config.public.groomContact4Name,
            number: config.public.groomContact4Number
        })
    }

    const maps = {
        iframe: config.public.groomMapsIframe,
        share: {
            gmap: config.public.groomMapsGmapUrl,
            waze: config.public.groomMapsWazeUrl
        }
    }

    const footerDetails = {
        calendar: calendar,
        contacts: contacts,
        maps: maps,
    }
</script>

<template>
    <div class="bg-[#FDFCFB] overflow-x-hidden">
        <!-- Back to Home Button -->
        <NuxtLink to="/" class="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-groomTertiary/30 rounded-full shadow-lg text-groomSecondary font-Cormorant tracking-widest uppercase text-xs hover:bg-white hover:shadow-xl hover:scale-105 transition-all duration-300 group">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-groomTertiary group-hover:-translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span class="text-groomTertiary">Kembali</span>
        </NuxtLink>
        <card-section class="overflow-hidden flex flex-col justify-center text-groomSecondary bg-groomPrimary font-Cormorant animate-fade-in-up" :style="sectionBackgroundStyle">
            <div class="relative m-3 px-3 py-32 border-[1px] border-groomTertiary/60 ring-1 ring-offset-4 ring-offset-groomPrimary ring-groomTertiary/30 rounded-3xl bg-white shadow-xl">
                <img class="absolute bottom-0 right-0 w-16 translate-y-1/2 scale-[3] opacity-60 animate-float [animation-delay:0ms]" src="~/assets/images/flower-1.svg" alt="" aria-hidden="true"/>
                <img class="absolute bottom-0 left-0 w-16 translate-y-1/2 scale-[4] opacity-60 animate-float [animation-delay:500ms]" src="~/assets/images/flower-2.svg" alt="" aria-hidden="true"/>
                <img class="absolute top-0 right-0 w-16 translate-y-1/2 scale-[5] opacity-60 animate-float [animation-delay:1000ms]" src="~/assets/images/flower-3.svg" alt="" aria-hidden="true"/>
                <img class="absolute top-0 left-0 w-16 -translate-x-1/2 -translate-y-20 scale-[3] opacity-60 animate-float [animation-delay:1500ms]" src="~/assets/images/flower-4.svg" alt="" aria-hidden="true"/>
                <p class="section-kicker text-groomTertiary mb-4">Majlis Perkahwinan</p>
                <div class="text-center text-groomTertiary my-12 drop-shadow-sm">
                    <p class="section-title normal-case tracking-[0.18em] sm:text-5xl lg:text-6xl text-groomTertiary">{{ config.public.groomName }}</p>
                    <p class="section-meta font-normal text-groomSecondary/60 my-2">&</p>
                    <p class="section-title normal-case tracking-[0.18em] sm:text-5xl lg:text-6xl text-groomTertiary">{{ config.public.brideName }}</p>
                </div>
                <p class="flex flex-row text-center justify-center mb-6 section-meta tracking-[0.25em]">
                    <span class="align-middle my-auto mx-3">{{ calendarDate.format('MMM') }}</span>
                    <span class="align-middle mx-3 px-4 border-x border-groomTertiary/40">{{ calendar.day }}<br/><span class="text-3xl font-PlayfairDisplay tracking-normal">{{ calendarDate.format('D') }}</span></span>
                    <span class="align-middle my-auto mx-3">{{ calendarDate.format('YYYY') }}</span>
                </p>
                <p class="text-center section-body text-groomSecondary/80">{{ config.public.groomAddressVenue }}<br/>{{ config.public.groomAddressLine2 }}, {{ config.public.groomAddressState }}.</p>
            </div>
        </card-section>
        <card-section class="text-center text-groomSecondary bg-groomPrimary font-Cormorant animate-fade-in-up [animation-delay:200ms]" :style="sectionBackgroundStyle">
            <p class="section-kicker mb-6 text-groomTertiary">Assalamualaikum W.B.T</p>
            <p class="section-title mb-4 text-groomSecondary">{{ config.public.groomFatherFullName }}<br/>&<br/>{{ config.public.groomMotherFullName }}</p>
            <p class="section-body opacity-80 max-w-sm mx-auto">
                Dengan penuh kesyukuran ke hadrat Ilahi, kami sekeluarga menjemput
                <br/>
                <span class="italic font-PlayfairDisplay text-base sm:text-lg my-2 block">Dato' / Datin / Tuan / Puan / Encik / Cik / Hj / Hjh</span>
            </p>
            <p class="section-body mb-8 opacity-80">sekeluarga hadir ke Majlis Pernikahan anakanda kami</p>
            <p class="section-title text-groomTertiary">{{ config.public.groomFullName }}</p>
            <p class="section-meta italic my-2 opacity-60">&</p>
            <p class="section-title text-groomTertiary">{{ config.public.brideFullName }}</p>
        </card-section>
        <card-section class="text-center text-groomSecondary bg-white font-Cormorant rounded-3xl mx-3 shadow-lg border border-groomTertiary/20 animate-fade-in-up [animation-delay:400ms]">
            <p class="section-kicker text-groomTertiary font-bold">{{ calendar.day }}, {{ calendar.date.masihih }}</p>
            <p class="section-meta mb-4 opacity-80" v-if="calendar.date.hijrah">{{ calendar.date.hijrah }}</p>
            <p class="section-title normal-case mb-6 text-groomSecondary">{{ calendar.time }}</p>
            <div class="opacity-80">
                <p class="section-body" v-if="config.public.groomAddressVenue">{{ config.public.groomAddressVenue }},</p>
                <p class="section-body" v-if="config.public.groomAddressLine1">{{ config.public.groomAddressLine1 }},</p>
                <p class="section-body" v-if="config.public.groomAddressLine2">{{ config.public.groomAddressLine2 }},</p>
                <p class="section-body" v-if="config.public.groomAddressState">{{ config.public.groomAddressState }}.</p>
            </div>
        </card-section>
        <card-section class="text-center text-groomSecondary bg-groomPrimary font-Cormorant animate-fade-in-up [animation-delay:600ms]" :style="sectionBackgroundStyle">
            <p class="section-body italic text-base sm:text-lg">Semoga dengan doa restu</p>
            <p class="font-PlayfairDisplay text-lg sm:text-xl my-2 text-groomTertiary tracking-[0.2em] uppercase">Dato' / Datin / Tuan / Puan / Encik / Cik / Hj / Hjh</p>
            <p class="section-body italic text-base sm:text-lg">dapat menyerikan lagi majlis kami dan diberkati Allah SWT</p>
        </card-section>
        <card-section class="text-center text-groomSecondary bg-groomPrimary font-Cormorant border-t border-groomTertiary/20 animate-fade-in-up [animation-delay:800ms]" :style="sectionBackgroundStyle">
            <p class="section-kicker mb-4 text-groomTertiary">Hubungi:</p>
            <table class="mx-auto mb-6">
                <tbody>
                    <tr v-for="contact in contacts" :key="contact.number || contact.name" class="border-b border-groomTertiary/10 last:border-0">
                        <td class="text-right py-3 opacity-80 uppercase tracking-[0.28em] text-[11px] pr-4">
                            {{ contact.name }}
                        </td>
                        <td class="text-left py-3 font-bold text-groomTertiary tracking-[0.08em] pl-4 border-l border-groomTertiary/20">
                            {{ contact.number }}
                        </td>
                    </tr>
                </tbody>
            </table>
            <p class="section-body italic opacity-70">Turut Mengundang Seisi Keluarga</p>
        </card-section>
        <div class="section-meta py-4 text-groomSecondary/60 text-center bg-groomPrimary border-t border-groomTertiary/20">
            Created by <span class="font-bold">Eizlan Hakimie</span>
        </div>
    </div>
    <card-footer :footerDetails="footerDetails"/>
</template>
