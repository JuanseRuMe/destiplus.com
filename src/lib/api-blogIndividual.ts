
import axios from 'axios';
import type { ArticleData } from '@/types/blogIndivdual';

const API_BASE_URL = 'https://tree-suesca-backend-production.up.railway.app/api/v1';

export async function getArticleDataBySlug(slug: string): Promise<ArticleData | null> {
  try {
    const response = await axios.get<ArticleData>(`${API_BASE_URL}/blog/${slug}`);

    if (response.data) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("API Error: Failed fetching initial destinos using axios:", error);
    if (axios.isAxiosError(error)) {
      console.error("Axios error details:", {
        message: error.message,
        code: error.code,
        status: error.response?.status,
      });
    }
    return null;
  }
}