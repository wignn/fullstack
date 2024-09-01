import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const createBook = async (bookData: { title: string, author: string, synopsis: string, coverImage: string | null }) => {
  try {
    const response = await axios.post(`${apiUrl}/books`, bookData);
    return response.data;
  } catch (err) {
    console.error('Error creating book:', err);
    throw err;
  }
};
