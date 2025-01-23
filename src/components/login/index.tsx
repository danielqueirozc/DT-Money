import { useNavigate } from "react-router-dom"
import { authService } from "../../lib/axios"

import { useAuth } from "../../contexts/AuthContext"
import { useState } from "react"

export function Login() {
    const [error, setError] = useState<string>('')
    const navigate = useNavigate()
    const { login } = useAuth()

    async function handleRedirect(event: React.FormEvent<HTMLFormElement>) {
        
        navigate('/transactions')
        
    }
    
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        
        event.preventDefault()
        const formData = new FormData (event.currentTarget)
        
        try {
            const response = await authService.login({
                username: formData.get('username') as string,
                password: formData.get('password') as string
            })

            login(response.token)

            navigate('/transactions')
        } catch (error: any) {
            setError(error.response?.data?.error || 'Failed to login')
        }

    }

    return (
        <section className="min-h-screen flex items-center justify-center">
           <div className="max-w-md w-full space-y-8 flex justify-center flex-col border border-green700 py-8 rounded">
                <h1 className="text-gray100 font-extrabold text-3xl text-center">Faça seu <span className="text-green700">login</span></h1>
                <form onSubmit={handleSubmit} className="flex items-center flex-col space-y-8">
                    <div className="flex flex-col space-y-4">
                        <input 
                            name="username"
                            type="text" 
                            placeholder="Username"
                            className="w-full bg-transparent border border-gray800 rounded px-4 py-2 text-gray100 placeholder:text-gray400 focus:outline-none focus:ring-2 focus:ring-green700"
                        />
                        <input
                            name="password"
                            type="password" 
                            placeholder="Password"
                            className="w-full bg-transparent border border-gray800 rounded px-4 py-2 text-gray100 placeholder:text-gray400 focus:outline-none focus:ring-2 focus:ring-green700"
                        />
                    </div>

                    <div className="flex flex-col space-y-4">
                        <button type="submit" className="bg-green700 font-medium text-white py-2 px-4 rounded hover:bg-green500 transition-all">Entrar</button>
                        <button onClick={handleRedirect} className="text-green700 font-medium hover:text-green500 transition-all">Crie uma conta</button>
                    </div>
                </form>
           </div>
        </section>
    )
}