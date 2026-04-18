<script setup>
    const config = useRuntimeConfig()
</script>

<template>
    <div class="relative min-h-screen overflow-x-hidden bg-[#FDFCFB]">
        <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(197,168,128,0.12),_transparent_40%),radial-gradient(circle_at_bottom,_rgba(212,165,165,0.08),_transparent_35%)]"></div>
        <div class="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-5 sm:px-6 lg:px-8">
            <div class="text-center font-Cormorant animate-fade-in-up">
                <p class="mx-auto inline-flex rounded-full border border-groomTertiary/30 bg-white/70 px-5 py-2 text-[10px] uppercase tracking-[0.35em] text-groomSecondary backdrop-blur-md shadow-sm">
                    Walimatul Urus
                </p>
                <h1 class="mt-5 text-3xl sm:text-4xl lg:text-5xl font-PlayfairDisplay italic tracking-wide text-groomSecondary">
                    {{ config.public.brideName }} & {{ config.public.groomName }}
                </h1>
                <p class="mx-auto mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-groomSecondary/70">
                    Pilih bahagian majlis untuk lihat butiran, lokasi, kalendar, dan RSVP.
                </p>
            </div>

            <div class="mt-6 grid flex-1 grid-rows-2 gap-4 lg:mt-8 lg:grid-cols-2 lg:grid-rows-1">
                <NuxtLink to="/pengantin-perempuan" class="group block h-full animate-fade-in-up">
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
                                <img class="w-14 opacity-50 transition-transform duration-700 group-hover:rotate-3 group-hover:scale-110" src="~/assets/images/flower-8.svg" alt="Flower 8"/>
                                <span class="font-Cormorant text-xs uppercase tracking-[0.3em]">Lihat butiran</span>
                                <img class="w-14 opacity-50 transition-transform duration-700 group-hover:-rotate-3 group-hover:scale-110" src="~/assets/images/flower-6.svg" alt="Flower 6"/>
                            </div>
                        </div>
                    </card>
                </NuxtLink>

                <NuxtLink to="/pengantin-lelaki" class="group block h-full animate-fade-in-up [animation-delay:180ms]">
                    <card class="bg-groomPrimary" type="groom">
                        <div class="relative flex h-full min-h-[30rem] flex-col justify-between overflow-hidden text-groomSecondary">
                            <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.85),_transparent_50%)]"></div>
                            <div class="relative z-10 flex items-center justify-between text-[10px] uppercase tracking-[0.35em] text-groomSecondary/55">
                                <span>Pengantin Lelaki</span>
                                <span class="rounded-full border border-groomTertiary/20 bg-white/70 px-3 py-1">Buka</span>
                            </div>
                            <div class="relative z-10 my-auto text-center">
                                <p class="font-GreatVibes text-4xl sm:text-5xl lg:text-6xl text-groomTertiary drop-shadow-sm transition-transform duration-700 group-hover:scale-[1.02]">
                                    Majlis
                                </p>
                                <p class="mt-2 font-PlayfairDisplay text-2xl sm:text-3xl lg:text-4xl uppercase tracking-[0.2em] text-groomSecondary">
                                    Pengantin Lelaki
                                </p>
                                <p class="mx-auto mt-4 max-w-xs text-sm sm:text-base leading-relaxed text-groomSecondary/75 font-Cormorant">
                                    {{ config.public.groomCalendarDateMasihih }}
                                </p>
                                <p class="mx-auto mt-2 max-w-sm text-sm sm:text-base leading-relaxed text-groomSecondary/65 font-Cormorant">
                                    {{ config.public.groomAddressLine2 }}, {{ config.public.groomAddressState }}
                                </p>
                            </div>
                            <div class="relative z-10 flex items-end justify-between gap-3 text-groomTertiary/70">
                                <img class="w-14 opacity-50 transition-transform duration-700 group-hover:rotate-3 group-hover:scale-110" src="~/assets/images/flower-1.svg" alt="Flower 1"/>
                                <span class="font-Cormorant text-xs uppercase tracking-[0.3em]">Lihat butiran</span>
                                <img class="w-14 opacity-50 transition-transform duration-700 group-hover:-rotate-3 group-hover:scale-110" src="~/assets/images/flower-2.svg" alt="Flower 2"/>
                            </div>
                        </div>
                    </card>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
  