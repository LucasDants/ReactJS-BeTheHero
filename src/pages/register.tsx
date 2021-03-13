import React, { useState } from 'react'
import styles from "../styles/pages/Register.module.css";
import { FiArrowLeft } from 'react-icons/fi'

import api from '../services/api'
import { useRouter } from 'next/router'

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const router = useRouter()

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault()

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        }
        try {
            const response = await api.post('/ongs', data)
            alert(`Seu ID de acesso: ${response.data.id}`)
            router.push('/')
        } catch {
            alert('Erro no cadastro')
        }
    }

    return (
        <div className={styles.container}>
            <div className="content">
                <section>
                    <img src="/logo.svg" alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos de sua ONG.</p>
                    <button className="back-link" onClick={() => router.push('/') }>
                        <FiArrowLeft size={16} color="#e02041" />
                        Já tenho cadastro
                    </button>
                </section>
                <form onSubmit={handleRegister}>
                    <input value={name} onChange={e => setName(e.target.value)} placeholder="Nome da ONG" />
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="E-mail" />
                    <input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="WhatsApp" />
                    <div>
                        <input value={city} onChange={e => setCity(e.target.value)} placeholder="Cidade" />
                        <input value={uf} onChange={e => setUf(e.target.value)} placeholder="UF" style={{ width: 70 }} />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}