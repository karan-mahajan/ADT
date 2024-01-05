import React, { useEffect, useState } from 'react';
import axiosInterceptorInstance from '../../utils/interceptor';
import './blogs.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Backdrop, CircularProgress } from '@mui/material';

function Blogs() {
    const [data, setData] = useState({
        read_articles: [],
        recommended_articles: []
    })
    const [currentRecommendation, setCurrentRecommendation] = useState([]);
    const [noOfRecommendation, setNoOfRecommendation] = React.useState('7');
    const [currentArticle, setCurrentArticle] = React.useState('0');
    const [open, setOpen] = React.useState(false);
    const [allArticles, setAllArticles] = useState({
        articles: []
    });

    const [update, setUpdate] = useState(1);

    const updateRecommendation = async (val: string) => {
        await axiosInterceptorInstance.put('/updaterecommendation', {
            articlesId: [...currentRecommendation, Number(val)]
        })
        setUpdate(update + 1);
    }

    const handleArticleChange = (event: SelectChangeEvent) => {
        setCurrentArticle(event.target.value as string);
        updateRecommendation(event.target.value as string);
    }

    const handleChange = (event: SelectChangeEvent) => {
        setNoOfRecommendation(event.target.value as string);
    };
    const navigate = useNavigate();

    const getRecommendationNumber = async () => {
        const response = await axiosInterceptorInstance.get('/recommendation');
        setCurrentRecommendation(response.data);
        getRecommendationArticles(response.data, noOfRecommendation);
    }

    const getRecommendationArticles = async (resp: any, noOfRecommendation: string) => {
        const recommResponse = await axios.post(`http://127.0.0.1:8000/recommend/${noOfRecommendation}`, {
            articleIds: resp
        });
        setData(recommResponse.data);
    }

    const getAll = async () => {
        const recommResponse = await axios.get(`http://127.0.0.1:8000/allarticles`);
        setAllArticles(recommResponse.data);
    }


    useEffect(() => {
        setOpen(true);
        getRecommendationNumber();
        getAll();
        setTimeout(() => {
            setOpen(false);
        }, 1000);
    }, [noOfRecommendation, update])


    const logout = () => {
        localStorage.clear();
        navigate('/');
    }

    const articleListStyle = {
        maxWidth: '800px',
        margin: 'auto',
        fontFamily: 'Arial, sans-serif',
    };

    const headerStyle = {
        borderBottom: '2px solid #333',
        paddingBottom: '10px',
        marginBottom: '20px',
        color: '#333',
    };

    const listStyle = {
        listStyleType: 'none',
        padding: 0,
    };

    const listItemStyle = {
        margin: '10px 0',
        padding: '15px',
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease-in-out',
        cursor: 'pointer',
    };

    const hoverStyles = {
        transform: 'scale(1.05)',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
    };

    const resetRecommendation = async () => {
        await axiosInterceptorInstance.put('/updaterecommendation', {
            articlesId: []
        })
        setCurrentArticle('0');
        setNoOfRecommendation('7');
        setUpdate(update + 1);
    }

    const rec = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];


    return (
        <div className='container'>
            <button className='logout' onClick={logout}><b>{localStorage.getItem('user')},</b> Logout</button>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <h1><u>Recommended Articles</u></h1>
            <div className='art-cont'>
                {data.read_articles.length > 0 && <Box sx={{ maxWidth: 150 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Rec</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={noOfRecommendation}
                            label="Age"
                            onChange={handleChange}
                        >
                            {rec.map((val: number, index: number) => {
                                return (
                                    <MenuItem value={val} key={index}>{val}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Box>}
                {allArticles.articles.length > 0 && <Box sx={{ maxWidth: 450 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Articles</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={currentArticle}
                            label="Articles"
                            onChange={handleArticleChange}
                        >
                            {allArticles.articles.map((art: any, index: number) => {
                                return (
                                    <MenuItem value={art.Article_Id as string} key={index}><b>{art.Article_Id}</b> - {art.Title} - <b>{art.Author}</b></MenuItem>
                                )
                            })}

                        </Select>
                    </FormControl>
                </Box>}
                {currentRecommendation.length > 0 ? < button className='btn' onClick={resetRecommendation}>Reset Recommendations</button> : ''}
            </div>
            {
                data.recommended_articles.length > 0 && !open ? <div className="blogs-container">
                    <div style={articleListStyle}>
                        <h2 style={headerStyle}>Read Articles</h2>
                        <ul style={listStyle}>
                            {data.read_articles.map((article: any) => (
                                <li key={article.Article_Id} style={{ ...listItemStyle, ...hoverStyles }}>
                                    {article.Title}
                                </li>
                            ))}
                        </ul>

                        <h2 style={headerStyle}>Recommended Articles</h2>
                        <ul style={listStyle}>
                            {data.recommended_articles.map((article: any) => (
                                <li key={article.Article_Id} style={{ ...listItemStyle, ...hoverStyles }}>
                                    {article.Title}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div> : <h2 className='noblog'>No Recommendations Available</h2>
            }
        </div >
    );
}

export default Blogs;

