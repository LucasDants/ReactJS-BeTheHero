import Head from "next/head";
import styles from "../styles/pages/Logon.module.css";
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { FiLogIn } from 'react-icons/fi'

import api from '../services/api'

export default function Logon() {
  const router = useRouter()
  const [id, setId] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    try {
      const response = api.post('sessions', { id })
      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName', (await response).data.name)
      router.push('/profile')
    } catch {
      alert('Falha no Login')
    }
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Be The Hero</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <img src="/logo.svg" alt="Be The Hero" />
        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input
            value={id}
            onChange={e => setId(e.target.value)}
            placeholder="Sua ID"
          />
          <button className="button" type="submit">
            Entrar
          </button>
          <button
            className="back-link"
            onClick={() => router.push("/register")}
          >
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </button>
        </form>
      </section>

      <img src="/heroes.png" alt="Heroes" />
    </div>
  );
}
