<template>
  <chakra-box p="6" maxW="600px" mx="auto">
    <chakra-heading mb="6" size="md">{{ isEdit ? 'Edit Book' : 'Create Book' }}</chakra-heading>
    <chakra-form-control mb="4" isRequired>
      <chakra-form-label>Title</chakra-form-label>
      <chakra-input v-model="form.title" placeholder="Enter book title" />
    </chakra-form-control>
    <chakra-form-control mb="4" isRequired>
      <chakra-form-label>Price</chakra-form-label>
      <chakra-input
        type="number"
        v-model.number="form.price"
        placeholder="Enter book price"
      />
    </chakra-form-control>
    <chakra-form-control mb="6">
      <chakra-form-label>Author</chakra-form-label>
      <chakra-select v-model="form.authorId" placeholder="Select an author">
        <chakra-option
          v-for="author in authors"
          :key="author.id"
          :value="author.id"
        >
          {{ author.name }}
        </chakra-option>
      </chakra-select>
    </chakra-form-control>
    <chakra-button colorScheme="blue" size="md" @click="submitForm">
      {{ isEdit ? 'Update' : 'Create' }}
    </chakra-button>
  </chakra-box>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    initialData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      form: {
        title: '',
        price: 0,
        authorId: null,
      },
      authors: []
    };
  },
  methods: {
    async fetchAuthors() {
      const response = await axios.get('http://localhost:3000/authors');
      this.authors = response.data;
    },
    async submitForm() {
      if (this.isEdit) {
        await axios.put(`http://localhost:3000/books/${this.form.id}`, this.form);
      } else {
        await axios.post('http://localhost:3000/books', this.form);
      }
      this.$router.push('/books');
    }
  },
  mounted() {
    this.fetchAuthors();
    if (this.isEdit) {
      this.form = { ...this.initialData };
    }
  }
};
</script>
