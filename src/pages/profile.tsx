import React, { useState, useEffect } from 'react'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import styles from "../styles/pages/Profile.module.css";

import api from '../services/api'
import { useRouter } from 'next/router'

interface IncidentProps {
    id: number;
    title: string
    description: string
    value: number
}

export default function Profile() {
    const [incidents, setIncidents] = useState<IncidentProps[]>([])
    let ongId: string
    let ongName: string
    if (typeof window !== "undefined") {
        ongId = localStorage.getItem('ongId')
        ongName = localStorage.getItem('ongName')
    }

    const router = useRouter()

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId])


    async function handleDeleteIncident(id: number) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            })
            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch {
            alert('Erro ao deletar caso.')
        }
    }

    function handleLogout() {
        localStorage.clear()
        router.push('/')
    }

    return (
        <div className={styles.container}>
            <header>
                <img src="/logo.svg" alt="Be the Hero" />
                <span>Bem vindo, {ongName}</span>
                <button className="button" onClick={() => router.push("/incidents")}>Cadastrar novo caso</button>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}