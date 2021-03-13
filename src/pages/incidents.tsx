import React, { useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import styles from "../styles/pages/Incident.module.css";

import api from '../services/api'
import { useRouter } from 'next/router'


export default function NewIncident() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')

    let ongId: string
    if (typeof window !== "undefined") {
        ongId = localStorage.getItem('ongId')
    }


    const router = useRouter()

    async function handleNewIncident(e: React.FormEvent) {
        e.preventDefault()

        const data = {
            title,
            description,
            value
        }

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            })
            router.push('/profile')
        } catch (err) {
            alert('Erro ao cadastrar seu caso')
        }
    }

    return (
        <div className={styles.container}>
            <div>
                <section>
                    <img src="/logo.svg" alt="Be The Hero" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <button className="back-link" onClick={() => router.push('/profile')}>
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para home
                    </button>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input
                        placeholder="Título do caso"
                        value={title} onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Descrição"
                        value={description} onChange={e => setDescription(e.target.value)}
                    />

                    <input
                        placeholder="Valor em reais"
                        value={value} onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}