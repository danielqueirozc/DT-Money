import { useNavigate } from "react-router-dom"
import { authService } from "../../lib/axios"
import { useState } from "react"

import axios from 'axios'

export function Register() {
    const [error, setError] = useState('')
    const navigate = useNavigate()

    function handleRedirect() {
        navigate('/login')
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

            const username = formData.get('username')
            const password = formData.get('password')
            const ConfirmPassword = formData.get('ConfirmPassword')

            if (!username || !password || !ConfirmPassword) {
                alert('Preencha todos os campos')
                return
            }
            
        if (password !== ConfirmPassword) {
            alert('As senhas não conferem')
            return
          }
      
          try {
            await authService.register({
              username: formData.get('username') as string,
              password: password as string,
              ConfirmPassword: ConfirmPassword as string
            })
            
            handleRedirect()
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.error || 'Erro ao registrar usuário')
            }
        }
    }

    return (
        <section className="min-h-screen flex items-center justify-center">
           <div className="max-w-md w-full space-y-8 flex justify-center flex-col border border-green700 py-8 rounded">
                <h1 className="text-gray100 font-extrabold text-3xl text-center">Criar uma <span className="text-green700">conta</span></h1>
                <form onSubmit={handleSubmit} className="flex items-center flex-col space-y-8">
                    <div className="flex flex-col space-y-4">
                        <input 
                            type="text" 
                            placeholder="Username"
                            name="username"
                            className="w-full bg-transparent border border-gray800 rounded px-4 py-2 text-gray100 placeholder:text-gray400 focus:outline-none focus:ring-2 focus:ring-green700"
                        />
                        <input 
                            type="password" 
                            placeholder="Password"
                            name="password"
                            className="w-full bg-transparent border border-gray800 rounded px-4 py-2 text-gray100 placeholder:text-gray400 focus:outline-none focus:ring-2 focus:ring-green700"
                        />

                        <input
                            required
                            type="password"
                            name="ConfirmPassword"
                            placeholder="Confirm Password"
                            className="w-full bg-transparent border border-gray800 rounded px-4 py-2 text-gray100 placeholder:text-gray400 focus:outline-none focus:ring-2 focus:ring-green700"
                        />
                    </div>

                    <div className="flex flex-col space-y-4">
                        <button type="submit" className="bg-green700 font-medium text-white py-2 px-4 rounded hover:bg-green500 transition-all">Criar</button>
                        <button onClick={handleRedirect} className="text-green700 font-medium hover:text-green500 transition-all">Entrar na minha conta</button>
                    </div>
                </form>
           </div>
        </section>
    )
}