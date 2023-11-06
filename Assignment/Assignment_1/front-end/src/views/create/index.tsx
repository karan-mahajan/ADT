import React, { useEffect, useState } from 'react';
import './create.scss';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Input,
    ErrorIcon,
    ErrorMessage,
    LoadingCircle,
} from '../../components';
import { createBlog, updateBlog } from './services';

function Create() {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [categories, setCategories] = useState<string>('');
    const [tags, setTags] = useState<string>('');
    const [blogFormErrors, setblogFormErrors] = useState<any>({
        title: '',
        content: '',
        categories: '',
        tags: ''
    });
    const [openLoading, setOpenLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const isUpdate = localStorage.getItem('updateBlog');
        const blog = JSON.parse(localStorage.getItem('blog') || '{}');
        if (isUpdate === '1') {
            setTitle(blog.title);
            setContent(blog.content);
            setCategories(blog.categories.join(','));
            setTags(blog.tags.join(','));
        }
    }, [])

    // function to validate blog credentials
    const blogValidation = async (e: any) => {
        try {
            e.preventDefault();
            setOpenLoading(true);
            setblogFormErrors({
                title: '',
                content: '',
                categories: '',
                tags: ''
            });
            if (!title) {
                setblogFormErrors({ ...blogFormErrors, title: 'Please provide the title' })
                setOpenLoading(false);
                return;
            }
            const isUpdate = localStorage.getItem('updateBlog');
            const blog = JSON.parse(localStorage.getItem('blog') || '{}');
            const id = blog._id;
            if (isUpdate === '1') {
                const response = await updateBlog(title, content, categories, tags, id);
                localStorage.setItem('updateBlog', '0');
                localStorage.setItem('blog', JSON.stringify({}));
            }
            else {
                const response = await createBlog(title, content, categories, tags);
            }
            setOpenLoading(false);
            navigate('/blogs');
        } catch (error) {
            setOpenLoading(false);
        }
    };
    return (
        <div className="blog-container">
            <h1>Create a new blog</h1>
            <form onSubmit={blogValidation}>
                <div className="form-field">
                    <Input
                        placeholder="Enter the title here.."
                        label="Title"
                        value={title}
                        setValue={setTitle}
                        name="email"
                        type='text'
                        errors={blogFormErrors}
                    />
                    {blogFormErrors?.title && (
                        <ErrorMessage text={blogFormErrors.title} icon={<ErrorIcon />} />
                    )}
                </div>
                <div className="form-field">
                    <Input
                        placeholder="Enter the content here.."
                        label="Content"
                        type="text"
                        value={content}
                        setValue={setContent}
                        name="email"
                        errors={blogFormErrors}
                    />
                </div>
                <div className="form-field">
                    <Input
                        placeholder="Enter the Categories , seperated.."
                        label="Categories"
                        type="text"
                        value={categories}
                        setValue={setCategories}
                        name="email"
                        errors={blogFormErrors}
                    />
                </div>
                <div className="form-field">
                    <Input
                        placeholder="Enter the Tags , seperated.."
                        label="Tags"
                        type="text"
                        value={tags}
                        setValue={setTags}
                        name="email"
                        errors={blogFormErrors}
                    />
                </div>
                <Button type="submit" value={localStorage.getItem('updateBlog') === '1' ? 'Update Blog' : 'Create Blog'} variant="primary" />
            </form>
            <LoadingCircle openLoader={openLoading} className="blog-loading-backdrop" />
        </div>
    );
}

export default Create;

