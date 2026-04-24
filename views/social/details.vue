<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const post = ref(null);

async function fetchPost() {
    try {
        const response = await axios.get(`/feed/${route.params.id}`);
        post.value = response.data;

        console.log(post.value);
    } catch (error) {
        console.error("Fetch error:", error);
    }
}
onMounted(() => {
    fetchPost();
});
</script>