<template>
    <div class="home">
<CarouselCategory>
    <CarouselSlide>
        <div>
            Hello
        </div>
    </CarouselSlide>
</CarouselCategory>
    </div>
</template>

<script>
import CarouselCategory from './components/CarouselCategory.vue'
import CarouselSlide from './components/CarouselSlide.vue'

export default {
    name: "HomeCarousel",
    components: { CarouselCategory, CarouselSlide },

}

</script>

<style>
</style>