import axios from 'axios';
import axiosInterceptorInstance from '../../utils/interceptor';


const createBlog = async (title: string, content: string, categories: string, tags: string) => {
    try {
        const data = {
            title,
            content,
            categories: categories.split(','),
            tags: tags.split(','),
        }
        const response = await axiosInterceptorInstance.post(
            `http://localhost:8000/blog/add`,
            data
        );
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
};

const updateBlog = async (title: string, content: string, categories: string, tags: string, blogId: string) => {
    try {
        const data = {
            title,
            content,
            categories: categories.split(','),
            tags: tags.split(','),
        }
        const response = await axiosInterceptorInstance.put(
            `http://localhost:8000/blog/update/${blogId}`,
            data
        );
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
};

export { createBlog, updateBlog };
