import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import camera from '../../assets/camera.svg'

import './styles.css';

export default function New({ history }) {
    const [company, setCompany] = useState('');
    const [technologies, setTechnologies] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState('');

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail]);

    async function handleSubmit(e) {
        e.preventDefault();

        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('technologies', technologies);
        data.append('price', price);

        await api.post('/spots', data, {
            headers: {user_id}
        });

        history.push('/dashboard');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label 
                id="thumbnail" 
                style={{backgroundImage: `url(${preview})`}}
                className={thumbnail ? 'has-thumbnail' : '' }
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                <img src={camera} alt="Select img"/>
            </label>

            <label htmlFor="company">EMPRESA *</label>
            <input
                id="company"
                placeholder="Sua empresa incrível"
                value={company}
                onChange={event => setCompany(event.target.value)}
            />

            <label htmlFor="technologies">TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
            <input
                id="technologies"
                placeholder="Quais tecnologias usam?"
                value={technologies}
                onChange={event => setTechnologies(event.target.value)}
            />

            <label htmlFor="technologies">VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span></label>
            <input
                id="price"
                placeholder="Valor cobrado na diária"
                value={price}
                onChange={event => setPrice(event.target.value)}
            />

            <button type="submit" className="btn">Cadastrar</button>
        </form>
    )
}