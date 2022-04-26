<template>
    <div>
        <h1>Counter</h1>
        <p>
            <button class="decrement" @click="decrement">-</button>
            <span>{{ count }}</span>
            <button class="increment" @click="increment">+</button>
        </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            count: 0
        }
    },
    methods: {
        increment() {
            this.count++
        },
        decrement() {
            this.count--
        }
    }
}
</script>
