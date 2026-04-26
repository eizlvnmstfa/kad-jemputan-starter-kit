<script setup>
    import { computed, onMounted, onUnmounted, ref } from 'vue'
    import flower3 from '~/assets/images/flower-3.svg'
    import flower5 from '~/assets/images/flower-5.svg'
    import flower7 from '~/assets/images/flower-7.svg'

    const config = useRuntimeConfig()
    const musicVisualPhase = useState('musicVisualPhase', () => 'idle')
    const musicVisualPulse = useState('musicVisualPulse', () => 0)

    const now = ref(Date.now())
    let countdownInterval = null

    const parseCalendarDate = (dateString) => {
        if (!dateString) {
            return null
        }

        const [year, month, day] = dateString.split('-').map(Number)
        if (!year || !month || !day) {
            return null
        }

        return new Date(year, month - 1, day, 0, 0, 0, 0)
    }

    const events = computed(() => {
        const brideDate = parseCalendarDate(config.public.brideCalendarDate)
        const groomDate = parseCalendarDate(config.public.groomCalendarDate)

        return [
            {
                label: 'Majlis Pengantin Perempuan',
                date: brideDate
            },
            {
                label: 'Majlis Pengantin Lelaki',
                date: groomDate
            }
        ].filter((event) => Boolean(event.date))
    })

    const upcomingEvent = computed(() => {
        if (!events.value.length) {
            return null
        }

        const current = now.value
        const futureEvents = events.value
            .filter((event) => event.date.getTime() >= current)
            .sort((a, b) => a.date.getTime() - b.date.getTime())

        if (futureEvents.length) {
            return futureEvents[0]
        }

        return [...events.value].sort((a, b) => b.date.getTime() - a.date.getTime())[0]
    })

    const countdown = computed(() => {
        if (!upcomingEvent.value) {
            return {
                days: '00',
                hours: '00',
                minutes: '00',
                seconds: '00',
                isPast: true
            }
        }

        const diff = upcomingEvent.value.date.getTime() - now.value
        const safeDiff = Math.max(0, diff)
        const days = Math.floor(safeDiff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((safeDiff / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((safeDiff / (1000 * 60)) % 60)
        const seconds = Math.floor((safeDiff / 1000) % 60)

        return {
            days: String(days).padStart(2, '0'),
            hours: String(hours).padStart(2, '0'),
            minutes: String(minutes).padStart(2, '0'),
            seconds: String(seconds).padStart(2, '0'),
            isPast: diff <= 0
        }
    })

    const phasePalette = computed(() => {
        switch (musicVisualPhase.value) {
            case 'chorus':
                return {
                    overlay: 'bg-[radial-gradient(circle_at_top,_rgba(197,168,128,0.22),_transparent_42%),radial-gradient(circle_at_bottom,_rgba(212,165,165,0.2),_transparent_36%)]',
                    chip: 'Fasa Chorus',
                    countdownPanel: 'border-groomTertiary/35 bg-gradient-to-br from-[#fff7ef]/95 via-[#fff2f2]/90 to-[#fff8f4]/95',
                    countdownCard: 'bg-gradient-to-br from-white via-[#ffe8e8]/95 to-[#fff4e8]/95 border border-groomTertiary/25',
                    countdownGlow: `0 26px 52px rgba(197, 168, 128, ${0.16 + musicVisualPulse.value * 0.22})`
                }
            case 'build':
                return {
                    overlay: 'bg-[radial-gradient(circle_at_top,_rgba(197,168,128,0.18),_transparent_42%),radial-gradient(circle_at_bottom,_rgba(212,165,165,0.14),_transparent_36%)]',
                    chip: 'Fasa Build-up',
                    countdownPanel: 'border-groomTertiary/30 bg-gradient-to-br from-[#fffbf4]/95 via-[#fff8ef]/90 to-[#fff4ea]/95',
                    countdownCard: 'bg-gradient-to-br from-white via-[#fff5e6]/95 to-[#fff1df]/95 border border-groomTertiary/20',
                    countdownGlow: `0 22px 44px rgba(197, 168, 128, ${0.12 + musicVisualPulse.value * 0.16})`
                }
            case 'bridge':
                return {
                    overlay: 'bg-[radial-gradient(circle_at_top,_rgba(152,171,187,0.16),_transparent_45%),radial-gradient(circle_at_bottom,_rgba(197,168,128,0.14),_transparent_38%)]',
                    chip: 'Fasa Bridge',
                    countdownPanel: 'border-slate-300/45 bg-gradient-to-br from-[#f7fbff]/95 via-[#f2f8ff]/90 to-[#f8f3ea]/95',
                    countdownCard: 'bg-gradient-to-br from-white via-[#eef6ff]/95 to-[#f8f2e8]/95 border border-slate-300/45',
                    countdownGlow: `0 20px 42px rgba(128, 148, 166, ${0.12 + musicVisualPulse.value * 0.15})`
                }
            case 'verse':
                return {
                    overlay: 'bg-[radial-gradient(circle_at_top,_rgba(197,168,128,0.14),_transparent_44%),radial-gradient(circle_at_bottom,_rgba(212,165,165,0.1),_transparent_38%)]',
                    chip: 'Fasa Verse',
                    countdownPanel: 'border-groomTertiary/20 bg-gradient-to-br from-white/95 via-[#fffdf8]/92 to-[#fff9f1]/95',
                    countdownCard: 'bg-gradient-to-br from-white via-[#fffaf1]/95 to-[#fff6e8]/95 border border-groomTertiary/15',
                    countdownGlow: `0 18px 36px rgba(197, 168, 128, ${0.1 + musicVisualPulse.value * 0.12})`
                }
            default:
                return {
                    overlay: 'bg-[radial-gradient(circle_at_top,_rgba(197,168,128,0.12),_transparent_40%),radial-gradient(circle_at_bottom,_rgba(212,165,165,0.08),_transparent_35%)]',
                    chip: 'Audio Bersedia',
                    countdownPanel: 'border-groomTertiary/20 bg-white/75',
                    countdownCard: 'bg-groomPrimary/90 border border-groomTertiary/10',
                    countdownGlow: '0 18px 36px rgba(44, 62, 80, 0.1)'
                }
        }
    })

    const galleryCards = [
        { image: flower3, title: 'Saat Pertemuan' },
        { image: flower7, title: 'Menuju Hari Bahagia' },
        { image: flower5, title: 'Memori Terindah' }
    ]

    onMounted(() => {
        countdownInterval = window.setInterval(() => {
            now.value = Date.now()
        }, 1000)
    })

    onUnmounted(() => {
        if (countdownInterval) {
            window.clearInterval(countdownInterval)
            countdownInterval = null
        }
    })
</script>

<template> 
    <div class="relative min-h-screen overflow-x-hidden bg-[#FDFCFB]">
        <div class="pointer-events-none absolute inset-0 transition-all duration-700" :class="phasePalette.overlay"></div>
        <div class="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-5 sm:px-6 lg:px-8">
            <div class="text-center font-Cormorant animate-fade-in-up">
                <p class="mx-auto inline-flex rounded-full border border-groomTertiary/30 bg-white/70 px-5 py-2 text-[10px] uppercase tracking-[0.35em] text-groomSecondary backdrop-blur-md shadow-sm">
                    Walimatul Urus
                </p>
                <h1 class="mt-5 text-3xl sm:text-4xl lg:text-5xl font-PlayfairDisplay italic tracking-wide text-groomSecondary">
                    {{ config.public.brideName }} & {{ config.public.groomName }}
                </h1>
                <p class="mx-auto mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-groomSecondary/70">
                    Pilih bahagian majlis untuk lihat butiran, lokasi, dan kalendar.
                </p>

                <div
                    class="mx-auto mt-6 max-w-2xl rounded-3xl border p-4 backdrop-blur-md animate-fade-in-up [animation-delay:130ms] transition-all duration-700"
                    :class="phasePalette.countdownPanel"
                    :style="{ boxShadow: phasePalette.countdownGlow }"
                >
                    <p class="text-[10px] uppercase tracking-[0.32em] text-groomSecondary/55">Countdown Majlis</p>
                    <p class="mt-2 text-sm text-groomSecondary/70">{{ upcomingEvent?.label || 'Majlis Akan Datang' }}</p>
                    <div class="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
                        <div class="rounded-2xl px-2 py-3 shadow-sm transition-all duration-500" :class="phasePalette.countdownCard">
                            <p class="text-2xl sm:text-3xl font-semibold text-groomSecondary">{{ countdown.days }}</p>
                            <p class="mt-1 text-[10px] uppercase tracking-[0.26em] text-groomSecondary/55">Hari</p>
                        </div>
                        <div class="rounded-2xl px-2 py-3 shadow-sm transition-all duration-500" :class="phasePalette.countdownCard">
                            <p class="text-2xl sm:text-3xl font-semibold text-groomSecondary">{{ countdown.hours }}</p>
                            <p class="mt-1 text-[10px] uppercase tracking-[0.26em] text-groomSecondary/55">Jam</p>
                        </div>
                        <div class="rounded-2xl px-2 py-3 shadow-sm transition-all duration-500" :class="phasePalette.countdownCard">
                            <p class="text-2xl sm:text-3xl font-semibold text-groomSecondary">{{ countdown.minutes }}</p>
                            <p class="mt-1 text-[10px] uppercase tracking-[0.26em] text-groomSecondary/55">Minit</p>
                        </div>
                        <div class="rounded-2xl px-2 py-3 shadow-sm transition-all duration-500" :class="phasePalette.countdownCard">
                            <p class="text-2xl sm:text-3xl font-semibold text-groomSecondary">{{ countdown.seconds }}</p>
                            <p class="mt-1 text-[10px] uppercase tracking-[0.26em] text-groomSecondary/55">Saat</p>
                        </div>
                    </div>
                    <p v-if="countdown.isPast" class="mt-3 text-xs uppercase tracking-[0.2em] text-groomSecondary/60">Majlis ini telah berlangsung</p>
                </div>

                <div class="mx-auto mt-5 w-full max-w-4xl animate-fade-in-up [animation-delay:230ms]">
                    <div class="flex items-center justify-between px-1">
                        <p class="text-[10px] uppercase tracking-[0.35em] text-groomSecondary/60">Live Gallery Mood</p>
                        <p class="rounded-full border border-groomTertiary/30 bg-white/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-groomSecondary/70">{{ phasePalette.chip }}</p>
                    </div>

                    <div class="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
                        <div
                            v-for="(card, index) in galleryCards"
                            :key="card.title"
                            class="group relative overflow-hidden rounded-2xl border border-white/70 bg-gradient-to-br from-white/80 via-groomPrimary/70 to-bridePrimary/80 p-3 shadow-lg transition-all duration-700"
                            :style="{
                                transform: `translateY(${(musicVisualPulse * (index + 1) * -8).toFixed(2)}px) scale(${(1 + musicVisualPulse * 0.04).toFixed(3)})`,
                                boxShadow: `0 18px 36px rgba(44, 62, 80, ${(0.12 + musicVisualPulse * 0.16).toFixed(3)})`
                            }"
                        >
                            <div class="absolute inset-0 opacity-80 transition-opacity duration-500" :class="musicVisualPhase === 'chorus' ? 'bg-[radial-gradient(circle_at_top,_rgba(212,165,165,0.4),_transparent_55%)]' : 'bg-[radial-gradient(circle_at_top,_rgba(197,168,128,0.25),_transparent_60%)]'"></div>
                            <div class="relative z-10 flex min-h-[7.2rem] flex-col items-center justify-center gap-2">
                                <img
                                    :src="card.image"
                                    :alt="card.title"
                                    class="h-16 w-16 opacity-80 transition-transform duration-700"
                                    :style="{ transform: `rotate(${(musicVisualPulse * (index % 2 === 0 ? 10 : -10)).toFixed(2)}deg)` }"
                                />
                                <p class="text-[11px] uppercase tracking-[0.2em] text-groomSecondary/70">{{ card.title }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-6 grid flex-1 grid-rows-2 gap-4 lg:mt-8 lg:grid-cols-2 lg:grid-rows-1">
                <NuxtLink to="/pengantin-perempuan" class="group block h-full animate-fade-in-up [animation-delay:320ms]">
                    <card class="bg-bridePrimary" type="bride">
                        <div class="relative flex h-full min-h-[30rem] flex-col justify-between overflow-hidden text-brideSecondary">
                            <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.7),_transparent_45%)]"></div>
                            <div class="relative z-10 flex items-center justify-between text-[10px] uppercase tracking-[0.35em] text-brideSecondary/55">
                                <span>Pengantin Perempuan</span>
                                <span class="rounded-full border border-brideTertiary/20 bg-white/60 px-3 py-1">Buka</span>
                            </div>
                            <div class="relative z-10 my-auto text-center">
                                <p class="font-GreatVibes text-4xl sm:text-5xl lg:text-6xl text-brideTertiary drop-shadow-sm transition-transform duration-700 group-hover:scale-[1.02]">
                                    Majlis
                                </p>
                                <p class="mt-2 font-PlayfairDisplay text-2xl sm:text-3xl lg:text-4xl uppercase tracking-[0.2em] text-brideSecondary">
                                    Pengantin Perempuan
                                </p>
                                <p class="mx-auto mt-4 max-w-xs text-sm sm:text-base leading-relaxed text-brideSecondary/75 font-Cormorant">
                                    {{ config.public.brideCalendarDateMasihih }}
                                </p>
                                <p class="mx-auto mt-2 max-w-sm text-sm sm:text-base leading-relaxed text-brideSecondary/65 font-Cormorant">
                                    {{ config.public.brideAddressLine2 }}, {{ config.public.brideAddressState }}
                                </p>
                            </div>
                            <div class="relative z-10 flex items-end justify-between gap-3 text-brideTertiary/70">
                                <img class="w-14 opacity-50 transition-transform duration-700 group-hover:rotate-3 group-hover:scale-110" src="~/assets/images/flower-8.svg" alt="" aria-hidden="true"/>
                                <span class="font-Cormorant text-xs uppercase tracking-[0.3em]">Lihat butiran</span>
                                <img class="w-14 opacity-50 transition-transform duration-700 group-hover:-rotate-3 group-hover:scale-110" src="~/assets/images/flower-6.svg" alt="" aria-hidden="true"/>
                            </div>
                        </div>
                    </card>
                </NuxtLink>

                <NuxtLink to="/pengantin-lelaki" class="group block h-full animate-fade-in-up [animation-delay:430ms]">
                    <card class="bg-bridePrimary" type="bride">
                        <div class="relative flex h-full min-h-[30rem] flex-col justify-between overflow-hidden text-brideSecondary">
                            <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.85),_transparent_50%)]"></div>
                            <div class="relative z-10 flex items-center justify-between text-[10px] uppercase tracking-[0.35em] text-brideSecondary/55">
                                <span>Pengantin Lelaki</span>
                                <span class="rounded-full border border-brideTertiary/20 bg-white/70 px-3 py-1">Buka</span>
                            </div>
                            <div class="relative z-10 my-auto text-center">
                                <p class="font-GreatVibes text-4xl sm:text-5xl lg:text-6xl text-[#6FA7DF] drop-shadow-sm transition-transform duration-700 group-hover:scale-[1.02]">
                                    Majlis
                                </p>
                                <p class="mt-2 font-PlayfairDisplay text-2xl sm:text-3xl lg:text-4xl uppercase tracking-[0.2em] text-brideSecondary">
                                    Pengantin<br/>Lelaki
                                </p>
                                <p class="mx-auto mt-4 max-w-xs text-sm sm:text-base leading-relaxed text-brideSecondary/75 font-Cormorant">
                                    {{ config.public.groomCalendarDateMasihih }}
                                </p>
                                <p class="mx-auto mt-2 max-w-sm text-sm sm:text-base leading-relaxed text-brideSecondary/65 font-Cormorant">
                                    {{ config.public.groomAddressLine2 }}, {{ config.public.groomAddressState }}
                                </p>
                            </div>
                            <div class="relative z-10 flex items-end justify-between gap-3 text-brideTertiary/70">
                                <img class="w-14 opacity-50 transition-transform duration-700 group-hover:rotate-3 group-hover:scale-110" src="~/assets/images/flower-1.svg" alt="" aria-hidden="true"/>
                                <span class="font-Cormorant text-xs uppercase tracking-[0.3em] text-[#6FA7DF]/80">Lihat butiran</span>
                                <img class="w-14 opacity-50 transition-transform duration-700 group-hover:-rotate-3 group-hover:scale-110" src="~/assets/images/flower-2.svg" alt="" aria-hidden="true"/>
                            </div>
                        </div>
                    </card>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
  