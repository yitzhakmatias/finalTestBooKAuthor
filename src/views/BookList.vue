<template>
  <chakra-box p="6">
    <chakra-heading mb="6" size="lg">Books</chakra-heading>
    <chakra-input
      placeholder="Search by title"
      size="md"
      mb="4"
      v-model="search"
    />
    <chakra-input
      type="number"
      placeholder="Price greater than"
      size="md"
      mb="4"
      v-model.number="priceFilter"
    />

    <chakra-table variant="striped" colorScheme="teal">
      <chakra-thead>
        <chakra-tr>
          <chakra-th>Title</chakra-th>
          <chakra-th>Price</chakra-th>
          <chakra-th>Author</chakra-th>
          <chakra-th>Actions</chakra-th>
        </chakra-tr>
      </chakra-thead>
      <chakra-tbody>
        <chakra-tr v-for="book in filteredBooks" :key="book.id">
          <chakra-td>{{ book.title }}</chakra-td>
          <chakra-td>{{ book.price }}</chakra-td>
          <chakra-td>{{ getAuthorName(book.authorId) }}</chakra-td>
          <chakra-td>
            <chakra-button colorScheme="blue" size="sm" @click="editBook(book)">
              Edit
            </chakra-button>
            <chakra-button
              colorScheme="red"
              size="sm"
              ml="2"
              @click="deleteBook(book.id)"
            >
              Delete
            </chakra-button>
          </chakra-td>
        </chakra-tr>
      </chakra-tbody>
    </chakra-table>
  </chakra-box>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      books: [],
      authors: [],
      search: '',
      priceFilter: 0
    };
  },
  computed: {
    filteredBooks() {
      return this.books.filter(
        (book) =>
          book.title.includes(this.search) && book.price > this.priceFilter
      );
    }
  },
  methods: {
    async fetchBooks() {
      const bookResponse = await axios.get('http://localhost:3000/books');
      const authorResponse = await axios.get('http://localhost:3000/authors');
      this.books = bookResponse.data;
      this.authors = authorResponse.data;
    },
    getAuthorName(authorId) {
      const author = this.authors.find((a) => a.id === authorId);
      return author ? author.name : 'Unknown';
    },
    editBook(book) {
      // Navegar a una vista de edición
    },
    async deleteBook(id) {
      await axios.delete(`http://localhost:3000/books/${id}`);
      this.fetchBooks();
    }
  },
  mounted() {
    this.fetchBooks();
  }
};
</script>
