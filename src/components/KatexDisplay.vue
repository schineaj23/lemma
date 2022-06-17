<script>
import {h} from 'vue';
import katex from 'katex';
export default {
    props: {
        expr: String
    },
    computed: {
        math () {
            return katex.renderToString(this.expr);
        }
    },
    render() {
        return h('div', {innerHTML: this.math, className: "katex"})
    }
}
</script>

<style scoped>
.katex {
    justify-self: center;
    font-size: 2em;
}
</style>