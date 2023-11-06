import React, { useEffect, useState } from 'react';
import axiosInterceptorInstance from '../../utils/interceptor';
import './blogs.scss';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components';

function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [correctUsers, setCorrectUsers] = useState<any>({});
    const [showComments, setShowComments] = useState<any>({});
    const [commentsData, setCommentsData] = useState<any>({});
    const [tags, setTags] = useState('')
    const [comment, setComment] = useState('');
    const navigate = useNavigate();
    const getBlogs = async () => {
        const response = await axiosInterceptorInstance.get('/blog/all');
        setBlogs(response.data);
        // Initialize correctUsers for all blogs to false
        const initialCorrectUsers = response.data.reduce((acc: any, blog: any) => {
            acc[blog._id] = false;
            return acc;
        }, {});
        const initialComments = response.data.reduce((acc: any, blog: any, index: number) => {
            acc[index] = false;
            return acc;
        }, {});
        setShowComments(initialComments);
    }
    useEffect(() => {
        getBlogs();
    }, [])
    const logout = () => {
        localStorage.clear();
        navigate('/');
    }
    const isCorrectUser = async (blogId: string) => {
        try {
            const response = await axiosInterceptorInstance.get(`/checkUser`, {
                params: { blogId }
            });
            const current = localStorage.getItem('user');
            setCorrectUsers((prevState: any) => ({ ...prevState, [blogId]: response?.data?.email === current }));
        } catch (error) {
            console.error('There was an error!', error);
        }
    }
    const updateBlog = (blog: any) => {
        localStorage.setItem('blog', JSON.stringify(blog));
        localStorage.setItem('updateBlog', '1');
        navigate('/create');
    }
    useEffect(() => {
        blogs.forEach((blog: any) => {
            isCorrectUser(blog._id)
        });
    }, [blogs]);

    const deleteBlog = async (blog: any) => {
        try {
            const id = blog._id;
            const deleteResponse = await axiosInterceptorInstance.delete('/blog/delete', {
                params: {
                    id
                }
            })
            if (deleteResponse.data.message === 'successful') {
                getBlogs();
            }
        } catch (error) {
        }
    }
    const updateShowComments = async (index: number, id: string) => {
        const commentsResponse = await axiosInterceptorInstance.get('/blog/getcomments', {
            params: {
                id
            }
        })
        setCommentsData((previousState: any) => ({ ...previousState, [id]: commentsResponse.data }));
        setShowComments((previousState: any) => ({ ...previousState, [index]: !showComments[index] }));
    }
    const addComment = async (blog: any) => {
        const commentResponse = await axiosInterceptorInstance.post('/blog/comment', {
            comment: comment,
            blogId: blog._id,
            user: localStorage.getItem('user')
        })
        if (commentResponse.status === 200) {
            window.location.reload();
        }
    }

    const getDate = (date: Date) => {
        const newDate = new Date(date);
        return `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`
    }

    const checkKeys = async (event: any) => {
        const key = event.key;
        const value = event.target.value;
        if (key !== 'Enter') return;
        const name = event.target.name;
        if (name === 'tags') {
            const response = await axiosInterceptorInstance.get(`/blog/all?tags=${value}`);
            setBlogs(response.data);
            const initialCorrectUsers = response.data.reduce((acc: any, blog: any) => {
                acc[blog._id] = false;
                return acc;
            }, {});
            const initialComments = response.data.reduce((acc: any, blog: any, index: number) => {
                acc[index] = false;
                return acc;
            }, {});
            setShowComments(initialComments);
        } else if (name === 'categories') {
            const response = await axiosInterceptorInstance.get(`/blog/all?categories=${value}`);
            setBlogs(response.data);
            const initialCorrectUsers = response.data.reduce((acc: any, blog: any) => {
                acc[blog._id] = false;
                return acc;
            }, {});
            const initialComments = response.data.reduce((acc: any, blog: any, index: number) => {
                acc[index] = false;
                return acc;
            }, {});
            setShowComments(initialComments);
        }
    }
    return (
        <div className='container'>
            <h3 className='add-blog'><a href='/create'>Add new Blog</a></h3>
            <h3 className='logout' onClick={logout}>Logout</h3>
            <h1><u>List of all Blog Posts</u></h1>
            {blogs.length > 0 && <div className="form-field query">
                <input type='text' name='tags' placeholder='Enter Tags' className='input' onKeyDown={checkKeys}></input>
                <input type='text' name='categories' placeholder='Enter Categories' className='input' onKeyDown={checkKeys}></input>
            </div>}
            {blogs.length > 0 ? <div className="blogs-container">
                {blogs.map((blog: any, index: number) => {
                    return (
                        <div className='blog-cont' key={index}>
                            <div className='blog-cont-one'>
                                {correctUsers[blog._id] ? (
                                    <div className='perform-action'>
                                        <button className='perform' onClick={() => updateBlog(blog)}>Update Blog</button>
                                        <button className='perform' onClick={() => deleteBlog(blog)}>Delete Blog</button>
                                    </div>
                                ) : null}
                                <div className='blog-section shadow'>
                                    <button className='comments' onClick={() => updateShowComments(index, blog._id)}>Show comments</button>
                                    <h2 className='blog-title'>{blog.title}</h2>
                                    <h3 className='blog-title'>{blog.content}</h3>
                                    <h4 className='blog-user'> {blog.authorName}</h4>
                                    {blog?.categories?.length > 0 ? <div className='categories-container'>
                                        <h3>Categories : </h3>
                                        {blog?.categories.map((cat: any, index: number) => {
                                            return (
                                                <span key={index} className='category'>{cat}</span>
                                            )
                                        })}
                                    </div> : ''}
                                    {blog?.tags?.length > 0 ? <div className='tags-container'>
                                        <h3>Tags : </h3>
                                        {blog?.tags.map((tag: any, index: number) => {
                                            return (
                                                <span key={index} className='tag'>{tag}</span>
                                            )
                                        })}
                                    </div> : ''}
                                    <span className='created-at'><b>Created At : </b>{`${getDate(blog.createdAt)}`}</span>
                                </div>
                            </div>
                            {showComments[index] ? <div className='comments-cont'>
                                {commentsData[blog._id]?.map((comm: any) => {
                                    return (
                                        <div className='comments-cont-one' key={comm._id}>
                                            <p>{comm.text}</p>
                                            <span>{`By - ${comm.commenterName}`}</span>
                                        </div>
                                    )
                                })}
                                <div className='add-comment'>
                                    <input type='text' name='add-comment' value={comment} onChange={(e) => setComment(e.target.value)} />
                                    <button onClick={() => addComment(blog)}>Add comment</button>
                                </div>
                            </div> : null}
                        </div>
                    )
                })}
            </div> : <h2 className='noblog'>No Blogs Available</h2>}
        </div>
    );
}

export default Blogs;
